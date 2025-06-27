import { useState, useEffect, useRef } from "react";
import { useTableStore } from "../../tables/store";
import { useWaiterStore } from "../store";
import { useAuthStore } from "../../auth/store";
import { useDishStore } from "../../dishes/store";

export const useEditOrder = () => {
  const cartItems = useWaiterStore((state) => state.cartItems);
  const removeFromCart = useWaiterStore((state) => state.removeFromCart);
  const updateCartItemQuantity = useWaiterStore((state) => state.updateCartItemQuantity);
  const updateOrder = useWaiterStore((state) => state.updateOrder);
  const getOrderTotal = useWaiterStore((state) => state.getOrderTotal);
  const selectedTable = useWaiterStore((state) => state.selectedTable);
  const currentOrder = useWaiterStore((state) => state.currentOrder);
  const setCartFromOrder = useWaiterStore((state) => state.setCartFromOrder);
  const setFeedback = useWaiterStore((state) => state.setFeedback);
  const orderDishes = useWaiterStore((state) => state.orderDishes);
  const loadMyOrders = useWaiterStore((state) => state.loadMyOrders);
  const loadOrderDishes = useWaiterStore((state) => state.loadOrderDishes);

  const dishes = useDishStore((state) => state.dishes);
  const loadDishes = useDishStore((state) => state.loadDishes);
  const loadTables = useTableStore((state) => state.loadTables);
  const waiterId = useAuthStore((state) => state.user?.decodedToken?.id);

  const [showMenuModal, setShowMenuModal] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CASH");
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const cartInitialized = useRef(false);
  const userMadeChanges = useRef(false);

  useEffect(() => {
    if (!dishes || dishes.length === 0) {
      loadDishes();
    }
  }, [dishes, loadDishes]);

  useEffect(() => {
    if (currentOrder && 
        orderDishes[currentOrder.id] && 
        orderDishes[currentOrder.id].length > 0 && 
        dishes && 
        dishes.length > 0 && 
        !cartInitialized.current && 
        !userMadeChanges.current) {
      
      setSelectedPaymentMethod(currentOrder.paymentMethod || "CASH");
      setCartFromOrder(currentOrder);
      cartInitialized.current = true;
      setHasChanges(false);
    }
  }, [currentOrder, orderDishes, dishes, setCartFromOrder]);

  useEffect(() => {
    if (cartInitialized.current) {
      userMadeChanges.current = true;
      setHasChanges(true);
    }
  }, [cartItems, selectedPaymentMethod]);

  const handleRemoveItem = (dishId) => {
    userMadeChanges.current = true;
    removeFromCart(dishId);
  };

  const handleUpdateQuantity = (dishId, newQuantity) => {
    if (newQuantity > 0) {
      userMadeChanges.current = true;
      updateCartItemQuantity(dishId, newQuantity);
    }
  };

  const handleUpdateOrder = async () => {
    if (!selectedTable || !waiterId || !currentOrder) {
      return;
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return;
    }

    if (!selectedPaymentMethod) {
      return;
    }

    const recalculatedTotal = cartItems.reduce((total, item) => {
      if (item && item.dish && typeof item.dish.price === "number" && typeof item.quantity === "number") {
        return total + (item.dish.price * item.quantity);
      }
      return total;
    }, 0);

    if (!recalculatedTotal || recalculatedTotal <= 0) {
      setFeedback({
        type: "error",
        message: "El total de la orden debe ser mayor a $0. Verifica que tengas platillos en el carrito."
      });
      return;
    }

    setIsUpdatingOrder(true);

    try {
      if (!selectedTable.id) {
        throw new Error("ID de mesa no encontrado");
      }

      if (!waiterId || waiterId === 0) {
        throw new Error("ID de mesero no válido");
      }

      const orderDishesData = cartItems.map((d) => ({
        dishId: d.dish.id,
        quantity: d.quantity,
      }));

      const orderData = {
        table: selectedTable.id,
        waiterId: parseInt(waiterId),
        state: "IN_PROGRESS",
        totalAmount: parseFloat(recalculatedTotal.toFixed(2)),
        paymentMethod: selectedPaymentMethod,
        orderDishes: orderDishesData
      };

      const updateResult = await updateOrder(currentOrder.id, orderData);
      
      if (!updateResult.success) {
        throw new Error(updateResult.message || "Error al actualizar la orden");
      }

      await loadMyOrders(waiterId);
      await loadOrderDishes(currentOrder.id);

      userMadeChanges.current = false;
      cartInitialized.current = false;
      
      setTimeout(() => {
        cartInitialized.current = true;
        setCartFromOrder(currentOrder);
      }, 500);

      setTimeout(async () => {
        await loadTables();
      }, 1000);

      setHasChanges(false);
      setShowSuccessModal(true);

    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message || "Error al actualizar la orden"
      });
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const handleOpenMenu = () => {
    setShowMenuModal(true);
  };

  const handleCloseMenu = () => {
    setShowMenuModal(false);
  };

  const handleClearChanges = () => {
    if (currentOrder) {
      userMadeChanges.current = false;
      cartInitialized.current = false;
      
      setCartFromOrder(currentOrder);
      setSelectedPaymentMethod(currentOrder.paymentMethod || "CASH");
      setHasChanges(false);
      
      cartInitialized.current = true;
    }
    
    const setSelectedTable = useWaiterStore.getState().setSelectedTable;
    const clearCurrentOrder = useWaiterStore.getState().clearCurrentOrder;
    const setCurrentView = useWaiterStore.getState().setCurrentView;
    
    setSelectedTable(null);
    clearCurrentOrder();
    setCurrentView('tables');
  };

  const handleContinueEditing = () => {
    setShowSuccessModal(false);
  };

  const handleFinishEditing = () => {
    setShowSuccessModal(false);
    
    userMadeChanges.current = false;
    cartInitialized.current = false;
    
    const setSelectedTable = useWaiterStore.getState().setSelectedTable;
    const clearCurrentOrder = useWaiterStore.getState().clearCurrentOrder;
    setSelectedTable(null);
    clearCurrentOrder();
    const setCurrentView = useWaiterStore.getState().setCurrentView;
    setCurrentView('tables');
  };

  const calculatedTotal = getOrderTotal();

  const safeCartItems = Array.isArray(cartItems)
    ? cartItems.filter(
        (item) =>
          item &&
          item.dish &&
          typeof item.dish.price === "number" &&
          typeof item.quantity === "number"
      )
    : [];

  return {
    cartItems,
    selectedTable,
    currentOrder,
    waiterId,
    showMenuModal,
    isUpdatingOrder,
    selectedPaymentMethod,
    hasChanges,
    showSuccessModal,
    calculatedTotal,
    safeCartItems,
    
    handleRemoveItem,
    handleUpdateQuantity,
    handleUpdateOrder,
    handleOpenMenu,
    handleCloseMenu,
    handleClearChanges,
    handleContinueEditing,
    handleFinishEditing,
    setSelectedPaymentMethod
  };
};
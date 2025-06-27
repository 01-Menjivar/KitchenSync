import { useState, useEffect } from "react";
import { useTableStore } from "../../tables/store";
import { useWaiterStore } from "../store";
import { useAuthStore } from "../../auth/store";


const getPaymentMethodTextSpanish = (paymentMethod) => {
  const paymentTranslations = {
    'CASH': 'Efectivo',
    'CREDIT_CARD': 'Tarjeta de Crédito',
    'DEBIT_CARD': 'Tarjeta de Débito',
    'MOBILE_PAYMENT': 'Pago Móvil',
    'BANK_TRANSFER': 'Transferencia Bancaria',
    'OTHER': 'Otro'
  };
  return paymentTranslations[paymentMethod] || paymentMethod;
};

export const useOrderDetail = () => {
  const cartItems = useWaiterStore((state) => state.cartItems);
  const removeFromCart = useWaiterStore((state) => state.removeFromCart);
  const updateCartItemQuantity = useWaiterStore((state) => state.updateCartItemQuantity);
  const clearCart = useWaiterStore((state) => state.clearCart);
  const createOrder = useWaiterStore((state) => state.createOrder);
  const getOrderTotal = useWaiterStore((state) => state.getOrderTotal);
  const selectedTable = useWaiterStore((state) => state.selectedTable);
  const updateTableState = useTableStore((state) => state.updateTableState);
  const waiterId = useAuthStore((state) => state.user?.decodedToken?.id);

  const [showMenuModal, setShowMenuModal] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CASH");

  useEffect(() => {
    if (selectedTable) {
      setSelectedPaymentMethod("CASH");
    }
  }, [selectedTable]);

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

 
  const handleRemoveItem = (dishId) => {
    removeFromCart(dishId);
  };

  const handleUpdateQuantity = (dishId, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(dishId, newQuantity);
    }
  };

  const handleCreateOrder = async () => {
    if (!selectedTable || !waiterId) {
      return;
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return;
    }

    if (!selectedPaymentMethod) {
      return;
    }

    if (selectedTable.state !== "AVAILABLE") {
      return;
    }

    setIsCreatingOrder(true);

    try {
      if (!selectedTable.id) {
        throw new Error("ID de mesa no encontrado");
      }

      if (!waiterId || waiterId === 0) {
        throw new Error("ID de mesero no válido");
      }

      if (!calculatedTotal || calculatedTotal <= 0) {
        throw new Error("Total de la orden debe ser mayor a 0");
      }

      const orderDishes = cartItems.map((d) => ({
        dishId: d.dish.id,
        quantity: d.quantity,
      }));

      const orderData = {
        table: selectedTable.id,
        waiterId: parseInt(waiterId),
        state: "IN_PROGRESS",
        totalAmount: parseFloat(calculatedTotal.toFixed(2)),
        paymentMethod: selectedPaymentMethod,
        orderDishes: orderDishes
      };

      Object.entries(orderData).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          throw new Error(`Campo requerido '${key}' está vacío: ${value}`);
        }
      });

      await createOrder(orderData);
      updateTableState(selectedTable.number, { state: "OCCUPIED" });
      setSelectedPaymentMethod("CASH");
      
    } catch (error) {
      
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleOpenMenu = () => {
    setShowMenuModal(true);
  };

  const handleCloseMenu = () => {
    setShowMenuModal(false);
  };

  const handleClearCart = () => {
    clearCart();
    setSelectedPaymentMethod("CASH");
  };

  return {
   
    selectedTable,
    waiterId,
    showMenuModal,
    isCreatingOrder,
    selectedPaymentMethod,
    calculatedTotal,
    safeCartItems,
    
   
    handleRemoveItem,
    handleUpdateQuantity,
    handleCreateOrder,
    handleOpenMenu,
    handleCloseMenu,
    handleClearCart,
    setSelectedPaymentMethod,
    
    
    getPaymentMethodTextSpanish
  };
};
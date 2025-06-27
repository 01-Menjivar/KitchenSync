import { useEffect } from "react";
import { useAuthStore } from "../../auth/store";
import { useTableStore } from "../../tables/store";
import { useWaiterStore } from "../store";


const getStateText = (state) => {
    const stateTranslations = {
        'IN_PROGRESS': 'En Progreso',
        'COMPLETED': 'Completada',
        'CANCELLED': 'Cancelada',
        'PENDING': 'Pendiente',
        'DELIVERED': 'Entregada',
        'PAID': 'Pagada',
        'READY_TO_SERVE': 'Lista para Servir'
    };
    return stateTranslations[state] || state;
};


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

export const useWaiterDashboard = () => {
    const waiterId = useAuthStore(state => state.user?.decodedToken?.id);
    const loadMyOrders = useWaiterStore(state => state.loadMyOrders);
    const myOrders = useWaiterStore(state => state.myOrders);
    const isLoadingOrders = useWaiterStore(state => state.isLoadingOrders);
    const selectedTable = useWaiterStore(state => state.selectedTable);
    const currentView = useWaiterStore(state => state.currentView);
    const setCurrentView = useWaiterStore(state => state.setCurrentView);
    const currentOrder = useWaiterStore(state => state.currentOrder);
    const tables = useTableStore(state => state.tables);

    useEffect(() => {
        if (waiterId) {
            loadMyOrders(waiterId);
        } else {
            
        }
    }, [waiterId, loadMyOrders]);

    const safeMyOrders = Array.isArray(myOrders) ? myOrders : [];

    const currentSelectedTable = selectedTable && tables.length > 0
        ? tables.find(table => table.id === selectedTable.id) || selectedTable
        : selectedTable;

    
    const handleNavigateToView = (view) => {
        
        if (view !== 'editOrder') {
            const setSelectedTable = useWaiterStore.getState().setSelectedTable;
            const clearCurrentOrder = useWaiterStore.getState().clearCurrentOrder;
            setSelectedTable(null);
            clearCurrentOrder();
        }
        setCurrentView(view);
    };

    
    const orderStats = {
        inProgress: safeMyOrders.filter(order => order.state === 'IN_PROGRESS').length,
        readyToServe: safeMyOrders.filter(order => order.state === 'READY_TO_SERVE').length,
        completed: safeMyOrders.filter(order => order.state === 'COMPLETED').length,
        totalToday: safeMyOrders.reduce((total, order) => total + (order.totalAmount || 0), 0)
    };

    return {
        
        waiterId,
        myOrders,
        isLoadingOrders,
        selectedTable,
        currentView,
        currentOrder,
        tables,
        safeMyOrders,
        currentSelectedTable,
        orderStats,
        
        
        handleNavigateToView,
        setCurrentView,
        
        
        getStateText,
        getPaymentMethodTextSpanish
    };
};
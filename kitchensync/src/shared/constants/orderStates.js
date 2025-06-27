// shared/constants/orderStates.js

export const ORDER_STATES = {
    IN_PROGRESS: 'IN_PROGRESS',
    READY_TO_SERVE: 'READY_TO_SERVE',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};

export const ORDER_STATE_CONFIG = {
    [ORDER_STATES.IN_PROGRESS]: {
        text: 'En Progreso',
        color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    [ORDER_STATES.READY_TO_SERVE]: {
        text: 'Listo para Servir',
        color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    [ORDER_STATES.COMPLETED]: {
        text: 'Completada',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    [ORDER_STATES.CANCELLED]: {
        text: 'Cancelada',
        color: 'bg-red-50 text-red-700 border-red-200'
    }
};

export const getOrderStateText = (state) => {
    return ORDER_STATE_CONFIG[state]?.text || state;
};

export const getOrderStateColor = (state) => {
    return ORDER_STATE_CONFIG[state]?.color || 'bg-gray-50 text-gray-700 border-gray-200';
};
export const TABLE_STATES = {
    AVAILABLE: 'AVAILABLE',
    OCCUPIED: 'OCCUPIED',
    RESERVED: 'RESERVED'
};

export const TABLE_STATE_CONFIG = {
    [TABLE_STATES.AVAILABLE]: {
        text: 'Disponible',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    [TABLE_STATES.OCCUPIED]: {
        text: 'Ocupada',
        color: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    [TABLE_STATES.RESERVED]: {
        text: 'Reservada',
        color: 'bg-amber-50 text-amber-700 border-amber-200'
    }
};

export const getStateColor = (state) => {
    return TABLE_STATE_CONFIG[state]?.color || 'bg-gray-50 text-gray-700 border-gray-200';
};

export const getStateText = (state) => {
    return TABLE_STATE_CONFIG[state]?.text || state;
};
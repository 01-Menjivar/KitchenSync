// shared/constants/paymentMethods.js

export const PAYMENT_METHODS = {
    CASH: 'CASH',
    CREDIT_CARD: 'CREDIT_CARD',
    DEBIT_CARD: 'DEBIT_CARD',
    MOBILE_PAYMENT: 'MOBILE_PAYMENT',
    BANK_TRANSFER: 'BANK_TRANSFER',
    OTHER: 'OTHER'
};

export const paymentMethodOptions = [
    { value: PAYMENT_METHODS.CASH, label: 'Efectivo' },
    { value: PAYMENT_METHODS.CREDIT_CARD, label: 'Tarjeta de Crédito' },
    { value: PAYMENT_METHODS.DEBIT_CARD, label: 'Tarjeta de Débito' },
    { value: PAYMENT_METHODS.MOBILE_PAYMENT, label: 'Pago Móvil' },
    { value: PAYMENT_METHODS.BANK_TRANSFER, label: 'Transferencia Bancaria' },
    { value: PAYMENT_METHODS.OTHER, label: 'Otro' }
];

export const getPaymentMethodText = (method) => {
    const methodMap = {
        [PAYMENT_METHODS.CASH]: 'Efectivo',
        [PAYMENT_METHODS.CREDIT_CARD]: 'Tarjeta de Crédito',
        [PAYMENT_METHODS.DEBIT_CARD]: 'Tarjeta de Débito',
        [PAYMENT_METHODS.MOBILE_PAYMENT]: 'Pago Móvil',
        [PAYMENT_METHODS.BANK_TRANSFER]: 'Transferencia Bancaria',
        [PAYMENT_METHODS.OTHER]: 'Otro'
    };
    return methodMap[method] || method;
};
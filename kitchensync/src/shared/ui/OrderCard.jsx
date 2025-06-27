import Button from "./Button";
import IconButton from "./IconButton";
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { getOrderStateText, getOrderStateColor } from "../constants/orderStates";
import { getPaymentMethodText } from "../constants/paymentMethods";
import OrderDishes from "./OrderDishes";

const OrderCard = ({ 
    order, 
    isUpdating, 
    isDeleting, 
    onCompleteOrder, 
    onDeleteOrder,
    orderDishes,
    loadingDishes,
    onToggleExpansion,
    isExpanded
}) => {
    const isProcessing = isUpdating || isDeleting;

    const getOrderNumber = (orderId) => {
        if (!orderId) return 'Sin número';
        return orderId.substring(0, 8).toUpperCase();
    };

    const getTableNumber = (order) => {
        if (order.table && order.table.number) {
            return order.table.number;
        }
        if (order.tableNumber) {
            return order.tableNumber;
        }
        return 'N/A';
    };

    return (
        <div
            className={`border-2 rounded-xl p-4 hover:shadow-lg transition-shadow duration-200 ${
                order.state === 'IN_PROGRESS' 
                    ? 'border-amber-300 bg-amber-50' 
                    : 'border-blue-300 bg-blue-50'
            } ${isProcessing ? 'opacity-50' : ''}`}
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 text-lg">
                        Mesa {getTableNumber(order)}
                    </span>
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getOrderStateColor(order.state)}`}>
                        {getOrderStateText(order.state)}
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <IconButton
                        onClick={() => onToggleExpansion(order.id)}
                        variant="secondary"
                        size="sm"
                        className="text-xs"
                    >
                        {isExpanded ? (
                            <IconChevronUp size={16} />
                        ) : (
                            <IconChevronDown size={16} />
                        )}
                    </IconButton>
                    {order.state !== 'COMPLETED '&& (
                        <Button
                            variant="success"
                            size="sm"
                            onClick={() => onCompleteOrder(order)}
                            disabled={isProcessing}
                            className="text-xs"
                        >
                            {isUpdating ? "Finalizando..." : "Finalizar"}
                        </Button>
                    )}
                    
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDeleteOrder(order.id)}
                        disabled={isProcessing}
                        className="text-xs"
                    >
                        {isDeleting ? "Eliminando..." : "Eliminar"}
                    </Button>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                <div className="flex items-center gap-4">
                    <span>${order.totalAmount?.toFixed(2) || '0.00'}</span>
                    <span>{getPaymentMethodText(order.paymentMethod)}</span>
                </div>
                {order.createdAt && (
                    <span className="text-xs text-slate-500">
                        {new Date(order.createdAt).toLocaleString()}
                    </span>
                )}
            </div>

            {isExpanded && (
                <div className="border-t border-slate-200 pt-3 mt-3">
                    <OrderDishes 
                        orderId={order.id}
                        dishes={orderDishes}
                        isLoading={loadingDishes}
                    />
                </div>
            )}
        </div>
    );
};

export default OrderCard;
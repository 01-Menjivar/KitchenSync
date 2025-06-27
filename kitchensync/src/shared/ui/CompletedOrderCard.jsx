import { getOrderStateColor, getOrderStateText } from "../constants/orderStates";
import { getPaymentMethodText } from "../constants/paymentMethods";

const CompletedOrderCard = ({ order }) => {
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
        <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 opacity-75">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="font-medium text-slate-700">
                        Mesa {getTableNumber(order)}
                    </span>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getOrderStateColor(order.state)}`}>
                        {getOrderStateText(order.state)}
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-sm font-medium text-slate-600">
                        ${order.totalAmount?.toFixed(2) || '0.00'}
                    </span>
                    <div className="text-xs text-slate-500">
                        {getPaymentMethodText(order.paymentMethod)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedOrderCard;
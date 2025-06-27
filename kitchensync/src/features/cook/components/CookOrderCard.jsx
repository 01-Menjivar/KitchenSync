import { IconCreditCard, IconLicense, IconBowlSpoon, IconToolsKitchen3, IconCheck, IconClock } from '@tabler/icons-react';

const CookOrderCard = ({ order, dishes, handleUpdateOrderState, getStateColors, getStateText, getPaymentMethodText }) => {
    const colors = getStateColors(order.state);

    return (
        <div className={`${colors.bg} ${colors.border} border-2 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] transform overflow-hidden`}>
            <div className="bg-white p-4 border-b-2 border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`${colors.button} p-3 rounded-xl shadow-md`}>
                            <IconLicense stroke={2} className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Mesa #{order.tableNumber}</h3>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse"></div>
                                {getStateText(order.state)}
                            </span>
                        </div>
                    </div>
                    
                    <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                        <div className="flex items-center gap-2 text-gray-500">
                            <IconCreditCard stroke={2} className="w-4 h-4" />
                            <span className="text-sm">{getPaymentMethodText(order.paymentMethod)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <IconBowlSpoon stroke={2} className="w-5 h-5 text-gray-700" />
                    <h4 className="font-bold text-gray-900 text-lg">Platillos a preparar</h4>
                </div>

                {dishes[order.id] && dishes[order.id].length > 0 ? (
                    <div className="space-y-3 mb-6">
                        {dishes[order.id].map((dish, index) => (
                            <div 
                                key={dish.dishId} 
                                className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 transition-all duration-200 hover:shadow-md transform hover:scale-[1.01] hover:border-gray-300"
                                style={{animationDelay: `${index * 0.1}s`}}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                                        <IconToolsKitchen3 stroke={2} className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900 text-lg">{dish.name}</h5>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-xl font-bold text-lg shadow-lg">
                                    x{dish.quantity}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-xl p-6 text-center mb-6">
                        <IconBowlSpoon stroke={2} className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">No hay platillos en esta orden</p>
                    </div>
                )}

                <div className="flex justify-end">
                    {order.state === "IN_PROGRESS" || order.state === "READY_TO_SERVE" ? (
                        <button
                            onClick={() =>
                                handleUpdateOrderState(
                                    order.id,
                                    order.state === "IN_PROGRESS"
                                        ? "READY_TO_SERVE"
                                        : "IN_PROGRESS"
                                )
                            }
                            className={`flex items-center gap-2 px-6 py-3 ${colors.button} text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105`}
                        >
                            {order.state === "IN_PROGRESS" ? (
                                <>
                                    <IconCheck stroke={2} className="w-5 h-5" />
                                    PLATILLOS LISTOS
                                </>
                            ) : (
                                <>
                                    <IconClock stroke={2} className="w-5 h-5" />
                                    VOLVER A COCINA
                                </>
                            )}
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default CookOrderCard;
const DashboardSidebar = ({ 
    currentSelectedTable, 
    currentView, 
    currentOrder, 
    orderStats, 
    getStateText, 
    getPaymentMethodTextSpanish 
}) => {
    return (
        <div className="space-y-8">
            {currentSelectedTable && (
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 border-2 border-gray-200 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <h3 className="text-xl font-bold text-gray-900">
                            Mesa Seleccionada
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                            <span className="text-gray-600 font-medium">Número:</span>
                            <span className="font-bold text-lg text-gray-900">Mesa {currentSelectedTable.number}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                            <span className="text-gray-600 font-medium">Estado:</span>
                            <span className={`font-bold text-lg px-3 py-1 rounded-full text-sm ${
                                currentSelectedTable.state === 'AVAILABLE' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                            }`}>
                                {currentSelectedTable.state === 'AVAILABLE' ? 'Disponible' : 'Ocupada'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                            <span className="text-gray-600 font-medium">Acción:</span>
                            <span className="font-bold text-lg text-blue-600">
                                {currentSelectedTable.state === 'AVAILABLE' 
                                    ? 'Nueva Orden' 
                                    : 'Editar Orden'
                                }
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 border-2 border-gray-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Estadísticas</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                        <span className="text-gray-700 font-medium">En Progreso:</span>
                        <div className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-md">
                            {orderStats.inProgress}
                        </div>
                    </div>
                     <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <span className="text-gray-700 font-medium">Listas para Servir:</span>
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-md">
                            {orderStats.readyToServe}
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                        <span className="text-gray-700 font-medium">Completadas:</span>
                        <div className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-md">
                            {orderStats.completed}
                        </div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                        <span className="text-gray-700 font-medium">Total:</span>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-md">
                            ${orderStats.totalToday.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>

            {currentView === 'editOrder' && currentOrder && (
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 border-2 border-gray-200 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                        <h3 className="text-xl font-bold text-gray-900">
                            Información de la Orden
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                            <span className="text-gray-600 font-medium">Estado:</span>
                            <span className="font-bold text-lg text-gray-900">
                                {getStateText(currentOrder.state)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                            <span className="text-gray-600 font-medium">Total Original:</span>
                            <span className="font-bold text-lg bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                ${currentOrder.totalAmount?.toFixed(2) || '0.00'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                            <span className="text-gray-600 font-medium">Método de Pago:</span>
                            <span className="font-bold text-lg text-gray-900">
                                {getPaymentMethodTextSpanish(currentOrder.paymentMethod) || 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardSidebar;
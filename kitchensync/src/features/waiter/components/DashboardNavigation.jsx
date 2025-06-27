import { IconCheckupList, IconTableHeart, IconPlus, IconEdit } from '@tabler/icons-react';

const DashboardNavigation = ({ 
    currentView, 
    selectedTable, 
    isLoadingOrders, 
    safeMyOrders, 
    onNavigateToView 
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <button
                onClick={() => onNavigateToView('orders')}
                className={`group relative text-left bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform overflow-hidden ${
                    currentView === 'orders' 
                        ? 'border-amber-400 ring-4 ring-amber-300 ring-opacity-50 shadow-amber-200' 
                        : 'border-gray-200 hover:border-amber-300'
                }`}
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400 rounded-full opacity-10 transform translate-x-8 -translate-y-8"></div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <IconCheckupList stroke={2} className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Mis Órdenes</h3>
                        <p className="text-gray-600 font-medium">
                            {isLoadingOrders ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                                    Cargando...
                                </span>
                            ) : (
                                `${safeMyOrders.length} órdenes activas`
                            )}
                        </p>
                    </div>
                </div>
            </button>

            <button
                onClick={() => onNavigateToView('tables')}
                className={`group relative text-left bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform overflow-hidden ${
                    currentView === 'tables' 
                        ? 'border-emerald-400 ring-4 ring-emerald-300 ring-opacity-50 shadow-emerald-200' 
                        : 'border-gray-200 hover:border-emerald-300'
                }`}
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400 rounded-full opacity-10 transform translate-x-8 -translate-y-8"></div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <IconTableHeart stroke={2} className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Seleccionar Mesa</h3>
                        <p className="text-gray-600 font-medium">Ver mesas disponibles</p>
                    </div>
                </div>
            </button>

            <button
                onClick={() => onNavigateToView('newOrder')}
                className={`group relative text-left bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform overflow-hidden ${
                    currentView === 'newOrder' 
                        ? 'border-blue-400 ring-4 ring-blue-300 ring-opacity-50 shadow-blue-200' 
                        : 'border-gray-200 hover:border-blue-300'
                }`}
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400 rounded-full opacity-10 transform translate-x-8 -translate-y-8"></div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <IconPlus stroke={2} className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Nueva Orden</h3>
                        <p className="text-gray-600 font-medium">
                            {selectedTable ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Mesa {selectedTable.number}
                                </span>
                            ) : (
                                'Selecciona una mesa'
                            )}
                        </p>
                    </div>
                </div>
            </button>

            <button
                onClick={() => onNavigateToView('editOrder')}
                className={`group relative text-left bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 border-2 transition-all duration-300 hover:shadow-2xl transform overflow-hidden ${
                    !selectedTable || selectedTable.state !== 'OCCUPIED'
                        ? 'opacity-60 cursor-not-allowed border-gray-300'
                        : currentView === 'editOrder' 
                        ? 'border-purple-400 ring-4 ring-purple-300 ring-opacity-50 shadow-purple-200 hover:scale-105' 
                        : 'border-gray-200 hover:border-purple-300 hover:scale-105'
                }`}
                disabled={!selectedTable || selectedTable.state !== 'OCCUPIED'}
            >
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 transform translate-x-8 -translate-y-8 ${
                    !selectedTable || selectedTable.state !== 'OCCUPIED' ? 'bg-gray-400' : 'bg-purple-400'
                }`}></div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-lg ${
                        !selectedTable || selectedTable.state !== 'OCCUPIED' 
                            ? 'from-gray-400 via-gray-500 to-gray-600' 
                            : 'from-purple-500 via-purple-600 to-indigo-600'
                    }`}>
                        <IconEdit stroke={2} className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Editar Orden</h3>
                        <p className="text-gray-600 font-medium">
                            {selectedTable?.state === 'OCCUPIED' ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                    Mesa {selectedTable.number}
                                </span>
                            ) : (
                                'Mesa ocupada requerida'
                            )}
                        </p>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default DashboardNavigation;
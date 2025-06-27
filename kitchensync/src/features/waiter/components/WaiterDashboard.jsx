import Layout from "../../../shared/ui/Layout";
import { IconTableHeart, IconEdit, IconPlus, IconUserStar } from '@tabler/icons-react';
import { useWaiterDashboard } from "../services/useWaiterDashboard";
import DashboardNavigation from "./DashboardNavigation";
import DashboardSidebar from "./DashboardSidebar";
import MyOrders from "./MyOrders";
import TableSelector from "./TableSelector";
import OrderDetail from "./OrderDetail";
import EditOrder from "./EditOrder";

const WaiterDashboard = () => {
    const {
        waiterId,
        myOrders,
        isLoadingOrders,
        selectedTable,
        currentView,
        currentOrder,
        safeMyOrders,
        currentSelectedTable,
        orderStats,
        handleNavigateToView,
        setCurrentView,
        getStateText,
        getPaymentMethodTextSpanish
    } = useWaiterDashboard();

    if (!waiterId) {
        return (
            <Layout>
                <div className="min-h-screen">
                    <div className="max-w-7xl mx-auto p-8">
                        <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-2xl p-8 shadow-xl">
                            <div className="text-center">
                                
                                <h2 className="text-2xl font-bold text-red-900 mb-4">Error de Autenticación</h2>
                                <div className="text-red-700 space-y-3 text-lg">
                                    <p>No se pudo obtener el ID del mesero.</p>
                                    <p>Inicia sesión nuevamente.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen">
                <div className="max-w-7xl mx-auto p-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                                    <IconUserStar className="w-6 h-6 text-white" stroke={2} />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">Dashboard del Mesero</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <DashboardNavigation
                            currentView={currentView}
                            selectedTable={selectedTable}
                            isLoadingOrders={isLoadingOrders}
                            safeMyOrders={safeMyOrders}
                            onNavigateToView={handleNavigateToView}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {currentView === 'orders' && (
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                                    <MyOrders/>
                                </div>
                            )}
                           
                            {currentView === 'tables' && (
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                                    <TableSelector/>
                                </div>
                            )}
                           
                            {currentView === 'newOrder' && (
                                <>
                                    {!selectedTable ? (
                                        <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-12 border-2 border-amber-200">
                                            <div className="text-center">
                                                <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                                    <IconTableHeart className="w-10 h-10 text-white" stroke={2} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-amber-900 mb-4">
                                                    Selecciona una mesa primero
                                                </h3>
                                                <p className="text-amber-700 mb-6 text-lg">
                                                    Para crear una nueva orden, necesitas seleccionar una mesa disponible
                                                </p>
                                                <button
                                                    onClick={() => setCurrentView('tables')}
                                                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                                                >
                                                    Ir a Mesas
                                                </button>
                                            </div>
                                        </div>
                                    ) : selectedTable.state === 'OCCUPIED' ? (
                                        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-12 border-2 border-blue-200">
                                            <div className="text-center">
                                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                                    <IconEdit className="w-10 h-10 text-white" stroke={2} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                                                    Mesa Ocupada - Mesa {selectedTable.number}
                                                </h3>
                                                <p className="text-blue-700 mb-6 text-lg">
                                                    Esta mesa ya tiene una orden activa. ¿Quieres editarla?
                                                </p>
                                                <button
                                                    onClick={() => setCurrentView('editOrder')}
                                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                                                >
                                                    Editar Orden Existente
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                                            <OrderDetail
                                                selectedTable={currentSelectedTable}
                                            />
                                        </div>
                                    )}
                                </>
                            )}

                            {currentView === 'editOrder' && (
                                <>
                                    {!selectedTable ? (
                                        <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl p-12 border-2 border-purple-200">
                                            <div className="text-center">
                                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                                    <IconEdit className="w-10 h-10 text-white" stroke={2} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                                                    Selecciona una mesa ocupada
                                                </h3>
                                                <p className="text-purple-700 mb-6 text-lg">
                                                    Solo puedes editar órdenes de mesas que estén ocupadas
                                                </p>
                                                <button
                                                    onClick={() => setCurrentView('tables')}
                                                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                                                >
                                                    Ir a Mesas
                                                </button>
                                            </div>
                                        </div>
                                    ) : selectedTable.state !== 'OCCUPIED' ? (
                                        <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-xl p-12 border-2 border-amber-200">
                                            <div className="text-center">
                                                <div className="bg-gradient-to-br from-amber-500 to-amber-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                                    <IconPlus className="w-10 h-10 text-white" stroke={2} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-amber-900 mb-4">
                                                    Mesa Disponible - Mesa {selectedTable.number}
                                                </h3>
                                                <p className="text-amber-700 mb-6 text-lg">
                                                    Esta mesa está disponible. ¿Quieres crear una nueva orden?
                                                </p>
                                                <button
                                                    onClick={() => setCurrentView('newOrder')}
                                                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                                                >
                                                    Crear Nueva Orden
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                                            <EditOrder />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="space-y-4">
                            {currentSelectedTable && (
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">
                                            Mesa Seleccionada
                                        </h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-200">
                                            <span className="text-gray-600 font-medium">Número:</span>
                                            <span className="font-bold text-gray-900">Mesa {currentSelectedTable.number}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-200">
                                            <span className="text-gray-600 font-medium">Estado:</span>
                                            <span className={`font-bold px-2 py-1 rounded-full text-sm ${
                                                currentSelectedTable.state === 'AVAILABLE' 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : 'bg-red-100 text-red-700'
                                            }`}>
                                                {currentSelectedTable.state === 'AVAILABLE' ? 'Disponible' : 'Ocupada'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-200">
                                            <span className="text-gray-600 font-medium">Acción:</span>
                                            <span className="font-bold text-blue-600">
                                                {currentSelectedTable.state === 'AVAILABLE' 
                                                    ? 'Nueva Orden' 
                                                    : 'Editar Orden'
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Estadísticas</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                                        <span className="text-gray-700 font-medium">En Progreso:</span>
                                        <div className="bg-orange-500 text-white px-3 py-1 rounded-lg font-bold shadow-md">
                                            {orderStats.inProgress}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                                        <span className="text-gray-700 font-medium">Listas para Servir:</span>
                                        <div className="bg-blue-500 text-white px-3 py-1 rounded-lg font-bold shadow-md">
                                            {orderStats.readyToServe}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                                        <span className="text-gray-700 font-medium">Completadas:</span>
                                        <div className="bg-green-500 text-white px-3 py-1 rounded-lg font-bold shadow-md">
                                            {orderStats.completed}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                                        <span className="text-gray-700 font-medium">Total:</span>
                                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-lg font-bold shadow-md">
                                            ${orderStats.totalToday.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {currentView === 'editOrder' && currentOrder && (
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">
                                            Información de la Orden
                                        </h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-200">
                                            <span className="text-gray-600 font-medium">Estado:</span>
                                            <span className="font-bold text-gray-900">
                                                {getStateText(currentOrder.state)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-200">
                                            <span className="text-gray-600 font-medium">Total Original:</span>
                                            <span className="font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                                                ${currentOrder.totalAmount?.toFixed(2) || '0.00'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center p-2 bg-white rounded-lg border border-gray-200">
                                            <span className="text-gray-600 font-medium">Método de Pago:</span>
                                            <span className="font-bold text-gray-900">
                                                {getPaymentMethodTextSpanish(currentOrder.paymentMethod) || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default WaiterDashboard;
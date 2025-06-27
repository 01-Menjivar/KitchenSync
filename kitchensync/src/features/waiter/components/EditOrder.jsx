import Button from "../../../shared/ui/Button";
import Select from "../../../shared/ui/Select";
import { paymentMethodOptions } from "../../../shared/constants/paymentMethods";
import { IconMinus, IconPlus, IconX, IconEdit } from "@tabler/icons-react";
import { useEditOrder } from "../services/useEditOrder";
import EditOrderModals from "./EditOrderModals";

const getStateText = (state) => {
  const stateTranslations = {
    'IN_PROGRESS': 'En Progreso',
    'COMPLETED': 'Completada',
    'CANCELLED': 'Cancelada',
    'PENDING': 'Pendiente',
    'DELIVERED': 'Entregada',
    'PAID': 'Pagada'
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

const EditOrder = () => {
  const {
    selectedTable,
    currentOrder,
    waiterId,
    showMenuModal,
    isUpdatingOrder,
    selectedPaymentMethod,
    hasChanges,
    showSuccessModal,
    calculatedTotal,
    safeCartItems,
    handleRemoveItem,
    handleUpdateQuantity,
    handleUpdateOrder,
    handleOpenMenu,
    handleCloseMenu,
    handleClearChanges,
    handleContinueEditing,
    handleFinishEditing,
    setSelectedPaymentMethod
  } = useEditOrder();

  if (!selectedTable) {
    return (
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl p-12 border-2 border-purple-200 h-full">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-purple-900 mb-3">
            Selecciona una mesa
          </h3>
          <p className="text-purple-700 text-lg">
            Elige una mesa ocupada para editar su orden
          </p>
        </div>
      </div>
    );
  }

  if (!currentOrder) {
    return (
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-12 border-2 border-blue-200 h-full">
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
          <h3 className="text-2xl font-bold text-blue-900 mb-3">
            Cargando orden de la mesa...
          </h3>
          <p className="text-blue-700 text-lg">
            Obteniendo información de la orden actual
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl p-8 border-2 border-indigo-200 h-full">
        <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-indigo-100">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-700 bg-clip-text text-transparent mb-2 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <IconEdit size={20} className="text-white" />
              </div>
              Editar Orden - Mesa {selectedTable.number}
            </h2>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-4 rounded-xl border border-indigo-200">
            <p className="text-indigo-800 font-semibold">Mesero: {waiterId}</p>
            <p className="text-indigo-700 text-sm">
              Estado: {getStateText(currentOrder.state)}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              Platillos ({safeCartItems.length})
            </h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleOpenMenu}
              disabled={isUpdatingOrder}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-6 py-3 rounded-xl font-semibold"
            >
              Agregar Platillos
            </Button>
          </div>

          {safeCartItems.length === 0 ? (
            <div className="border-2 border-dashed border-orange-300 rounded-2xl p-12 text-center bg-gradient-to-br from-orange-50 to-amber-100">
              <p className="text-orange-700 font-medium text-lg">
                No hay platillos en esta orden
              </p>
              <p className="text-orange-600 text-sm mt-2">
                Agrega platillos para continuar
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {safeCartItems.map((item, index) => {
                if (!item || !item.dish) {
                  return null;
                }

                return (
                  <div
                    key={item.dish.id || index}
                    className={`bg-white rounded-2xl p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] ${
                      item.isNew 
                        ? 'border-emerald-300 ring-2 ring-emerald-200 ring-opacity-50' 
                        : 'border-indigo-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-indigo-900">
                            {item.dish.name || "Sin nombre"}
                          </h4>
                          {item.isNew && (
                            <span className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold border border-emerald-300">
                              Nuevo
                            </span>
                          )}
                        </div>
                        <p className="text-indigo-700 font-medium">
                          ${item.dish.price || 0} x {item.quantity || 0}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mx-6">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.dish.id, item.quantity - 1)
                          }
                          className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 flex items-center justify-center text-white transition-all duration-200 shadow-lg transform hover:scale-110 disabled:opacity-50"
                          disabled={isUpdatingOrder}
                        >
                          <IconMinus stroke={2} size={18} />
                        </button>
                        <span className="w-12 text-center font-bold text-lg text-indigo-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.dish.id, item.quantity + 1)
                          }
                          className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 flex items-center justify-center text-white transition-all duration-200 shadow-lg transform hover:scale-110"
                          disabled={isUpdatingOrder}
                        >
                          <IconPlus stroke={2} size={18} />
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.dish.id)}
                          className="ml-2 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 flex items-center justify-center text-white transition-all duration-200 shadow-lg transform hover:scale-110"
                          disabled={isUpdatingOrder}
                        >
                          <IconX stroke={2} size={18} />
                        </button>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 min-w-24">
                        <p className="font-bold text-lg bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent text-center">
                          $
                          {(
                            (item.dish.price || 0) * (item.quantity || 0)
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {safeCartItems.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              Método de Pago
            </h4>
            <Select
              name="paymentMethod"
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              options={paymentMethodOptions}
              disabled={isUpdatingOrder}
              className="w-full h-12 text-lg border-2 border-indigo-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-100 bg-white shadow-md"
            />
          </div>
        )}

        {safeCartItems.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-100 rounded-2xl p-6 border-2 border-purple-200 mb-8 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl font-bold text-indigo-900">
                Total
              </span>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
                ${calculatedTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-indigo-700 font-medium">Método de pago:</span>
              <span className="font-bold text-indigo-900">
                {getPaymentMethodTextSpanish(selectedPaymentMethod)}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {safeCartItems.length > 0 && hasChanges && (
            <Button
              variant="success"
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl"
              onClick={handleUpdateOrder}
              disabled={isUpdatingOrder}
            >
              {isUpdatingOrder
                ? "Actualizando..."
                : `Actualizar Orden ($${calculatedTotal.toFixed(2)})`}
            </Button>
          )}

          {hasChanges && (
            <Button
              variant="outline"
              className="w-full h-12 text-lg font-semibold border-2 border-indigo-300 hover:border-purple-400 bg-white hover:bg-indigo-50 transition-all duration-300 rounded-xl transform hover:scale-105"
              onClick={handleClearChanges}
              disabled={isUpdatingOrder}
            >
              Cancelar Cambios
            </Button>
          )}
        </div>
      </div>

      <EditOrderModals
        showMenuModal={showMenuModal}
        onCloseMenu={handleCloseMenu}
        selectedTable={selectedTable}
        showSuccessModal={showSuccessModal}
        calculatedTotal={calculatedTotal}
        selectedPaymentMethod={selectedPaymentMethod}
        onContinueEditing={handleContinueEditing}
        onFinishEditing={handleFinishEditing}
      />
    </>
  );
};

export default EditOrder;
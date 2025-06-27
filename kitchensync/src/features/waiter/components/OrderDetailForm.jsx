import Button from "../../../shared/ui/Button";
import Select from "../../../shared/ui/Select";
import { paymentMethodOptions } from "../../../shared/constants/paymentMethods";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";

const OrderDetailForm = ({
  selectedTable,
  waiterId,
  safeCartItems,
  isCreatingOrder,
  selectedPaymentMethod,
  calculatedTotal,
  onRemoveItem,
  onUpdateQuantity,
  onOpenMenu,
  onCreateOrder,
  onClearCart,
  onPaymentMethodChange,
  getPaymentMethodTextSpanish
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 border-2 border-blue-200 h-full">
      <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-blue-100">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-transparent mb-2">
            Nueva Orden - Mesa {selectedTable.number}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-blue-700 font-medium">Estado:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              selectedTable.state === "AVAILABLE" 
                ? "bg-green-100 text-green-800 border border-green-300" 
                : "bg-red-100 text-red-800 border border-red-300"
            }`}>
              {selectedTable.state === "AVAILABLE" ? "Disponible" : "Ocupada"}
            </span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <p className="text-blue-800 font-semibold">Mesero: {waiterId}</p>
        </div>
      </div>

      {selectedTable.state !== "AVAILABLE" && (
        <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3">
            <p className="text-red-800 font-medium text-lg">
              Mesa ocupada. Selecciona una mesa disponible.
            </p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-blue-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            Platillos ({safeCartItems.length})
          </h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenMenu}
            disabled={isCreatingOrder || selectedTable.state !== "AVAILABLE"}
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
              Agrega platillos para comenzar
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
                  className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-blue-900 mb-2">
                        {item.dish.name || "Sin nombre"}
                      </h4>
                      <p className="text-blue-700 font-medium">
                        ${item.dish.price || 0} x {item.quantity || 0}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mx-6">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.dish.id, item.quantity - 1)
                        }
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 flex items-center justify-center text-white transition-all duration-200 shadow-lg transform hover:scale-110 disabled:opacity-50"
                        disabled={isCreatingOrder}
                      >
                        <IconMinus stroke={2} size={18} />
                      </button>
                      <span className="w-12 text-center font-bold text-lg text-blue-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.dish.id, item.quantity + 1)
                        }
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 flex items-center justify-center text-white transition-all duration-200 shadow-lg transform hover:scale-110"
                        disabled={isCreatingOrder}
                      >
                        <IconPlus stroke={2} size={18} />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.dish.id)}
                        className="ml-2 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 flex items-center justify-center text-white transition-all duration-200 shadow-lg transform hover:scale-110"
                        disabled={isCreatingOrder}
                      >
                        <IconX stroke={2} size={18} />
                      </button>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 min-w-24">
                      <p className="font-bold text-lg bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent text-center">
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
          <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            Método de Pago
          </h4>
          <Select
            name="paymentMethod"
            value={selectedPaymentMethod}
            onChange={(e) => onPaymentMethodChange(e.target.value)}
            options={paymentMethodOptions}
            disabled={isCreatingOrder}
            className="w-full h-12 text-lg border-2 border-blue-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-100 bg-white shadow-md"
          />
        </div>
      )}

      {safeCartItems.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-100 rounded-2xl p-6 border-2 border-purple-200 mb-8 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xl font-bold text-blue-900">
              Total
            </span>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-700 bg-clip-text text-transparent">
              ${calculatedTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-700 font-medium">Método de pago:</span>
            <span className="font-bold text-blue-900">
              {getPaymentMethodTextSpanish(selectedPaymentMethod)}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {safeCartItems.length > 0 && selectedTable.state === "AVAILABLE" && (
          <Button
            variant="success"
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl"
            onClick={onCreateOrder}
            disabled={isCreatingOrder}
          >
            {isCreatingOrder
              ? "Creando..."
              : `Crear Orden ($${calculatedTotal.toFixed(2)})`}
          </Button>
        )}

        {safeCartItems.length > 0 && (
          <Button
            variant="outline"
            className="w-full h-12 text-lg font-semibold border-2 border-blue-300 hover:border-purple-400 bg-white hover:bg-blue-50 transition-all duration-300 rounded-xl transform hover:scale-105"
            onClick={onClearCart}
            disabled={isCreatingOrder}
          >
            Limpiar Carrito
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderDetailForm;
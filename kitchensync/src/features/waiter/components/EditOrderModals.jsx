import MenuModal from "./MenuModal";
import Button from "../../../shared/ui/Button";
import { IconCheck } from "@tabler/icons-react";

// Función para traducir métodos de pago
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

const EditOrderModals = ({
  showMenuModal,
  onCloseMenu,
  selectedTable,
  showSuccessModal,
  calculatedTotal,
  selectedPaymentMethod,
  onContinueEditing,
  onFinishEditing
}) => {
  return (
    <>
      {/* Menu Modal */}
      <MenuModal
        isOpen={showMenuModal}
        onClose={onCloseMenu}
        selectedTable={selectedTable}
        isEditMode={true}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-50/90 to-emerald-50/90 backdrop-blur-sm border-b border-green-200/50 p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconCheck size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                ¡Orden Actualizada!
              </h3>
              <p className="text-slate-600">
                Los cambios se han guardado correctamente en la Mesa {selectedTable?.number}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 bg-gradient-to-b from-white/60 to-white/40 backdrop-blur-sm">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total actualizado:</span>
                  <span className="font-semibold text-slate-900">
                    ${calculatedTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Método de pago:</span>
                  <span className="font-medium text-slate-900">
                    {getPaymentMethodTextSpanish(selectedPaymentMethod)}
                  </span>
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="text-slate-700 font-medium mb-2">
                  ¿Quieres continuar editando esta orden?
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={onContinueEditing}
                >
                  Continuar Editando
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onFinishEditing}
                >
                  Finalizar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditOrderModals;
import { useOrderDetail } from "../services/useOrderDetail";
import OrderDetailForm from "./OrderDetailForm";
import MenuModal from "./MenuModal";

const OrderDetail = () => {
  const {
    selectedTable,
    waiterId,
    showMenuModal,
    isCreatingOrder,
    selectedPaymentMethod,
    calculatedTotal,
    safeCartItems,
    handleRemoveItem,
    handleUpdateQuantity,
    handleCreateOrder,
    handleOpenMenu,
    handleCloseMenu,
    handleClearCart,
    setSelectedPaymentMethod,
    getPaymentMethodTextSpanish
  } = useOrderDetail();

  if (!selectedTable) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-100 h-full">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Selecciona una mesa
          </h3>
        </div>
      </div>
    );
  }

  return (
    <>
      <OrderDetailForm
        selectedTable={selectedTable}
        waiterId={waiterId}
        safeCartItems={safeCartItems}
        isCreatingOrder={isCreatingOrder}
        selectedPaymentMethod={selectedPaymentMethod}
        calculatedTotal={calculatedTotal}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onOpenMenu={handleOpenMenu}
        onCreateOrder={handleCreateOrder}
        onClearCart={handleClearCart}
        onPaymentMethodChange={setSelectedPaymentMethod}
        getPaymentMethodTextSpanish={getPaymentMethodTextSpanish}
      />

      <MenuModal
        isOpen={showMenuModal}
        onClose={handleCloseMenu}
        selectedTable={selectedTable}
      />
    </>
  );
};

export default OrderDetail;
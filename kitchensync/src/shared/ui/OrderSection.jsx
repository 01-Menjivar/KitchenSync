const OrdersSection = ({ title, children, maxHeight = null }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                {title}
            </h3>
            <div className={`space-y-3 ${maxHeight ? `${maxHeight} overflow-y-auto` : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default OrdersSection;
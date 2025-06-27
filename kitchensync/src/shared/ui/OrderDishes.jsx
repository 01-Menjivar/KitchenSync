
const OrderDishes = ({ orderId, dishes, isLoading }) => {
    const orderDishes = dishes[orderId] || [];
    const loading = isLoading[orderId];

    if (loading) {
        return (
            <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"></div>
                <p className="ml-2 text-sm text-slate-600">Cargando platillos...</p>
            </div>
        );
    }

    if (!orderDishes || orderDishes.length === 0) {
        return (
            <div className="text-center py-3 text-sm text-slate-500">
                No hay platillos disponibles
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Platillos:</h4>
            {orderDishes.map((dish, index) => (
                <DishItem 
                    key={`${dish.dishId}-${index}`}
                    dish={dish}
                />
            ))}
        </div>
    );
};

const DishItem = ({ dish }) => {
    return (
        <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-slate-200">
            <div className="flex-1">
                <span className="text-sm font-medium text-slate-900">
                    {dish.name}
                </span>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-600">
                        Cantidad: {dish.quantity}
                    </span>
                </div>
            </div>
            {dish.price && (
                <div className="text-right">
                    <span className="text-sm font-medium text-slate-900">
                        ${(dish.price * dish.quantity).toFixed(2)}
                    </span>
                    <div className="text-xs text-slate-500">
                        ${dish.price.toFixed(2)} c/u
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDishes;
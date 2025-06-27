import { useEffect, useState } from "react";
import { useWaiterStore } from "../store";
import { useDishStore } from "../../dishes/store";
import { dishCategories } from "../../../shared/constants/dishCategories";
import Button from "../../../shared/ui/Button";
import Select from "../../../shared/ui/Select";
import Input from "../../../shared/ui/Input";
import { IconSearch, IconX, IconMinus, IconPlus } from '@tabler/icons-react';

const MenuModal = ({ isOpen, onClose }) => {
    const dishes = useDishStore(state => state.dishes);
    const isLoadingDishes = useDishStore(state => state.isLoadingDishes);
    const loadDishes = useDishStore(state => state.loadDishes);
    
    const addToCart = useWaiterStore(state => state.addToCart);
    const selectedTable = useWaiterStore(state => state.selectedTable);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [selectedItems, setSelectedItems] = useState({});

    useEffect(() => {
        if (isOpen) {
            loadDishes().catch((error) => {
            });
        }
    }, [isOpen, loadDishes]);

    const safeDishes = Array.isArray(dishes) ? dishes : [];
    const filteredDishes = safeDishes.filter(dish => {
        const matchesSearch = dish?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dish?.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !filterCategory || dish?.category === filterCategory;
        const isAvailable = dish?.isAvailable === true;

        return matchesSearch && matchesCategory && isAvailable;
    });

    const handleQuantityChange = (dishId, quantity) => {
        setSelectedItems(prev => ({
            ...prev,
            [dishId]: Math.max(0, quantity)
        }));
    };

    const handleAddToCart = () => {
        let itemsAdded = 0;

        Object.entries(selectedItems).forEach(([dishId, quantity]) => {
            if (quantity > 0) {
                const dish = safeDishes.find(d => d.id === dishId);

                if (dish) {
                    try {
                        addToCart(dish, quantity);
                        itemsAdded++;
                    } catch (error) {
                    }
                }
            }
        });

        if (itemsAdded > 0) {
            setSelectedItems({});
            onClose();
        }
    };

    const getTotalSelectedItems = () => {
        return Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);
    };

    const getTotalPrice = () => {
        return Object.entries(selectedItems).reduce((total, [dishId, quantity]) => {
            const dish = safeDishes.find(d => d.id === dishId);
            return total + (dish ? dish.price * quantity : 0);
        }, 0);
    };

    const handleClose = () => {
        setSelectedItems({});
        setSearchTerm("");
        setFilterCategory("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Menú de Platillos</h2>
                            <p className="text-gray-600 text-lg">Mesa {selectedTable?.number}</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center transition-all duration-200 shadow-md border border-gray-200 hover:shadow-lg"
                        >
                            <IconX size={24} className="text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Filtros */}
                <div className="p-8 border-b border-gray-100 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Buscar platillos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-12 h-12 text-lg border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <IconSearch size={20} className="text-gray-400" />
                            </div>
                        </div>
                        <Select
                            name="filterCategory"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            placeholder="Todas las categorías"
                            className="h-12 text-lg border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            options={[
                                { value: "", label: "Todas las categorías" },
                                ...dishCategories
                            ]}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 bg-white" style={{ maxHeight: '450px' }}>
                    {isLoadingDishes ? (
                        <div className="flex justify-center items-center py-16">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
                            <p className="ml-6 text-gray-600 text-lg">Cargando...</p>
                        </div>
                    ) : filteredDishes.length === 0 ? (
                        <div className="text-center py-16">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                No se encontraron platillos
                            </h3>
                            <p className="text-gray-600">Intenta con otros criterios de búsqueda</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredDishes.map((dish) => (
                                <div
                                    key={dish.id}
                                    className="border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-blue-300 bg-white hover:scale-[1.02] group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-700 transition-colors">{dish.name}</h3>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                                                {dish.description}
                                            </p>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                                                    {dishCategories.find(cat => cat.value === dish.category)?.label || dish.category}
                                                </span>
                                                <span className="text-xl font-bold text-green-600">
                                                    ${dish.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => {
                                                    handleQuantityChange(dish.id, (selectedItems[dish.id] || 0) - 1);
                                                }}
                                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-700 hover:text-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={!selectedItems[dish.id] || selectedItems[dish.id] === 0}
                                            >
                                                <IconMinus stroke={2} size={18} />
                                            </button>
                                            <span className="w-12 text-center font-bold text-lg text-gray-900">
                                                {selectedItems[dish.id] || 0}
                                            </span>
                                            <button
                                                onClick={() => {
                                                    handleQuantityChange(dish.id, (selectedItems[dish.id] || 0) + 1);
                                                }}
                                                className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-700 hover:text-blue-800 transition-all duration-200"
                                            >
                                                <IconPlus stroke={2} size={18} />
                                            </button>
                                        </div>

                                        {selectedItems[dish.id] > 0 && (
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500 mb-1">Subtotal:</p>
                                                <p className="font-bold text-lg text-gray-900">
                                                    ${(dish.price * selectedItems[dish.id]).toFixed(2)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-200 p-8 bg-gradient-to-r from-gray-50 to-blue-50">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-gray-600 text-lg mb-2">
                                {getTotalSelectedItems()} platillos seleccionados
                            </p>
                            {getTotalSelectedItems() > 0 && (
                                <p className="text-2xl font-bold text-blue-600">
                                    Total: ${getTotalPrice().toFixed(2)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            className="flex-1 h-14 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-all duration-200"
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="success"
                            className="flex-1 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleAddToCart}
                            disabled={getTotalSelectedItems() === 0}
                        >
                            Agregar al Carrito ({getTotalSelectedItems()})
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuModal;
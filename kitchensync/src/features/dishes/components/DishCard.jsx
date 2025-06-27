import { IconEdit, IconTrash, IconChefHat, IconEye, IconEyeOff, IconPhoto } from '@tabler/icons-react';
import FlipCard from "../../../shared/ui/FlipCard";
import Button from "../../../shared/ui/Button";
import {dishCategories} from "../../../shared/constants/dishCategories.js";
import { getTransformedImageUrl } from "../services/cloudinaryService.js";
import { useDishStore } from "../store";

const DishCard = ({ dish }) => {
    const { setEditingDish, deleteDish, toggleDishAvailability } = useDishStore();

    const handleEditClick = (e) => {
        e.stopPropagation();
        setEditingDish(dish);
    };

    const handleDeleteClick = async (e) => {
        e.stopPropagation();
        await deleteDish(dish.id);
    };

    const handleToggleAvailability = async (e) => {
        e.stopPropagation();
        await toggleDishAvailability(dish.id, !dish.isAvailable);
    };

    const handleImageError = (e) => {
        e.target.style.display = 'none';
        e.target.nextElementSibling.style.display = 'flex';
    };

    const frontContent = (
        <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer h-full group">
            <div className="flex flex-col h-full">
                {dish.imageUrl && (
                    <div className="w-full h-36 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-violet-100 to-purple-100 relative shadow-md">
                        <img
                            src={getTransformedImageUrl(dish.imageUrl, 'DISH_CARD')}
                            alt={dish.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={handleImageError}
                        />
                        <div
                            className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-violet-100 to-purple-100"
                            style={{ display: 'none' }}
                        >
                            <IconPhoto size={40} className="text-violet-500" />
                        </div>
                    </div>
                )}

                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-indigo-900 line-clamp-2 mb-2 group-hover:text-violet-700 transition-colors">
                            {dish.name}
                        </h3>
                        <div className="flex items-center gap-3">
                            <span className="text-xs bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-3 py-1 rounded-full font-medium border border-blue-200">
                                {dishCategories.find((category) => category.value === dish.category)?.label || dish.category}
                            </span>
                            <span className="text-xl font-bold text-emerald-600 bg-gradient-to-r from-emerald-50 to-green-50 px-2 py-1 rounded-lg">
                                ${dish.price}
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-blue-700 flex-1 line-clamp-3 mb-4 leading-relaxed">
                    {dish.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-300 ${
                        dish.isAvailable
                            ? "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-300 shadow-sm"
                            : "bg-gradient-to-r from-red-50 to-rose-50 text-red-700 border-red-300 shadow-sm"
                    }`}>
                        {dish.isAvailable ? (
                            <>
                                <IconEye size={16} />
                                Disponible
                            </>
                        ) : (
                            <>
                                <IconEyeOff size={16} />
                                No disponible
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const backContent = () => (
        <div className="bg-gradient-to-br from-white via-violet-50 to-purple-50 border-2 border-violet-200 rounded-2xl p-4 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer h-full">
            <div className="flex flex-col h-full justify-between">
                <div className="text-center mb-4">
                    <div className="bg-gradient-to-br from-violet-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                        <IconChefHat size={20} className="text-white" />
                    </div>
                    <h4 className="text-base font-bold text-violet-900">Gestionar Platillo</h4>
                </div>

                <div className="space-y-2 flex-1 flex flex-col justify-center">
                    <button
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                        onClick={handleEditClick}
                    >
                        <IconEdit size={16} />
                        Editar Platillo
                    </button>

                    <button
                        className={`w-full px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                            dish.isAvailable 
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                                : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
                        }`}
                        onClick={handleToggleAvailability}
                    >
                        {dish.isAvailable ? (
                            <>
                                <IconEyeOff size={16} />
                                Marcar No Disponible
                            </>
                        ) : (
                            <>
                                <IconEye size={16} />
                                Marcar Disponible
                            </>
                        )}
                    </button>

                    <button
                        className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                        onClick={handleDeleteClick}
                    >
                        <IconTrash size={16} />
                        Eliminar Platillo
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <FlipCard
            height="320px"
            backContent={backContent}
            className="dish-card"
        >
            {frontContent}
        </FlipCard>
    );
};

export default DishCard;
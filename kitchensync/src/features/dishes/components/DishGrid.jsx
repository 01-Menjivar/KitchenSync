import { useState } from "react";
import { useDishStore } from "../store";
import DishCard from "./DishCard";
import Button from "../../../shared/ui/Button";
import IconButton from "../../../shared/ui/IconButton";
import FilterButton from "../../../shared/ui/FilterButton";
import Input from "../../../shared/ui/Input";
import Select from "../../../shared/ui/Select.jsx";
import {dishCategories} from "../../../shared/constants/dishCategories.js";
import { IconChefHat, IconSearch, IconFilter, IconRefresh } from '@tabler/icons-react';

const DishGrid = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterAvailability, setFilterAvailability] = useState("");

    const {
        dishes,
        isLoadingDishes,
        loadDishes
    } = useDishStore();

    const filteredDishes = dishes.filter(dish => {
        const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dish.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !filterCategory || dish.category === filterCategory;
        const matchesAvailability = filterAvailability === "" ||
            dish.isAvailable.toString() === filterAvailability;

        return matchesSearch && matchesCategory && matchesAvailability;
    });

    const clearFilters = () => {
        setSearchTerm("");
        setFilterCategory("");
        setFilterAvailability("");
    };

    if (isLoadingDishes) {
        return (
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-200">
                <div className="flex justify-center items-center py-16">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-violet-500 mb-4"></div>
                        <p className="text-blue-700 text-lg">Cargando platillos...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <h2 className="text-2xl font-bold text-indigo-900">
                        Platillos Registrados
                    </h2>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="bg-gradient-to-r from-violet-100 to-purple-100 text-violet-800 px-3 py-1 rounded-full font-medium border border-violet-200">
                            Total: {dishes.length}
                        </span>
                        {dishes.length > 0 && (
                            <>
                                <span className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 px-3 py-1 rounded-full font-medium border border-emerald-200">
                                    {dishes.filter(d => d.isAvailable).length} Disponibles
                                </span>
                                <span className="bg-gradient-to-r from-red-100 to-rose-100 text-red-800 px-3 py-1 rounded-full font-medium border border-red-200">
                                    {dishes.filter(d => !d.isAvailable).length} No disponibles
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <button
                    onClick={loadDishes}
                    disabled={isLoadingDishes}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-50"
                >
                    <IconRefresh size={20} className={isLoadingDishes ? "animate-spin" : ""} />
                    Actualizar
                </button>
            </div>

            {dishes.length > 0 && (
                <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Buscar platillos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-12 h-12 text-base border-blue-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <IconSearch size={20} className="text-blue-500" />
                            </div>
                        </div>

                        <Select
                            name="filterCategory"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            placeholder="Todas las categorías"
                            className="h-12 text-base border-blue-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                            options={dishCategories}
                        />

                        <Select
                            name="filterAvailability"
                            value={filterAvailability}
                            onChange={(e) => setFilterAvailability(e.target.value)}
                            placeholder="Todos los estados"
                            className="h-12 text-base border-blue-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                            options={[
                                { value: "", label: "Todos los estados" },
                                { value: "true", label: "Solo disponibles" },
                                { value: "false", label: "Solo no disponibles" }
                            ]}
                        />

                        <button
                            onClick={clearFilters}
                            className="bg-gradient-to-r from-teal-100 to-cyan-100 hover:from-teal-200 hover:to-cyan-200 text-teal-800 px-4 py-3 rounded-xl font-medium transition-all duration-300 inline-flex items-center justify-center gap-2 border border-teal-300 h-12"
                        >
                            <IconFilter size={18} />
                            Limpiar filtros
                        </button>
                    </div>
                </div>
            )}

            {dishes.length === 0 ? (
                <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full mb-6 shadow-2xl">
                        <IconChefHat size={60} color="white" />
                    </div>
                    <h3 className="text-2xl font-bold text-indigo-900 mb-3">
                        No hay platillos registrados
                    </h3>
                    <p className="text-blue-700 text-lg mb-6 max-w-md mx-auto">
                        Comienza creando tu primer platillo para construir el menú de tu restaurante
                    </p>
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 max-w-md mx-auto border border-violet-200">
                        <p className="text-violet-800 font-medium">
                            Los platillos son la base de tu menú y permitirán a los meseros tomar órdenes
                        </p>
                    </div>
                </div>
            ) : filteredDishes.length === 0 ? (
                <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-6 shadow-xl">
                        <IconSearch size={36} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-indigo-900 mb-3">
                        No se encontraron platillos
                    </h3>
                    <p className="text-blue-700 mb-6">
                        Intenta cambiar los filtros de búsqueda para encontrar lo que buscas
                    </p>
                    <button
                        onClick={clearFilters}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Limpiar filtros
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {filteredDishes
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((dish) => (
                            <DishCard
                                key={dish.id}
                                dish={dish}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

export default DishGrid;
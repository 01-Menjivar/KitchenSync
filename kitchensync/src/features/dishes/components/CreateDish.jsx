import { useDishStore } from "../store";
import Button from "../../../shared/ui/Button";
import DishForm from "./DishForm";
import { IconPlus, IconEdit, IconBowlSpoon } from '@tabler/icons-react';

const CreateDish = () => {
    const {
        editingDish,
        cancelEdit,
        showDishForm,
        setShowDishForm
    } = useDishStore();

    const handleCancel = () => {
        if (editingDish) {
            cancelEdit();
        } else {
            setShowDishForm(false);
        }
    };

    const toggleForm = () => {
        if (editingDish) {
            cancelEdit();
        } else {
            setShowDishForm(!showDishForm);
        }
    };

    const shouldShowForm = showDishForm || editingDish;

    return (
        <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                            <IconBowlSpoon className="w-6 h-6 text-white" stroke={2} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Gestión de Platillos</h1>
                        </div>
                    </div>
                    
                    {!shouldShowForm && (
                        <button
                            onClick={toggleForm}
                            className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 transform"
                        >
                            <IconPlus size={20} className="flex-shrink-0" />
                            <span>Crear Platillo</span>
                        </button>
                    )}
                </div>
            </div>

            {shouldShowForm && (
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                    <div className={`${
                        editingDish 
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' 
                            : 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'
                    } px-6 py-4 border-b`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`${
                                    editingDish 
                                        ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                                        : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                                } w-10 h-10 rounded-xl flex items-center justify-center shadow-lg`}>
                                    {editingDish ? (
                                        <IconEdit size={20} className="text-white" />
                                    ) : (
                                        <IconPlus size={20} className="text-white" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {editingDish ? 'Editar Platillo' : 'Crear Nuevo Platillo'}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {editingDish 
                                            ? 'Modifica la información del platillo' 
                                            : 'Completa los datos para agregar el platillo'
                                        }
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={handleCancel}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-gray-300"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>

                    <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                        <DishForm />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateDish;
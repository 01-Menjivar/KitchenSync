import { useState } from "react";
import { useTableStore } from "../store";
import Button from "../../../shared/ui/Button";
import CustomForm from "./CustomForm";

const CreateTable = ({onFeedback }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showCustomForm, setShowCustomForm] = useState(false);
    const {createTables,loadTables,tables} = useTableStore();

    const getNextTableNumber = () => {
        if (tables.length === 0) return 1;
        const maxNumber = Math.max(...tables.map(table => table.number));
        return maxNumber + 1;
    };

    const handleQuickCreate = async () => {
        const nextNumber = getNextTableNumber();
        setIsLoading(true);
        onFeedback(null);

        const result = await createTables({ number: nextNumber });
        setIsLoading(false);

        if (result.success) {
            loadTables()
        } else {
            onFeedback(result);
        }
    };

    const toggleCustomForm = () => setShowCustomForm(!showCustomForm);

    return (
        <div className="mb-8">
            <div className="mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                    <button
                        onClick={handleQuickCreate}
                        disabled={isLoading}
                        className="group relative bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        
                        <div className="relative flex items-center gap-2">
                            {isLoading && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            )}
                            <span>
                                {isLoading ? "Creando..." : `Crear Mesa ${getNextTableNumber()}`}
                            </span>
                        </div>
                        
                        <div className="absolute top-1 right-2 w-1 h-1 bg-white/70 rounded-full animate-ping"></div>
                        <div className="absolute bottom-1 left-2 w-1 h-1 bg-white/50 rounded-full animate-pulse"></div>
                    </button>

                    <button
                        onClick={toggleCustomForm}
                        className="group relative bg-white hover:bg-gradient-to-r hover:from-lime-50 hover:via-emerald-50 hover:to-teal-50 text-emerald-700 border-2 border-emerald-300 hover:border-lime-400 px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-lime-400/15 via-emerald-400/15 to-teal-400/15 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        
                        <span className="relative">Número Personalizado</span>
                        
                        <div className={`absolute top-1 right-2 w-2 h-2 rounded-full transition-all duration-300 ${
                            showCustomForm ? 'bg-gradient-to-r from-lime-500 to-emerald-500 animate-pulse' : 'bg-emerald-400'
                        }`}></div>
                    </button>
                </div>
            </div>

            {showCustomForm && (
                <div className="animate-fadeInUp">
                    <CustomForm
                        onFeedback={onFeedback}
                        onClose={toggleCustomForm}
                    />
                </div>
            )}
            
        
        </div>
    );
};

export default CreateTable;
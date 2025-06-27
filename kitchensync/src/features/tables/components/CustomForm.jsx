import { useState } from "react";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";
import { useTableStore } from "../store";


const CustomForm = ({onFeedback, onClose }) => {
    const [newTableNumber, setNewTableNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {createTables,loadTables,tables} = useTableStore();

    const handleCustomCreate = async (e) => {
        e.preventDefault();
        onFeedback(null);

        if (!newTableNumber.trim()) {
            onFeedback({ type: "error", message: "Debes ingresar un número de mesa." });
            return;
        }
        const tableExists = tables.some(table => table.number === Number(newTableNumber));
        if (tableExists) {
            onFeedback({ type: "error", message: "Ya existe una mesa con ese número." });
            return;
        }

        if(newTableNumber<=0){
            onFeedback({ type: "error", message: "Debes ingresar un número mayor a uno" });
            return;
        }

        setIsLoading(true);
        const result = await createTables({ number: Number(newTableNumber) });
        setIsLoading(false);

        if (result.success) {
            setNewTableNumber("");
            onFeedback({ type: "success", message: result.message });
            loadTables()
            onClose();
        } else {
            onFeedback(result);
        }
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-amber-200">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">
                Crear Mesa con Número Personalizado
            </h3>
            <form onSubmit={handleCustomCreate} className="flex gap-4 items-end">
                <div className="flex-1">
                    <Input
                        type="number"
                        name="tableNumber"
                        placeholder="Número de mesa"
                        value={newTableNumber}
                        onChange={(e) => setNewTableNumber(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-300"
                >
                    {isLoading ? "Creando..." : "Crear Mesa"}
                </Button>
            </form>
        </div>
    );
};

export default CustomForm;
import TableCard from "./TableCard";
import Button from "../../../shared/ui/Button";
import { IconRefresh, IconSoup } from "@tabler/icons-react";
import { useTableStore } from "../store";

const TableGrid = () => {
    const { tables, isLoadingTables, deleteTable, loadTables } = useTableStore();

    const handleDelete = async (tableNumber) => {
        const result = await deleteTable(tableNumber);
        if (result.success) {
            await loadTables();
        } else {
            alert(result.message);
        }
    };

    if (isLoadingTables) {
        return (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6">
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-amber-200 p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-amber-900">
                Mesas Registradas ({tables.length})
            </h2>
            <Button
                onClick={loadTables}
                disabled={isLoadingTables}
                className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-xl font-medium transition-all duration-300"
            >
                <IconRefresh size={16} className={isLoadingTables ? "animate-spin" : ""} />
            </Button>
        </div>

        {tables.length === 0 ? (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full mb-4 shadow-lg">
                    <span className="text-2xl">
                        <IconSoup size={45} color="white" />
                    </span>
                </div>
                <p className="text-amber-600 text-lg mb-4">No hay mesas registradas</p>
                <p className="text-amber-500">Crea tu primera mesa para comenzar</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {tables
                    .slice() 
                    .sort((a, b) => a.number - b.number) 
                    .map((table) => (
                        <TableCard
                            key={table.id}
                            table={table}
                            onDelete={() => handleDelete(table.number)}
                        />
                    ))}
            </div>
        )}
    </div>
    );
};

export default TableGrid;
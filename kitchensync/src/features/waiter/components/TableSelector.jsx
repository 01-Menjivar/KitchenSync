import { useEffect } from "react";
import { useTableStore } from "../../tables/store";
import {
  getStateColor,
  getStateText,
} from "../../../shared/constants/tableStates";
import { IconRefresh } from "@tabler/icons-react";
import IconButton from "../../../shared/ui/IconButton";
import { useWaiterStore } from "../store";

const TableSelector = () => {
  const tables = useTableStore((state) => state.tables);
  const isLoadingTables = useTableStore((state) => state.isLoadingTables);
  const loadTables = useTableStore((state) => state.loadTables);
  const feedback = useTableStore((state) => state.feedback);
  const clearFeedback = useTableStore((state) => state.clearFeedback);

  const selectedTable = useWaiterStore(state => state.selectedTable);
  const setSelectedTable = useWaiterStore.getState().setSelectedTable;
  const setCurrentView = useWaiterStore.getState().setCurrentView;
  const loadTableOrder = useWaiterStore.getState().loadTableOrder;
  const clearCurrentOrder = useWaiterStore.getState().clearCurrentOrder;

  useEffect(() => {
    loadTables().catch((error) => {
    });
  }, [loadTables]);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        clearFeedback();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback, clearFeedback]);

  const handleTableClick = async (table) => {
    setSelectedTable(table);
    clearCurrentOrder();
    
    if (table.state === "OCCUPIED") {
      await loadTableOrder(table.number);
      setCurrentView("editOrder");
    } else {
      setCurrentView("newOrder");
    }
  };

  const handleRefresh = () => {
    loadTables();
  };

  if (isLoadingTables) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-12 border-2 border-gray-200">
        <div className="flex justify-center items-center">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="ml-6 text-gray-600 text-lg font-medium">Cargando mesas...</p>
        </div>
      </div>
    );
  }

  const availableTables = tables.filter((table) => table.state === "AVAILABLE");
  const occupiedTables = tables.filter((table) => table.state === "OCCUPIED");

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border-2 border-gray-200">
      {/* Header mejorado */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-100">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Selector de Mesas
          </h2>
          <div className="flex items-center gap-6">
            <div className="bg-gradient-to-r from-green-100 to-green-200 px-4 py-2 rounded-xl border border-green-300">
              <span className="font-bold text-green-800">{availableTables.length}</span>
              <span className="text-green-700 ml-1">disponibles</span>
            </div>
            <div className="bg-gradient-to-r from-red-100 to-red-200 px-4 py-2 rounded-xl border border-red-300">
              <span className="font-bold text-red-800">{occupiedTables.length}</span>
              <span className="text-red-700 ml-1">ocupadas</span>
            </div>
          </div>
        </div>
        <IconButton
          onClick={handleRefresh}
          disabled={isLoadingTables}
          variant="secondary"
          size="md"
          isLoading={isLoadingTables}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 h-12 w-12 rounded-xl"
        >
          <IconRefresh
            size={20}
            className={isLoadingTables ? "animate-spin" : ""}
          />
        </IconButton>
      </div>

      {tables.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No hay mesas disponibles
          </h3>
          <p className="text-gray-600 text-lg">
            Las mesas aparecerán aquí cuando estén configuradas
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {availableTables.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                Mesas Disponibles ({availableTables.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {availableTables
                  .sort((a, b) => a.number - b.number)
                  .map((table) => (
                    <button
                      key={table.id}
                      onClick={() => handleTableClick(table)}
                      className={`
                        group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl transform hover:scale-105 bg-white overflow-hidden
                        ${
                          selectedTable?.id === table.id
                            ? "border-amber-400 ring-4 ring-amber-300 ring-opacity-50 shadow-amber-200 scale-105"
                            : "border-green-300 hover:border-amber-400 shadow-lg"
                        }
                      `}
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-green-400 rounded-full opacity-10 transform translate-x-6 -translate-y-6"></div>
                      <div className="relative z-10 text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-3">
                          Mesa {table.number}
                        </div>
                        <div
                          className={`inline-block px-4 py-2 rounded-xl text-sm font-bold shadow-md ${
                            selectedTable?.id === table.id
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                              : "bg-gradient-to-r from-green-500 to-green-600 text-white"
                          }`}
                        >
                          {selectedTable?.id === table.id ? "Seleccionada" : getStateText(table.state)}
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {occupiedTables.length > 0 && (
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                Mesas Ocupadas ({occupiedTables.length}) - Editar Orden
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {occupiedTables
                  .sort((a, b) => a.number - b.number)
                  .map((table) => (
                    <button
                      key={table.id}
                      onClick={() => handleTableClick(table)}
                      className={`
                        group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl transform hover:scale-105 bg-white overflow-hidden cursor-pointer
                        ${
                          selectedTable?.id === table.id
                            ? "border-blue-400 ring-4 ring-blue-300 ring-opacity-50 shadow-blue-200 scale-105"
                            : "border-red-300 hover:border-blue-400 shadow-lg"
                        }
                      `}
                    >
                      <div className={`absolute top-0 right-0 w-16 h-16 rounded-full opacity-10 transform translate-x-6 -translate-y-6 ${
                        selectedTable?.id === table.id ? "bg-blue-400" : "bg-red-400"
                      }`}></div>
                      <div className="relative z-10 text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-3">
                          Mesa {table.number}
                        </div>
                        <div
                          className={`inline-block px-4 py-2 rounded-xl text-sm font-bold shadow-md ${
                            selectedTable?.id === table.id
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                              : "bg-gradient-to-r from-red-500 to-red-600 text-white"
                          }`}
                        >
                          {selectedTable?.id === table.id ? "Editar Orden" : getStateText(table.state)}
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TableSelector;
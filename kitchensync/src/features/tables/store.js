import { create } from "zustand";
import {
  getAllTables,
  createTable,
  deleteTable,
  updateTable,
} from "./services/tableService";

export const useTableStore = create((set, get) => ({
  tables: [],
  isLoadingTables: false,
  feedback: null,

  loadTables: async () => {
    set({ isLoadingTables: true });
    const { data } = await getAllTables();
    const tablesArray = Array.isArray(data) ? data : [];
    set({ tables: tablesArray });
    set({ isLoadingTables: false });
  },

  createTables: async (tableData) => {
    try {
      const response = await createTable(tableData);
      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  },

  deleteTables: async (tableNumber) => {
    try {
      const response = await deleteTable(tableNumber);
      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error al borrar la mesa" + error,
      };
    }
  },

  updateTableState: async (number, tableData) => {
    const result = await updateTable(number, tableData);
    try{
      await get().loadTables();
      set({ feedback: { type: "success", message: "Estado de mesas actualizado correctamente" } });
    }catch(error){
      console.log(error,result)
      set({ feedback: { type: "error", message: "Actualizar el estado de mesas falló" } });
    } 

  }
,

  setFeedback: (feedback) => set({ feedback }),
  clearFeedback: () => set({ feedback: null }),
}));
import { create } from "zustand";
import { handleToggleDishAvailability } from "./logic.js";
import {
  createDish,
  getAllDishes,
  updateDish,
  deleteDish,
} from "./services/dishesService.js";

export const useDishStore = create((set, get) => ({
  // Estados principales
  dishes: [],
  isLoadingDishes: false,
  editingDish: null,
  feedback: null,
  showDishForm: false,
  isSubmittingDish: false,

  // Cargar platillos
  loadDishes: async () => {
    set({ isLoadingDishes: true });
    try {
      const { data } = await getAllDishes();
      const dishesArray = Array.isArray(data) ? data : [];
      set({ dishes: dishesArray });
    } catch (error) {
      console.log(error);
      set({
        feedback: {
          type: "error",
          message: "Error al cargar los platillos",
        },
      });
    } finally {
      set({ isLoadingDishes: false });
    }
  },

   createDish: async (dishData) => {
    set({ isSubmittingDish: true });
    try {
      await createDish([dishData]);
      set({
        feedback: {
          type: "success",
          message: "Platillado creado correctamente",
        },
        showDishForm: false,
      });
      await get().loadDishes();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        set({
          feedback: {
            type: "error",
            message: error.response.data.message || "Ya existe un platillo con ese nombre",
          },
        });
      } else {
        set({
          feedback: {
            type: "error",
            message: "Error al crear el platillo",
          },
        });
      }
    } finally {
      set({ isSubmittingDish: false });
    }
  },

  // Actualizar platillo
  updateDish: async (dishId, dishData) => {
    set({ isSubmittingDish: true });
    try {
      await updateDish(dishId, dishData);
      set({
        feedback: {
          type: "success",
          message: "Platillo actualizado correctamente",
        },
        editingDish: null,
        showDishForm: false,
      });
      // Recargar platillos después de actualizar
      await get().loadDishes();
    } catch (error) {
      set({
        feedback: {
          type: "error",
          message: error.message || "Error al actualizar el platillo",
        },
      });
    } finally {
      set({ isSubmittingDish: false });
    }
  },

  // Eliminar platillo
  deleteDish: async (dishId) => {
    try {
      await deleteDish(dishId);
      set({
        feedback: {
          type: "success",
          message: "Platillo eliminado correctamente",
        },
      });
      // Recargar platillos después de eliminar
      await get().loadDishes();
    } catch (error) {
      set({
        feedback: {
          type: "error",
          message: error.message || "Error al eliminar el platillo",
        },
      });
    }
  },

  // Alternar disponibilidad
  toggleDishAvailability: async (dishId, newStatus) => {
    try {
      await handleToggleDishAvailability(dishId, newStatus);
      set({
        feedback: {
          type: "success",
          message: `Platillo ${
            newStatus ? "habilitado" : "deshabilitado"
          } correctamente`,
        },
      });
      // Recargar platillos después de cambiar disponibilidad
      await get().loadDishes();
    } catch (error) {
      set({
        feedback: {
          type: "error",
          message:
            error.message || "Error al cambiar la disponibilidad del platillo",
        },
      });
    }
  },

  // Acciones de UI
  setEditingDish: (dish) =>
    set({
      editingDish: dish,
      showDishForm: true,
    }),

  cancelEdit: () =>
    set({
      editingDish: null,
      showDishForm: false,
    }),

  setShowDishForm: (show) =>
    set({
      showDishForm: show,
    }),

  setFeedback: (feedback) => set({ feedback }),
  clearFeedback: () => set({ feedback: null }),
}));

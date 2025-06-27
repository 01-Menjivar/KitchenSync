import { useAuthStore } from "../../features/auth/store";

export const getAuthConfig = () => {
  const user = useAuthStore.getState().user;

  if (!user || !user.token) {
    throw new Error("No authentication token found");
  }

  return {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  };
};
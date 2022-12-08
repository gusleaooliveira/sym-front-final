import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const useAlerts = (user_id: number, token: string) => {
  return useQuery(["useAlerts", user_id, token], async () => {
    const { data } = await api.get(`/alerts/all/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  });
};

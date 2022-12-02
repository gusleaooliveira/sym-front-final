import { useQuery } from "@tanstack/react-query"
import { api } from '../api'

export const useExpenses = (user_id: number, token: string) => {
    return useQuery(['useExpenses', user_id, token], async () => {
        const { data } = await api.get(`/expenses/all/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    })
}
import { useQuery } from "@tanstack/react-query"
import { api } from '../api'

export const useDasboard = (user_id: number, token: string) => {
    return useQuery(['useDashboard', user_id, token], async () => {
        const { data } = await api.get(`/dashboard/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    })
}
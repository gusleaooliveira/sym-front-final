import { useQuery } from "@tanstack/react-query"
import { api } from '../api'

export const useRevenues = (user_id: number, token: string) => {
    return useQuery(['useRevenues', user_id, token], async () => {
        const { data } = await api.get(`/revenues/all/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    })
}
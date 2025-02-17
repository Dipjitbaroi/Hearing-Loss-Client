import { IResponse } from "../_common/common.dto"
import { ApiService } from "../api.service"
import { IGetAllUsers, IUser } from "./user.dto"

export const UserService = {
    // api call with axios
    getAllUser: async (page: number = 1, size: number = 10) => {
        const { data } = await ApiService.get<IResponse<IGetAllUsers>>(`/v1/user/all?page=${page}&size=${size}`)
        return data.response
    },
    getLoggedInUser: async () => {
        const { data } = await ApiService.get<IResponse<IUser>>("/v1/user")
        return data
    },
    updateUser: async (id: string) => {
        const { data } = await ApiService.put<IResponse>(`/v1/user/${id}`)
        return data.response
    },
}

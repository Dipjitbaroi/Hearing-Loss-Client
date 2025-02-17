import { IResponse } from "../_common/common.dto"
import { ApiService } from "../api.service"
import { ILoginRegResponse } from "../login/login.dto"
import { IRegisterDto } from "./auth.dto"
import { IRegisterSchema } from "./auth.schema"

export const AuthService = {
    registerUser: async (schema: IRegisterSchema) => {
        const dto: IRegisterDto = {
            provider: "simple",
            user: {
                fullName: schema.name,
                email: schema.email,
                password: schema.password,
                timeZone: "Asia/Dhaka",
            },
        }
        const { data } = await ApiService.post<IResponse<ILoginRegResponse>>("/v1/auth/register", dto)
        return data.response
    },
    LogOut: async () => {
        const { data } = await ApiService.post<IResponse>("/v1/auth/logout")
        return data.response
    },
}

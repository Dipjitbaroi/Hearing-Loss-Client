import { useUserStore } from "@/store/user.store"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { MessageConstant } from "../config/constant/message.constant"
import { EnvConfig } from "../config/env.config"
import { IErrorResponse } from "./_common/common.dto"

export const ApiService = axios.create({
    baseURL: EnvConfig.API_URL,
    withCredentials: true,
    timeout: 70000,
    timeoutErrorMessage: MessageConstant.SLOW_INTERNET,
})

// generate new tokens interceptor
ApiService.interceptors.response.use(
    (result) => result,
    (error: AxiosError) => {
        console.log({ status: error.status, rs: error.response?.status })
        if (error.code === AxiosError.ECONNABORTED) {
            throw error
        }

        const originalRequest = error.config as { sent: true } & AxiosRequestConfig
        const response = error.response as AxiosResponse<IErrorResponse, unknown>
        if (response?.status === 401 && !originalRequest.sent) {
            // logout the user here
            useUserStore.getState().logout()
        }
        throw error
    }
)

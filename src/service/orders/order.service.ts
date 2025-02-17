import { IResponse } from "../_common/common.dto"
import { ApiService } from "../api.service"
import { IOnetimePaymentDto, IOrderList } from "./order.dto"

export const OrderService = {
    // api call with axios
    getOrders: async (page: number = 1, size: number = 10) => {
        const { data } = await ApiService.get<IResponse<IOrderList>>(
            `/v1/payment/orders?page=${page}&size=${size}`
        )
        return data
    },
    oneTimePayment: async (input: { submissionId: string; description: string; coupon?: string }) => {
        const dto: IOnetimePaymentDto = {
            submissionId: input.submissionId,
            description: input.description,
            coupon: input.coupon,
        }
        const { data } = await ApiService.post<IResponse>(`/v1/payment/onetime`, dto)
        return data.response
    },
}

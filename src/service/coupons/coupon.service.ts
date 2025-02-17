import { IResponse } from "../_common/common.dto"
import { ApiService } from "../api.service"
import { IAllCoupon, ICouponDto } from "./coupon.dto"
import { ICreateCouponSchema } from "./coupon.schema"

export const CouponService = {
    getCoupons: async (page: number = 1, size: number = 10) => {
        const { data } = await ApiService.get<IResponse<IAllCoupon[]>>(`/v1/coupon?page=${page}&size=${size}`)
        return data.response
    },
    createCoupon: async (schema: ICreateCouponSchema) => {
        const dto: ICouponDto = {
            code: schema.couponCode,
            // discount: schema.discount,
            // isPercentage: schema.isPercentage,
            expiresAt: schema.expiresAt,
        }
        const { data } = await ApiService.post<IResponse<IAllCoupon>>(`/v1/coupon`, dto)
        return data
    },
    deleteCoupon: async (id: string) => {
        const { data } = await ApiService.delete<IResponse>(`/v1/coupon/${id}`)
        return data
    },
}

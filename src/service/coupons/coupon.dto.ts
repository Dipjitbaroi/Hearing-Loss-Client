export interface IAllCoupon {
    id: string
    code: string
    discount: number
    isPercentage: boolean
    expiresAt: string
    createdAt: string
}

export interface ICouponDto {
    code: string
    // discount: number,
    // isPercentage: boolean,
    expiresAt?: Date
}

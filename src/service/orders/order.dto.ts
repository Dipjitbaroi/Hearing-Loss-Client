import { DateString } from "@/@types/common.type"

export interface IOrder {
    id: string
    submissionId: string
    name: string
    email: string
    invoice: string
    amount: number
    createdAt: DateString
}

export interface IOrderList {
    data: IOrder[]
    totalItems: number
}

export interface IOnetimePaymentDto {
    submissionId: string
    description: string
    coupon?: string
}

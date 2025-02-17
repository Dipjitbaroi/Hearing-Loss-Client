import { DateString } from "@/@types/common.type"

export interface IUser {
    id: string
    fullName: string
    phone: string
    email: string
    gender: string
    avatar: string
    isEmailVerified: boolean
    isSuperAdmin: boolean
    countryCode: string
    city: string
    state: string
    zipCode: string
    address: string
    timeZone: string
    fcmToken: string
    lastLoggedIn: DateString
    createdAt: DateString
}

export interface IGetAllUsers {
    totalItems: number
    list: IUser[]
}

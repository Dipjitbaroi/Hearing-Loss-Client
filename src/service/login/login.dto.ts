import { DateString } from "@/@types/common.type"
import { z } from "zod"
import { ZodEmailString, ZodPasswordString } from "../../utils/zod.util"

// * Request object with zod
export const LoginWithEmailDto = z
    .object({
        email: ZodEmailString,
        password: ZodPasswordString,
    })
    .strict()

export type ILoginWithEmailDto = z.infer<typeof LoginWithEmailDto>

// * Response object
export interface ICurrentUser {
    id: string
    fullName: string
    phone: string | null
    email: string
    gender: "male" | "female" | null
    avatar: string | null
    isEmailVerified: boolean
    isSuperAdmin: boolean
    countryCode: string
    city: string | null
    state: string | null
    zipCode: string | null
    address: string | null
    timeZone: string
    fcmToken: string | null
    lastLoggedIn: DateString
    createdAt: DateString
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface ILoginRegResponse {
    id: string
    isSuperAdmin: boolean
    timeZone: string
    accessToken: string
}

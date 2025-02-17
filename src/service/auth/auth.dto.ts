export interface IRegisterDto {
    provider: "simple" | "google" // it can be simple or google
    user: {
        fullName: string
        email: string
        password?: string
        fcmToken?: string | null
        gender?: "male" | "female" | null
        timeZone: string
    }
}

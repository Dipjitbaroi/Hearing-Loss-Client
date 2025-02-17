import { z } from "zod"
import { ZodEmailString, ZodNameString, ZodPasswordString } from "../../utils/zod.util"

export const RegisterSchema = z.object({
    name: ZodNameString,
    email: ZodEmailString,
    password: ZodPasswordString,
})
export type IRegisterSchema = z.infer<typeof RegisterSchema>

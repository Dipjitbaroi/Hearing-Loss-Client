import { ZodSimpleString } from "@/utils/zod.util"
import { z } from "zod"

export const CreateCouponSchema = z.object({
    couponCode: ZodSimpleString,
    expiresAt: z.coerce.date().optional(),
})
export type ICreateCouponSchema = z.infer<typeof CreateCouponSchema>

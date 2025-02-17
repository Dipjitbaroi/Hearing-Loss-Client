import { ZodSimpleString } from "@/utils/zod.util"
import { z } from "zod"

export const CreateReportSettingSchema = z.object({
    title: ZodSimpleString,
    description: ZodSimpleString,
    quizId: z.number(),
})
export type ICreateReportSettingSchema = z.infer<typeof CreateReportSettingSchema>

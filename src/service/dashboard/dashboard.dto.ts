import { z } from "zod"
import { ZodSimpleString } from "../../utils/zod.util"

export const ReportSettingsWithSchema = z.object({
    title: ZodSimpleString,
    description: ZodSimpleString,
    quizId: z.number(),
})
export type IReportSettingsWithSchema = z.infer<typeof ReportSettingsWithSchema>

export interface IChartData {
    totalEarnings: number
    totalSubmissions: number
    totalUsers: number
    monthlyEarnings: number[]
    monthlySubmissions: number[]
    monthlyUsers: number[]
}

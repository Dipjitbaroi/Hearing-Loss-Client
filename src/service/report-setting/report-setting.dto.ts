import { DateString } from "@/@types/common.type"

export interface IReportSetting {
    id: string
    quizId: number
    title: string
    description: string
    createdAt: DateString
}

export interface ICreateReportSettingDto {
    title: string
    description: string
    quizId: number
}

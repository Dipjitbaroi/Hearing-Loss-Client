import { DateString } from "@/@types/common.type"

export interface ISubSection {
    id: string
    sectionId: string
    title: string
    createdAt: DateString
}
export interface IAdminQuiz {
    id: string
    quizId: string
    title: string
    description: string
    createdAt: DateString
    subSection: ISubSection[]
}

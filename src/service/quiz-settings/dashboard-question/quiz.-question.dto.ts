import { DateString } from "@/@types/common.type"

export interface IQuestion {
    id: string
    sectionId: string
    subSectionId: string
    question: string
    createdAt: DateString
}
import { DateString } from "@/@types/common.type"
export interface IQuiz {
    id: number
    name: string
    createdAt: DateString
    quizSection: [
        {
            id: string
            quizid: number
            title: string
            description: string
            createdAt: DateString
            subSection: [
                {
                    id: string
                    sectionId: string
                    title: string
                    createdAt: DateString
                    questions: [
                        {
                            id: string
                            question: string
                            sectionId: string
                            subSectionId: string
                            createdAt: DateString
                        }
                    ]
                }
            ]
        }
    ]
}

export interface IQuizSubmitDto {
    quizId: number
    additional: {
        question: string
        answer: string[]
    }[]
    answers: {
        questionId: string
        answer: string
    }[]
}

export interface IReport {
    id: string
    quizId: number
    quizName: string
    isPurchase: boolean
    coupon: string | null
    additional: {
        answer: string[]
        question: string
    }[]
    quizAnswers: {
        sectionId: string
        subSectionId: string
        sectionTitle: string
        subSectionTitle: string
        answers: {
            question: string
            answer: string
            questionId: string
        }[]
    }[]
    createdAt: DateString
}

export interface IReportSetting {
    id: string
    quizId: number
    title: string
    description: string
    createdAt: DateString
}

import { IResponse } from "../_common/common.dto"
import { ApiService } from "../api.service"
import { IQuiz, IQuizSubmitDto, IReport, IReportSetting } from "./quiz.dto"
export const QuizService = {
    getQuiz: async (id: number) => {
        const { data } = await ApiService.get<IResponse<IQuiz>>(`/v1/quiz/${id}`)
        return data.response
    },
    submitQuiz: async (payload: IQuizSubmitDto) => {
        const dto: IQuizSubmitDto = {
            ...payload,
            answers: payload.answers.filter((item) => item.answer !== null),
        }

        const { data } = await ApiService.post<IResponse>("/v1/take-quiz", dto)
        return data.response
    },
    getReport: async (id: string) => {
        const { data } = await ApiService.get<IResponse<IReport>>(`/v1/take-quiz/report/${id}`)
        return data.response
    },
    getReportSettings: async (id: number) => {
        const { data } = await ApiService.get<IResponse<IReportSetting[]>>(`/v1/report-setting/quiz/${id}`)
        return data.response
    },
    sendReportToMail: async (email: string, file: Blob) => {
        const formData = new FormData()
        formData.append("email", email)
        formData.append("file", file)
        const { data } = await ApiService.post<IResponse>(`/v1/take-quiz/send-pdf-email`, formData)

        return data
    },
}

import { IResponse } from "../../_common/common.dto"
import { ApiService } from "../../api.service"
import { IAdminQuiz } from "./quiz.-section.dto"
export const DashboardQuizSectionService = {
    getSectionsByQuizId: async (id: number) => {
        const { data } = await ApiService.get<IResponse<IAdminQuiz[]>>(`/v1/quiz-section/quiz/${id}`)
        return data.response
    },
}

import { IResponse } from "../../_common/common.dto"
import { ApiService } from "../../api.service"
import { IQuestion } from "./quiz.-question.dto"
export const DashboardQuizQuestionService = {
    getQuestionBySubSectionId: async (id: string) => {
        const { data } = await ApiService.get<IResponse<IQuestion[]>>(`/v1/quiz-question/sub-section/${id}`)
        return data.response
    },
}

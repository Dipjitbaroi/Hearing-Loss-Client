import { IResponse } from "../../_common/common.dto"
import { ApiService } from "../../api.service"
import { IAdminQuiz } from "./quiz.dto"
export const DashboardQuizService = {
    getQuiz: async () => {
        const { data } = await ApiService.get<IResponse<IAdminQuiz[]>>(`/v1/quiz`)
        return data.response
    },
}

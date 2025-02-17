import { QueryKeys } from "@/config/query.config"
import { DashboardQuizQuestionService } from "@/service/quiz-settings/dashboard-question/quiz-question.service"
import { useQuery } from "@tanstack/react-query"

export const useDashboardQuizQuestionController = (id: string) => {
    const { isLoading, data } = useQuery([QueryKeys.GET_QUESTIONS_BY_SUB_SECTION_ID, id], () => {
        return DashboardQuizQuestionService.getQuestionBySubSectionId(id)
    })
    return {
        data,
        isLoading,
    }
}

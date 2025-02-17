import { QueryKeys } from "@/config/query.config"
import { DashboardQuizSectionService } from "@/service/quiz-settings/dashboard-section/quiz-section.service"
import { useQuery } from "@tanstack/react-query"

export const useDashboardQuizSectionController = (quizId: number) => {
    const { isLoading, data } = useQuery([QueryKeys.GET_SECTIONS_BY_QUIZ_ID, quizId], () => {
        return DashboardQuizSectionService.getSectionsByQuizId(quizId)
    })
    return {
        data,
        isLoading,
    }
}

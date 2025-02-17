import { QueryKeys } from "@/config/query.config"
import { DashboardQuizService } from "@/service/quiz-settings/dashboard-quiz/quiz.service"
import { useQuery } from "@tanstack/react-query"

export const useDashboardQuizController = () => {
    const { isLoading, data } = useQuery([QueryKeys.GET_QUIZ], () => {
        return DashboardQuizService.getQuiz()
    })
    return {
        data,
        isLoading,
    }
}

import { QueryKeys } from "@/config/query.config"
import { QuizService } from "@/service/quiz/quiz.service"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
// import axios from "axios"
import { EnvConfig } from "@/config/env.config"
import { IQuizSubmitDto } from "@/service/quiz/quiz.dto"
import { ErrorUtil } from "@/utils/error.util"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

export const useQuizController = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const reportId = params.id
    // Fetch quiz data
    const {
        data: quizData,
        isLoading: isQuizLoading,
        error: quizError,
    } = useQuery({
        queryKey: [QueryKeys.GET_SINGLE_QUIZ, EnvConfig.HEARING_LOSS_QUIZ_ID],
        queryFn: () => QuizService.getQuiz(EnvConfig.HEARING_LOSS_QUIZ_ID),
    })

    const { data: reportData, isLoading: isReportDataLoading } = useQuery({
        queryKey: [QueryKeys.GET_REPORT, reportId],
        queryFn: () => QuizService.getReport(reportId as string),
        enabled: !!reportId,
    })

    // Submit quiz data
    const submitQuiz = async (answers: IQuizSubmitDto) => {
        try {
            setIsSubmitting(true)

            const reportId = await QuizService.submitQuiz(answers)

            toast.success("Quiz submitted successfully!")
            setIsSubmitting(false)
            navigate(`/download-report/${reportId}`)
        } catch (error) {
            console.error("quiz submitError:onSubmit:->", error)
            const message = ErrorUtil.getErrorMessage(error as Error).message
            toast.error(message)
            setIsSubmitting(false)
        }
    }

    return {
        // Quiz data fetching
        quizData,
        isQuizLoading,
        quizError,

        // Quiz submission
        submitQuiz,
        isSubmitting,

        reportData,
        isReportDataLoading,
    }
}

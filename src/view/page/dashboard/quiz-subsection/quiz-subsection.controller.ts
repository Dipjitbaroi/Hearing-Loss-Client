import { QueryKeys } from "@/config/query.config"
import { DashboardQuizSubSectionService } from "@/service/quiz-settings/dashboard-subsection/quiz-subsection.service"
import { useQuery } from "@tanstack/react-query"

export const useDashboardQuizSubSectionController = (id: string) => {
    const { isLoading, data } = useQuery([QueryKeys.GET_SUB_SECTIONS_BY_SECTION_ID, id], () => {
        return DashboardQuizSubSectionService.getSubSectionsBySectionId(id)
    })
    return {
        data,
        isLoading,
    }
}

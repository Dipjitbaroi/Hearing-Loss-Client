import { IResponse } from "../../_common/common.dto"
import { ApiService } from "../../api.service"
import { ISubSection } from "../dashboard-section/quiz.-section.dto"
export const DashboardQuizSubSectionService = {
    getSubSectionsBySectionId: async (id: string) => {
        const { data } = await ApiService.get<IResponse<ISubSection[]>>(`/v1/quiz-sub-section/section/${id}`)
        return data.response
    },
}

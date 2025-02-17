import { IResponse } from "../_common/common.dto"
import { ApiService } from "../api.service"
import { ICreateReportSettingDto, IReportSetting } from "./report-setting.dto"
import { ICreateReportSettingSchema } from "./report-setting.schema"

export const ReportSettingService = {
    // api call with axios
    CreateReportSetting: async (schema: ICreateReportSettingSchema) => {
        const dto: ICreateReportSettingDto = {
            title: schema.title,
            description: schema.description,
            quizId: 1,
        }
        const { data } = await ApiService.post<IResponse>("/v1/report-setting", dto)
        return data.response
    },
    getAllReportSetting: async () => {
        const { data } = await ApiService.get<IResponse<IReportSetting>>("/v1/report-setting")
        return data
    },
    getReportSettingByQuizId: async (quizId: number) => {
        const { data } = await ApiService.get<IResponse<IReportSetting[]>>(`/v1/report-setting/quiz/${quizId}`)
        return data
    },
    updateReportSetting: async (schema: { title: string; description: string }, id: string) => {
        const dto = {
            title: schema.title,
            description: schema.description,
        }
        const { data } = await ApiService.put<IResponse>(`/v1/report-setting/${id}`, dto)
        return data.response
    },
    deleteReportSetting: async (id: number) => {
        const { data } = await ApiService.delete<IResponse>(`/v1/report-setting/${id}`)
        return data.response
    },
}

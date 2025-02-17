import { IResponse } from "../_common/common.dto"
import { ApiService } from "../api.service"
import { IChartData } from "./dashboard.dto"

export const ChartDataService = {
    // api call with axios
    getChartData: async () => {
        const { data } = await ApiService.get<IResponse<IChartData>>("/v1/dashboard/chart-data")
        return data.response
    },
}

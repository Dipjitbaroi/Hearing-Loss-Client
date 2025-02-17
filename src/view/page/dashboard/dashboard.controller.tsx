import { QueryKeys } from "@/config/query.config"
import { ChartDataService } from "@/service/dashboard/dashboard.service"
import { useQuery } from "@tanstack/react-query"

export const useDashboardController = () => {
    const { isLoading, data } = useQuery([QueryKeys.GET_CHART_CARD_DATA], () => {
        return ChartDataService.getChartData()
    })
    return {
        data,
        isLoading,
    }
}

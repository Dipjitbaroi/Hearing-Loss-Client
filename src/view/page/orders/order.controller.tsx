// import { KeyConstant } from "@/config/constant/key.constant"
import { KeyConstant } from "@/config/constant/key.constant"
import { QueryKeys } from "@/config/query.config"
import { OrderService } from "@/service/orders/order.service"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

export const useOrderController = () => {
    const [searchParams] = useSearchParams()
    const page = searchParams.get(KeyConstant.searchParamsKeys.page)
    const size = searchParams.get(KeyConstant.searchParamsKeys.size)

    const { isLoading, data } = useQuery(
        [QueryKeys.GET_ORDERS, page, size],
        () => {
            return OrderService.getOrders(Number(page), Number(size))
        },
        {
            enabled: !!page && !!size,
        }
    )
    return {
        data,
        isLoading,
    }
}

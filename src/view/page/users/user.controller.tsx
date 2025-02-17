// import { KeyConstant } from "@/config/constant/key.constant"
import { QueryKeys } from "@/config/query.config"
import { UserService } from "@/service/users/user.service"
import { useQuery } from "@tanstack/react-query"

export const useUserController = () => {
    const { isLoading, data } = useQuery([QueryKeys.GET_ALL_USER], () => {
        return UserService.getAllUser()
    })

    return {
        data,
        isLoading,
    }
}

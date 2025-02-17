import { queryClient, QueryKeys } from "@/config/query.config"
import { AuthService } from "@/service/auth/auth.service"
import { useUserStore } from "@/store/user.store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { ILoginWithEmailDto, LoginWithEmailDto } from "../../../service/login/login.dto"
import { LoginService } from "../../../service/login/login.service"
import { ErrorUtil } from "../../../utils/error.util"

export const useLoginController = () => {
    const logoutStore = useUserStore((s) => s.logout)
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ILoginWithEmailDto>({
        resolver: zodResolver(LoginWithEmailDto),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (input: ILoginWithEmailDto) => {
        try {
            await LoginService.loginWithEmail(input)
            await queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] })
            toast("successfully login")
        } catch (error) {
            console.error("login with email:onSubmit:->", error)
            const message = ErrorUtil.getErrorMessage(error as Error).message
            toast.error(message)
        }
    }
    const { mutate: logout, isLoading: isLogoutLoading } = useMutation({
        mutationFn: () => AuthService.LogOut(),
        onSuccess: () => {
            logoutStore()
            queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] })
            toast.success("successfully logout")
        },
        onError: (error) => {
            console.error("logout:onSubmit:->", error)
            const message = ErrorUtil.getErrorMessage(error as Error).message
            toast.error(message)
        },
    })
    return { control, handleSubmit: handleSubmit(onSubmit), isSubmitting, logout, isLogoutLoading }
}

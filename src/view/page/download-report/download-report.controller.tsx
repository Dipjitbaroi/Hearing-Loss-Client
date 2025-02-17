import { KeyConstant } from "@/config/constant/key.constant"
import { OrderService } from "@/service/orders/order.service"
import { QuizService } from "@/service/quiz/quiz.service"
import { useUserStore } from "@/store/user.store"
import { ErrorUtil } from "@/utils/error.util"
import { useMutation } from "@tanstack/react-query"
import { useParams, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"

export const useDownloadReportController = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    const reportId = params.id as string

    const user = useUserStore((state) => state.user)
    // const {
    //     control,
    //     handleSubmit,
    //     formState: { isSubmitting },
    // } = useForm<IRegisterSchema>({
    //     resolver: zodResolver(RegisterSchema),
    //     defaultValues: {
    //         name: "",
    //         email: "",
    //         password: "",
    //     },
    // })

    // const onSubmit = async (input: IRegisterSchema) => {
    //     try {
    //         const registerRes = await AuthService.registerUser(input)
    //         await Promise.all([await queryClient.invalidateQueries({ queryKey: [QueryKeys.CURRENT_USER] })])

    //         if (registerRes.id) {
    //             const url = await OrderService.oneTimePayment({
    //                 email: input.email,
    //                 submissionId: reportId,
    //                 description: "Payment for report",
    //             })
    //             if (url) {
    //                 window.location.href = url
    //             }
    //         }
    //     } catch (error) {
    //         console.error("register with email:onSubmit:->", error)
    //         const message = ErrorUtil.getErrorMessage(error as Error).message
    //         toast.error(message)
    //     }
    // }

    const { mutate: reportPayment, isLoading: isReportPaymentLoading } = useMutation({
        mutationFn: (coupon?: string) =>
            OrderService.oneTimePayment({
                submissionId: reportId,
                description: "Payment for report",
                coupon: coupon,
            }),
        onSuccess: (data) => {
            if (data) {
                window.location.href = data
            }
        },
        onError: (error) => {
            console.error("paymentSession:onSubmit:->", error)
            const message = ErrorUtil.getErrorMessage(error as Error).message
            toast.error(message)
        },
    })

    const { mutate: sendReportToMail, isLoading: isSendReportLoading } = useMutation({
        mutationFn: (file: Blob) => QuizService.sendReportToMail(user?.email as string, file),
        onSuccess: () => {
            toast.success("Report sent to your email successfully & Also you can download it from here!")
            searchParams.delete(KeyConstant.searchParamsKeys.send_email)
            setSearchParams(searchParams)
        },
        onError: (error) => {
            console.error("reportSend:onSubmit:->", error)
            const message = ErrorUtil.getErrorMessage(error as Error).message
            toast.error(message)
        },
    })
    return {
        // control,
        // registerUser: handleSubmit(onSubmit),
        // isSubmitting,
        reportPayment,
        isReportPaymentLoading,

        sendReportToMail,
        isSendReportLoading,
    }
}

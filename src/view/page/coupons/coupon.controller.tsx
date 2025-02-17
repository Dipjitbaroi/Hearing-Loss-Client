import { KeyConstant } from "@/config/constant/key.constant"
import { queryClient, QueryKeys } from "@/config/query.config"
import { CreateCouponSchema, ICreateCouponSchema } from "@/service/coupons/coupon.schema"
import { CouponService } from "@/service/coupons/coupon.service"
import { ErrorUtil } from "@/utils/error.util"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"

export const useCouponController = () => {
    const [searchParams] = useSearchParams()
    const page = searchParams.get(KeyConstant.searchParamsKeys.page)
    const size = searchParams.get(KeyConstant.searchParamsKeys.size)

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<ICreateCouponSchema>({
        resolver: zodResolver(CreateCouponSchema),
    })
    const onSubmit = async (input: ICreateCouponSchema) => {
        try {
            await CouponService.createCoupon(input)
            queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_COUPONS] })
            reset()
            toast.success("Coupon added successfully!")
        } catch (error) {
            console.error("coupon:onSubmit:->", error)
            const message = ErrorUtil.getErrorMessage(error as Error).message
            toast.error(message)
        }
    }

    const { isLoading, data } = useQuery([QueryKeys.GET_COUPONS], () => {
        return CouponService.getCoupons(Number(page), Number(size))
    })

    const { mutate: deleteCoupon, isLoading: isDeleteCouponLoading } = useMutation({
        mutationFn: (id: string) => CouponService.deleteCoupon(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_COUPONS] })
            toast.success("Coupon deleted successfully!")
        },
        onError: (error) => {
            console.error("couponDelete:onSubmit:->", error)
            const message = ErrorUtil.getErrorMessage(error as Error).message
            toast.error(message)
        },
    })
    return {
        data,
        isLoading,
        deleteCoupon,
        isDeleteCouponLoading,

        control,
        handleSubmit: handleSubmit(onSubmit),
        isSubmitting,
    }
}

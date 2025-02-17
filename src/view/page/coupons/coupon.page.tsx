import { IAllCoupon } from "@/service/coupons/coupon.dto"
import { DateUtil } from "@/utils/date.util"
import MyButton from "@/view/components/common/form/my-button"
import { MyInputWithRHF } from "@/view/components/common/form/my-input.comp"
import { MyDataTable } from "@/view/components/common/my-data-table"
import MyLoading from "@/view/components/common/my-loading"
import MySpacer from "@/view/components/common/my-spacer"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/view/components/ui/dialog"
import { ColumnDef } from "@tanstack/react-table"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { useCouponController } from "./coupon.controller"

export const CouponPage = () => {
    const [buttonClickedId, setButtonClickedId] = useState("")

    const { data, isLoading, deleteCoupon, isDeleteCouponLoading, control, handleSubmit, isSubmitting } =
        useCouponController()

    const columns: ColumnDef<IAllCoupon>[] = [
        {
            accessorKey: "code",
            header: "Code",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => {
                return DateUtil.formatDateTime(row.original.createdAt)
            },
        },
        {
            accessorKey: "expiresAt",
            header: "Expires At",
            cell: ({ row }) => {
                return DateUtil.formatDateTime(row.original.expiresAt)
            },
        },
        {
            id: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.expiresAt
                    ? new Date() > new Date(row.original.expiresAt)
                        ? "Expired"
                        : "Active"
                    : "Lifetime"

                return (
                    <>
                        {status === "Active" && (
                            <span className="text-green-800 bg-green-300 py-1 px-2 rounded-md">{status}</span>
                        )}
                        {status === "Lifetime" && (
                            <span className="text-green-800 bg-green-100 py-1 px-2 rounded-md">{status}</span>
                        )}
                        {status === "Expired" && (
                            <span className="text-red-800 bg-red-300 py-1 px-2 rounded-md">{status}</span>
                        )}
                    </>
                )
            },
        },
        {
            id: "actions",
            header: "Action",
            // eslint-disable-next-line react/no-unstable-nested-components
            cell: ({ row }) => {
                return (
                    <div className="text-grey-700 flex w-fit">
                        <MyButton
                            variant="delete"
                            type="button"
                            disabled={isDeleteCouponLoading}
                            // loading={isDeleteCouponLoading && buttonClickedId === row.original.id}
                            className="px-2 py-1"
                            onClick={async () => {
                                const confirm = window.confirm("Are you sure you want to delete this coupon?")
                                if (confirm) {
                                    setButtonClickedId(row.original.id)
                                    deleteCoupon(row.original.id)
                                }
                            }}
                        >
                            {isDeleteCouponLoading && buttonClickedId === row.original.id ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <Trash2 />
                            )}
                        </MyButton>
                    </div>
                )
            },
        },
    ]

    if (isLoading) return <MyLoading />
    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-semibold text-black py-4 px-5">All Coupons</h2>

                <Dialog>
                    <DialogTrigger>
                        <MyButton
                            size={"sm"}
                            type="button"
                            startIcon={<Plus size={16} className="mr-1" />}
                            onClick={() => {}}
                        >
                            Add coupon
                        </MyButton>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add new coupon</DialogTitle>
                        </DialogHeader>
                        <MySpacer className="h-1" />
                        <div className="space-y-4">
                            <MyInputWithRHF name="couponCode" control={control} label="Coupon code" />
                            <MyInputWithRHF type="date" name="expiresAt" control={control} label="Expires at" />
                        </div>
                        <MySpacer className="h-1" />
                        <MyButton
                            type="button"
                            loading={isSubmitting}
                            onClick={() => {
                                handleSubmit()
                            }}
                        >
                            Submit
                        </MyButton>
                    </DialogContent>
                </Dialog>
            </div>
            <MyDataTable columns={columns} data={data || []} dataLength={data?.length} />
        </div>
    )
}

import MyButton from "@/view/components/common/form/my-button"
import { MyDataTable } from "@/view/components/common/my-data-table"
import MyLoading from "@/view/components/common/my-loading"
import { RouteUrl } from "@/view/router/url"
import { ColumnDef } from "@tanstack/react-table"
import { Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDashboardQuizController } from "./quiz-dashboard.controller"
// import { useOrderController } from "./order.controller"

interface IOrdersColumns {
    quiz_title: string
    id: number
}
export const QuizDashboardPage = () => {
    const navigate = useNavigate()
    const { data, isLoading } = useDashboardQuizController()
    const transformedData = data?.map((item) => {
        return {
            quiz_title: item.name,
            id: item.id,
        }
    })
    const columns: ColumnDef<IOrdersColumns>[] = [
        {
            accessorKey: "quiz_title",
            header: "Quiz Title",
        },
        {
            id: "actions",
            header: () => <div className="w-full flex justify-end pr-10">Actions</div>,
            // eslint-disable-next-line react/no-unstable-nested-components
            cell: ({ row }) => {
                return (
                    <div className="w-full flex justify-end">
                        <div className="text-grey-700 flex w-fit justify-end">
                            <MyButton
                                variant="default"
                                type="button"
                                size="xs"
                                className="hover:bg-gray-200 bg-primary-500 py-5 px-6"
                                onClick={() => {
                                    navigate(
                                        RouteUrl.QUIZ_SECTION.replace(":id", `${row.original.id}`) +
                                            `?name=${encodeURIComponent(row.original.quiz_title)}`
                                    )
                                }}
                                startIcon={<Eye size={20} className="mr-3" />}
                            >
                                View Sections
                            </MyButton>
                        </div>
                    </div>
                )
            },
        },
    ]
    if (isLoading) {
        return <MyLoading />
    }
    return (
        <div>
            <MyDataTable title="All Quiz" columns={columns} data={transformedData || []} hidePagination />
        </div>
    )
}

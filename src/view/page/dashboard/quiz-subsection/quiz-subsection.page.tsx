import { EnvConfig } from "@/config/env.config"
import MyButton from "@/view/components/common/form/my-button"
import { MyDataTable } from "@/view/components/common/my-data-table"
import MyLoading from "@/view/components/common/my-loading"
import { RouteUrl } from "@/view/router/url"
import { ColumnDef } from "@tanstack/react-table"
import { Eye } from "lucide-react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useDashboardQuizSubSectionController } from "./quiz-subsection.controller"
// import { useOrderController } from "./order.controller"

interface IOrdersColumns {
    title: string
    id: string
}

export const QuizSubSectionDashboardPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [getSearchParams] = useSearchParams()
    const paramTitle = getSearchParams.get("name")
    const { data, isLoading } = useDashboardQuizSubSectionController(String(id))
    const transformedData = data?.map((item) => {
        return {
            title: item.title,
            id: item.id,
        }
    })
    const columns: ColumnDef<IOrdersColumns>[] = [
        {
            accessorKey: "title",
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
                                        RouteUrl.QUIZ_QUESTION.replace(":id", `${row.original.id}`) +
                                            `?name=${row.original.title}`
                                    )
                                }}
                                startIcon={<Eye size={20} className="mr-3" />}
                            >
                                View Questions
                            </MyButton>
                        </div>
                    </div>
                )
            },
        },
    ]
    if (isLoading) return <MyLoading />
    return (
        <div>
            <MyDataTable
                title={`All Sub Section Under ${paramTitle}`}
                columns={columns}
                data={transformedData || []}
                hidePagination
            />
            <div>
                <MyButton
                    variant="default"
                    type="button"
                    size="xs"
                    className="bg-white text-blue-500 border border-blue-500 rounded-md hover:bg-blue-100 py-5 px-6"
                    onClick={() => {
                        navigate(RouteUrl.QUIZ_SECTION.replace(":id", `${EnvConfig.HEARING_LOSS_QUIZ_ID}`))
                    }}
                >
                    Back
                </MyButton>
            </div>
        </div>
    )
}

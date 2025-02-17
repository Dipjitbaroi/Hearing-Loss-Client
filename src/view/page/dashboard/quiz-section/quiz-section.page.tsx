import MyButton from "@/view/components/common/form/my-button"
import { MyDataTable } from "@/view/components/common/my-data-table"
import MyLoading from "@/view/components/common/my-loading"
import { RouteUrl } from "@/view/router/url"
import { ColumnDef } from "@tanstack/react-table"
import { Eye } from "lucide-react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useDashboardQuizSectionController } from "./quiz-section.controller"
// import { useOrderController } from "./order.controller"

interface IOrdersColumns {
    title: string
    id: string
}

export const QuizSectionDashboardPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [getSearchParams] = useSearchParams()
    const paramTitle = getSearchParams.get("name")
    const { data, isLoading } = useDashboardQuizSectionController(Number(id))
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
                console.log(row.original)
                return (
                    <div className="w-full flex justify-end">
                        <div className="text-grey-700 flex w-fit justify-end">
                            {/* <MyButton
                                variant="default"
                                type="button"
                                size="xs"
                                className="hover:bg-gray-200 bg-primary-500 py-5 px-6"
                                onClick={() => {
                                    navigate(
                                        RouteUrl.QUIZ_SUBSECTION.replace(":id", `${row.original.id}`) +
                                            `?name=${row.original.title}`
                                    )
                                }}
                                startIcon={<Eye size={20} className="mr-3" />}
                            >
                                View Sub Sections
                            </MyButton> */}

                            <Link
                                to={
                                    RouteUrl.QUIZ_SUBSECTION.replace(":id", `${row.original.id}`) +
                                    `?name=${row.original.title}`
                                }
                            >
                                <MyButton
                                    variant="default"
                                    type="button"
                                    size="xs"
                                    onClick={() => {}}
                                    className="hover:bg-gray-200 bg-primary-500 py-5 px-6"
                                    startIcon={<Eye size={20} className="mr-3" />}
                                >
                                    View Sub Sections
                                </MyButton>
                            </Link>
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
            <MyDataTable
                title={`All Section Under ${paramTitle}`}
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
                        navigate("/quiz-settings")
                    }}
                >
                    Back
                </MyButton>
            </div>
        </div>
    )
}

import MyButton from "@/view/components/common/form/my-button"
import { MyDataTable } from "@/view/components/common/my-data-table"
import MyLoading from "@/view/components/common/my-loading"
import { RouteUrl } from "@/view/router/url"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useDashboardQuizQuestionController } from "./quiz-question.controller"
// import { useOrderController } from "./order.controller"

interface IOrdersColumns {
    quiz_title: string
}

export const QuizQuestionDashboardPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [getSearchParams] = useSearchParams()
    const title = getSearchParams.get("name")
    const { data, isLoading } = useDashboardQuizQuestionController(String(id))
    const transformedData = data?.map((item) => {
        return {
            quiz_title: item.question,
        }
    })
    const columns: ColumnDef<IOrdersColumns>[] = [
        {
            accessorKey: "quiz_title",
            header: "Quiz Title",
        },
    ]
    if (isLoading) {
        return <MyLoading />
    }
    return (
        <div>
            <MyDataTable
                title={`All Question Under ${title}`}
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
                        navigate(RouteUrl.QUIZ_SUBSECTION.replace(":id", `${data?.[0]?.sectionId}`))
                    }}
                >
                    Back
                </MyButton>
            </div>
        </div>
    )
}

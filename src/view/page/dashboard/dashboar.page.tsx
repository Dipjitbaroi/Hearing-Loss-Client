import { DateString } from "@/@types/common.type"
import { QuizService } from "@/service/quiz/quiz.service"
import { DateUtil } from "@/utils/date.util"
import { PdfUtil } from "@/utils/pdf.util"
import MyButton from "@/view/components/common/form/my-button"
import { MyDataTable } from "@/view/components/common/my-data-table"
import MyLoading from "@/view/components/common/my-loading"
import { ColumnDef } from "@tanstack/react-table"
import { FileDown } from "lucide-react"
import { useState } from "react"
import { useDownloadReportController } from "../download-report/download-report.controller"
import { useOrderController } from "../orders/order.controller"
import { useReportSettingsController } from "../report-settings/report-settings.controller"
import ChartCard from "./components/chart-card"
import { useDashboardController } from "./dashboard.controller"
interface IOrdersColumns {
    id: string
    submissionId: string
    name: string
    // email: item.email,
    date: DateString
    invoice: string
    amount: number
}
export const DashboardPage = () => {
    const [loading, setLoading] = useState(false)
    const [buttonClickedId, setButtonClickedId] = useState("")

    const { data } = useOrderController()
    const { sendReportToMail } = useDownloadReportController()
    const { reportSettings, isReportSettingsLoading } = useReportSettingsController()

    // @ts-ignore
    const reportTitle = reportSettings?.length || 0 > 0 ? reportSettings[0]?.title : ""
    // @ts-ignore
    const reportDesc = reportSettings?.length || 0 > 0 ? reportSettings[0]?.description : ""

    const transformedData = data?.response.data.map((item) => {
        return {
            id: item.id,
            submissionId: item.submissionId,
            name: item.name,
            date: DateUtil.formatOnlyDate(item.createdAt),
            invoice: item.invoice,
            amount: item.amount,
        }
    })
    const { data: chartData } = useDashboardController()

    const limitedData = transformedData?.slice(0, 5)
    const columns: ColumnDef<IOrdersColumns>[] = [
        // {
        //     accessorKey: "name",
        //     header: "Name",
        // },
        {
            accessorKey: "date",
            header: "Date",
        },
        {
            accessorKey: "invoice",
            header: "Invoice",
        },
        {
            accessorKey: "amount",
            header: "Amount",
        },
        {
            id: "actions",
            header: "Status",
            // eslint-disable-next-line react/no-unstable-nested-components
            cell: ({ row }) => {
                return (
                    <div className="text-grey-700 flex w-fit">
                        <MyButton
                            variant="default"
                            type="button"
                            size="xs"
                            disabled={loading}
                            loading={loading && buttonClickedId === row.original.id}
                            className="hover:bg-gray-200 bg-primary-500 py-5 px-6"
                            onClick={async () => {
                                setButtonClickedId(row.original.id)
                                setLoading(true)
                                const reportData = await QuizService.getReport(row.original.submissionId)

                                PdfUtil.generatePDF(reportData, reportTitle, reportDesc, sendReportToMail)
                                setLoading(false)
                                setButtonClickedId("")
                            }}
                            startIcon={<FileDown size={20} className="mr-3" />}
                        >
                            Report
                        </MyButton>
                    </div>
                )
            },
        },
    ]
    if (isReportSettingsLoading) {
        return <MyLoading />
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold">Hello, Michael!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
                {/* Total Earning */}
                <ChartCard
                    title="Total Earning"
                    value={`$ ${chartData?.totalEarnings.toFixed(2) || "-"}`}
                    data={chartData?.monthlyEarnings || []}
                    color="rgba(225, 100, 73, 1)"
                />
                {/* Total Submission */}
                <ChartCard
                    title="Total Submission"
                    value={`${chartData?.totalSubmissions || "-"} Tests`}
                    data={chartData?.monthlySubmissions || []}
                    color="rgba(73, 225, 129, 1)"
                />
                {/* New User */}
                <ChartCard
                    title="Total Users"
                    value={`${chartData?.totalUsers || "-"} Persons`}
                    // percentage="+8.6%"
                    data={chartData?.monthlyUsers || []}
                    color="rgba(225, 100, 73, 1)"
                />
            </div>

            <MyDataTable title="Latest Order" columns={columns} data={limitedData || []} hidePagination />
        </div>
    )
}

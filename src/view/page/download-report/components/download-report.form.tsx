import { KeyConstant } from "@/config/constant/key.constant"
import { PdfUtil } from "@/utils/pdf.util"
import MyButton from "@/view/components/common/form/my-button"
import { MyInput } from "@/view/components/common/form/my-input.comp"
import MyLoading from "@/view/components/common/my-loading"
import ContainerSectionWrapper from "@/view/components/layout/container-section-wrapper.comp"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useQuizController } from "../../quiz/quiz.controller"
import { useReportSettingsController } from "../../report-settings/report-settings.controller"
import { useDownloadReportController } from "../download-report.controller"

export default function DownloadReportForm() {
    const [couponCode, setCouponCode] = useState("")
    const { reportPayment, isReportPaymentLoading, sendReportToMail, isSendReportLoading } =
        useDownloadReportController()
    const { reportData, isReportDataLoading } = useQuizController()
    const { reportSettings, isReportSettingsLoading } = useReportSettingsController()

    // @ts-ignore
    const reportTitle = reportSettings?.length || 0 > 0 ? reportSettings[0]?.title : ""
    // @ts-ignore
    const reportDesc = reportSettings?.length || 0 > 0 ? reportSettings[0]?.description : ""

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const isSendEmail = urlParams.get(KeyConstant.searchParamsKeys.send_email)

        if (isSendEmail === "true" && reportData?.id && !isReportSettingsLoading) {
            PdfUtil.generatePDF(reportData, reportTitle, reportDesc, sendReportToMail, true)
        }
    }, [reportData?.id])

    if (isReportSettingsLoading || isReportDataLoading) return <MyLoading />
    return (
        <ContainerSectionWrapper>
            <div>
                {/* <iframe width={700} height={600} id="pdfPreview"></iframe> */}
                <h2 className="text-xl md:text-3xl font-semibold text-black mb-10 text-center md:text-left">
                    Get your report
                </h2>

                <div className="flex flex-col space-y-4 p-8 max-w-2xl shadow-md rounded-lg">
                    <MyButton
                        className="p-7 hover:bg-black hover:text-white border-black md:text-xl"
                        variant={"outline"}
                        onClick={() => {
                            reportData?.id &&
                                PdfUtil.generatePDF(reportData, reportTitle, reportDesc, sendReportToMail)
                        }}
                    >
                        {isSendReportLoading ? (
                            <p className="flex items-center gap-2">
                                <Loader2 className="animate-spin" />
                                Sending Report To Your Email...
                            </p>
                        ) : reportData?.isPurchase ? (
                            "Get full report"
                        ) : (
                            "Get free report"
                        )}
                    </MyButton>
                    <div className="my-4 flex items-center justify-center">
                        <span className="h-px w-full bg-black"></span>
                        <span className="mx-5 text-md text-black">Or</span>
                        <span className="h-px w-full bg-black"></span>
                    </div>

                    <MyInput
                        label="Enter coupon code"
                        onChange={(e) => setCouponCode(e.target.value)}
                        value={couponCode}
                        disabled={reportData?.isPurchase}
                    />

                    {reportData?.isPurchase ? (
                        <MyButton
                            onClick={() => {
                                PdfUtil.generatePDF(reportData, reportTitle, reportDesc, sendReportToMail)
                            }}
                            className="w-full mt-6 p-7 bg-black hover:bg-slate-900"
                        >
                            {isSendReportLoading ? (
                                <p className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" />
                                    Sending Report To Your Email...
                                </p>
                            ) : (
                                "Get Full Report"
                            )}
                        </MyButton>
                    ) : (
                        <MyButton
                            onClick={() => {
                                reportPayment(couponCode)
                            }}
                            loading={isReportPaymentLoading}
                            type="submit"
                            className="w-full mt-6 p-7 bg-black hover:bg-slate-900"
                        >
                            Pay and get full report
                        </MyButton>
                    )}
                </div>
            </div>
        </ContainerSectionWrapper>
    )
}

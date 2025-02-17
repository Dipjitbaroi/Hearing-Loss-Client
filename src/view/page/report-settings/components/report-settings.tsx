import { EnvConfig } from "@/config/env.config"
import { MyInputWithRHF } from "@/view/components/common/form/my-input.comp"
import { Button } from "@/view/components/ui/button"
import { useEffect } from "react"
import { useReportSettingsController } from "../report-settings.controller"
const ReportSettings = () => {
    const { control, handleSubmit, isSubmitting, setValue, reportSettings } = useReportSettingsController()

    const reportSetting = reportSettings?.find((item) => item.quizId === EnvConfig.HEARING_LOSS_QUIZ_ID)

    useEffect(() => {
        setValue("title", reportSetting?.title || "")
        setValue("description", reportSetting?.description || "")
    }, [reportSetting, setValue])

    return (
        <div className="w-full max-w-lg p-10">
            <h1 className="text-2xl font-semibold mb-6">Report Settings</h1>
            <div>
                <div className="mb-4">
                    <label htmlFor="reportTitle" className="block text-sm text-gray-600">
                        Report Title
                    </label>
                    <MyInputWithRHF
                        name="title"
                        label=""
                        control={control}
                        type="text"
                        hideLabel
                        placeholder="Write report title"
                        className="w-full rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="reportDescription" className="block text-sm text-gray-600">
                        Report Description
                    </label>
                    <MyInputWithRHF
                        name="description"
                        label=""
                        isTextArea={true}
                        hideLabel
                        control={control}
                        type="text"
                        placeholder="Write report description"
                        className="w-full rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        type="button"
                        className="px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-100"
                    >
                        Close
                    </button>

                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            handleSubmit()
                        }}
                        disabled={isSubmitting}
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        {isSubmitting ? "Submitting..." : "Save Report Settings"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ReportSettings

import { EnvConfig } from "@/config/env.config"
import { QueryKeys } from "@/config/query.config"
import { QuizService } from "@/service/quiz/quiz.service"
import {
    CreateReportSettingSchema,
    ICreateReportSettingSchema,
} from "@/service/report-setting/report-setting.schema"
import { ReportSettingService } from "@/service/report-setting/report-setting.service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

export const useReportSettingsController = () => {
    const { data: reportSettings, isLoading: isReportSettingsLoading } = useQuery({
        queryKey: [QueryKeys.GET_REPORT_SETTINGS, EnvConfig.HEARING_LOSS_QUIZ_ID],
        queryFn: () => QuizService.getReportSettings(EnvConfig.HEARING_LOSS_QUIZ_ID),
    })

    const reportSetting = reportSettings?.find((item) => item.quizId === EnvConfig.HEARING_LOSS_QUIZ_ID)

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
    } = useForm<ICreateReportSettingSchema>({
        resolver: zodResolver(CreateReportSettingSchema),
        defaultValues: {
            title: reportSetting?.title || "",
            description: reportSetting?.description || "",
            quizId: EnvConfig.HEARING_LOSS_QUIZ_ID,
        },
    })
    const onSubmit = async (input: ICreateReportSettingSchema) => {
        try {
            if ((reportSettings?.length || 0) > 0 && reportSetting?.id) {
                await ReportSettingService.updateReportSetting(
                    { title: input.title, description: input.description },
                    reportSetting?.id
                )
                toast.success("Updated Report Settings")
            } else {
                await ReportSettingService.CreateReportSetting(input)
                toast.success("Saved Report Settings")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        control,
        handleSubmit: handleSubmit(onSubmit),
        isSubmitting,

        reportSettings,
        isReportSettingsLoading,
        setValue,
    }
}

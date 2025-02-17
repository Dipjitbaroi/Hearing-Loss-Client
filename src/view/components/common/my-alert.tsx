import { useGlobalAlertShowClose } from "@/view/hook/alert.store"
import { useState } from "react"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog"
import MyButton from "./form/my-button"

interface IGlobalAlert {
    visible: boolean
    title: string
    description: string
    onClose?: () => void
    submitBtnText?: string
    cancelBtnText?: string
    onSubmit: () => void
}

export function MyAlert({
    visible,
    title,
    description,
    submitBtnText = "Continue",
    cancelBtnText = "Cancel",
    onSubmit,
    onClose,
}: IGlobalAlert) {
    const { closeAlert } = useGlobalAlertShowClose()
    const [isLoading, setLoading] = useState(false)
    return (
        <>
            <AlertDialog open={visible}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {onClose && (
                            <AlertDialogCancel onClick={onClose || closeAlert}>{cancelBtnText}</AlertDialogCancel>
                        )}

                        <MyButton
                            type="button"
                            loading={isLoading}
                            onClick={async () => {
                                setLoading(true)
                                await onSubmit()
                                setLoading(false)
                            }}
                            variant="destructive"
                        >
                            {submitBtnText}
                        </MyButton>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

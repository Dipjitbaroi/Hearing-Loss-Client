import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"

interface IGlobalAlert {
    visible: boolean
    title: string
    description: string
    onClose?: () => void
    submitBtnText?: string
    cancelBtnText?: string
    onSubmit: () => void
}

interface IAlertStore {
    alert: IGlobalAlert
    showAlert: (alert: IGlobalAlert) => void
    closeAlert: () => void
}

const useAlertStore = createWithEqualityFn<IAlertStore>()((set) => {
    return {
        alert: {
            visible: false,
            title: "",
            description: "",
            onClose: () => {},
            submitBtnText: "",
            cancelBtnText: "",
            onSubmit: () => {},
        },
        //* action
        showAlert: (alert: IGlobalAlert) => {
            set((prev) => ({ ...prev, alert }))
        },

        closeAlert: () => {
            set((prev) => ({
                ...prev,
                alert: {
                    visible: false,
                    title: "",
                    description: "",
                    onClose: () => {},
                    submitBtnText: "",
                    cancelBtnText: "",
                    onSubmit: () => {},
                },
            }))
        },
    }
}, shallow)

export const useGlobalAlert = () => {
    const alert = useAlertStore((state) => state.alert)
    return alert
}

export const useGlobalAlertShowClose = () => {
    const showAlert = useAlertStore((state) => state.showAlert)
    const closeAlert = useAlertStore((state) => state.closeAlert)
    return {
        showAlert,
        closeAlert,
    }
}

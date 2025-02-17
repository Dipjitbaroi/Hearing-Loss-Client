// date format or other date related util functions
import { format } from "date-fns"

export const DateUtil = {
    /**
     * @param date 2023-05-09
     * @returns 09 May 2023
     */
    formatOnlyDate: (date: Date | string) => {
        return format(new Date(date), "dd MMM yyyy")
    },
    /**
     * @param date 2023-05-09
     * @returns 09 May 2023 (11:43 AM)
     */
    formatDateTime: (date: Date | string) => {
        return format(new Date(date), "dd MMM yyyy (hh:mm a)")
    },
    /**
     * @param timeString "02:30" | "14:30"
     * @returns 02:30 PM | 02:30 AM
     */
    formatTime: (timeString: string) => {
        const [hours, minutes] = timeString.split(":")
        const formattedTime = `${parseInt(hours) % 12 || 12}:${minutes} ${parseInt(hours) < 12 ? "AM" : "PM"}`
        return formattedTime
    },
}

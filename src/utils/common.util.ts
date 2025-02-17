// common util functions
export const CommonUtil = {
    fakeAwait: (milliseconds: number = 1000) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
    toCamelCaseWithSpace: (inputString: string) => {
        // return inputString.replace(/[-_](.)/g, (_, char) => " " + char.toUpperCase())
        return inputString
            .replace(/[-_](.)/g, (_, char: string) => " " + char.toUpperCase())
            .replace(/\b\w/g, (char) => char.toUpperCase())
    },
    convertStringToNumber: (numberValue: string) => {
        const parsedNumber = parseFloat(numberValue)
        if (!isNaN(parsedNumber)) {
            return parsedNumber
        } else {
            return ""
        }
    },
    currencyFilter: (value: number) => {
        if (typeof value !== "number") {
            return "-"
        }

        const isNegative = value < 0
        const displayValue = value < 0 ? -value : value
        return `${isNegative ? "-" : ""}$${displayValue.toFixed(2).replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1,")}`
    },
    formatTime: (timeString: string) => {
        const time = timeString.split(":")
        const hour = time[0]
        const minute = time[1]

        return `${hour}:${minute}`
    },
    extractFileNames: (url: string) => {
        const parts = url.split("/")
        const fileWithDateAndExt = parts[parts.length - 1]
        const extIndex = fileWithDateAndExt.lastIndexOf(".")
        const fileExt = fileWithDateAndExt.substring(extIndex)
        const fileParts = fileWithDateAndExt.substring(0, extIndex).split("-")
        const fileName = fileParts.slice(0, -1).join("-")

        return `${fileName}${fileExt}`
    },
}

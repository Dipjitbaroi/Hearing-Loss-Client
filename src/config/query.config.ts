import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnReconnect: false, // true
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        },
    },
})

export const QueryKeys = {
    CURRENT_USER: "currentUser",
    GET_CLIENT_LIST: "qk-get-client-list",
    GET_SINGLE_CLIENT: "qk-get-single-client",
    GET_SINGLE_QUIZ: "qk-get-single-quiz",
    QUIZ_SUBMIT: "qk-quiz-submit",
    GET_REPORT: "qk-get-report",
    GET_REPORT_SETTINGS: "qk-get-report-settings",
    GET_ALL_USER: "qk-get-all-user",
    GET_ORDERS: "qk-get-orders",
    GET_DASHBOARD_ORDERS: "qk-get-dashboard-orders",
    GET_CHART_CARD_DATA: "qk-get-chart-card-data",
    GET_QUIZ: "qk-get-quiz",
    GET_SECTIONS_BY_QUIZ_ID: "qk-get-sections-by-quiz-id",
    GET_SUB_SECTIONS_BY_SECTION_ID: "qk-get-sub-sections-by-section-id",
    GET_QUESTIONS_BY_SUB_SECTION_ID: "qk-get-questions-by-sub-section-id",
    GET_COUPONS: "qk-get-coupons",
}

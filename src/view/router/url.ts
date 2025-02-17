export const RouteUrl = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    QUIZ: "/quiz",
    DOWNLOAD_REPORT: "/download-report/:id",
    ABOUT_US: "https://hearinglossprofiles.info/about-us/",
    RESOURCES: "https://hearinglossprofiles.info/resource/",

    // dashboard urls
    DASHBOARD: "/dashboard",
    QUIZ_SECTION: "/quiz-settings/quiz-section/:id",
    QUIZ_SUBSECTION: "/quiz-settings/quiz-subsection/:id",
    QUIZ_QUESTION: "/quiz-settings/quiz-question/:id",
    USERS: "/users",
    QUIZ_SETTINGS: "/quiz-settings",
    ORDERS: "/orders",
    COUPONS: "/coupon",
    REPORT_SETTINGS: "/report-settings",
    NOT_FOUND: "*",
} as const

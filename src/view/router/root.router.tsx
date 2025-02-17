import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "../page/login/login.page"
import NotFoundPage from "../page/not-found/not-found.page"
// import ProtectedRoute from "./protected.route"
import { useUserStore } from "@/store/user.store"
import { PageWrapper, SidebarWrapper } from "@milon27/react-sidebar"
import { CouponPage } from "../page/coupons/coupon.page"
import { DashboardPage } from "../page/dashboard/dashboar.page"
import { QuizDashboardPage } from "../page/dashboard/quiz-dashboard/quiz-dashobard.page"
import { QuizQuestionDashboardPage } from "../page/dashboard/quiz-question/quiz-question.page"
import { QuizSectionDashboardPage } from "../page/dashboard/quiz-section/quiz-section.page"
import { QuizSubSectionDashboardPage } from "../page/dashboard/quiz-subsection/quiz-subsection.page"
import DownloadReportPage from "../page/download-report/download-report.page"
import { useLoginController } from "../page/login/login.controller"
import { OrdersPage } from "../page/orders/orders.page"
import QuizPage from "../page/quiz/quiz.page"
import { ReportSettingsPage } from "../page/report-settings/report-settings.page"
import { UsersPage } from "../page/users/users.page"
import AdminRoute from "./admin-route"
import ProtectedRoute from "./protected.route"
import PublicRoute from "./public.route"
import { useSidebarController } from "./sidebar/sidebar-items"
import { RouteUrl } from "./url"

export default function RootRouter() {
    const { navItems } = useSidebarController()
    const user = useUserStore((store) => store.user)
    const { logout } = useLoginController()
    return (
        <>
            <SidebarWrapper
                title="Hearing Loss Profile"
                customHeader={
                    <>
                        <h1
                            onClick={() => {
                                window.location.replace(`${RouteUrl.HOME}`)
                            }}
                            className="text-primary-500 text-xl cursor-pointer font-bold"
                        >
                            Hearing Loss Profile
                        </h1>
                    </>
                }
                userName={user?.fullName}
                userImageUrl="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-1024.png"
                navItems={navItems}
                activeStyle="fill" // fill , outline
                disableCollapse
                hideBorder
                onLogOut={() => {
                    logout()
                }}
                onProfileImgClick={() => {}}
            >
                <BrowserRouter>
                    <Routes>
                        {/* <Route path={RouteUrl.HOME} element={<HomePage />} /> */}
                        <Route path={RouteUrl.HOME} element={<QuizPage />} />
                        <Route path={RouteUrl.QUIZ} element={<QuizPage />} />
                        <Route path={RouteUrl.DOWNLOAD_REPORT} element={<DownloadReportPage />} />

                        <Route
                            path={RouteUrl.LOGIN}
                            element={
                                <PublicRoute>
                                    <LoginPage />
                                </PublicRoute>
                            }
                        />

                        {/* DASHBOARD  */}
                        <Route
                            path={RouteUrl.DASHBOARD}
                            element={
                                <ProtectedRoute>
                                    <AdminRoute>
                                        <PageWrapper>
                                            <DashboardPage />
                                        </PageWrapper>
                                    </AdminRoute>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.USERS}
                            element={
                                <ProtectedRoute>
                                    <AdminRoute>
                                        <PageWrapper>
                                            <UsersPage />
                                        </PageWrapper>
                                    </AdminRoute>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.QUIZ_SETTINGS}
                            element={
                                <ProtectedRoute>
                                    <AdminRoute>
                                        <PageWrapper>
                                            <QuizDashboardPage />
                                        </PageWrapper>
                                    </AdminRoute>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.QUIZ_SECTION}
                            element={
                                <ProtectedRoute>
                                    <AdminRoute>
                                        <PageWrapper>
                                            <QuizSectionDashboardPage />
                                        </PageWrapper>
                                    </AdminRoute>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.QUIZ_SUBSECTION}
                            element={
                                <ProtectedRoute>
                                    <AdminRoute>
                                        <PageWrapper>
                                            <QuizSubSectionDashboardPage />
                                        </PageWrapper>
                                    </AdminRoute>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.QUIZ_QUESTION}
                            element={
                                <ProtectedRoute>
                                    <AdminRoute>
                                        <PageWrapper>
                                            <QuizQuestionDashboardPage />
                                        </PageWrapper>
                                    </AdminRoute>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.ORDERS}
                            element={
                                <ProtectedRoute>
                                    <AdminRoute>
                                        <PageWrapper>
                                            <OrdersPage />
                                        </PageWrapper>
                                    </AdminRoute>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.COUPONS}
                            element={
                                <ProtectedRoute>
                                    <AdminRoute>
                                        <PageWrapper>
                                            <CouponPage />
                                        </PageWrapper>
                                    </AdminRoute>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteUrl.REPORT_SETTINGS}
                            element={
                                <ProtectedRoute>
                                    <AdminRoute>
                                        <PageWrapper>
                                            <ReportSettingsPage />
                                        </PageWrapper>
                                    </AdminRoute>
                                </ProtectedRoute>
                            }
                        />

                        <Route path={RouteUrl.NOT_FOUND} element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </SidebarWrapper>
        </>
    )
}

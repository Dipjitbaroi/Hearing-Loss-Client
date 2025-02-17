import { QueryClientProvider } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import { ToastContainer } from "react-toastify"
import { queryClient } from "./config/query.config"
import ErrorPage from "./view/page/error/error.page"
import RootRouter from "./view/router/root.router"

// global css
import "react-toastify/dist/ReactToastify.css"
import { MyAlert } from "./view/components/common/my-alert"
import AuthWrapper from "./view/components/layout/auth-wrapper"
import { useGlobalAlert } from "./view/hook/alert.store"

export default function App() {
    const alert = useGlobalAlert()
    return (
        <div className="">
            {/* todo: className="dark" for dark mode*/}
            <div className="font-inter bg-white dark:bg-gray-900">
                <ErrorBoundary
                    fallbackRender={({ error, resetErrorBoundary }) => {
                        return (
                            <>
                                <ErrorPage error={error as Error} resetErrorBoundary={resetErrorBoundary} />
                            </>
                        )
                    }}
                >
                    <QueryClientProvider client={queryClient}>
                        <AuthWrapper>
                            <RootRouter />
                        </AuthWrapper>
                    </QueryClientProvider>
                    <MyAlert {...alert} />
                    <ToastContainer autoClose={false} />
                </ErrorBoundary>
            </div>
        </div>
    )
}

import { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { useUserStore } from "../../store/user.store"
import MyLoading from "../components/common/my-loading"
import { RouteUrl } from "./url"

export default function ProtectedRoute({ children }: PropsWithChildren) {
    const { user, loading } = useUserStore()

    if (loading) {
        return <MyLoading />
    }
    if (!user) return <Navigate to={RouteUrl.LOGIN} />

    return <>{children}</>
}

import { PropsWithChildren } from "react"
import { Navigate } from "react-router-dom"
import { useUserStore } from "../../store/user.store"
import MyLoading from "../components/common/my-loading"
import { RouteUrl } from "./url"

export default function AdminRoute({ children }: PropsWithChildren) {
    const { user, loading } = useUserStore()

    if (loading) {
        return <MyLoading />
    }
    if (!user?.isSuperAdmin) return <Navigate to={RouteUrl.HOME} />

    return <>{children}</>
}

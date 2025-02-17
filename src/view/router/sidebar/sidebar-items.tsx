import { createReactNavLink } from "@milon27/react-sidebar"
import { Box, CircleDollarSign, FileText, Home, Ticket, User } from "lucide-react"
import { NavLink } from "react-router-dom"
import { RouteUrl } from "../url"

export const useSidebarController = () => {
    // const { classes } = useDashboardController()

    const navItems: (() => JSX.Element)[] = [
        createReactNavLink(NavLink, "Dashboard", `${RouteUrl.DASHBOARD}`, <Home size={18} />),
        createReactNavLink(NavLink, "Users", `${RouteUrl.USERS}`, <User size={18} />),
        createReactNavLink(NavLink, "Quiz", `${RouteUrl.QUIZ_SETTINGS}`, <Box size={18} />),
        createReactNavLink(NavLink, "Orders", `${RouteUrl.ORDERS}`, <CircleDollarSign size={18} />),
        createReactNavLink(NavLink, "Coupons", `${RouteUrl.COUPONS}`, <Ticket size={18} className="-rotate-45" />),
        createReactNavLink(NavLink, "Report Settings", `${RouteUrl.REPORT_SETTINGS}`, <FileText size={18} />),
    ]

    return {
        navItems,
    }
}

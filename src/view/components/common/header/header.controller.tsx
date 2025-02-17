import { RouteUrl } from "@/view/router/url"
import { useEffect, useState } from "react"

export const useHeaderController = () => {
    const [isScrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const routes = [
        { id: "1", name: "Home", path: "https://hearinglossprofiles.info/" },
        { id: "2", name: "About us", path: RouteUrl.ABOUT_US },
        { id: "3", name: "Resources", path: RouteUrl.RESOURCES },
    ]

    return { isScrolled, routes }
}

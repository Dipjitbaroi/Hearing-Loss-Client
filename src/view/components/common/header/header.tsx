import { useUserStore } from "@/store/user.store"
import { useLoginController } from "@/view/page/login/login.controller"
import { LogOut } from "lucide-react"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import MyButton from "../form/my-button"
import { useHeaderController } from "./header.controller"
import Logo from "/logo.svg"

export default function Header() {
    const user = useUserStore((s) => s.user)
    const { isScrolled, routes } = useHeaderController()
    const { logout, isLogoutLoading } = useLoginController()
    const [isMenuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen((prev) => !prev)

    return (
        <header
            className={`dark:bg-black dark:text-white transition-all duration-300 ease-in-out z-50 ${
                isScrolled ? "fixed top-0 left-0 w-full bg-white shadow-lg" : "relative"
            }`}
        >
            <div className="container flex items-center justify-between py-5">
                {/* Logo */}
                <a href="https://hearinglossprofiles.info/" className="flex items-center space-x-2">
                    <img src={Logo} alt="Logo" className="h-10 w-10" />
                    <span className="text-md font-bold">Hearing Loss Profiles</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-7">
                    {routes.map((route) => (
                        <NavLink
                            key={route.id}
                            to={route.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "rounded-full border px-4 py-2 footer-link"
                                    : "text-md py-2 hover:text-gray-300 footer-link"
                            }
                        >
                            {route.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Link
                        to="/quiz"
                        className="hidden md:inline-block bg-[#18191C] text-white px-5 py-2 text-sm rounded hover:bg-gray-800"
                    >
                        Take the FREE Quiz
                    </Link>

                    {user?.isSuperAdmin && (
                        <Link
                            to="/dashboard"
                            className="hidden md:inline-block border border-[#18191C] px-5 py-2 text-sm rounded hover:bg-gray-50"
                        >
                            Dashboard
                        </Link>
                    )}
                    {user?.id && (
                        <MyButton
                            variant={"ghost"}
                            onClick={() => {
                                logout()
                            }}
                            loading={isLogoutLoading}
                            className="hidden md:block"
                        >
                            <LogOut size={20} />
                        </MyButton>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button className="text-black focus:outline-none" onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-16 left-0 w-full bg-white dark:bg-black transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "max-h-screen opacity-100 shadow-lg" : "max-h-0 opacity-0"
                } overflow-hidden`}
            >
                <nav className="flex flex-col space-y-4 p-4 items-center">
                    {routes.map((route) => (
                        <NavLink
                            key={route.id}
                            to={route.path}
                            className={({ isActive }) =>
                                isActive ? "rounded-full border px-4 py-2" : "text-md py-2 hover:text-gray-300"
                            }
                            onClick={toggleMenu} // Close the menu on link click
                        >
                            {route.name}
                        </NavLink>
                    ))}
                    {user?.isSuperAdmin && (
                        <Link
                            to="/dashboard"
                            className="border border-[#18191C] px-5 py-2 text-sm rounded hover:bg-gray-50"
                        >
                            Dashboard
                        </Link>
                    )}
                    {user?.id && (
                        <MyButton
                            variant={"ghost"}
                            onClick={() => {
                                logout()
                            }}
                            loading={isLogoutLoading}
                        >
                            Logout
                            <LogOut size={20} className="ml-2" />
                        </MyButton>
                    )}
                </nav>
            </div>
        </header>
    )
}

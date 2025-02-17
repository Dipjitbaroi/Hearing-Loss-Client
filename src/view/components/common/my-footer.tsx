import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="bg-[#18191C] text-white flex items-center justify-center">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center py-12 md:py-32">
                    <nav className="flex flex-wrap justify-center space-x-7 text-white">
                        <Link
                            to="/"
                            className="hover:text-[#B80007] transition duration-300 ease-linear text-xs md:text-[16px] footer-link"
                        >
                            Home
                        </Link>
                        <Link
                            to="/quiz"
                            className="hover:text-[#B80007] transition duration-300 ease-linear text-xs md:text-[16px] footer-link"
                        >
                            Quiz
                        </Link>
                        <Link
                            to="/about"
                            className="hover:text-[#B80007] transition duration-300 ease-linear text-xs md:text-[16px] footer-link"
                        >
                            About us
                        </Link>
                        <Link
                            to="/resources"
                            className="hover:text-[#B80007] transition duration-300 ease-linear text-xs md:text-[16px] footer-link"
                        >
                            Resources
                        </Link>
                        <Link
                            to="/contact"
                            className="hover:text-[#B80007] transition duration-300 ease-linear text-xs md:text-[16px] footer-link"
                        >
                            Contact us
                        </Link>
                    </nav>
                    <div className="text-center">
                        <div className="flex gap-2 pt-10 md:pt-16 items-center justify-center">
                            <img src={"/logo.svg"} alt="Logo" className="w-10 h-10" />
                            <h1 className="text-xl md:text-3xl font-bold">Hearing Loss Profiles</h1>
                        </div>
                        <p className="text-xs md:text-base mt-5 md:mt-10">See how your hearing loss shapes up</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

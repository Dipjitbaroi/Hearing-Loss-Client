import { cn } from "@/utils/style.util"

export function MyPageTitle({ pageTitle, className }: { pageTitle: string; className?: string }) {
    return (
        <>
            <h3
                className={cn(
                    `text-center md:text-left text-base md:text-2xl font-semibold py-5 text-black dark:text-white`,
                    className
                )}
            >
                {pageTitle}
            </h3>
        </>
    )
}

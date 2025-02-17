type PropsType = {
    variant: "green" | "red" | "light-green" | "warning"
    children: React.ReactNode
}
export function MyLabelTag({ variant, children }: PropsType) {
    return (
        <>
            {variant === "green" && (
                <span className="bg-success text-gray-50 font-medium py-1 px-2 rounded-md text-xs">
                    {children}
                </span>
            )}
            {variant === "red" && (
                <span className="bg-danger text-gray-50 font-medium py-1 px-2 rounded-md text-xs">{children}</span>
            )}
            {variant === "light-green" && (
                <span className="bg-green-100 text-gray-600 font-medium py-1 px-2 rounded-md text-xs">
                    {children}
                </span>
            )}
            {variant === "warning" && (
                <span className="bg-[#FF9F43] text-gray-50 font-medium py-1 px-2 rounded-md text-xs">
                    {children}
                </span>
            )}
        </>
    )
}

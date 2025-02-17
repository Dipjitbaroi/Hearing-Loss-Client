import { Constant } from "@/config/constant/common.constant"
import { cn } from "@/utils/style.util"

export const MyAvatar = ({
    imgPath,
    variant,
    className,
}: {
    imgPath: string | null
    variant: "xs" | "md" | "lg"
    className?: string
}) => {
    return (
        <>
            {variant === "xs" && (
                <div className="rounded-full">
                    <img
                        src={imgPath ? imgPath : Constant.DEFAULT_AVATAR}
                        alt="Image not loaded!"
                        className={cn(`h-10 w-10 rounded-full object-cover bg-gray-50`, className)}
                    />
                </div>
            )}

            {variant === "md" && (
                <div className="rounded-full">
                    <img
                        src={imgPath ? imgPath : Constant.DEFAULT_AVATAR}
                        alt="Image not loaded!"
                        className={cn(`h-16 w-16 rounded-full object-cover bg-gray-50`, className)}
                    />
                </div>
            )}

            {variant === "lg" && (
                <div className="rounded-full">
                    <img
                        src={imgPath ? imgPath : Constant.DEFAULT_AVATAR}
                        alt="Image not loaded!"
                        className={cn(`h-32 w-32 rounded-full object-cover bg-gray-50`, className)}
                    />
                </div>
            )}
        </>
    )
}

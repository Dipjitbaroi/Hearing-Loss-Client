import { Constant } from "@/config/constant/common.constant"
import { MyAvatar } from "./my-avatar"

export default function MyHeader() {
    return (
        <div className="w-full shadow-md shadow-slate-200 py-2 px-10 hidden sm:flex justify-end">
            <div className="flex items-center gap-2">
                <MyAvatar variant="xs" imgPath={Constant.DEFAULT_AVATAR} />
                <div>
                    <h4 className="font-semibold text-sm">Jon doe</h4>
                    <p className="text-xs text-gray-400">Manager</p>
                </div>
            </div>
        </div>
    )
}

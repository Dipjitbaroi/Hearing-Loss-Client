import { CheckCheck } from "lucide-react"
import React from "react"

interface ProgressBarProps {
    sections: { label: string; completed: boolean }[]
}

const ProgressBar: React.FC<ProgressBarProps> = ({ sections }) => {
    return (
        <div className="w-full overflow-x-auto">
            <div className="flex items-center rounded-xl border-2 border-[#374151]">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className={`flex-1 h-4 flex justify-center items-center ${
                            index === 0 ? "rounded-s-full bg-green-500" : ""
                        } ${section.completed ? "bg-green-500" : "bg-green-200"} ${
                            index !== sections.length - 1 ? "border-r-2 border-[#374151]" : "rounded-e-full"
                        }`}
                    >
                        {section.completed && <CheckCheck size={20} className="text-gray-50" />}
                    </div>
                ))}
            </div>
            <div className="flex justify-between gap-1 mt-2 text-[9px]  md:text-sm">
                {sections.map((section, index) => (
                    <div key={index} className="flex-1 text-center">
                        {section.label}
                    </div>
                ))}
            </div>
        </div>
        // <div className="w-full">
        //     <div className="flex items-center rounded-xl border-2 border-[#374151]">
        //         {sections.map((section, index) => (
        //             <div
        //                 key={index}
        //                 className={`flex-1 h-4 ${index === 0 ? "rounded-s-full bg-green-500" : ""} ${
        //                     section.completed ? "bg-green-500" : "bg-green-200"
        //                 } ${index !== sections.length - 1 ? "border-r-2 border-[#374151]" : "rounded-e-full"}`}
        //             ></div>
        //         ))}
        //     </div>
        //     <div className="md:flex justify-between mt-2 text-sm hidden">
        //         {sections.map((section, index) => (
        //             <div key={index} className="flex-1 text-center">
        //                 {section.label}
        //             </div>
        //         ))}
        //     </div>
        // </div>
    )
}

export default ProgressBar

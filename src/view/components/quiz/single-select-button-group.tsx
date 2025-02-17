import React, { useEffect, useState } from "react"

interface SingleSelectButtonGroupProps {
    options: string[]
    name: string
    onChange: (value: string) => void
    value?: string
}

const SingleSelectButtonGroup: React.FC<SingleSelectButtonGroupProps> = ({ options, name, onChange, value }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(value || null)

    const handleSelect = (option: string) => {
        setSelectedOption(option)
    }
    useEffect(() => {
        onChange(selectedOption || "")
    }, [selectedOption])
    return (
        <div className="flex flex-wrap gap-5">
            {options.map((option, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-fit p-3 rounded-lg border text-sm font-semibold font-poppins ${
                        selectedOption === option
                            ? "bg-[#2563EB] text-white border-0"
                            : "bg-gray-100 text-[#374151] border-0"
                    } focus:outline-none focus:ring-0 focus:ring-offset-0 break-words`}
                    id={`${name}-${index}`}
                >
                    {option}
                </button>
            ))}
        </div>
    )
}

export default SingleSelectButtonGroup

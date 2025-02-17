import React, { useEffect, useState } from "react"

interface ButtonGroupProps {
    options: string[]
    name: string
    onChange: (value: string[]) => void
    value?: string[]
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options, name, onChange, value }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>(value || [])

    const toggleOption = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option) ? prev.filter((selected) => selected !== option) : [...prev, option]
        )
    }

    useEffect(() => {
        onChange(selectedOptions)
    }, [selectedOptions])

    return (
        <div className="flex flex-wrap gap-5">
            {options.map((option, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => toggleOption(option)}
                    className={` w-fit p-3 rounded-lg border text-sm font-semibold font-poppins ${
                        selectedOptions.includes(option)
                            ? "bg-[#2563EB] text-white border-0"
                            : "bg-gray-100 text-[#374151] border-0"
                    } focus:outline-none focus:ring-0 focus:ring-offset-0 break-words truncate`}
                    id={`${name}-${index}`}
                >
                    {option}
                </button>
            ))}
        </div>
    )
}

export default ButtonGroup

import { RuleType } from "@/@types/form.type"
import React from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import MyErrorInfo from "../my-error-info"
import { MyLabel } from "../my-label"
import MySpacer from "../my-spacer"

interface IMySelect {
    options: {
        value: string
        label: string
    }[]
    placeholder: string
    value?: string
    onChange: (value: string) => void
    mRef?: React.LegacyRef<HTMLInputElement>
    error?: string
    disabled?: boolean
    customOnChange?: (value: string) => void // Add this prop for custom onChange
}

export default function MySelect({
    value,
    placeholder,
    onChange,
    options,
    mRef,
    error,
    disabled,
    customOnChange,
}: IMySelect) {
    const handleChange = (selectedValue: string) => {
        onChange(selectedValue) // Call the provided onChange
        if (customOnChange) {
            customOnChange(selectedValue) // Call the custom onChange if provided
        }
    }

    return (
        <div ref={mRef}>
            <Select value={value} onValueChange={handleChange} disabled={disabled}>
                <SelectTrigger
                    className={
                        error ? `ring-2  ring-danger ring-offset-2 bg-grey-50` : "bg-gray-50 dark:bg-gray-900"
                    }
                >
                    <SelectValue className="text-slate-950 dark:text-slate-50" placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="max-h-48 bg-gray-50 dark:bg-gray-900">
                    {options.map((item) => {
                        return (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
            {error && <MyErrorInfo message={error} />}
        </div>
    )
}

interface IMySelectWithRHF<T extends FieldValues> extends Omit<IMySelect, "mRef" | "value" | "onChange"> {
    name: Path<T>
    control: Control<T>
    rules?: RuleType
    customOnChange?: (value: string) => void // Add this prop for custom onChange
}

export function MySelectWithRHF<T extends FieldValues>({
    name,
    placeholder,
    options,
    control,
    rules,
    disabled,
    customOnChange, // Pass the custom onChange down
}: IMySelectWithRHF<T>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
                return (
                    <div>
                        <MyLabel htmlFor={placeholder} label={placeholder} />
                        <MySpacer className="h-1" />
                        <MySelect
                            options={options}
                            placeholder={placeholder}
                            mRef={ref}
                            value={value || undefined}
                            onChange={onChange}
                            error={error?.message}
                            disabled={disabled}
                            customOnChange={customOnChange} // Pass the custom onChange
                        />
                    </div>
                )
            }}
        />
    )
}

import { RuleType } from "@/@types/form.type"
import React from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Input } from "../../ui/input"
import MyErrorInfo from "../my-error-info"
import { MyLabel } from "../my-label"
import MySpacer from "../my-spacer"

type TypeInputAndTextArea = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface IMyInput extends TypeInputAndTextArea {
    label: string
    error?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    myRef?: any
    isTextArea?: boolean
    hideLabel?: boolean
}

export function MyInput({
    myRef,
    label,
    error,
    hideLabel = false,
    isTextArea = false,
    className,
    ...others
}: IMyInput) {
    return (
        <div className={`flex flex-col text-slate-600 dark:text-slate-400 ${className}`}>
            {!hideLabel && <MyLabel htmlFor={others.name} label={label} />}
            {isTextArea ? (
                <textarea
                    id={others.name}
                    rows={5}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    ref={myRef}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    {...(others as any)}
                    placeholder={others.placeholder || label}
                    // focus:ring-2 focus:ring-primary-light
                    className={`flex w-full rounded-md border  border-slate-200 bg-gray-50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300  ${
                        error ? "ring-2 ring-danger" : ""
                    }`}
                />
            ) : (
                <>
                    <MySpacer className="h-1" />
                    <Input
                        ref={myRef}
                        id={others.name}
                        placeholder={others.placeholder || label}
                        {...others}
                        className={`py-6 rounded-lg text-md text-slate-800 dark:bg-gray-900 shadow${
                            error ? "ring-2 ring-danger ring-offset-2 " : ""
                        }`}
                    />
                </>
            )}

            {error && <MyErrorInfo message={error} />}
        </div>
    )
}

interface IMyInputWithRHF<T extends FieldValues> extends Omit<IMyInput, "myRef"> {
    name: Path<T>
    control: Control<T>
    rules?: RuleType
}

export function MyInputWithRHF<T extends FieldValues>({
    name,
    label,
    control,
    hideLabel,
    rules,
    ...others
}: IMyInputWithRHF<T>) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => {
                let updatedValue = value ? value + "".toString() : ""
                if (others.type === "number") {
                    updatedValue = value ? (value as number).toString() : "" //  use z.number() in zod
                } else if (others.type === "date") {
                    updatedValue = value ? (value as Date).toISOString().split("T")[0] : "" // Format as "YYYY-MM-DD" use z.date() in zod
                }

                return (
                    <MyInput
                        name={name}
                        label={label}
                        myRef={ref}
                        value={updatedValue}
                        onChange={(e) => {
                            if (others.type === "number") {
                                onChange(e.target.valueAsNumber)
                            } else if (others.type === "date") {
                                onChange(e.target.valueAsDate)
                            } else {
                                onChange(e)
                            }
                        }}
                        onBlur={onBlur}
                        error={error?.message}
                        hideLabel={hideLabel}
                        {...others}
                    />
                )
            }}
        />
    )
}

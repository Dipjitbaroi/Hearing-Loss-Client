import React from "react"

interface SliderGroupProps {
    label: string
    id: string // Add an id for accessibility purposes
    endPoint: number
    value?: string
    onChange: (value: string) => void
    disabled?: boolean
    isReview?: boolean
    isSocialSpaces?: boolean
}

const SliderGroup: React.FC<SliderGroupProps> = ({
    label,
    id,
    endPoint,
    onChange,
    value,
    disabled = false,
    isReview = false,
    isSocialSpaces = false,
}) => {
    const segmentWidth = 100 / endPoint

    return (
        <div className="mb-4">
            <hr className="mb-4 mt-4" />
            <label htmlFor={id} className="block mb-4 font-semibold font-poppins text-black">
                {label}
            </label>

            <div className="flex justify-between text-xs text-gray-700 font-medium my-1">
                {Array.from({ length: endPoint }).map((_, index) => (
                    <div key={index} className={`flex-1 ${index === endPoint - 1 ? "text-end" : "text-left"}`}>
                        {isSocialSpaces ? (
                            <>
                                {index === 1 && "Uncomfortable"}
                                {index === endPoint - 1 && "Comfortable"}
                            </>
                        ) : isReview ? (
                            <>
                                {index === 1 && "Dislike"}
                                {index === endPoint - 1 && "Like"}
                            </>
                        ) : (
                            <>
                                {index === 1 && "Impossible"}
                                {index === endPoint - 1 && "Easy"}
                            </>
                        )}
                        {/* {isReview ? (
                            <>
                                {index === 1 && "Dislike"}
                                {index === endPoint - 1 && "Like"}
                            </>
                        ) : (
                            <>
                                {index === 1 && "Impossible"}
                                {index === endPoint - 1 && "Easy"}
                            </>
                        )} */}
                    </div>
                ))}
            </div>

            <div className="w-full ">
                <input
                    id={id} // Associate the input with the label using id
                    type="range"
                    min={0}
                    max={endPoint}
                    defaultValue={1}
                    disabled={disabled}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    aria-label={label}
                    style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        background: `linear-gradient(
                to right,
                #000000 0%, #000000 ${segmentWidth}%,
                #FF4D4D ${segmentWidth}%, #FF4D4D ${segmentWidth * 2}%,
                #FF944D ${segmentWidth * 2}%, #FF944D ${segmentWidth * 3}%,
                #FFC94D ${segmentWidth * 3}%, #FFC94D ${segmentWidth * 4}%,
                #5B9BD5 ${segmentWidth * 4}%, #5B9BD5 ${segmentWidth * 5}%,
                #85E64D ${segmentWidth * 5}%, #85E64D ${segmentWidth * 6}%,
                #4DE64D ${segmentWidth * 6}%, #4DE64D 100%
              )`,
                    }}
                />

                <div className="flex justify-between mt-2 text-sm">
                    <p className="hidden lg:block absolute">Not relevant to me</p>
                    <p className="lg:hidden absolute text-xs">N/A</p>
                    {Array.from({ length: endPoint }).map((_, index) => (
                        <div key={index} className="flex-1 text-end">
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SliderGroup

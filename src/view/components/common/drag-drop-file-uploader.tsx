import { File, Upload } from "lucide-react"
import { ChangeEvent, Dispatch, DragEvent, SetStateAction } from "react"
import MySpacer from "./my-spacer"

interface DropzoneProps {
    id: string
    accept: "img" | "pdf"
    maxSize?: number
    files: File[]
    setFiles: Dispatch<SetStateAction<File[]>>
}

export function DragDropFileUploader({ maxSize, files, setFiles, accept, id }: DropzoneProps) {
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const droppedFiles = Array.from(event.dataTransfer.files)
        handleFiles(droppedFiles)
    }

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || [])
        handleFiles(selectedFiles)
    }

    const handleFiles = (selectedFiles: File[]) => {
        if (maxSize) {
            const filteredFiles = selectedFiles.filter((file) => file.size <= maxSize)
            setFiles((prevFiles) => [...prevFiles, ...filteredFiles])
        } else {
            setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
        }
    }

    const handleRemoveFile = (fileIndex: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex))
    }

    // const handleFilesAdded = () => {
    //     onFilesAdded(files)
    //     setFiles([])
    // }

    return (
        <>
            <div onDrop={handleDrop} onDragOver={handleDragOver}>
                <label
                    htmlFor={id}
                    className="bg-gray-50 dark:bg-gray-900 block text-center p-8 rounded-lg border border-dashed border-gray-400 dark:border-[#71717A] hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900"
                    draggable
                >
                    <div className="space-y-1">
                        <div className="bg-gray-200/70 dark:bg-[#52525B] p-3 rounded-full inline-block">
                            <Upload size={22} />
                        </div>
                        <p className="font-bold text-sm">Upload files</p>
                        <p className="text-textSecondary dark:text-white text-sm">
                            Drag and drop files here or browse file
                        </p>
                    </div>
                    <div className="hidden">
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            id={id}
                            accept={accept === "img" ? "image/*;capture=camera" : "application/pdf"}
                        />
                    </div>
                </label>
            </div>
            <MySpacer className="h-2" />
            <div className="relative">
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 absolute top-0 w-full -z-0">
                    <>
                        {files.map((item) => {
                            return (
                                <div
                                    key={item.name}
                                    className="h-36 rounded-md bg-gray-100 dark:bg-gray-900"
                                ></div>
                            )
                        })}
                    </>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 z-20">
                    {files.map((file, index) => (
                        <div key={index}>
                            {accept === "img" && (
                                <>
                                    <div className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                                            className="h-36 w-full rounded-md bg-white-secondary dark:bg-black-secondary object-cover"
                                        />
                                        <button
                                            onClick={() => handleRemoveFile(index)}
                                            className="absolute top-1.5 right-1.5 bg-gray-400 hover:bg-red-500 border-none rounded-full h-6 w-6 text-white cursor-pointer text-center"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </>
                            )}

                            {accept === "pdf" && (
                                <>
                                    <div className="relative">
                                        <div className="flex justify-center items-center h-36">
                                            <div className="p-4 rounded-md">
                                                <File className="mx-auto" />
                                                <span className="text-[10px]">{file.name}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveFile(index)}
                                            className="absolute top-1.5 right-1.5 bg-gray-400 hover:bg-red-500 border-none rounded-full h-6 w-6 text-white cursor-pointer text-center"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

import { Edit } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import MyButton from "./form/my-button"
import MySpacer from "./my-spacer"

interface IMyDialog {
    buttonName: string
    title: string
    loading: boolean
    handleSubmit: () => void
    children: React.ReactNode
}

export default function MyDialog({ buttonName, title, loading, handleSubmit, children }: IMyDialog) {
    const [open, setOpen] = useState(false)

    const handleUpdate = async () => {
        await handleSubmit()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <MyButton
                    size={"sm"}
                    type="button"
                    startIcon={<Edit size={16} className="mr-1" />}
                    onClick={() => {}}
                >
                    {buttonName}
                </MyButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <MySpacer className="h-1" />
                {children}

                <MySpacer className="h-1" />
                <MyButton loading={loading} size={"lg"} type="button" onClick={handleUpdate}>
                    Update
                </MyButton>
            </DialogContent>
        </Dialog>
    )
}

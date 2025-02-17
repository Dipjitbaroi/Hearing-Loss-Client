import { MyDataTable } from "@/view/components/common/my-data-table"
import { ColumnDef } from "@tanstack/react-table"
import { useUserController } from "./user.controller"
interface IUsersColumns {
    fullName: string
    email: string
}
export const UsersPage = () => {
    const { data } = useUserController()
    const transformedData = data?.list.map((item) => {
        return {
            fullName: item.fullName,
            email: item.email,
        }
    })
    const columns: ColumnDef<IUsersColumns>[] = [
        {
            accessorKey: "fullName",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        // {
        //     accessorKey: "quizDate",
        //     header: "Quiz Date",
        // },
        // {
        //     id: "actions",
        //     header: "Status",
        //     // eslint-disable-next-line react/no-unstable-nested-components
        //     cell: ({ row }) => {
        //         return (
        //             <div className="text-grey-700 flex w-fit">
        //                 <MyButton
        //                     variant="default"
        //                     type="button"
        //                     size="xs"
        //                     className="hover:bg-gray-200 bg-primary-500 py-5 px-6"
        //                     onClick={() => {}}
        //                     startIcon={<FileDown size={20} className="mr-3" />}
        //                 >
        //                     Report
        //                 </MyButton>
        //             </div>
        //         )
        //     },
        // },
    ]

    return (
        <div>
            <MyDataTable
                title="All Users"
                columns={columns}
                data={transformedData || []}
                dataLength={data?.totalItems}
            />
        </div>
    )
}

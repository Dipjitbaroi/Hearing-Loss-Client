import { Constant } from "@/config/constant/common.constant"
import { KeyConstant } from "@/config/constant/key.constant"
import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, LayoutGrid, LayoutList } from "lucide-react"
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import MyButton from "./form/my-button"
import { MyLabel } from "./my-label"
import { MyPageTitle } from "./my-page-title"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    title?: ReactNode
    data: TData[]
    dataLength?: number
    variant?: "horizontal" | "vertical"
    textFilter?: {
        placeholder: string
        filteredField: string
    }
    selectFilter?: {
        placeholder: string
        filteredField: string
        selectItems: { label: string; value: string }[]
    }
    hidePagination?: boolean
    tableOptions?: {
        tableTitle: string
        search?: {
            queryField: string
            placeholder: string
        }
        layoutBtn?: {
            layout: "list" | "grid"
            setLayout: Dispatch<SetStateAction<"list" | "grid">>
        }
        button?: {
            title: ReactNode
            onClick: () => void
        }
    }
}

export function MyDataTable<TData, TValue>({
    columns,
    title,
    data,
    dataLength,
    variant = "horizontal",
    textFilter,
    selectFilter,
    hidePagination = false,
    tableOptions,
}: DataTableProps<TData, TValue>) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: Number(searchParams.get(KeyConstant.searchParamsKeys.page) || 1) - 1,
        pageSize: Constant.PAGE_SIZE,
    })

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
        manualPagination: true,
        pageCount: hidePagination
            ? 1
            : Math.ceil((dataLength || data.length) / pagination.pageSize || Constant.PAGE_SIZE),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    })

    // todo: using useEffect set page on the url
    useEffect(() => {
        setSearchParams((old) => {
            old.set(KeyConstant.searchParamsKeys.page, (pagination.pageIndex + 1).toString())
            old.set(KeyConstant.searchParamsKeys.size, pagination.pageSize.toString())
            return old
        })
    }, [pagination.pageIndex, setSearchParams])

    return (
        <>
            {variant === "horizontal" && (
                <div className="w-full">
                    <div className="md:grid grid-flow-col justify-end items-end">
                        {textFilter && (
                            <div className="md:w-72">
                                <Input
                                    placeholder={`${textFilter.placeholder} ...`}
                                    value={
                                        (table.getColumn(textFilter.filteredField)?.getFilterValue() as string) ??
                                        ""
                                    }
                                    onChange={(event) =>
                                        table
                                            .getColumn(textFilter.filteredField)
                                            ?.setFilterValue(event.target.value)
                                    }
                                    className="w-full md:max-w-lg bg-grey-50 dark:bg-grey-900"
                                />
                            </div>
                        )}
                        <div> </div> {/* for design purpose */}
                        {selectFilter && (
                            <div className="md:flex justify-end">
                                <div>
                                    <MyLabel label={selectFilter.placeholder} />
                                    <Select
                                        value={
                                            (table
                                                .getColumn(selectFilter.filteredField)
                                                ?.getFilterValue() as string) ?? ""
                                        }
                                        onValueChange={(value) =>
                                            table
                                                .getColumn(selectFilter.filteredField)
                                                ?.setFilterValue(value === "all" ? undefined : value)
                                        }
                                    >
                                        <SelectTrigger className="w-full md:w-72 bg-grey-50 dark:bg-grey-900">
                                            <SelectValue placeholder="All" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            {selectFilter.selectItems.map((item) => {
                                                return (
                                                    <SelectItem key={item.value} value={item.value}>
                                                        {item.label}
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>

                    {tableOptions && (
                        <div className="md:flex justify-between items-center">
                            <MyPageTitle pageTitle={tableOptions.tableTitle} className="py-1" />
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                {/* searchbox */}
                                {tableOptions?.search && (
                                    <div className="w-full md:w-72">
                                        <Input
                                            placeholder={`${tableOptions.search.placeholder}...`}
                                            value={
                                                (table
                                                    .getColumn(tableOptions.search.queryField)
                                                    ?.getFilterValue() as string) ?? ""
                                            }
                                            onChange={(event) =>
                                                table
                                                    .getColumn(tableOptions.search?.queryField as string)
                                                    ?.setFilterValue(event.target.value)
                                            }
                                            className="w-full md:max-w-lg bg-grey-50 dark:bg-grey-900"
                                        />
                                    </div>
                                )}

                                <div className="flex justify-between items-center gap-4 w-full md:w-fit">
                                    {/* layout btn  */}
                                    {tableOptions?.layoutBtn && (
                                        <div className="flex border rounded-md">
                                            <MyButton
                                                variant={
                                                    tableOptions.layoutBtn.layout === "list" ? "default" : "ghost"
                                                }
                                                type="button"
                                                onClick={() => tableOptions.layoutBtn?.setLayout("list")}
                                            >
                                                <LayoutList size={18} />
                                            </MyButton>

                                            <MyButton
                                                variant={
                                                    tableOptions.layoutBtn.layout === "grid" ? "default" : "ghost"
                                                }
                                                type="button"
                                                onClick={() => tableOptions.layoutBtn?.setLayout("grid")}
                                            >
                                                <LayoutGrid size={18} />
                                            </MyButton>
                                        </div>
                                    )}

                                    {tableOptions?.button && (
                                        <MyButton type="button" onClick={() => tableOptions.button?.onClick()}>
                                            {tableOptions.button?.title}
                                        </MyButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {(tableOptions?.layoutBtn?.layout === "list" || tableOptions?.layoutBtn === undefined) && (
                        <>
                            <div className="border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm my-4">
                                {title && (
                                    <h2 className="text-lg md:text-xl font-semibold text-black py-4 px-5">
                                        {title}
                                    </h2>
                                )}
                                <Table className="table-auto">
                                    <TableHeader className="uppercase bg-gray-50 border-none">
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id} className="border-none rounded-xl">
                                                {headerGroup.headers.map((header) => {
                                                    return (
                                                        <TableHead key={header.id}>
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                      header.column.columnDef.header,
                                                                      header.getContext()
                                                                  )}
                                                        </TableHead>
                                                    )
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableHeader>
                                    <TableBody>
                                        {table.getRowModel().rows?.length ? (
                                            table.getRowModel().rows.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    data-state={row.getIsSelected() && "selected"}
                                                    className="border-gray-300 dark:border-gray-700"
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id} className="font-semibold">
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* footer */}
                            {!hidePagination && (
                                <div className="flex justify-between border rounded-md hover:bg-gray-50 border-gray-200 dark:border-gray-700 p-4 my-4">
                                    <div>
                                        Page <b>{table.getState().pagination.pageIndex + 1} </b> of{" "}
                                        <b>{table.getPageCount()}</b>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                            Page {table.getState().pagination.pageIndex + 1} of{" "}
                                            {table.getPageCount()}
                                        </div>
                                        <div className="flex items-center justify-end space-x-2 text-primary-dark">
                                            <Button
                                                variant="outline"
                                                className="hidden h-8 w-8 p-0 lg:flex"
                                                onClick={() => table.setPageIndex(0)}
                                                disabled={!table.getCanPreviousPage()}
                                            >
                                                <span className="sr-only">Go to first page</span>
                                                <ChevronsLeft className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="h-8 w-8 p-0"
                                                onClick={() => table.previousPage()}
                                                disabled={!table.getCanPreviousPage()}
                                            >
                                                <span className="sr-only">Go to previous page</span>
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="h-8 w-8 p-0"
                                                onClick={() => table.nextPage()}
                                                disabled={!table.getCanNextPage()}
                                            >
                                                <span className="sr-only">Go to next page</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="hidden h-8 w-8 p-0 lg:flex"
                                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                                disabled={!table.getCanNextPage()}
                                            >
                                                <span className="sr-only">Go to last page</span>
                                                <ChevronsRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* vertical table  */}
            {/* {variant === "vertical" && (
                <div className="border shadow-sm rounded-md divide-y">
                    <div className="grid grid-cols-2 border shadow-sm rounded-md text-xs md:text-sm">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <div key={headerGroup.id} className="divide-y">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <div key={header.id} className="p-3">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                        {table.getRowModel().rows?.length ? (
                            <div className="divide-y">
                                {table.getRowModel().rows.map((row) =>
                                    row.getVisibleCells().map((cell) => (
                                        <div key={cell.id} className="p-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <div>
                                <span className="h-24 text-center">No results.</span>
                            </div>
                        )}
                    </div>
                </div>
            )} */}
        </>
    )
}

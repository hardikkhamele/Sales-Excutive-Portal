import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";

export const DataTable = ({
  data = [],
  columns = [],
  globalFilter = "",
  setGlobalFilter,
  pageSize = 10
}) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize
      }
    }
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const totalRows = table.getFilteredRowModel().rows.length;
  const startRow = totalRows > 0 ? pageIndex * pageSize + 1 : 0;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-slate-50/80 border-b border-slate-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3.5 text-xs font-semibold text-slate-600 uppercase tracking-wider select-none cursor-pointer hover:bg-slate-100/50 transition-colors"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                      {header.column.getCanSort() && (
                        <span className="text-slate-400">
                          {header.column.getIsSorted() === "asc" ? (
                            <ChevronUp className="w-4 h-4 text-blue-600" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ChevronDown className="w-4 h-4 text-blue-600" />
                          ) : (
                            <ChevronsUpDown className="w-3.5 h-3.5" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3.5 text-slate-700 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="font-medium text-slate-600">No records found</p>
                    <p className="text-xs text-slate-400">Try adjusting your search or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls matching Image 3 */}
      {totalRows > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-semibold text-slate-700">{startRow}</span> to{" "}
            <span className="font-semibold text-slate-700">{endRow}</span> of{" "}
            <span className="font-semibold text-slate-700">{totalRows}</span> entries
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                  pageIndex === i
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

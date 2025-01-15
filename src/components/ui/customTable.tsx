import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
} from '@tanstack/react-table';

import { Sort } from '@/assets/icons';
import { RecentStream } from '@/store/dashboardSlice';

interface CustomTableProps {
  columns: any[];
  data: RecentStream[];
  placeholder?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data, placeholder }) => {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10, 
  });

  const [currentPageData, setCurrentPageData] = React.useState<RecentStream[]>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
    pageCount: Math.ceil(data.length / pagination.pageSize),
  });

  const handleSearch = (e: { target: { value: string; }; }) => {
    const searchTerm = e.target.value.toLowerCase();
    setGlobalFilter(searchTerm);

    // Filter the data based on the search term
    const filteredData = data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm),
      ),
    );

    // Update currentPageData after filtering
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    setCurrentPageData(filteredData.slice(start, end));
  };

  React.useEffect(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;

    // Filter the data based on the global filter and sort it
    const filteredData = data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(globalFilter),
      ),
    );

    const sortedData = filteredData.sort((a, b) => {
      for (let { id, desc } of sorting) {
        const column = columns.find(
          (col) => col.id === id || col.accessorKey === id,
        );
        const aValue = a[column.accessorKey as keyof RecentStream];
        const bValue = b[column.accessorKey as keyof RecentStream];

        if (aValue < bValue) return desc ? 1 : -1;
        if (aValue > bValue) return desc ? -1 : 1;
      }
      return 0;
    });

    setCurrentPageData(sortedData.slice(start, end));
  }, [pagination, data, globalFilter, sorting, columns]);

  return (
    <div className="p-6 text-textColor rounded-lg shadow-lg">
      {/* Search Bar */}
      <input
        type="text"
        value={globalFilter || ''}
        onChange={handleSearch}
        placeholder={
          placeholder || 'Search by artist, song, stream, or date...'
        }
        className="mb-4 p-3 border rounded-md w-full sm:w-[300px] bg-gray-800 text-textColor focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      {/* Table */}
      <div className="overflow-x-auto">
        <div className="max-h-[422px] overflow-y-auto rounded-t-lg border border-gray-400 overflow-hidden">
          <table className="min-w-full table-auto border-collapse border border-gray-700 rounded-t-lg">
            <thead className="bg-gray-900 text-textColor sticky -top-1">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`border border-gray-500 px-4 py-3 text-left font-semibold cursor-pointer w-[25%]`}
                      onClick={header.column.getToggleSortingHandler()} 
                    >
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {/* Static sorting icon (FontAwesome) */}
                        <Sort className="size-4 ml-2" />
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-gray-800 rounded-b-lg">
              {currentPageData.length > 0 ? (
                currentPageData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    {columns.map((column, columnIndex) => (
                      <td
                        key={columnIndex}
                        className="border border-gray-500 px-4 py-2 text-sm"
                      >
                        {row[column.accessorKey as keyof RecentStream] || row[column.id as keyof RecentStream] || ''}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-4 text-gray-400"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex - 1,
              }))
            }
            disabled={
              pagination.pageIndex === 0 || currentPageData.length === 0
            }
            className="px-6 py-2 text-sm rounded-md border border-gray-500 bg-gray-800 text-textColor hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                pageIndex: prev.pageIndex + 1,
              }))
            }
            disabled={
              pagination.pageIndex + 1 ===
                Math.ceil(data.length / pagination.pageSize) ||
              currentPageData.length === 0
            }
            className="px-6 py-2 text-sm rounded-md border border-gray-500 bg-gray-800 text-textColor hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        {currentPageData.length !== 0 && (
          <div className="text-sm">
            Page {pagination.pageIndex + 1} of{' '}
            {Math.ceil(data.length / pagination.pageSize)}
          </div>
        )}
        {currentPageData.length !== 0 && (
          <select
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination((prev) => ({
                ...prev,
                pageSize: Number(e.target.value),
                pageIndex: 0, 
              }))
            }
            className="border border-gray-500 px-3 py-2 rounded-md bg-gray-800 text-textColor focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {[5, 10, 20, 30, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default CustomTable;

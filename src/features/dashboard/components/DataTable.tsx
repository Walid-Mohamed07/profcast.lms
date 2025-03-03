import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';
import { IconPath } from '@/constants/iconPath';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

interface Action<T> {
  action: ReactNode;
  handler: (row: T) => void;
}

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  isAction?: boolean;
  render?: (row: T) => ReactNode;
}

interface Props<T> {
  pageCount: number;
  currentPage: number;
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
  isLoading: boolean;
  children: ReactNode;
  onPageChange: (page: number) => void;
}

const DataTable = <T extends object>({
  pageCount,
  currentPage,
  columns,
  data,
  actions = [],
  isLoading,
  children,
  onPageChange,
}: Props<T>) => {
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | 'none'>(
    'none',
  );

  const handleSort = (column: keyof T) => {
    if (sortBy === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection('none');
        setSortBy(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortBy || sortDirection === 'none') return 0;
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue == null || bValue == null) return 0;

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else if (sortDirection === 'desc') {
      return aValue < bValue ? 1 : -1;
    }
    return 0;
  });

  // Calculate equal width for all columns
  const columnWidth = `${100 / columns.length}%`;

  return (
    <div className="space-y-2">
      {children}
      <div className="bg-[#f5f6fa] rounded-lg p-4 text-black">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader isLoading={isLoading} />
          </div>
        ) : (
          <div className="relative w-full overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full table-fixed divide-y divide-gray-200">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={String(column.accessor) || String(Math.random())}
                        className="p-2 px-4 text-left font-semibold text-xs lg:text-base whitespace-nowrap"
                        scope="col"
                      >
                        <div className="flex items-center">
                          <span>{column.header}</span>
                          {(column.accessor || column.render) && (
                            <button
                              onClick={() =>
                                column.accessor && handleSort(column.accessor)
                              }
                              className="cursor-pointer flex-shrink-0"
                            >
                              <Image
                                className="w-4 h-4"
                                width={16}
                                height={16}
                                src={IconPath.SORT}
                                alt="sort"
                              />
                            </button>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <motion.tbody
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoading ? 0 : 1 }}
                  className="divide-y divide-gray-100"
                >
                  {sortedData.length > 0 ? (
                    sortedData.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="bg-white text-xs lg:text-sm hover:bg-gray-50"
                      >
                        {columns.map((column, colIndex) => (
                          <td
                            key={String(column.accessor) || String(colIndex)}
                            className="p-2 px-4 whitespace-nowrap"
                            style={{ width: columnWidth }}
                          >
                            {column.isAction ? (
                              <div className="flex space-x-2">
                                {actions.map((action, index) => (
                                  <button
                                    key={index}
                                    className="flex-shrink-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      action.handler(row);
                                    }}
                                  >
                                    {action.action}
                                  </button>
                                ))}
                              </div>
                            ) : column.render ? (
                              column.render(row)
                            ) : column.accessor ? (
                              <span className="truncate block">
                                {(row[column.accessor] as ReactNode) || 'N/A'}
                              </span>
                            ) : (
                              'N/A'
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="p-4 text-center h-40 text-[#b2b2b2]"
                      >
                        No Data Found
                      </td>
                    </tr>
                  )}
                </motion.tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="pt-8">
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default DataTable;

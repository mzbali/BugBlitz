'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  createComponent?: React.ReactNode;
}

export function DataTable<TData extends object, TValue>({
  columns,
  data,
  createComponent,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  const renderTableHeader = () => (
    <TableHeader className='rounded-md bg-primary-300 '>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className='dark:border-slate-700'>
          {headerGroup.headers.map((header, index, array) => (
            <TableHead
              key={header.id}
              className={cn(
                'text-primary-800',
                index === 0 && 'rounded-tl-lg',
                index === array.length - 1 && 'rounded-tr-lg',
              )}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );

  const renderTableBody = () => (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className='dark:border-slate-700'
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className='h-24 text-center'>
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );

  return (
    <>
      <div className='w-full rounded-lg bg-white text-center shadow dark:bg-slate-800'>
        <div className='flex items-center justify-between p-4'>
          <Input
            placeholder='Search...'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className='max-w-sm dark:border-gray-700'
          />
          {createComponent ? createComponent : null}
        </div>
        <Table>
          {renderTableHeader()}
          {renderTableBody()}
        </Table>
      </div>
    </>
  );
}

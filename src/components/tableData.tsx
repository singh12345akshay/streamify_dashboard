import React, { useMemo } from 'react';

import { RecentStream } from '@/store/dashboardSlice';

import CustomTable from './ui/customTable';

interface TableDataProps {
  data: RecentStream[];
}

const TableData = ({ data }: TableDataProps) => {
  
  const columns = useMemo(
    () => [
      {
        header: 'Artist',
        accessorKey: 'artist',
        cell: (info: { getValue: () => any; }) => info.getValue(),
      },
      {
        header: 'Song',
        accessorKey: 'songName',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Date',
        accessorKey: 'dateStreamed',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Stream Count',
        accessorKey: 'streamCount',
        cell: (info) => info.getValue(),
      },
    ],
    [],
  );

  return (
    <div className="p-4">
      <CustomTable
        columns={columns}
        data={data}
        placeholder="Search by artist, song, or date..."
      />
    </div>
  );
};

export default TableData;

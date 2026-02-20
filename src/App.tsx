import { useMemo, useState } from 'react';
import { DataTable, type FilterInterface } from './components';
import type { ColumnType } from './types';

function App() {
  const [params, setParams] = useState<Record<string, unknown>>({
    page: 1,
    limit: 10,
    test: ['test 1'],
  });
  const columns = useMemo<
    ColumnType<{ name: string; id: string; date: string }>[]
  >(
    () => [
      {
        name: 'id',
        dataIndex: 'id',
        key: 'id',
        sortable: true,
      },
      {
        name: 'name',
        dataIndex: 'name',
        key: 'name',
        sortable: true,
      },
      {
        name: 'date',
        dataIndex: 'date',
        key: 'date',
        sortable: true,
      },
    ],
    []
  );

  const filters = useMemo<FilterInterface[]>(
    () => [
      {
        name: 'test',
        label: 'test',
        isMulti: true,
        options: [
          { label: 'test 1 lab', value: 'test 1 val' },
          { label: 'test 2 lab', value: 'test 2 val' },
          { label: 'test 3 lab', value: 'test 3 val' },
          { label: 'test 4 lab', value: 'test 4 val' },
          { label: 'test 5 lab', value: 'test 5 val' },
          { label: 'test 6 lab', value: 'test 6 val' },
          { label: 'test 7 lab', value: 'test 7 val' },
        ],
      },
      {
        name: 'test2',
        label: 'test2',
        isMulti: true,
        options: [
          { label: 'test 1 lab', value: 'test 1 val' },
          { label: 'test 2 lab', value: 'test 2 val' },
          { label: 'test 3 lab', value: 'test 3 val' },
          { label: 'test 4 lab', value: 'test 4 val' },
          { label: 'test 5 lab', value: 'test 5 val' },
          { label: 'test 6 lab', value: 'test 6 val' },
          { label: 'test 7 lab', value: 'test 7 val' },
        ],
      },
      {
        name: 'test3',
        label: 'test3',
        options: [
          { label: 'test 1 lab', value: 'test 1 val' },
          { label: 'test 2 lab', value: 'test 2 val' },
          { label: 'test 3 lab', value: 'test 3 val' },
          { label: 'test 4 lab', value: 'test 4 val' },
          { label: 'test 5 lab', value: 'test 5 val' },
          { label: 'test 6 lab', value: 'test 6 val' },
          { label: 'test 7 lab', value: 'test 7 val' },
        ],
      },
    ],
    []
  );

  return (
    <div className={'pl-63.75'}>
      <DataTable
        rowKey={'id'}
        filters={filters}
        params={params}
        hasSearch
        hasPagination
        showAppliedFilters
        hasCheckbox
        actions={[{ label: '123', onClick: () => console.log('123') }]}
        exportOptions={[{ label: '123', onClick: () => console.log('123') }]}
        hasColumnsVisibilityDropdown
        onParamChange={setParams}
        tableKey={'table'}
        columns={columns}
      />
    </div>
  );
}

export default App;

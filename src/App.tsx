import { DataTable } from './components';

function App() {
  return (
    <DataTable<{ id: string }> rowKey={'id'} columns={[]} tableKey={'test'} />
  );
}

export default App;

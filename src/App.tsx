import { MyDatePicker, MyInput } from './components';
import { useState } from 'react';

function App() {
  const [date, setDate] = useState<Date | undefined | string>();
  return (
    <div>
      <MyInput />
      <MyDatePicker selected={date} onSelect={(value) => setDate(value)} />
    </div>
  );
}

export default App;

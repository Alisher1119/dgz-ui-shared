import { Button } from 'dgz-ui/button';
import { ToastContainer } from 'react-toastify/unstyled';

function App() {
  // const { confirm } = useConfirm();
  return (
    <>
      <Button onClick={() => confirm('confirm?')}>123</Button>
      <ToastContainer />
    </>
  );
}

export default App;

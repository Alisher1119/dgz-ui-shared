import type { HTMLAttributes } from 'react';
import Spin from './Spin.tsx';

const Loader = (props?: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="text-item-primary mx-auto flex w-full items-center justify-center p-4"
      {...props}
    >
      <Spin className="text-item-primary size-6" />
    </div>
  );
};

export default Loader;

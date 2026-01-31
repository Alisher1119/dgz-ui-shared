import type { HTMLAttributes } from 'react';
import Spin from './Spin';

/**
 * Loader shows a centered spinning indicator inside a container.
 *
 * @param props - Optional div HTML attributes.
 */
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

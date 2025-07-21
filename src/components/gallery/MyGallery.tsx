import LightGallery, { type LightGalleryProps } from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { cn } from 'dgz-ui';

export interface GalleryItem {
  src: string;
  thumbnail: string;
  subHtml?: string;
  className?: string;
}

export type MyGalleryProps = LightGalleryProps & {
  images: GalleryItem[];
  hasInfo?: true;
};

export const MyGallery = ({
  images,
  speed = 500,
  plugins = [],
  hasInfo,
  elementClassNames,
  ...props
}: MyGalleryProps) => {
  return (
    <LightGallery
      {...props}
      speed={speed}
      plugins={[lgThumbnail, lgZoom, ...plugins]}
      elementClassNames={cn(
        'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4',
        elementClassNames
      )}
    >
      {images?.map(({ src, thumbnail, subHtml, className }, index) => (
        <a
          key={index}
          href={thumbnail || src}
          className={cn('rounded-3 relative overflow-hidden', className)}
        >
          <img alt={subHtml} src={thumbnail || src} />
          {hasInfo && (
            <div className="bg-opacity-50 bg-bg/50 text-secondary absolute bottom-0 left-0 flex min-h-10 w-full items-center justify-center">
              {subHtml}
            </div>
          )}
        </a>
      ))}
    </LightGallery>
  );
};

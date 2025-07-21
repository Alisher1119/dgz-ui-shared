import React, {
  type HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import { isNumber } from 'lodash';
import { cn } from 'dgz-ui';
import { saveAs } from 'file-saver';

export interface GalleryItem {
  id: string;
  src: string;
  thumbnail: string;
  alt: string;
  title?: string;
}

export interface GalleryActionButton {
  icon: React.ReactNode;
  label: string;
  onClick: (image: GalleryItem) => void;
  className?: string;
}

export type MyGalleryProps = HTMLAttributes<HTMLDivElement> & {
  images: GalleryItem[];
  actionButtons?: GalleryActionButton[];
  hasInfo?: true;
};

// Default action buttons moved outside component to prevent recreation on each render
const createDefaultActions = (): GalleryActionButton[] => [
  {
    icon: <Download size={20} />,
    onClick: (image) => {
      saveAs(image.src, image.title);
    },
    label: 'Download',
  },
];

// Thumbnail component to optimize rendering of grid items
const Thumbnail = memo(
  ({
    image,
    index,
    onClick,
  }: {
    image: GalleryItem;
    index: number;
    onClick: (index: number) => void;
  }) => {
    return (
      <div
        key={image.id}
        className="aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-opacity hover:opacity-80"
        onClick={() => onClick(index)}
      >
        <img
          src={image.thumbnail || image.src}
          alt={image.alt || `Image ${index + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
);

// Main component implementation
const MyGalleryComponent = ({
  images,
  actionButtons = [],
  className,
  hasInfo,
  ...props
}: MyGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Memoize default actions to prevent recreation on each render
  const defaultActions = useMemo(() => createDefaultActions(), []);

  // Memoize combined action buttons
  const allActionButtons = useMemo(
    () => [...defaultActions, ...actionButtons],
    [defaultActions, actionButtons]
  );

  // Memoize event handlers to prevent recreation on each render
  const openFullscreen = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsFullscreen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setSelectedIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  }, [selectedIndex]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  }, [selectedIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      switch (e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, goToPrevious, goToNext, closeFullscreen]);

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  // Memoize currentImage to prevent unnecessary calculations
  const currentImage = useMemo(
    () => (selectedIndex !== null ? images[selectedIndex] : null),
    [selectedIndex, images]
  );

  // Memoized FullscreenView component
  const FullscreenView = useMemo(() => {
    if (!isFullscreen || !currentImage) return null;

    return (
      <div className="bg-opacity-95 bg-bg fixed inset-0 z-50 flex flex-col items-center justify-center">
        <div
          className={
            'absolute top-0 flex w-full items-start justify-between p-3'
          }
        >
          <div>
            {currentImage.title && (
              <h2 className="text-body-lg-semi-bold">{currentImage.title}</h2>
            )}
          </div>

          {/* Top Bar with Actions and Close */}
          <div className="flex items-center gap-4 py-1">
            {/* Action Buttons */}
            {allActionButtons.map((action, index) => (
              <button
                key={index}
                onClick={() => action.onClick(currentImage)}
                className="cursor-pointer"
                title={action.label}
              >
                {action.icon}
              </button>
            ))}

            {/* Close Button */}
            <button
              onClick={closeFullscreen}
              className="cursor-pointer"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Left Navigation */}
        {isNumber(selectedIndex) && selectedIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="bg-opacity-50 hover:bg-opacity-70 bg-bg text-secondary absolute top-1/2 left-2 z-50 -translate-y-1/2 rounded-full p-3 transition-all"
            title="Previous (←)"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Right Navigation */}
        {isNumber(selectedIndex) && selectedIndex < images.length - 1 && (
          <button
            onClick={goToNext}
            className="bg-opacity-0 hover:bg-opacity-100 text-secondary bg-bg absolute top-1/2 right-2 z-50 -translate-y-1/2 rounded-full p-3 transition-all"
            title="Next (→)"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div className="flex max-h-full max-w-full items-center justify-center overflow-hidden p-8">
          <img
            src={currentImage.src}
            alt={currentImage.alt || `Image ${selectedIndex}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className={'bg-bg absolute bottom-0 w-full'}>
          <div className="flex gap-2 overflow-x-auto p-3">
            {images.map((image, index) => {
              return (
                <div
                  key={image.id}
                  className={cn(
                    `hover:border-item-primary h-16 min-w-16 shrink-0 cursor-pointer rounded border-3 border-transparent transition-all`,
                    index == selectedIndex && 'border-item-primary'
                  )}
                  onClick={() => setSelectedIndex(index)}
                >
                  <img
                    src={image.thumbnail || image.src}
                    alt={image.alt || `Thumbnail ${index + 1}`}
                    className="size-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }, [
    isFullscreen,
    currentImage,
    allActionButtons,
    closeFullscreen,
    selectedIndex,
    goToPrevious,
    images,
    goToNext,
  ]);

  return (
    <div className={'w-full'}>
      <div
        {...props}
        className={cn(
          'grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
          className
        )}
      >
        {images.map((image, index) => (
          <div className={'relative'} key={image.id}>
            <Thumbnail image={image} index={index} onClick={openFullscreen} />
            {hasInfo && image.title && (
              <div
                className={
                  'bg-bg/70 absolute bottom-0 flex min-h-10 w-full items-center justify-center'
                }
              >
                {image.title}
              </div>
            )}
          </div>
        ))}
      </div>

      {FullscreenView}
    </div>
  );
};

export const MyGallery = memo(MyGalleryComponent);

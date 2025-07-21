import React, {
  type HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
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
const createDefaultActions = (
  setZoom: React.Dispatch<React.SetStateAction<number>>,
  setRotation: React.Dispatch<React.SetStateAction<number>>
): GalleryActionButton[] => [
  {
    icon: <ZoomIn size={20} />,
    onClick: () => setZoom((prev) => Math.min(prev * 1.5, 5)),
    label: 'Zoom In',
  },
  {
    icon: <ZoomOut size={20} />,
    onClick: () => setZoom((prev) => Math.max(prev / 1.5, 0.5)),
    label: 'Zoom Out',
  },
  {
    icon: <RotateCw size={20} />,
    onClick: () => setRotation((prev) => (prev + 90) % 360),
    label: 'Rotate',
  },
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
        className="aspect-auto max-h-60 cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-opacity hover:opacity-80"
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
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Memoize default actions to prevent recreation on each render
  const defaultActions = useMemo(
    () => createDefaultActions(setZoom, setRotation),
    [setZoom, setRotation]
  );

  // Memoize combined action buttons
  const allActionButtons = useMemo(
    () => [...defaultActions, ...actionButtons],
    [defaultActions, actionButtons]
  );

  // Memoize event handlers to prevent recreation on each render
  const openFullscreen = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsFullscreen(true);
    setZoom(1);
    setRotation(0);
    setDragPosition({ x: 0, y: 0 });
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    setSelectedIndex(null);
    setZoom(1);
    setRotation(0);
    setDragPosition({ x: 0, y: 0 });
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setZoom(1);
      setRotation(0);
      setDragPosition({ x: 0, y: 0 }); // Reset drag position when navigating
    }
  }, [selectedIndex]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setZoom(1);
      setRotation(0);
      setDragPosition({ x: 0, y: 0 }); // Reset drag position when navigating
    }
  }, [selectedIndex, images.length]);

  // Drag handlers for all zoom levels with smooth performance
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - dragPosition.x,
        y: e.clientY - dragPosition.y,
      });
      e.preventDefault();
    },
    [dragPosition]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;

        // Smooth drag with momentum
        setDragPosition({
          x: newX,
          y: newY,
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch events for mobile drag support
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - dragPosition.x,
        y: touch.clientY - dragPosition.y,
      });
      e.preventDefault();
    },
    [dragPosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isDragging) {
        const touch = e.touches[0];
        const newX = touch.clientX - dragStart.x;
        const newY = touch.clientY - dragStart.y;

        setDragPosition({
          x: newX,
          y: newY,
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

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
      <div className="bg-opacity-95 bg-bg fixed inset-0 z-50 flex items-center justify-center">
        {/* Title - Top Left */}
        {currentImage.title && (
          <div className="absolute top-4 left-4 z-60">
            <h2 className="bg-opacity-50 bg-bg text-secondary rounded-lg px-4 py-2 text-xl font-semibold">
              {currentImage.title}
            </h2>
          </div>
        )}

        {/* Top Bar with Actions and Close */}
        <div className="absolute top-4 right-4 z-60 flex items-center space-x-2">
          {/* Action Buttons */}
          {allActionButtons.map((action, index) => (
            <button
              key={index}
              onClick={() => action.onClick(currentImage)}
              className="bg-opacity-50 hover:bg-opacity-70 bg-bg text-secondary rounded-full p-2 transition-all"
              title={action.label}
            >
              {action.icon}
            </button>
          ))}

          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="bg-opacity-50 hover:bg-opacity-70 bg-bg text-secondary rounded-full p-2 transition-all"
            title="Close (Esc)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Left Navigation */}
        {isNumber(selectedIndex) && selectedIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="bg-opacity-50 hover:bg-opacity-70 bg-bg text-secondary absolute top-1/2 left-4 z-60 -translate-y-1/2 rounded-full p-3 transition-all"
            title="Previous (←)"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Right Navigation */}
        {isNumber(selectedIndex) && selectedIndex < images.length - 1 && (
          <button
            onClick={goToNext}
            className="bg-opacity-0 hover:bg-opacity-100 text-secondary absolute top-1/2 right-4 z-60 -translate-y-1/2 rounded-full bg-black p-3 transition-all"
            title="Next (→)"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Main Image */}
        <div
          className="flex max-h-full max-w-full items-center justify-center overflow-hidden p-8 select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <img
            src={currentImage.src}
            alt={currentImage.alt || `Image ${selectedIndex}`}
            className="object-contain transition-transform duration-100 ease-out"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg) translate(${dragPosition.x / zoom}px, ${dragPosition.y / zoom}px)`,
              willChange: isDragging ? 'transform' : 'auto',
              maxWidth: 'none',
              maxHeight: 'none',
              width: 'auto',
              height: 'auto',
            }}
            draggable={false}
          />
        </div>

        <div
          className={
            'bg-bg absolute bottom-0 flex w-full items-center justify-center'
          }
        >
          <div className="flex space-x-2 overflow-x-auto p-3">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded border-2 transition-all ${
                  index === selectedIndex
                    ? 'border-white'
                    : 'border-transparent hover:border-gray-400'
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={image.thumbnail || image.src}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
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
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isDragging,
    zoom,
    rotation,
    dragPosition.x,
    dragPosition.y,
  ]);

  return (
    <div className={'w-full'}>
      <div
        {...props}
        className={cn(
          'grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4',
          className
        )}
      >
        {images.map((image, index) => (
          <div className={'relative'}>
            <Thumbnail
              key={image.id}
              image={image}
              index={index}
              onClick={openFullscreen}
            />
            {hasInfo && image.title && (
              <div
                className={
                  'bg-bg/50 text-secondary absolute bottom-0 flex min-h-10 w-full items-center justify-center'
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

import { type GalleryItem, MyGallery } from './components/gallery';

function App() {
  const sampleImages: GalleryItem[] = [
    {
      id: '1',
      src: 'https://picsum.photos/id/1000/1000/1000',
      thumbnail: 'https://picsum.photos/id/1000/1000/1000',
      alt: 'Beautiful landscape',
      title: 'Mountain Vista',
    },
    {
      id: '2',
      src: 'https://picsum.photos/id/1000/1000/1000',
      thumbnail: 'https://picsum.photos/id/1000/1000/1000',
      alt: 'City skyline',
      title: 'Urban Lights',
    },
    {
      id: '3',
      src: 'https://picsum.photos/id/1000/1000/1000',
      thumbnail: 'https://picsum.photos/id/1000/1000/1000',
      alt: 'Ocean waves',
      title: 'Coastal Beauty',
    },
    {
      id: '4',
      src: 'https://picsum.photos/id/1000/1000/1000',
      thumbnail: 'https://picsum.photos/id/1000/1000/1000',
      alt: 'Forest path',
      title: 'Nature Trail',
    },
    {
      id: '5',
      src: 'https://picsum.photos/id/1000/1000/1000',
      thumbnail: 'https://picsum.photos/id/1000/1000/1000',
      alt: 'Desert sunset',
      title: 'Golden Hour',
    },
    {
      id: '6',
      src: 'https://picsum.photos/id/1000/1000/1000',
      thumbnail: 'https://picsum.photos/id/1000/1000/1000',
      alt: 'Snow mountains',
      title: 'Winter Peak',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Image Gallery Demo
        </h1>
        <MyGallery images={sampleImages} hasInfo />
      </div>
    </div>
  );
}

export default App;

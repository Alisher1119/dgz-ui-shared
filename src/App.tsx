import { MyGallery } from './components/gallery';

function App() {
  return (
    <div>
      <MyGallery
        images={[
          {
            subHtml: 'test 0',
            src: 'https://picsum.photos/id/1000/1000/1000',
            thumbnail: 'https://picsum.photos/id/1000/1000/1000',
          },
          {
            subHtml: 'test 1',
            src: 'https://picsum.photos/id/1000/1000/1000',
            thumbnail: 'https://picsum.photos/id/1000/1000/1000',
          },
          {
            subHtml: 'test 2',
            src: 'https://picsum.photos/id/1000/1000/1000',
            thumbnail: 'https://picsum.photos/id/1000/1000/1000',
          },
          {
            subHtml: 'test 3',
            src: 'https://picsum.photos/id/1000/1000/1000',
            thumbnail: 'https://picsum.photos/id/1000/1000/1000',
          },
          {
            subHtml: 'test 4',
            src: 'https://picsum.photos/id/1000/1000/1000',
            thumbnail: 'https://picsum.photos/id/1000/1000/1000',
          },
        ]}
      />
    </div>
  );
}

export default App;

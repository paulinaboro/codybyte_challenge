import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import { IImage } from '../src/utils/types';
import ImageCard from './components/ImageCard/ImageCard';

function App() {
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('cat');
  const [visible, setVisible] = useState<number>(3);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const url = `https://api.giphy.com/v1/stickers/search?q='${searchTerm}'&limit=10&rating=g&api_key=1bkG7ky5cmw5SLyvNfElcR1iYVzs38Zq`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        const data = json.data;

        setImages(data);
        setLoading(true);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();

    //Each time search term is changed or user clicked load more we fetch new data again
  }, [searchTerm]);

  const loadMore = () => {
    if (visible == 9) {
      setVisible(visible + 1);
      const text = 'No more content available';
      setMessage(text);
    } else setVisible(visible + 3);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Coding Challenge</p>
      </header>
      <main>
        <div className="search-container">
          <label htmlFor="search-bar">
            Type to search for different things like: cat, dog, monkey, zebra
            etc
          </label>
          <input
            id="search-bar"
            type="text"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Type here..."
          />
        </div>
        {loading ? (
          <div className="images-container">
            {images.slice(0, visible).map((image) => (
              <ImageCard
                id={image.id}
                images={image.images}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                imgSrc={image.images.downsized_medium.url}
                title={image.title}
              />
            ))}
            {message && <p className="text-message"> {message}</p>}
            <button
              id="next_btn"
              onClick={() => {
                loadMore();
              }}
            >
              Load More
            </button>
          </div>
        ) : (
          <div>
            <p>Loading ...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

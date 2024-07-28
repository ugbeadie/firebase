import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  }, []);

  return (
    <>
      <Auth />
      <div className="container">
        <input type="text" placeholder="title" />
        <input type="number" placeholder="release date" />
        <input type="checkbox" />
        <label>received an oscar</label>
        <button>submit movie</button>
      </div>
      {movieList.map((movie) => (
        <div className="container">
          <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
            {movie.title}
          </h1>
          <p>Date: {movie.releaseDate}</p>
        </div>
      ))}
    </>
  );
}

export default App;

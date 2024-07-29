import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { db } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [MovieTitle, setMovieTitle] = useState("");
  const [MovieReleaseDate, setMovieReleaseDate] = useState(0);
  const [isMovieAnOscar, setisMovieAnOscar] = useState(false);

  const moviesCollectionRef = collection(db, "movies");

  const onSubmit = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: MovieTitle,
        releaseDate: MovieReleaseDate,
        receivedAnOscar: isMovieAnOscar,
      });
    } catch (err) {
      console.error(err);
    }
  };

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
  }, [onSubmit]);

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  return (
    <>
      <Auth />
      <div className="container">
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="release date"
          onChange={(e) => setMovieReleaseDate(e.target.value)}
        />
        <input
          type="checkbox"
          checked={isMovieAnOscar}
          onChange={(e) => setisMovieAnOscar(e.target.checked)}
        />
        <label>received an oscar</label>
        <button onClick={onSubmit}>submit movie</button>
      </div>
      {movieList.map((movie) => (
        <div className="container">
          <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
            {movie.title}
          </h1>
          <p>Date: {movie.releaseDate}</p>
          <button onClick={() => deleteMovie(movie.id)}>delete movie</button>
        </div>
      ))}
    </>
  );
}

export default App;

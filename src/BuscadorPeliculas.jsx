import { useState } from "react";

export const BuscadorPeliculas = () => {
  const urlBase = 'https://api.themoviedb.org/3/search/movie';
  const API_KEY = 'eb7fed6bdbea4b8a33c178e4a08dbf62';

  const [Busqueda, setBusqueda] = useState('');
  const [peliculas, setPeliculas] = useState([]);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  };

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${Busqueda}&api_key=${API_KEY}`);
      const data = await response.json();

      // Verifica si data.results es un array antes de actualizar el estado
      if (Array.isArray(data.results)) {
        setPeliculas(data.results);
      } else {
        // Si no es un array, establece películas como un array vacío
        setPeliculas([]);
      }
    } catch (error) {
      console.error('Ha ocurrido un error:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscador de Películas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe una película"
          value={Busqueda}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
      <div className="movie-list">
        {peliculas && peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

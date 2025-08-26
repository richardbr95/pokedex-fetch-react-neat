import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const typeColors = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
  };

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((res) => res.json())
      .then((data) => {
        const fetches = data.results.map((poke) =>
          fetch(poke.url).then((res) => res.json())
        );
        Promise.all(fetches).then((results) => {
          const formatted = results.map((poke) => ({
            name: poke.name,
            image: poke.sprites.front_default,
            type: poke.types[0]?.type.name,
          }));
          setPokemons(formatted);
        });
      })
      .catch((err) => console.error("Erro ao carregar Pokedex:", err));
  }, []);

  return (
    <div className="App">
      <h1 className="header">Pokédex</h1>
      <h1 className="title">Pokédex one to twenty</h1>

      <ul className="pokemon-list">
        {pokemons.map((poke, index) => (
          <li
            className="pokemon-item"
            key={index}
            style={{
              backgroundColor: typeColors[poke.type] || "#ccc",
              "--hover-color": typeColors[poke.type] || "#ccc",
            }}
          >
            <img src={poke.image} alt={poke.name} />
            <p>{poke.name}</p>
            <span className="type-label">{poke.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

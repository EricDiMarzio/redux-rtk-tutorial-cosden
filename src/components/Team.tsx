import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../state/reducers/teamSlice";
import { RootState, AppDispatch } from "../state/store";

export default function Team() {
  const dispatch = useDispatch<AppDispatch>();
  const team = useSelector((state: RootState) => state.team.team);
  const status = useSelector((state: RootState) => state.team.status);
  const error = useSelector((state: RootState) => state.team.error);

  const [pokemonId, setPokemonId] = useState<number>(1); // State to track the Pokémon ID

  const handleFetchPokemon = () => {
    dispatch(fetchPokemon(pokemonId)); // Dispatch the thunk with the Pokémon ID
  };

  return (
    <div>
      <h2>Redux Pokémon Team Builder</h2>
      <div>
        <input
          type="number"
          value={pokemonId}
          onChange={(e) => setPokemonId(Number(e.target.value))}
          placeholder="Enter Pokémon ID"
          min="1"
        />
        <button onClick={handleFetchPokemon}>Fetch Pokémon</button>
      </div>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <div>
        <h3>Team:</h3>
        <ul>
          {team.map((pokemon) => (
            <li key={pokemon.id}>
                <img src={pokemon.sprite} alt={pokemon.name}/>
              {pokemon.name} (Type: {pokemon.type.join(", ")})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
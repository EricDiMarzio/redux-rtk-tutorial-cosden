import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type for for each pokemon
interface Pokemon {
    id: number;
    name: string;
    type: string[];
    sprite: string;
}
// Typing for the team. More complex since this is async.
interface TeamState {
    team: Pokemon[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: TeamState = {
    team: [],
    status: "idle",
    error: null,
}

// Async thunk to fetch Pokémon data
export const fetchPokemon = createAsyncThunk(
    'tean/fetchPokemon',
    async (id: number) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            type: data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
            sprite: data.sprites.front_default,

        }
    });

// Create the slice 🍉
const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        removePokemon: (state, action: PayloadAction<number>) => {
            state.team = state.team.filter((pokemon) => pokemon.id !== action.payload);
        },
        clearTeam: (state) => {
            state.team = [];
        }
    },
    // For handling Async thunks or responding to actions from another slicer
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemon.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPokemon.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Failed to fetch Pokémon";
            })
            .addCase(fetchPokemon.fulfilled, (state, action: PayloadAction<Pokemon>) => {
                state.status = "succeeded";
                state.team.push(action.payload); // Add the fetched Pokémon to the team
            });

    }
})

export const { removePokemon, clearTeam } = teamSlice.actions;
export default teamSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';


export const initializeAnecdotes = createAsyncThunk('anecdotes/init', async () => {
    const anecdotes = await anecdoteService.getAll();
    return anecdotes;
});


export const createAnecdote = createAsyncThunk('anecdotes/create', async (content) => {
    const newAnecdote = await anecdoteService.createNew(content);
    return newAnecdote;
});


export const vote = createAsyncThunk('anecdotes/vote', async (anecdote) => {
    const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 });
    return updatedAnecdote;
});

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeAnecdotes.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(createAnecdote.fulfilled, (state, action) => {
                return [...state, action.payload];
            })
            .addCase(vote.fulfilled, (state, action) => {
                const updatedAnecdote = action.payload;
                return state.map((anecdote) => (anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote));
            });
    },
});

export default anecdoteSlice.reducer;
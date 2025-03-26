import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    singers: [],
    status: 'idle',
    error: null
};

const API_URL = 'https://localhost:7250/api/singer';

// Async thunk to fetch singers from server
export const fetchSingers = createAsyncThunk('singers/fetchSingers', async () => {
    const response = await axios.get(`${API_URL}/getAll`);
    console.log(response.data);
    return response.data;
});

// Async thunk to delete a singer from server
export const deleteSinger = createAsyncThunk('singers/deleteSinger', async (singerId) => {
    await axios.delete(`${API_URL}/${singerId}`);
    return singerId;
});

// Async thunk to update a singer on the server
export const updateSinger = createAsyncThunk('singers/updateSinger', async (singer) => {
    const response = await axios.put(`${API_URL}/${singer.id}`, singer, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
});

// Async thunk to add a new singer to the server
export const addSinger = createAsyncThunk('singers/addSinger', async (newSinger) => {
    const response = await axios.post(API_URL, newSinger, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
});

const singersSlice = createSlice({
    name: 'singers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSingers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.singers = action.payload;
            })
            .addCase(fetchSingers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteSinger.fulfilled, (state, action) => {
                state.singers = state.singers.filter(singer => singer.id !== action.payload);
            })
            .addCase(updateSinger.fulfilled, (state, action) => {
                const index = state.singers.findIndex(singer => singer.id === action.payload.id);
                if (index !== -1) {
                    state.singers[index] = action.payload;
                }
            })
            .addCase(addSinger.fulfilled, (state, action) => {
                state.singers.push(action.payload);
            });
    }
});

export default singersSlice.reducer;

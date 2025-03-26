import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    albums: [],
    status: 'idle',
    error: null
};

const API_URL = 'https://localhost:7250/api/album';

// Async thunk to fetch albums from server
export const fetchAlbums = createAsyncThunk('albums/fetchAlbums', async () => {
    const response = await axios.get(`${API_URL}/getAll`);
    console.log(response.data);
    return response.data;
});

// Async thunk to delete an album from server
export const deleteAlbum = createAsyncThunk('albums/deleteAlbum', async (albumId) => {
    await axios.delete(`${API_URL}/${albumId}`);
    return albumId;
});

// Async thunk to update an album on the server
export const updateAlbum = createAsyncThunk('albums/updateAlbum', async (album) => {
    const response = await axios.put(`${API_URL}/${album.id}`, album, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
});

// Async thunk to add a new album to the server
export const addAlbum = createAsyncThunk('albums/addAlbum', async (newAlbum) => {
    const response = await axios.post(API_URL, newAlbum, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
});

const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.albums = action.payload;
            })
            .addCase(fetchAlbums.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteAlbum.fulfilled, (state, action) => {
                state.albums = state.albums.filter(album => album.id !== action.payload);
            })
            .addCase(updateAlbum.fulfilled, (state, action) => {
                const index = state.albums.findIndex(album => album.id === action.payload.id);
                if (index !== -1) {
                    state.albums[index] = action.payload;
                }
            })
            .addCase(addAlbum.fulfilled, (state, action) => {
                state.albums.push(action.payload);
            });
    }
});

export default albumsSlice.reducer;
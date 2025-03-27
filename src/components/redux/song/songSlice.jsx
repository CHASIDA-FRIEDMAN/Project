import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SongService from '../../../services/songService';
import axios from 'axios'

const initialState = {
    songs: [],
    currentSong: null,
    isPlaying: false,
    status: 'idle',
    error: null
};

const BASE_URL = 'https://localhost:7250/api/Song';


// שליפת כל השירים עם תמיכה בדפדוף
export const fetchSongs = createAsyncThunk('songs/fetchSongs', async ({ page, pageSize }) => {
    const response = await axios.get(`${BASE_URL}?page=${page}&pageSize=${pageSize}`);
    return response.data;
});

// שליפת שירים לפי זמר
export const fetchSongsBySinger = createAsyncThunk('songs/fetchBySinger', async (singerId) => {
    const response = await axios.get(`${BASE_URL}/getBySingerId/${singerId}`);
    return response.data;
});

// שליפת שירים לפי אלבום
export const fetchSongsByAlbum = createAsyncThunk('songs/fetchByAlbum', async (albumId) => {
    const response = await axios.get(`${BASE_URL}/getByAlbumId/${albumId}`);
    return response.data;
});

// export const fetchFilteredSongs = createAsyncThunk('songs/fetchFilteredSongs', async (filters) => {
//     console.log(filters);
//     const response = await axios.get(`${BASE_URL}/filtered`, { params: filters });
//     return response.data;
// });

export const fetchFilteredSongs = createAsyncThunk(
    'songs/fetchFilteredSongs',
    async (filters, { rejectWithValue }) => {
        try {
            const fixedFilters = {
                genre: filters.genre || "All",
                rhythm: filters.rhythm || "All",
                favorite: filters.favorite === "Favorite" ? "Favorite" : "All",
                recent: filters.recent === "Recent" ? "Recent" : "All",
            };

            console.log("Filters sent to server:", fixedFilters);

            const response = await axios.get(`${BASE_URL}/filtered`, { params: fixedFilters });

            // אם חזר מערך ריק, מחזירים הודעה מיוחדת
            if (response.data.length === 0) {
                return rejectWithValue("לא נמצאו שירים התואמים לקריטריונים");
            }

            return response.data;
        } catch (error) {
            return rejectWithValue("שגיאה בטעינת השירים");
        }
    }
);

export const deleteSong = createAsyncThunk('songs/deleteSong', async (songId) => {
    await SongService.deleteSong(songId);
    return songId;
});

export const updateSong = createAsyncThunk('songs/updateSong', async (song) => {
    return await SongService.updateSong(song.id, song);
});

export const addSong = createAsyncThunk('songs/addSong', async (file) => {
    return await SongService.addSong(file);
});

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        playSong: (state, action) => {
            state.currentSong = action.payload;
            state.isPlaying = true;
        },
        stopSong: (state) => {
            state.isPlaying = false;
        },
        setFilter: (state, action) => {
            state.filter = { ...state.filter, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.songs = action.payload;
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteSong.fulfilled, (state, action) => {
                state.songs = state.songs.filter(song => song.id !== action.payload);
            })
            .addCase(updateSong.fulfilled, (state, action) => {
                const index = state.songs.findIndex(song => song.id === action.payload.id);
                if (index !== -1) {
                    state.songs[index] = action.payload;
                }
            })
            .addCase(addSong.fulfilled, (state, action) => {
                state.songs.push(action.payload); // הוספת השיר החדש ישירות למערך
            })
            .addCase(fetchSongsBySinger.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSongsBySinger.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.songs = action.payload;
            })
            .addCase(fetchSongsBySinger.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchSongsByAlbum.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSongsByAlbum.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.songs = action.payload;
            })
            .addCase(fetchSongsByAlbum.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchFilteredSongs.fulfilled, (state, action) => {
                state.songs = action.payload;
            })
            .addCase(fetchFilteredSongs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || "שגיאה בטעינת השירים"; // הוספנו את הטיפול בשגיאה שנשלחת אם יש
            })

    }
});

export const { playSong, stopSong, setFilter } = songsSlice.actions;
export default songsSlice.reducer;

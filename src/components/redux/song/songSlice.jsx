import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SongService from '../../../services/songService';
import axios from 'axios'

const initialState = {
    songs: [],
    currentSong: null,
    isPlaying: false,
    filter: {
        genre: "All",
        rhythm: "All",
        favorite: "All",
        recent: "All",
    },
    status: 'idle',
    error: null
};


export const fetchSongs = createAsyncThunk('songs/fetchSongs', async ({ page, pageSize }) => {
    const response = await axios.get(`https://localhost:7250/api/Song?page=${page}&pageSize=${pageSize}`);
    return response.data;
});

// export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
//     return await SongService.getAllSongs();


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
            });
    }
});

export const { playSong, stopSong, setFilter } = songsSlice.actions;
export default songsSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import SongService from '../../../services/songService';

// const initialState = {
//     songs: [],
//     currentSong: null,
//     isPlaying: false,
//     filter: {
//         genre: "All",
//         rhythm: "All",
//         favorite: "All",
//         recent: "All",
//     },
//     status: 'idle',
//     error: null
// };

// export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
//     return await SongService.getAllSongs();
// });

// export const deleteSong = createAsyncThunk('songs/deleteSong', async (songId) => {
//     await SongService.deleteSong(songId);
//     return songId;
// });

// export const updateSong = createAsyncThunk('songs/updateSong', async (song) => {
//     return await SongService.updateSong(song.id, song);
// });

// export const addSong = createAsyncThunk('songs/addSong', async (file) => {
//     return await SongService.addSong(file);
// });

// const songsSlice = createSlice({
//     name: 'songs',
//     initialState,
//     reducers: {
//         playSong: (state, action) => {
//             state.currentSong = action.payload;
//             state.isPlaying = true;
//         },
//         stopSong: (state) => {
//             state.isPlaying = false;
//         },
//         setFilter: (state, action) => {
//             state.filter = { ...state.filter, ...action.payload };
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchSongs.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchSongs.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.songs = action.payload;
//             })
//             .addCase(fetchSongs.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(deleteSong.fulfilled, (state, action) => {
//                 state.songs = state.songs.filter(song => song.id !== action.payload);
//             })
//             .addCase(updateSong.fulfilled, (state, action) => {
//                 const index = state.songs.findIndex(song => song.id === action.payload.id);
//                 if (index !== -1) {
//                     state.songs[index] = action.payload;
//                 }
//             })
//             .addCase(addSong.fulfilled, (state, action) => {
//                 state.songs.push(action.payload); // הוספת השיר החדש ישירות למערך
//             });
//     }
// });

// export const { playSong, stopSong, setFilter } = songsSlice.actions;
// export default songsSlice.reducer;


// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';


// // const initialState = {
// //     songs: [],
// //     currentSong: null,
// //     isPlaying: false,
// //     filter: {
// //         genre: "All",
// //         rhythm: "All",
// //         favorite: "All",
// //         recent: "All",
// //     },
// //     status: 'idle',
// //     error: null
// // };
// // const API_URL = 'https://localhost:7250/api/song';

// // export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
// //     const response = await axios.get(`${API_URL}/getAll`);
// //     return response.data;
// // });

// // export const deleteSong = createAsyncThunk('songs/deleteSong', async (songId) => {
// //     await axios.delete(`${API_URL}/${songId}`);
// //     return songId;
// // });

// // export const updateSong = createAsyncThunk('songs/updateSong', async (song) => {
// //     const response = await axios.put(`${API_URL}/${song.id}`, song);
// //     return response.data;
// // });

// // export const addSong = createAsyncThunk('songs/addSong', async (formData) => {
// //     const response = await axios.post(`${API_URL}/upload`, formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //     });
// //     return response.data;
// // });

// // const songsSlice = createSlice({
// //     name: 'songs',
// //     initialState,
// //     reducers: {
// //         playSong: (state, action) => {
// //             state.currentSong = action.payload;
// //             state.isPlaying = true;
// //         },
// //         stopSong: (state) => {
// //             state.isPlaying = false;
// //         },
// //         setFilter: (state, action) => {
// //             state.filter = { ...state.filter, ...action.payload };
// //         }
// //     },
// //     extraReducers: (builder) => {
// //         builder
// //             .addCase(fetchSongs.pending, (state) => {
// //                 state.status = 'loading';
// //             })
// //             .addCase(fetchSongs.fulfilled, (state, action) => {
// //                 state.status = 'succeeded';
// //                 state.songs = action.payload;
// //             })
// //             .addCase(fetchSongs.rejected, (state, action) => {
// //                 state.status = 'failed';
// //                 state.error = action.error.message;
// //             })
// //             .addCase(deleteSong.fulfilled, (state, action) => {
// //                 state.songs = state.songs.filter(song => song.id !== action.payload);
// //             })
// //             .addCase(updateSong.fulfilled, (state, action) => {
// //                 const index = state.songs.findIndex(song => song.id === action.payload.id);
// //                 if (index !== -1) {
// //                     state.songs[index] = action.payload;
// //                 }
// //             })
// //             .addCase(addSong.fulfilled, (state, action) => {
// //                 state.songs.push(action.payload); // הוספת השיר החדש ישירות למערך
// //             });

// //     }
// // });

// // export const { playSong, stopSong, setFilter } = songsSlice.actions;
// // export default songsSlice.reducer;

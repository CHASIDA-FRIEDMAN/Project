import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    categories: [],
    status: 'idle',
    error: null
};

const API_URL = 'https://localhost:7250/api/category';

// Async thunk to fetch categories from server
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get(`${API_URL}/getAll`);
    console.log(response.data);

    return response.data;
});

// Async thunk to delete a category from server
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
    await axios.delete(`${API_URL}/${categoryId}`);
    return categoryId;
});

// Async thunk to update a category on the server
export const updateCategory = createAsyncThunk('categories/updateCategory', async (category) => {
    const response = await axios.put(`${API_URL}/${category.id}`, category, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
});

// Async thunk to add a new category to the server
export const addCategory = createAsyncThunk('categories/addCategory', async (newCategory) => {
    const response = await axios.post(API_URL, newCategory, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(category => category.id !== action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            });
    }
});

export default categoriesSlice.reducer;
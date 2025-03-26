import { configureStore } from "@reduxjs/toolkit";
import songsSlice from '../redux/song/songSlice'
import singersSlice from '../redux/singer/SingerSlice'
import albumsSlice from '../redux/album/albumSlice'
import categoriesSlice from '../redux/category/categorySlice'
import filterReducer from '../redux/filter/filterSlice'
import { Category } from "@mui/icons-material";



// ייבוא הפונקציה configureStore מ-@reduxjs/toolkit
export const store = configureStore({
    // הגדרת ה-reducer הראשי של ה-store
    reducer: {
        // הוספת ה-slice של השירים ל-reducer הראשי
        song: songsSlice,
        // הוספת ה-slice של הזמרים ל-reducer הראשי
        singer: singersSlice,
        // הוספת ה-slice של האלבומים ל-reducer הראשי
        album: albumsSlice,
        // הוספת ה-slice של הקטגוריות ל-reducer הראשי (שגיאת כתיב בשם ה-slice)
        category: categoriesSlice,
        
        filters: filterReducer,
    }
})
// import axios from 'axios'; // ייבוא axios לביצוע בקשות HTTP

// const API_BASE_URL = 'https://your-api-url.com/api'; // עדכן את ה-URL לפי הצורך

// const api = axios.create({
//   baseURL: API_BASE_URL, // הגדרת כתובת הבסיס של ה-API
//   headers: {
//     'Content-Type': 'application/json', // הגדרת סוג התוכן כברירת מחדל
//   },
// });

// export const getSongs = async () => { // פונקציה לשליפת כל השירים
//   const response = await api.get('/songs'); // ביצוע בקשת GET לכתובת /songs
//   return response.data; // החזרת הנתונים מהתגובה
// };

// export const addSong = async (songData) => { // פונקציה להוספת שיר חדש
//   const formData = new FormData(); // יצירת אובייקט FormData
//   for (let key in songData) {
//     formData.append(key, songData[key]); // הוספת כל שדה מהשיר ל-FormData
//   }

//   const response = await api.post('/songs', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }, // הגדרת סוג התוכן כ-multipart/form-data
//   });
//   return response.data; // החזרת הנתונים מהתגובה
// };

// export const updateSong = async (id, songData) => { // פונקציה לעדכון שיר קיים
//   const formData = new FormData(); // יצירת אובייקט FormData
//   for (let key in songData) {
//     formData.append(key, songData[key]); // הוספת כל שדה מהשיר ל-FormData
//   }

//   const response = await api.put(`/songs/${id}`, formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }, // הגדרת סוג התוכן כ-multipart/form-data
//   });
//   return response.data; // החזרת הנתונים מהתגובה
// };

// export const deleteSong = async (id) => { // פונקציה למחיקת שיר
//   await api.delete(`/songs/${id}`); // ביצוע בקשת DELETE לכתובת /songs/{id}
// };

// export const getFiltersData = async () => { // פונקציה לשליפת נתוני המסננים
//   const response = await api.get('/songs/filters'); // ביצוע בקשת GET לכתובת /songs/filters
//   return response.data; // החזרת הנתונים מהתגובה
// };
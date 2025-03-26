import axios from 'axios'; // ייבוא axios לביצוע בקשות HTTP

const API_URL = 'https://localhost:7250/api/song'; // כתובת הבסיס של ה-API

const getAllSongs = async () => { // פונקציה לשליפת כל השירים
  const response = await axios.get(`${API_URL}/getAll`); // ביצוע בקשת GET לכתובת /getAll
  return response.data; // החזרת הנתונים מהתגובה
};

const addSong = async (file) => { // פונקציה להוספת שיר חדש
  const formData = new FormData(); // יצירת אובייקט FormData
  formData.append('SongFile', file); // הוספת הקובץ ל-FormData


  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, // הגדרת סוג התוכן כ-multipart/form-data
  });
  return response.data; // החזרת הנתונים מהתגובה
};

const updateSong = async (id, songData) => { // פונקציה לעדכון שיר קיים
  const formData = new FormData(); // יצירת אובייקט FormData
  formData.append('SongFile', songData.file); // הוספת הקובץ ל-FormData
  // הוספת שדות נוספים אם ישנם
  if (songData.name) formData.append('name', songData.name);
  if (songData.singer) formData.append('singer', songData.singer);
  if (songData.album) formData.append('album', songData.album);
  if (songData.genre) formData.append('genre', songData.genre);
  if (songData.favorite) formData.append('favorite', songData.favorite);

  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, // הגדרת סוג התוכן כ-multipart/form-data
  });
  return response.data; // החזרת הנתונים מהתגובה
};

const deleteSong = async (id) => { // פונקציה למחיקת שיר
  const response = await axios.delete(`${API_URL}/${id}`); // ביצוע בקשת DELETE לכתובת /{id}
  return response.data; // החזרת הנתונים מהתגובה
};

const SongService = { // יצירת אובייקט SongService המכיל את כל הפונקציות
  getAllSongs,
  addSong,
  updateSong,
  deleteSong,
};

export default SongService; // ייצוא ברירת המחדל של SongService
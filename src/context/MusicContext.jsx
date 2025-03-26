// import React, { createContext, useState, useEffect } from "react"; // ייבוא React וההוקים createContext, useState, useEffect
// import SongService from "../services/songService"; // ייבוא השירות SongService

// export const MusicContext = createContext(); // יצירת הקונטקסט MusicContext

// export const MusicProvider = ({ children }) => { // הגדרת הקומפוננטה MusicProvider עם הפרופ children
//   const [songs, setSongs] = useState([]); // משתנה מצב לאחסון רשימת השירים
//   const [currentSong, setCurrentSong] = useState(null); // משתנה מצב לאחסון השיר הנוכחי
//   const [isPlaying, setIsPlaying] = useState(false); // משתנה מצב לציון אם השיר מתנגן
//   const [filter, setFilter] = useState({ // משתנה מצב לאחסון מסננים
//     genre: "All",
//     rhythm: "All",
//     favorite: "All",
//     recent: "All",
//   });

//   useEffect(() => { // שימוש ב-useEffect כדי לשלוף את רשימת השירים מהשרת בעת טעינת הקומפוננטה
//     const fetchSongs = async () => { // פונקציה אסינכרונית לשליפת השירים
//       try {
//         const data = await SongService.getAllSongs(); // קריאה לפונקציה getAllSongs של SongService ושליפת הנתונים
//         setSongs(data); // עדכון מצב השירים עם הנתונים שהתקבלו
//       } catch (error) {
//         console.error("Error fetching songs:", error); // הדפסת שגיאה לקונסול אם יש בעיה בשליפת הנתונים
//       }
//     };
//     fetchSongs(); // קריאה לפונקציה fetchSongs
//   }, []); // מערך תלות ריק כדי שהאפקט ירוץ רק פעם אחת בעת טעינת הקומפוננטה

//   const addSong = (newSong) => { // פונקציה להוספת שיר חדש
//     setSongs([...songs, newSong]); // הוספת השיר החדש למערך השירים
//   };

//   const updateSong = (updatedSong) => { // פונקציה לעדכון שיר קיים
//     setSongs(songs.map((song) => (song.id === updatedSong.id ? updatedSong : song))); // עדכון השיר במערך השירים
//   };

//   const deleteSong = (songId) => { // פונקציה למחיקת שיר
//     setSongs(songs.filter((song) => song.id !== songId)); // הסרת השיר מהמערך לפי מזהה השיר
//   };

//   const playSong = (song) => { // פונקציה להפעלת שיר
//     setCurrentSong(song); // הגדרת השיר הנוכחי
//     setIsPlaying(true); // הגדרת מצב הניגון לאמת
//   };

//   const stopSong = () => { // פונקציה לעצירת שיר
//     setIsPlaying(false); // הגדרת מצב הניגון לשקר
//   };

//   return (
//     <MusicContext.Provider value={{ // ספק את הערכים של הקונטקסט
//       songs,
//       currentSong,
//       isPlaying,
//       filter,
//       setFilter,
//       addSong,
//       updateSong,
//       deleteSong,
//       playSong,
//       stopSong,
//     }}>
//       {children} {/* הצגת הילדים של הקומפוננטה */}
//     </MusicContext.Provider>
//   );
// };
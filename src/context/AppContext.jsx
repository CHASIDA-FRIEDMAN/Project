// // ניהול רשימת השירים ב-React כדי למנוע שליפות חוזרות מהשרת
// import React, { createContext, useState, useEffect } from 'react'; // ייבוא React וההוקים createContext, useState, useEffect
// import { fetchSongs } from '../services/api'; // ייבוא הפונקציה fetchSongs מהשירותים

// export const AppContext = createContext(); // יצירת הקונטקסט AppContext

// export const AppProvider = ({ children }) => { // הגדרת הקומפוננטה AppProvider עם הפרופ children
//   const [songs, setSongs] = useState([]); // משתנה מצב לאחסון רשימת השירים
//   const [loading, setLoading] = useState(false); // משתנה מצב לציון מצב הטעינה
//   const [filters, setFilters] = useState({ // משתנה מצב לאחסון מסננים
//     listenBy: 'All',
//     genre: 'All',
//     rhythm: 'All',
//     favorite: 'All',
//     dateAdded: 'All'
//   });

//   useEffect(() => { // שימוש ב-useEffect כדי לשלוף את רשימת השירים מהשרת בעת טעינת הקומפוננטה
//     setLoading(true); // הגדרת מצב הטעינה לאמת
//     fetchSongs().then(({ data }) => { // קריאה לפונקציה fetchSongs ושליפת הנתונים
//       setSongs(data); // עדכון מצב השירים עם הנתונים שהתקבלו
//       setLoading(false); // הגדרת מצב הטעינה לשקר
//     });
//   }, []); // מערך תלות ריק כדי שהאפקט ירוץ רק פעם אחת בעת טעינת הקומפוננטה

//   return (
//     <AppContext.Provider value={{ songs, setSongs, loading, filters, setFilters }}> {/* ספק את הערכים של הקונטקסט */}
//       {children} {/* הצגת הילדים של הקומפוננטה */}
//     </AppContext.Provider>
//   );
// };
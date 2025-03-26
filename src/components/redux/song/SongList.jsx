// import React from "react"; // ייבוא React
// import { Grid, Typography } from "@mui/material"; // ייבוא רכיבים מ-Material-UI
// import SongCard from "./SongCard"; // ייבוא הקומפוננטה SongCard
// import SongPlayer from "../../SongPlayer";

// const SongList = ({ songs, onPlay, onFavoriteToggle }) => { // הגדרת הקומפוננטה SongList עם הפרופס songs, onPlay, ו-onFavoriteToggle
//   // בדוק אם `songs` אינו מערך
//   if (!Array.isArray(songs)) { // בדיקה אם songs הוא מערך
//     console.error("Songs data is not an array:", songs); // הדפסת שגיאה לקונסול אם songs אינו מערך
//     return <Typography variant="h6" align="center">Error: Songs data is invalid.</Typography>; // הצגת הודעת שגיאה אם songs אינו מערך
//   }

//   if (songs.length === 0) { // בדיקה אם המערך songs ריק
//     return <Typography variant="h6" align="center">No songs found.</Typography>; // הצגת הודעה אם לא נמצאו שירים
//   }

//   return (
//     <Grid container spacing={3}> {/* יצירת גריד עם רווחים בין הפריטים */}
//       {songs.map((song) => ( // מעבר על כל השירים במערך songs
//         <Grid item xs={12} sm={6} md={4} lg={3} key={song.Id}> {/* יצירת פריט גריד עבור כל שיר */}
//                  <SongPlayer song={song}/> הצגת נגן השירים
//           <SongCard
//             song={song} // העברת השיר הנוכחי כפרופס לקומפוננטה SongCard
//             onPlay={() => onPlay(song)} // העברת פונקציית ההפעלה כפרופס לקומפוננטה SongCard
//             onFavoriteToggle={() => onFavoriteToggle(song)} // העברת פונקציית סימון כמועדף כפרופס לקומפוננטה SongCard
//           />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default SongList; // ייצוא הקומפוננטה SongList

// // import React from 'react';
// // import { Grid, Typography } from '@mui/material';
// // import SongCard from './SongCard';

// // const SongList = ({ songs, onPlay, onFavoriteToggle }) => {
// //   if (!songs || songs.length === 0) {
// //     return <Typography variant="h6" align="center">No songs found.</Typography>;
// //   }

// //   return (
// //     <Grid container spacing={3}>
// //       {songs.map((song) => (
// //         <Grid item xs={12} sm={6} md={4} lg={3} key={song.Id}>
// //           <SongCard
// //             song={song}
// //             onPlay={() => onPlay(song)}
// //             onFavoriteToggle={() => onFavoriteToggle(song)}
// //           />
// //         </Grid>
// //       ))}
// //     </Grid>
// //   );
// // };

// // export default SongList;



import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, CardActions, Box, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { updateSong } from './songSlice';
import { useDispatch, useSelector } from 'react-redux';


// const SongCard = ({ song, onPlay }) => {
//   const onFavoriteToggle = (e) => {
//     // const songs = useSelector((state) => state.song.songs);
//     // const dispatch = useDispatch();
//     // debugger
//     //   dispatchupdateSong(song.id, { favorite: !song.favorite }) // קריאה ל-API עם עימוד

//   }
const SongCard = ({ song, onPlay }) => {
  const dispatch = useDispatch(); // שימוש ב-dispatch של Redux
  const onFavoriteToggle = () => {
    const updatedSong = { ...song, favorite: !song.favorite }; // הפיכת הערך של favorite
    dispatch(updateSong(updatedSong)); // שליחת העדכון ל-Redux
  };
    // // פונקציה לשינוי ה-`favorite` של השיר
    // const onFavoriteToggle = () => {
    //   const updatedSong = { ...song, favorite: !song.favorite }; // הפיכת הערך של favorite
    //   dispatch(updateSong(updatedSong)); // שליחת העדכון ל-Redux
    // };
  // פונקציה שמבצעת את עדכון השיר למועדף
  // const onFavoriteToggle = () => {
  //   const newFavorite = !song.favorite; // כאן אנחנו הופכים את הערך
  //   dispatch(updateSong({
  //     ...song,
  //     favorite: newFavorite,
  //   }));
  // };

  // const onFavoriteToggle = () => {
  //   // עדכון ה-`favorite` של השיר
  //   dispatch(updateSong({ 
  //     ...song, 
  //     favorite: !song.favorite 
  //   }));
  // };
  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="300"
        image={song.image ? `data:image/jpg;base64,${song.image}` : '/default-image.jpg'}
        alt={song.name}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Tooltip title={song.name} arrow>
          <Box sx={{
            height: 50,  // גובה קבוע לכותרת
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2, // מגביל לשתי שורות בלבד
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }}>
            <Typography variant="h6">{song.name}</Typography>
          </Box>
        </Tooltip>
        <Typography variant="body2" color="textSecondary">
          {song.singer} - {song.album}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Genre: {song.genre}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={onPlay} color="primary">
          <PlayArrowIcon />
        </IconButton>
        <IconButton onClick={onFavoriteToggle} color="error">
          {song.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SongCard;


// import React, { useEffect, useState } from 'react'; // ייבוא React
// import { Card, CardMedia, CardContent, Typography, IconButton, CardActions } from '@mui/material'; // ייבוא רכיבים מ-Material-UI
// import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // ייבוא אייקון Play
// import FavoriteIcon from '@mui/icons-material/Favorite'; // ייבוא אייקון Favorite מלא
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // ייבוא אייקון Favorite ריק

// const SongCard = ({ song, onPlay, onFavoriteToggle }) => { // הגדרת הקומפוננטה SongCard עם הפרופס song, onPlay, ו-onFavoriteToggle
//   const [imageSrc, setImageSrc] = useState(""); // משתנה סטייט עבור כתובת התמונה

//   // useEffect(() => {
//   //   if (song.image) {
//   //     // המרת byte[] ל-Base64
//   //     const base64String = arrayBufferToBase64(song.image);
//   //     setImageSrc(`data:image/jpeg;base64,${base64String}`);
//   //   }
//   // }, [song.image]);

//   // // פונקציה להמרת מערך Byte ל-Base64
//   // const arrayBufferToBase64 = (buffer) => {
//   //   let binary = '';
//   //   const bytes = new Uint8Array(buffer);
//   //   bytes.forEach(b => (binary += String.fromCharCode(b)));
//   //   return btoa(binary);
//   // };

//   return (
//     <Card sx={{ maxWidth: 345 }}> {/* כרטיס השיר עם רוחב מקסימלי של 345 */}
//       <CardMedia
//         component="img"
//         height="300"
//         //image={imageSrc} // תמונת השיר או תמונת ברירת מחדל אם אין תמונה
//         image={`data:image/jpg;base64,${song.image}`} // תמונת השיר או תמונת ברירת מחדל אם אין תמונה
//         alt={song.name} // טקסט חלופי לתמונה
//       />
//       {/* <img height="220"
//         src={`data:image/jpg;base64,${song.image}`}  // זה אם ה-Base64 הוא תמונה ב-JPEG
//         alt={song.name}
//         loading="lazy"
//       /> */}
//       <CardContent>
//         <Typography variant="h6">{song.name}</Typography> {/* שם השיר */}
//         <Typography variant="body2" color="textSecondary">
//           {song.singer} - {song.album} {/* שם הזמר והאלבום */}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           Genre: {song.genre} {/* ז'אנר השיר */}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <IconButton onClick={onPlay} color="primary"> {/* כפתור הפעלה */}
//           <PlayArrowIcon /> {/* אייקון Play */}
//         </IconButton>
//         <IconButton onClick={onFavoriteToggle} color="error"> {/* כפתור סימון כמועדף */}
//           {song.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />} {/* אייקון מועדף מלא אם השיר מועדף, אחרת אייקון מועדף ריק */}
//         </IconButton>
//       </CardActions>
//     </Card>
//   );
// };

// export default SongCard; // ייצוא הקומפוננטה SongCard
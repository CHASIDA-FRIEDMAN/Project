import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs, fetchFilteredSongs } from "../components/redux/song/songSlice";
import { Grid, Typography, CircularProgress, Button, Alert } from "@mui/material"; // הוספת רכיב Alert להודעה
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SongCard from "../components/redux/song/SongCard";
import { Box } from '@mui/material';
import SongPlayer from "../components/redux/song/SongPlayer";
import { playSong } from '../components/redux/song/songSlice';
import { stopSong } from '../components/redux/song/songSlice';


const HomePage = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.song.songs);
  const error = useSelector((state) => state.song.error); // קבלת השגיאה מ-Redux
  const currentSong = useSelector((state) => state.song.currentSong);

  const [page, setPage] = useState(1);
  const pageSize = 18;

  useEffect(() => {
    dispatch(fetchSongs({ page, pageSize })); // שליפת שירים בעמוד הנוכחי
  }, [dispatch, page]);

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 2000);
  };

  
  const handlePlaySong = (song) => {
    dispatch(playSong(song));
  }


  return (
    <div>
      <Typography variant="h4" align="center" color="white">All Songs</Typography>

{/* הצגת הודעת שגיאה אם לא נמצאו שירים */}
    {error && (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',height:'22vh'}}>
    <Alert severity="info" sx={{ marginTop: 2 }}>
      {error}
    </Alert>
   </Box>
  )}


      {songs.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "white" }}>
          <CircularProgress size={100} color="inherit" />
        </div>
      ) : (
        <>
          <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
            {songs.map((song) => (
              <Grid item xs={12} sm={6} md={4} key={song.id}>
                <SongCard song={song} onPlay={handlePlaySong} />

              </Grid>
            ))}
          </Grid>

          {/* ניווט בין עמודים */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button
              onClick={() => {
                setPage(page - 1);
                scrollToTop();
              }}
              disabled={page === 1}
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "rgb(20, 72, 79)",
                minWidth: "50px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            >
              <ArrowBack />
            </Button>
            <Typography variant="h6" color="white" marginLeft={2} marginRight={2}>Page {page}</Typography>
            <Button
              onClick={() => {
                setPage(page + 1);
                scrollToTop();
              }}
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "rgb(20, 72, 79)",
                minWidth: "50px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            >
              <ArrowForward />
            </Button>
          </div>
        </>
      )}
 {/* הצגת נגן השיר */}
 {currentSong && <SongPlayer song={currentSong} onClose={() => dispatch(stopSong())} />}

    </div>
  );
};

export default HomePage;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSongs } from "../components/redux/song/songSlice";
// import { Grid, Typography, CircularProgress } from "@mui/material";
// import SongCard from "../components/redux/song/SongCard";

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const songs = useSelector((state) => state.song.songs);
//   const status = useSelector((state) => state.song.status);
  
//   const [page, setPage] = useState(1); // התחלנו עם עמוד 1
//   const pageSize = 18;

//   // קריאה לשרת כאשר הדף משתנה
//   useEffect(() => {
//     // קריאה תמידית, אין צורך בבדיקת סטטוס כאן
//     // if (status !== 'loading') {
//       dispatch(fetchSongs({ page, pageSize }));
//     // }
//   }, [dispatch, page, status]); // מעקב אחרי שינוי ב-dipatch, page

//   // פונקציה לניהול גלילה
//   const handleScroll = (event) => {
//     const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
//     if (bottom && status !== 'loading') {
//       setPage((prevPage) => prevPage + 1); // העדכון הזה יתבצע רק אם הגענו לסוף וסטטוס לא loading
//     }
//   };

//   // מעדכנים את הסטטוס אם יש יותר שירים
//   const hasMoreSongs = songs.length > 0;

//   return (
//     <div onScroll={handleScroll} style={{ overflowY: 'auto', height: '80vh' }}>
//       <Typography variant="h4" align="center" color="white">All Songs</Typography>

//       {/* אם הסטטוס הוא loading וצריך להמתין */}
//       {status === 'loading' && songs.length === 0 ? (
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "white" }}>
//           <CircularProgress size={100} color="inherit" />
//         </div>
//       ) : (
//         <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
//           {songs.map((song) => (
//             <Grid item xs={12} sm={6} md={4} key={song.id}>
//               <SongCard song={song} />
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* הצגת כפתור טעינה נוסף במקרה שהגעת לסוף */}
//       {status === 'loading' && songs.length > 0 && (
//         <div style={{ textAlign: 'center', padding: '20px' }}>
//           <CircularProgress color="inherit" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../components/redux/song/songSlice";
import { fetchAlbums } from "../components/redux/album/albumSlice";
import { fetchSingers } from "../components/redux/singer/SingerSlice";
import { fetchCategories } from "../components/redux/category/categorySlice";
import { Grid, Typography, CircularProgress, Button } from "@mui/material";
import SongCard from "../components/redux/song/SongCard";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { alignProperty } from "@mui/material/styles/cssUtils";

const HomePage = () => {
  console.log("Rendering HomePage");

  const songs = useSelector((state) => state.song.songs);

  useEffect(() => {
    console.log("Songs updated:", songs); // לוודא שהרשימה מתעדכנת
  }, [songs]);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const pageSize = 18; // מספר השירים בכל עמוד

  useEffect(() => {
    dispatch(fetchSongs({ page, pageSize })); // קריאה ל-API עם עימוד
  }, [dispatch, page]);


  const handlePlay = (song) => {
    console.log("Playing song:", song.name);
    // כאן תוכל להוסיף לוגיקה להפעלת השיר, כמו עדכון הסטייט של נגן המוזיקה
  };



  // פונקציה להחזרת הדף לראש לאחר עיכוב של שניה
  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 2000); // מחכים שניה לפני הגלילה
  };

  return (
    <div>
      <Typography variant="h4" align="center" color="white">All Songs</Typography>

      {songs.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "white" }}>
          <CircularProgress size={100} color="inherit" /> {/* גודל גדול יותר של הטעינה */}
        </div>
      ) : (
        <>
          <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
              {songs.map((song) => (
                <Grid item xs={12} sm={6} md={4} key={song.id}>
                  <SongCard song={song} onPlay={() => handlePlay(song)} />
                </Grid>
              ))}
            </Grid> 
          {/* ניווט בין עמודים */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Button
              onClick={() => {
                setPage(page - 1);
                scrollToTop(); // גלילה לראש העמוד לאחר שניה
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
                "&:hover": { backgroundColor: "#f0f0f0" }, // צבע רקע מעט שונה בלחיצה
              }}
            >
              <ArrowBack />
            </Button>
            <Typography variant="h6" color="white" marginLeft={2} marginRight={2}>Page {page}</Typography>
            <Button
              margin={1}
              onClick={() => {
                setPage(page + 1);
                scrollToTop(); // גלילה לראש העמוד לאחר שניה
              }}
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "rgb(20, 72, 79)",
                minWidth: "50px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                "&:hover": { backgroundColor: "#f0f0f0" }, // צבע רקע מעט שונה בלחיצה
              }}
            >
              <ArrowForward />
            </Button>
          </div>
        </>
      )}
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

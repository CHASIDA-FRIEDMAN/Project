import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../components/redux/song/songSlice";
import { fetchAlbums } from "../components/redux/album/albumSlice";
import { fetchSingers } from "../components/redux/singer/SingerSlice";
import { fetchCategories } from "../components/redux/category/categorySlice";
import { Grid, Typography, CircularProgress, Button } from "@mui/material";
import SongCard from "../components/redux/song/SongCard";
import { ArrowBack, ArrowForward } from "@mui/icons-material";



const HomePage = () => {
  console.log("Rendering HomePage");

  const songs = useSelector((state) => state.song.songs);
  // const albums = useSelector((state) => state.album.albums);
  // const singers = useSelector((state) => state.singer.singers);
  // const categories = useSelector((state) => state.category.categories);
  useEffect(() => {
    console.log("Songs updated:", songs); // לוודא שהרשימה מתעדכנת
  }, [songs]);
  


  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const pageSize = 9; // מספר השירים בכל עמוד

  useEffect(() => {
    dispatch(fetchSongs({ page, pageSize })); // קריאה ל-API עם עימוד
  }, [dispatch, page]);

  // useEffect(() => {
  //   dispatch(fetchAlbums())
  // }, [])
  // useEffect(() => {
  //   dispatch(fetchSingers())
  // }, [])
  // useEffect(() => {
  //   dispatch(fetchCategories())
  // }, [])

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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" ,color:"white"}}>
          <CircularProgress size={100} color="inherit" /> {/* גודל גדול יותר של הטעינה */}
        </div>
      ) : (
        <>
          <Grid container spacing={3}>
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
// import { Grid, Typography, CircularProgress, Button } from "@mui/material";
// import SongCard from "../components/redux/song/SongCard";

// const HomePage = () => {
//   console.log("Rendering HomePage");

//   const songs = useSelector((state) => state.song.songs);
//   const dispatch = useDispatch();

//   const [page, setPage] = useState(1);
//   const pageSize = 9; // מספר השירים בכל עמוד

//   useEffect(() => {
//     dispatch(fetchSongs({ page, pageSize })); // קריאה ל-API עם עימוד
//   }, [dispatch, page]);

//   // פונקציה להחזרת הדף לראש לאחר עיכוב של שניה
//   const scrollToTop = () => {
//     setTimeout(() => {
//       window.scrollTo(0, 0);
//     }, 1500); // מחכים שניה לפני הגלילה
//   };

//   return (
//     <div>
//       <Typography variant="h4" align="center">All Songs</Typography>

//       {songs.length === 0 ? (
//         <CircularProgress /> // טוען בזמן שהשירים נטענים
//       ) : (
//         <>
//           <Grid container spacing={3}>
//             {songs.map((song) => (
//               <Grid item xs={12} sm={6} md={4} key={song.id}>
//                 <SongCard song={song} />
//               </Grid>
//             ))}
//           </Grid>

//           {/* ניווט בין עמודים */}
//           <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
//             <Button
//               onClick={() => {
//                 setPage(page - 1);
//                 scrollToTop(); // גלילה לראש העמוד לאחר שניה
//               }}
//               disabled={page === 1}
//               variant="contained"
//               color="primary"
//               style={{ marginRight: "10px" }}
//             >
//               Previous
//             </Button>
//             <Typography variant="h6">Page {page}</Typography>
//             <Button
//               onClick={() => {
//                 setPage(page + 1);
//                 scrollToTop(); // גלילה לראש העמוד לאחר שניה
//               }}
//               variant="contained"
//               color="primary"
//               style={{ marginLeft: "10px" }}
//             >
//               Next
//             </Button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;


// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSongs } from "../components/redux/song/songSlice";
// import { Grid, Typography, CircularProgress, Button } from "@mui/material";
// import SongCard from "../components/redux/song/SongCard";

// const HomePage = () => {
//   console.log("Rendering HomePage");


//   const songs= useSelector((state) => state.song.songs);
//   const dispatch = useDispatch();

//   const [page, setPage] = useState(1);
//   const pageSize = 9; // מספר השירים בכל עמוד

//   useEffect(() => {
//     dispatch(fetchSongs({ page, pageSize })); // קריאה ל-API עם עימוד
//   }, [dispatch, page]);




//   // useEffect(()=>{
//   //   dispatch(fetchSongs())
//   // },[])



//   // useEffect(() => {
//   //   console.log("Running useEffect", status);

//   //   if (status === "idle") { // נמנע קריאה חוזרת אם הנתונים כבר נטענו
//   //     dispatch(fetchSongs());
//   //   }
//   // }, [dispatch, status]);

//   // useEffect(() => {
//   //   if (status === "idle") {
//   //     dispatch(fetchSongs());
//   //   }
//   // }, [dispatch, status]);



//   return (
//     // <div>
//     //   <Typography variant="h4" align="center">All Songs</Typography>
//     //   {status === "loading" ? (
//     //     <CircularProgress /> // מציג טוען בזמן שהשירים נטענים
//     //   ) : songs.length === 0 ? (
//     //     <p>No songs available</p>
//     //   ) : (
//     //     <Grid container spacing={3}>
//     //       {songs.map(song => (
//     //         <Grid item xs={12} sm={6} md={4} key={song.id}>
//     //           <SongCard song={song} />
//     //         </Grid>
//     //       ))}
//     //     </Grid>
//     //   )}
//     // </div>

//      <div>
//      <Typography variant="h4" align="center">All Songs</Typography>

//      {status === "loading" ? (
//        <CircularProgress /> // טוען בזמן שהשירים נטענים
//      ) : songs.length === 0 ? (
//        <p>No songs available</p>
//      ) : (
//        <>
//          <Grid container spacing={3} >
//            {songs.map(song => (
//              <Grid item xs={12} sm={6} md={4} key={song.id}>
//                <SongCard song={song} />
//              </Grid>
//            ))}
//          </Grid>

//          {/* ניווט בין עמודים */}
//          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
//            <Button
//              onClick={() => setPage(page - 1)}
//              disabled={page === 1}
//              variant="contained"
//              color="primary"
//              style={{ marginRight: "10px" }}
//            >
//              Previous
//            </Button>
//            <Typography variant="h6">Page {page}</Typography>
//            <Button
//              onClick={() => setPage(page + 1)}
//              variant="contained"
//              color="primary"
//              style={{ marginLeft: "10px" }}
//            >
//              Next
//            </Button>
//          </div>
//        </>
//      )}
//    </div>
//   );
// };

// export default HomePage;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSongs } from "../components/redux/song/songSlice";
// import { Grid, Typography } from "@mui/material"; // ייבוא רכיבים מ-Material-UI
// import SongCard from "../components/redux/song/SongCard"; // ייבוא הקומפוננטה SongCard




// const HomePage = () => {
//   const dispatch = useDispatch();
//   const songs = useSelector((state) => state.song?.songs || []);

//   useEffect(() => {
//     dispatch(fetchSongs()); // טוען את השירים בעת טעינת העמוד
//   }, [dispatch]);

//   return (
//     <div>
//       <Typography variant="h4" align="center">All Songs</Typography>
//       <Grid container spacing={3}>
//         {songs.length === 0 ? <p>No songs available</p> : songs.map(song => (
//           <Grid item xs={12} sm={6} md={4} key={song.id}>
//             <SongCard song={song} />
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default HomePage;

// import React, { useContext } from "react"; // ייבוא React וההוק useContext
// import { Grid, Typography } from "@mui/material"; // ייבוא רכיבים מ-Material-UI
// import SongCard from "../components/redux/song/SongCard"; // ייבוא הקומפוננטה SongCard
// //import { MusicContext } from "../context/MusicContext"; // ייבוא הקונטקסט MusicContext
// import { useSelector } from "react-redux"; // ייבוא useSelector מ-react-redux

// const HomePage = () => { // הגדרת הקומפוננטה HomePage
//   // const { songs, playSong, deleteSong } = useContext(MusicContext); // שימוש בקונטקסט MusicContext לקבלת השירים והפונקציות playSong ו-deleteSong
//   //const songs = useSelector((state) => state.song.songs);
//   const songs = useSelector((state) => state.song?.songs || []);



//   return (
//     <div>
//       <Typography variant="h4" align="center">All Songs</Typography> {/* כותרת הדף */}
//       <Grid container spacing={3}> {/* יצירת גריד עם רווחים בין הפריטים */}
//         {songs.map((song) => ( // מעבר על כל השירים במערך songs
//           <Grid item xs={12} sm={6} md={4} key={song.id}> {/* יצירת פריט גריד עבור כל שיר */}
//             <SongCard
//               song={song} // העברת השיר הנוכחי כפרופס לקומפוננטה SongCard
//               onPlay={() => playSong(song)} // העברת פונקציית ההפעלה כפרופס לקומפוננטה SongCard
//               onDelete={() => deleteSong(song.id)} // העברת פונקציית המחיקה כפרופס לקומפוננטה SongCard
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default HomePage; // ייצוא הקומפוננטה HomePage
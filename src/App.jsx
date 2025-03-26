// import React from "react"; // ייבוא React
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./pages/HomePage";
// import AddSongPage from "./components/redux/song/AddSongPage";
import SongPlayer from "./components/redux/song/SongPlayer";
import Navbar from "./components/Navbar";
import { fetchSongs } from "./components/redux/song/songSlice";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchSongs()).then((result) => {
  //     console.log("Fetched songs:", result);
  //   });
  // }, [dispatch]);
  

  return (
    <>
    <Navbar />
    {/* <HomePage/> */}
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/add-song" element={<AddSongPage />} />
        <Route path="/player" element={<SongPlayer />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // ייבוא רכיבי הניווט מ-react-router-dom
// import HomePage from "./pages/HomePage"; // ייבוא הקומפוננטה HomePage
// import AddSongPage from "./components/redux/song/AddSongPage"; // ייבוא הקומפוננטה AddSongPage
// import { MusicProvider } from "./context/MusicContext"; // ייבוא הקומפוננטה MusicProvider מהקונטקסט MusicContext
// import SongPlayer from "./components/redux/song/SongPlayer"; // ייבוא הקומפוננטה SongPlayer
// import Navbar from "./components/Navbar"; // ייבוא הקומפוננטה Navbar
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchSongs } from "./components/redux/song/songSlice"; 

// function App() { // הגדרת הקומפוננטה App
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchSongs());
//   }, [dispatch]);
//   return (
//     <MusicProvider> {/* עטיפת האפליקציה בקונטקסט MusicProvider */}
//       <Router> {/* הגדרת ה-Router לניווט באפליקציה */}
//         <Navbar /> {/* הצגת ה-Navbar */}
//         <Routes> {/* הגדרת ה-Routes לניווט בין הדפים */}
//           <Route path="/" element={<HomePage />} /> {/* הגדרת ה-Route לדף הבית */}
//           <Route path="/add-song" element={<AddSongPage />} /> {/* הגדרת ה-Route לדף הוספת שיר */}
//         </Routes>
//         <SongPlayer /> {/* הצגת נגן השירים */}
//       </Router>
//     </MusicProvider>
//   );
// }

// export default App; // ייצוא הקומפוננטה App כברירת מחדל
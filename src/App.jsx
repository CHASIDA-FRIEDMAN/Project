// import React from "react"; // ייבוא React
import React, { useEffect } from "react";
import {useParams, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./pages/HomePage";
import SingersPage from "./components/redux/singer/SingersPage";
// import AddSongPage from "./components/redux/song/AddSongPage";
// import SongPlayer from "./components/redux/song/SongPlayer";
import Navbar from "./components/Navbar";
import { fetchSongs } from "./components/redux/song/songSlice";
import AlbumsPage from "./components/redux/album/AlbumsPage";
import CategoriesPage from "./components/redux/category/CategoriesPage";
import SingerSongsPage from "./components/redux/song/SingerSongsPage";
import AlbumSongsPage from "./components/redux/song/AlbumSongsPage copy";

function App() {


  return (
    <>
    {/* <HomePage/> */}
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/singers" element={<SingersPage />} />
        <Route path="/songBysinger/:singerId" element={<SingerSongsPage key={useParams().singerId}/>} /> {/* דף שירים של זמר */}
        <Route path="/songByalbum/:albumId" element={<AlbumSongsPage key={useParams().albumId}/>} /> {/* דף שירים של זמר */}

        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/categories" element={<CategoriesPage/>} />

        {/* <Route path="/add-song" element={<AddSongPage />} />
        <Route path="/player" element={<SongPlayer />} /> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;

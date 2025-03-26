// import React, { useState } from 'react';
// import { Button } from '@mui/material';
// import AddSongModal from './AddSongModal';
// import { useDispatch } from 'react-redux';
// import { addSong } from './songSlice';

// const AddSongPage = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const dispatch = useDispatch();

//   const handleAddSong = async (songData) => {
//     const resultAction = await dispatch(addSong(songData));
//     if (addSong.fulfilled.match(resultAction)) {
//       console.log("Song added successfully:", resultAction.payload);
//     }
//   };

//   return (
//     <div>
//       <Button variant="contained" onClick={() => setOpenModal(true)}>Add New Song</Button>
//       <AddSongModal open={openModal} onClose={() => setOpenModal(false)} onAddSong={handleAddSong} />
//     </div>
//   );
// };

// export default AddSongPage;


// // import React, { useState } from 'react'; // ייבוא React וההוק useState
// // import { Button } from '@mui/material'; // ייבוא רכיב Button מ-Material-UI
// // import AddSongModal from './AddSongModal'; // ייבוא הקומפוננטה AddSongModal
// // import { useDispatch } from 'react-redux'; // ייבוא useDispatch מ-react-redux
// // import { addSong, fetchSongs } from './songSlice'; // ייבוא הפעולות להוספת ורענון שירים

// // const AddSongPage = () => { // הגדרת הקומפוננטה AddSongPage
// //   const [openModal, setOpenModal] = useState(false); // משתנה מצב לניהול פתיחת המודאל
// //   const dispatch = useDispatch(); // יצירת מופע של dispatch

// //   const handleAddSong = () => setOpenModal(true); // פונקציה לפתיחת המודאל

// //   const refreshSongs = () => {
// //     dispatch(fetchSongs()); // רענון רשימת השירים מהשרת
// //   };

// //   return (
// //     <div>
// //       <Button variant="contained" onClick={handleAddSong}>Add New Song</Button> {/* כפתור לפתיחת המודאל */}
// //       <AddSongModal open={openModal} onClose={() => setOpenModal(false)} refreshSongs={refreshSongs} /> {/* מודאל להוספת שיר */}
// //     </div>
// //   );
// // };

// // export default AddSongPage; // ייצוא הקומפוננטה AddSongPage

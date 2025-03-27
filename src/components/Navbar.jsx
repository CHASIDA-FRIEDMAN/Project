import React, { useState } from 'react'; // ייבוא React והוק useState
import { AppBar, Toolbar, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'; // ייבוא רכיבים מ-Material-UI
import AddSongModal from './redux/song/AddSongModal'; // ייבוא הקומפוננטה AddSongModal
import { Maximize } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterCriteria } from './redux/filter/filterSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const filterCriteria = useSelector(state => state.filters.filterCriteria);
  const navigate = useNavigate();
  // הגדרת הקומפוננטה Navbar עם הפרופס filterCriteria, setFilterCriteria, ו-applyFilters
  const [openModal, setOpenModal] = useState(false); // משתנה מצב לניהול פתיחת המודאל

  // פונקציה לטיפול בשינויי קלט
  const handleChange = (event) => {
    const { name, value } = event.target;

    let newFilter = {
      ...filterCriteria,
      [name]: value
      // const newFilter = {
      //   ...filterCriteria, // שמירה על הערכים הקיימים ב-filterCriteria
      //   [event.target.name]: event.target.value // עדכון הערך של המאפיין ששונה
    }
    dispatch(setFilterCriteria(newFilter));
    // setFilterCriteria(newFilter);
    //   if (event.target.name === "filterBy" && event.target.value == "Singer") {
    //     navigate('/singers');
    // }
    if (name === "filterBy") {
      if (value === "All") {
        navigate('/'); // חזרה לדף הראשי עם כל השירים
      } else if (value === "Singer") {
        navigate('/singers'); // ניוד לדף זמרים
      } else if (value === "Album") {
        navigate('/albums'); // ניוד לדף זמרים
      } else if (value === "Category") {
        navigate('/categories'); // ניוד לדף זמרים
      } 
    }
  };
  // setFilterCriteria({
  //   ...filterCriteria, // שמירה על הערכים הקיימים ב-filterCriteria
  //   [event.target.name]: event.target.value // עדכון הערך של המאפיין ששונה
  // });


  // פונקציה ליישום הסינון
  const handleApplyFilters = () => {
    applyFilters(); // קריאה לפונקציה applyFilters
  };

  return (
    <AppBar position="static" className="custom-navbar" sx={{width: 1250 }}> {/* הוספת מחלקת navbar */}
      <Toolbar>
        {/* <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Song Manager כותרת סרגל הניווט
        </Typography> */}

        { /* כפתור לפתיחת המודאל */}
        <Button sx={{ flexGrow: 5 }} color="inherit" onClick={() => setOpenModal(true)}>
          Add Song
        </Button>

        <FormControl sx={{ minWidth: 120, marginRight: 2 }}> {/* רכיב לבחירת קריטריון סינון */}
          <InputLabel>Filter By</InputLabel>
          <Select
            name="filterBy"
            value={filterCriteria.filterBy || "All"} // השתמש בערך ברירת מחדל אם filterBy לא קיים
            // onChange={(event) => {
            //   handleChange(event);
            // }}
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Category">Category</MenuItem>
            <MenuItem value="Singer">Singer</MenuItem>
            <MenuItem value="Album">Album</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, marginRight: 2 }}> {/* רכיב לבחירת ז'אנר */}
          <InputLabel>Genre</InputLabel>
          <Select
            name="genre"
            value={filterCriteria?.genre || "All"} // השתמש בערך ברירת מחדל אם genre לא קיים
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Hassidic">Hassidic</MenuItem>
            <MenuItem value="Mizrahi">Mizrahi</MenuItem>
            <MenuItem value="Cantorial">Cantorial</MenuItem>
            <MenuItem value="Children">Children</MenuItem>
            <MenuItem value="Vocal">Vocal</MenuItem>
            <MenuItem value="Melody">Melody</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, marginRight: 2 }}> {/* רכיב לבחירת קצב */}
          <InputLabel>Rhythm</InputLabel>
          <Select
            name="rhythm"
            value={filterCriteria?.rhythm || "All"} // השתמש בערך ברירת מחדל אם rhythm לא קיים
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Calm">Calm</MenuItem>
            <MenuItem value="Rhythmic">Rhythmic</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, marginRight: 2 }}> {/* רכיב לבחירת מועדפים */}
          <InputLabel>Favorite</InputLabel>
          <Select
            name="favorite"
            value={filterCriteria?.favorite || "All"} // השתמש בערך ברירת מחדל אם favorite לא קיים
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Favorite">Favorites</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, marginRight: 2 }}> {/* רכיב לבחירת רשומות אחרונות */}
          <InputLabel>Recent</InputLabel>
          <Select
            name="recent"
            value={filterCriteria?.recent || "All"} // השתמש בערך ברירת מחדל אם recent לא קיים
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Recent">Recent</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleApplyFilters}> {/* כפתור ליישום הסינון */}
          Apply
        </Button>
      </Toolbar>
      <AddSongModal open={openModal} onClose={() => setOpenModal(false)} /> {/* מודאל להוספת שיר */}
    </AppBar>
  );
};

export default Navbar; // ייצוא הקומפוננטה Navbar

// import React, { useState } from 'react'; // ייבוא React והוק useState
// import { AppBar, Toolbar, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'; // ייבוא רכיבים מ-Material-UI
// import AddSongModal from '../components/redux/songs/AddSongModal'; // ייבוא הקומפוננטה AddSongModal

// const Navbar = ({ filterCriteria, setFilterCriteria, applyFilters }) => { // הגדרת הקומפוננטה Navbar עם הפרופס filterCriteria, setFilterCriteria, ו-applyFilters
//   const [openModal, setOpenModal] = useState(false); // משתנה מצב לניהול פתיחת המודאל

//   // פונקציה לטיפול בשינויי קלט
//   const handleChange = (event) => {
//     setFilterCriteria({
//       ...filterCriteria, // שמירה על הערכים הקיימים ב-filterCriteria
//       [event.target.name]: event.target.value // עדכון הערך של המאפיין ששונה
//     });
//   };

//   // פונקציה ליישום הסינון
//   const handleApplyFilters = () => {
//     applyFilters(); // קריאה לפונקציה applyFilters
//   };

//   return (
//     <AppBar position="static" className="custom-navbar"> {/* הוספת מחלקת navbar */}
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Song Manager {/* כותרת סרגל הניווט */}
//         </Typography>

//         { /* כפתור לפתיחת המודאל */}

//         <FormControl sx={{ minWidth: 120, marginRight: 2 }}> {/* רכיב לבחירת קריטריון סינון */}
//           <InputLabel>Filter By</InputLabel>
//           <Select
//             name="filterBy"
//             value={filterCriteria?.filterBy || "All"} // השתמש בערך ברירת מחדל אם filterBy לא קיים
//             onChange={(event) => {
//               handleChange(event);
//               if (event.target.value !== "All") {
//                 dispatch(choose(event.target.value));
//               }
//             }}
//           >
//             <MenuItem value="All">All</MenuItem>
//             <MenuItem value="Category">Category</MenuItem>
//             <MenuItem value="Singer">Singer</MenuItem>
//             <MenuItem value="Album">Album</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl sx={{ minWidth: 120, marginRight: 2 }}> {/* רכיב לבחירת ז'אנר */}
//           <InputLabel>Genre</InputLabel>
//           <Select
//             name="genre"
//             value={filterCriteria?.genre || "All"} // השתמש בערך ברירת מחדל אם genre לא קיים
//             onChange={handleChange}
//           >
//             <MenuItem value="All">All</MenuItem>
//             <MenuItem value="Hassidic">Hassidic</MenuItem>
//             <MenuItem value="Mizrahi">Mizrahi</MenuItem>
//             <MenuItem value="Cantorial">Cantorial</MenuItem>
//             <MenuItem value="Children">Children</MenuItem>
//             <MenuItem value="Vocal">Vocal</MenuItem>
//             <MenuItem value="Melody">Melody</MenuItem>
//             <MenuItem value="Other">Other</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl sx={{ minWidth: 120, marginRight: 2 }}> {/* רכיב לבחירת קצב */}
//           <InputLabel>Rhythm</InputLabel>
//           <Select
//             name="rhythm"
//             value={filterCriteria?.rhythm || "All"} // השתמש בערך ברירת מחדל אם rhythm לא קיים
//             onChange={handleChange}
//           >
//             <MenuItem value="All">All</MenuItem>
//             <MenuItem value="Calm">Calm</MenuItem>
//             <MenuItem value="Rhythmic">Rhythmic</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl sx={{ minWidth: 120, marginRight: 2 }}> {/* רכיב לבחירת מועדפים */}
//           <InputLabel>Favorite</InputLabel>
//           <Select
//             name="favorite"
//             value={filterCriteria?.favorite || "All"} // השתמש בערך ברירת מחדל אם favorite לא קיים
//             onChange={handleChange}
//           >
//             <MenuItem value="All">All</MenuItem>
//             <MenuItem value="Favorite">Favorites</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl sx={{ minWidth: 120, marginRight: 2 }}> {/* רכיב לבחירת רשומות אחרונות */}
//           <InputLabel>Recent</InputLabel>
//           <Select
//             name="recent"
//             value={filterCriteria?.recent || "All"} // השתמש בערך ברירת מחדל אם recent לא קיים
//             onChange={handleChange}
//           >
//             <MenuItem value="All">All</MenuItem>
//             <MenuItem value="Recent">Recent</MenuItem>
//           </Select>
//         </FormControl>

//         <Button variant="contained" onClick={handleApplyFilters}> {/* כפתור ליישום הסינון */}
//           Apply
//         </Button>
//       </Toolbar>
//       <AddSongModal open={openModal} onClose={() => setOpenModal(false)} /> {/* מודאל להוספת שיר */}
//     </AppBar>
//   );
// };

// export default Navbar; // ייצוא הקומפוננטה Navbar
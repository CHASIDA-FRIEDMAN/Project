import React, { useState } from 'react'; // ייבוא React והוק useState
import { AppBar, Toolbar, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'; // ייבוא רכיבים מ-Material-UI
import AddSongModal from './redux/song/AddSongModal'; // ייבוא הקומפוננטה AddSongModal
import { Maximize } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterCriteria } from './redux/filter/filterSlice';
import AddIcon from '@mui/icons-material/Add';
import { fetchFilteredSongs } from './redux/song/songSlice';



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

    }
    dispatch(setFilterCriteria(newFilter));

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

  // פונקציה ליישום הסינון
  const handleApplyFilters = () => {
    dispatch(fetchFilteredSongs(filterCriteria));
  };

  return (
    <AppBar position="sticky" className="custom-navbar" sx={{width:"100%", height:80 , margintop:0}}> {/* הוספת מחלקת navbar */}
      <Toolbar sx = {{marginTop:1}}>
        {/* <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Song Manager כותרת סרגל הניווט
        </Typography> */}

        { /* כפתור לפתיחת המודאל */}
        <Button variant="outlined" sx={{ minWidth: 30, marginRight: 2 }} color="inherit" onClick={() => setOpenModal(true)}   startIcon={<AddIcon />}
        >
           Add Song
        </Button>

        <FormControl sx={{ minWidth:180, marginRight: 2 ,
        }}> {/* רכיב לבחירת קריטריון סינון */}
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

        <FormControl sx={{ minWidth:180, marginRight: 2 }}> {/* רכיב לבחירת ז'אנר */}
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

        <FormControl sx={{ minWidth:180, marginRight: 2 }}> {/* רכיב לבחירת קצב */}
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

        <FormControl sx={{ minWidth:180, marginRight: 2 }}> {/* רכיב לבחירת מועדפים */}
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

        <FormControl sx={{ minWidth:180, marginRight: 2 }}> {/* רכיב לבחירת רשומות אחרונות */}
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

        <Button variant="contained" sx={{ backgroundColor: "white", color: "#c14c4c" }} onClick={handleApplyFilters}> {/* כפתור ליישום הסינון */}
          Apply
        </Button>
      </Toolbar>
      <AddSongModal open={openModal} onClose={() => setOpenModal(false)} /> {/* מודאל להוספת שיר */}
    </AppBar>
  );
};

export default Navbar; // ייצוא הקומפוננטה Navbar

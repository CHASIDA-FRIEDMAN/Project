// // רכיב לסינון שירים לפי קטגוריות וז'אנר

// import React from 'react'; // ייבוא React
// import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material'; // ייבוא רכיבים מ-Material-UI

// const SongFilter = ({ filters, onChange, onApply }) => ( // הגדרת הקומפוננטה SongFilter עם הפרופס filters, onChange, ו-onApply
//   <FormControl component="fieldset" sx={{ marginBottom: 2 }}> {/* רכיב FormControl עם מרווח תחתון */}
//     <FormLabel component="legend">Filter Songs</FormLabel> {/* תווית לטופס הסינון */}
//     {Object.entries(filters).map(([key, options]) => ( // מעבר על כל הקטגוריות והאפשרויות לסינון
//       <div key={key}>
//         <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel> {/* תווית לקטגוריה */}
//         <RadioGroup
//           row
//           value={filters[key].value} // הערך הנבחר בקטגוריה
//           onChange={(e) => onChange(key, e.target.value)} // קריאה לפונקציה onChange בעת שינוי ערך
//         >
//           {options.map((opt) => ( // מעבר על כל האפשרויות בקטגוריה
//             <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} /> // יצירת אפשרות רדיו לכל ערך
//           ))}
//         </RadioGroup>
//       </div>
//     ))}
//     <Button variant="contained" onClick={onApply}>Apply Filters</Button> {/* כפתור ליישום הסינון */}
//   </FormControl>
// );

// export default SongFilter; // ייצוא הקומפוננטה SongFilter
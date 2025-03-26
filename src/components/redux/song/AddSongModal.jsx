import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Input } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addSong } from './songSlice';


const AddSongModal = ({ open, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    try {
      await dispatch(addSong(file)); // הוספת השיר ישירות ל-Redux
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload New Song</DialogTitle>
      <DialogContent>
        <Input type="file" onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading || !file}>
          {loading ? <CircularProgress size={24} /> : 'Upload Song'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSongModal;

// import SongService from '../../../services/songService';
// import { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Input } from '@mui/material';


// const AddSongModal = ({ open, onClose, refreshSongs }) => {
//   const [file, setFile] = useState(null); // משתנה מצב לאחסון הקובץ שנבחר
//   const [loading, setLoading] = useState(false); // משתנה מצב לציון מצב הטעינה

//   const handleFileChange = (e) => { // פונקציה לטיפול בשינוי קובץ
//     setFile(e.target.files[0]); // עדכון מצב הקובץ עם הקובץ שנבחר
//   };

//   const handleSubmit = async () => { // פונקציה לטיפול בשליחת הטופס
//     if (!file) return; // אם לא נבחר קובץ, לא לעשות כלום
//     setLoading(true); // הגדרת מצב הטעינה לאמת
//     try {
      
//       await SongService.addSong(file); // קריאה לפונקציה addSong של SongService עם ה-FormData
//       refreshSongs(); // רענון רשימת השירים
//       onClose(); // סגירת המודאל
//     } catch (error) {
//       console.error(error); // הדפסת שגיאות לקונסול
//     } finally {
//       setLoading(false); // הגדרת מצב הטעינה לשקר
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose}> {/* פתיחת דיאלוג המודאל */}
//       <DialogTitle>Upload New Song</DialogTitle> {/* כותרת המודאל */}
//       <DialogContent>
//         <Input type="file" onChange={handleFileChange} /> {/* שדה קלט להעלאת קובץ */}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="inherit">Cancel</Button> {/* כפתור ביטול לסגירת המודאל */}
//         <Button onClick={handleSubmit} variant="contained" disabled={loading || !file}> {/* כפתור שליחה להעלאת השיר, מושבת בזמן טעינה או אם לא נבחר קובץ */}
//           {loading ? <CircularProgress size={24} /> : 'Upload Song'} {/* הצגת מעגל טעינה בזמן טעינה */}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddSongModal; // ייצוא הקומפוננטה AddSongModal
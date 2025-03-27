import React, { useEffect, useRef,useState} from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Slider, Box } from '@mui/material';
import { Close, PlayArrow, Pause, VolumeUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setVolume, togglePlay } from './songSlice';

const SongPlayer = ({ song, onClose }) => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.song.isPlaying);
  const volume = useSelector((state) => state.song.volume);
  const [currentTime, setCurrentTime] = useState(0); // זמן נוכחי בשיר


  // כל פעם ש-song משתנה או isPlaying משתנה, נוודא שהשיר מתחיל/עוצר כראוי
  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.load(); // נטען את השיר

      if (isPlaying) {
        audioRef.current.play(); // אם שחקן מנגן, נתחיל לנגן
      } else {
        audioRef.current.pause(); // אם לא, נעצור את השיר
      }
    } else {
      // אם אין שיר, נפסיק את ההשמעה
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [song, isPlaying]); // כל פעם ש-song או isPlaying משתנים, מתעדכן השיר

  const handleVolumeChange = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.volume = newValue;
    }
    dispatch(setVolume(newValue)); // עדכון הווליום ב-redux
  };

  const handleTogglePlay = () => {
    dispatch(togglePlay()); // הפעלת/הפסקת השיר
  };

  // יצירת ה-URL של השיר מהנתונים הבינאריים (dome לתמונה)
  const audioData = new Blob([new Uint8Array(atob(song?.songData).split("").map(char => char.charCodeAt(0)))], { type: 'audio/mpeg' });
  const audioUrl = URL.createObjectURL(audioData);

  return (
    <Dialog open={!!song} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {song?.name}
        <IconButton edge="end" color="inherit" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">{song?.singer}</Typography>
        <audio ref={audioRef} src={audioUrl} onEnded={() => { dispatch(playNextSong()); }} autoPlay>
  <source src={audioUrl} type="audio/mpeg" />
</audio>

        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
          <IconButton onClick={handleTogglePlay} color="primary">
            {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
          </IconButton>
          <Slider value={volume} min={0} max={1} step={0.01} onChange={handleVolumeChange} sx={{ width: 100 }} />
          <VolumeUp sx={{ mx: 1 }} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SongPlayer;

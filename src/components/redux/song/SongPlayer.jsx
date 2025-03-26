import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Slider, Box } from '@mui/material';
import { Close, PlayArrow, Pause, VolumeUp } from '@mui/icons-material';

const SongPlayer = ({ song, onClose }) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(err => console.warn("AutoPlay failed", err));
      setIsPlaying(true);
    }
  }, [song]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSliderChange = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setProgress(newValue);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.volume = newValue;
      setVolume(newValue);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.warn("Play failed", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Dialog open={!!song} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {song?.Name}
        <IconButton edge="end" color="inherit" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">{song?.Singer}</Typography>
        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}>
          <source src={song?.SongUrl} type="audio/mpeg" />
        </audio>
        
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
          <IconButton onClick={togglePlay} color="primary">
            {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
          </IconButton>
          <Slider value={progress} min={0} max={duration || 100} onChange={handleSliderChange} sx={{ mx: 2, flex: 1 }} />
          <VolumeUp sx={{ mx: 1 }} />
          <Slider value={volume} min={0} max={1} step={0.01} onChange={handleVolumeChange} sx={{ width: 100 }} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SongPlayer;




//=====================================
// import React, { useEffect, useRef, useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Slider } from '@mui/material';
// import { Close } from '@mui/icons-material';

// const SongPlayer = ({ song, onClose }) => {
//   const audioRef = useRef(null);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     if (song && audioRef.current) {
//       audioRef.current.play();
//     }
//   }, [song]);

//   const handleTimeUpdate = () => {
//     if (audioRef.current) {
//       setProgress(audioRef.current.currentTime);
//       setDuration(audioRef.current.duration);
//     }
//   };

//   const handleSliderChange = (event, newValue) => {
//     if (audioRef.current) {
//       audioRef.current.currentTime = newValue;
//       setProgress(newValue);
//     }
//   };

//   return (
//     <Dialog open={!!song} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>
//         {song?.Name}
//         <IconButton edge="end" color="inherit" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
//           <Close />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <Typography variant="subtitle1">{song?.Singer}</Typography>
//         <audio ref={audioRef} controls style={{ width: '100%' }} src={song?.SongUrl} onTimeUpdate={handleTimeUpdate} />
//         <Slider value={progress} min={0} max={duration || 100} onChange={handleSliderChange} sx={{ mt: 2 }} />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default SongPlayer;



///=============================================
// import React from 'react'; // ייבוא React
// import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material'; // ייבוא רכיבים מ-Material-UI
// import { Close } from '@mui/icons-material'; // ייבוא אייקון Close

// const SongPlayer = ({ song, onClose }) => { // הגדרת הקומפוננטה SongPlayer עם הפרופס song ו-onClose
//   return (
//     <Dialog open={!!song} onClose={onClose} fullWidth maxWidth="sm"> {/* דיאלוג פתוח אם יש שיר, סגור אם אין, ברוחב מלא ובגודל מקסימלי "sm" */}
//       <DialogTitle>
//         {song?.Name} {/* שם השיר */}
//         <IconButton
//           edge="end"
//           color="inherit"
//           onClick={onClose}
//           sx={{ position: 'absolute', right: 8, top: 8 }}
//         >
//           <Close /> {/* אייקון לסגירת הדיאלוג */}
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <Typography variant="subtitle1">{song?.Singer}</Typography> {/* שם הזמר */}
//         <audio controls style={{ width: '100%' }} src={song?.SongUrl}> {/* נגן אודיו */}
//           Your browser does not support audio. {/* הודעה אם הדפדפן לא תומך בנגן אודיו */}
//         </audio>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default SongPlayer; // ייצוא הקומפוננטה SongPlayer
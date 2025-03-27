import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Slider, Box } from '@mui/material';
import { Close, PlayArrow, Pause, VolumeUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setVolume, togglePlay } from './songSlice';

const SongPlayer = ({ song, onClose }) => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.song.isPlaying);
  const volume = useSelector((state) => state.song.volume);
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  // יצירת URL רק כאשר השיר משתנה
  useEffect(() => {
    if (song?.songData) {
      const audioData = new Blob([new Uint8Array(atob(song.songData).split("").map(char => char.charCodeAt(0)))], { type: 'audio/mpeg' });
      const newUrl = URL.createObjectURL(audioData);
      setAudioUrl(newUrl);

      return () => URL.revokeObjectURL(newUrl); // ניקוי ה-URL כאשר השיר משתנה
    }
  }, [song]);

  // הפעלת השיר אוטומטית כשה-URL מוכן
  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.currentTime = currentTime;
      audioRef.current.volume = volume;
      
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        setCurrentTime(audioRef.current.currentTime);
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleVolumeChange = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.volume = newValue;
    }
    dispatch(setVolume(newValue));
  };

  const handleTogglePlay = () => {
    dispatch(togglePlay());
  };

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
        <audio ref={audioRef} />

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

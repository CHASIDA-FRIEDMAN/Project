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
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (song?.songData) {
      const audioData = new Blob([new Uint8Array(atob(song.songData).split("").map(char => char.charCodeAt(0)))], { type: 'audio/mpeg' });
      const newUrl = URL.createObjectURL(audioData);
      setAudioUrl(newUrl);

      return () => URL.revokeObjectURL(newUrl);
    }
  }, [song]);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.currentTime = currentTime;
      audioRef.current.volume = volume;

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };

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

  useEffect(() => {
    let animationFrameId;

    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        animationFrameId = requestAnimationFrame(updateCurrentTime);
      }
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(updateCurrentTime);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  const handleVolumeChange = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.volume = newValue;
    }
    dispatch(setVolume(newValue));
  };

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    dispatch(togglePlay());
  };

  const handleSeek = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  return (
    <Dialog open={!!song} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { overflowY: 'unset' } }}>
      <DialogTitle>
        {song?.name}
        <IconButton edge="end" color="inherit" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">{song?.singer}</Typography>
        <audio ref={audioRef} />

        <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
          <Typography variant="body2">{formatTime(currentTime)}</Typography>
          <Slider
            value={currentTime}
            min={0}
            max={duration}
            step={1}
            onChange={handleSeek}
            sx={{
              flex: 1,
              mx: 2,
              color: 'rgb(165, 52, 52)',
              '& .MuiSlider-thumb': { backgroundColor: 'rgb(165, 52, 52)' },
              '& .MuiSlider-track': { backgroundColor: '#c14c4c' },
              '& .MuiSlider-rail': { backgroundColor: 'rgba(121, 75, 79, 0.5)' },
            }}
          />
          <Typography variant="body2">{formatTime(duration)}</Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
        <IconButton
            onClick={handleTogglePlay}
            sx={{ backgroundColor: '#c14c4c', color: 'white', '&:hover': { backgroundColor:  'rgb(85, 155, 164)'} }}
          >
            {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
          </IconButton>
          <Box sx={{ mx: 1 }} /> {/* כאן הוספתי רווח בין הכפתור לפס הווליום */}

          <Slider
            value={volume}
            min={0}
            max={1}
            step={0.01}
            onChange={handleVolumeChange}
            sx={{
              width: 100,
              color: 'rgb(85, 155, 164)',
              '& .MuiSlider-thumb': { backgroundColor: 'rgb(85, 155, 164)' },
              '& .MuiSlider-track': { backgroundColor: 'rgb(85, 155, 164)'},
              '& .MuiSlider-rail': { backgroundColor: 'rgba(75, 117, 121, 0.5)'  },
            }}
          />
          <VolumeUp sx={{ mx: 1, color: 'rgb(37, 104, 114)' }} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const formatTime = (time) => {
  if (!time) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default SongPlayer;

import React from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, CardActions, Box, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { updateSong } from './songSlice';
import { useDispatch, useSelector } from 'react-redux';
import { playSong } from './songSlice';
import { useState } from 'react';


const SongCard = ({ song,onPlay}) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const onFavoriteToggle = () => {
    const updatedSong = { ...song, favorite: !song.favorite };
    dispatch(updateSong(updatedSong));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePlayClick = () => {
    onPlay(song) // זה יפעיל את השיר ב-Redux
  };
  

  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="300"
        image={song.image ? `data:image/jpg;base64,${song.image}` : '/default-image.jpg'}
        alt={song.name}
        onClick={handleExpandClick}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Tooltip title={song.name} arrow>
          <Box sx={{
            height: 50,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            textOverflow: 'ellipsis',
            cursor: 'pointer'
          }}>
            <Typography variant="h6">{song.name}</Typography>
          </Box>
        </Tooltip>
        <Typography variant="body2" color="textSecondary">
          {song.singer} - {song.album}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Genre: {song.genre}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handlePlayClick} color="primary">
          <PlayArrowIcon />
        </IconButton>
        <IconButton onClick={onFavoriteToggle} color="error">
          {song.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
      {expanded && (
        <Box sx={{ padding: 2 }}>
          <Typography variant="body2">Additional details:</Typography>
          <Typography variant="body2" color="textSecondary">
            {song.lyrics}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default SongCard;

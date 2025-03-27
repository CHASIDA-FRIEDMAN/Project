import React from "react";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SingerCard = ({ singer }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/songBysinger/${singer.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardMedia
        component="img"
        height="300"
        image={`data:image/jpg;base64,${singer.image}`}
        alt={singer.name}
      />
      <CardContent>
        <Typography variant="h6">{singer.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default SingerCard;

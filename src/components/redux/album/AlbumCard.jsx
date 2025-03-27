import React from "react";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const AlbumCard = ({ album }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/songByalbum/${album.id}`);
    };
    return (
        <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
        <CardMedia
            component="img"
            height="300"
            image={`data:image/jpg;base64,${album.image}`}
            alt={album.name}
        />
        <CardContent>
            <Typography variant="h6">{album.name}</Typography>
        </CardContent>
        </Card>
    );
    }

export default AlbumCard;
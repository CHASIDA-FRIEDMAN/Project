import React from "react";
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const AlbumCard = ({ album }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
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
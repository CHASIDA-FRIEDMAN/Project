import React,{ useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "./albumSlice";
import { Grid, Typography, CircularProgress } from "@mui/material";
import AlbumCard from "./AlbumCard";

const AlbumsPage = () => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.album.albums);

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div>
            <Typography variant="h4" align="center" color="white">All Albums</Typography>
            {albums.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress size={100} />
                </div>
            ) : (
                <Grid container spacing={3}>
                    {albums.map((album) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
                            <AlbumCard album={album} />
                        </Grid>
                    ))}
                </Grid>)}
        </div>
    );
}
export default AlbumsPage;

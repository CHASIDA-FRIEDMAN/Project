import React,{ useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "./albumSlice";
import { Grid, Typography, CircularProgress } from "@mui/material";
import AlbumCard from "./AlbumCard";

const AlbumsPage = () => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.album.albums);
    console.log(albums);  // להדפיס את האלבומים לפני ההצגה
    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div>
            <Typography variant="h4" align="center" color="white">All Albums</Typography>
            {albums.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' ,color:"white"}}>
                    <CircularProgress size={100} color="inherit" />
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

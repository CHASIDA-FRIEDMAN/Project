import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongsBySinger } from "./songSlice"; // פונקציה שתביא את השירים לפי זמר
import { useParams } from "react-router-dom";
import { Grid, Typography, CircularProgress } from "@mui/material";
import SongCard from "./SongCard";

const SingerSongsPage = () => {
  const { singerId } = useParams();
  const dispatch = useDispatch();
  const { songs, status, error } = useSelector((state) => state.song);

  useEffect(() => {
    dispatch(fetchSongsBySinger(singerId));
  }, [dispatch, singerId]);

  return (
    <div>
      <Typography variant="h4" align="center" color="white">
        Songs of Singer {singerId}
      </Typography>

      {status === "loading" && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: "white" }}>
          <CircularProgress size={100} color="inherit" />
        </div>
      )}

      {status === "failed" && (
        <Typography variant="h6" align="center" color="red">
          {error || "Failed to load songs"}
        </Typography>
      )}

      {status === "succeeded" && songs.length === 0 && (
        <Typography variant="h6" align="center" color="gray">
          No songs found for this singer.
        </Typography>
      )}

      {status === "succeeded" && songs.length > 0 && (
        <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>

          {songs.map((song) => (
            <Grid item xs={12} sm={6} md={4} key={song.id}>
              <SongCard song={song} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
export default SingerSongsPage;


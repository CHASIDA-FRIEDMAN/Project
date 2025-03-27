import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Input } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addSong } from './songSlice';


const AddSongModal = ({ open, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    try {
      await dispatch(addSong(file)); // הוספת השיר ישירות ל-Redux
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload New Song</DialogTitle>
      <DialogContent>
        <Input type="file" onChange={handleFileChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading || !file}>
          {loading ? <CircularProgress size={24} /> : 'Upload Song'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSongModal;

import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(''); // משתנה מצב לאחסון שם המשתמש
  const [password, setPassword] = useState(''); // משתנה מצב לאחסון הסיסמה

const handleLogin = () => {
  if (username === 'admin' && password === 'admin123') { // בדיקת שם משתמש וסיסמה
    onLogin(true); // קריאה לפונקציה onLogin עם ערך true אם ההתחברות הצליחה
  } else {
    alert('Invalid credentials'); // הצגת הודעת שגיאה אם ההתחברות נכשלה
  }
};

return (
  <Container component="main" maxWidth="xs">
    <Paper sx={{ padding: 4, marginTop: 8 }}>
      <Typography variant="h5" align="center">Admin Login</Typography>
      
      <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
      
      <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
    </Paper>
  </Container>
);
}
export default Login; // ייצוא הקומפוננטה Login
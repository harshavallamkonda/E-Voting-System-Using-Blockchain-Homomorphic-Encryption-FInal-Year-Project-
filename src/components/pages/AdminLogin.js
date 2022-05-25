import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { auth, RecaptchaVerifier, signInWithEmailAndPassword, signOut } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        VOTE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function AdminLogin() {
  //const [user, setUser] = React.useState("");
  const[email, setEmail] = React.useState("");
  const[password, setPassword] = React.useState("");
  const [user, loading] = useAuthState(auth);
  const [show, setshow] = React.useState(false)

  /* function for navigation */
  let navigate = useNavigate();

  const handleAdminLogin = (event) => {
    event.preventDefault()
          window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {

            }
          }, auth);
          const appVerifier = window.recaptchaVerifier
          signInWithEmailAndPassword(auth, email, password, appVerifier)
          .then( confirmationResult => {
              alert("Admin logged in successfully!");
              window.confirmationResult = confirmationResult
              setshow(true)
              navigate('/admin/options')
          })
          .catch((err) => {
              alert(err)
              window.location.reload()
          });
  }

  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (user) signOut(auth);
  }, [user, loading, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h2" variant="h5">
              Admininstrator Sign in
            </Typography>
            <Box component="form" validate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Employee ID"
                name="employeeid"
                type="email"
                autoComplete="email"
                onChange = { (e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAdminLogin}
            >
              Sign In
            </Button>
            <div id="recaptcha-container" style={{ display: !show ? "block" : "none" }}></div>
            <Grid container>
              <Grid item xs>
                <Typography variant="body2">
                  Forgot password? Kindly contact the IT Department
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
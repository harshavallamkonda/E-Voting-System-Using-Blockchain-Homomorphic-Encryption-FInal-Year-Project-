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
import { auth, logInWithEmailAndPassword } from "../../firebase/config";
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

  /* function for navigation */
  let navigate = useNavigate();

  /*
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  }
  */

  /*const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  }*/

  /*const handleLogin = (event) => {
    //clearErrors();
    //temporary routing to options page on button onClick
    routeChange();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      alert(user, "Login Success");
    })
    .catch(err => {
      switch(err.code) {
        case "auth/Invalid-email":
        case "auth/Invalid-password":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
        default:
          break;
      }

    })
    /*
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      employeeid: data.get('employeeid'),
      password: data.get('password'),
    });
    
  };
  */

  /* LOGOUT
  const handleLogout = () => {
    fire.auth().signOut();
  }
  */

  /* AUTHLISTENER
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user){
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    })
  }
  */

  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/admin/options')
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
                onChange = { (e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Sign In
            </Button>
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
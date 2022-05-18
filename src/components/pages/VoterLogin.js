import * as React from 'react';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connectDefault, loadVoterAccount } from '../web3/Web3'
import { auth } from '../../firebase/config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';


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

export default function VoterLogin() {
  

  const [voterName, setvoterName] = React.useState("")
  const [voterID, setvoterID] = React.useState("")
  const [phoneNumber, setphoneNumber] = React.useState("")
  const [OTP, setOTP] = React.useState()
  const [user, setUser] = React.useState([])
  const [show, setshow] = React.useState(false)
  
  React.useEffect(() => {
    connectDefault()
  },[])

  const sendOTP = (event) => {
    
    event.preventDefault()

    if (phoneNumber === "" || phoneNumber.length < 10) return;
  
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        const appVerifier = window.recaptchaVerifier
        signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((result) => {
            alert("code sent")
            setshow(true);
        })
            .catch((err) => {
                alert(err);
                window.location.reload()
            });
  }


  const handleSubmit = (event) => {

    const data = new FormData(event.currentTarget);
    setvoterName(data.get('votername'))
    setvoterID(data.get('voterid'))

    event.preventDefault();
    window.confirmationResult
    .confirm(OTP)
    .then((confirmationResult) => {

      alert(confirmationResult)
    })
    .catch((error) => {
      alert(error.message)
    })

    auth.onAuthStateChanged((user) => {
      if (user) {
          setUser(user);
      }
    });
    console.log(user)

    if (loadVoterAccount(
      { voterName },
      { voterID },
      { phoneNumber }
      )) 
      {
      alert(
        "Voter Login Successful"
      )
    } 
    else {
      alert(
        "Voter Login Failed"
      )
    }

  };

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
            Voter Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="votername"
              label="Full Name as per Voter ID"
              name="votername"
              autoComplete="votername"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="voterid"
              label="Voter ID"
              name="voterid"
              autoComplete="voterid"
              autoFocus
            />
            <div style={{ "marginTop": "200px" }}>
            <center>
                <div style={{ display: !show ? "block" : "none" }}>
                    <input value={phoneNumber} onChange={(e) => { 
                       setphoneNumber(e.target.value) }}
                        placeholder="phone number" />
                    <br /><br />
                    <div id="recaptcha-container"></div>
                    <button onClick={sendOTP}>Send OTP</button>
                </div>
                <div style={{ display: show ? "block" : "none" }}>
                    <input type="text" placeholder={"Enter your OTP"}
                        onChange={(e) => { setOTP(e.target.value) }}></input>
                    <br /><br />
                    <button onClick={handleSubmit}>Verify</button>
                </div>
            </center>
            </div>
            <div>
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="phonenumber"
              label="Phone Number"
              name="phonenumber"
              autoComplete="phonenumber"
              onChange={ (e) => { setphoneNumber(e.target.value) } }
              autoFocus
            />

            <Button
              fullWidth
              variant="contained"
              onClick={ sendOTP }
              sx={{ mt: 3, mb: 2 }}
            >
              Send OTP
            </Button>

            <TextField
              margin="normal"
              style={{display : show ? "block" : "none"}}
              required
              fullWidth
              name="otp"
              label="OTP"
              type="otp"
              id="otp"
              onChange={ (e) => { setOTP(e.target.value) } }
              autoComplete="otp"
            />
            
            <Button
              type="submit"
              fullWidth
              style={{ display : show ? "block" : "none" }}
              variant="contained"
              onSubmit={ handleSubmit }
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button> */}
          </div>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <div id='recaptcha-container'></div>
      </Container>
    </ThemeProvider>
    
  );
}
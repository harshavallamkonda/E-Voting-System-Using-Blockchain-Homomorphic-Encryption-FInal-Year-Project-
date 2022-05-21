import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
/* For routing to voting page after successfull verification */
import { useNavigate } from 'react-router-dom';

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
  const [OTP, setOTP] = React.useState("")
  const [user, setUser] = React.useState([])
  const [show, setshow] = React.useState(false)

  /* function for navigation */
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/voting`
    navigate(path);
  }

  React.useEffect(() => {
    connectDefault()
  },[])

  /* For sending OTP after verifyng */
  const sendOTP = (event) => {

      if (voterName === "") {
        return;
      }
      if (voterID === ""){
        return;
      }
      if (phoneNumber === "" || phoneNumber.length < 13) {
        return;
      }
      
      event.preventDefault()
          window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
          const appVerifier = window.recaptchaVerifier
          signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((result) => {
              alert("OTP Sent Successfully!");
              setshow(true)
          })
          .catch((err) => {
              alert(err)
              window.location.reload()
          });
  }

  const handleSubmit = (event) => {
    if (OTP === ""){
      return;
    }
    routeChange();
    event.preventDefault()

      window.confirmationResult
      .confirm(OTP)
      .then((confirmationResult) => {
        alert(confirmationResult)
        /* Reroute to Voting Page unpon successful verfication of voter */
        //routeChange();
      })
      .catch((error) => {
        alert(error.message)
      })
      /*
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
      */
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
          <Box component="form" validate sx={{ mt: 1 }}>
            {/* Voter Name */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name as per Voter ID"
              name="votername"
              value = {voterName}
              onChange= {(e) => setvoterName(e.target.value)}
            />
            {/* Voter ID */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Voter ID"
              name="voterid"
              value={voterID}
              onChange={ (e) => {setvoterID(e.target.value) }}
            />
            {/* Phone Number */}
            <TextField 
              margin="normal"
              required
              fullWidth
              label="Phone Number with Country Code"
              name="phoneNumber"
              value = {phoneNumber}
              inputProps={{
              inputmode: 'tel', 
              pattern: '[0-9]*', }}
              onChange={(e) => { setphoneNumber(e.target.value) }}
            />
            {/* Generate OTP Button */}
            <Button 
            onClick={sendOTP}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ display: !show ? "block" : "none" }}>
              Send OTP
            </Button>
            {/* CAPTCHA to generate OTP */}
            <div id="recaptcha-container" style={{ display: !show ? "block" : "none" }}></div>
            <Box component="form" validate sx={{ mt: 1 }}>
              {/* OTP */}
              <TextField
                margin="normal"
                required
                fullWidth
                label="OTP"
                name="OTP"
                value = {OTP}
                onChange={(e) => { setOTP(e.target.value) }}
              />
              {/* Verify Voter Button */}
              <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              type="submit">
                Verify
              </Button>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    
  );
}

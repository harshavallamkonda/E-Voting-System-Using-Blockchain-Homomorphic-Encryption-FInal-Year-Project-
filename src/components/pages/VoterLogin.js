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
  const [errors, setErrors] = React.useState({})

  const validate = () => {
    let temp = { ...errors }
    temp.voterName = temp.voterName !== "" ? "" : "This field is required"
    temp.voterID = temp.voterID !== "" ? "" : "This field is required"
    temp.phoneNumber = temp.phoneNumber !== "" ? "" : "This field is required"
    temp.otp = temp.otp !== "" ? "" : "This field is required"
    setErrors({
      ...temp
    })
  }
  
  React.useEffect(() => {
    connectDefault()
  },[])

  const sendOTP = (event) => {
    validate()
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
      console.log(voterName, voterID, phoneNumber, OTP)
      validate()
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
              value={voterName}
              onChange={ (e) => {setvoterName(e.target.value) }}
              { ...(errors.voterName && {error: true, helperText:errors.voterName})}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Voter ID"
              name="voterid"
              value={voterID}
              onChange={ (e) => {setvoterID(e.target.value) }}
              { ...(errors.voterID && {error: true, helperText:errors.voterID})}
            />
            <div style={{ display: !show ? "block" : "none" }}>
                <TextField 
                margin="normal"
                required
                fullWidth
                label="Phone Number with Country Code"
                name="phoneNumber"
                value={phoneNumber} 
                inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
                onChange={(e) => { setphoneNumber(e.target.value) }}
                { ...(errors.phoneNumber && {error:true, helperText:errors.phoneNumber})}
                />
                <br /><br />
                <div id="recaptcha-container"></div>
                <Button 
                onClick={sendOTP}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                  Send OTP
                </Button>
            </div>
            <div style={{ display: show ? "block" : "none" }}>
                <TextField
                margin="normal"
                required
                fullWidth
                label="OTP"
                name="OTP"
                value={OTP}
                onChange={(e) => { setOTP(e.target.value) }}
                { ...(errors.otp && {error:true, helperText:errors.otp})}
                />
                
                <br /><br />
                <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}>
                  Verify
                </Button>
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
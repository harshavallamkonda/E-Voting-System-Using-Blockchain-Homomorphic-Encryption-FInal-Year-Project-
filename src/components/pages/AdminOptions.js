import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
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

function AdminOptions({handleLogout}) {
  /* Function to navigate to create poll on button click */
  let navigateToCreatePoll = useNavigate();
  const routeChangeToCreatePoll = () => {
    let path = `/admin/create-poll`
    navigateToCreatePoll(path);
  }

  /* Function to navigate to constituency result on button click */
  let navigateToConstituencyResult = useNavigate();
  const routeChangeToConstituencyResult = () => {
    let path = `/admin/constituency-result`
    navigateToConstituencyResult(path);
  }

  /* Function to navigate to create poll on button click */
  let navigateToElectronResult = useNavigate();
  const routeChangeToElectionResult = () => {
    let path = `/admin/election-result`
    navigateToElectronResult(path);
  }

  const theme = createTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Admin Logout Button */}
            <Button
            fullWidth
            variant="contained"
            style={{
              borderRadius: 50,
              backgroundColor: "rgb(255, 209, 3)",
              padding: "18px 36px",
              fontSize: "18px"
            }}
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogout}
            >
              Logout from Admin
            </Button>
            {/* Create Poll Button */}
            <Button
            fullWidth
            variant="contained"
            style={{
              borderRadius: 50,
              backgroundColor: "rgb(255, 209, 3)",
              padding: "18px 36px",
              fontSize: "18px"
            }}
            sx={{ mt: 3, mb: 2 }}
            onClick = { routeChangeToCreatePoll }
            >
              Create Poll
            </Button>
            {/* Display Constituency's Result Button */}
            <Button
              fullWidth
              variant="contained"
              style={{
                borderRadius: 50,
                backgroundColor: "rgb(255, 209, 3)",
                padding: "18px 36px",
                fontSize: "18px"
              }}
              sx={{ mt: 3, mb: 2 }}
              onClick = { routeChangeToConstituencyResult }
              >
                Display Constituency's Election Result
              </Button>
              {/* Display Overall Button */}
              <Button
              fullWidth
              variant="contained"
              style={{
                borderRadius: 50,
                backgroundColor: "rgb(255, 209, 3)",
                padding: "18px 36px",
                fontSize: "18px"
              }}
              sx={{ mt: 3, mb: 2 }}
              onClick = { routeChangeToElectionResult }
              >
                Display Overall Election Result
              </Button>
            </Box>
        </Container>
      </ThemeProvider>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  )
}

export default AdminOptions;

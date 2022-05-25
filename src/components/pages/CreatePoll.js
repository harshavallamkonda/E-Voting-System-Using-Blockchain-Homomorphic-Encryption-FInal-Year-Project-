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
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { db } from "../../firebase/config";
import { Input } from '@mui/material';


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

const Gender = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Others',
    label: 'Others',
  },
];

const State = [
  {
    value: 'Karnataka',
    label: 'Karnataka',
  },
  
];


const PartyName = [
  {
    value: 'Bharatiya Janata Party',
    label: 'Bharatiya Janata Party',
  },
  {
    value: 'Indian National Congress',
    label: 'Indian National Congress',
  },
  {
    value: 'Janata Dal (Secular)',
    label: 'Janata Dal (Secular)',
  },
  {
    value: 'Aam Aadmi Party',
    label: 'Aam Aadmi Party',
  },
];
const Constituency = [
  {
    value: 'Yelahanka (Bangalore Urban District)',
    label: 'Yelahanka (Bangalore Urban District)',
  },
  {
    value: 'Krishnarajapuram (Bangalore Urban District)',
    label: 'Krishnarajapuram (Bangalore Urban District)',
  },
  {
    value: 'Manvi (Raichur District)',
    label: 'Manvi (Raichur District)',
  },
  {
    value: 'Raichur (Raichur District)',
    label: 'Raichur (Raichur District)',
  },
  {
    value: 'Haveri (Haveri District)',
    label: 'Haveri (Haveri District)',
  },
  {
    value: 'Hangal (Haveri District)',
    label: 'Hangal (Haveri District)',
  },
];


const theme = createTheme();

export default function CreatePoll() {
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [dob, setdob] = React.useState("");
  const [gender, setgender] = React.useState("");
  const [email, setemail] = React.useState("");
  const [pnum, setpnum] = React.useState("");
  const [partyname, setpartyname] = React.useState("");
  const [state, setstate] = React.useState("");
  const [constituency, setconstituency] = React.useState("");
  const [pollid, setpollid] = React.useState("");
  const [wardnum, setwardnum] = React.useState("");
  const [partyimage, setpartyimage] = React.useState("");
  const [photo, setphoto] = React.useState("");
  const [text, setText] = React.useState("");
  

  //const [imageUpload, setimageUpload] = React.useState(null);
  //const [imageUrl, setImageUrl] = React.useState(null);

 /*
  const uploadImage = async e =>{
    const files = e.target.files
    const data = new FormData()
    data.append('file',files[0])
    data.append('upload_preset','uploadPreset')
  };*/

 /* const myHandler = (events)=>{
    console.log(events.target.files)
  }
  const useStyles = makeStyles({
    root: {
        background: '#FAF3EC',
        width: 'auto',
        position: 'absolute',
        top: 'calc(50% - 240px)',
        left: 'calc(40% - 160px)',
    },
    formImage : {
        boxShadow: '0 0 10px' ,
        backgroundColor: 'white',
        width: '500px',
        height: '500px',
        display: 'flex',
        flexWrap: 'wrap',
        // border-radius:'15px 15px 15px 15px',
    },
    divForm: {
        width: '90%',
    },
    image: {
        width: "90%",
        height: "35%",
        margin: "8px"
    },
    paperRoot: {
        maxWidth: 345,
    }

});
const classes = useStyles();
*/

  /* function for navigation */
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/admin/options`
    navigate(path);
  }



  

  
  
 /* function handleChange(e) {
      let url = URL.createObjectURL(e.target.files[0]);
      setFile(url)
      console.log(url)
  }*/

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(firstName,lastName, email,dob,gender,email,pnum,partyname,state,constituency,pollid,wardnum,photo);

    db.collection("test")
        .add({

          firstname:{firstName},
          lastname:{lastName},
          email:{email},
          dob:{dob},
          phonenumber:{pnum},
          gender:{gender},
          partyname: {partyname},
          pollid:{pollid},
          state:{state},
          wardnum:{wardnum},
          constituency:{constituency},
          photo:{photo},
          partyimage:{partyimage},
          //image:URL.createObjectURL(formData.stepThree.image.fileName),
          //image:formData.stepThree.image.fileName,
          //partyimage:formData.stepTwo.partyimage.fileName,

        }).then(() => {
          alert("Submitted!!!");
        })
        .catch((error) => {
          alert(error.message);
        } );
      }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
              <Typography component="h2" variant="h5">
                Enter Election and Candidate Details
              </Typography>
              <Box component="form"  validate sx={{ mt: 1 }}>
                  <Grid container spacing={3}>
                      <Grid item xs={6}>
                      
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="First Name as per Voter ID"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setfirstName(e.target.value)}
                            
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="date"
                            label=""
                            name="dob"
                            value={dob}
                            onChange={(e) => setdob(e.target.value)}
                        />
                          
                          <TextField
                          id="outlined-select-currency"
                          select
                          margin="normal"
                          required
                          fullWidth
                          label="Gender"
                          value={gender}
                          onChange={(e) => setgender(e.target.value)}
                          
                        >
                          {Gender.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <InputLabel htmlFor="contained-button-file">Upload your photo</InputLabel>
                        <Input
                          
                          id="contained-button-file"
                          type="file"
                          value={photo}
                          onChange={(e) => setphoto(e.target.value)}
                        />
                          
                      </Grid>  
                      <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Last Name as per Voter ID"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setlastName(e.target.value)}
                        />
                      
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Enter your Email-ID"
                            name="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Enter your Phone Number"
                            type="number"
                            name="pnum"
                            value={pnum}
                            onChange={(e) => setpnum(e.target.value)}
                        />
                  </Grid>
                  <Grid item xs={6}>
                    
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Enter your POLL-ID "
                        name="pollid"
                        value={pollid}
                        onChange={(e) => setpollid(e.target.value)}
                    />
                      
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Enter The Ward number..."
                        name="wardnum"
                        value={wardnum}
                        onChange={(e) => setwardnum(e.target.value)}
                    />
                      <TextField
                        id="outlined-select-currency"
                        select
                        margin="normal"
                        required
                        fullWidth
                        label="Party Name"
                        value={partyname}
                        onChange={(e) => setpartyname(e.target.value)}
                        
                      >
                        {PartyName.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <InputLabel htmlFor="contained-button-file">Upload party Image</InputLabel>
                      <Input
                        id="contained-button-file"
                        type="file"
                        value={partyimage}
                        onChange={(e) => setpartyimage(e.target.value)}
                      />
                    </Grid>  
                    <Grid item xs={6}>
                          <TextField
                            id="outlined-select-currency"
                            select
                            margin="normal"
                            required
                            fullWidth
                            label="State"
                            value={state}
                            onChange={(e) => setstate(e.target.value)}
                            
                          >
                            {State.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                            id="outlined-select-currency"
                            select
                            margin="normal"
                            required
                            fullWidth
                            label="Constituency"
                            value={constituency}
                            onChange={(e) => setconstituency(e.target.value)}
                            
                          >
                            {Constituency.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                            </TextField>
                      
                      </Grid>
                   
                
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={submitHandler} 
                        
                      >
                        Submit
                      </Button>
                    </Grid>  
                  </Box>
              
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    
  );
}
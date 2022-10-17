import React, { useEffect } from 'react'
import { Card, CardActions, CardContent, Typography, Button, TextField } from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css'



const Register = () => {
    const [data, setData] = React.useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e != undefined) {
            setData({ ...data, [e.target.name]: e.target.value })
        }
    }
  
    const handleSubmit = (e) => {
        Axios.post("https://61ef7787732d93001778e3c3.mockapi.io/register",
            {
                name: data.name, email: data.email, dob: data.dob,
                bloodgroup: data.bloodgroup, fathername: data.fathername, mothername: data.mothername,
                username: data.name, password: data.password
            })
            .then(
                (response) => {
                    if (response.status == 201) {
                        navigate('/')


                    }
                });
    };

    return (
        <div className='card'>
            
            <Card sx={{ width: '30%', marginLeft: '38%', marginTop: '8%'}}>
                <CardContent >
                    <Typography sx={{ fontSize: 14, marginLeft: '32%', marginBottom: "2%" }} color="text.secondary" gutterBottom>
                      Create Your Account
                    </Typography>
                  < div className='text'>
                  <TextField
                             style={{ width: '20rem', marginBottom: "3%", marginRight: "3%" }}
                            variant='outlined'
                            name='name'
                            label=" Enter User Name"
                            onChange={handleChange}
                        />
                        <TextField
                            style={{ width: '20rem', marginBottom: "3%" }}
                            variant='outlined'
                            name="email"
                            label="Enter User Email"
                            onChange={handleChange}
                        />
                        <TextField
                            style={{ width: '20rem', marginBottom: "3%", marginRight: "3%" }}
                            variant='outlined'
                            name="phoneNumber"
                            label="Phone Number"
                            onChange={handleChange}
                        />
                        <TextField
                            style={{ width: '20rem', marginBottom: "3%" }}
                            variant='outlined'
                            name="password"
                            label="Password"
                            onChange={handleChange}
                        />  
                  </div>
                       
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                    <Button style={{textTransform:"lowercase"}}  onClick={handleSubmit}>Add Users</Button>
                    <Button style={{textTransform:"lowercase"}}  onClick={() => navigate('/')}> Back to Login</Button>

                </CardActions>
            </Card>


        </div>
    )
}

export default Register;
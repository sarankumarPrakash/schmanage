import React, { useEffect } from 'react'
import { Card, CardActions, CardContent, Typography, Button, TextField } from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const [data, setData] = React.useState({});
    // const [details, setDetails] = React.useState();
    const navigate = useNavigate();
    const [open, setOpen]=React.useState(false);

    const handleChange = (e) => {
        if (e != undefined) {
            setData({ ...data, [e.target.name]: e.target.value })
        }
    }
const  handleClose=()=>{
    setOpen(!open)
}
    const handleSubmit = (e) => {
        console.log(data.name[0]);
        Axios.post("https://61ef7787732d93001778e3c3.mockapi.io/register",
            {
                name:data.name,email:data.email,dob:data.dob,
                bloodgroup:data.bloodgroup,fathername:data.fathername,mothername:data.mothername,
                username:data.name,password:data.password
            })
            .then(
                (response) => {
                    console.log(response)
                    if (response.status == 201) {
                        navigate('/')
                      

                    }
                });
    };

    



    return (
        <div>

            <Card sx={{ width:'50%',marginLeft:'24%',marginTop:'8%' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14,marginLeft:'42%',marginBottom:"2%" }} color="text.secondary" gutterBottom>
                        Register 
                    </Typography>

                    <div  >
                            <TextField
                                style={{ width: '20rem', marginBottom: "3%", marginRight: "3%" }}
                                variant='outlined'
                                name='name'
                                label=" Enter Student  Name"
                                onChange={handleChange}
                            />
                            <TextField
                                style={{ width: '20rem', marginBottom: "3%" }}
                                variant='outlined'
                                name="email"
                                label="Enter Student Email"
                                onChange={handleChange}

                            />

                        </div>

                        <div>
                            <TextField
                                style={{ width: '20rem', marginBottom: "3%", marginRight: "3%" }}
                                variant='outlined'
                                name="dob"
                                label="Date of Birth"
                                onChange={handleChange}

                            />
                            <TextField
                                style={{ width: '20rem', marginBottom: "3%" }}
                                variant='outlined'
                                name="bloodgroup"
                                label="Blood Group"
                                onChange={handleChange}

                            />

                        </div>


                        <div>
                            <TextField
                                style={{ width: '20rem', marginBottom: "3%", marginRight: "3%" }}
                                variant='outlined'
                                name="fatherName"
                                label="Father Name"
                                onChange={handleChange}

                            />
                            <TextField
                                style={{ width: '20rem', marginBottom: "3%" }}
                                variant='outlined'
                                name='mothername'
                                label="Mother Name"
                                onChange={handleChange}

                            />

                        </div>
                        
                        <div>
                           
                            <TextField
                                style={{ width: '20rem', marginBottom: "3%" }}
                                variant='outlined'
                                name='password'
                                label="Password"
                                onChange={handleChange}

                            />

                        </div>
                </CardContent>
                <CardActions style={{justifyContent:'center'}}>
                    <Button size="small" onClick={handleSubmit}>Add Details</Button>
                    <Button size="small" onClick={()=>navigate('/')}> Login</Button>

                </CardActions>
            </Card>


        </div>
    )
}

export default Register;
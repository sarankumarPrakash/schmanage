import React, { useEffect } from 'react'
import { Card, CardActions, CardContent, Typography, Button, TextField } from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css'



const Login = () => {
    const [data, setData] = React.useState({});
    const [details, setDetails] = React.useState();
    const navigate = useNavigate();


    useEffect(() => {
        Axios.get("https://61ef7787732d93001778e3c3.mockapi.io/register").then((response) => {
            let result = response.data;
            setDetails(result);
        });
    }, []);

    const handleChange = (e) => {
        if (e != undefined) {
            setData({ ...data, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = () => {

        for (let value in details)
            if (details[value]) {
                if (data.email === details[value]?.email) {
                    if (data.password === details[value]?.password) {
                        navigate('/student')
                    }
                }
            }

    }
    



    return (
        <div>

            <Card sx={{ width:'32%',marginLeft:'34%',marginTop:'8%' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 18,marginLeft:'42%',marginBottom:"2%" }} color="text.secondary" gutterBottom>
                        Sign in 
                    </Typography>
           <div className='login'>
           <TextField
                        style={{ width: '20rem', marginBottom: "3%", marginRight: "3%" }}
                        variant='outlined'
                        name="email"
                        label="Enter Your Email"
                        onChange={handleChange}

                    />
                    <TextField
                        style={{ width: '20rem', marginBottom: "3%", marginRight: "3%" }}
                        variant='outlined'
                        name="password"
                        label="Enter Your password"
                        onChange={handleChange}

                    />

           </div>
                 
                </CardContent>
                <CardActions style={{justifyContent:'center'}}>
                    <Button   style={{textTransform:"lowercase"}} onClick={handleSubmit}> Login</Button>
                    <Button  style={{textTransform:"lowercase"}} onClick={()=>navigate('/register')}> new User..</Button>
                </CardActions>
            </Card>


        </div>
    )
}

export default Login;
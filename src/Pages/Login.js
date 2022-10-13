import React, { useEffect } from 'react'
import { Card, CardActions, CardContent, Typography, Button, TextField } from '@mui/material';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';



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
                console.log(details[value].name, details[value].password);
                if (data.email === details[value]?.email) {
                    if (data.password === details[value]?.password) {
                        console.log(details[value]?.email, details[value]?.password)
                        navigate('/student')
                        console.log('data');
                    }
                }
            }

    }
    



    return (
        <div>

            <Card sx={{ width:'50%',marginLeft:'24%',marginTop:'8%' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 18,marginLeft:'42%',marginBottom:"2%" }} color="text.secondary" gutterBottom>
                        Sign in 
                    </Typography>

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

                </CardContent>
                <CardActions style={{justifyContent:'center'}}>
                    <Button size="small" onClick={handleSubmit}> Login</Button>
                    <Button size="small" onClick={()=>navigate('/register')}> Register</Button>

                </CardActions>
            </Card>


        </div>
    )
}

export default Login;
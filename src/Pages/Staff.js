import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Snackbar,CardContent, Typography, CardActions, TextField, Button, Backdrop, Card } from '@mui/material'
import Axios from 'axios';
import DrawerToggle from './DrawerToggle';
import '../App.css'



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Staff Name ', width: 270 },
    { field: 'mobile', headerName: 'Contact Number ', width: 230 },
    { field: 'email', headerName: 'E Mail', width: 330, },
    { field: 'dob', headerName: 'DOB', width: 350, },

];



const Staff = () => {
    const [state, setState] = React.useState({ left: false });
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({})
    const [staff, setUseStaff] = React.useState({})
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    useEffect(() => {
        Axios.get("https://61ef7787732d93001778e3c3.mockapi.io/Staff").then((response) => {
            let result = response.data;
            setUseStaff(result);
        });
    }, []);
    const handleChange = (e) => {
        if (e != undefined) {
            setData({
                ...data,
                [e.target.name]: [e.target.value],
            });
        }
    }

    
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const handleSubmit = () => {
        Axios.post("https://61ef7787732d93001778e3c3.mockapi.io/register",
        {
            name: data.userName, email: data.email, number: data.number,
            dob: data.dob
         })
        .then(
            (response) => {
                if (response.status === 201) {
                    handleClose();
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        This is a success message!
                    </Snackbar>

                }
            });       
    }


    return (
        <div>
           <DrawerToggle />
            <Button style={{ float: 'right', marginRight: '4rem', marginTop: '4rem', marginBottom: '2rem' }} variant="contained" onClick={handleToggle} > Add Staff </Button>

            <DataGrid
                style={{ height: 400, width: '100%' }}
                rows={staff}
                columns={columns}
                rowsPerPemailOptions={[5]}
                checkboxSelection
            />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            // onClick={handleClose}
            >
                <Card sx={{ minWidth: 775, height: "20rem" }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                            Staff Details Portal
                        </Typography>

                        <div  >
                            <TextField
                                style={{ width: '20rem', marginBottom: "3%", marginRight: "3%" }}
                                variant='outlined'
                                name="userName"
                                onChange={handleChange}
                                label=" Enter Staff Name"
                            />
                            <TextField
                                style={{ width: '20rem', marginBottom: "3%" }}
                                variant='outlined'
                                name="email"
                                onChange={handleChange}
                                label="Enter Email"
                            />

                        </div>

                        <div>
                            <TextField
                                style={{ width: '20rem', marginBottom: "3%", marginRight: "3%" }}
                                variant='outlined'
                                name="number"
                                onChange={handleChange}
                                label="Contact Number"
                            />
                            <TextField
                                style={{ width: '20rem', marginBottom: "3%" }}
                                variant='outlined'
                                onChange={handleChange}
                                name='dob'
                                label="Date of birth"
                            />

                        </div>

                    </CardContent>
                    <CardActions style={{ marginTop: "3rem", justifyContent: 'center' }}>
                        <Button variant="contained" onClick={handleSubmit} > Add staff </Button>
                        <Button variant="contained" onClick={handleClose} > Cancel </Button>

                    </CardActions>
                </Card>
            </Backdrop>
        </div>
    )
}

export default Staff;
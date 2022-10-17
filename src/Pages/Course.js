import React, { useEffect } from 'react';
import {Snackbar, CardContent, Typography, CardActions, TextField, Button, Backdrop, Card } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Axios from 'axios';
import DrawerToggle from './DrawerToggle';


import '../App.css'
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'coursename', headerName: 'Course Name ', width: 270 },
    { field: 'staffName', headerName: 'Staff Number ', width: 230 },
];

const Course = () => {
    const animatedComponents = makeAnimated();
    const [data, setData] = React.useState({})

    const [state, setState] = React.useState({ left: false });
    const [open, setOpen] = React.useState(false);
    const [course,setCourse]=React.useState({})
    const [coursename, setCoursename] = React.useState([])


    useEffect(() => {
        Axios.get("https://61ef7787732d93001778e3c3.mockapi.io/course").then((response) => {
            let result = response.data;
            setCourse(result)
            setCoursename(result.map((data)=>{return {'value' : data.coursename , 'label' :data.coursename ,'staff':data.staffName}}))
    }, []);
})
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    }


    const handleChange = (e) => {
        if (e != undefined) {
            if(e?.target?.name){
                setData({...data,[e.target.name]: e.target.value, });
            }else{
                let value=(e.map((data)=>{return data.value}));
                if(value){
                  setData({ ...data,'staff':value[0]})
            }
        }
        }
        
    }

    const handleSubmit=()=>{
        Axios.post("https://61ef7787732d93001778e3c3.mockapi.io/register",
        {
            name: data.course, staff: data.staff
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
            <Button style={{ float: 'right', marginRight: '4rem', marginTop: '4rem', marginBottom: '2rem' }} variant="contained" onClick={handleToggle} > Add Course </Button>

            <DataGrid
                style={{ height: 400, width: '100%' }}
                rows={course}
                columns={columns}
                rowsPerPemailOptions={[5]}
                checkboxSelection
            />


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <Card sx={{ minWidth: 575, height: "20rem" }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                            Course Details Portal
                        </Typography>

                        <div>
                            <TextField
                                style={{ width: '34rem', marginBottom: "5%" }}
                                variant='outlined'
                                label="Enter Course Name"
                                name="courseName"
                                onChange={handleChange}
                            />
                            {/* <Typography sx={{ fontSize: 14}}> Select Staff</Typography> */}
                            <Select
                                style={{ width: '20rem', marginTop: "4%" }}
                                isMulti
                                placeholder="Enter your course"
                                name="course"
                                options={coursename}
                                components={animatedComponents}
                                onChange={handleChange}
                            />
                        </div>

                    </CardContent>
                    <CardActions style={{ marginTop: "4rem", justifyContent: 'center' }}>
                        <Button variant="contained" onClick={handleSubmit}> Add Course </Button>
                        <Button variant="contained" onClick={handleClose} > Cancel </Button>
                    </CardActions>
                </Card>
            </Backdrop>
        </div>
    )

    }
export default Course;
import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Snackbar, CardContent, Typography, CardActions, TextField, Button, List, ListItem, ListItemButton, ListItemText, Box, Drawer, Backdrop, Card } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Dropzone, FileItem } from "@dropzone-ui/react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import '../App.css'
import Axios from 'axios';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Student Name ', width: 150 },
    { field: 'email', headerName: 'Email ', width: 120 },
    { field: 'dob', headerName: 'Date of Birth', width: 120, },
    { field: 'bloodgroup', headerName: 'Blood Group', width: 120, },
    { field: 'fathername', headerName: 'Father Name ', width: 150 },
    { field: 'mothername', headerName: 'Mother Name', width: 150, },
    { field: 'address', headerName: 'Addrress', width: 120, },
    { field: 'coursename', headerName: 'Course Name', width: 150, },
    { field: 'staff', headerName: 'Staff Name', width: 150, },
];


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const Student = () => {
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();

    const [state, setState] = React.useState({ left: false });
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState([])
    const [student, setStudent] = React.useState({})
    const [data, setData] = React.useState({})


    useEffect(() => {
        Axios.get("https://61ef7787732d93001778e3c3.mockapi.io/student").then((response) => {
            let result = response.data;
            setStudent(result);
        });
    }, []);
    console.log(data)
    const handleStudent = (e) => {
        console.log(data.name[0]);
        Axios.post("https://61ef7787732d93001778e3c3.mockapi.io/register",
            {
                name:data.name,email:data.email,dob:data.dob,
                bloodgroup:data.bloodgroup,fathername:data.fathername,mothername:data.mothername,
                address:data.address,username:data.name
            })
            .then(
                (response) => {
                    console.log(response)
                    if (response.status == 201) {
                        handleClose();
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                This is a success message!
                            
                        </Snackbar>

                    }
                });
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary={'Student Portal'} onClick={() => navigate('/student')} />

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary={'Course Portal'} onClick={() => navigate('/course')} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>

                        <ListItemText primary={'Staff portal'} onClick={() => navigate('/staff')} />
                    </ListItemButton>
                </ListItem>
            </List>

        </Box>
    )
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const updateFiles = (incommingFiles) => {
        setFile(incommingFiles);
    };
    const handleChange = (e) => {
        if (e != undefined) {
            setData({
                ...data,
                [e.target.name]: e.target.value,
            });
        }
    }

    console.log(data)

    return (
        <div>
            <MenuIcon onClick={toggleDrawer('left', true)} style={{ marginLeft: '2rem', marginTop: '4rem' }} />
            <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
            <Button style={{ float: 'right', marginRight: '4rem', marginTop: '4rem', marginBottom: '2rem' }} variant="contained" onClick={handleToggle} > Add Student </Button>

            <DataGrid
                style={{ height: 400, width: '100%' }}
                rows={student}
                columns={columns}
                rowsPerPemailOptions={[5]}
                checkboxSelection
            />



            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            // onClick={handleClose}
            >
                <Card sx={file.length === 0 ? { minWidth: 775, height: "40rem" } : { minWidth: 775, height: "45rem" }} >
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                            Student Details Portal
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
                                style={{ width: '20rem', marginBottom: "3%", marginRight: "3%", float: 'left' }}
                                variant='outlined'
                                name="courseName"
                                label="Course Name"
                                onChange={handleChange}

                            />
                            <Select
                                style={{ width: '89%', marginTop: "1%" }}
                                isMulti
                                name="course"
                                options={options}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                // onChange={handleChange}


                            />
                        </div>
                        <div>
                            <Dropzone onChange={updateFiles} value={file} style={{ width: '20rem', minHeight: '9rem', marginTop: '1rem' }}>
                                {file.map((file) => (
                                    <FileItem {...file} preview
                                        onChange={handleChange}
                                    />
                                ))}
                            </Dropzone>
                        </div>


                    </CardContent>
                    <CardActions style={file.length === 0 ? { marginTop: "5rem", justifyContent: 'center' } : { marginTop: "-0.9rem", justifyContent: 'center' }}>
                        <Button variant="contained" onClick={handleStudent} > Add Student </Button>
                        <Button variant="contained" onClick={handleClose} > Cancel </Button>

                    </CardActions>
                </Card>
            </Backdrop>
        </div>
    )
}

export default Student;
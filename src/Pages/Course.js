import React,{useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CardContent, Typography, CardActions, TextField, Button, List, ListItem, ListItemButton, ListItemText, Box, Drawer, Backdrop, Card } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Axios from 'axios';

import '../App.css'
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'coursename', headerName: 'Course Name ', width: 270 },
    { field: 'staffName', headerName: 'Staff Number ', width: 230 },


];
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const Course = () => {
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();

    const [state, setState] = React.useState({ left: false });
    const [open, setOpen] = React.useState(false);
    const [course,setCourse]=React.useState({})

    useEffect(() => {
        Axios.get("https://61ef7787732d93001778e3c3.mockapi.io/course").then((response) => {
            let result = response.data;
            setCourse(result);
        });
    }, []);
    console.log(course);
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
            // onClick={handleClose}
            >
                <Card sx={{ minWidth: 575 ,height:"20rem" }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                            Course Details Portal
                        </Typography>

                        <div>
                            <TextField
                                style={{ width: '34rem', marginBottom: "1%" }}
                                variant='outlined'
                                label="Enter Course Name"
                            />
                            {/* <Typography sx={{ fontSize: 14}}> Select Staff</Typography> */}
                            <Select
                                style={{  marginTop: "1%" }}
                                isMulti
                                options={options}
                                closeMenuOnSelect={false}
                                components={animatedComponents}

                            />
                        </div>

                    </CardContent>
                    <CardActions  style={{marginTop:"7rem" ,justifyContent:'center'}}>
                        <Button variant="contained"> Add Course </Button>
                        <Button variant="contained" onClick={handleClose} > Cancel </Button>

                    </CardActions>
                </Card>
            </Backdrop>
        </div>
    )
}

export default Course;
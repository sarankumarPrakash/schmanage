import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Snackbar,IconButton, CardContent, Typography, CardActions, TextField, Button, Backdrop, Card } from '@mui/material'
import CloseIcon from '@mui/icons-material/Menu';
import { Dropzone, FileItem } from "@dropzone-ui/react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import '../App.css'
import Axios from 'axios';
import DrawerToggle from './DrawerToggle';


const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
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




const Student = () => {
    const animatedComponents = makeAnimated();

    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState([])
    const [student, setStudent] = React.useState({})
    const [staff, setStaff] = React.useState({})
    const [coursename, setCoursename] = React.useState([])
    const [data, setData] = React.useState({})

    useEffect(() => {
        Axios.get("https://61ef7787732d93001778e3c3.mockapi.io/student").then((response) => {
            let result = response.data;
            setStudent(result);
        });


        Axios.get("https://61ef7787732d93001778e3c3.mockapi.io/course").then((response) => {
            let fresult = response.data;
            // setSubject(fresult.map((value)=>{return {'course':value.coursename}}))
            setCoursename(fresult.map((data)=>{return {'value' : data.coursename , 'label' :data.coursename ,'staff':data.staffName}}))
        });
      
    }, []);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const updateFiles = (incommingFiles) => {
        setFile(incommingFiles);
        setData({...data,'file':incommingFiles.files})
     
    };

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    const handleStudent = (e) => {
        Axios.post("https://61ef7787732d93001778e3c3.mockapi.io/register",
            {
                name: data.name, email: data.email, dob: data.dob,
                bloodgroup: data.bloodgroup, fathername: data.fathername, mothername: data.mothername,
                address: data.address, username: data.name ,course:data.course,file:data.file
            })
            .then(
                (response) => {
                    console.log(response)
                    if (response.status === 201) {
                        <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message="Student Details Added sucessfully"
                        action={action}
                      />
                      handleClose()

                    }
                });
    };
 
    const handleChange = (e) => {
        if (e != undefined) {
            if(e?.target?.name){
                setData({...data,[e.target.name]: e.target.value, });
            }else{
                let value=(e.map((data)=>{return data.value}));
                if(value){
                  let staffData =(coursename.filter((data)=>{return data.value===value[0]}))
                  staffData=(staffData.map((data)=>{return data.staff})) 
                  setStaff(staffData.join(','));
                  setData({ ...data,'course':value[0]})
            }
        }
        }
    
        
    }
    return (
        <div>
            <DrawerToggle />
            <Button style={{ float: 'right', marginRight: '4rem', marginTop: '4rem', marginBottom: '2rem' }} variant="contained" onClick={handleToggle} > Add Student </Button>

            <DataGrid
                style={{ height: 400, width: '100%' }}
                rows={student}
                columns={columns}
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
                                style={{ width: '20rem', marginBottom: "3%", marginRight: "1%", float: 'left' }}
                                variant='outlined'
                                name="staffName"
                                label="staff Name"
                                value={staff.length>0 ? staff:""}
                                onChange={handleChange}
                            />
                            <div className='dropdown'>
                            <Select
                                style={{ width: '20rem', marginTop: "1%" }}
                                isMulti
                                placeholder="Enter your course"
                                name="course"
                                options={coursename}
                                components={animatedComponents}
                                onChange={handleChange}
                            />
                            </div>
                        </div>
                        <div >
                            <Dropzone onChange={updateFiles}  style={{ width: '42rem', minHeight: '9rem', marginTop: '1rem' }}>
                              <div style={{minHeight:'-2rem'}}>
                              {file.map((file) => (
                                    <FileItem {...file} preview
                                    />
                                ))}
                              </div>
                                
                            </Dropzone>
                        </div>


                    </CardContent>
                    <CardActions style={ { marginTop: "4rem", justifyContent: 'center' }}>
                        <Button variant="contained" onClick={handleStudent} > Add Student </Button>
                        <Button variant="contained" onClick={handleClose} > Cancel </Button>

                    </CardActions>
                </Card>
            </Backdrop>
        </div>
    )
}

export default Student;
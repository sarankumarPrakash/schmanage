import React from 'react'
import {List, ListItem, ListItemButton, ListItemText, Box, Drawer,}   from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export const DrawerToggle = () => {

    const [state, setState] = React.useState({ left: false });
    const navigate=useNavigate();

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

    </div>
  )
}
export default DrawerToggle;

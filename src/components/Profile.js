import React from 'react'
import '../css/Profile.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Logo from '../assets/logo1.png';
import Productos from '../components/Productos.js';

function Profile(){

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const imagen = JSON.parse(localStorage.getItem('imagen'));
    const nombre = JSON.parse(localStorage.getItem('nombre'));
    const apellido = JSON.parse(localStorage.getItem('apellido'));

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("usuario");
        localStorage.removeItem("nombre");
        localStorage.removeItem("apellido");
        localStorage.removeItem("imagen");

        window.location.href ="/";

    };
    
    return (
        <div className='root'>
            <AppBar position='static' color='secondary'>
                <Toolbar>
                    <img src={Logo} width={"70px"} height={"45px"} alt="Logo" className='logoimg'/>
                    <Typography variant="h5" className='textol' fontFamily={'Kaushan Script'}>
                    Deleite Primaveral 
                    </Typography>
                    <div>
                        <IconButton onClick={handleMenu} color="inherit">
                            <Avatar src={imagen}/>
                        </IconButton>
                        <Menu 
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}> 
                            
                            <MenuItem> {nombre} {apellido} </MenuItem>
                            <MenuItem>User: {usuario} </MenuItem>
                            <MenuItem onClick={handleLogout}> Logout </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar> 
            <Productos/>
        </div>
        
    )
}

export default Profile
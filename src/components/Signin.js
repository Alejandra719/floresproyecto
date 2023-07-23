import React, { useState } from 'react';
import swal from 'sweetalert';
import '../css/Signin.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


async function login(credenciales){
    return fetch('https://648521eca795d24810b6b9c7.mockapi.io/api/v1/Usuarios',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credenciales)

    })
    .then(data => data.json())
}

function Signin() {
    const [usuario, setusuario] = useState();
    const [clave, setclave] = useState();

    const submit = async e => {
        e.preventDefault();
        const response = await login({
            usuario,
            clave
        });
        if(response.id!==0){
            swal("Success", response.usuario, "success", {
                buttons: false,
                timer: 2000,
            })
            .then((value) => {

                localStorage.setItem('id', response['id']);
                localStorage.setItem("usuario", JSON.stringify(response['usuario']));
                localStorage.setItem("nombre", JSON.stringify(response['nombre']));
                localStorage.setItem("apellido", JSON.stringify(response['apellido']));
                localStorage.setItem("imagen", JSON.stringify(response['imagen']));
                window.location.href= "/profile";
            });
        }else{
            swal("Failed", response.usuario, "error");
        }
    }
    
    return (
        <div className="fondo">
            <div className="box-inicio">
                <div className="icono"></div>
                <Typography component="h1" variant="h5" className="titulo">
                    Sign-In
                </Typography><br/>
                <form noValidate onSubmit={submit}>
                    <TextField 
                        variant="outlined"
                        size="small"
                        id="usuario"
                        name="usuario"
                        label="Username"
                        onChange={e => setusuario(e.target.value)}
                    /><br/><br/>
                    <TextField 
                        variant="outlined"
                        size="small"
                        type="password"
                        id="clave"
                        name="clave"
                        label="Password"
                        onChange={e => setclave(e.target.value)}
                    /><br/><br/>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className='submit'>
                        Ingresar
                    </Button>
                </form>
            </div>
        </div>
    );
}


export default Signin;
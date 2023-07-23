import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import '../css/productoDetalle.css';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';

const ProductoDetalle = () => {

  const {prodID}  = useParams();

  const [ListadoProductos, setListadoProductos] = useState([]);
  
  useEffect(() => {
    fetch("https://648521eca795d24810b6b9c7.mockapi.io/api/v1/flores")
    .then((Listado) => Listado.json())  
    .then((Listado) => {
        setListadoProductos(Listado);
    }) 
  }, []);

  const elproducto = ListadoProductos.find( product => product.id === prodID)  
    if(!elproducto){
        return(
          <Typography variant='h4' component='h1' align='center' style={{ fontFamily: "'Zilla Slab', serif" }}>
            NO HAY PRODUCTOS
          </Typography>
        )
    }

  return (
    <>
    <div className='div1'>
        <img src={elproducto.imagen} className='imagen1' alt='logo'/>
        <div className='div2' >
          <Typography variant='h4' component='h1' align='center' style={{ fontFamily: "'Zilla Slab', serif" }}>
          {elproducto.nombreFlor}
          </Typography><br/>
          <Typography variant='h5' style={{ fontFamily: "'Antic', sans-serif"}} >
            Paquete x 25 Tallos
          </Typography><br/>
          <Typography variant='h5' style={{ fontFamily: "'Antic', sans-serif"}}>
          Precio: $ {elproducto.precio}
          </Typography><br/>
          <Typography variant='h6' style={{ fontFamily: "'Antic', sans-serif"}} align="justify" >
          Descripcion: {elproducto.descripcion}
          </Typography><br/>
          <Typography variant='h5' style={{ fontFamily: "'Antic', sans-serif"}}>
          Cantidad disponible: {elproducto.cantidad}
          </Typography>

        </div>
      </div>
      <br/>
      <div className='botonn'>
      
          <Button variant="outlined" size="medium" color="primary" >
            <Link to={`/`} className='linea'>Volver a Productos</Link>
          </Button>
          </div>
</>
  )
}

export default ProductoDetalle
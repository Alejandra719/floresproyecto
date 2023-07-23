import '../css/Productos.css';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const useStyles = makeStyles({
  root: {
    width: 220,
    height:330,
  },
});
const Productos = () => {

  const classes = useStyles();
  const [ListadoProductos, setListadoProductos] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    fetchData();
    fetchCategorias();
    // eslint-disable-next-line
  },[paginaActual, categoriaFiltro]);

  const fetchData = () => {
    const startPagina = (paginaActual - 1) * 5;
    const endPagina = (startPagina + 5);
    var url= 'https://648521eca795d24810b6b9c7.mockapi.io/api/v1/flores';
    if(categoriaFiltro){
      url += `?categoria=${categoriaFiltro}`;
    }
    fetch(url)
    .then((Listado) => Listado.json())  
    .then((Listado) => {
      const paginasData = Listado.slice(startPagina, endPagina);
        setListadoProductos(paginasData);
        setTotalRegistros(Listado.length);
    }) 
  }

  const sigPagina = () => {
    setPaginaActual(paginaActual+1);
  }

  const antPagina = () => {
    setPaginaActual(paginaActual-1);
  }

  const fetchCategorias = () => {
    fetch('https://648521eca795d24810b6b9c7.mockapi.io/api/v1/flores')
    .then((datos) => datos.json())  
    .then((datos) => {
        const catUnicas = [...new Set(datos.map((prod)=>prod.categoria))]
        setCategorias(catUnicas);
    }) 
  }



  return(
    <div className='container' >
    <br></br>
    <Typography variant='h4' component='h6' color='primary' style={{ fontFamily: "'Zilla Slab', serif" }}>
    &nbsp;&nbsp;&nbsp;&nbsp;Productos
          </Typography>
        <div align= 'center'>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 130,}} >
            <InputLabel id="demo-simple-select-standard-label" color='secondary' >Categoria</InputLabel>
            <Select
              value={categoriaFiltro}
              onChange={(event) => setCategoriaFiltro(event.target.value)}>
              
              <MenuItem value="">Todas</MenuItem>
              {categorias.map((cat, index) => (
                <MenuItem key={index} value={cat}> {cat} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>



    <div class="flex-container">
    {ListadoProductos.map(prod => (
          <div key={prod.id} >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={prod.nombreFlor}
            height="150"
            image={prod.imagen}
            title={prod.nombreFlor}
          />
        <CardContent>
        <div className='titulo'>
        <Typography gutterBottom variant="h8" component="h2" align='center'>
          {prod.nombreFlor}
          </Typography>
        </div>
          
          <Typography variant="body2" component="p" align='center'>
            Paquete x 25 Tallos
          </Typography>
          <Typography variant="body2" component="p" align='center'>
            Precio: $ {prod.precio}
          </Typography>
        </CardContent>
        </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" fullWidth>
            <Link to={`/productos/${prod.id}`} className='linea'>Ver mas detalles</Link>
            </Button>
          </CardActions>
      </Card>
      </div>
      ))}
      </div>
      <br></br>
      <div align = 'center' style={{ fontFamily: "'Antic', sans-serif"}}>
      <Button variant="outlined" color='primary' onClick={antPagina} disabled = {paginaActual === 1}> Anterior </Button>
      &nbsp;&nbsp;Pagina {paginaActual} de {Math.ceil(totalRegistros/5)}&nbsp;&nbsp;
      <Button variant="outlined" color='primary' onClick={sigPagina} disabled = {paginaActual === Math.ceil(totalRegistros/5)}> Siguiente </Button>
      </div>
      <br></br>
    </div>
    );
}

export default Productos









  


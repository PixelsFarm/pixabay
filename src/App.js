import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './components/Formulario/Formulario'
import ListadoImagenes from './components/ListadoImagenes/ListadoImagenes'

function App() {

	const [resultado, guardarResultado] = useState()
	const [imagenes, guardarImagenes] = useState()

	useEffect(() => {
        const consultarAPI = async() => {
			if (resultado === undefined) return

			// https://pixabay.com/api/docs/
			// api: https://pixabay.com/api/
			// key: 19478409-afee65a3a105012235ddd1909

			const key = '19478409-afee65a3a105012235ddd1909'
			const url = `https://pixabay.com/api/?key=${key}&q=${resultado}&image_type=photo`
			const recogeJson = await axios.get(url)
			const recogeImagenes = recogeJson.data.hits
			//console.log(recogeImagenes)
			guardarImagenes(recogeImagenes)
		}
		consultarAPI()
		
	}, [resultado])
	
	const componente = imagenes ? <ListadoImagenes imagenes={imagenes} /> : null

    return (
		<div className="container">
			<div className="jumbotron">
				<p className="lead text-center">Buscador de imágenes</p>
				<Formulario
					guardarResultado={guardarResultado}
				/>
				
				{componente}
			</div>
		</div>
	);
}

export default App;

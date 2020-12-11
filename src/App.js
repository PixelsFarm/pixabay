import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './components/Formulario/Formulario'
import ListadoImagenes from './components/ListadoImagenes/ListadoImagenes'

function App() {

	const [resultado, guardarResultado] = useState('')
	const [imagenes, guardarImagenes] = useState([])
	const [paginaactual, guardarPaginaActual] = useState(1)  
	const [totalpaginas, guardarTotalPaginas] = useState(5) 

	useEffect(() => {

        const consultarAPI = async () => {
			if (resultado.trim() === '') return

			// https://pixabay.com/api/docs/
			// api: https://pixabay.com/api/
			// key: 19478409-afee65a3a105012235ddd1909
			const key = '19478409-afee65a3a105012235ddd1909'
			const imagenesPorPagina = 30
			const url = `https://pixabay.com/api/?key=${key}&q=${resultado}&image_type=photo&per_page=${imagenesPorPagina}&page=${paginaactual}`
			const recogeJson = await axios.get(url)
			const recogeImagenes = recogeJson.data.hits

			//console.log(recogeJson)
			//console.log(recogeImagenes)
			guardarImagenes(recogeImagenes)

			//* calcular total páginas
			const calcularTotalPaginas = Math.ceil(recogeImagenes.totalHits / imagenesPorPagina)
			guardarTotalPaginas(calcularTotalPaginas)

			//* mover scroll a inicio al clickar boton siguiente o anterior
			const jumbotron = document.querySelector('.jumbotron')
			jumbotron.scrollIntoView({behavior: 'smooth'})
		}
		consultarAPI()
		
	}, [resultado, paginaactual])

	const paginaAnterior = () => {
		const nuevaPaginaActual = paginaactual - 1

		if (nuevaPaginaActual === 0) return;

		guardarPaginaActual(nuevaPaginaActual)
		console.log(nuevaPaginaActual)
	}

	const paginaSiguiente = () => {
		const nuevaPaginaActual = paginaactual + 1

		if (nuevaPaginaActual > totalpaginas) return;

		guardarPaginaActual(nuevaPaginaActual)
		console.log(nuevaPaginaActual)
	}
	
	const sinResultados = imagenes === '' ? <p>sin resultados</p> : null 
	const componente = imagenes ? <ListadoImagenes imagenes={imagenes} /> : null

    return (
		<div className="container">
			<div className="jumbotron">
				<p className="lead text-center">Buscador de imágenes</p>
				<Formulario
					guardarResultado={guardarResultado}
				/>
				{sinResultados}
				{componente}

				{
					(paginaactual === 1) ? null : (
						<button
							type="button"
							onClick={paginaAnterior}
						>Anterior</button>
					)
				}

				{
					(paginaactual >= totalpaginas) ? null : (
						<button
							type="button"
							onClick={paginaSiguiente}
						>Siguiente</button>
					)
				}
				
				

				
			</div>
		</div>
	);
}

export default App;

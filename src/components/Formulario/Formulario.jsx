import React, { useState } from 'react'
import Error from '../Error/Error'
import PropTypes from 'prop-types'

const Formulario = ({ guardarResultado }) => {

    const [ busqueda, guardarBusqueda ] = useState('')
    const [ error, guardarError ] = useState(false)

    const onSubmit = e => {
        e.preventDefault()
        //console.log(busqueda)

        //* validar
        if (busqueda.trim() === '') {
            guardarError(true)
            return
        }
        
        //* ok
        guardarError(false)
        guardarResultado(busqueda)
    }

    return (
        <form onSubmit={onSubmit}>
            { error ? <Error mensaje="Introduce un término de búsqueda" /> : null }

            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg" 
                        placeholder="Busca una imagen"
                        onChange={e => guardarBusqueda(e.target.value)}
                        value={busqueda}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block" 
                        value="Buscar" 
                    />
                </div>
            </div>
        </form>
    );
}

Formulario.propTypes = {
    guardarResultado: PropTypes.func.isRequired
}
 
export default Formulario;
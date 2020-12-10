import React from 'react'
import PropTypes from 'prop-types'


const Imagen = ({ imagen }) => {
    return (
        <div className="col-xs-12 col-md-3">
            <img src={imagen.previewURL} alt={imagen.tags}/>
            <a href={imagen.pageURL}>Ver</a>
        </div>
    );
}

Imagen.propTypes = {
    imagen: PropTypes.object.isRequired
}
 
export default Imagen;
import React, { Fragment, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    
    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false)


    //Funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Cuando el usuario presiona agregar cita
    const submitCita = e => {
        e.preventDefault();

        console.log(mascota);

        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        //Eliminar el mensaje previo
        actualizarError(false);

        // Asignar un ID
        cita.id = uuidv4();
        

        //Crear la cita

        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })

    }


    return ( 
        <Fragment>
            <h2>Create appointment</h2>

            { error ? <p className="alerta-error">All fields are required</p>   
            : null }

            <form
                onSubmit={submitCita}
            >

                <label>Pet Name</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Pet Name"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Owner Name</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Owner Name"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Date</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hour</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                   <label>Symptoms</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"  
                    onChange={actualizarState}
                    value={sintomas} // esto  nos permite formatear u eliminar el formulario
                ></textarea>

                <button
                type="submit"
                className="u-full-width button-primary"
                >Add Appointment</button>
            </form>
        </Fragment>
     );
}


Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;
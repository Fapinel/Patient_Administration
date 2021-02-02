import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }


  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    //console.log('Documento listo o algo paso con las citas');
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
     } else {
        localStorage.setItem('citas', JSON.stringify([]));
      }
    }, [citas] );


  //Función que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
      guardarCitas([
        ...citas,
        cita
      ]);
  }

  //Función que elimina una cita por su id
  const eliminarCita= id => {
   // console.log(id);
   const nuevasCitas = citas.filter(cita => cita.id !== id );
   guardarCitas(nuevasCitas);
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ?  'No appointments' : 'Manage your Appointments'; 
  //console.log(citas.length);




  return (
    <Fragment>
      <h1>Patient Administration</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario 
                crearCita={crearCita}
              /> 

          </div>
          <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita
                 key={cita.id}
                 cita={cita}
                 eliminarCita={eliminarCita}
                />
              ))}
          </div>
        </div>
      </div>
      </Fragment>
  );
}

export default App;
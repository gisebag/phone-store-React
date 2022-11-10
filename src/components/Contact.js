import { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {

    const [formName, SetFormName] = useState('');

    // Funciones para mandar un alert simulando la funcionalidad del formulario
  
    const handleSubmit = (e) => {
        e.preventDefault()
               Swal.fire({
                    title:`Gracias por comunicarte con nosotros ${formName}.`,
                    text: 'Pronto nos pondremos en contacto.',
                    icon: 'success',
                    backdrop: true
                })
    }

    return(
    <div className="contactBox Contenedor">
        <h1>Contáctate<br/> con nosotros</h1>
        <form onSubmit={handleSubmit} className="formDeContacto">
            <input  type="text"
                    id="nombre" 
                    className="btn"
                    placeholder="Tu nombre" 
                    required 
                    name="nombre" 
                    value={formName} 
                    onChange={(e) => SetFormName(e.target.value)}/>
            <input type="text" 
                   id="apellido" 
                   className="btn"
                   placeholder="Tu apellido" 
                   required 
                   name="apellido" />
            <input type="email" 
                   id="email" 
                   className="btn"
                   placeholder="Tu email"
                   required 
                   name="email"/>
            <textarea id="consulta" 
                      cols="30" 
                      rows="5" 
                      className="btn" 
                      placeholder="Tu consulta" 
                      required 
                      name="consulta" />
            <input type="submit" id="send" className="btnSend" placeholder="Enviar" />
        </form>
    </div>
    );
}
export default Contact;
import React, { useEffect, useState } from "react";
import RequiredInput from "./RequiredInput";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

// import './LoginForm.css'

const FormChangeEvent = (props) => {

    const [showAlert, setShowAlert] = useState(true);
    const [valid, setValid] = useState(false);
    const [validations, setValidations] = useState([
        { input: 'date', valid: false },
        { input: 'title', valid: false },
        ])

    function checkForm() {
        setValid(validations.map(inp => inp.valid).reduce((resultado, valido) => resultado && valido))
    }

    function valRequired(el,state) {
        validations.forEach ( inp => {
            if (inp.input === el)
                inp.valid = state;
        })
        checkForm();
    }
    
    {/* Alert não atualiza estado corretamente */}
    const alert = () => {
        if (showAlert) {
            return (
                <Alert variant="danger">
                    <Alert.Heading>Atenção!</Alert.Heading>
                    <p>
                        Se alterar os dados do evento, não poderá recuperar os dados anteriores!
                    </p>
                </Alert>
            );
        };
    }

    useEffect(() => { checkForm(); console.log(valid)},[valid])
    
    return (
        <form id="changeEvent">
            <RequiredInput id="date"
            type="date"
            name="date" label="Data:" onRequired={valRequired} error="Tem de indicar uma data válida (dd/mm/aaaa)" />
            <RequiredInput id="event" name="event" label="Evento:" onRequired={valRequired} pattern={/^.{3,250}$/} error="Tem que especificar o evento (3-250 carac.)" />
            {alert()}
            <Button variant="primary" form="changeEvent" onSubmit={props.onSubmit} type="submit" disabled={!valid}>Alterar Evento</Button>
            <Button variant="secondary" onClick={props.onClick}>Fechar</Button>
        </form>
    );

}

export default FormChangeEvent;
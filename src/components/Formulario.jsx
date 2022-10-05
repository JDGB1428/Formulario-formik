import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import exportFromJSON from "export-from-json";
import "../css/styles.css"

export const Formulario = () => {
    const [checkForm, setCheckForm] = useState(false);
    const [information, setInformation] = React.useState([])

    const Titulo = "FORMULARIO DE REGISTRO"
    return (
        <>
            <Formik
                initialValues={{
                    nombre: '',
                    codigo: '',
                    fecha: '',
                    direccion: '',
                    telefono: '',
                    celular: '',
                    correo: '',
                }}
                validate={(valores) => {
                    let errores = {}

                    if (!valores.nombre) {
                        errores.nombre = 'Por favor ingresa un nombre'
                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
                        errores.nombre = 'El nombre solo puede contener letras y espacios'
                    }

                    if (!valores.correo) {
                        errores.correo = 'Por favor ingresa el correo'
                    } else if (!/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(valores.correo)) {
                        errores.correo = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
                    }

                    if (!valores.telefono) {
                        errores.telefono = 'Por favor ingrese el telefono'
                    } else if (!/^\d{7}$/.test(valores.telefono)) {
                        errores.telefono = 'Debe tener minimo siete digitos'
                    }

                    if (!valores.fecha) {
                        errores.fecha = 'Por favor ingrese la fecha de ingreso'
                    } else if (!/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[/\\/](19|20)\d{2}$/.test(valores.fecha)) {
                        errores.fecha = 'Complete el campo'
                    }

                    if (!valores.codigo) {
                        errores.codigo = 'Por favor ingrese el codigo estudiante'
                    } else if (!/^[1-9][0-9]{7}$/.test(valores.codigo)) {
                        errores.codigo = 'el codigo debe tener maximo ocho digitos'
                    }

                    if (!valores.celular) {
                        errores.celular = 'Por favor ingrese su celular'
                    } else if (!/^[3][0-9]{9}$/.test(valores.celular)) {
                        errores.celular = 'El numero de celular debe comenzar con el numero "3", por favor intente de nuevo'
                        errores.celular = 'El numero debe tener maximo 10'
                    }

                    if (!valores.direccion) {
                        errores.direccion = 'Por favor ingrese la direccion'
                    } else if (! /[A-Za-z0-9#'\.\-\s\,]$/.test(valores.direccion)) {
                        errores.direccion = 'Ingrese nuevamente la direccion'
                    }
                    return errores;
                }}
                onSubmit={(valores, { resetForm }) => {
                    setInformation([...information, valores])
                    resetForm();
                    console.log('Formulario enviado')
                    setCheckForm(true);
                    setTimeout(() => setCheckForm(false), 5000);
                }}
            >
                {({ errors }) => (
                    <Form className="formulario">
                        <h3>{Titulo}</h3>
                        <label htmlFor='nombre'>Nombre</label>
                        <Field
                            className="field"
                            type="text"
                            name="nombre"
                            placeholder="Ingrese su nombre"

                        />
                        <ErrorMessage name="nombre" component={() => (
                            <div className="error">{errors.nombre}</div>
                        )} />
                        <label htmlFor='codigo'>Codigo estudiante</label>
                        <Field
                            className="field"
                            type="text"
                            name="codigo"
                            placeholder="Ingrese su codigo"

                        />
                        <ErrorMessage name="codigo" component={() => (
                            <div className="error">{errors.codigo}</div>
                        )} />
                        <label htmlFor='fecha'>Fecha de ingreso</label>
                        <Field
                            className="field"
                            type="text"
                            name="fecha"
                            placeholder="Ingrese su fecha de ingreso"

                        />
                        <ErrorMessage name="fecha" component={() => (
                            <div className="error">{errors.fecha}</div>
                        )} />
                        <label htmlFor='telefono'>Telefono</label>
                        <Field
                            className="field"
                            type="text"
                            name="telefono"
                            placeholder="Ingrese su telefono"

                        />
                        <ErrorMessage name="telefono" component={() => (
                            <div className="error">{errors.telefono}</div>
                        )} />
                        <label htmlFor='direccion'>Direccion</label>
                        <Field
                            className="field"
                            type="text"
                            name="direccion"
                            placeholder="Ingrese su direccion"

                        />
                        <ErrorMessage name="direccion" component={() => (
                            <div className="error">{errors.direccion}</div>
                        )} />
                        <label htmlFor='celular'>Celular</label>
                        <Field
                            className="field"
                            type="text"
                            name="celular"
                            placeholder="Ingrese su celular"

                        />
                        <ErrorMessage name="celular" component={() => (
                            <div className="error">{errors.celular}</div>
                        )} />
                        <label htmlFor='correo'>Correo electronico</label>
                        <Field
                            className="field"
                            type="text"
                            name="correo"
                            placeholder="example@correo.com"

                        />
                        <ErrorMessage name="correo" component={() => (
                            <div className="error">{errors.correo}</div>
                        )} />
                        <button type="submit" className="btn-submit">Enviar</button>
                        <button type="submit" className="btn-submit" onClick={() => toTXT(information)}>Exportar TXT</button>
                        <button type="submit" className="btn-submit" onClick={() => toJSON(information)}>Exportar JSON</button>
                        <button type="submit" className="btn-submit" onClick={() => toXML(information)}>Exportar XML</button>
                        <button type="submit" className="btn-submit" onClick={() => toExcel(information)}>Exportar EXCEL</button>
                        {checkForm && <p className="exito">Formulario enviado con exito</p>}
                    </Form>

                )}

            </Formik>

        </>
    )

}

function toTXT(datos) {
    //hecho por juan david
    const archivo = JSON.stringify(datos);
    const blob = new Blob([archivo], { type: "text/plain" });
    //
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.download = "datos.txt";
    enlace.href = url;
    enlace.click();
}

function toJSON(datos) {
    const archivo = JSON.stringify(datos);
    const blob = new Blob([archivo], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.download = "datos.json";
    enlace.href = url;
    enlace.click();
}
let fields = ["nombre",
    "codigo",
    "fecha",
    "direccion",
    "telefono",
    "celular",
    "correo",]

function toXML(data) {
    const fileName = "datos";

    const exportType = "xml";
    exportFromJSON({ data, fileName, fields, exportType });
}

function toExcel(data){
    const fileName = "datos";
  
    const exportType = "csv";
    exportFromJSON({ data, fileName, fields, exportType });
}
import React, { Component } from 'react';
import uuid from 'uuid';

const stateInicial = {
	cita: {
		mascota: '',
		propietario: '',
		fecha: '',
		hora: '',
		sintomas: ''
	},
	error: false
};

class NuevaCita extends Component {
	state = {
		...stateInicial
	};

	//cuando el usuario envio el formulario
	handleSubmit = (e) => {
		e.preventDefault();

		//extraer los valores del state
		const { mascota, propietario, fecha, hora, sintomas } = this.state.cita;

		//validar que todos los campos esten llenos
		if (mascota === '' || propietario === '' || fecha === '' || hora === '' || sintomas === '') {
			this.setState({
				error: true
			});

			// detener la ejecucion

			return;
		}

		//generar objeto con los datos
		const nuevaCita = { ...this.state.cita };
		nuevaCita.id = uuid();

		//agregar la cita del state de App
		this.props.crearNuevaCita(nuevaCita);

		//Colocar en el state el stateinicial
		this.setState({
			...stateInicial
		});
	};

	//cuando el susuario escribe en los inputs
	handleChange = (e) => {
		console.log(e.target.value);
		this.setState({
			cita: {
				...this.state.cita, //copio el state para cuando escribo un valor los demas no se borren :O que chido
				[e.target.name]: e.target.value
			}
		});
	};

	render() {
		//estraer el valor de state
		const { error } = this.state;
		return (
			<div className="card mt-5 py-5">
				<div className="card-body">
					<h2 className="card-title text-center mb-5">LLena el formulario para crear una nueva cita</h2>
					{error ? (
						<div className="alert alert-danger mt-2 mb-5">Todos los campos son obligatorios</div>
					) : null}
					<form onSubmit={this.handleSubmit}>
						<div className="form-group row">
							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
								Nombre Mascota
							</label>
							<div className="col-sm-8 col-lg-10">
								<input
									type="text"
									className="form-control"
									placeholder="Nombre mascora"
									name="mascota"
									onChange={this.handleChange}
									value={this.state.cita.mascota}
								/>
							</div>
						</div>
						<div className="form-group row">
							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
								Nombre Dueño
							</label>
							<div className="col-sm-8 col-lg-10">
								<input
									type="text"
									className="form-control"
									placeholder="Nombre Dueño Mascota"
									name="propietario"
									onChange={this.handleChange}
									value={this.state.cita.propietario}
								/>
							</div>
						</div>
						<div className="form-group row">
							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
								Fecha
							</label>
							<div className="col-sm-8 col-lg-4">
								<input
									type="date"
									className="form-control"
									name="fecha"
									onChange={this.handleChange}
									value={this.state.cita.fecha}
								/>
							</div>

							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
								Hora
							</label>
							<div className="col-sm-8 col-lg-4">
								<input
									type="time"
									className="form-control"
									name="hora"
									onChange={this.handleChange}
									value={this.state.cita.hora}
								/>
							</div>
						</div>
						<div className="form-group row">
							<label htmlFor="" className="col-sm-4 col-lg-2 col-form-label">
								Sintomas
							</label>
							<div className="col-sm-8 col-lg-10">
								<textarea
									className="form-control"
									name="sintomas"
									placeholder="Describe los sintomas"
									onChange={this.handleChange}
									value={this.state.cita.sintomas}
								/>
							</div>
						</div>
						<input
							type="submit"
							className="py-3 mt-2 btn btn-success btn-block"
							value="Agregar Nueva Cita"
						/>
					</form>
				</div>
			</div>
		);
	}
}

export default NuevaCita;

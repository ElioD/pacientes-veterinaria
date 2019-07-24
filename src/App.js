import React from 'react';
import './bootstrap.min.css';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';

class App extends React.Component {
	state = {
		citas: []
	};

	//Cuando la aplicacion carga
	componentDidMount() {
		const citasLS = localStorage.getItem('citas');

		if (citasLS) {
			this.setState({
				citas: JSON.parse(citasLS)
			});
		}
	}

	//cuando eliminamos o agregamos una nueva cita
	componentDidUpdate() {
		localStorage.setItem('citas', JSON.stringify(this.state.citas));
	}

	crearNuevaCita = (datos) => {
		//copiar el state actual para no perder los datos :D que genial por x2
		const citas = [ ...this.state.citas, datos ];
		//agregar el nuevo state
		this.setState({
			citas
		});
	};

	//Eliminar cita
	eliminarCita = (id) => {
		//tomas una copia del state
		const citasActuales = [ ...this.state.citas ];

		//utilizar filter para buscar el ID
		const citas = citasActuales.filter((cita) => cita.id !== id);

		//actualizar el state
		this.setState({
			citas
		});
	};

	render() {
		return (
			<div className="container">
				<Header titulo="Administrador citas veterinaria" />
				<div className="col-md-10 mx-auto">
					<NuevaCita crearNuevaCita={this.crearNuevaCita} />
				</div>
				<div className="mt-5 col-md-10 mx-auto">
					<ListaCitas citas={this.state.citas} eliminarCita={this.eliminarCita} />
				</div>
			</div>
		);
	}
}

export default App;

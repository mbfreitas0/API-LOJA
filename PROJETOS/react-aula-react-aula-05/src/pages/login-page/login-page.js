import React from 'react'

class LoginPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            music: "rock",
            subscribe: false,
            os: "windows"
        }

    }

    getError(field){

        if(field == "os"){
            if(this.state.os == "windows"){
                return (
                    <small className="form-text text-danger">Ja ouviu falar de unix?</small>
                )
            }
        }

        return null;
    }

    render() {

        const musics = [
            {value : "rock", label: "Rock"},
            {value : "pop", label: "Pop"},
            {value : "funk", label: "Funk"},
        ]

        const oss = [
            {value : "windows", label: "Windows"},
            {value : "linux", label: "Linux"},
            {value : "mac", label: "Mac"},
        ]

        return (
            <div className="container">
                <h1>I'm login page</h1>

                <div className="row mb-5 mt-5">
                    <div className="col-6">
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <h3>Nome</h3>
                                    <p>{this.state.name}</p>
                                </li>
                                <li className="list-group-item">
                                    <h3>Music</h3>
                                    <p>{this.state.music}</p>
                                </li>
                                <li className="list-group-item">
                                    <h3>Receber e-mail chato?</h3>
                                    <p>{this.state.subscribe ? "sim" : "não"}</p>
                                </li>
                                <li className="list-group-item">
                                    <h3>Sistema Operacional</h3>
                                    <p>{this.state.os}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" 
                                className="form-control" 
                                id="name" 
                                value={this.state.name} 
                                onChange={(e) => this.setState({name : e.target.value})} />
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="music">Estilo musical</label>
                            <select className="form-control" 
                                id="music" 
                                value={this.state.music} 
                                onChange={(e) => this.setState({music : e.target.value})}>
                                    {musics.map(item => (
                                        <option key={item.value} value={item.value}>{item.label}</option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-check">
                            <input className="form-check-input" 
                                type="checkbox" 
                                id="subscribe" 
                                checked={this.state.subscribe} 
                                onChange={e => this.setState({ subscribe : e.target.checked })} />
                            <label className="form-check-label" htmlFor="subscribe">
                                Inscrever-se na Newsletter
                            </label>
                        </div>
                    </div>

                    <div className="col">
                        {oss.map(item => (
                            <div className="form-check" key={item.value}>
                                <input className="form-check-input"
                                    type="radio"
                                    id={item.value}
                                    value={item.value}
                                    checked={this.state.os === item.value}
                                    onChange={e => this.setState({ os: e.target.value })}
                                />
                                <label className="form-check-label" htmlFor={item.value}>{item.label}</label>
                            </div>
                        ))}
                        {this.getError("os")}
                    </div>

                </div>

            </div>
        )
    }

}

export default LoginPage;

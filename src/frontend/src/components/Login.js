import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import LoginImg from '../images/login.png';

const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: '',
        senha: ''
    });

    const {email, senha} = inputs;
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    }

    const onSubmitForm = async e => {
        e.preventDefault();

        try {

            const body = {email, senha}
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            });

            
            const parseResponse = await response.json();

            localStorage.setItem("token", parseResponse.token);
            setAuth(true);

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className='col-md-6'>
                        <img src={LoginImg} alt="Login" className="img-fluid mx-auto d-block"/>
                    </div>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Login</h5>
                                <form onSubmit={onSubmitForm}>
                                    <input type="email" name='email' className='form-control my-3' placeholder="Email" value={email} onChange={e => onChange(e)} />
                                    <input type="password" name='senha' className='form-control my-3' placeholder="Senha" value={senha} onChange={e => onChange(e)}/>
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-success btn-block'>Entrar</button>
                                    </div>
                                </form>
                            </div>
                            
                            <div className='d-flex justify-content-end p-3'>
                                <Link className='btn btn-success btn-block' to="/register">Register</Link>
                            </div>
                        </div>
                    
                    </div>
                    
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
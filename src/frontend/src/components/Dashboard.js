import React, { Fragment, useState, useEffect } from 'react';
import WalletImg from '../images/wallet.png';
import PropTypes from 'prop-types';

const Dashboard = ({ setAuth, saldo, realizarTransacao }) => {

    const [name, setName] = useState('');

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseResponse = await response.json();

            setName(parseResponse.nome)
        } catch (err) {
            console.error(err.message);
        }

    }

    const logout = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    useEffect(() => {
        getName();
    })

    const [valores, atualizarValores] = useState({ transacao: '', valor: 0 });

    function handleChange(e) {
        const { name, value } = e.target;
        const valoresAtualizados = { ...valores, [name]: value };

        atualizarValores(valoresAtualizados);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const dataTransacao = new Date().toLocaleDateString('pt-br');
        realizarTransacao({ ...valores, data: dataTransacao });
    }


    return (
        <Fragment>

            <div className="container">
                <div className='d-flex justify-content-end mt-4'>
                    <button className='btn btn-primary' onClick={e => logout(e)} >Sair</button>
                </div>

                <div className="row align-items-center justify-content-center">
                    <div className='col-md-6'>
                        <img src={WalletImg} alt="Login" className="img-fluid mx-auto d-block" />
                    </div>
                    <div className='col-md-6'>
                        <div className='row'>
                            <h2 className='text-center'>Olá, {name}</h2>

                        </div>

                        <h5 className='card-title'>Saldo: <span data-testid="saldo-conta" className="Saldo-valor">{`R$ ${saldo}`}</span></h5>

                        <form onSubmit={handleSubmit} className='row'>
                            <div className='col-md-6 text-center'>
                                <label>Depósito</label>
                                <br />
                                <input type="radio" name="transacao" value="deposito" onChange={handleChange} data-testid="transacao" checked={valores.transacao === 'deposito'} />

                            </div>

                            <div className='col-md-6 text-center'>
                                <label>Saque</label>
                                <br />
                                <input type="radio" name="transacao" value="saque" onChange={handleChange} data-testid="transacao" checked={valores.transacao === 'saque'} />

                            </div>

                            <div className='col-md-6 mt-4'>
                                <input type="text" className='form-control' placeholder='Valor' />
                                <br />
                                <button className='btn btn-success btn-block' type='submit'>Realizar Operação    </button>
                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </Fragment>
    );
};

Dashboard.defaultProps = {
    saldo: 0,
}

Dashboard.propTypes = {
    saldo: PropTypes.number,
};

export default Dashboard;
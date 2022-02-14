import React, { Fragment, useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import api from './api';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Conta from './conta/Conta';

export const calcularNovoSaldo = (valores, saldo) => {
    if (valores.transacao === 'deposito') {
        return saldo + parseInt(valores.valor)
    } else {
        return saldo - parseInt(valores.valor);
    }
}

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    }

    async function isAuth() {
        try {
            const response = await fetch("http://localhost:5000/auth/is-verify", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseResponse = await response.json();

            parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

        } catch (err) {
            console.error(err.message);
        }
    }
 
    const [saldo, atualizarSaldo] = useState(100);
    const [transacoes, atualizarTransacoes] = useState([]);

    async function carregarTransacoes() {
        const transacoes = await api.listaTransacoes();
        atualizarTransacoes(transacoes);
    }

    async function obterSaldo() {
        atualizarSaldo(await api.buscaSaldo());
    }

    function realizarTransacao(valores) {
        const novoSaldo = calcularNovoSaldo(valores, saldo);

        api.atualizaSaldo(novoSaldo).catch((error) => console.error(error))
        api.atualizaTransacoes(valores).catch((error) => console.error(error))

        atualizarSaldo(novoSaldo);
        atualizarTransacoes([valores]);
    }

    useEffect(() => {
        isAuth();
        obterSaldo();
        carregarTransacoes();
    }, [saldo])

    return (
        <Fragment >
            <BrowserRouter>
                <div className='container'>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={!isAuthenticated ? (<Login setAuth={setAuth} />) : (<Navigate to="/dashboard" />)}
                        />

                        <Route
                            exact
                            path="/register"
                            element={!isAuthenticated ? (<Register setAuth={setAuth} />) : (<Navigate to="/dashboard" />)}

                        />

                        <Route
                            exact
                            path="/dashboard"
                            element={isAuthenticated ? (<Dashboard saldo={saldo} realizarTransacao={realizarTransacao}/> ) : (<Navigate to="/" />)}
                            
                        />
                    </Routes>
                </div>
            </BrowserRouter>
            
            
        </Fragment>
    )
}

export default App;
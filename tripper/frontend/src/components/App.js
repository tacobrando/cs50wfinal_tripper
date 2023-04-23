import React, { Component } from 'react'
import ReactDOMClient from 'react-dom/client';
import { HashRouter as Router, Route, Routes, Redirect } from 'react-router-dom'

import Menu from './layout/Menu'
import Header from './layout/Header'
import Options from './layout/Options'

import Alert from './errors/Alert'

import Posts from './posts/Posts'
import Register from './auth/Register'
import Login from './auth/Login'

import { Provider } from 'react-redux'
import store from '../store'
import { loadUser } from '../actions/auth'
import PublicRoutes from './common/PublicRoutes';

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        function capitaliseFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return (
            <Provider store={store}>
                <Router>
                    <Alert />
                    <div className="page-layout grid grid-cols-12 bg-black text-white">
                        <Routes>
                            <Route path="/signup" element={<PublicRoutes><Register /></PublicRoutes>} />
                            <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
                        </Routes>
                        <div className="nav-menu bg-black 2xl:col-span-4 xl:col-span-3 md:col-span-2 top-0 left-0 md:w-full sticky h-screen ">
                            <Menu capitaliseFirst={capitaliseFirst} />
                        </div>
                        <div  
                            className="
                                content-container 
                                bg-black
                                col-span-11
                                2xl:col-span-4
                                xl:col-span-5
                                lg:col-span-7
                                md:col-span-7
                                w-full 
                                text-center
                                border
                                border-b-0
                              border-dark-grey
                            "
                        >
                            <div className="header-container sticky top-0 z-20">
                                <Header />
                            </div>
                            <div className="body-container">
                                <Posts capitaliseFirst={capitaliseFirst} />
                            </div>  
                            </div>
                            <aside className="page-options w-full text-start h-screen sticky top-0 right-0 hidden lg:block lg:col-span-3 xl:col-span-4">
                                <Options />
                            </aside>
                    </div>
                </Router>
            </Provider>
        )
    }
}

const container = document.getElementById('app')

const root = ReactDOMClient.createRoot(container)

root.render(<App />)
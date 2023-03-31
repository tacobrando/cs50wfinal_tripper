import React, { Component } from 'react'
import ReactDOMClient from 'react-dom/client';

import Menu from './layout/Menu'
import Header from './layout/Header'
import Post from './posts/Post'

class App extends Component {
    render() {
        return (
            <div className="page-layout grid grid-cols-12 bg-black text-white">
                <div className="nav-menu lg:col-span-3 md:col-span-2 sm:col-span-1">
                    <Menu />
                </div>
                <div style={{height: "200vh"}} className="content-container col-span-5 w-full text-center">
                    <Header />
                    <div className="post-container">
                        <Post />
                    </div>
                </div>
                <aside className="page-options col-span-4 w-full text-start border-l border-dark-grey h-screen sticky top-0 right-0">
                    Options
                </aside>
            </div>
        )
    }
}

const container = document.getElementById('app')

const root = ReactDOMClient.createRoot(container)

root.render(<App />)
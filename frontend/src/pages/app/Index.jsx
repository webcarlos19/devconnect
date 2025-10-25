import { useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import Navbar from '../../components/App/Navbar/Navbar'

function AppSocial() {

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar do App */}
            <Navbar />

            {/* Conteúdo Principal */}
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default AppSocial
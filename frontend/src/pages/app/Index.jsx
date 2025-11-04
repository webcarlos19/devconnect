import { useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import Navbar from '../../components/App/Navbar/Navbar'

function AppSocial() {

    return (
        <div className="min-h-screen min-w-screen bg-[#0B0B0B]  ">
            {/* Navbar do App */}
            <Navbar /> 
            

            {/* Conteúdo Principal */}
            <main className="container mx-auto px-4 py-8">
                
                <Outlet />
            </main>
        </div>
    )
}

export default AppSocial
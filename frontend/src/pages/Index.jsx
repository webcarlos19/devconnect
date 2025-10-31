import { useEffect, useState } from 'react'

function Index() {
    const [login, setLogin] = useState(false)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-blue-700 mb-8">SOCIAL.DEV - Inicio</h1>

            <div className="grid gap-4">
                <h2 className="text-2xl font-semibold mb-4">Faça login ou cadastre-se</h2>
            </div>
        </div>
    )
}

export default Index
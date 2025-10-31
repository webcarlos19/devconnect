function NotFound() {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
            <p className="text-gray-600 mb-8">
                A página que você está procurando não existe.
            </p>
            <a
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Voltar ao Início
            </a>
        </div>
    )
}

export default NotFound
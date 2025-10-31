function Feed() {
    return (
        <div className="container mx-auto px-4 py-8">

            {/* 🔵 Bolhas de fundo */}
        <div className="absolute top-0 left-0 w-50 h-60 bg-[#28e1ed] opacity-40 rounded-full blur-3xl transform-translate-x1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1 w-64 h-64 bg-[#28e1ed] opacity-20 rounded-full blur-3xl translate-y-1/2"></div>
        
            <h1 className="text-4xl font-bold text-blue-700 mb-8">SOCIAL.DEV - Feed</h1>

            <div className="grid gap-4">
                <h2 className="text-2xl font-semibold mb-4">Postagens</h2>
            </div>
        </div>
    )
}

export default Feed

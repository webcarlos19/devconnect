import Posts from "../../components/App/Feed/Posts/Posts"

function Feed() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Efeitos de background */}
            <div className="absolute z-10 top-0 left-0 w-50 h-60 bg-[#28e1ed] opacity-40 rounded-full blur-3xl transform-translate-x1/2 -translate-y-1/2"></div>
            <div className="absolute z-10 bottom-[200px] right-1 w-64 h-64 bg-[#28e1ed] opacity-20 rounded-full blur-3xl translate-y-1/2"></div>

            {/* Exemplo de postagens */}
            <Posts />
        </div>
    )
}

export default Feed

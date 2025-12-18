export default function UserSettings() {

return (
<div className="w-full min-h-screen black flex flex-col items-center py-0 px-4">
    <div className="w-full max-w-md bg-gray shadow-lg rounded-2xl p-6 flex flex-col gap-6">

    <div className="flex flex-col items-center gap-4">
</div>

<div className="flex flex-col gap-2">
    <label className="text-sm text-gray-600">Nome</label>
    <input
    type="text"
    placeholder="Digite seu nome"
    className="rounded-xl border p-2 focus:outline-none focus:ring focus:ring-blue-300"
    />
</div>

<div className="flex flex-col gap-2">
    <label className="text-sm text-gray-600">Username</label>
    <input
    type="text"
    placeholder="Seu nome de usuário"
    className="rounded-xl border p-2 focus:outline-none focus:ring focus:ring-blue-300"
    />
</div>

<div className="flex flex-col gap-2">
    <label className="text-sm text-gray-600">Email</label>
    <input
    type="email"
    placeholder="seuemail@exemplo.com"
    className="rounded-xl border p-2 focus:outline-none focus:ring focus:ring-blue-300"
    />
</div>

<div className="flex flex-col gap-2">
    <label className="text-sm text-gray-600">Contato</label>
    <input
    type="text"
    placeholder="(00) 00000-0000"
    className="rounded-xl border p-2 focus:outline-none focus:ring focus:ring-blue-300"
    />
</div>

    <button className="w-full flex items-center justify-between p-2 rounded-xl border text-left hover:bg-red-600 transition">
    <span className="text-sm font-medium">Alterar senha</span>
    <span className="text-gray-600">›</span>
    </button>

    <button className="w-full mt-2 rounded-xl bg-red-600 text-white py-2 hover:bg-red-700 transition">
    Sair da conta
    </button>
    </div>
</div>
);
}
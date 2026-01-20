import { useEffect, useState } from "react";
import { getMe } from "../../../services/getMe";
import { useAuth } from "../../../contexts/AuthContext";

export default function UserSettings() {
    const [userData, setUserData] = useState({
        full_name: '',
        username: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    useEffect(() => {
        getMe()
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados do usuário:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Carregando...</p>
                </div>
            </div>
        );
    }

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
                        value={userData.full_name}
                        onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                        className="rounded-xl border p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600">Username</label>
                    <input
                        type="text"
                        placeholder="Seu nome de usuário"
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        className="rounded-xl border p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-600">Email</label>
                    <input
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
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

                <button
                    onClick={logout}
                    className="w-full mt-2 rounded-xl bg-red-600 text-white py-2 hover:bg-red-700 transition"
                >
                    Sair da conta
                </button>
            </div>
        </div>
    );
}
// ============================================
// COMPONENTE DE ROTA PROTEGIDA
// ============================================
// Responsabilidade: Proteger rotas que requerem autenticação

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // Enquanto carrega, mostra loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#28E1ED] mx-auto"></div>
                    <p className="text-white/60 mt-4">Carregando...</p>
                </div>
            </div>
        );
    }

    // Se não está autenticado, redireciona para login
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Se está autenticado, renderiza o conteúdo
    return children;
}

export default ProtectedRoute;

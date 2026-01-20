import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, saveToken } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

function LoginForm() {
  const [formActive, setFormActive] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados para login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Estados para cadastro
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  // Classes CSS centralizadas - Design Tech/Hacker
  const inputClass = "w-full mb-4 px-4 py-3 rounded-sm bg-[#0a1929] border border-[#28E1ED]/30 text-white placeholder-[#28E1ED]/50 focus:outline-none focus:border-[#28E1ED] focus:ring-1 focus:ring-[#28E1ED] transition-all duration-200 text-sm";

  const buttonPrimaryClass = "w-full py-3 rounded-sm font-semibold text-[#0a1929] bg-[#28E1ED] hover:bg-[#1ec4d4] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm";

  const buttonSecondaryClass = "w-full py-3 rounded-sm font-semibold text-[#28E1ED] border border-[#1f1f1f] bg-transparent hover:bg-[#1f1f1f]/10 cursor-pointer transition-all duration-200 text-sm";

  const labelClass = "text-xs font-mono text-[white]/80 uppercase tracking-widest";

  // Alternar formulário e limpar erros
  const switchForm = (form) => {
    setFormActive(form);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login({ email: loginEmail, password: loginPassword });
      saveToken(response.data.token);
      setUser(response.data.user);
      navigate("/app");
    } catch (err) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await register({ full_name: fullName, username, email, password });
      saveToken(response.data.token);
      setUser(response.data.user);
      navigate("/app");
    } catch (err) {
      setError(err.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-left w-full max-w-[350px]">
      {/* Mensagem de erro */}
      {error && (
        <div className="mb-4 p-4 rounded-sm bg-[#d32f2f]/20 border border-[#d32f2f]/50 text-[#ff6b6b] text-sm animate-fadeIn font-mono">
          ❌ {error}
        </div>
      )}

      {/* Formulário de Login */}
      {formActive === "login" && (
        <form onSubmit={handleLogin} className="animate-fadeIn space-y-3">
          <div className="flex flex-col space-y-2">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className={inputClass}
              required
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className={labelClass}>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className={inputClass}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={buttonPrimaryClass}
          >
            {loading ? "ENTRANDO..." : "ENTRAR AGORA"}
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-[#28E1ED]/20"></div>
            <span className="px-3 text-[#28E1ED]/60 font-mono text-xs">OU</span>
            <div className="flex-1 border-t border-[#28E1ED]/20"></div>
          </div>

          <button
            type="button"
            onClick={() => switchForm("register")}
            className={buttonSecondaryClass}
          >
            CRIAR CONTA
          </button>
        </form>
      )}

      {/* Formulário de Cadastro */}
      {formActive === "register" && (
        <form onSubmit={handleRegister} className="animate-fadeIn space-y-3">
          <div className="flex flex-col space-y-2">
            <label className={labelClass}>Nome Completo</label>
            <input
              type="text"
              placeholder="João Silva"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
              required
              autoComplete="name"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className={labelClass}>Username</label>
            <input
              type="text"
              placeholder="joaosilva"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
              required
              autoComplete="username"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className={labelClass}>Senha</label>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={buttonPrimaryClass}
          >
            {loading ? "CRIANDO CONTA..." : "▶ CRIAR CONTA"}
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-[#28E1ED]/20"></div>
            <span className="px-3 text-[#28E1ED]/60 font-mono text-xs">OU</span>
            <div className="flex-1 border-t border-[#28E1ED]/20"></div>
          </div>

          <button
            type="button"
            onClick={() => switchForm("login")}
            className={buttonSecondaryClass}
          >
            VOLTAR AO LOGIN
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
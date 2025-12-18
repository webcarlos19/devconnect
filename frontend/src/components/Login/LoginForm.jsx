import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, saveToken } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

function LoginForm() {
  const [tela, setTela] = useState("inicio");
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

  const inputBase =
    "w-full mb-8 px-4 py-2 rounded-lg bg-transparent border border-white/30 text-white placeholder-white/60 focus:outline-none";

  const inputFocus = " focus:border-[#28E1ED] focus:ring-2 focus:ring-[#28E1ED]/30";

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
    <div className="text-left w-[350px]">
      {/* Mensagem de erro */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
          {error}
        </div>
      )}

      {tela === "inicio" && (
        <>
          <button
            onClick={() => setTela("login")}
            className="w-full cursor-pointer py-3 rounded-lg font-semibold text-black bg-[#28E1ED] hover:bg-[#1bd7dd] transition-shadow shadow-sm"
            style={{ boxShadow: "0 6px 20px rgba(40,225,237,0.12)" }}
          >
            Entrar agora
          </button>

          <p className="text-sm text-white/70 text-center my-4 md:my-8">OU</p>

          <button
            onClick={() => setTela("cadastro")}
            className="w-full cursor-pointer py-3 rounded-lg font-semibold text-white border border-white/40 hover:bg-white/10 transition"
          >
            Cadastrar-se
          </button>
        </>
      )}

      {tela === "login" && (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className={inputBase + inputFocus}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className={inputBase + inputFocus + " mb-8"}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-black bg-[#28E1ED] hover:bg-[#1bd7dd] transition disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: "0 6px 20px rgba(40,225,237,0.12)" }}
          >
            {loading ? "Entrando..." : "Entrar agora"}
          </button>

          <button
            type="button"
            onClick={() => {
              setTela("inicio");
              setError("");
            }}
            className="mt-4 text-sm text-white/80 hover:underline"
          >
            Voltar
          </button>
        </form>
      )}

      {tela === "cadastro" && (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputBase + inputFocus}
            required
          />
          <input
            type="text"
            placeholder="Username (ex: joaosilva)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputBase + inputFocus}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputBase + inputFocus}
            required
          />
          <input
            type="password"
            placeholder="Criar senha (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputBase + inputFocus + " mb-6"}
            required
            minLength={6}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-black bg-[#28E1ED] hover:bg-[#1bd7dd] transition disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: "0 6px 20px rgba(40,225,237,0.12)" }}
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>

          <button
            type="button"
            onClick={() => {
              setTela("inicio");
              setError("");
            }}
            className="mt-4 text-sm text-white/80 hover:underline"
          >
            Voltar
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
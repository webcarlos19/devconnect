import { useState } from "react";

function LoginForm() {
  const [tela, setTela] = useState("inicio"); 

  const inputBase =
    "w-full mb-8 px-4 py-2 rounded-lg bg-transparent border border-white/30 text-white placeholder-white/60 focus:outline-none";

  const inputFocus = " focus:border-[#28E1ED] focus:ring-2 focus:ring-[#28E1ED]/30";

  return (
    <div className="text-left w-[350px]">
   
      {tela === "inicio" && (
        <>
          <button
            onClick={() => setTela("login")}
            className="w-full py-3 rounded-lg font-semibold text-black bg-[#28E1ED] hover:bg-[#1bd7dd] transition-shadow shadow-sm"
            style={{ boxShadow: "0 6px 20px rgba(40,225,237,0.12)" }}
          >
            Entrar agora
          </button>

          <p className="text-sm text-white/70 text-center my-4">OU</p>

          <button
            onClick={() => setTela("cadastro")}
            className="w-full py-3 rounded-lg font-semibold text-white border border-white/40 hover:bg-white/10 transition"
          >
            Cadastrar-se
          </button>
        </>
      )}

      {tela === "login" && (
        <>
          <input
            type="email"
            placeholder="Email"
            className={inputBase + inputFocus}
          />
          <input
            type="password"
            placeholder="Senha"
            className={inputBase + inputFocus + " mb-8"}
          />

          <button
            className="w-full py-3 rounded-lg font-semibold text-black bg-[#28E1ED] hover:bg-[#1bd7dd] transition"
            style={{ boxShadow: "0 6px 20px rgba(40,225,237,0.12)" }}
          >
            Entrar agora
          </button>

          <button
            onClick={() => setTela("inicio")}
            className="mt-4 text-sm text-white/80 hover:underline"
          >
            Voltar
          </button>
        </>
      )}

      {tela === "cadastro" && (
        <>
          <input
            type="text"
            placeholder="Nome completo"
            className={inputBase + inputFocus}
          />
          <input
            type="email"
            placeholder="Email"
            className={inputBase + inputFocus}
          />
          <input
            type="password"
            placeholder="Criar senha"
            className={inputBase + inputFocus + " mb-6"}
          />

          <button
            className="w-full py-3 rounded-lg font-semibold text-black bg-[#28E1ED] hover:bg-[#1bd7dd] transition"
            style={{ boxShadow: "0 6px 20px rgba(40,225,237,0.12)" }}
          >
            Criar conta
          </button>

          <button
            onClick={() => setTela("inicio")}
            className="mt-4 text-sm text-white/80 hover:underline"
          >
            Voltar
          </button>
        </>
      )}
    </div>
  );
}

export default LoginForm;
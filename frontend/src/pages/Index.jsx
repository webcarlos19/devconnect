import LoginForm from "../components/Login/LoginForm";

function Index() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-[#0B0B0B] to-[#28E1ED] flex flex-col">
    
      <div className="pt-16 pl-20">
        <h1 className="text-4xl font-mono font-bold text-white tracking-wide mb-12">
          &lt;/Social.dev_&gt;
        </h1>

        <span className="text-xs font-semibold text-cyan-300 tracking-wider">
  Conheça
</span>

        <p className="text-sm text-white/80 leading-relaxed mb-12 max-w-sm">
          Uma rede social de código aberto desenvolvida pelos alunos da{" "}
          <span className="font-semibold text-white">YOUDEV</span>, disponível para uso ao público.
        </p>

        <LoginForm />
      </div>

      <footer className="mt-auto pl-20 pb-6">
        <p className="text-xs text-white/60">
          Todos os direitos reservados © 2025 | YOUDEV
        </p>
      </footer>
    </div>
  );
}

export default Index;
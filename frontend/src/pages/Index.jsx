import LoginForm from "../components/Login/LoginForm";
import Logo from "../components/Logo/Logo";

function Index() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-[#0B0B0B] to-[#28E1ED] flex flex-col justify-between px-4 py-4 md:px-20 md:py-20">

      <div className="container flex flex-col gap-4 md:gap-10">
        <Logo />

        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-cyan-300 tracking-wider">
            Conheça
          </span>

          <p className="text-sm md:text-lg text-white/80 leading-relaxed max-w-xl">
            Uma rede social de código aberto desenvolvida pelos alunos da{" "}
            <span className="font-semibold text-white">YOUDEV</span>, disponível para uso ao público.
          </p>
        </div>

        <LoginForm />
      </div>

      <footer>
        <p className="text-xs text-white/60">
          Todos os direitos reservados © 2025 | YOUDEV
        </p>
      </footer>
    </div>
  );
}

export default Index;

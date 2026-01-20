import LoginForm from "../components/Login/LoginForm";
import Logo from "../components/Logo/Logo";
import Particles from "../components/Particles/Particles";

function Index() {
  return (
    <div className="min-h-screen w-screen bg-[#0B0B0B] flex justify-between px-4 relative">
      <Particles />

      <div className="container flex flex-col gap-4 md:gap-10 py-4 md:px-20 md:py-20 w-full z-10">
        <Logo />

        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold text-[#28E1ED] tracking-wider">
            BEM-VINDO AO DEVCONNECT
          </span>

          <p className="hidden text-sm md:text-lg text-white/80 leading-relaxed max-w-xl">
            Uma rede social de código aberto desenvolvida pelos alunos da{" "}
            <span className="font-semibold text-white">WEBCARLOS.COM.BR</span>.
          </p>
        </div>

        <LoginForm />

        <footer>
          <p className="text-xs text-white/60">
            Todos os direitos reservados © 2025 | DEVCONNECT
          </p>
        </footer>
      </div>
      <div className="hidden overflow-hidden md:flex md:items-center rounded-lg bg-custom-radial my-4 w-full z-10">
      </div>
    </div>
  );
}

export default Index;

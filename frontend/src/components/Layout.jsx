import { Outlet, useNavigate } from "react-router-dom";
import AnimatedBackground from "./AnimatedBackground";

import {
  LayoutDashboard,
  Calculator,
  Users,
  Scale,
  FileText,
  LogOut
} from "lucide-react";

export default function Layout() {

  const navigate = useNavigate();

  function sair() {

    localStorage.removeItem("token");

    navigate("/");

  }

  return (
    <>
  <AnimatedBackground />

{/* <AnimatedBackground /> */}
<div
  className="min-h-screen text-white"
  style={{
    background:
      "radial-gradient(circle at top right, #1e293b, #0f172a)"
  }}
>

    {">"}

      <div className="flex">

        <aside className="w-64 min-h-screen bg-black/20 border-r border-white/10 p-6">

          <div className="mb-10">

            <h1 className="text-4xl font-black tracking-tight">

              Solv
              <span className="text-sky-400">
                ve
              </span>

            </h1>

            <p className="text-xs text-slate-400 mt-1">
              Inteligência Jurídica Clara
            </p>

          </div>

          <nav className="space-y-3">

            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-sky-500/10 hover:text-sky-300 transition-all"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </button>

            <button
              onClick={() => navigate("/novo-calculo")}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-sky-500/10 hover:text-sky-300 transition-all"
            >
              <Calculator size={20} />
              Novo Cálculo
            </button>

            <button
              onClick={() => navigate("/clientes")}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-sky-500/10 hover:text-sky-300 transition-all"
            >
              <Users size={20} />
              Clientes
            </button>

            <button
              onClick={() => navigate("/processos")}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-sky-500/10 hover:text-sky-300 transition-all"
            >
              <Scale size={20} />
              Processos
            </button>

            <button
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-sky-500/10 hover:text-sky-300 transition-all"
            >
              <FileText size={20} />
              Relatórios
            </button>

          </nav>

          <button
            onClick={sair}
            className="
              mt-10
              w-full
              flex
              items-center
              justify-center
              gap-2
              bg-gradient-to-r
              from-red-600
              to-red-500
              py-3
              rounded-xl
              hover:scale-105
              transition-all
            "
          >
            <LogOut size={18}/>
            Sair
          </button>

        </aside>

        <main className="flex-1 p-8">

          <Outlet />

        </main>

      </div>

    </div>

</>
);

}
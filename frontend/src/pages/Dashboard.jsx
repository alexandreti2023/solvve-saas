import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Calculator,
  DollarSign,
  Briefcase
} from "lucide-react";

export default function Dashboard() {

  const [calculations, setCalculations] = useState([]);
  const [clients, setClients] = useState([]);
  const [processes, setProcesses] = useState([]);

  useEffect(() => {

    carregarCalculos();
    carregarClientes();
    carregarProcessos();

  }, []);

  async function carregarCalculos() {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(
        "/calculations",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCalculations(response.data);

    } catch (error) {

      console.log(error);

    }

  }
        async function carregarClientes() {

  try {

    const token =
      localStorage.getItem("token");

    const response = await api.get(
      "/clients",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    setClients(response.data);

  } catch (error) {

    console.log(error);

  }

}
async function carregarProcessos() {

  try {

    const token =
      localStorage.getItem("token");

    const response = await api.get(
      "/processes",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    setProcesses(response.data);

  } catch (error) {

    console.log(error);

  }

}
  const valorTotal = calculations.reduce(
    (total, item) => total + Number(item.result || 0),
    0
  );

  return (

    <>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-4xl font-bold">
            Painel
          </h2>

          <p className="text-slate-400 mt-1">
            Bem-vindo à Solvve • Inteligência Jurídica Clara
          </p>

        </div>

        <div
          className="
            bg-sky-500/10
            border
            border-sky-500/20
            px-5
            py-3
            rounded-2xl
            backdrop-blur-xl
          "
        >

          <p className="text-xs text-slate-400">
            Status
          </p>

          <p className="text-sky-400 font-semibold">
            Sistema Online
          </p>

        </div>

      </div>

<div className="grid grid-cols-4 gap-6">

  {/* CÁLCULOS */}
  <div
    className="
      bg-white/[0.03]
      backdrop-blur-xl
      p-6
      rounded-3xl
      border
      border-white/10
      hover:scale-105
      transition-all
      duration-300
    "
  >

    <div className="flex items-center gap-2 mb-2">

      <Calculator
        size={18}
        className="text-sky-400"
      />

      <h3 className="text-slate-400">
        Cálculos
      </h3>

    </div>

    <p className="text-3xl font-bold">
      {calculations.length}
    </p>

  </div>

  {/* CLIENTES */}
  <div
    className="
      bg-white/[0.03]
      backdrop-blur-xl
      p-6
      rounded-3xl
      border
      border-white/10
      hover:scale-105
      transition-all
      duration-300
    "
  >

    <h3 className="text-slate-400 mb-2">
      Clientes
    </h3>

    <p className="text-3xl font-bold">
      {clients.length}
    </p>

  </div>

  {/* VALOR PROCESSADO */}
  <div
    className="
      bg-white/[0.03]
      backdrop-blur-xl
      p-6
      rounded-3xl
      border
      border-white/10
      hover:scale-105
      transition-all
      duration-300
    "
  >

    <div className="flex items-center gap-2 mb-2">

      <DollarSign
        size={18}
        className="text-green-400"
      />

      <h3 className="text-slate-400">
        Valor Processado
      </h3>

    </div>

    <p className="text-3xl font-bold">
      R$ {valorTotal.toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      })}
    </p>

  </div>

  {/* PROCESSOS */}
  <div
    className="
      bg-white/[0.03]
      backdrop-blur-xl
      p-6
      rounded-3xl
      border
      border-white/10
      hover:scale-105
      transition-all
      duration-300
    "
  >

    <div className="flex items-center gap-2 mb-2">

      <Briefcase
        size={18}
        className="text-purple-400"
      />

      <h3 className="text-slate-400">
        Processos
      </h3>

    </div>

    <p className="text-3xl font-bold">
      {processes.length}
    </p>

  </div>

</div>

      <div className="mt-10">

        <h3 className="text-xl font-bold mb-4">
          Últimos Cálculos
        </h3>

        <div
          className="
            bg-white/[0.03]
            backdrop-blur-xl
            p-6
            rounded-3xl
            border
            border-white/10
          "
        >

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10">

                <th className="p-4 text-left">
                  Título
                </th>

                <th className="p-4 text-left">
                  Valor
                </th>

                <th className="p-4 text-left">
                  Resultado
                </th>

              </tr>

            </thead>

            <tbody>

              {calculations.map((calc) => (

                <tr
                  key={calc.id}
                  className="
                    border-b
                    border-white/5
                    hover:bg-white/5
                    transition-all
                    duration-300
                  "
                >

                  <td className="p-4">
                    {calc.title}
                  </td>

                  <td className="p-4">
                    R$ {Number(calc.value).toLocaleString(
                      "pt-BR",
                      {
                        minimumFractionDigits: 2
                      }
                    )}
                  </td>

                  <td className="p-4">
                    R$ {Number(calc.result).toLocaleString(
                      "pt-BR",
                      {
                        minimumFractionDigits: 2
                      }
                    )}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </>

  );

}
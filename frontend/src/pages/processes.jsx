import { useEffect, useState } from "react";
import api from "../services/api";

export default function Processes() {

    const [processes, setProcesses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [number, setNumber] = useState("");
    const [title, setTitle] = useState("");
    const [court, setCourt] = useState("");
    const [status, setStatus] = useState("Em andamento");
    const [clients, setClients] = useState([]);
    const [clientId, setClientId] = useState("");


  useEffect(() => {

  carregarProcessos();
  carregarClientes();

}, []);

async function carregarProcessos() {

  try {

    const token = localStorage.getItem("token");

    const response = await api.get(
      "/processes",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setProcesses(response.data);

  } catch (error) {

    console.log(error);

  }

}

async function carregarClientes() {

  try {

    const token = localStorage.getItem("token");

    const response = await api.get(
      "/clients",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setClients(response.data);

  } catch (error) {

    console.log(error);

  }

}

async function salvarProcesso() {

  try {

    const token = localStorage.getItem("token");

    if (editingId) {

      await api.put(
        `/processes/${editingId}`,
        {
          number,
          title,
          court,
          status,
          client_id: Number(clientId)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    } else {

      await api.post(
        "/processes",
        {
          number,
          title,
          court,
          status,
          client_id: Number(clientId)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    }

    setShowModal(false);

    setEditingId(null);

    setNumber("");
    setTitle("");
    setCourt("");
    setStatus("Em andamento");
    setClientId("");

    carregarProcessos();

  } catch (error) {

    console.log(error);

    alert("Erro ao salvar processo");

  }

}

        function editarProcesso(process) {

          setEditingId(process.id);

          setNumber(process.number);
          setTitle(process.title);
          setCourt(process.court);
          setStatus(process.status);
          setClientId(process.client_id);

          setShowModal(true);

        }
        async function excluirProcesso(id) {

          try {

            const token =
              localStorage.getItem("token");

            await api.delete(
              `/processes/${id}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

            carregarProcessos();

          } catch (error) {

            console.log(error);

            alert("Erro ao excluir processo");

          }

        }
  return (

    <>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Processos
          </h1>

          <p className="text-slate-400 mt-2">
            Gerencie todos os processos cadastrados
          </p>

        </div>

        <button
         
            onClick={() => setShowModal(true)}
            className="
            bg-sky-500
            hover:bg-sky-600
            px-5
            py-3
            rounded-xl
            font-medium
            transition-all
            duration-300
            hover:scale-105
          "
        >
          + Novo Processo
        </button>

      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div
         
            onClick={() => setShowModal(true)}
            className="
            bg-white/[0.03]
            backdrop-blur-xl
            p-6
            rounded-3xl
            border
            border-white/10
          "
        >
          <p className="text-slate-400">
            Total Processos
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {processes.length}
          </h3>
        </div>

        <div
            onClick={() => setShowModal(true)}
            className="
            bg-white/[0.03]
            backdrop-blur-xl
            p-6
            rounded-3xl
            border
            border-white/10
          "
        >
          <p className="text-slate-400">
            Em Andamento
          </p>

          <h3 className="text-3xl font-bold mt-2 text-yellow-400">
            {
                processes.filter(
                p => p.status === "Em andamento"
                ).length
            }
            </h3>
        </div>

        <div
            onClick={() => setShowModal(true)}
            className="
            bg-white/[0.03]
            backdrop-blur-xl
            p-6
            rounded-3xl
            border
            border-white/10
          "
        >
          <p className="text-slate-400">
            Concluídos
          </p>

            <h3 className="text-3xl font-bold mt-2 text-green-400">
            {
                processes.filter(
                p => p.status === "Concluído"
                ).length
            }
            </h3>
        </div>

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
          <p className="text-slate-400">
            Arquivados
          </p>

            <h3 className="text-3xl font-bold mt-2 text-red-400">
            {
                processes.filter(
                p => p.status === "Arquivado"
                ).length
            }
            </h3>
        </div>

      </div>

      <div
        className="
          bg-white/[0.03]
          backdrop-blur-xl
          rounded-3xl
          border
          border-white/10
          overflow-hidden
        "
      >

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10">

              <th className="p-4 text-left">
                Número
              </th>

              <th className="p-4 text-left">
                Cliente
              </th>

              <th className="p-4 text-left">
                Título
              </th>

              <th className="p-4 text-left">
                Tribunal
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Ações
                </th>

            </tr>

          </thead>

          <tbody>

            {processes.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="
                    p-8
                    text-center
                    text-slate-400
                  "
                >
                  Nenhum processo cadastrado
                </td>

              </tr>

            ) : (

              processes.map((process) => (

                <tr
                  key={process.id}
                  className="
                    border-b
                    border-white/5
                    hover:bg-white/5
                    transition-all
                    duration-300
                  "
                >
                <td
                  className="p-4 text-sky-400 cursor-pointer hover:underline"
                  onClick={() =>
                    window.location.href =
                    `/processes/${process.id}`
                  }
                >
                  {process.number}
                </td>

                  <td className="p-4">
                    {process.client_name}
                  </td>

                  <td className="p-4">
                    {process.title}
                  </td>

                  <td className="p-4">
                    {process.court}
                  </td>

                  <td className="p-4">
                    {process.status}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">

                    <button
                      onClick={() => editarProcesso(process)}
                      className="
                        bg-yellow-500
                        hover:bg-yellow-600
                        px-3
                        py-1
                        rounded-lg
                        text-sm
                      "
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => excluirProcesso(process.id)}
                      className="
                        bg-red-600
                        hover:bg-red-700
                        px-3
                        py-1
                        rounded-lg
                        text-sm
                      "
                    >
                      Excluir
                    </button>

                  </div>
                </td>
                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
{showModal && (

  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

    <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-xl border border-white/10">

      <h2 className="text-2xl font-bold mb-6">
        Novo Processo
      </h2>

      <input
        type="text"
        placeholder="Número do Processo"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="w-full mb-3 p-3 rounded-xl bg-slate-800"
      />

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-3 rounded-xl bg-slate-800"
      />

      <input
        type="text"
        placeholder="Tribunal"
        value={court}
        onChange={(e) => setCourt(e.target.value)}
        className="w-full mb-3 p-3 rounded-xl bg-slate-800"
      />
        <select
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        className="w-full mb-3 p-3 rounded-xl bg-slate-800"
        >

        <option value="">
            Selecione um cliente
        </option>

        {clients.map((client) => (

            <option
            key={client.id}
            value={client.id}
            >
            {client.name}
            </option>

        ))}

        </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full mb-6 p-3 rounded-xl bg-slate-800"
      >
        <option>Em andamento</option>
        <option>Concluído</option>
        <option>Arquivado</option>
      </select>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-600 px-4 py-2 rounded-xl"
        >
          Cancelar
        </button>

        <button
          onClick={salvarProcesso}
          className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-xl"
        >
          Salvar
        </button>

      </div>

    </div>

  </div>

)}
    </>

  );

}
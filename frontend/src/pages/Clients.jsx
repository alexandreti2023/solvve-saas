import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Users,
  UserPlus,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Clients() {

  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    carregarClientes();
  }, []);

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

async function salvarCliente() {

  try {

    const token = localStorage.getItem("token");

    const dados = {
      name,
      cpf_cnpj: cpfCnpj,
      phone,
      email,
      notes
    };

    if (editingId) {

      await api.put(
        `/clients/${editingId}`,
        dados,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    } else {

      await api.post(
        "/clients",
        dados,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    }

    setShowModal(false);

    setEditingId(null);

    setName("");
    setCpfCnpj("");
    setPhone("");
    setEmail("");
    setNotes("");

    carregarClientes();

  } catch (error) {

    console.log(error);

    alert("Erro ao salvar cliente");

  }

}
async function excluirCliente(id) {

  try {

    const token =
      localStorage.getItem("token");

    await api.delete(
      `/clients/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );
    function editarCliente(client) {

  setEditingId(client.id);

  setName(client.name || "");
  setCpfCnpj(client.cpf_cnpj || "");
  setPhone(client.phone || "");
  setEmail(client.email || "");
  setNotes(client.notes || "");

  setShowModal(true);

}
    carregarClientes();

  } catch (error) {

    console.log(error);

  }

}
  return (

    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle at top right, #1e293b, #0f172a)"
      }}
    >

      <main className="p-12">

        <div className="mb-8">

                <button
                  onClick={() => navigate("/dashboard")}
                  className="
                    flex
                    items-center
                    gap-2
                    text-slate-400
                    hover:text-sky-400
                    mb-6
                    transition-all
                  "
                >
                  <ArrowLeft size={18} />
                  Dashboard
                </button>

                <div className="flex justify-between items-start">

                  <div>

                    <div className="flex items-center gap-3">

                      <Users
                        size={28}
                        className="text-sky-400"
                      />

                      <h1 className="text-4xl font-bold">
                        Clientes
                      </h1>

                    </div>

                    <p className="text-slate-400 mt-2">
                      Gerencie todos os clientes cadastrados
                    </p>

                    <p className="text-slate-500 text-sm mt-1">
                      Total de clientes: {clients.length}
                    </p>

                    <input
                      type="text"
                      placeholder="Buscar cliente..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="
                        mt-4
                        w-full
                        max-w-md
                        p-3
                        rounded-xl
                        bg-slate-800
                        border
                        border-white/10
                      "
                    />

                  </div>

                  <button
                    onClick={() => setShowModal(true)}
                    className="
                      bg-gradient-to-r
                      from-sky-500
                      to-cyan-500
                      hover:scale-105
                      px-6
                      py-3
                      rounded-xl
                      font-semibold
                      transition-all
                      duration-300
                    "
                  >
                    + Novo Cliente
                  </button>

                </div>

        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10">

                <th className="p-4 text-left">
                  Nome
                </th>

                <th className="p-4 text-left">
                  CPF/CNPJ
                </th>

                <th className="p-4 text-left">
                  Telefone
                </th>

                <th className="p-4 text-left">
                  E-mail
                </th>

                <th className="p-4 text-left">
                  Ações
                </th>
              </tr>

            </thead>

            <tbody>

              {clients.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="p-8 text-center text-slate-400"
                  >
                    Nenhum cliente cadastrado
                  </td>

                </tr>

              ) : (

               clients
                  .filter((client) =>
                  client.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((client) => (

                  <tr
                    key={client.id}
                    className="
                      border-b
                      border-white/5
                      hover:bg-white/5
                      transition-all
                    "
                  >

                    <td className="p-4">

                    <button
                          onClick={() => navigate(`/clients/${client.id}`)}
                          className="
                            text-sky-400
                            hover:text-sky-300
                            font-medium
                          "
                        >
                          {client.name}
                        </button>

                      </td>

                    <td className="p-4">
                      {client.cpf_cnpj}
                    </td>

                    <td className="p-4">
                      {client.phone}
                    </td>

                    <td className="p-4">
                      {client.email}
                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() => editarCliente(client)}
                          className="
                            bg-yellow-500
                            hover:bg-yellow-600
                            px-3
                            py-1
                            rounded
                          "
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => excluirCliente(client.id)}
                          className="
                            bg-red-600
                            hover:bg-red-700
                            px-3
                            py-1
                            rounded
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

      </main>

      {showModal && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-slate-900 p-6 rounded-2xl w-full max-w-lg border border-white/10">

          <h3 className="text-2xl font-bold mb-6">
            {editingId ? "Editar Cliente" : "Novo Cliente"}
          </h3>

            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 p-3 rounded bg-slate-800"
            />

            <input
              type="text"
              placeholder="CPF/CNPJ"
              value={cpfCnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
              className="w-full mb-3 p-3 rounded bg-slate-800"
            />

            <input
              type="text"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-3 p-3 rounded bg-slate-800"
            />

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 p-3 rounded bg-slate-800"
            />

            <textarea
              placeholder="Observações"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mb-4 p-3 rounded bg-slate-800"
              rows="4"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Cancelar
              </button>

              <button
                onClick={salvarCliente}
                className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded"
              >
                Salvar
              </button>

             </div>

          </div>

        </div>

      )}

    </div>

  );

}
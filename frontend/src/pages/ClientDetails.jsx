import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { ArrowLeft, User } from "lucide-react";

export default function ClientDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [client, setClient] = useState(null);

  useEffect(() => {
    carregarCliente();
  }, []);

  async function carregarCliente() {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(
        `/clients/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setClient(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  if (!client) {

    return (
      <div className="p-8 text-white">
        Carregando...
      </div>
    );

  }

  return (

    <div className="p-8 text-white">

      <button
        onClick={() => navigate("/clientes")}
        className="
          flex
          items-center
          gap-2
          text-slate-400
          hover:text-sky-400
          mb-6
        "
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

      <div
        className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-8
        "
      >

        <div className="flex items-center gap-3 mb-6">

          <User
            size={28}
            className="text-sky-400"
          />

          <h1 className="text-3xl font-bold">
            {client.name}
          </h1>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>

            <p className="text-slate-400">
              CPF/CNPJ
            </p>

            <p className="font-semibold">
              {client.cpf_cnpj}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              Telefone
            </p>

            <p className="font-semibold">
              {client.phone}
            </p>

          </div>

          <div>

            <p className="text-slate-400">
              E-mail
            </p>

            <p className="font-semibold">
              {client.email}
            </p>

          </div>

        </div>

        <div className="mt-8">

          <p className="text-slate-400 mb-2">
            Observações
          </p>

          <div
            className="
              bg-slate-800
              p-4
              rounded-xl
            "
          >
            {client.notes || "Sem observações"}
          </div>

        </div>

      </div>

    </div>

  );

}
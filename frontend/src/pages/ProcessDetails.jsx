import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ProcessDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [process, setProcess] = useState(null);
  const [events, setEvents] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {

    carregarProcesso();
    useEffect(() => {

  carregarProcesso();
  carregarAndamentos();

  <input
  type="file"
  onChange={(e) =>
    setFile(e.target.files[0])
  }
/>
}, []);

  }, []);

  async function carregarProcesso() {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          `/processes/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        async function carregarAndamentos() {

  try {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        `/process-events/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    setEvents(response.data);

  } catch (error) {

    console.log(error);

  }

}
async function uploadDocumento() {

  if (!file) return;

  const token =
    localStorage.getItem("token");

  const formData = new FormData();

  formData.append(
    "process_id",
    id
  );

  formData.append(
    "file",
    file
  );

  await api.post(
    "/documents/upload",
    formData,
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

  alert("Documento enviado");
}
<button
  onClick={uploadDocumento}
  className="
    bg-sky-500
    px-4
    py-2
    rounded-xl
  "
>
  Enviar Documento
</button>
      setProcess(response.data);

    } catch (error) {

      console.log(error);

      alert("Erro ao carregar processo");

    }

  }

  if (!process) {

    return (
      <div className="p-8">
        Carregando...
      </div>
    );

  }

  return (

    <div className="p-8 text-white">

      <button
        onClick={() => navigate("/processos")}
        className="mb-8 text-sky-400"
      >
        ← Voltar
      </button>

      <h1 className="text-4xl font-bold mb-6">
        Processo
      </h1>

      <div className="bg-slate-900 rounded-3xl p-8">

        <p>
          <strong>Número:</strong>
          {" "}
          {process.number}
        </p>

        <p className="mt-3">
          <strong>Título:</strong>
          {" "}
          {process.title}
        </p>

        <p className="mt-3">
          <strong>Cliente:</strong>
          {" "}
          {process.client_name}
        </p>

        <p className="mt-3">
          <strong>Tribunal:</strong>
          {" "}
          {process.court}
        </p>

        <p className="mt-3">
          <strong>Status:</strong>
          {" "}
          {process.status}
        </p>

      </div>
<div className="mt-8 bg-slate-900 rounded-3xl p-8">

  <h2 className="text-2xl font-bold mb-6">
    Andamentos
  </h2>

  {events.length === 0 ? (

    <p className="text-slate-400">
      Nenhum andamento cadastrado
    </p>

  ) : (

    events.map((event) => (

      <div
        key={event.id}
        className="
          border-l-2
          border-sky-500
          pl-4
          mb-6
        "
      >

        <p className="text-sky-400 text-sm">
          {event.event_date}
        </p>

        <h3 className="font-bold">
          {event.title}
        </h3>

        <p className="text-slate-400">
          {event.description}
        </p>

      </div>

    ))

  )}

</div>
    </div>

  );

}
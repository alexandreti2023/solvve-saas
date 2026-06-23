import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function NewCalculation() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  async function salvar() {

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/calculations",
        {
          title,
          description,
          value: Number(value)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Cálculo salvo com sucesso!");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Erro ao salvar cálculo");

    }

  }

  return (

    <div
      className="min-h-screen flex justify-center items-center p-6 text-white"
      style={{
        background:
          "radial-gradient(circle at top right, #1e293b, #0f172a)"
      }}
    >

      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Novo Cálculo
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-slate-900"
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-slate-900"
          />

          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-slate-900"
          />

          <button
            onClick={salvar}
            className="w-full bg-sky-600 py-3 rounded-xl font-bold"
          >
            SALVAR CÁLCULO
          </button>

        </div>

      </div>

    </div>

  );

}
import AnimatedBackground from "../components/AnimatedBackground";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../services/api";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const savedEmail =
      localStorage.getItem("savedEmail");

    if (savedEmail) {

      setEmail(savedEmail);
      setRememberMe(true);

    }

  }, []);

  async function fazerLogin() {

    try {

      const formData = new FormData();

      formData.append(
        "username",
        email
      );

      formData.append(
        "password",
        password
      );

      const response = await api.post(
        "/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      if (rememberMe) {

        localStorage.setItem(
          "savedEmail",
          email
        );

      } else {

        localStorage.removeItem(
          "savedEmail"
        );

      }

      alert(
        "Login realizado com sucesso!"
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        "Email ou senha inválidos"
      );

    }

  }

  return (
    <>
  <AnimatedBackground />

    <div
      className="min-h-screen flex items-center justify-center p-4 text-white"
      style={{
        background:
          "radial-gradient(circle at top right, #1e293b, #0f172a)"
      }}
    >

      <div
        className="
          w-full
          max-w-md
          bg-white/5
          backdrop-blur-md
          border
          border-white/10
          rounded-2xl
          p-8
          shadow-2xl
        "
      >

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold italic">
            Solv
            <span className="text-sky-400">
              ve
            </span>
          </h1>

          <p className="text-slate-400 mt-2">
            Plataforma Jurídica Inteligente
          </p>

        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {

            e.preventDefault();

            fazerLogin();

          }}
        >

          <div>

            <label className="text-sky-400 text-sm">
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                mt-1
                p-3
                rounded-lg
                bg-slate-900
                border
                border-slate-700
              "
            />

          </div>

          <div>

            <label className="text-sky-400 text-sm">
              Senha
            </label>

           <div className="relative">

          <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pr-10"
          />

          <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
          >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

      </div>

          </div>

          <div className="flex items-center gap-2">

            <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
                className="w-4 h-4 accent-sky-500"
              />

            <label>
              Lembrar usuário
            </label>

          </div>

          <button
            type="submit"
            className="
              w-full
              bg-sky-600
              hover:bg-sky-500
              py-3
              rounded-xl
              font-bold
              transition-all
            "
          >
            ENTRAR
          </button>

        </form>

      </div>

    </div>

</>
);

}
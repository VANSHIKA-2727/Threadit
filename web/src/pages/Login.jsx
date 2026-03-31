import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiEye, HiEyeSlash, HiArrowRight } from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";
import AuthLandingBackdrop from "../components/AuthLandingBackdrop";

const ease = [0.22, 1, 0.36, 1];

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-all duration-300 ease-out focus:border-[#e85d3f]/40 focus:outline-none focus:ring-2 focus:ring-[#e85d3f]/50";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    login({ username: email.split("@")[0], email });
    navigate("/home");
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <AuthLandingBackdrop />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-black/40 backdrop-blur-md" aria-hidden />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease }}
          className="w-full max-w-md"
        >
          <div className="mb-8 flex items-center justify-center gap-2.5">
            <motion.div
              whileHover={{ scale: 1.06, rotate: -2 }}
              transition={{ duration: 0.28, ease }}
              className="inline-flex"
            >
              <Logo size={40} className="text-white" />
            </motion.div>
            <span className="text-2xl font-semibold tracking-[0.02em] text-white">Threadit</span>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-[0_0_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
              <p className="mt-1 text-sm text-zinc-400">Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputClass} pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors duration-200 hover:text-white"
                  >
                    {showPass ? <HiEyeSlash size={18} /> : <HiEye size={18} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#e85d3f] py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#d14f34] disabled:opacity-70"
              >
                {loading ? (
                  <span className="block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    Sign in <HiArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
              No account?{" "}
              <Link to="/register" className="font-medium text-[#e85d3f] transition-colors hover:text-[#f07860]">
                Register
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

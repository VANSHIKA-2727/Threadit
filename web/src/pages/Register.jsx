import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiSparkles, HiEye, HiEyeSlash, HiArrowRight, HiCheckCircle } from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";

const requirements = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "Contains a number", test: (p) => /\d/.test(p) },
  { label: "Contains a special character", test: (p) => /[!@#$%^&*]/.test(p) },
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    register({ username, email });
    navigate("/home");
  };

  const inputClass =
    "w-full px-4 py-3 bg-[#f5f3f0] border border-border rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent/35";

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <HiSparkles size={20} className="text-white" />
          </div>
          <span className="text-2xl font-semibold tracking-[0.02em] text-foreground">Threadit</span>
        </div>

        <div className="bg-surface border border-border rounded-xl p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Create account</h2>
            <p className="text-muted text-sm mt-1">Join Threadit</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted mb-1.5 block uppercase tracking-wider">Username</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted mb-1.5 block uppercase tracking-wider">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
            </div>

            <div>
              <label className="text-xs font-medium text-muted mb-1.5 block uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`${inputClass} pr-11`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                  {showPass ? <HiEyeSlash size={18} /> : <HiEye size={18} />}
                </button>
              </div>
              {password && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 space-y-1">
                  {requirements.map(({ label, test }) => {
                    const ok = test(password);
                    return (
                      <div key={label} className="flex items-center gap-2">
                        <HiCheckCircle size={14} className={ok ? "text-accent" : "text-muted/50"} />
                        <span className={`text-xs ${ok ? "text-foreground" : "text-muted"}`}>{label}</span>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-accent text-white font-semibold mt-2 hover:bg-accent-hover transition-colors disabled:opacity-70"
            >
              {loading ? (
                <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin block" />
              ) : (
                <>Create account <HiArrowRight size={18} /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-muted text-sm mt-6">
            Have an account?{" "}
            <Link to="/login" className="text-accent font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

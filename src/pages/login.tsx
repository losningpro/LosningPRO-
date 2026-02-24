import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setIsLoading(false);

    if (error) return setMsg(error.message);
    nav("/"); // o /konto
  }

  async function onSignup() {
    setIsLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.signUp({ email, password });

    setIsLoading(false);
    if (error) return setMsg(error.message);
    setMsg("Cuenta creada. Si has activado confirmación por email, revisa tu correo.");
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Log på</h1>

      <form onSubmit={onLogin} className="space-y-3">
        <input
          className="w-full border rounded p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          required
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="current-password"
          required
        />

        {msg && <div className="text-sm text-red-600">{msg}</div>}

        <button
          disabled={isLoading}
          className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-60"
          type="submit"
        >
          {isLoading ? "..." : "Login"}
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={onSignup}
          className="w-full border rounded p-2"
        >
          Opret konto
        </button>
      </form>
    </div>
  );
}

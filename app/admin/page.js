'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('adminToken', data.token);
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D12] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#121218] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <span className="w-3 h-3 rounded-full bg-[#B8F000] inline-block mb-1"></span>
          <h1 className="text-2xl font-black text-white">Admin Portal</h1>
          <p className="text-xs text-gray-400">Sign in to manage VibeShort APKs</p>
        </div>
        

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@vibeshort.com"
              className="w-full px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#B8F000] transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#0D0D12] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#B8F000] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-[#0D0D12] bg-[#B8F000] hover:bg-[#D0F000] transition shadow-lg shadow-[#B8F000]/20 text-sm cursor-pointer"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
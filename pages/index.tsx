import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [form, setForm] = useState({ nome: '', telefone: '', endereco: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('contatos').insert([form]);
    setMsg(error ? `Erro: ${error.message}` : 'Salvo com sucesso!');
    if (!error) setForm({ nome: '', telefone: '', endereco: '' });
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold text-center">Cadastro</h1>

        {['nome', 'telefone', 'endereco'].map((field) => (
          <input
            key={field}
            required={field === 'nome'}
            name={field}
            value={(form as any)[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full border rounded px-3 py-2"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Salvar
        </button>

        {msg && <p className="text-center text-sm text-gray-600">{msg}</p>}
      </form>
    </main>
  );
}

'use client';
import { useState } from 'react';

export default function Page() {
  const [filtroBoleto, setFiltroBoleto] = useState('');

  const mensagensBoletos = [
    {
      nome: 'João Pereira',
      telefone: '(62) 91234-5678',
      vencimento: '30/04/2025',
      mensagem: 'Olá João, tudo bem? 👋 Lembrando que o boleto referente ao seu pedido vence amanhã (30/04). Qualquer dúvida, estou à disposição. Obrigado! 💼'
    },
    {
      nome: 'Loja Central',
      telefone: '(62) 93333-4444',
      vencimento: '30/04/2025',
      mensagem: 'Bom dia, tudo certo por aí? Passando para lembrar que o boleto do seu último pedido vence amanhã. Qualquer dúvida ou ajuda com emissão, conte comigo! ✅'
    }
  ];

  const mensagensFiltradas = mensagensBoletos.filter((m) =>
    m.vencimento.includes(filtroBoleto)
  );

  const exportarMensagens = () => {
    const texto = mensagensFiltradas
      .map((m) => `${m.nome} - ${m.telefone}\nMensagem: ${m.mensagem}\nVencimento: ${m.vencimento}`)
      .join('\n\n');
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mensagens-boletos.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className='p-6'>
      <h1 className='text-xl font-bold mb-4'>Mensagens de Aviso de Boleto (manual)</h1>
      <input
        className='border px-2 py-1 mb-4'
        placeholder='Filtrar por data (ex: 30/04/2025)'
        value={filtroBoleto}
        onChange={(e) => setFiltroBoleto(e.target.value)}
      />
      <button className='bg-blue-600 text-white px-4 py-1 mb-4 ml-2' onClick={exportarMensagens}>
        Exportar mensagens
      </button>
      <ul className='list-disc list-inside'>
        {mensagensFiltradas.map((m, i) => (
          <li key={i} className='mb-4'>
            <b>{m.nome}</b> - {m.telefone}<br />
            <i>Vencimento:</i> {m.vencimento}<br />
            <i>Mensagem:</i> {m.mensagem}
          </li>
        ))}
      </ul>
    </main>
  );
}

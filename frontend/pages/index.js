import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../lib/api';

export default function Dashboard() {
  const user = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([]);
  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().slice(0, 10),
    note: ''
  });

  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user]);

  async function fetchData() {
    const txRes = await api.get('/transactions');
    setTransactions(txRes.data);

    const now = new Date();
    const sRes = await api.get('/transactions/summary/monthly', {
      params: { year: now.getFullYear(), month: now.getMonth() + 1 }
    });
    setSummary(sRes.data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    await api.post('/transactions', {
      ...form,
      amount: Number(form.amount),
    });
    setForm(prev => ({ ...prev, amount: '', note: '' }));
    fetchData();
  }

  const income = summary.find(s => s._id === 'income')?.total || 0;
  const expenses = summary.find(s => s._id === 'expense')?.total || 0;

  if (!user) return null;

  return (
    <main className="dashboard">
      <header>
        <h1>Hi {user.name}, here’s your month</h1>
      </header>

      <section className="stats">
        <div className="card">
          <h2>Income</h2>
          <p>{income.toFixed(2)}</p>
        </div>
        <div className="card">
          <h2>Expenses</h2>
          <p>{expenses.toFixed(2)}</p>
        </div>
        <div className="card">
          <h2>Balance</h2>
          <p>{(income - expenses).toFixed(2)}</p>
        </div>
      </section>

      <section className="add-transaction">
        <h2>Add transaction</h2>
        <form onSubmit={handleAdd}>
          <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input type="number" value={form.amount}
                 onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="Amount" />
          <input value={form.category}
                 onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Category" />
          <input type="date" value={form.date}
                 onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          <input value={form.note}
                 onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="Note" />
          <button type="submit">Add</button>
        </form>
      </section>

      <section className="transactions">
        <h2>Recent transactions</h2>
        <ul>
          {transactions.slice(0, 10).map(tx => (
            <li key={tx._id}>
              <span>{new Date(tx.date).toLocaleDateString()}</span>
              <span>{tx.category}</span>
              <span>{tx.type}</span>
              <span>{tx.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

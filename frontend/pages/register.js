// frontend/pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../lib/api'; // same api client you used in login.js

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // basic client-side validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return setError('All fields are required');
    }
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setLoading(true);

      // 1) Call backend to create the user
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });

      // 2) Option A: after successful registration, redirect to login
      router.push('/login');

      // Option B (if you want auto-login):
      // const loginRes = await api.post('/auth/login', {
      //   email: form.email,
      //   password: form.password,
      // });
      // localStorage.setItem('token', loginRes.data.token);
      // localStorage.setItem('user', JSON.stringify(loginRes.data.user));
      // router.push('/');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <h1>Create an account</h1>

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Name
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
          />
        </label>

        <label>
          Confirm password
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat your password"
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <a href="/login">Log in</a>
      </p>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
        }
        .auth-form {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border: 1px solid #ddd;
          padding: 1.5rem;
          border-radius: 0.75rem;
        }
        label {
          display: flex;
          flex-direction: column;
          font-size: 0.9rem;
          gap: 0.3rem;
        }
        input {
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #ccc;
        }
        .error {
          color: #d00;
          font-size: 0.85rem;
        }
        button {
          margin-top: 0.5rem;
          padding: 0.6rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
        }
        .auth-switch {
          margin-top: 0.75rem;
          font-size: 0.9rem;
        }
      `}</style>
    </main>
  );
}

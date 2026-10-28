import { useState } from 'react';
import { Plus, ChevronRight, Trash2 } from 'lucide-react';
import { CATEGORIES, STATUSES } from '../data.js';

const badge = ['bg-navy-900/10 text-navy-900', 'bg-saffron-100 text-navy-900', 'bg-teal-100 text-navy-900', 'bg-teal-600 text-white'];
const newId = () => 'DEMO-' + (globalThis.crypto?.randomUUID?.().slice(0, 8).toUpperCase() || Math.random().toString(36).slice(2, 10).toUpperCase());
const empty = { title: '', description: '', category: CATEGORIES[0], locality: '' };

export default function Tracker({ complaints, setComplaints }) {
  const [f, setF] = useState(empty);
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!f.title.trim() || !f.locality.trim()) return setErr('Add a title and a locality.');
    setErr('');
    setComplaints([{ ...f, id: newId(), status: 0, created: new Date().toLocaleDateString('en-IN') }, ...complaints]);
    setF(empty);
  };
  const advance = (id) => setComplaints(complaints.map((c) => (c.id === id ? { ...c, status: Math.min(c.status + 1, 3) } : c)));
  const remove = (id) => setComplaints(complaints.filter((c) => c.id !== id));
  const seed = () => setComplaints((cur) => [...samples, ...cur.filter((c) => !c.sample)]);
  const samples = [
    { id: 'CE-100001', title: 'Pipe leaking near market', description: 'Water pooling on the road.', category: 'Water leakage', locality: 'Sector 14', status: 1, created: '20/10/2026' },
    { id: 'CE-100002', title: 'Streetlight out for a week', description: 'Dark stretch by the park.', category: 'Streetlights', locality: 'Sector 21', status: 2, created: '22/10/2026' },
    { id: 'CE-100003', title: 'Garbage not collected', description: 'Bins overflowing.', category: 'Garbage', locality: 'Sector 14', status: 0, created: '26/10/2026' },
    { id: 'CE-100004', title: 'Pothole on main road', description: 'Dangerous for two-wheelers.', category: 'Road damage', locality: 'Old Town', status: 3, created: '15/10/2026' }
  ].map((c) => ({ ...c, sample: true }));

  const reset = () => { if (window.confirm('Delete all complaints from this browser?')) setComplaints([]); };
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Complaint tracker</h1>
      <p className="rounded-lg bg-saffron-100 p-3 font-bold">DEMO prototype. Complaints are saved only in this browser and are not sent to any government authority. Statuses are simulated.</p>
      <form onSubmit={submit} className="card grid gap-4 sm:grid-cols-2" noValidate>
        <label className="block font-bold sm:col-span-2">Title<input className="field mt-1 font-normal" value={f.title} onChange={set('title')} /></label>
        <label className="block font-bold sm:col-span-2">Description<textarea rows={3} className="field mt-1 font-normal" value={f.description} onChange={set('description')} /></label>
        <label className="block font-bold">Category
          <select className="field mt-1 font-normal" value={f.category} onChange={set('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
        </label>
        <label className="block font-bold">Locality<input className="field mt-1 font-normal" value={f.locality} onChange={set('locality')} /></label>
        {err && <p role="alert" className="font-bold text-red-700 sm:col-span-2">{err}</p>}
        <div className="flex flex-wrap gap-3 sm:col-span-2">
          <button className="btn" type="submit"><Plus size={18} aria-hidden="true" />Submit complaint</button>
          <button type="button" className="btn-alt" onClick={seed}>Load sample complaints (demo data)</button>
          {complaints.length > 0 && <button type="button" className="btn-alt" onClick={reset}>Reset demo data</button>}
        </div>
      </form>
      {!complaints.length && <p className="text-navy-900/70">No complaints yet. Submit one above to start tracking it.</p>}
      <ul className="space-y-3">
        {complaints.map((c) => (
          <li key={c.id} className="card">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="font-display text-lg font-bold">{c.title}</h2>
                <p className="text-sm text-navy-900/70">{c.id}{c.sample ? ' (sample)' : ''} · {c.category} · {c.locality} · {c.created}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-bold ${badge[c.status]}`}>DEMO · {STATUSES[c.status]}</span>
            </div>
            {c.description && <p className="mt-2">{c.description}</p>}
            <div className="mt-3 flex gap-2">
              {c.status < 3 && <button className="btn-alt !py-1.5 text-sm" onClick={() => advance(c.id)}>Advance demo status<ChevronRight size={16} aria-hidden="true" /></button>}
              <button className="btn-alt !py-1.5 text-sm" onClick={() => remove(c.id)} aria-label={`Delete ${c.title}`}><Trash2 size={16} aria-hidden="true" /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

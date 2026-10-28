import { useState } from 'react';
import { BadgeCheck, CircleHelp } from 'lucide-react';
import { PROCESSES, } from '../data.js';
import { save } from '../lib.js';

const KEY = 'civicease.checks';
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };

export default function Checklist() {
  const names = Object.keys(PROCESSES);
  const [proc, setProc] = useState(names[0]);
  const [done, setDone] = useState(load);
  const items = PROCESSES[proc];
  const toggle = (i) => { const k = `${proc}:${i}`; const n = { ...done, [k]: !done[k] }; setDone(n); save(KEY, n); };
  const count = items.filter((_, i) => done[`${proc}:${i}`]).length;
  const pct = Math.round((count / items.length) * 100);

  const reset = () => { const n = { ...done }; items.forEach((_, i) => delete n[`${proc}:${i}`]); setDone(n); save(KEY, n); };
  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Application checklist</h1>
      <p className="rounded-lg bg-saffron-100 p-3 font-bold">Illustrative templates, not official. Requirements differ by state and department, and no official source is linked to these items.</p>
      <label className="block font-bold">Service
        <select className="field mt-1 font-normal" value={proc} onChange={(e) => setProc(e.target.value)}>
          {names.map((n) => <option key={n}>{n}</option>)}
        </select>
      </label>
      <div>
        <div className="mb-1 flex justify-between font-bold"><span>{count} done, {items.length - count} remaining</span><span>{pct}%</span></div>
        <div className="h-3 rounded-full bg-navy-900/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-3 rounded-full bg-teal-600" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i}>
            <label className={`card flex cursor-pointer items-start gap-3 py-3 ${it.verified ? 'border-l-8 border-l-teal-600' : 'border-l-8 border-l-saffron-500 border-dashed'}`}>
              <input type="checkbox" className="mt-1 h-5 w-5 accent-teal-600" checked={!!done[`${proc}:${i}`]} onChange={() => toggle(i)} />
              <span className="flex-1">
                <span className={done[`${proc}:${i}`] ? 'line-through opacity-60' : ''}>{it.t}</span>
                <span className={`mt-1 flex items-center gap-1 text-sm font-bold ${it.verified ? 'text-teal-600' : 'text-navy-900/70'}`}>
                  {it.verified ? <><BadgeCheck size={16} /> Commonly listed (illustrative)</> : <><CircleHelp size={16} /> Varies. Unverified, confirm with the office</>}
                </span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <button className="btn-alt" onClick={reset}>Reset this checklist</button>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Landmark } from 'lucide-react';
import Home from './components/Home.jsx';
import Explainer from './components/Explainer.jsx';
import Checklist from './components/Checklist.jsx';
import Tracker from './components/Tracker.jsx';
import Insights from './components/Insights.jsx';
import { save } from './lib.js';

const TABS = [['home', 'Home'], ['explainer', 'Document Explainer'], ['checklist', 'Application Checklist'], ['tracker', 'Complaint Tracker'], ['insights', 'Insights Dashboard']];
const KEY = 'civicease.complaints';
const load = () => { try { const a = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(a) ? a.filter((c) => c && typeof c.title === 'string' && Number.isInteger(c.status) && c.status >= 0 && c.status <= 3) : []; } catch { return []; } };

export default function App() {
  const [view, setView] = useState(() => (location.hash.slice(1) || 'home'));
  const [complaints, setComplaints] = useState(load);
  useEffect(() => save(KEY, complaints), [complaints]);
  useEffect(() => { location.hash = view; window.scrollTo(0, 0); }, [view]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-saffron-500 focus:p-2">Skip to content</a>
      <header className="sticky top-0 z-40 border-b-4 border-saffron-500 bg-navy-900 text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2">
          <button onClick={() => setView('home')} className="flex items-center gap-2 font-display text-xl font-bold"><Landmark aria-hidden="true" className="text-saffron-500" />CivicEase AI</button>
          <nav aria-label="Main" className="-mx-2 flex flex-1 gap-1 overflow-x-auto">
            {TABS.map(([id, label]) => (
              <button key={id} onClick={() => setView(id)} aria-current={view === id ? 'page' : undefined}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-bold ${view === id ? 'bg-white text-navy-900' : 'hover:bg-white/15'}`}>{label}</button>
            ))}
          </nav>
        </div>
      </header>
      <main id="main">
        {view === 'explainer' ? <Explainer />
          : view === 'checklist' ? <Checklist />
          : view === 'tracker' ? <Tracker complaints={complaints} setComplaints={setComplaints} />
          : view === 'insights' ? <Insights complaints={complaints} />
          : <Home go={setView} />}
      </main>
      <footer className="border-t border-navy-900/15 bg-white"><p className="mx-auto max-w-5xl px-4 py-5 text-sm text-navy-900/70">CivicEase AI is a prototype. It is not a government service, and complaint data stays in your browser. Confirm every requirement with the issuing department.</p></footer>
    </>
  );
}

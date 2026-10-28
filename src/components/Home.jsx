import { FileText, ListChecks, MessageSquareWarning, BarChart3, ClipboardPaste, Eye, CheckCircle2 } from 'lucide-react';

const tools = [
  ['explainer', FileText, 'Understand a notice', 'Dates, eligibility, documents and next steps from official text.'],
  ['checklist', ListChecks, 'Prepare an application', 'Tick off each document and step. Progress is saved.'],
  ['tracker', MessageSquareWarning, 'Report a local issue', 'Practise logging a water, road or garbage problem (demo).'],
  ['insights', BarChart3, 'See the pattern', 'Complaints by category and locality, from your own entries.']
];
const steps = [
  [ClipboardPaste, 'Paste the notice', 'Any scholarship, pension or utility notice, in English or Hindi.'],
  [Eye, 'Read it in plain words', 'Each point shows the exact line it came from, or is marked as an interpretation.'],
  [CheckCircle2, 'Act with confidence', 'Follow the checklist and confirm with the department before you submit.']
];

export default function Home({ go }) {
  return (
    <div>
      <section className="bg-navy-900 text-white">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Government services,<br />simplified for everyone.</h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">Paste a notice. See what it says, what you need, and what to do by when, with every point traced back to the original text.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => go('explainer')} className="rounded-lg bg-saffron-500 px-5 py-3 font-bold text-navy-900 hover:brightness-95">Explain a notice</button>
              <button onClick={() => go('checklist')} className="rounded-lg border-2 border-white px-5 py-3 font-bold hover:bg-white/10">Build my checklist</button>
            </div>
          </div>
          <div className="rounded-xl bg-white p-5 text-navy-900 lg:col-span-2" aria-label="Example result">
            <p className="text-sm font-bold text-navy-900/70">Important dates</p>
            <p className="mt-1 font-display text-xl font-bold">Apply online by 15 December 2026.</p>
            <p className="mt-3 border-l-4 border-teal-600 pl-3 text-sm text-navy-900/80"><b>In the notice:</b> “Last date to apply online is 15/12/2026.”</p>
            <p className="mt-4 text-sm font-bold" style={{ color: '#8A5A00' }}>Anything the notice does not say is flagged, not guessed.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="font-display text-2xl font-bold">How it works</h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {steps.map(([Icon, t, d], i) => (
            <li key={t} className="card"><Icon className="mb-3 text-teal-600" aria-hidden="true" /><p className="font-display text-lg font-bold">{i + 1}. {t}</p><p className="mt-1 text-navy-900/80">{d}</p></li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12">
        <h2 className="font-display text-2xl font-bold">Tools</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {tools.map(([id, Icon, t, d]) => (
            <button key={id} onClick={() => go(id)} className="card flex gap-4 text-left transition-colors hover:border-teal-600">
              <Icon className="mt-1 shrink-0 text-teal-600" aria-hidden="true" />
              <span><span className="block font-display text-xl font-bold">{t}</span><span className="mt-1 block text-navy-900/80">{d}</span></span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

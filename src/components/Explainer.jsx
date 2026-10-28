import { useEffect, useState } from 'react';
import { Sparkles, WifiOff, AlertTriangle, Loader2, ExternalLink } from 'lucide-react';
import { explain, safeUrl, MAX_LEN, KEYS } from '../lib.js';
import { SAMPLE_NOTICE } from '../data.js';

const L = {
  en: { summary: 'Plain-language summary', dates: 'Important dates & deadlines', eligibility: 'Eligibility criteria', documents: 'Required documents', steps: 'Next steps', none: 'Not stated in this notice. Check with the department.', inNotice: 'In the notice', inferred: 'Interpretation, verify' },
  hi: { summary: 'सरल सारांश', dates: 'महत्वपूर्ण तिथियाँ', eligibility: 'पात्रता', documents: 'आवश्यक दस्तावेज़', steps: 'अगले कदम', none: 'इस सूचना में नहीं बताया गया। विभाग से पुष्टि करें।', inNotice: 'सूचना में है', inferred: 'व्याख्या, जाँचें' }
};

function Section({ title, items, t, bullets }) {
  return (
    <div className="card">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      {!items.length ? <p className="mt-2 flex gap-2 text-navy-900/70"><AlertTriangle size={18} className="mt-0.5 shrink-0 text-saffron-500" aria-hidden="true" />{t.none}</p> : (
        <ul className={`mt-2 space-y-3 ${bullets ? 'list-disc pl-5' : ''}`}>
          {items.map((it, i) => (
            <li key={i}>
              <p>{it.text}</p>
              {it.kind === 'source'
                ? <p className="mt-1 border-l-4 border-teal-600 pl-2 text-sm text-navy-900/80"><b>{t.inNotice}:</b> “{it.quote}”</p>
                : <p className="mt-1 text-sm font-bold text-saffron-500" style={{ color: '#8A5A00' }}>{t.inferred}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Explainer() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('en');
  const [level, setLevel] = useState('simple');
  const [offline, setOffline] = useState(false);
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState(null);
  const [err, setErr] = useState('');
  const [ready, setReady] = useState(null); // null = checking
  useEffect(() => { fetch('/api/health').then((r) => r.json()).then((d) => setReady(!!d.ai)).catch(() => setReady(false)); }, []);

  const run = async () => {
    if (!text.trim()) return setErr('Paste a notice first.');
    if (text.length > MAX_LEN) return setErr(`The notice is ${text.length} characters. The limit is ${MAX_LEN}.`);
    if (url.trim() && !safeUrl(url)) return setErr('The source link must start with http:// or https://.');
    setErr(''); setBusy(true); setOut(null);
    const r = await explain({ text, language, level, offline });
    setOut({ ...r, submitted: text, title: title.trim(), url: url.trim() ? safeUrl(url) : null, language });
    setBusy(false);
  };
  const t = L[out?.language || language];
  const total = out ? KEYS.reduce((n, k) => n + out[k].length, 0) : 0;

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Document explainer</h1>
      <p className={`rounded-lg p-3 font-bold ${ready ? 'bg-teal-100' : 'bg-saffron-100'}`}>{ready === null ? 'Checking AI connection…' : ready ? 'Live AI is connected on the server.' : 'Live AI is not configured here. Explanations will use the rule-based fallback.'}</p>
      <div className="card space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block font-bold">Document title (optional)<input className="field mt-1 font-normal" value={title} onChange={(e) => setTitle(e.target.value)} /></label>
          <label className="block font-bold">Source link (optional)<input className="field mt-1 font-normal" inputMode="url" placeholder="https://" value={url} onChange={(e) => setUrl(e.target.value)} /></label>
        </div>
        <label className="block font-bold" htmlFor="notice">Notice text</label>
        <textarea id="notice" rows={8} className="field -mt-2" value={text} onChange={(e) => setText(e.target.value)} aria-describedby="count" />
        <p id="count" className={`text-sm ${text.length > MAX_LEN ? 'font-bold text-red-700' : 'text-navy-900/70'}`}>{text.length} / {MAX_LEN} characters</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block font-bold">Output language
            <select className="field mt-1 font-normal" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option><option value="hi">हिन्दी (Hindi)</option>
            </select>
          </label>
          <label className="block font-bold">Explanation style
            <select className="field mt-1 font-normal" value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="simple">Simple sentences</option><option value="bullets">Bullet points</option>
            </select>
          </label>
        </div>
        <label className="flex items-center gap-2 font-bold">
          <input type="checkbox" className="h-5 w-5 accent-teal-600" checked={offline} onChange={(e) => setOffline(e.target.checked)} />
          Offline mode (rule-based, no AI)
        </label>
        {language === 'hi' && <p className="text-sm text-navy-900/80">Hindi output needs live AI. Offline mode only shows Hindi headings; the extracted sentences stay in the language you pasted.</p>}
        {err && <p role="alert" className="font-bold text-red-700">{err}</p>}
        <div className="flex flex-wrap gap-3">
          <button className="btn" onClick={run} disabled={busy}>{busy ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Sparkles size={18} aria-hidden="true" />}{busy ? 'Explaining…' : 'Explain this'}</button>
          <button className="btn-alt" onClick={() => setText(SAMPLE_NOTICE)}>Load sample notice</button>
        </div>
      </div>
      <div aria-live="polite">
        {busy && <p className="font-bold">Working on your notice…</p>}
        {out && (
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-3 lg:sticky lg:top-24 lg:self-start">
              <div className="card">
                <h2 className="font-display text-lg font-bold">Original notice{out.title ? `: ${out.title}` : ''}</h2>
                <p className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap">{out.submitted}</p>
                {out.url
                  ? <p className="mt-3 text-sm"><a className="inline-flex items-center gap-1 font-bold text-teal-600 underline" href={out.url} target="_blank" rel="noreferrer noopener">{out.url}<ExternalLink size={14} aria-hidden="true" /></a><br />Link supplied by you. CivicEase has not verified it as official.</p>
                  : <p className="mt-3 text-sm text-navy-900/70">No source link supplied.</p>}
              </div>
            </div>
            <div className="space-y-4">
              <p className={`flex items-start gap-2 rounded-lg p-3 font-bold ${out.source === 'ai' ? 'bg-teal-100' : 'bg-saffron-100'}`}>
                {out.source === 'ai' ? <Sparkles size={18} className="mt-0.5 shrink-0" aria-hidden="true" /> : <WifiOff size={18} className="mt-0.5 shrink-0" aria-hidden="true" />}
                {out.source === 'ai' ? 'Live AI output. Items marked “In the notice” quote your text; others are interpretations.'
                  : `Rule-based fallback, not AI.${out.error ? ` Live AI failed: ${out.error}.` : ''} It only picks sentences from your notice.`}
              </p>
              {total === 0 && <p role="alert" className="card font-bold">No relevant information could be extracted. Check that the text is a notice or guideline.</p>}
              {KEYS.map((k) => <Section key={k} title={t[k]} items={out[k]} t={t} bullets={k !== 'summary' || level === 'bullets'} />)}
              <p className="text-sm text-navy-900/80">Always confirm dates and requirements with the relevant department before acting.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

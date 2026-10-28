const tally = (arr, k) => Object.entries(arr.reduce((m, c) => ((m[c[k]] = (m[c[k]] || 0) + 1), m), {})).sort((a, b) => b[1] - a[1]);

function Bars({ title, rows, color }) {
  const max = Math.max(1, ...rows.map((r) => r[1]));
  return (
    <div className="card">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      {!rows.length ? <p className="mt-2 text-navy-900/60">No data yet.</p> : (
        <ul className="mt-3 space-y-3">
          {rows.map(([n, v]) => (
            <li key={n}>
              <div className="flex justify-between text-sm font-bold"><span>{n}</span><span>{v}</span></div>
              <div className="h-3 rounded-full bg-navy-900/10"><div className={`h-3 rounded-full ${color}`} style={{ width: `${(v / max) * 100}%` }} /></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Insights({ complaints }) {
  const resolved = complaints.filter((c) => c.status === 3).length;
  const stats = [['Total complaints', complaints.length], ['Open', complaints.length - resolved], ['Resolved', resolved]];
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <h1 className="font-display text-3xl font-bold">Civic insights</h1>
      <p className="rounded-lg bg-saffron-100 p-3 font-bold">DEMO data. Counts come only from complaints saved in this browser, not real civic statistics.{complaints.length === 0 && ' No complaints yet: add one in the Complaint Tracker.'}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(([l, v]) => (
          <div key={l} className="card"><p className="font-display text-4xl font-bold">{v}</p><p className="font-bold text-navy-900/80">{l}</p></div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Bars title="By category" rows={tally(complaints, 'category')} color="bg-teal-600" />
        <Bars title="By locality" rows={tally(complaints, 'locality')} color="bg-saffron-500" />
      </div>
    </div>
  );
}

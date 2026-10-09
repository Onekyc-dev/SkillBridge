export default function Diagram({ data }) {
  if (!data) return null;
  return (
    <figure className="diagram">
      <figcaption>{data.title}</figcaption>

      {data.type === "flow" && (
        <ol className="d-flow">
          {data.steps.map((s, i) => (
            <li key={s.label} style={{ "--i": i }}>
              <span className="d-num">{i + 1}</span>
              <div>
                <strong>{s.label}</strong>
                {s.note && <p>{s.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      )}

      {data.type === "columns" && (
        <div className="d-cols">
          {data.columns.map((c) => (
            <div key={c.head} className={`d-col ${c.tone || ""}`}>
              <h4>{c.head}</h4>
              <ul>
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.type === "hub" && (
        <>
          <div className="d-hub-center">{data.center}</div>
          <div className="d-hub-grid">
            {data.items.map((it, i) => (
              <div key={it.label} className="d-hub-item" style={{ "--i": i }}>
                <strong>{it.label}</strong>
                <span>{it.note}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {data.type === "table" && (
        <div className="d-table-wrap">
          <table className="d-table">
            <thead>
              <tr>{data.headers.map((h) => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.rows.map((r, i) => (
                <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.caption && <p className="d-note">{data.caption}</p>}
    </figure>
  );
}

export default function JobCard({ job }) {
  return (
    <div className="card jobcard">
      <h3>{job.name}</h3>
      <p>{job.note}</p>
      {job.tip && <p className="job-tip"><strong>First step:</strong> {job.tip}</p>}
      <a href={job.url} target="_blank" rel="noopener noreferrer" className="btn small">
        {job.cta || "Open"} &rarr;
      </a>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const RUBRIC = [
  { title: "Requirements", description: "I completed the main tasks in the assignment.", points: 25 },
  { title: "Accuracy", description: "My work is correct and free from obvious errors.", points: 25 },
  { title: "Presentation", description: "My work is clear, organised, and easy to understand.", points: 25 },
  { title: "Professional readiness", description: "I checked my work and can explain how I completed it.", points: 25 },
];

function getAssignment(course) {
  const slug = course.slug.toLowerCase();

  if (slug.includes("data-entry")) {
    return {
      title: "Create an accurate data-entry record",
      brief: "Prepare a small, well-organised spreadsheet containing at least 20 sample records. Use clear column headings, consistent formatting, and appropriate data types. Check for duplicates and missing information.",
      deliverables: "Submit a shareable spreadsheet link and a short explanation of the checks you performed.",
      placeholder: "Paste your spreadsheet link here",
    };
  }

  if (slug.includes("writing")) {
    return {
      title: "Create a professional writing sample",
      brief: "Write an original piece for a clearly identified audience. Give it a suitable heading, organise it into logical sections, check grammar and spelling, and revise it for clarity.",
      deliverables: "Submit a shareable document link and briefly describe the intended audience and purpose.",
      placeholder: "Paste your writing sample link here",
    };
  }

  if (slug.includes("customer-service")) {
    return {
      title: "Resolve a customer-service scenario",
      brief: "Write responses to three realistic customer situations: a delayed order, a customer complaint, and a request for information. Demonstrate empathy, clarity, accurate information, and appropriate next steps.",
      deliverables: "Submit your responses in a shareable document and explain how you would resolve each situation.",
      placeholder: "Paste your document link here",
    };
  }

  if (slug.includes("virtual-assistant")) {
    return {
      title: "Complete a virtual-assistant work package",
      brief: "Prepare a weekly task schedule, draft a professional email, and organise a small set of sample tasks by priority and deadline. Make the results clear and easy for a client to use.",
      deliverables: "Submit a shareable document or spreadsheet containing your schedule, email, and task list.",
      placeholder: "Paste your work package link here",
    };
  }

  return {
    title: `Practical project: ${course.title}`,
    brief: "Create a practical piece of work that demonstrates the main skills taught in this course. Follow the assignment requirements provided by your instructor, check your work, and make the result easy to review.",
    deliverables: "Submit a shareable link to your work and a short explanation of what you created.",
    placeholder: "Paste your project link here",
  };
}

export default function PracticalSubmission({ course }) {
  const storageKey = `sb-practical-${course.slug}`;
  const assignment = getAssignment(course);
  const [projectUrl, setProjectUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [checked, setChecked] = useState([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedWork = localStorage.getItem(storageKey);
      if (savedWork) {
        const data = JSON.parse(savedWork);
        setProjectUrl(data.projectUrl || "");
        setNotes(data.notes || "");
        setChecked(Array.isArray(data.checked) ? data.checked : []);
        setSaved(true);
      }
    } catch {
      // Ignore unavailable or invalid local data.
    }
  }, [storageKey]);

  const readinessScore = checked.reduce(
    (total, index) => total + (RUBRIC[index]?.points || 0),
    0
  );

  function saveWork(event) {
    event.preventDefault();
    setError("");

    if (!projectUrl.trim()) {
      setError("Please add a link to your practical work.");
      return;
    }

    let parsedUrl;
    try {
      parsedUrl = new URL(projectUrl.trim());
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Invalid protocol");
      }
    } catch {
      setError("Enter a valid link beginning with https:// or http://.");
      return;
    }

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          projectUrl: parsedUrl.href,
          notes: notes.trim(),
          checked,
          savedAt: new Date().toISOString(),
        })
      );
      setSaved(true);
    } catch {
      setError("Your work could not be saved on this device. Please try again.");
    }
  }

  return (
    <section
      className="card"
      style={{
        margin: "2rem 0",
        padding: "clamp(1rem, 4vw, 2rem)",
        borderRadius: "20px",
        border: "1px solid #d9e8df",
        background: "linear-gradient(145deg, #f5fbf7, #ffffff)",
      }}
    >
      <p className="eyebrow">PRACTICAL PROJECT</p>
      <h2 style={{ marginTop: ".5rem" }}>{assignment.title}</h2>
      <p>{assignment.brief}</p>

      <div style={{ padding: "1rem", borderRadius: "12px", background: "#e8f4ec", margin: "1rem 0" }}>
        <strong>What to submit</strong>
        <p style={{ marginBottom: 0 }}>{assignment.deliverables}</p>
      </div>

      <form onSubmit={saveWork}>
        <label htmlFor={`project-url-${course.slug}`} style={{ display: "block", fontWeight: 700, marginBottom: ".5rem" }}>
          Your project link
        </label>
        <input
          id={`project-url-${course.slug}`}
          type="url"
          value={projectUrl}
          onChange={(event) => { setProjectUrl(event.target.value); setSaved(false); }}
          placeholder={assignment.placeholder}
          required
          style={{ boxSizing: "border-box", width: "100%", padding: ".9rem", borderRadius: "10px", border: "1px solid #bdcec3", marginBottom: "1rem", font: "inherit" }}
        />

        <label htmlFor={`project-notes-${course.slug}`} style={{ display: "block", fontWeight: 700, marginBottom: ".5rem" }}>
          Explain your work
        </label>
        <textarea
          id={`project-notes-${course.slug}`}
          value={notes}
          onChange={(event) => { setNotes(event.target.value); setSaved(false); }}
          placeholder="What did you create? What skills did you use?"
          rows={4}
          style={{ boxSizing: "border-box", width: "100%", padding: ".9rem", borderRadius: "10px", border: "1px solid #bdcec3", marginBottom: "1.5rem", font: "inherit", resize: "vertical" }}
        />

        <h3>Check your work</h3>
        <p className="muted">Use this checklist to assess your readiness before sharing your work.</p>

        <div style={{ display: "grid", gap: ".75rem" }}>
          {RUBRIC.map((item, index) => (
            <label
              key={item.title}
              style={{
                display: "flex", gap: ".75rem", alignItems: "flex-start",
                padding: ".9rem", border: "1px solid #dce8df", borderRadius: "12px",
                background: checked.includes(index) ? "#edf7ef" : "#fff", cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={checked.includes(index)}
                onChange={(event) => {
                  setChecked((previous) =>
                    event.target.checked
                      ? [...previous, index]
                      : previous.filter((itemIndex) => itemIndex !== index)
                  );
                  setSaved(false);
                }}
                style={{ marginTop: ".3rem" }}
              />
              <span>
                <strong>{item.title}</strong><br />
                <span className="muted">{item.description}</span>
              </span>
              <span style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>{item.points} pts</span>
            </label>
          ))}
        </div>

        <div style={{ margin: "1.25rem 0" }}>
          <strong>Self-check: {readinessScore}/100</strong>
          <div style={{ height: "8px", background: "#dfe9e2", borderRadius: "20px", overflow: "hidden", marginTop: ".5rem" }}>
            <div style={{ height: "100%", width: `${readinessScore}%`, background: "#258454", transition: "width .2s ease" }} />
          </div>
          <p className="muted" style={{ fontSize: ".85rem" }}>
            This is your own checklist score, not an official grade or proof that the project has passed.
          </p>
        </div>

        {error && <p role="alert" style={{ color: "#b42318", fontWeight: 700 }}>{error}</p>}
        <button type="submit" className="btn">Save my practical</button>
        {saved && <p role="status" style={{ color: "#176b42", fontWeight: 700 }}>Your practical is saved on this device.</p>}
      </form>

      <p className="muted" style={{ fontSize: ".85rem", marginTop: "1.25rem", borderTop: "1px solid #dce8df", paddingTop: "1rem" }}>
        This version saves your work in this browser only. It does not send your project to SkillBridge for review. Keep your original project and link safe.
      </p>
    </section>
  );
}

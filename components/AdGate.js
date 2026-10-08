"use client";
import { useEffect, useState } from "react";

// Placeholder ad. Replace the .ad-box contents with your ad network's code once approved.
export default function AdGate({ onDone }) {
  const [left, setLeft] = useState(5);

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  return (
    <div className="ad">
      <p className="muted">Ad</p>
      <div className="ad-box">Your ad will appear here</div>
      <button className="btn" disabled={left > 0} onClick={onDone}>
        {left > 0 ? `Skip in ${left}` : "Skip ad"}
      </button>
    </div>
  );
}

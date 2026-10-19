"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function readCourseProgress(slug, moduleCount) {
  if (typeof window === "undefined") {
    return { completedModules: 0, started: false, completed: false };
  }

  try {
    const raw = localStorage.getItem(`sb-progress-${slug}`);

    if (!raw) {
      return { completedModules: 0, started: false, completed: false };
    }

    const saved = JSON.parse(raw);
    let completedModules = 0;

    /*
     * Support common progress formats without assuming
     * that every course stores progress identically.
     */
    if (typeof saved === "number") {
      completedModules = saved;
    } else if (Array.isArray(saved)) {
      completedModules = saved.length;
    } else if (saved && typeof saved === "object") {
      if (Array.isArray(saved.completedModules)) {
        completedModules = saved.completedModules.length;
      } else if (Array.isArray(saved.completed)) {
        completedModules = saved.completed.length;
      } else if (typeof saved.completedModules === "number") {
        completedModules = saved.completedModules;
      } else if (typeof saved.completedCount === "number") {
        completedModules = saved.completedCount;
      } else if (typeof saved.progress === "number") {
        completedModules = saved.progress;
      }
    }

    completedModules = Math.max(
      0,
      Math.min(moduleCount, Math.floor(completedModules))
    );

    return {
      completedModules,
      started: completedModules > 0,
      completed: moduleCount > 0 && completedModules >= moduleCount,
    };
  } catch {
    return { completedModules: 0, started: false, completed: false };
  }
}

export default function Dashboard({ courses = [] }) {
  const [progress, setProgress] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    function loadProgress() {
      const nextProgress = {};

      for (const course of courses) {
        nextProgress[course.slug] = readCourseProgress(
          course.slug,
          course.moduleCount || 0
        );
      }

      setProgress(nextProgress);
      setMounted(true);
    }

    loadProgress();

    window.addEventListener("focus", loadProgress);
    window.addEventListener("storage", loadProgress);

    return () => {
      window.removeEventListener("focus", loadProgress);
      window.removeEventListener("storage", loadProgress);
    };
  }, [courses]);

  const stats = useMemo(() => {
    const entries = courses.map((course) => ({
      ...course,
      ...(progress[course.slug] || {
        completedModules: 0,
        started: false,
        completed: false,
      }),
    }));

    return {
      started: entries.filter((course) => course.started).length,
      completed: entries.filter((course) => course.completed).length,
      modules: entries.reduce(
        (total, course) => total + course.completedModules,
        0
      ),
      skills: new Set(
        entries
          .filter((course) => course.completed && course.category)
          .map((course) => course.category)
      ).size,
      entries,
    };
  }, [courses, progress]);

  const continueCourse =
    stats.entries.find((course) => course.started && !course.completed) ||
    stats.entries.find((course) => course.started) ||
    null;

  const skillAreas = [
    ...new Set(
      stats.entries
        .filter((course) => course.completed && course.category)
        .map((course) => course.category)
    ),
  ];

  return (
    <main className="dashboard-page">
      <section className="dashboard-heading">
        <div>
          <p className="dashboard-eyebrow">YOUR LEARNING SPACE</p>
          <h1>Your learning dashboard</h1>
          <p className="dashboard-subtitle">
            See your progress, build your skills, and take your next career step.
          </p>
        </div>

        <Link href="/courses" className="dashboard-primary-button">
          Explore courses
        </Link>
      </section>

      <section className="dashboard-stats" aria-label="Learning statistics">
        <article className="dashboard-stat-card">
          <span className="dashboard-stat-icon">📚</span>
          <p>Courses started</p>
          <strong>{mounted ? stats.started : "—"}</strong>
          <span>Courses you've begun</span>
        </article>

        <article className="dashboard-stat-card">
          <span className="dashboard-stat-icon">🎓</span>
          <p>Courses completed</p>
          <strong>{mounted ? stats.completed : "—"}</strong>
          <span>Courses you've finished</span>
        </article>

        <article className="dashboard-stat-card">
          <span className="dashboard-stat-icon">✅</span>
          <p>Modules completed</p>
          <strong>{mounted ? stats.modules : "—"}</strong>
          <span>Your learning progress</span>
        </article>

        <article className="dashboard-stat-card">
          <span className="dashboard-stat-icon">💡</span>
          <p>Skill areas</p>
          <strong>{mounted ? stats.skills : "—"}</strong>
          <span>Areas from completed courses</span>
        </article>
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-section-heading">
          <div>
            <h2>Continue learning</h2>
            <p>Pick up where you left off.</p>
          </div>

          <Link href="/my-courses" className="dashboard-text-link">
            My courses →
          </Link>
        </div>

        {continueCourse ? (
          <article className="dashboard-continue-card">
            <div className="dashboard-course-symbol">📖</div>

            <div className="dashboard-continue-content">
              <span className="dashboard-course-level">
                {continueCourse.level}
              </span>

              <h3>{continueCourse.title}</h3>

              <p>
                {continueCourse.summary ||
                  "Continue building your knowledge and practical skills."}
              </p>

              <div
                className="dashboard-progress-track"
                role="progressbar"
                aria-label={`${continueCourse.title} progress`}
                aria-valuemin={0}
                aria-valuemax={continueCourse.moduleCount || 1}
                aria-valuenow={continueCourse.completedModules}
              >
                <span
                  style={{
                    width: `${
                      continueCourse.moduleCount > 0
                        ? Math.min(
                            100,
                            (continueCourse.completedModules /
                              continueCourse.moduleCount) *
                              100
                          )
                        : 0
                    }%`,
                  }}
                />
              </div>

              <p className="dashboard-progress-caption">
                {continueCourse.completedModules} of{" "}
                {continueCourse.moduleCount} modules completed
              </p>
            </div>

            <Link
              href={`/courses/${continueCourse.slug}`}
              className="dashboard-primary-button"
            >
              {continueCourse.completed ? "Review course" : "Continue course"}
            </Link>
          </article>
        ) : (
          <div className="dashboard-empty-state">
            <span className="dashboard-empty-icon">🚀</span>
            <h3>Your learning journey starts here</h3>
            <p>
              Start a course to track your progress and see your learning
              activity here.
            </p>
            <Link href="/courses" className="dashboard-primary-button">
              Find a course
            </Link>
          </div>
        )}
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-section-heading">
          <div>
            <h2>Your courses</h2>
            <p>Track your progress across the SkillBridge catalogue.</p>
          </div>

          <Link href="/courses" className="dashboard-text-link">
            Browse all →
          </Link>
        </div>

        {stats.entries.length > 0 ? (
          <div className="dashboard-course-list">
            {stats.entries.map((course) => {
              const percentage =
                course.moduleCount > 0
                  ? Math.min(
                      100,
                      Math.round(
                        (course.completedModules / course.moduleCount) * 100
                      )
                    )
                  : 0;

              return (
                <article className="dashboard-course-row" key={course.slug}>
                  <div className="dashboard-course-row-main">
                    <div className="dashboard-course-symbol">📘</div>

                    <div>
                      <h3>{course.title}</h3>
                      <p>
                        {course.category || "Skill development"} ·{" "}
                        {course.level}
                      </p>
                    </div>
                  </div>

                  <div className="dashboard-course-row-progress">
                    <div className="dashboard-progress-track">
                      <span style={{ width: `${percentage}%` }} />
                    </div>

                    <span>
                      {course.completed
                        ? "Completed"
                        : `${percentage}% complete`}
                    </span>
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="dashboard-course-action"
                  >
                    {course.completed
                      ? "Review"
                      : course.started
                        ? "Continue"
                        : "Start"}
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="dashboard-empty-state">
            <h3>No courses available yet</h3>
            <p>When courses are added, they'll appear here.</p>
          </div>
        )}
      </section>

      <div className="dashboard-lower-grid">
        <section className="dashboard-panel">
          <div className="dashboard-section-heading">
            <div>
              <h2>My skill areas</h2>
              <p>Skills linked to courses you've completed.</p>
            </div>
          </div>

          {skillAreas.length > 0 ? (
            <div className="dashboard-skill-tags">
              {skillAreas.map((skill) => (
                <span className="dashboard-skill-tag" key={skill}>
                  ✓ {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="dashboard-small-empty">
              <span>💡</span>
              <p>
                Complete a course to start building your skill-area overview.
              </p>
            </div>
          )}
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-section-heading">
            <div>
              <h2>My certificates</h2>
              <p>Keep track of your achievements.</p>
            </div>
          </div>

          <div className="dashboard-small-empty">
            <span>🏅</span>
            <p>
              Certificate generation is not available yet. This section is
              ready for a future certificate feature.
            </p>
          </div>
        </section>
      </div>

      <section className="dashboard-career-card">
        <div>
          <p className="dashboard-eyebrow">YOUR NEXT STEP</p>
          <h2>Turn your skills into opportunities</h2>
          <p>
            Explore career paths and discover opportunities connected to the
            skills you want to develop.
          </p>
        </div>

        <Link href="/skills" className="dashboard-secondary-button">
          Explore career skills →
        </Link>
      </section>

      <p className="dashboard-storage-note">
        Your learning progress is currently saved in this browser on this
        device. It does not yet sync across devices.
      </p>
    </main>
  );
}

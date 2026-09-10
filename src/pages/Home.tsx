import { FormEvent, useEffect, useMemo, useState } from "react";

type Note = {
  id: number;
  title: string;
  body: string;
  updated: string;
};

const steps = [
  "Create the shell",
  "Make it installable",
  "Make it offline",
  "Test the boundary",
  "Deploy it"
];

const starterNotes: Note[] = [
  {
    id: 1,
    title: "What makes a PWA?",
    body: "A manifest, a service worker, and a reliable user experience.",
    updated: "Today"
  }
];

export default function Home() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem("notes");
      return saved ? JSON.parse(saved) as Note[] : starterNotes;
    } catch {
      return starterNotes;
    }
  });

  const [done, setDone] = useState<number[]>([]);
  const [online, setOnline] = useState(navigator.onLine);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const progress = useMemo(
    () => Math.round((done.length / steps.length) * 100),
    [done]
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);

    window.addEventListener("online", on);
    window.addEventListener("offline", off);

    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const newNote: Note = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim(),
      updated: "Just now"
    };

    setNotes((current) => [newNote, ...current]);
    setTitle("");
    setBody("");
  }

  function toggleStep(index: number) {
    setDone((current) =>
      current.includes(index)
        ? current.filter((x) => x !== index)
        : [...current, index]
    );
  }

  return (
    <div className="shell">
      <header>
        <strong>Offline Notes Lab</strong>
        <span className={online ? "status online" : "status offline"}>
          <i aria-hidden="true" /> {online ? "Online" : "Offline"}
        </span>
      </header>

      <div className="layout">
        <aside>
          <p className="map-title">WORKSHOP MAP</p>
          <nav aria-label="Workshop steps">
            {steps.map((step, index) => {
              const isDone = done.includes(index);
              return (
                <button
                  className={isDone ? "step done" : "step"}
                  key={step}
                  onClick={() => toggleStep(index)}
                  type="button"
                >
                  <span>{isDone ? "✓" : index + 1}</span>
                  {step}
                </button>
              );
            })}
          </nav>
          <div className="progress">
            <small>{progress}% complete</small>
            <div className="progress-track">
              <div style={{ width: `${progress}%` }} />
            </div>
          </div>
        </aside>

        <main>
          <p className="eyebrow">FOUNDATION TRACK</p>
          <h1>Keep learning when the network leaves.</h1>
          <div className="student-info">
            <strong>Michael Adesoye</strong>
            <span>Matric No.: 2024/1/95276ET</span>
          </div>
          <p className="lede">
            Save a note, refresh the page, then test the same experience with
            the network turned off.
          </p>

          <section className="columns">
            <div>
              <div className="section-heading">
                <h2>Notes from the lab</h2>
                <span>{notes.length} note{notes.length === 1 ? "" : "s"}</span>
              </div>

              <div className="notes">
                {notes.map((note) => (
                  <article key={note.id}>
                    <h3>{note.title}</h3>
                    <p>{note.body}</p>
                    <small>{note.updated}</small>
                  </article>
                ))}
              </div>
            </div>

            <form onSubmit={addNote}>
              <h2>Write a note</h2>
              <p className="form-help">
                Notes are saved locally in your browser.
              </p>

              <label>
                Title
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Service worker test"
                  required
                />
              </label>

              <label>
                Observation
                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  rows={6}
                  placeholder="What did you observe?"
                  required
                />
              </label>

              <button className="save" type="submit">Save locally</button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

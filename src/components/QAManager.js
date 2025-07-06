import React, { useState, useEffect } from "react";

function QAManager() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("qa_entries");
    return saved ? JSON.parse(saved) : [];
  });

  const [newEntry, setNewEntry] = useState("");

  useEffect(() => {
    localStorage.setItem("qa_entries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (type) => {
    if (!newEntry.trim()) return;
    const date = new Date().toISOString().split("T")[0];
    setEntries([...entries, { type, text: newEntry, date }]);
    setNewEntry("");
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qa_entries.json";
    a.click();
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        setEntries(imported);
      } catch {
        alert("Invalid JSON file!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h1>🚀 Pioneer Personal Chat Page</h1>
      <input
        type="text"
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Enter question or answer"
      />
      <button onClick={() => addEntry("Q")}>Add Question</button>
      <button onClick={() => addEntry("A")}>Add Answer</button>
      <button onClick={exportJSON}>Export JSON</button>
      <input type="file" accept="application/json" onChange={importJSON} />
      <ul>
        {entries.map((entry, idx) => (
          <li key={idx}>
            {entry.type} | {entry.date} | {entry.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QAManager;

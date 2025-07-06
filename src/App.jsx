import React, { useState, useEffect } from 'react';

function App() {
  const [qaData, setQaData] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [entryType, setEntryType] = useState('Q'); // 'Q' = Question, 'A' = Answer

  // Khi app load, đọc từ localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('qaData')) || [];
    setQaData(saved);
  }, []);

  // Mỗi khi dữ liệu thay đổi, lưu vào localStorage
  useEffect(() => {
    localStorage.setItem('qaData', JSON.stringify(qaData));
  }, [qaData]);

  const addEntry = () => {
    if (!newEntry.trim()) return;
    const newItem = {
      type: entryType,
      text: newEntry,
      date: new Date().toISOString().split('T')[0]
    };
    setQaData([...qaData, newItem]);
    setNewEntry('');
  };

  const exportJSON = () => {
    const json = JSON.stringify(qaData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qa-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        setQaData(data);
      } catch {
        alert('Invalid JSON');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🚀 Personal Chat Page</h1>
      <input
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Enter question or answer"
      />
      <select value={entryType} onChange={(e) => setEntryType(e.target.value)}>
        <option value="Q">Question</option>
        <option value="A">Answer</option>
      </select>
      <button onClick={addEntry}>Add</button>
      <button onClick={exportJSON}>Export JSON</button>
      <input type="file" accept="application/json" onChange={importJSON} />

      <h2>All Entries</h2>
      <ul>
        {qaData.map((item, index) => (
          <li key={index}>
            <strong>{item.type}</strong> | {item.date} | {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

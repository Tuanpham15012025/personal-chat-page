// Cấu trúc thư mục mẫu
// pioneer-chat-pwa/
// ├── public/
// │   └── index.html
// ├── src/
// │   ├── App.js
// │   ├── index.js
// │   ├── service-worker.js
// │   └── utils.js
// ├── package.json
// └── ...

// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('pioneerEntries');
    return saved ? JSON.parse(saved) : [];
  });

  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    localStorage.setItem('pioneerEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (newEntry.trim()) {
      setEntries([...entries, { text: newEntry, date: new Date().toISOString() }]);
      setNewEntry('');
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Pioneer Personal Chat Page</h1>
      <input
        type="text"
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Type your question or answer"
      />
      <button onClick={addEntry}>Add</button>
      <ul>
        {entries.map((entry, idx) => (
          <li key={idx}>
            {entry.text} <em>({entry.date})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// package.json (rút gọn phần quan trọng)
{
  "name": "pioneer-chat-pwa",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "5.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}

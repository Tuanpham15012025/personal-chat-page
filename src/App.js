import React, { useState, useEffect } from 'react';

function App() {
  const [qaData, setQaData] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [entryType, setEntryType] = useState('Q');
  const [filterType, setFilterType] = useState('All'); // All / Q / A
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('qaData')) || [];
    setQaData(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('qaData', JSON.stringify(qaData));
  }, [qaData]);

  const addEntry = () => {
    if (!newEntry.trim()) return;
    const item = {
      type: entryType,
      text: newEntry,
      date: new Date().toISOString().split('T')[0]
    };
    setQaData([...qaData, item]);
    setNewEntry('');
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(qaData, null, 2)], { type: 'application/json' });
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

  const clearData = () => {
    setQaData([]);
    localStorage.removeItem('qaData');
  };

  const filteredData = qaData.filter(item => {
    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesSearch = item.text.toLowerCase().includes(searchText.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="App">
      <h1>🚀 Pioneer Personal Chat Page</h1>

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
      <button onClick={clearData}>Clear Data</button>

      <hr />

      <div>
        <label>Filter:</label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="All">All</option>
          <option value="Q">Questions</option>
          <option value="A">Answers</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>
            <strong>{item.type}</strong> | {item.date} | {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

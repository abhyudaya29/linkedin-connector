import React, { useState } from "react";

function Settings() {
  const [interval, setIntervalValue] = useState(4);
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    if (interval < 3) {
      alert("Interval must be at least 3 seconds.");
      return;
    }
    setIsRunning(true);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "start", interval });
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>LinkedIn Auto Connector</h1>
      <div style={styles.timerSection}>
        <label style={styles.label}>Request Interval (seconds):</label>
        <input
          type="number"
          value={interval}
          onChange={(e) => setIntervalValue(e.target.value)}
          min="3"
          style={styles.input}
          disabled={isRunning}
        />
      </div>
      <button
        onClick={handleStart}
        style={isRunning ? styles.buttonDisabled : styles.button}
        disabled={isRunning}
      >
        {isRunning ? "Sending Requests..." : "Start"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
    maxWidth: "300px",
    textAlign: "center",
  },
  header: { fontSize: "20px", color: "#0073b1" },
  timerSection: { marginBottom: "15px" },
  label: { display: "block", marginBottom: "5px" },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#0073b1",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonDisabled: {
    backgroundColor: "#999",
  },
};

export default Settings;

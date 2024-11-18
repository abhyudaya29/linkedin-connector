import React, { useState } from "react";

const Settings = () => {
  const [interval, setIntervalValue] = useState(4); 
  const [isRunning, setIsRunning] = useState(false);

  const startSendingRequests = () => {
    const maxRequests = prompt("How many connection requests would you like to send?", "10");

    
    const parsedRequests = parseInt(maxRequests, 10);
    if (isNaN(parsedRequests) || parsedRequests <= 0) {
      alert("Invalid input. Please enter a positive number.");
      return;
    }

    setIsRunning(true);
    sendConnectionRequests(parsedRequests);
  };

  const sendConnectionRequests = (maxRequests) => {
    let sentRequests = 0;

    const observer = new MutationObserver(() => {
      const buttons = document.querySelectorAll("button");

      buttons.forEach((button) => {
        if (sentRequests >= maxRequests) {
          alert(`Sent ${sentRequests} connection requests.`);
          observer.disconnect();
          setIsRunning(false);
          return;
        }

        const profileText = button.closest(".entity-result")?.innerText || "";
        chrome.storage.sync.get(["keyword", "company"], ({ keyword, company }) => {
          if (
            button.innerText.includes("Connect")
          ) {
            setTimeout(() => {
              button.click();
              console.log(`Connection Request Sent to: ${profileText}`);
            }, sentRequests * interval * 1000); 

            sentRequests++;
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>LinkedIn Auto Connector</h1>
      <p style={styles.description}>
        Click the button below to start sending connection requests.
      </p>
      <div style={styles.timerSection}>
        <label style={styles.label}>Request Interval (seconds):</label>
        <input
          type="number"
          value={interval}
          onChange={(e) => setIntervalValue(e.target.value)}
          min="1"
          style={styles.input}
          disabled={isRunning} 
        />
      </div>
      <button
        onClick={startSendingRequests}
        style={isRunning ? styles.buttonDisabled : styles.button}
        disabled={isRunning} 
      >
        {isRunning ? "Sending Requests..." : "Send Connection Requests"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#0073b1",
    marginBottom: "10px",
    textAlign: "center",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
    textAlign: "center",
  },
  timerSection: {
    marginBottom: "15px",
    textAlign: "center",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
    textAlign: "center",
    marginBottom: "15px",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0073b1",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonDisabled: {
    display: "block",
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#999",
    border: "none",
    borderRadius: "4px",
    cursor: "not-allowed",
  },
};

export default Settings;

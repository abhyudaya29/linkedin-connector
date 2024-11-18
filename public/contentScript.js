window.onload = () => {
    
    const requestCount = prompt("How many connection requests would you like to send?", "10");
  
    
    const maxRequests = parseInt(requestCount, 10);
    if (isNaN(maxRequests) || maxRequests <= 0) {
      alert("Invalid input. Please enter a positive number.");
      return;
    }
  
    
    observeAndSendRequests(maxRequests);
  };
  
  function observeAndSendRequests(maxRequests) {
    let sentRequests = 0;
  
    
    const observer = new MutationObserver(() => {
      const buttons = document.querySelectorAll("button");
  
      buttons.forEach((button) => {
        if (sentRequests >= maxRequests) {
          observer.disconnect(); 
          alert(`Sent ${sentRequests} connection requests.`);
          return;
        }
  
        // Ensure the button matches "Connect"
        const profileText = button.closest(".entity-result")?.innerText || "";
        chrome.storage.sync.get(["keyword", "company"], ({ keyword, company }) => {
          if (
            button.innerText.includes("Connect") &&
            (!keyword || profileText.includes(keyword)) &&
            (!company || profileText.includes(company))
          ) {
            setTimeout(() => {
              button.click();
              console.log(`Connection Request Sent to: ${profileText}`);
            }, sentRequests * 4000);
  
            sentRequests++;
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  
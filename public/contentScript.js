chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "start") {
    const interval = parseInt(request.interval) * 1000;
    let sentRequests = 0;

    const observer = new MutationObserver(() => {
      const buttons = document.querySelectorAll('button');

      buttons.forEach((button) => {
        if (button.innerText.includes("Connect")) {
          setTimeout(() => {
            button.click();
            console.log("Connection request sent.");
            sentRequests++;
          }, sentRequests * interval);
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
});

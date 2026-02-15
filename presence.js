(function notifyVisit() {
  const webhookUrl = "";

  if (!webhookUrl) {
    return;
  }

  const payload = {
    page: window.location.pathname,
    title: document.title,
    visitedAt: new Date().toISOString(),
    userAgent: navigator.userAgent,
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Ignore notification errors to avoid impacting the user experience.
  });
})();

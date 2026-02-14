(function () {
  const body = document.body;
  if (!body) return;

  requestAnimationFrame(() => {
    body.classList.add("page-visible");
  });

  const sameOriginLinks = Array.from(document.querySelectorAll("a[href]"));

  sameOriginLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href) return;
      if (link.target === "_blank") return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;

      event.preventDefault();
      body.classList.remove("page-visible");
      body.classList.add("page-leaving");

      setTimeout(() => {
        window.location.href = destination.href;
      }, 360);
    });
  });
})();

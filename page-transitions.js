(function () {
  const body = document.body;
  if (!body) return;

  const setupScrollAnimations = () => {
    const animatedItems = document.querySelectorAll('.reveal, .pop, .fade-in');
    if (!animatedItems.length) return;

    const showElement = (element) => {
      element.classList.add('in-view');
    };

    if (!('IntersectionObserver' in window)) {
      animatedItems.forEach(showElement);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          showElement(entry.target);
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px',
      },
    );

    animatedItems.forEach((item) => observer.observe(item));
  };

  const setupButtonFeedback = () => {
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach((button) => {
      button.addEventListener('pointerdown', (event) => {
        const rect = button.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        if (Number.isFinite(x) && Number.isFinite(y)) {
          button.style.setProperty('--click-x', `${x}%`);
          button.style.setProperty('--click-y', `${y}%`);
        }

        button.classList.add('is-pressed', 'btn-clicked');
      });

      const clearState = () => {
        button.classList.remove('is-pressed');
        setTimeout(() => button.classList.remove('btn-clicked'), 140);
      };

      button.addEventListener('pointerup', clearState);
      button.addEventListener('pointerleave', clearState);
      button.addEventListener('blur', clearState);
    });
  };

  requestAnimationFrame(() => {
    body.classList.add('page-visible');
    setupScrollAnimations();
    setupButtonFeedback();
  });

  const sameOriginLinks = Array.from(document.querySelectorAll('a[href]'));

  sameOriginLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (link.target === '_blank') return;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;

      event.preventDefault();
      body.classList.remove('page-visible');
      body.classList.add('page-leaving');

      setTimeout(() => {
        window.location.href = destination.href;
      }, 320);
    });
  });
})();

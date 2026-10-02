(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const glow = document.createElement('div');
  glow.className = 'miao-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.append(glow);
  let frame = 0;
  let activePetals = 0;

  function scatter(x, y) {
    if (reducedMotion.matches || document.hidden || activePetals >= 21) return;
    for (let i = 0; i < 7; i++) {
      const petal = document.createElement('span');
      petal.className = 'miao-petal';
      petal.setAttribute('aria-hidden', 'true');
      petal.style.left = `${x}px`;
      petal.style.top = `${y}px`;
      document.body.append(petal);
      activePetals++;
      const angle = Math.PI * 2 * i / 7;
      const distance = 32 + Math.random() * 24;
      const rotation = Math.random() * 160 - 80;
      const animation = petal.animate([
        { transform: 'translate(-50%, -50%) scale(.4)', opacity: .8 },
        { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance + 22}px) rotate(${rotation}deg) scale(.8)`, opacity: 0 }
      ], { duration: 850, easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'forwards' });
      animation.finished.then(() => {
        petal.remove();
        activePetals--;
      }, () => {
        petal.remove();
        activePetals--;
      });
    }
  }

  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || reducedMotion.matches || frame) return;
    frame = requestAnimationFrame(() => {
      glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      glow.classList.add('is-visible');
      frame = 0;
    });
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => glow.classList.remove('is-visible'));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) glow.classList.remove('is-visible');
  });
  reducedMotion.addEventListener('change', () => {
    glow.classList.remove('is-visible');
    if (reducedMotion.matches) document.querySelectorAll('.miao-petal').forEach(petal => petal.getAnimations().forEach(animation => animation.cancel()));
  });
  document.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || event.target.closest('a, button, input, textarea, select, [contenteditable]')) return;
    scatter(event.clientX, event.clientY);
  }, { passive: true });

  const brand = document.querySelector('.site-brand-container');
  if (brand) {
    const button = document.createElement('button');
    button.className = 'miao-petal-button';
    button.type = 'button';
    button.textContent = '✿';
    button.title = '让花瓣飘一下';
    button.setAttribute('aria-label', '让花瓣飘一下');
    button.addEventListener('click', () => {
      const box = button.getBoundingClientRect();
      scatter(box.left + box.width / 2, box.top + box.height / 2);
    });
    brand.append(button);
  }
})();

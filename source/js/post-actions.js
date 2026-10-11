(() => {
  const memory = new Map();
  const groups = new Map();

  function readLike(key) {
    try { return localStorage.getItem(key) === '1'; }
    catch { return memory.get(key) === true; }
  }

  function paintLike(group, liked) {
    const button = group.querySelector('.miao-like');
    button.setAttribute('aria-pressed', String(liked));
    button.querySelector('.miao-heart').textContent = liked ? '♥' : '♡';
    button.querySelector('.miao-like-label').textContent = liked ? '已点赞' : '点赞';
  }

  document.querySelectorAll('.miao-post-actions').forEach(group => {
    const url = new URL(group.dataset.url, location.href);
    url.hash = '';
    const link = url.href;
    const key = `miao:liked:${url.pathname}`;
    const feedback = group.querySelector('.miao-action-feedback');
    const fallback = group.querySelector('.miao-share-fallback');
    const share = group.querySelector('.miao-share');
    let feedbackTimer;
    const announce = message => {
      clearTimeout(feedbackTimer);
      feedback.textContent = message;
      feedbackTimer = setTimeout(() => { feedback.textContent = ''; }, 3500);
    };
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(group);
    paintLike(group, readLike(key));
    group.hidden = false;

    group.querySelector('.miao-like').addEventListener('click', () => {
      const liked = group.querySelector('.miao-like').getAttribute('aria-pressed') !== 'true';
      memory.set(key, liked);
      try {
        if (liked) localStorage.setItem(key, '1');
        else localStorage.removeItem(key);
      } catch { /* A disabled storage setting should not block the button. */ }
      groups.get(key).forEach(other => paintLike(other, liked));
      announce(liked ? '谢谢你的喜欢 ♡' : '已取消点赞');
    });

    share.addEventListener('click', async () => {
      share.disabled = true;
      fallback.hidden = true;
      try {
        await navigator.clipboard.writeText(link);
        announce('链接已复制');
      } catch {
        clearTimeout(feedbackTimer);
        fallback.value = link;
        fallback.hidden = false;
        fallback.focus();
        fallback.select();
        feedback.textContent = '未能自动复制，请复制下方链接';
      } finally {
        share.disabled = false;
      }
    });
  });

  window.addEventListener('storage', event => {
    if (event.key === null) {
      groups.forEach((items, key) => items.forEach(group => paintLike(group, readLike(key))));
    } else if (groups.has(event.key)) {
      groups.get(event.key).forEach(group => paintLike(group, event.newValue === '1'));
    }
  });
})();

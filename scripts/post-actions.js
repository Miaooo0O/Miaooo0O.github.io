'use strict';

const { escapeHTML, stripHTML } = require(require.resolve('hexo-util', {
  paths: [require.resolve('hexo')]
}));

hexo.extend.filter.register('after_render:html', html => html.replace(
  /<article\b[^>]*>[\s\S]*?<\/article>/g,
  article => {
    if (!/<article\b[^>]*class="post-content"/.test(article) || article.includes('class="miao-post-actions"')) return article;
    const permalink = /<link\b[^>]*itemprop="mainEntityOfPage"[^>]*href="([^"]+)"/.exec(article);
    const heading = /<h[12]\b[^>]*class="post-title[^\"]*"[^>]*>([\s\S]*?)<\/h[12]>/.exec(article);
    if (!permalink || !heading) return article;
    const title = escapeHTML(stripHTML(heading[1]).trim());
    const actions = `<div class="miao-post-actions" data-url="${permalink[1]}" data-title="${title}" hidden>
      <div class="miao-action-buttons">
        <button class="miao-like" type="button" aria-pressed="false"><span class="miao-heart" aria-hidden="true">♡</span><span class="miao-like-label">点赞</span></button>
        <button class="miao-share" type="button"><span aria-hidden="true">↗</span>转发</button>
      </div>
      <span class="miao-action-feedback" role="status" aria-live="polite" aria-atomic="true"></span>
      <input class="miao-share-fallback" type="text" aria-label="文章链接，请手动复制" readonly hidden>
    </div>`;
    return article.replace(/(<footer\b[^>]*class="post-footer"[^>]*>)/, `$1${actions}`);
  }
), 20);

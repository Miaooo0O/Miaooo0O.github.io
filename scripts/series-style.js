'use strict';

const { escapeHTML, stripHTML } = require(require.resolve('hexo-util', {
  paths: [require.resolve('hexo')]
}));

function identifySeries(title) {
  const match = /^\s*([\p{Script=Han}A-Za-z0-9]+物[语語])/u.exec(title);
  if (!match) return null;
  const name = match[1];
  const key = name.replace(/氫/g, '氢').replace(/語/g, '语');
  if (key === '氢物语') return { name, key, palette: 'blue', symbol: 'H', number: '1' };
  if (key === '碳物语') return { name, key, palette: 'violet', symbol: 'C', number: '6' };
  const palettes = ['rose', 'gold', 'green', 'blue', 'violet'];
  let hash = 0;
  for (const character of key) hash = (hash * 31 + character.codePointAt(0)) >>> 0;
  return { name, key, palette: palettes[hash % palettes.length], symbol: Array.from(name)[0] };
}

function seriesIcon(series) {
  return `<span class="miao-series-icon" aria-hidden="true">${series.number ? `<small>${series.number}</small>` : ''}<b>${escapeHTML(series.symbol)}</b></span>`;
}

// Decorate the generated markup so the series remains visible without JavaScript.
hexo.extend.filter.register('after_render:html', html => html.replace(
  /<article\b[^>]*>[\s\S]*?<\/article>/g,
  article => {
    if (article.includes('data-miao-series=')) return article;
    const title = /<(?:h1|h2|div)\b[^>]*class="post-title(?:\s[^" ]*)?"[^>]*>([\s\S]*?)<\/(?:h1|h2|div)>/.exec(article);
    if (!title) return article;
    const series = identifySeries(stripHTML(title[1]));
    if (!series) return article;

    article = article.replace(/<article\b/, `<article data-miao-series="${escapeHTML(series.key)}" data-miao-palette="${series.palette}"`);
    if (/<article\b[^>]*class="post-content"/.test(article)) {
      const badge = `<div class="miao-series-badge">${seriesIcon(series)}<span>${escapeHTML(series.name)}</span></div>`;
      return article.replace(/(<header\b[^>]*class="post-header"[^>]*>)/, `$1${badge}`);
    }
    return article.replace(/(<a\b[^>]*class="post-title-link(?:\s[^" ]*)?"[^>]*>)/,
      `$1<span class="miao-series-archive-icon" title="系列：${escapeHTML(series.name)}">${seriesIcon(series)}</span>`);
  }
));

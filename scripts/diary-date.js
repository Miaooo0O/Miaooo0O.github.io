'use strict';

// Extended diary hours (for example, 25:00) belong to the written diary day.
// Keep the original front matter intact and use that day for site dates.
hexo.extend.filter.register('before_generate', function () {
  return Promise.all(hexo.model('Post').map(post => {
    const frontMatter = /^---\s*\r?\n([\s\S]*?)\r?\n---/.exec(post.raw);
    if (!frontMatter) return;
    const match = /^date:\s*['"]?(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})['"]?\s*$/m.exec(frontMatter[1]);
    if (!match || Number(match[4]) < 24) return;

    post.date = post.date.clone().utcOffset(8)
      .date(1)
      .year(Number(match[1]))
      .month(Number(match[2]) - 1)
      .date(Number(match[3]))
      .hour(Number(match[4]) % 24)
      .minute(Number(match[5]))
      .second(Number(match[6])).utc();
    return post.save();
  }));
}, 1);

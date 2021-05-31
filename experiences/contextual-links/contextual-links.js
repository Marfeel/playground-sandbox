window.marfeel = window.marfeel || {};
window.marfeel.cmd = window.marfeel.cmd || [];

function findUrlForFirstLink() {
    const selectors = [
      '.content-background a',
      '.articleBody a',
      'article a'
    ];

  const links = selectors.flatMap((selector) => [
    ...document.querySelectorAll(selector)
  ]);
  const urls = links.map((link) => link.getAttribute('href')).filter(Boolean);

  const [firstUrl, secondUrl] = urls;

  return secondUrl || firstUrl;
}

window.marfeel.cmd.push([
  'flowcards',
  (flowcards) => {
    const url = findUrlForFirstLink();

    if (!url) {
      console.log('Link not found.');
      return;
    }

    console.log(`Found link: ${url}.`);

    flowcards.addTargeting('template', 'contextual_v2');
    flowcards.addTargeting('url', url);
  }
]);

/**
 * This example uses the Marfeel Javascript SDK to serve Flowcards.
 * The Flowcard's document URL uses variable substitution to
 * change the content of the Flowcard at runtime using the
 * `url` parameter.
 */

window.marfeel = window.marfeel || {};
window.marfeel.cmd = window.marfeel.cmd || [];

window.marfeel.cmd.push([
  'flowcards',
  (flowcards) => {
    const url = 'https://playground.marfeel.com/experiences/featured_article_amp/featured_article_amp.html';

    flowcards.addTargeting('template', 'contextual_v2');
    flowcards.addTargeting('url', url);
  }
]);

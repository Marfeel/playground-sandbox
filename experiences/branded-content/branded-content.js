/**
 * This example uses the Marfeel Javascript SDK to serve Flowcards.
 * The Flowcards will not be initialized until Google Tag Manager 
 * has been configured.
 */

 window.marfeel = window.marfeel || {};
 window.marfeel.cmd = window.marfeel.cmd || [];

function requestBrandedContent() {
    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(function () {
      window.googletag.defineOutOfPageSlot('/22571134/crispr/demo.marfeel.com', 'flowcards-slot').addService(googletag.pubads());
      window.googletag.enableServices();
      window.googletag.display('flowcards-slot');
  });
}

requestBrandedContent();

window.marfeel.config = {
  flowcards: {
    waitFor: {
      timeout: 2000
    }
  }
 };

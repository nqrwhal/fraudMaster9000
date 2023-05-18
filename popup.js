
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === 'SET_POPUP') {
    let body = document.getElementById('extension-popup');
    let text = document.getElementById('extension-text');
    body.style.backgroundColor = request.color;
    text.innerHTML = request.text;
  }
});

document.addEventListener('DOMContentLoaded', (event) => {
  // Query the active tab and reload it
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.reload(tabs[0].id);
  });});

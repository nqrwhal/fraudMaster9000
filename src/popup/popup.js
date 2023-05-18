// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  // Find the button element
  var button = document.getElementById('loop_start_button');
  
  // Add a click event listener to the button
  button.addEventListener('click', function() {
    // Send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'loop!' });
    });
  });
});
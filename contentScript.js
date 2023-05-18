let LoopNode = document.evaluate('/html/body/noscript/text()', document, null, XPathResult.STRING_TYPE, null);
let ReturnlyXpath = '//*[@class="not-customizable-gray-600" and @href="https://www.returnly.com/powered-by-returnly"]';
let ReturnlyNode = document.evaluate(ReturnlyXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


let loopresult = LoopNode.stringValue;
if (loopresult.includes('Loop returns') || ReturnlyNode) {
  chrome.runtime.sendMessage({cmd: 'SET_POPUP', color: 'lightgreen', text: 'detected!'});
} else {
  chrome.runtime.sendMessage({cmd: 'SET_POPUP', color: 'white', text: ''});
}

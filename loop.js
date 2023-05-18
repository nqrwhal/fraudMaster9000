async function executeCode(code) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(arrayOfTabs) {
        chrome.tabs.executeScript(arrayOfTabs[0].id, {
            code: code
        });
    });
}

async function startLoop() {
    function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
    }
    
    const numItems = document.getElementsByClassName("product-card exchange-item card").length;
    console.log(numItems);
    for (let i = 0; i < numItems; i++) {
        await addToReturn(i);
        await sleep(500);
    }
}


async function addToReturn(index) {
    await executeCode(`document.getElementsByClassName("product-card exchange-item card")[${index}].click()`);
    let reasons = document.getElementsByClassName("base-button regular secondary select-reason__button progress-button");
    await clickReason(reasons.length - 1);
}

async function clickReason(index) {
    function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
    await executeCode(`document.getElementsByClassName("base-button regular secondary select-reason__button progress-button")[${index}].click();`);
    await sleep(250);
    const numSecondaryReasons = document.getElementsByClassName("base-button regular secondary select-reason__button progress-button");
    await sleep(250);
    if (numSecondaryReasons.length > 0) {
        await executeCode(`document.getElementsByClassName("base-button regular secondary select-reason__button progress-button")[${numSecondaryReasons.length - 1}].click();`);
    }
    const hasCommentBox = document.getElementsByClassName("add-comment__textarea");
    await sleep(250);
    const submitButton = document.getElementsByClassName("base-button regular primary add-comment__submit");
    await sleep(250);
    if (hasCommentBox.length > 0) {
        await writeComent("add-comment-field", "I am returning this item because it is defective.");
        await sleep(250);
    }
    if (submitButton.length > 0) {
        await executeCode(`document.getElementsByClassName("base-button regular primary add-comment__submit")[0].click();`);
        await sleep(250);
    }
    const finalizeButton = document.getElementsByClassName("base-button regular secondary convert-item__button progress-button convert-item__button");
    await sleep(250);
    await executeCode(`document.getElementsByClassName("base-button regular secondary convert-item__button progress-button convert-item__button")[${finalizeButton.length - 1}].click();`);
}

async function writeComent(id, text) {
    let commentBox = document.getElementById(id);
    if (commentBox) {
        commentBox.value = text;
    }
}
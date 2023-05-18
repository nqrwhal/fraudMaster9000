chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'loop!') {
        loop();
    }
  });


function loop() {
    setTimeout(() => {
        const numItems = document.getElementsByClassName("product-card exchange-item card").length;
        for (let i = 0; i < numItems; i++) {
            setTimeout(addToReturn, 100, i);
        }} , 500);
}


function addToReturn(index) {
    setTimeout(() => {
        document.getElementsByClassName("product-card exchange-item card")[index].click();
        setTimeout(() => {
            const numReasons = document.getElementsByClassName("base-button regular secondary select-reason__button progress-button");
            setTimeout(() => clickReason(numReasons.length - 1), 500, 0);
        }, 500);
    }, 500);
}

function clickReason(index) {
    setTimeout(() => {
        const reasonArr = document.getElementsByClassName("base-button regular secondary select-reason__button progress-button");
        if (reasonArr[0]) {
            reasonArr[0].click();
        }
        const numSecondaryReasons = document.getElementsByClassName("base-button regular secondary select-reason__button progress-button");
        setTimeout(() => {
            if (numSecondaryReasons.length > 0) {
                numSecondaryReasons[numSecondaryReasons.length - 1].click();
            }
            setTimeout(() => {
                const hasCommentBox = document.getElementsByClassName("add-comment__textarea");
                setTimeout(() => {
                    const submitButton = document.getElementsByClassName("base-button regular primary add-comment__submit");
                    if (hasCommentBox.length > 0) {
                        setTimeout(writeComent("add-comment-field", "I am returning this item because it is defective."), 500);
                    }
                    if (submitButton.length > 0) {
                        setTimeout(() => submitButton[0].click(), 500);
                    }
                    setTimeout(() => {
                        const finalizeButton = document.getElementsByClassName("base-button regular secondary convert-item__button progress-button convert-item__button");
                        setTimeout(() => {
                            finalizeButton[finalizeButton.length - 1].click();
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }, 500);
}

function writeComent(id, text) {
    let commentBox = document.getElementById(id);
    if (commentBox) {
        commentBox.value = text;
    }
}
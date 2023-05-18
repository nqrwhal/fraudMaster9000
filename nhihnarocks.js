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
    await executeCode(`
    async function main() {
        const numItems = document.getElementsByClassName("product-card exchange-item card").length;
        console.log(numItems);
        for (let i = 0; i < numItems; i++) {
            await addToReturn(i);
            await sleep(350);
        }
    }

    async function addToReturn(index) {
        let one = document.getElementsByClassName("product-card exchange-item card")[index];
        await one.click();
        await sleep(300);
        await clickReason(0);
    }

    async function clickReason() {
        await document.getElementsByClassName("base-button regular secondary select-reason__button progress-button")[0].click();
        await sleep(350);
        let numSecondaryReasons = document.getElementsByClassName("base-button regular secondary select-reason__button progress-button");

        if (numSecondaryReasons.length > 0) {
            await document.getElementsByClassName("base-button regular secondary select-reason__button progress-button")[numSecondaryReasons.length - 1].click();
            await sleep(350);
        }

        let hasCommentBox = document.getElementsByClassName("add-comment__textarea");
        let submitButton = document.getElementsByClassName("base-button regular primary add-comment__submit");

        if (hasCommentBox.length > 0) {
            await writeComment("add-comment-field", "I am returning this item because it is defective.");
            await sleep(250);
        }
        if (submitButton.length > 0) {
            await document.getElementsByClassName("base-button regular primary add-comment__submit")[0].click();
            await sleep(300);
        }
        
        let finalizeButton = document.getElementsByClassName("base-button regular secondary convert-item__button progress-button convert-item__button");
        await sleep(350);
        await finalizeButton[finalizeButton.length - 1].click();
    }
    
    async function writeComment(id, text) {
        let commentBox = document.getElementById(id);
        commentBox.value = text;

    }

    async function sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
    }

    async function gofast() {
        const styleElement = document.createElement('style');
        styleElement.textContent = '* {animation: none !important; transition: none !important;}';
        await document.head.appendChild(styleElement);
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            const computedStyle = getComputedStyle(element);
            const animationName = computedStyle.animationName;
            if (animationName !== 'none') {
                element.style.animation = 'none';
            }
        });
    }

    main();
    `)
}

async function startReturnly() {
    await executeCode(`
        async function main() {
            const numItems = document.getElementsByClassName("product product-wrapper returnable-product").length;
            console.log(numItems);
            gofast();
            for (let i = 0; i < numItems; i++) {
                await stanley(i);
                
            }
            let round = document.getElementById('multiproduct-next');
            await round.click();
        };

        function sleep(ms) {
            return new Promise((resolve) => {
            setTimeout(resolve, ms);
            });
        };

        async function stanley(index) {
            let big = document.getElementsByClassName("product-details-wrapper")[index];
            await big.click();
            let small = document.getElementsByClassName("cause")[1];
            await small.click();
            let medium = document.getElementById('continue-button');
            await medium.click();
            await sleep(515);
        }
        
        async function gofast() {
            const styleElement = document.createElement('style');
            styleElement.textContent = '* { animation-duration: 0s !important; animation-play-state: paused; }';
            await document.head.appendChild(styleElement);
        }

        main();
    `)
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("startLoop").addEventListener("click", startLoop);
    document.getElementById("startReturnly").addEventListener("click", startReturnly);
});
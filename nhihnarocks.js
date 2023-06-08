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
        await sleep(600);
        await clickReason(0);
    }

    async function clickReason() {
        try {

            const yesNoButtons = document.getElementsByClassName("yes-no-question slide-module__component");
            if (yesNoButtons.length > 0) {
                await document.getElementsByClassName("base-button small secondary")[1].click();
                await sleep(550);
            }
            const selectReasonButtons = document.getElementsByClassName("base-button regular secondary select-reason__button progress-button");
            if (selectReasonButtons.length > 0) {
                await selectReasonButtons[0].click();
                await sleep(550);
            }
    
            const numSecondaryReasons = document.getElementsByClassName("base-button regular secondary select-reason__button progress-button");
            if (numSecondaryReasons.length > 0) {
                await numSecondaryReasons[0].click();
                await sleep(550);
            }
    
            const hasCommentBox = document.getElementsByClassName("add-comment__textarea");
            if (hasCommentBox.length > 0) {
                simulateTyping("I changed my mind and want to return the item.", hasCommentBox[0]);
            }
    
            const submitButton = document.getElementsByClassName("base-button regular primary add-comment__submit");
            if (submitButton.length > 0) {
                await submitButton[0].click();
            }
            await sleep(550);
            const finalizeButton = document.getElementsByClassName("base-button regular secondary convert-item__button progress-button convert-item__button");
            if (finalizeButton.length > 0) {
                await sleep(450)
                try{
                    await finalizeButton[finalizeButton.length - 1].click();
                } catch (error) {
                    await console.log("error");
                    await finalizeButton[finalizeButton.length - 1].click();
                }
                
            }
            
            await sleep(850);
        } catch (error) {
            // Handle the error
            console.error("An error occurred:", error);
        }
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

    async function simulateTyping(text, element) {
        // Trigger the event listener function for input event
        element.value = text;
        const event = new Event('input', { bubbles: true });
        element.dispatchEvent(event);
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
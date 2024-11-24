javascript:(function() {
    const email = '<Your Gmail-ID>';
    const scriptUrl = '<Your Google Apps Script Web URL>';

    function triggerEvent(el, eventType) {
        const event = new Event(eventType, { bubbles: true, cancelable: true });
        el.dispatchEvent(event);
    }

    function simulateClick(el) {
        const event = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
        el.dispatchEvent(event);
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function waitForElement(selector, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            (function check() {
                const element = document.querySelector(selector);
                if (element) {
                    resolve(element);
                } else if (Date.now() - start > timeout) {
                    reject(new Error('Timeout waiting for element'));
                } else {
                    setTimeout(check, 100);
                }
            })();
        });
    }

    async function main() {
        try {
            const loginButton = await waitForElement('#mainDivision > div > div > section.bodyBgc > div.header > div > div.menuGrid > table > tbody > tr > td:nth-child(5) > a');
            simulateClick(loginButton);
            await wait(5000);

            const emailInput = document.querySelector('#inputdefault');
            if (emailInput) {
                emailInput.value = email;
                triggerEvent(emailInput, 'input');
                triggerEvent(emailInput, 'keyup');
            }

            const captchaInput = document.querySelector('#userCaptcha');
            const captchaText = document.querySelector('label.control-label.input-sm.ng-binding')?.textContent.trim();
            if (captchaInput && captchaText) {
                captchaInput.value = captchaText;
                triggerEvent(captchaInput, 'input');
                triggerEvent(captchaInput, 'keyup');
            }

            const nextButton = await waitForElement('#loginForm > div:nth-child(7) > button:nth-child(1)');
            simulateClick(nextButton);
            await wait(10000);

            const response = await fetch(scriptUrl);
            const data = await response.json();
            const otp = data.otp.trim();

            const otpInput = document.querySelector('#loginOtp');
            if (otpInput) {
                otpInput.value = otp;
                triggerEvent(otpInput, 'input');
                triggerEvent(otpInput, 'keyup');
            }

            const submitButton = document.querySelector('#verifyLoginOTPBtn');
            if (submitButton) {
                simulateClick(submitButton);
            }
        } catch (error) {
            console.error('Error during the automation process:', error);
        }
    }

    main();
})();

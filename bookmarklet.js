javascript:(function() {
    const email = '<Your Email-ID>';
    const scriptUrl = '<Your Google Apps Script Web URL>';

    // Helper function to trigger an event
    function triggerEvent(el, eventType) {
        const event = new Event(eventType, { bubbles: true, cancelable: true });
        el.dispatchEvent(event);
    }

    // Helper function to simulate a click
    function simulateClick(el) {
        const event = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
        el.dispatchEvent(event);
    }

    // Helper function to wait for a specific time
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Helper function to wait for an element in the DOM
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

    // Main automation process
    async function main() {
        try {
            // Step 1: Click the login button
            const loginButton = await waitForElement('#mainDivision > div > div > section.bodyBgc > div.header > div > div.menuGrid > table > tbody > tr > td:nth-child(5) > a');
            simulateClick(loginButton);
            await wait(5000);

            // Step 2: Fill the email
            const emailInput = document.querySelector('#inputdefault');
            if (emailInput) {
                emailInput.value = email;
                triggerEvent(emailInput, 'input');
                triggerEvent(emailInput, 'keyup');
            }

            // Step 3: Fill the CAPTCHA
            const captchaInput = document.querySelector('#userCaptcha');
            const captchaText = document.querySelector('label.control-label.input-sm.ng-binding')?.textContent.trim();
            if (captchaInput && captchaText) {
                captchaInput.value = captchaText;
                triggerEvent(captchaInput, 'input');
                triggerEvent(captchaInput, 'keyup');
            }

            // Step 4: Click the next button
            const nextButton = await waitForElement('#loginForm > div:nth-child(7) > button:nth-child(1)');
            simulateClick(nextButton);
            await wait(10000);

            // Step 5: Fetch OTP from the script
            const response = await fetch(scriptUrl);
            const data = await response.json();
            const otp = data.otp.trim();

            // Step 6: Fill the OTP
            const otpInput = document.querySelector('#loginOtp');
            if (otpInput) {
                otpInput.value = otp;
                triggerEvent(otpInput, 'input');
                triggerEvent(otpInput, 'keyup');
            }

            // Step 7: Submit the OTP
            const submitButton = document.querySelector('#verifyLoginOTPBtn');
            if (submitButton) {
                simulateClick(submitButton);
            }
        } catch (error) {
            console.error('Error during the automation process:', error);
        }
    }

    // Execute the main function
    main();
})();

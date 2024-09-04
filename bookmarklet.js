javascript:(function(){
    function triggerEvent(el, eventType) {
        var event = new Event(eventType, { bubbles: true, cancelable: true });
        el.dispatchEvent(event);
    }

    function simulateClick(el) {
        var event = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
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
        var emailInput = document.querySelector('#inputdefault');
        emailInput.value = '<Email or Username>';
        triggerEvent(emailInput, 'input');
        triggerEvent(emailInput, 'keyup');

        var captchaInput = document.querySelector('#userCaptcha');
        var captchaText = document.querySelector('label.control-label.input-sm.ng-binding').textContent.trim();
        captchaInput.value = captchaText;
        triggerEvent(captchaInput, 'input');
        triggerEvent(captchaInput, 'keyup');

        try {
            console.log('Looking for the Next button...');
            var nextButton = await waitForElement("#loginForm > div:nth-child(7) > button:nth-child(1)");
            console.log('Next button found:', nextButton);
            simulateClick(nextButton);
        } catch (error) {
            console.error('Next button not found or failed to click:', error);
            return;
        }

        await wait(10000);

        try {
            var response = await fetch('<Your App Script Web App Url>');
            var data = await response.json();
            var otp = data.otp.trim();

            var otpInput = document.querySelector('#loginOtp');
            otpInput.value = otp;
            triggerEvent(otpInput, 'input');
            triggerEvent(otpInput, 'keyup');

            var loginButton = document.querySelector('#verifyLoginOTPBtn');
            if (loginButton) {
                simulateClick(loginButton);
            } else {
                console.error('Login button not found.');
            }
        } catch (error) {
            console.error('Failed to fetch OTP or login:', error);
        }
    }

    main();
})();

### **TCS NextStep Login automation for TCSer:**
- **Bookmarklet.js:** Automates the TCS NextStep login process by filling in the username and CAPTCHA, clicking the "Next" button, retrieving the OTP from a Google Apps Script web app, and completing the login.
- **Code.gs:** A Google Apps Script that fetches the OTP from your Gmail and returns it in JSON format.

### **Note:**
**The Gmail account used in the TCS NextStep login username and the Gmail account used to create the Google Apps Script web app must be the same.** This is essential for the script to correctly fetch the OTP from your Gmail.

### **Implementation Steps:**

#### **Step 1: Set Up Google Apps Script (Code.gs)**

1. **Create a New Google Apps Script:**
   - Visit [Google Apps Script](https://script.google.com/).
   - Start a new project and remove any default code.

2. **Paste Your Code.gs:**
   - Copy the code from your `code.gs` file and paste it into the script editor.

3. **Deploy as a Web App:**
   - Click "Deploy" > "New deployment."
   - Choose "Web app" as the deployment type.
   - Set "Who has access" to "Anyone" or "Anyone with the link."
   - Click "Deploy" and authorize the script if prompted.
   - Copy the generated web app URL.

#### **Step 2: Modify Bookmarklet.js**

1. **Edit Bookmarklet Code:**
   - Open `bookmarklet.js`.
   - Replace `'<Your Google App Script Web App URL>'` with the URL you copied from the Google Apps Script deployment.

2. **Prepare for Bookmarking:**
   - Ensure the script is a single line of code without comments or extra whitespace.
   - Prefix the script with `javascript:` to format it as a bookmarklet.

#### **Step 3: Create the Bookmark**

1. **Open Bookmark Manager:**
   - Use `Ctrl+Shift+O` in your browser or access it through the browser menu.

2. **Add a New Bookmark:**
   - Click "Add new bookmark."
   - Enter a name for the bookmark (e.g., "Auto Login").
   - Paste the entire code from `bookmarklet.js` (starting with `javascript:`) into the URL field.

3. **Save the Bookmark:**
   - Save or finalize creating the bookmark.

#### **Step 4: Use the Bookmarklet**

1. **Navigate to the Login Page:**
   - Go to the [TCS NextStep](https://nextstep.tcs.com/campus/#/).

2. **Execute the Bookmarklet:**
   - Click the bookmark you created.
   - The script will run, clicking on the login button, filling in the login details, retrieving the OTP via Google Apps Script, and completing the login.

### **Summary:**
- **Bookmarklet.js:** Automates the login process.
- **Code.gs:** Fetches OTP from Gmail.
- **Bookmark:** Contains the `bookmarklet.js` code for execution.

If you have any more questions or need further assistance, just let me know!

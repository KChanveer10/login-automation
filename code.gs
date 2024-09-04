function doGet() {
  var query = 'subject:"TCS NextStep: Login Email ID Verification"'; // Email subject
  var threads = GmailApp.search(query);

  // Check if there are any threads
  if (threads.length > 0) {
    // Sort threads by date, newest first
    threads.sort(function(a, b) {
      return b.getLastMessageDate() - a.getLastMessageDate();
    });

    // Get the most recent thread
    var latestThread = threads[0];
    var messages = latestThread.getMessages();
    var latestMessage = messages[messages.length - 1]; // Get the most recent message in the thread
    var body = latestMessage.getPlainBody();

    // Regular expression to match the OTP in the email body
    var otpRegex = /Your One Time Password \(OTP\) for login: (\w+)/;
    var matches = body.match(otpRegex);

    // Check if OTP is found
    if (matches && matches[1]) {
      var otp = matches[1];
      console.log(otp);
      return ContentService.createTextOutput(JSON.stringify({ otp: otp })).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ error: 'OTP not found in the email body.' })).setMimeType(ContentService.MimeType.JSON);
    }
  } else {
    return ContentService.createTextOutput(JSON.stringify({ error: 'No emails found with the specified subject.' })).setMimeType(ContentService.MimeType.JSON);
  }
}

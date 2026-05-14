# Google Apps Script Setup Guide for Majay Enrollment Form

This guide will help you connect your enrollment form to Google Sheets using Google Apps Script. This is a completely free solution owned by you.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ New"** and create a new spreadsheet
3. Name it `"Majay Enrollment Submissions"`
4. In the first row, add these column headers:
   - A: `timestamp`
   - B: `fullName`
   - C: `phone`
   - D: `email`
   - E: `course`
   - F: `startDate`
   - G: `note`

Your sheet should look like this:
```
| timestamp | fullName | phone | email | course | startDate | note |
```

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Tools** > **Script editor**
2. A new Google Apps Script project will open
3. Delete any default code and paste this script:

```javascript
function doPost(e) {
  try {
    // Get the spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Create a new row with the data
    const newRow = [
      data.timestamp || new Date().toISOString(),
      data.fullName || '',
      data.phone || '',
      data.email || '',
      data.course || '',
      data.startDate || '',
      data.note || ''
    ];
    
    // Append the row to the sheet
    sheet.appendRow(newRow);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data saved to Google Sheets'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** button (or Ctrl+S / Cmd+S)
5. Give your project a name (e.g., "Majay Enrollment")

## Step 3: Deploy as a Web App

1. Click **Deploy** > **New deployment** (top right)
2. Click the **Select type** dropdown and choose **Web app**
3. Configure the deployment:
   - **Execute as**: Select your Google account
   - **Who has access**: Select **"Anyone"** (this allows the form to send data)
4. Click **Deploy**
5. You'll see a dialog with a **Deployment ID** and a warning. Click **Authorize access**
6. Google will ask for permissions - click **Allow**
7. A new window will show your **Web app URL** - **COPY THIS URL**

Example URL will look like:
```
https://script.google.com/macros/d/[DEPLOYMENT_ID]/userweb/do
```

## Step 4: Add the Google Apps Script URL to Your Project

1. Go back to your deployment settings in v0
2. Click **Settings** (top right) > **Vars**
3. Add a new environment variable:
   - **Key**: `GOOGLE_APPS_SCRIPT_URL`
   - **Value**: Paste the Web app URL you copied in Step 3
4. Click **Save**

That's it! Your enrollment form will now automatically send submissions to your Google Sheet.

## Testing

1. Go back to your website
2. Click "Enroll Now" on any of the buttons
3. Fill in the form with test data
4. Click "Complete Enrollment"
5. You should see a success message
6. Go back to your Google Sheet and refresh - you should see the new row with your data!

## Updating the Script

If you need to modify the Google Apps Script (e.g., add more columns):

1. Go to your Google Sheet
2. Click **Tools** > **Script editor**
3. Make your changes to the script
4. Click **Save**
5. You do NOT need to redeploy - the changes take effect immediately

## Troubleshooting

**Form submits but data doesn't appear in Google Sheets:**
- Make sure the `GOOGLE_APPS_SCRIPT_URL` environment variable is set correctly
- Check that your Google Apps Script deployment has "Anyone" access
- Make sure the sheet column headers match the script field names

**"Authorization required" error:**
- Go back to the Google Apps Script editor
- Click **Deploy** > **Manage deployments**
- Check that it's set to execute as your account with "Anyone" access

**Want to add more fields?**
- Add the column header to your Google Sheet
- Update the `newRow` array in the script to include the new field
- No changes needed to the website - it will automatically send any new form fields

## Need Help?

The Google Apps Script solution is completely owned by you and free forever. All enrollment data is stored in your Google Sheets account, which you can access and export anytime.

---

**Ready to deploy?** Push your code to production and start collecting enrollments!

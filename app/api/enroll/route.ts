import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { sendEnrollmentNotification } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.fullName || !body.phone || !body.email || !body.startDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
    const credentialsStr = process.env.GOOGLE_SHEETS_CREDENTIALS;

    if (!sheetId || !credentialsStr) {
      console.error('[v0] Google Sheets credentials or Sheet ID not configured');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Parse the credentials from the environment variable
    const credentials = JSON.parse(credentialsStr);
    const formattedPrivateKey = credentials.private_key.replace(/\\n/g, '\n');

    // Configure JWT auth client
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: formattedPrivateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    await auth.authorize();

    const sheets = google.sheets({ version: 'v4', auth });

    // Append the data to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Enrollments!A:G',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            body.fullName,
            body.phone,
            body.email,
            body.course || 'Class 1',
            body.startDate,
            body.note || '',
          ],
        ],
      },
    });

    // Send Telegram notification
    try {
      await sendEnrollmentNotification({
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        course: body.course || 'Class 1',
        startDate: body.startDate,
        note: body.note || '',
      });
    } catch (telegramError) {
      console.error('Failed to send Telegram notification:', telegramError);
      // Continue with the response even if Telegram notification fails
    }

    return NextResponse.json(
      { message: 'Form submitted Successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

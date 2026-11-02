import { google } from "googleapis";

export const UNAVAILABLE_MESSAGE =
  "Your driver is currently far from your location. Please try again in a few minutes.";

// Returns true unless the Status tab says OFF.
// If the check itself fails, we return true so a sheet hiccup never blocks customers.
export async function getAvailability(): Promise<boolean> {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS!);
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    await auth.authorize();

    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID!,
      range: "Status!A1",
    });

    const value = String(res.data.values?.[0]?.[0] ?? "ON")
      .trim()
      .toUpperCase();
    return value !== "OFF";
  } catch (error) {
    console.error("Availability check failed:", error);
    return true;
  }
}
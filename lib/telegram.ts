// Telegram notification types
interface EnrollmentData {
  fullName: string;
  phone: string;
  email: string;
  course: string;
  startDate: string;
  note: string;
}

interface RideRequestData {
  name: string;
  phone: string;
  location: string;
  pickupTime: string;
  price: string;
  notes: string;
}

interface TelegramMessage {
  chat_id: string;
  text: string;
  parse_mode?: string;
}

// Send enrollment notification to Telegram
export async function sendEnrollmentNotification(data: EnrollmentData) {
  console.log("Preparing Telegram notification for enrollment");
  console.log("Enrollment data:", JSON.stringify(data, null, 2));

  try {
    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      console.warn("Telegram credentials not configured");
      return { success: false, message: "Telegram credentials not configured" };
    }
    
    // Format the message for Telegram
    const message = `
🆕 *New Driving School Enrollment*

📋 *Timestamp:* ${new Date().toLocaleString()}
👤 *Full Name:* ${data.fullName}
📞 *Phone:* ${data.phone}
📧 *Email:* ${data.email}
🚗 *Course:* ${data.course}
📅 *Start Date:* ${data.startDate}
${data.note ? `📝 *Note:* ${data.note}` : ''}
    `.trim();
    
    // Send the message to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );
    
    const responseData = await telegramResponse.json();
    
    if (!telegramResponse.ok) {
      throw new Error(`Telegram API error: ${responseData.description}`);
    }
    
    console.log("Enrollment Telegram notification sent successfully");
    return { success: true, message: "Enrollment notification sent successfully" };
  } catch (error) {
    console.error("Failed to send enrollment Telegram notification:", error);
    return { 
      success: false, 
      message: "Failed to send enrollment notification", 
      error 
    };
  }
}

// Send ride request notification to Telegram
export async function sendRideRequestNotification(data: RideRequestData) {
  console.log("Preparing Telegram notification for ride request");
  console.log("Ride request data:", JSON.stringify(data, null, 2));

  try {
    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
      console.warn("Telegram credentials not configured");
      return { success: false, message: "Telegram credentials not configured" };
    }
    
    // Format the message for Telegram
    const message = `
🆕 *New Ride Request*

📋 *Timestamp:* ${new Date().toLocaleString()}
👤 *Name:* ${data.name}
📞 *Phone:* ${data.phone}
📍 *Pickup Location:* ${data.location}
🕐 *Pickup Time:* ${data.pickupTime === 'Right Now' ? 'Right Now' : `Custom: ${data.customTime || 'Not specified'}`}
💰 *Price:* ${data.price}
${data.notes ? `📝 *Notes:* ${data.notes}` : ''}
    `.trim();
    
    // Send the message to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );
    
    const responseData = await telegramResponse.json();
    
    if (!telegramResponse.ok) {
      throw new Error(`Telegram API error: ${responseData.description}`);
    }
    
    console.log("Ride request Telegram notification sent successfully");
    return { success: true, message: "Ride request notification sent successfully" };
  } catch (error) {
    console.error("Failed to send ride request Telegram notification:", error);
    return { 
      success: false, 
      message: "Failed to send ride request notification", 
      error 
    };
  }
}

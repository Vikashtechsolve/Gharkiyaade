export async function sendContactFormEmail(formData) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'your-email@example.com', // Replace with your email
        subject: formData.subject,
        text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return { success: false, message: 'Failed to send email' };
  }
}

export async function sendOrderConfirmationEmail(order) {
  try {
    const responseEmail = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: order.email,
        subject: 'Order Confirmation - Gharkiyade',
        text: generateOrderConfirmationText(order),
        html: generateOrderConfirmationHTML(order),
      }),
    });

    // Remove SMS sending as Twilio credentials are missing
    // const responseSMS = await fetch('/api/send-sms', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     to: order.phone,
    //     body: `Dear ${order.name}, your order with Gharkiyade has been confirmed. Thank you for your purchase!`,
    //   }),
    // });

    const resultEmail = await responseEmail.json();
    // const resultSMS = await responseSMS.json();

    return {
      email: resultEmail,
      // sms: resultSMS,
      success: resultEmail.success,
    };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, message: 'Failed to send email' };
  }
}

export function generateOrderConfirmationEmailContent(order) {
  return {
    text: generateOrderConfirmationText(order),
    html: generateOrderConfirmationHTML(order),
  };
}

function generateOrderConfirmationText(order) {
  let text = `Dear ${order.name},\n\nThank you for your order from Gharkiyade!\n\nOrder Details:\n`;
  text += `Order Date: ${new Date(order.orderDate).toLocaleDateString()}\n\n`;
  text += 'Items:\n';
  order.items.forEach(item => {
    text += `- ${item.name} (Qty: ${item.quantity}) - ₹${item.price}\n`;
  });
  text += `\nTotal Amount: ₹${order.totalAmount}\n\n`;
  text += 'Shipping Address:\n';
  text += `${order.address}\n${order.city}, ${order.state} ${order.pincode}\n`;
  text += `Phone: ${order.phone}\n\n`;
  text += 'We will process your order soon. You will receive updates via email.\n\n';
  text += 'Thank you for choosing Gharkiyade!\n\nBest regards,\nGharkiyade Team';

  return text;
}

function generateOrderConfirmationHTML(order) {
  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Order Confirmation - Gharkiyade</h2>
      <p>Dear ${order.name},</p>
      <p>Thank you for your order from Gharkiyade!</p>
      
      <h3>Order Details</h3>
      <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
      
      <h4>Items Ordered:</h4>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Item</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
  `;

  order.items.forEach(item => {
    html += `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${item.price}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
      
      <p><strong>Total Amount: ₹${order.totalAmount}</strong></p>
      
      <h4>Shipping Address:</h4>
      <p>
        ${order.address}<br>
        ${order.city}, ${order.state} ${order.pincode}<br>
        Phone: ${order.phone}
      </p>
      
      <p>We will process your order soon. You will receive updates via email.</p>
      
      <p>Thank you for choosing Gharkiyade!</p>
      
      <p>Best regards,<br>Gharkiyade Team</p>
    </div>
  `;

  return html;
}

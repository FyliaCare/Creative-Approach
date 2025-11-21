import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Contact form email templates
export const sendContactFormEmails = async (formData) => {
  const transporter = createTransporter();
  const { name, email, phone, location, service, message } = formData;

  // Email to visuals@caghana.com
  const salesEmail = {
    from: `"CA Ghana Website" <${process.env.EMAIL_USER}>`,
    to: 'visuals@caghana.com',
    subject: `New Contact Form Submission - ${service || 'General Inquiry'}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0ea5e9; }
          .label { font-weight: bold; color: #0ea5e9; margin-bottom: 5px; }
          .value { margin-bottom: 15px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📩 New Contact Form Submission</h1>
            <p>Someone just contacted CA Ghana through the website!</p>
          </div>
          <div class="content">
            <div class="info-box">
              <div class="label">👤 Name:</div>
              <div class="value">${name}</div>
              
              <div class="label">📧 Email:</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
              
              <div class="label">📱 Phone:</div>
              <div class="value">${phone || 'Not provided'}</div>
              
              <div class="label">📍 Location:</div>
              <div class="value">${location || 'Not provided'}</div>
              
              <div class="label">🚁 Service Interested:</div>
              <div class="value">${service || 'Not specified'}</div>
            </div>
            
            <div class="info-box">
              <div class="label">💬 Message:</div>
              <div class="value">${message}</div>
            </div>
            
            <p style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
              ⚡ <strong>Action Required:</strong> Reply to this inquiry within 2 hours for best customer experience!
            </p>
          </div>
          <div class="footer">
            <p>CA Ghana - Professional Drone Services</p>
            <p>This email was sent from your website contact form</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  // Confirmation email to client
  const clientEmail = {
    from: `"CA Ghana" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for contacting CA Ghana! We'll respond within 2 hours`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .cta-button { display: inline-block; padding: 12px 30px; background: #0ea5e9; color: white; text-decoration: none; border-radius: 6px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Message Received!</h1>
            <p>Thank you for reaching out to CA Ghana</p>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            
            <p>We've received your inquiry and our team is already on it! 🚁</p>
            
            <div class="highlight-box">
              <h3 style="margin-top: 0; color: #10b981;">⚡ What Happens Next?</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li><strong>Within 2 hours:</strong> Our team will review your request</li>
                <li><strong>Same day:</strong> You'll receive a personalized response from visuals@caghana.com</li>
                <li><strong>Custom quote:</strong> If needed, we'll prepare a detailed proposal for your project</li>
              </ul>
            </div>
            
            <p><strong>📋 Your Inquiry Summary:</strong></p>
            <ul style="background: white; padding: 20px; border-radius: 8px;">
              <li><strong>Service:</strong> ${service || 'General Inquiry'}</li>
              <li><strong>Location:</strong> ${location || 'Not specified'}</li>
              <li><strong>Your Message:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</li>
            </ul>
            
            <p>Need immediate assistance? Call us at <strong>+233 541 500 716</strong></p>
            
            <a href="https://caghana.com" class="cta-button">Visit Our Website</a>
          </div>
          <div class="footer">
            <p><strong>CA Ghana - Professional Drone Services</strong></p>
            <p>📧 visuals@caghana.com | 📱 +233 541 500 716</p>
            <p>Based in Takoradi, Serving All of Ghana</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    // Send both emails
    await Promise.all([
      transporter.sendMail(salesEmail),
      transporter.sendMail(clientEmail),
    ]);
    
    return { success: true, message: 'Emails sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error(`Failed to send emails: ${error.message}`);
  }
};

// Quote request email templates
export const sendQuoteRequestEmails = async (quoteData) => {
  const transporter = createTransporter();
  const { 
    name, 
    email, 
    phone, 
    company,
    location, 
    service, 
    projectDetails,
    budget,
    timeline,
    additionalInfo 
  } = quoteData;

  // Email to visuals@caghana.com
  const salesEmail = {
    from: `"CA Ghana Website" <${process.env.EMAIL_USER}>`,
    to: 'visuals@caghana.com',
    subject: `🎯 New Quote Request - ${service}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b; }
          .label { font-weight: bold; color: #f59e0b; margin-bottom: 5px; }
          .value { margin-bottom: 15px; }
          .priority { background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Quote Request!</h1>
            <p>High-priority lead from website</p>
          </div>
          <div class="content">
            <div class="priority">
              <strong>⚡ PRIORITY LEAD:</strong> This client has requested a custom quote and expects a response within 2 hours!
            </div>
            
            <div class="info-box">
              <h3 style="margin-top: 0;">👤 Client Information</h3>
              <div class="label">Name:</div>
              <div class="value">${name}</div>
              
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
              
              <div class="label">Phone:</div>
              <div class="value">${phone || 'Not provided'}</div>
              
              ${company ? `<div class="label">Company:</div><div class="value">${company}</div>` : ''}
              
              <div class="label">Location:</div>
              <div class="value">${location}</div>
            </div>
            
            <div class="info-box">
              <h3 style="margin-top: 0;">🚁 Project Details</h3>
              <div class="label">Service Requested:</div>
              <div class="value">${service}</div>
              
              ${budget ? `<div class="label">Budget Range:</div><div class="value">${budget}</div>` : ''}
              
              ${timeline ? `<div class="label">Timeline:</div><div class="value">${timeline}</div>` : ''}
              
              <div class="label">Project Description:</div>
              <div class="value">${projectDetails}</div>
              
              ${additionalInfo ? `<div class="label">Additional Information:</div><div class="value">${additionalInfo}</div>` : ''}
            </div>
            
            <div style="background: #dcfce7; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
              <strong>📋 Next Steps:</strong>
              <ol style="margin: 10px 0; padding-left: 20px;">
                <li>Review project requirements</li>
                <li>Prepare custom quote</li>
                <li>Respond to client within 2 hours</li>
                <li>Schedule consultation call if needed</li>
              </ol>
            </div>
          </div>
          <div class="footer">
            <p>CA Ghana - Professional Drone Services</p>
            <p>Respond quickly to convert this lead!</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  // Confirmation email to client
  const clientEmail = {
    from: `"CA Ghana" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Your Custom Quote Request - CA Ghana Will Respond Within 2 Hours! 🚁`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .highlight-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .cta-button { display: inline-block; padding: 12px 30px; background: #f59e0b; color: white; text-decoration: none; border-radius: 6px; margin-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Quote Request Received!</h1>
            <p>We're preparing your custom proposal</p>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            
            <p>Exciting news! We've received your custom quote request for <strong>${service}</strong> and our team is already working on it! 🚁</p>
            
            <div class="highlight-box">
              <h3 style="margin-top: 0; color: #10b981;">⚡ What Happens Next?</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li><strong>Within 2 hours:</strong> Our team will review your project requirements in detail</li>
                <li><strong>Same day:</strong> You'll receive a personalized custom quote from visuals@caghana.com</li>
                <li><strong>Free consultation:</strong> We'll schedule a call to discuss your project if needed</li>
                <li><strong>Site assessment:</strong> If required, we can visit your location for accurate pricing</li>
              </ul>
            </div>
            
            <p><strong>📋 Your Quote Request Summary:</strong></p>
            <ul style="background: white; padding: 20px; border-radius: 8px;">
              <li><strong>Service:</strong> ${service}</li>
              <li><strong>Location:</strong> ${location}</li>
              ${timeline ? `<li><strong>Timeline:</strong> ${timeline}</li>` : ''}
              <li><strong>Project Details:</strong> ${projectDetails.substring(0, 100)}${projectDetails.length > 100 ? '...' : ''}</li>
            </ul>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>💡 While you wait:</strong> Check out our portfolio and past projects at <a href="https://caghana.com/portfolio">caghana.com/portfolio</a></p>
            </div>
            
            <p><strong>Need immediate assistance?</strong> Call us at <strong>+233 541 500 716</strong></p>
            
            <a href="https://caghana.com/services" class="cta-button">Explore Our Services</a>
          </div>
          <div class="footer">
            <p><strong>CA Ghana - Professional Drone Services</strong></p>
            <p>📧 visuals@caghana.com | 📱 +233 541 500 716</p>
            <p>Based in Takoradi, Serving All of Ghana</p>
            <p style="margin-top: 10px; font-size: 11px;">GCAA Certified | 500+ Projects Completed</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    // Send both emails
    await Promise.all([
      transporter.sendMail(salesEmail),
      transporter.sendMail(clientEmail),
    ]);
    
    return { success: true, message: 'Quote request emails sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error(`Failed to send quote emails: ${error.message}`);
  }
};

export default {
  sendContactFormEmails,
  sendQuoteRequestEmails,
};

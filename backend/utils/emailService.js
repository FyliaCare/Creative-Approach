import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  // Check if email credentials are configured
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS;
  
  if (!emailUser || !emailPassword) {
    console.error('❌ Email credentials not configured! Please set EMAIL_USER and EMAIL_PASSWORD in .env file');
    throw new Error('Email service not configured');
  }
  
  if (emailUser === 'your-gmail@gmail.com' || emailPassword === 'your-app-specific-password') {
    console.error('❌ Email credentials still using placeholder values! Please update .env file with real credentials');
    throw new Error('Email service not configured with valid credentials');
  }
  
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
};

// Contact form email templates
export const sendContactFormEmails = async (formData) => {
  let transporter;
  try {
    transporter = createTransporter();
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error.message);
    throw new Error('Email service configuration error. Please check EMAIL_USER and EMAIL_PASSWORD in .env file.');
  }
  
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
    
    console.log('✅ Both emails sent successfully - notification to visuals@caghana.com and confirmation to', email);
    return { success: true, message: 'Emails sent successfully' };
  } catch (error) {
    console.error('❌ Email sending error:', error.message);
    
    // Provide specific error messages based on error type
    if (error.code === 'EAUTH') {
      throw new Error('Email authentication failed. Please check EMAIL_USER and EMAIL_PASSWORD in .env file. Gmail requires an App Password, not your regular password. See EMAIL_SETUP_GUIDE.md for instructions.');
    } else if (error.code === 'ESOCKET' || error.code === 'ECONNECTION') {
      throw new Error('Cannot connect to email server. Please check your internet connection and EMAIL_HOST/EMAIL_PORT settings.');
    } else if (error.code === 'ETIMEDOUT') {
      throw new Error('Email server connection timeout. Check firewall settings or try a different SMTP provider.');
    } else {
      throw new Error(`Failed to send emails: ${error.message}`);
    }
  }
};

// Quote request email templates
export const sendQuoteRequestEmails = async (quoteData) => {
  let transporter;
  try {
    transporter = createTransporter();
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error.message);
    throw new Error('Email service configuration error. Please check EMAIL_USER and EMAIL_PASSWORD in .env file.');
  }
  
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
    
    console.log('✅ Quote request emails sent successfully - notification to visuals@caghana.com and confirmation to', email);
    return { success: true, message: 'Quote request emails sent successfully' };
  } catch (error) {
    console.error('❌ Quote email sending error:', error.message);
    
    // Provide specific error messages based on error type
    if (error.code === 'EAUTH') {
      throw new Error('Email authentication failed. Please check EMAIL_USER and EMAIL_PASSWORD in .env file.');
    } else if (error.code === 'ESOCKET' || error.code === 'ECONNECTION') {
      throw new Error('Cannot connect to email server. Please check your internet connection.');
    } else if (error.code === 'ETIMEDOUT') {
      throw new Error('Email server connection timeout. Please try again.');
    } else {
      throw new Error(`Failed to send quote emails: ${error.message}`);
    }
  }
};

// Send quote acceptance email to client
export const sendQuoteAcceptanceEmail = async (quoteData) => {
  let transporter;
  try {
    transporter = createTransporter();
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error.message);
    throw new Error('Email service configuration error');
  }
  
  const { name, email, service, quotedAmount } = quoteData;

  const clientEmail = {
    from: `"CA Ghana" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '✅ Your Quotation Request Has Been Accepted!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f4f7fa; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .header p { margin: 10px 0 0; font-size: 16px; opacity: 0.95; }
          .content { padding: 40px 30px; }
          .success-badge { background: #d1fae5; color: #065f46; padding: 12px 20px; border-radius: 8px; font-weight: 600; display: inline-block; margin: 20px 0; }
          .info-box { background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 4px; }
          .info-box strong { color: #065f46; }
          .cta-button { display: inline-block; background: #10b981; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; transition: background 0.3s; }
          .cta-button:hover { background: #059669; }
          .footer { background: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 13px; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Great News, ${name}!</h1>
            <p>Your quotation request has been accepted</p>
          </div>
          <div class="content">
            <div class="success-badge">✅ Request Accepted</div>
            
            <p>We're excited to work with you on your <strong>${service}</strong> project!</p>
            
            <div class="info-box">
              <p><strong>Next Steps:</strong></p>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Our team will contact you within 24 hours to discuss project details</li>
                <li>We'll finalize the project scope and timeline</li>
                ${quotedAmount ? `<li>Quoted Amount: <strong>GHS ${quotedAmount.toLocaleString()}</strong></li>` : ''}
                <li>Schedule the project execution date</li>
              </ul>
            </div>
            
            <p style="margin-top: 25px;"><strong>Questions or need to discuss anything?</strong></p>
            <p>Feel free to reach out:</p>
            <ul style="list-style: none; padding: 0;">
              <li>📧 Email: <a href="mailto:visuals@caghana.com">visuals@caghana.com</a></li>
              <li>📱 Phone: <a href="tel:+233541500716">+233 541 500 716</a></li>
            </ul>
            
            <a href="https://caghana.com/portfolio" class="cta-button">View Our Portfolio</a>
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
    await transporter.sendMail(clientEmail);
    console.log('✅ Quote acceptance email sent to', email);
    return { success: true, message: 'Acceptance email sent successfully' };
  } catch (error) {
    console.error('❌ Acceptance email sending error:', error.message);
    throw new Error(`Failed to send acceptance email: ${error.message}`);
  }
};

// Send quote rejection email to client
export const sendQuoteRejectionEmail = async (quoteData) => {
  let transporter;
  try {
    transporter = createTransporter();
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error.message);
    throw new Error('Email service configuration error');
  }
  
  const { name, email, service, reason } = quoteData;

  const clientEmail = {
    from: `"CA Ghana" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Update on Your Quotation Request - CA Ghana',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f4f7fa; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .header p { margin: 10px 0 0; font-size: 16px; opacity: 0.95; }
          .content { padding: 40px 30px; }
          .info-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 4px; }
          .reason-box { background: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .reason-box strong { color: #1f2937; display: block; margin-bottom: 10px; }
          .cta-button { display: inline-block; background: #6366f1; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; transition: background 0.3s; }
          .cta-button:hover { background: #4f46e5; }
          .footer { background: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 13px; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${name}</h1>
            <p>Update on your quotation request</p>
          </div>
          <div class="content">
            <p>Thank you for your interest in our <strong>${service}</strong> services.</p>
            
            <p>After careful review, we regret to inform you that we're unable to proceed with your quotation request at this time.</p>
            
            <div class="reason-box">
              <strong>Reason:</strong>
              <p style="margin: 0; color: #4b5563;">${reason}</p>
            </div>
            
            <div class="info-box">
              <p style="margin: 0;"><strong>💡 We'd still love to work with you!</strong></p>
              <p style="margin: 10px 0 0;">If circumstances change or you'd like to discuss alternative solutions, please don't hesitate to reach out.</p>
            </div>
            
            <p style="margin-top: 25px;"><strong>Get in Touch:</strong></p>
            <ul style="list-style: none; padding: 0;">
              <li>📧 Email: <a href="mailto:visuals@caghana.com">visuals@caghana.com</a></li>
              <li>📱 Phone: <a href="tel:+233541500716">+233 541 500 716</a></li>
            </ul>
            
            <a href="https://caghana.com/services" class="cta-button">Explore Other Services</a>
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
    await transporter.sendMail(clientEmail);
    console.log('✅ Quote rejection email sent to', email);
    return { success: true, message: 'Rejection email sent successfully' };
  } catch (error) {
    console.error('❌ Rejection email sending error:', error.message);
    throw new Error(`Failed to send rejection email: ${error.message}`);
  }
};

export default {
  sendContactFormEmails,
  sendQuoteRequestEmails,
  sendQuoteAcceptanceEmail,
  sendQuoteRejectionEmail,
};

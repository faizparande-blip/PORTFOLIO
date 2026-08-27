/**
 * Contact Service
 * Dispatches contact inquiries to the Supabase Edge Function endpoint.
 */

const SUPABASE_EDGE_FUNCTION_URL =
  import.meta.env.VITE_SUPABASE_CONTACT_ENDPOINT ||
  'https://gplnjuclvuzwipftytcs.supabase.co/functions/v1/contact-form';

export async function sendContactMessage(formData) {
  // Client-side payload verification before network transmission
  const name = formData.name?.trim();
  const email = formData.email?.trim();
  const subject = formData.subject?.trim() || 'Portfolio Contact Form Inquiry';
  const message = formData.message?.trim();

  if (!name || !email || !message) {
    throw new Error('Please fill in all required fields (Name, Email, and Message).');
  }

  const payload = {
    name,
    email,
    subject,
    message
  };

  try {
    const response = await fetch(SUPABASE_EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Check if the response returned an error status
    if (!response.ok) {
      let serverErrorMessage = 'Failed to send message.';
      try {
        const errorData = await response.json();
        serverErrorMessage = errorData.error || errorData.message || serverErrorMessage;
      } catch {
        const textError = await response.text();
        if (textError) serverErrorMessage = textError;
      }
      throw new Error(serverErrorMessage);
    }

    const data = await response.json().catch(() => ({}));

    return {
      success: true,
      timestamp: new Date().toISOString(),
      data
    };
  } catch (error) {
    console.error('Contact Submission Error:', error);

    // Provide friendly error messages for common network failures
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Unable to connect to the contact server. Please check your internet connection or try again in a few moments.'
      );
    }

    throw new Error(error.message || 'Something went wrong while sending your message. Please try again.');
  }
}

export default sendContactMessage;

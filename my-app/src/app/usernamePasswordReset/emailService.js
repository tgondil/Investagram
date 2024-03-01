// emailService.js (client-side)
export async function sendUsernameResetEmail(to, username) {
  try {
    // Call an API route on the server to send the username reset email
    const response = await fetch(`/api/send-username-reset-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        username,
      }),
    });

    if (response.ok) {
      console.log(`Username reset email sent successfully to ${to}`);
    } else {
      console.error(`Error sending username reset email: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error sending username reset email:', error);
  }
}

export async function sendPasswordResetEmail(to, temporaryPassword) {
  try {
    // Call an API route on the server to send the password reset email
    const response = await fetch(`/api/send-password-reset-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        temporaryPassword,
      }),
    });

    if (response.ok) {
      console.log(`Password reset email sent successfully to ${to}`);
    } else {
      console.error(`Error sending password reset email: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
}

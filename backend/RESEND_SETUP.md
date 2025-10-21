# Resend Email Service Setup

## Why Resend?
- **Free Tier**: 3,000 emails/month (vs Brevo's 300)
- **Reliable**: Built by Vercel team, production-ready
- **Simple**: Easy API, no complex SMTP setup
- **Fast**: Instant delivery, no delays

## Setup Steps

### 1. Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address

### 2. Get API Key
1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Name it "EventAddis Production"
4. Copy the API key (starts with `re_`)

### 3. Update Environment Variables
Replace in your `.env` file:
```env
RESEND_API_KEY=re_your_actual_api_key_here
```

### 4. Deploy to Render
1. Go to your Render dashboard
2. Select your EventAddis backend service
3. Go to Environment tab
4. Add new variable:
   - Key: `RESEND_API_KEY`
   - Value: `re_your_actual_api_key_here`
5. Click "Save Changes"

## Test Email
After setup, test with any signup/password reset to verify emails are working.

## Free Tier Limits
- 3,000 emails/month
- 100 emails/day
- Perfect for EventAddis usage

## Domain Setup (Optional)
For custom "from" address:
1. Add your domain in Resend dashboard
2. Add DNS records they provide
3. Update email service to use your domain
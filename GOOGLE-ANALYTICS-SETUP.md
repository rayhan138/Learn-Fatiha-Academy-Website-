# Google Analytics Setup Guide

## Step 1: Create Google Analytics Account

1. Go to https://analytics.google.com
2. Click "Start measuring"
3. Enter account name: "Learn Fatiha"
4. Click "Next"

## Step 2: Create Property

1. Property name: "Learn Fatiha Website"
2. Time zone: Select your timezone
3. Currency: Select your currency
4. Click "Next"

## Step 3: Business Information

1. Industry: "Education"
2. Business size: "Small" (1-10 employees)
3. How you plan to use Analytics: Check "Examine user behavior"
4. Click "Create"
5. Accept Terms of Service

## Step 4: Set Up Data Stream

1. Choose platform: "Web"
2. Website URL: https://www.learnfatiha.com (use your actual domain)
3. Stream name: "Learn Fatiha Main Site"
4. Click "Create stream"

## Step 5: Get Tracking Code

You'll see a "Measurement ID" like: G-XXXXXXXXXX

Copy the entire tracking code that looks like this:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Step 6: Add Tracking Code to Your Website

Add the tracking code to the `<head>` section of ALL your HTML pages, right after the opening `<head>` tag.

**Files to update:**
- index.html
- about.html
- courses.html
- enroll.html
- blogs.html
- contact.html
- faq.html
- pdf.html
- privacy-policy.html
- terms-of-service.html
- thank-you.html

**Example for index.html:**

```html
<head>
  <meta charset="UTF-8" />
  
  <!-- Google tag (gtag.js) - ADD THIS -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
  <!-- END Google Analytics -->
  
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- rest of your head content -->
</head>
```

## Step 7: Set Up Goals (Conversions)

### Goal 1: Enrollment Form Submission

1. In Google Analytics, go to "Admin" (bottom left)
2. In the "Property" column, click "Events"
3. Click "Create event"
4. Event name: "enrollment_submission"
5. Click "Create"

### Goal 2: Contact Form Submission

1. Create another event: "contact_submission"

### Track These Events in Your Forms

Add this code to your form submission success handler:

**For enroll.html (in assets/js/forms.js):**

```javascript
// After successful form submission
gtag('event', 'enrollment_submission', {
  'event_category': 'Form',
  'event_label': 'Enrollment Form'
});
```

**For contact.html:**

```javascript
// After successful form submission
gtag('event', 'contact_submission', {
  'event_category': 'Form',
  'event_label': 'Contact Form'
});
```

## Step 8: Verify Installation

1. Visit your website after adding the tracking code
2. In Google Analytics, go to "Reports" > "Realtime"
3. You should see yourself as an active user
4. If you see activity, it's working! 🎉

## Step 9: Set Up Custom Reports

### Report 1: Page Views
- Go to "Reports" > "Engagement" > "Pages and screens"
- See which pages get the most traffic

### Report 2: Traffic Sources
- Go to "Reports" > "Acquisition" > "Traffic acquisition"
- See where your visitors come from (Google, Facebook, direct, etc.)

### Report 3: User Demographics
- Go to "Reports" > "User" > "Demographics"
- See age, gender, location of your visitors

## Important Metrics to Track

1. **Users**: Total number of visitors
2. **Sessions**: Total number of visits
3. **Bounce Rate**: % of visitors who leave immediately
4. **Average Session Duration**: How long people stay
5. **Conversions**: Enrollment form submissions
6. **Traffic Sources**: Where visitors come from

## Tips

- Check analytics weekly to see trends
- Focus on pages with high bounce rates (improve them)
- See which traffic sources work best (invest more there)
- Track enrollment conversions to measure ROI
- Use data to make informed decisions

## Need Help?

- Google Analytics Help: https://support.google.com/analytics
- Video tutorials: Search "Google Analytics 4 tutorial" on YouTube

---

**Note:** Replace `G-XXXXXXXXXX` with your actual Measurement ID from Google Analytics.

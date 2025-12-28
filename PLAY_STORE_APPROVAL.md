# 📋 Play Store Approval Checklist

To get **GST Calculator India** approved quickly, follow this checklist. Google is strict about "Data Safety" for apps with Ads.

## 1. Privacy Policy URL
*   **Action**: You need to host the `PRIVACY_POLICY.md` file online.
*   **Easy Method**:
    1.  Copy the content of `PRIVACY_POLICY.md`.
    2.  Create a free public page on [Notion](https://notion.so) or [Google Docs](https://docs.google.com).
    3.  Paste the content and publish it.
    4.  **Paste that URL** into the Play Console under **App Content > Privacy Policy**.

## 2. Ads Declaration
*   **Question**: "Does your app contain ads?"
*   **Answer**: **Yes, my app contains ads**.

## 3. Data Safety Form (Crucial!)
This is where most apps get rejected. Since you use **AdMob**, you **MUST** declare data collection.

Go to **App Content > Data Safety** and answer:

### Step 1: Data Collection
*   **Does your app collect or share any of the required user data types?** -> **Yes**
*   **Is all of the user data collected by your app encrypted in transit?** -> **Yes**
*   **Do you provide a way for users to request that their data be deleted?** -> **No** (Since you don't store it on your own servers, but you can say "No" and explain it's handled by third parties).

### Step 2: Data Types (Check these boxes)
Scroll down and select:
1.  **Device or other IDs** -> **Device or other IDs** (AdMob needs this).
2.  **App info and performance** -> **Crash logs**, **Diagnostics**, **Other app performance data**.
3.  **Location** -> **Approximate location** (Optional, but safer to check if using standard AdMob settings; uncheck if you forced non-personalized ads strictly).

### Step 3: Usage & Handling (For each checked item)
For **Device or other IDs**:
*   **Collected?** Yes.
*   **Shared?** Yes (with Google).
*   **Processed ephemerally?** No.
*   **Required or Optional?** Required (for Ads).
*   **Purposes**: select **Advertising or Marketing** and **Analytics**.

For **App info and performance** (Crash logs/Diagnostics):
*   **Collected?** Yes.
*   **Shared?** Yes.
*   **Purposes**: **Analytics**, **Advertising or Marketing**, **Fraud prevention**.

## 4. News Apps
*   **Question**: "Is your app a news app?"
*   **Answer**: **No**.

## 5. Government Apps
*   **Question**: "Is your app a government app?"
*   **Answer**: **No**.

## 6. Target Audience
*   **Answer**: **18 and over**.
*   (Avoid selecting "Children" or "13-15" unless you want extra scrutiny about "Family Policy" compliance).
*   **Appeal to Children**: "Could your store listing appeal to children?" -> **No** (It's a calculator).

## 7. Store Listing Assets
Make sure you have:
*   **App Icon**: 512px x 512px (PNG).
*   **Feature Graphic**: 1024px x 500px (PNG).
*   **Screenshots**: at least 2 screenshots.
*   **Short Description**: "Fast & simple GST/Tax Calculator for Indian Businesses."

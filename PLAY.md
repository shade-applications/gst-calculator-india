# 🟢 Google Play Console - Complete Answer Key

Use this document to copy-paste/select answers for every section of the **App Content** tab in the Google Play Console.

---

## 1. Privacy Policy
*   **Action:** Paste the URL where you hosted `PRIVACY_POLICY.md`.

---

## 2. Ads
*   **Question:** Does your app contain ads?
*   **Answer:** **Yes, my app contains ads.**
    *(Because we integrated AdMob)*

---

## 3. App Access
*   **Question:** Usage of specific login credentials?
*   **Answer:** **All functionality is available without special access.**
    *(The app is open to everyone, no login required)*

---

## 4. Content Rating (IARC Questionnaire)
*   **Email:** Your developer email.
*   **Category:** **Utility, Productivity, Communication, or other**.
*   **Violence:** No.
*   **Sexuality:** No.
*   **Language:** No.
*   **Controlled Substance:** No.
*   **Miscellaneous:**
    *   Does the app allow users to interact/voice chat? **No**.
    *   Does the app share current physical location? **No** (AdMob uses coarse location, but the *app* feature isn't *sharing* location with other users).
    *   Does the app allow purchasing digital goods? **No**.
*   **Resulting Rating:** Should be **PEGI 3 / Everyone**.

---

## 5. Target Audience and Content
*   **Target Age:** Select **18 and over**.
    *(Selecting 13-15 or 16-17 triggers extra "Family Policy" requirements. Keeps it simple).*
*   **Appeal to Children:**
    *   **Question:** "Could your store listing appeal to children?"
    *   **Answer:** **No**.
    *(It is a financial tool)*.

---

## 6. News Apps
*   **Question:** Is your app a news app?
*   **Answer:** **No**.

---

## 7. COVID-19 Contact Tracing and Status Apps
*   **Answer:** **My app is not a publicly available COVID-19 contact tracing or status app.**

---

## 8. Data Safety (The Big One) ⚠️

### Overview
*   **Does your app collect or share any of the required user data types?** -> **Yes**.
*   **Is all of the user data collected by your app encrypted in transit?** -> **Yes**.
*   **Do you provide a way for users to request that their data be deleted?** -> **No**.
    *(Optional: You can say "No" because you don't store user accounts).*

### Data Types to Select
Scroll and check these specific boxes:

1.  **Location** -> **Approximate location**.
2.  **App activity** -> **App interactions**.
3.  **App info and performance** -> **Crash logs**, **Diagnostics**.
4.  **Device or other IDs** -> **Device or other IDs**.

### Answers for Each Selected Type

#### 📍 Location -> Approximate Location
*   **Collected?** Yes.
*   **Shared?** Yes (AdMob shares with advertisers).
*   **Processed ephemerally?** No.
*   **Required/Optional?** Optional (Users can deny permission, but usually Required for Ads). -> Select **Optional**.
*   **Why?** -> Check **Advertising or marketing** and **Analytics**.

#### 👆 App activity -> App interactions
*   **Collected?** Yes.
*   **Shared?** No (Usually internal to AdMob/Google).
*   **Why?** -> Check **Analytics**.

#### 🐛 App info -> Crash logs & Diagnostics
*   **Collected?** Yes.
*   **Shared?** Yes (Google receives them).
*   **Why?** -> Check **Analytics**.

#### 🆔 Device or other IDs
*   **Collected?** Yes.
*   **Shared?** Yes.
*   **Why?** -> Check **Advertising or marketing** and **Analytics**.
    *(This is the Advertising ID)*.

---

## 9. Government Apps
*   **Question:** Is your app a government app?
*   **Answer:** **No**.

---

## 10. Financial Features
*   **Question:** Does your app provide any financial features?
*   **Answer:** Note that while it is a calculator, it **DOES NOT** provide banking, loans, or stock trading.
*   If asked, scroll to the bottom and select **"My app doesn't provide any financial features"**.
    *(Calculators are usually exempt from the strict "Financial Services" declarations unless you offer actual loans/banking).*

---

## 11. Store Listing (Main)
*   **App Name:** `GST Calculator India`
*   **Short Description:** `Fast, offline GST Calculator with instant tax slabs.`
*   **Full Description:**
    ```text
    Simplify your daily business calculations with the GST Calculator India app.

    Features:
    • Instant GST Calculation: Add or Remove GST with a single tap.
    • Pre-set Tax Slabs: 5%, 12%, 18%, 28%.
    • Offline First: Works without internet.
    • Dark Mode: Premium UI that saves battery.
    • Copy & Share: Easily share calculation details with clients.
    ```

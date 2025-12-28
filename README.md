# GST Calculator India (Premium Edition) 🇮🇳

![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-black?logo=android)
![Framework](https://img.shields.io/badge/Framework-Expo%20%7C%20React%20Native-blue?logo=expo)
![Language](https://img.shields.io/badge/Language-TypeScript-007ACC?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

A **premium, offline-first** financial utility app designed for Indian businesses. Built with a focus on modern aesthetics, haptic feedback, and ease of use.

![App Concept](https://miro.medium.com/v2/resize:fit:1260/1*NzlxOX9YSlUHqF2zDvhtjg.gif)

## ✨ Premium Features

*   **💎 Dark Mode UI**: Stunning midnight-blue OLED theme with glassmorphism elements.
*   **⚡ Instant Calculation**: Real-time GST addition and removal logic.
*   **📳 Haptic Experience**: Tactical feedback on every interaction for a physical feel.
*   **🌈 Visual Polish**: Linear gradients, smooth layout animations, and custom typography.
*   **🇮🇳 India Focused**: Pre-set tax slabs (5%, 12%, 18%, 28%) and currency formatting.
*   **🔒 Privacy First**: 100% Offline. No data collection.

## 🛠 Tech Stack

*   **Framework**: [Expo](https://expo.dev) (React Native)
*   **Language**: TypeScript
*   **Routing**: Expo Router (File-based routing)
*   **UI/UX**: `expo-linear-gradient`, `expo-haptics`, Custom Animations
*   **Utilities**: `expo-clipboard`, `expo-sharing`

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/shade-applications/gst-calculator-india.git
    cd gst-calculator-india
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Run the app**:
    ```bash
    npx expo start
    ```
    *   Press `a` for Android Emulator.
    *   Press `i` for iOS Simulator.
    *   Scan QR code with Expo Go on your physical device.

## 📱 Building for Production

This app is configured for **EAS Build**.

1.  **Configure Build**:
    ```bash
    eas build:configure
    ```

2.  **Build Android Bundle (.aab)**:
    ```bash
    eas build --platform android
    ```

3.  **Upload to Play Store**:
    Follow our [Deployment Guide](DEPLOYMENT.md) to upload the `.aab` file to the Google Play Console.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

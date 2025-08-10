# BrandPeek

BrandPeek is a React Native mobile application built with Expo that allows users to browse and discover innovative brands. The app displays a list of brands with their logos, names, and taglines. Users can tap on a brand to view more details, including a full description and website link.

## Features

- Home screen with a list of brands
- Pull-to-refresh functionality
- Detailed brand view with logo, description, and website link
- Follow/Unfollow button (UI only)
- Gradient backgrounds
- Error handling with retry options

## Tech Stack

- React: 18.2.0
- React Native: 0.71.8
- Expo SDK: 48
- Dependencies:
  - axios
  - @react-navigation/native
  - @react-navigation/native-stack
  - react-native-safe-area-context
  - react-native-gesture-handler
  - expo-linear-gradient
  - @expo/vector-icons
  - @expo-google-fonts/inter

## Installation

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Expo CLI

### Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/brandpeek.git
cd brandpeek
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npx expo start
```

## Preview on Expo Go

1. Install the Expo Go app on your iOS or Android device
2. Scan the QR code displayed in your terminal or Expo Dev Tools
3. The app will open in Expo Go

## Building an APK with EAS

1. Install EAS CLI

```bash
npm install -g eas-cli
```

2. Log in to your Expo account

```bash
eas login
```

3. Configure the build

```bash
eas build:configure
```

4. Build for Android

```bash
eas build -p android --profile preview
```

5. Follow the prompts and wait for the build to complete
6. Download the APK from the provided link

## Folder Structure
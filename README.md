# WeWire Take-Home Test - Wallet App

This is a React Native wallet management app built with Expo, TypeScript, and Expo Router for file-based routing.

## Features

- **Welcome/Login Screen**: Simple authentication UI (no real validation)
- **Home Dashboard**: View total balance and wallet cards with recent transactions
- **Wallets List**: Browse all wallets with search/filter functionality
- **Add Wallet**: Create new wallets with form validation
- **Wallet Detail**: View individual wallet details and transactions
- **Dark/Light Mode**: Toggle between themes with a button on the home screen

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## User Flow

1. **Login** → User enters email and password (no validation) and taps "Login"
2. **Home Screen** → Displays total balance, wallet cards, and recent transactions
   - Tap any wallet card → Navigate to Wallet Detail
   - Tap Moon/Sun icon → Toggle dark/light theme
3. **Wallets Tab** → View all wallets with search functionality
   - Search by wallet name or currency
   - Tap any wallet → Navigate to Wallet Detail
4. **Add Wallet** → Accessible from Home Actions
   - Enter wallet name (min 2 characters)
   - Select currency (USD, EUR, GBP)
   - Form validation with error messages
   - Creates new wallet with $0.00 balance
5. **Wallet Detail** → View specific wallet information
   - Displays wallet balance and currency
   - Shows recent transactions
   - Empty state for wallets with no transactions

## Project Structure

- **app/**: Screen components using Expo Router file-based routing
  - `index.tsx`: Welcome/Login screen
  - `(tabs)/`: Tab navigator screens (Home, Wallets)
  - `add-wallet.tsx`: Add wallet modal
  - `wallets/[id].tsx`: Wallet detail screen (dynamic route)
- **components/**: Reusable UI components
- **features/**: Feature-specific components
- **context/**: React Context for state management (wallets, transactions)
- **types/**: TypeScript type definitions
- **constants/**: Mock data and app constants
- **lib/**: Utility functions and validation schemas (Zod)

## Important Notes

### Total Balance Calculation
The "Total Balance" shown on the Home screen is calculated by **summing the numeric values** of all wallet balances, regardless of currency. This is a simplified approach for the test scenario.

**Example:**
- Main Wallet: USD 1,250.00
- Savings: EUR 3,400.50
- Travel: GBP 580.25
- **Total: $5,230.75** (simple sum, no currency conversion)

In a production app, this would require exchange rate conversion to a base currency.

## Technologies Used

- **Expo Router**: File-based routing for React Native
- **TypeScript**: Full type safety throughout the app
- **React Hook Form + Zod**: Form validation and schema validation
- **React Context API**: State management for wallets and transactions
- **Iconsax React Native**: Icon library for UI elements

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

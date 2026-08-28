Act as an expert Full-Stack Web Developer. Build a single-page or two-file frontend web application for my restaurant's loyalty program. It must strictly adhere to the following architecture, constraints, and logic parameters:

### 1. VISUAL SYSTEM & ICON REPLACEMENT
- Remove all emojis from the user interface completely.
- Use the appropriate text for menu items e.g "only 3 meat pie available for meat pie title"
- Use Font Awesome v6 (via CDN link: https://cloudflare.com) to display clean, professional iconography.
- Map the UI elements to appropriate restaurant, streak, and metric icons (e.g., fa-utensils, fa-fire, fa-star, fa-gift, fa-qrcode, fa-chart-line).
- Style the UI using modern, clean CSS with a warm restaurant-friendly color palette (such as deep charcoal backgrounds for admin, clean white cards for users, teal or orange for actions).

### 2. DATA MANAGEMENT (HARDCODED & LOCAL PERSISTENCE)
- Do not use any external database connections, APIs, or backend frameworks.
- The Admin Dashboard data must be hardcoded with realistic mock statistics (e.g., Total Scans, Highest Active Streak, Total Rewards Claimed, Customer Retention Rate).
- The Customer View state must persist on the client-side using browser `localStorage` under the key 'restaurant_loyalty_data' so that refreshes do not clear progress.

### 3. CUSTOMER FREQUENT-FLYER STREAK LOGIC
Implement a JavaScript-driven logic engine to control the scan mechanics strictly based on these rules:
- **Daily Lockout:** A customer can only clock-in/scan successfully once per calendar day (based on `new Date().toDateString()`). If they try to scan again on the same day, block the action and display a professional validation warning text.
- **Streak Evaluation:** 
  - If it is their first scan ever, initialize their streak to 1 day.
  - If their last successful scan was exactly 1 calendar day ago, increment their streak counter by 1.
  - If their last successful scan was more than 1 calendar day ago, break the streak and reset it back to 1 day.
- **Points Engine:** Every valid daily scan adds a designated block of points (e.g., 100 points) to their profile data accumulator.

### 4. RANDOM REWARD SYSTEM
- Monitor the accumulator total. When the customer's total points reach or exceed exactly 1,000 points, immediately trigger a milestone success state.
- Create an array containing at least 5 different premium food menu items (e.g., "Gourmet Truffle Burger", "Wood-Fired Diavola Pizza", "Chef's Special Pasta").
- Select one random food item from this pool to display to the user as their unlocked reward.
- Lock this random selection into `localStorage` so it does not change if they refresh the page before claiming it.
- Provide a "Claim Reward & Reset" button that sets their total points back to 0 while keeping or tracking their lifetime high streak, clearing out the locked reward state.

### 5. APPLICATION OUTPUT EXPECTATION
Deliver fully functional, clean, and self-contained code files (HTML, CSS embedded in `<style>`, and JavaScript embedded in `<script>`) splitting the app into:
1. `index.html` (The interactive user loyalty/QR simulator screen).
2. `admin.html` (The hardcoded analytical metrics panel screen).

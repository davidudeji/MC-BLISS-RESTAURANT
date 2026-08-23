# MASTER AI CODING PROMPT

## Production-Ready Organic Wellness Restaurant Web Application

You are a senior full-stack software engineer, UI/UX designer, motion designer, and application architect.

Build a **production-ready organic wellness restaurant web application** from scratch based on the specification below.

Do not create a mockup or static prototype. Build a functioning application with a real frontend, backend API, database integration, authentication, image upload pipeline, menu management, cart functionality, responsive UI, animations, validation, error handling, and production-quality architecture.

Do not leave core functionality as placeholders.

---

# 1. PRODUCT VISION

Create a premium, modern, organic wellness restaurant platform that combines:

* Farm-to-table visual storytelling
* Premium restaurant branding
* Nutritional positioning
* High-converting menu presentation
* Scarcity and loss-aversion messaging
* Online ordering
* Professional admin menu management
* Mobile-first responsive design

The experience should feel like a combination of a **premium organic restaurant, modern wellness brand, and luxury food-commerce website**.

The design must feel:

* Organic
* Premium
* Warm
* Editorial
* Minimal
* Sophisticated
* Trustworthy
* Modern
* Conversion-focused

Avoid generic restaurant-template aesthetics.

---

# 2. REQUIRED TECH STACK

## Frontend

Use:

* React 19+
* Vite
* TypeScript
* Tailwind CSS 4+
* Framer Motion
* Lucide React
* React Router
* TanStack Query
* React Hook Form
* Zod

Use reusable components and a clean feature-based architecture.

---

# 3. BACKEND

Use:

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL

Use REST APIs.

The backend must provide:

* Authentication
* Menu CRUD
* Image upload
* Image deletion
* Inventory/status management
* Order creation
* Order retrieval
* Admin authorization
* Input validation
* Error handling

---

# 4. DATABASE

Use PostgreSQL with Prisma.

Create the following core entities.

## AdminUser

Fields:

* id
* name
* email
* passwordHash
* role
* createdAt
* updatedAt

Roles:

* ADMIN

Passwords must never be stored in plaintext.

---

## MenuItem

Fields:

* id
* name
* slug
* description
* price
* category
* status
* imageUrl
* imagePublicId
* batchQuantity
* isFeatured
* createdAt
* updatedAt

Category enum:

* NUTRITIOUS_MEALS
* SNACKS
* YOGURT_BOWLS
* ZOBO_JUICES

Status enum:

* AVAILABLE
* OUT_OF_STOCK

---

## Order

Fields:

* id
* customerName
* customerEmail
* customerPhone
* deliveryAddress
* totalAmount
* status
* createdAt
* updatedAt

Order status:

* PENDING
* CONFIRMED
* PREPARING
* READY
* COMPLETED
* CANCELLED

---

## OrderItem

Fields:

* id
* orderId
* menuItemId
* quantity
* unitPrice
* subtotal

Use relational integrity between Order, OrderItem, and MenuItem.

---

# 5. BRANDING

Use the following colors.

```text
Primary:
#1E392A

Secondary:
#FDFBF7

Accent:
#D4A373

Dark:
#111827
```

Use the colors consistently throughout the application.

Do not introduce unnecessary colors.

---

# 6. TYPOGRAPHY

## Display Font

Use:

**Fraunces**

Characteristics:

* Variable font
* Heavy display weights
* 700–800
* Letter spacing approximately -0.02em
* Line-height approximately 1.1

Use it for:

* Hero headlines
* Major section headings
* Menu category headings
* Large promotional statements

## Body Font

Use:

**Plus Jakarta Sans**

Use it for:

* Body copy
* Buttons
* Navigation
* Forms
* Product information
* Admin dashboard

Body characteristics:

* 400 for normal text
* 500 for interface text
* approximately 1.6 line height
* approximately 0.01em tracking

---

# 7. GLOBAL DESIGN SYSTEM

Create reusable components:

* Button
* Badge
* Card
* Modal
* Input
* Textarea
* Select
* RadioGroup
* Dropdown
* Toast
* Skeleton
* Spinner
* EmptyState
* ErrorState
* ImageUploader
* PriceDisplay
* MenuCard
* CategoryTabs
* Navbar
* Footer
* SectionHeading
* Container

Use consistent spacing, radius, shadows, typography, and animation.

Do not duplicate UI logic unnecessarily.

---

# 8. PUBLIC LANDING PAGE

Create the following page structure:

```text
/
├── Navbar
├── Hero
├── Brand Story
├── Customer Experience Carousel
├── Menu
├── Services
├── Scarcity / Featured Items
├── Ordering CTA
├── Contact
└── Footer
```

---

# 9. NAVIGATION

Create a sticky navigation bar.

Navigation:

* Logo
* Home
* Menu
* Services
* Contact
* Cart
* Order button

Initially the navbar should be transparent.

After approximately 50px of scrolling:

* Apply deep forest-green background
* Add backdrop blur
* Add subtle shadow
* Animate transition smoothly

Use Framer Motion.

The mobile navigation must become a hamburger menu.

The mobile menu should animate open/closed.

---

# 10. HERO SECTION

Create a full-screen immersive hero.

Use a background video showing:

* Fresh greens being chopped
* Hibiscus/Zobo being poured
* Fresh ingredients
* Healthy meals being plated
* Warm natural lighting

Video requirements:

* autoplay
* muted
* loop
* playsInline

Add a dark gradient overlay:

```text
from-black/40
to-black/70
```

Hero headline:

> Honest food, grown properly, served daily.

Subheadline:

> Experience nutrient-dense culinary art crafted from sustainable, farm-fresh ingredients.

Primary CTA:

> View Today's Menu

Clicking the CTA must smoothly scroll to the menu section.

Add subtle entrance animations.

---

# 11. BRAND STORY

Create a visually rich editorial section explaining the restaurant philosophy.

Use a split layout on desktop:

Left:

* Large image/video

Right:

* Eyebrow label
* Large Fraunces heading
* Supporting paragraph
* Small feature list
* CTA

Possible feature points:

* Farm-fresh ingredients
* Nutrient-conscious meals
* Small-batch preparation
* Sustainable sourcing

On mobile, stack vertically.

---

# 12. CUSTOMER EXPERIENCE CAROUSEL

Create a continuous horizontal marquee.

Use six cards.

### Slide 1

Customers clinking chilled Hibiscus Zobo bottles at an outdoor wooden table.

Caption:

> Sarah M. — “The best Zobo in town!”

### Slide 2

Smiling customer enjoying a creamy yogurt parfait bowl.

### Slide 3

Friends sharing nutritious meals around a table.

### Slide 4

Customer receiving premium takeaway packaging from a modern counter.

### Slide 5

Customer enjoying a mindful breakfast in a green-scaped lounge.

### Slide 6

Office team enjoying corporate lunch catering.

The carousel must:

* Move continuously
* Loop infinitely
* Have no visible jump
* Pause optionally on hover
* Support touch scrolling
* Use Framer Motion or CSS animation

Cards should have:

* Rounded corners
* Large imagery
* Gradient overlay
* Bottom text overlay
* Customer quote/metric

---

# 13. MENU SECTION

Create a premium interactive menu.

Include:

* Section heading
* Category filter
* Search
* Menu grid

Categories:

* All
* Nutritious Meals
* Snacks
* Yogurt Bowls
* Zobo & Juices

Fetch menu items from the backend API.

Do not hard-code menu items in the frontend.

Use TanStack Query.

---

# 14. MENU CARD

Each menu card should contain:

* Image
* Category badge
* Food name
* Description
* Price
* Availability indicator
* Add to cart button

Use subtle hover animation.

Example:

```text
Organic Avocado & Egg Bowl

Creamy avocado, farm eggs, greens,
seeds and nutrient-rich vegetables.

₦7,500

Available
```

Use Framer Motion for:

* image scale
* card elevation
* button interaction
* badge transitions

---

# 15. OUT-OF-STOCK BEHAVIOR

When:

```text
status === OUT_OF_STOCK
```

do not completely remove the product.

Keep the card visible.

Apply:

* muted image
* reduced opacity
* grayscale
* disabled ordering button
* "Out of Stock" badge

Display:

> Missed today's batch. Re-opening fresh tomorrow morning at 7:00 AM.

Do not allow adding the item to cart.

---

# 16. SCARCITY SYSTEM

Use real inventory data.

If:

```text
batchQuantity <= 12
```

display:

> Only {batchQuantity} cold-steeped bottles remain for afternoon delivery.

If:

```text
batchQuantity <= 5
```

increase visual urgency slightly.

Do not use fake inventory numbers.

Never fabricate scarcity.

The scarcity message must disappear when inventory is greater than the configured threshold.

---

# 17. CART SYSTEM

Create a functional cart.

Users should be able to:

* Add products
* Remove products
* Increase quantity
* Decrease quantity
* See subtotal
* See total
* Empty cart

Persist cart state locally using localStorage or Zustand.

Prevent users from adding more items than available batch quantity.

If inventory changes, validate cart quantities before checkout.

Create a cart drawer or dedicated cart page.

---

# 18. CHECKOUT

Create a clean checkout experience.

Collect:

* Full name
* Email
* Phone
* Delivery address

Show:

* Order items
* Quantity
* Individual prices
* Subtotal
* Total

Validate all fields using Zod.

Before creating an order, verify product availability against the backend.

Never trust prices supplied by the frontend.

The backend must retrieve current prices from the database.

---

# 19. ORDER CREATION

Create:

```text
POST /api/orders
```

The backend should:

1. Validate request.
2. Retrieve menu items.
3. Validate availability.
4. Validate quantities.
5. Calculate prices server-side.
6. Calculate total server-side.
7. Create Order.
8. Create OrderItems.
9. Return order confirmation.

Use a database transaction.

---

# 20. ADMIN DASHBOARD

Create:

```text
/admin/login
/admin
/admin/menu
/admin/orders
```

Protect all admin routes.

Unauthenticated users must be redirected to:

```text
/admin/login
```

---

# 21. ADMIN LOGIN

Create a premium but minimal login page.

Fields:

* Email
* Password

Features:

* Validation
* Password visibility toggle
* Loading state
* Error state
* Successful login redirect

Never expose password hashes.

---

# 22. ADMIN DASHBOARD HOME

Display:

* Total menu items
* Available items
* Out-of-stock items
* Pending orders
* Today's orders
* Today's revenue

Create clean dashboard cards.

Use responsive layouts.

---

# 23. ADMIN MENU MANAGEMENT

Create a split-pane dashboard.

Desktop:

```text
Sidebar | Main content
```

Sidebar:

* Dashboard
* Menu
* Orders
* Settings
* Logout

Main content:

* Page heading
* Search
* Category filter
* Status filter
* Add New Menu Item button
* Menu inventory grid/table

Primary button:

> * Add New Menu Item

---

# 24. ADMIN MENU ITEM MODAL

Clicking:

> * Add New Menu Item

opens a centered modal.

Backdrop:

```text
fixed inset-0
bg-black/60
backdrop-blur-sm
```

Modal:

* Glass-like premium appearance
* Rounded corners
* Scrollable on mobile
* Framer Motion entrance/exit animation
* Focus trap
* Escape-to-close

---

# 25. IMAGE UPLOAD

Create a drag-and-drop image uploader.

Accept:

```text
.png
.jpg
.jpeg
.webp
```

Features:

* Drag and drop
* File picker
* Preview
* Remove image
* Upload progress
* Validation
* File size validation

Reject unsupported file types.

Do not upload files directly to the database.

---

# 26. IMAGE PROCESSING

Use Cloudinary.

Pipeline:

```text
Browser
↓
Backend validation
↓
Cloudinary
↓
Resize
↓
Compress
↓
Convert to WebP
↓
CDN URL
↓
Database
```

Maximum width:

```text
800px
```

Optimize images for web delivery.

Store:

* image URL
* Cloudinary public ID

When a menu item image is replaced, remove the old Cloudinary asset when appropriate.

---

# 27. MENU ITEM FORM

Fields:

### Food Title

Placeholder:

> e.g., Organic Avocado & Egg Bowl

Required.

---

### Description

Use TipTap or another lightweight rich-text editor.

Support:

* Bold
* Italic
* Bullet lists

Use sanitization before rendering HTML.

---

### Price

Numeric decimal input.

Display:

> ₦

Store the monetary value safely.

Avoid floating-point calculation errors.

---

### Category

Options:

* Nutritious Meals
* Snacks
* Yogurt Bowls
* Zobo & Juices

---

### Status

Options:

* Available
* Out of Stock

---

### Batch Quantity

Numeric field.

Used by the scarcity system.

---

### Featured

Boolean toggle.

---

# 28. FORM VALIDATION

Use React Hook Form + Zod.

Validate:

* Required fields
* Price
* Category
* Status
* Batch quantity
* Image type
* Image size

Show inline validation messages.

Do not submit invalid data.

The backend must repeat validation.

Never rely solely on frontend validation.

---

# 29. FORM ACTIONS

Cancel:

> Cancel

Behavior:

* Reset state
* Animate modal out
* Close modal

Submit:

> Save & Publish Menu Item

Behavior:

1. Validate form.
2. Upload image.
3. Create menu item.
4. Refresh menu list.
5. Show success toast.
6. Close modal.

Display loading state:

> Publishing...

Prevent duplicate submissions.

---

# 30. EDIT MENU ITEM

Every menu item should support:

* Edit
* Change status
* Update price
* Update quantity
* Replace image
* Delete

Deletion must require confirmation.

Example:

> Delete this menu item?

Buttons:

* Cancel
* Delete

---

# 31. API ROUTES

Implement at minimum:

```text
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/menu
GET    /api/menu/:id
POST   /api/menu
PUT    /api/menu/:id
PATCH  /api/menu/:id
DELETE /api/menu/:id

POST   /api/uploads/image

GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PATCH  /api/orders/:id/status
```

Protect admin-only routes using authentication middleware.

Public users should only have access to appropriate menu and order functionality.

---

# 32. API RESPONSE FORMAT

Use consistent JSON responses.

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request"
  }
}
```

Never expose stack traces in production.

---

# 33. SECURITY

Implement:

* Password hashing
* Secure authentication
* HTTP-only cookies where appropriate
* CORS configuration
* Helmet
* Rate limiting
* Request validation
* Input sanitization
* File type validation
* File size limits
* Authorization middleware
* Environment variables
* No secrets committed to Git

Create:

```text
.env.example
```

Never hard-code:

* database URLs
* API keys
* Cloudinary secrets
* authentication secrets

---

# 34. RESPONSIVE DESIGN

The entire application must work on:

* Mobile
* Tablet
* Laptop
* Desktop
* Large desktop

Pay particular attention to:

* Navigation
* Hero text
* Menu cards
* Carousel
* Admin tables
* Modal forms
* Checkout
* Touch interactions

Do not simply shrink desktop layouts.

Design mobile layouts intentionally.

---

# 35. ACCESSIBILITY

Implement:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Proper labels
* ARIA attributes where required
* Modal focus trap
* Escape-to-close
* Accessible buttons
* Accessible form errors
* Sufficient color contrast
* Reduced-motion support

Respect:

```text
prefers-reduced-motion
```

---

# 36. ANIMATION SYSTEM

Use Framer Motion carefully.

Animations should feel premium rather than excessive.

Use:

* Fade-up entrances
* Staggered menu cards
* Image hover scale
* Button spring interactions
* Modal spring animation
* Navbar transitions
* Scroll reveal
* Carousel motion

Avoid:

* excessive bouncing
* distracting transitions
* animation on every element
* slow page interactions

Animation should enhance the brand experience.

---

# 37. LOADING STATES

Every asynchronous operation must have a loading state.

Examples:

Menu:

> Loading today's menu...

Admin:

Skeleton cards/table.

Image upload:

Progress indicator.

Login:

> Signing in...

Save:

> Publishing...

Checkout:

> Processing order...

Never leave the user wondering whether something happened.

---

# 38. ERROR STATES

Create polished error states.

Examples:

> We couldn't load today's menu.

Button:

> Try Again

For admin:

> Something went wrong while saving this menu item.

Button:

> Retry

Never show raw API errors to customers.

---

# 39. EMPTY STATES

Create useful empty states.

Example:

> No meals found.

Supporting text:

> Try another category or search term.

Admin:

> Your menu is empty.

CTA:

> Add Your First Menu Item

---

# 40. TOAST NOTIFICATIONS

Use a toast library or custom toast system.

Success examples:

> Menu item published successfully.

> Item added to cart.

> Order placed successfully.

Error examples:

> We couldn't save that item. Please try again.

Avoid excessive notifications.

---

# 41. PERFORMANCE

Optimize for:

* Fast initial load
* Lazy-loaded images
* Responsive images
* WebP
* Code splitting
* Lazy-loaded admin pages
* API caching
* Efficient database queries

Do not load the admin application unnecessarily on the public homepage.

---

# 42. SEO

Although this is a React SPA, implement sensible SEO.

Include:

* title
* meta description
* Open Graph metadata
* favicon
* semantic headings
* descriptive image alt text

Example title:

> Organic Wellness Restaurant | Fresh, Nutritious Food Daily

---

# 43. PROJECT STRUCTURE

Use a clean structure similar to:

```text
restaurant-app/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── menu/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   └── admin/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── config/
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── .env.example
├── README.md
└── package.json
```

Adjust the structure where technically appropriate, but maintain clear separation between frontend and backend.

---

# 44. ENVIRONMENT VARIABLES

Create an `.env.example` containing variables such as:

```text
DATABASE_URL=

AUTH_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

CLIENT_URL=
SERVER_URL=
```

Never commit `.env`.

---

# 45. SEED DATA

Create a Prisma seed script containing realistic sample menu items.

Include examples such as:

* Organic Avocado & Egg Bowl
* Green Goddess Salad
* Tropical Yogurt Bowl
* Nut & Seed Energy Bites
* Cold-Steeped Hibiscus Zobo
* Ginger Citrus Zobo
* Fresh Green Juice

Use realistic Nigerian Naira pricing.

Include different availability states and batch quantities so the UI can demonstrate:

* Available
* Low stock
* Out of stock
* Featured products

---

# 46. ADMIN DEMONSTRATION DATA

Seed one development administrator.

Do not hard-code credentials into the frontend.

Document development credentials only through environment variables or the README.

Clearly warn that development credentials must be changed before production.

---

# 47. UI DETAILS

Use:

* Large editorial typography
* Generous whitespace
* Organic rounded cards
* Subtle borders
* Soft shadows
* Premium imagery
* Deep forest green surfaces
* Cream backgrounds
* Toasted ochre CTAs

Avoid:

* excessive gradients
* neon colors
* generic SaaS dashboards
* excessive glassmorphism
* overly rounded childish UI
* template-like layouts

The restaurant should feel premium and established.

---

# 48. MOBILE ADMIN

On mobile:

* Sidebar becomes drawer
* Tables become cards where necessary
* Modal becomes near-full-screen
* Form fields become single-column
* Buttons become touch-friendly
* Image uploader becomes full-width

---

# 49. CART UX

Use a cart drawer on desktop.

On mobile, use a full-screen cart page/drawer.

Display cart count in navigation.

When adding an item:

* Animate cart indicator
* Show confirmation
* Update subtotal

Do not create distracting animations.

---

# 50. BUSINESS LOGIC

Implement these rules:

### Out of stock

```text
status = OUT_OF_STOCK
```

→ cannot add to cart.

### Low inventory

```text
batchQuantity <= 12
```

→ display scarcity message.

### Zero inventory

```text
batchQuantity = 0
```

→ automatically treat item as unavailable.

### Quantity validation

Users cannot purchase:

```text
quantity > batchQuantity
```

### Price

Always retrieve the current price from the database during checkout.

---

# 51. DATA CONSISTENCY

Use database transactions for order creation.

Do not allow race conditions where two customers can purchase more inventory than exists.

Where appropriate, use transactional inventory updates.

After an order is successfully created, decrement relevant inventory quantities.

If quantity reaches zero:

```text
status = OUT_OF_STOCK
```

---

# 52. ADMIN ORDER MANAGEMENT

Create an order management page.

Display:

* Order ID
* Customer
* Date
* Total
* Status
* Items

Allow admin to update status:

```text
PENDING
CONFIRMED
PREPARING
READY
COMPLETED
CANCELLED
```

Use status badges.

---

# 53. TESTING

Include tests for critical functionality.

Test:

* Authentication
* Menu creation
* Menu update
* Menu deletion
* Menu filtering
* Cart calculations
* Checkout validation
* Order creation
* Inventory validation
* Out-of-stock behavior

Ensure production build succeeds.

Fix TypeScript errors.

Fix lint errors.

Do not finish while obvious runtime errors remain.

---

# 54. README

Create a professional README containing:

* Project overview
* Features
* Tech stack
* Architecture
* Installation
* Environment variables
* Database setup
* Prisma migrations
* Seed command
* Development commands
* Production build
* Deployment instructions
* Cloudinary setup
* Admin setup

Include exact commands required to run the project.

---

# 55. DEVELOPMENT COMMANDS

The project should support commands equivalent to:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
```

Database commands:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

Ensure commands are correctly configured for the final project structure.

---

# 56. IMPLEMENTATION PRIORITY

Build in this order:

### Phase 1

Project initialization:

* React
* Vite
* TypeScript
* Tailwind
* Express
* Prisma
* PostgreSQL

### Phase 2

Database:

* Prisma schema
* Migrations
* Seed data

### Phase 3

Backend:

* Authentication
* Menu APIs
* Upload API
* Order APIs
* Validation
* Error handling

### Phase 4

Public frontend:

* Navbar
* Hero
* Story
* Carousel
* Menu
* Services
* Footer

### Phase 5

Cart:

* Cart state
* Cart drawer
* Quantity controls
* Persistence

### Phase 6

Checkout:

* Customer information
* Validation
* Order creation
* Confirmation

### Phase 7

Admin:

* Login
* Dashboard
* Menu management
* Modal
* Image uploader
* Editing
* Deletion

### Phase 8

Orders:

* Admin order management
* Status updates

### Phase 9

Polish:

* Animations
* Responsive behavior
* Accessibility
* Loading states
* Error states
* Empty states
* SEO
* Performance

### Phase 10

Testing and production preparation.

---

# 57. IMPORTANT AI AGENT RULES

You are responsible for making reasonable implementation decisions.

Do not repeatedly ask for clarification when the specification already provides enough information.

If a minor implementation detail is unspecified, choose the most maintainable production-standard solution.

Do not replace the specified technology stack without a strong technical reason.

Do not generate fake APIs.

Do not use mock data in place of the real database once database functionality is implemented.

Do not hard-code menu products into the UI.

Do not hard-code inventory numbers.

Do not hard-code prices into checkout calculations.

Do not expose secrets.

Do not leave TODO placeholders for core functionality.

Do not create fake buttons that don't work.

Do not create decorative UI that implies functionality that hasn't been implemented.

---

# 58. FINAL QUALITY STANDARD

Before declaring the project complete, verify:

* Frontend starts successfully.
* Backend starts successfully.
* Database connects successfully.
* Prisma migrations work.
* Seed works.
* Admin login works.
* Public menu loads from API.
* Category filtering works.
* Search works.
* Cart works.
* Checkout validation works.
* Orders are created correctly.
* Inventory is updated.
* Out-of-stock logic works.
* Scarcity logic works.
* Admin can create menu items.
* Admin can upload images.
* Images are optimized.
* Admin can edit menu items.
* Admin can delete menu items.
* Admin can update availability.
* Admin can manage orders.
* Responsive layouts work.
* Animations work.
* Reduced-motion behavior works.
* Accessibility basics are implemented.
* Error states work.
* Loading states work.
* Empty states work.
* Production build succeeds.
* No obvious TypeScript errors remain.
* No obvious console errors remain.
* No secrets are committed.

---

# 59. FINAL DESIGN DIRECTION

The final result should look like a **premium Nigerian organic wellness restaurant brand**, not a generic restaurant template.

The visual hierarchy should prioritize:

1. Food photography
2. Brand story
3. Menu discovery
4. Product desirability
5. Scarcity/availability
6. Ordering
7. Trust
8. Convenience

Use the deep forest green, warm cream, and toasted ochre palette as the visual foundation.

Use Fraunces to create an editorial, artisanal identity and Plus Jakarta Sans for clean usability.

The result should feel sophisticated enough for a premium physical restaurant while remaining extremely easy to use on a mobile phone.

Build the application as a real production system, not merely a visual demonstration.

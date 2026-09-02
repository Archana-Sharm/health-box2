Create a complete, modern, production-ready React website for:

HEALTH BOX POLYCLINIC & ADVANCE PHYSIOTHERAPY CENTER

IMPORTANT:
I will provide my existing index.html as a visual and functional reference.
Use that file as the PRIMARY reference for the website design.

Do NOT simply wrap the existing HTML inside React.
Build a proper React application from scratch using reusable components.

==================================================
BRAND COLORS
==================================================

Use these exact brand colors throughout the website:

--hb-green: #A8D52A
--hb-teal: #0F766E
--hb-yellow: #F4C430
--hb-red: #E63946
--hb-bg: #F7FAF2
--hb-navy: #172033
--hb-gray: #64748B
--hb-white: #FFFFFF

The design should feel:
- Premium
- Modern
- Professional
- Clean
- Medical
- Trustworthy
- Patient-friendly

Do NOT randomly introduce a different color palette.

==================================================
TECH STACK
==================================================

Use:

- React
- Vite
- React Router
- JavaScript
- Tailwind CSS or clean reusable CSS
- Axios or fetch for API calls
- Lucide React or Font Awesome for icons

Use reusable components instead of duplicating HTML.

Suggested structure:

src/
  components/
  layouts/
  pages/
  admin/
  services/
  hooks/
  api/
  assets/
  utils/
  App.jsx
  main.jsx

==================================================
PUBLIC WEBSITE
==================================================

Create these routes:

/
 /about
 /services
 /doctors
 /why-choose-us
 /contact
 /highlights
 /physiotherapy

==================================================
HOME PAGE
==================================================

Create a premium healthcare homepage containing:

1. Top information bar
   - Opening hours
   - Location
   - Phone
   - Contact

2. Responsive navbar
   - Health Box logo
   - Home
   - About
   - Services
   - Doctors
   - Why Choose Us
   - Contact
   - Book Appointment button

3. Hero section
   - Strong healthcare headline
   - Supporting text
   - Book Appointment CTA
   - Explore Services CTA
   - Professional healthcare imagery
   - Animated background elements
   - Trust/recovery cards
   - Patient statistics

4. Doctors preview
   - Load doctors dynamically from API
   - Doctor cards
   - View All Doctors button

5. About section
   - Healthcare introduction
   - Mission
   - Vision
   - Core values
   - Professional imagery

6. Services section
   Include medical and physiotherapy services such as:
   - Orthopedic & Joint Physiotherapy
   - Neuro Rehabilitation
   - General OPD Consultations
   - Sports Injury Rehabilitation
   - Pain Management
   - Post-operative Rehabilitation
   - Women's Health Physiotherapy
   - Pediatric Physiotherapy
   - Other relevant services

7. Why Choose Us section

8. Physiotherapy section

9. Highlights / facilities section

10. CTA section
    - Book Appointment
    - Contact Us

11. Footer
    - Address
    - Phone
    - Email
    - Quick links
    - Services
    - Social media
    - Copyright

==================================================
ABOUT PAGE
==================================================

Create a premium About Us page containing:

- Hero banner
- Who We Are
- Our Story
- Mission
- Vision
- Core Values
- Patient-first care
- Integrated healthcare
- Physiotherapy approach
- Why patients choose Health Box
- CTA

==================================================
SERVICES PAGE
==================================================

Create a complete services page.

Each service should have:

- Icon/image
- Title
- Description
- Benefits
- Treatment information
- Book Appointment button

Use reusable ServiceCard components.

==================================================
DOCTORS PAGE
==================================================

Create a professional doctors directory.

Doctors must load dynamically from the backend API.

Each doctor card should support:

- Photo
- Name
- Qualification
- Specialty
- Experience
- Description
- Consultation information
- Book Appointment

Add loading states and error states.

==================================================
WHY CHOOSE US
==================================================

Create sections for:

- Experienced professionals
- Patient-centered care
- Advanced physiotherapy
- Multiple specialties
- Personalized treatment
- Modern facilities
- Transparent communication
- Convenient location

==================================================
CONTACT PAGE
==================================================

Create:

- Contact information
- Address
- Phone
- Email
- Opening hours
- Google Maps section
- Contact form
- Appointment CTA

Contact form must connect to the backend API.

==================================================
APPOINTMENT SYSTEM
==================================================

Create a reusable appointment modal/form.

Fields:

- Patient Name
- Phone
- Email
- Doctor
- Service
- Preferred Date
- Preferred Time
- Message

Submit the appointment to the existing backend API.

Show:

- Loading state
- Success message
- Error message

==================================================
ADMIN PANEL
==================================================

Create a completely responsive admin dashboard.

Routes:

/admin
/admin/dashboard
/admin/doctors
/admin/appointments
/admin/enquiries
/admin/banners
/admin/social
/admin/settings
/admin/profile

==================================================
ADMIN LOGIN
==================================================

Create a professional admin login page.

Fields:

- Email
- Password

Use the existing backend authentication API.

After successful login:

1. Receive JWT token.
2. Store JWT securely in localStorage.
3. Store required admin information.
4. Redirect to:

/admin/dashboard

If login fails, display a clear error message.

==================================================
AUTHENTICATION
==================================================

Implement:

- JWT authentication
- Protected admin routes
- Authentication context/hook
- Logout
- Token validation
- Automatic redirect to /admin when unauthenticated

If token is missing or invalid:

Redirect to:

/admin

==================================================
ADMIN DASHBOARD
==================================================

Create dashboard cards for:

- Total Doctors
- Total Appointments
- Pending Appointments
- Total Enquiries

Include recent appointments and useful dashboard information.

==================================================
ADMIN DOCTORS
==================================================

Create CRUD functionality:

- Add doctor
- Edit doctor
- Delete doctor
- View doctors
- Upload doctor image
- Specialty
- Qualification
- Experience
- Description
- Status

Connect everything to the existing backend API.

==================================================
ADMIN APPOINTMENTS
==================================================

Create:

- Appointment list
- Patient details
- Doctor
- Service
- Date
- Time
- Status

Allow admin to update appointment status.

==================================================
ADMIN ENQUIRIES
==================================================

Create:

- Enquiry list
- Patient name
- Phone
- Email
- Message
- Date
- Status

==================================================
ADMIN BANNERS
==================================================

Create banner management:

- Add banner
- Edit banner
- Delete banner
- Enable/disable banner
- Banner image
- Title
- Subtitle
- Button text
- Button URL

The public homepage banner should load dynamically from the API.

==================================================
ADMIN SOCIAL MEDIA
==================================================

Allow admin to manage:

- Facebook
- Instagram
- YouTube
- LinkedIn
- Other social links

==================================================
ADMIN SETTINGS
==================================================

Allow admin to manage:

- Clinic name
- Phone
- Email
- Address
- Opening hours
- Social links
- Website information

==================================================
ADMIN PROFILE
==================================================

Create profile page where admin can view/update profile information and change password if supported by the backend.

==================================================
BACKEND API
==================================================

IMPORTANT:

The existing backend is already available.

Do NOT create a fake backend.

Do NOT replace the existing API.

Use the existing API endpoints and data structures wherever possible.

API configuration must use environment variables.

Local:

VITE_API_URL=http://localhost:5001

Production:

VITE_API_URL=https://YOUR-PRODUCTION-BACKEND-URL

Never hardcode localhost into production code.

Create:

.env
.env.example

==================================================
API ERROR HANDLING
==================================================

Handle:

- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 500 Server Error
- Network errors
- Loading states
- Empty states

Display user-friendly messages.

==================================================
RESPONSIVE DESIGN
==================================================

The entire website must work perfectly on:

- Mobile
- Tablet
- Laptop
- Desktop

The navbar must have a mobile menu.

Admin dashboard must also be fully responsive.

==================================================
DESIGN REQUIREMENTS
==================================================

Use:

- Smooth animations
- Hover effects
- Scroll reveal animations
- Cards
- Rounded corners
- Subtle shadows
- Professional spacing
- Accessible contrast
- Clean typography
- Premium healthcare UI

Do NOT make it look like a generic Bootstrap template.

The final design should closely follow the visual quality and branding of my supplied index.html.

==================================================
IMPORTANT FILE REFERENCE
==================================================

I will attach my existing index.html.

Use it to understand:

- Existing layout
- Existing sections
- Existing text
- Existing images
- Existing colors
- Existing buttons
- Existing navigation
- Existing animations
- Existing functionality

Preserve the useful content and visual identity, but implement everything properly in React.

==================================================
ROUTING
==================================================

Use React Router.

Routes must work directly:

/
/about
/services
/doctors
/why-choose-us
/contact
/highlights
/physiotherapy
/admin
/admin/dashboard
/admin/doctors
/admin/appointments
/admin/enquiries
/admin/banners
/admin/social
/admin/settings
/admin/profile

Refreshing any route must NOT result in a 404 when deployed on cPanel.

Provide the required Apache .htaccess configuration for React SPA routing.

==================================================
PRODUCTION BUILD
==================================================

The project MUST successfully run:

npm install
npm run dev
npm run build

Fix all build errors before finishing.

==================================================
FINAL REQUIREMENT
==================================================

Do not give me only code snippets or an explanation.

Create the COMPLETE React project with:

- All public pages
- All admin pages
- Routing
- Components
- API integration
- JWT authentication
- Protected routes
- Responsive design
- Forms
- Loading states
- Error handling
- Animations
- Assets
- Environment configuration
- cPanel deployment configuration

The final result must be a complete working Health Box website, not a demo or incomplete template.
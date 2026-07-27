const en = {
  // Navbar
  nav_home: "Home",
  nav_about: "About Us",
  nav_team: "Our Team",
  nav_blog: "Blog",
  nav_contact: "Contact",
  nav_consult: "Consult Now",
  nav_book: "Book Consultation",

  // Hero Section
  hero_heading: "Experienced Legal Solutions",
  hero_tagline: "Protecting Your Rights With Confidence",
  hero_subtext:
    "Professional legal representation for individuals, businesses, and families. We fight for the justice you deserve.",
  hero_book: "Book Consultation",
  hero_learn: "Learn More",

  // Stats
  stat_experience: "Years Experience",
  stat_cases: "Cases Handled",
  stat_success: "Success Rate",
  stat_lawyers: "Expert Lawyers",

  // Search Section
  search_tag: "Search & Find",
  search_heading: "Find the Right Lawyer for You",
  search_subtext:
    "Search by location, specialization, or name to connect with the perfect legal expert.",
  search_location: "Location",
  search_category: "Specialization",
  search_name: "Lawyer Name",
  search_placeholder_name: "Search by name...",
  search_button: "Find Lawyer",
  search_found: "lawyer",
  search_found_plural: "lawyers",
  search_found_label: "found",

  // Why Choose Us
  why_tag: "The LexPrime Advantage",
  why_heading: "Why Choose Us?",
  why_body:
    "We combine deep legal expertise with a commitment to achieving the best possible outcomes for our clients.",
  why_link: "Discover Our Firm History",
  why_features: [
    "Experienced Lawyers",
    "Personalized Strategy",
    "Transparent Fees",
    "Confidential Consultation",
    "Proven Results",
  ],

  // CTA
  cta_heading: "Need Legal Advice?",
  cta_sub: "Schedule Your Confidential Consultation Today",
  cta_button: "Book Appointment",

  // Team Page
  team_heading: "Our Legal Experts",
  team_subtext:
    "A diverse team of seasoned professionals dedicated to achieving extraordinary results.",
  team_showing: "Showing",
  team_of: "of",
  team_lawyers: "lawyers",
  team_no_results: "No lawyers match your search.",
  team_clear: "Clear Filters",
  team_book_with: "Book with",

  // Consultation Form
  consult_heading: "Book a Consultation",
  consult_subtext:
    "Take the first step towards resolving your legal matter. Provide us with some basic information, and we will get back to you promptly.",
  consult_form_title: "Consultation Form",
  consult_confidential: "All information is kept strictly confidential.",
  consult_name: "Full Name",
  consult_phone: "Phone Number",
  consult_email: "Email Address",
  consult_case_type: "Case Type",
  consult_case_placeholder: "e.g. Criminal Defense, Property Dispute, Family Law...",
  consult_date: "Preferred Date",
  consult_time: "Preferred Time",
  consult_time_morning: "Morning (9 AM - 12 PM)",
  consult_time_afternoon: "Afternoon (1 PM - 4 PM)",
  consult_time_evening: "Evening (4 PM - 7 PM)",
  consult_message: "Brief Description of Your Case",
  consult_message_placeholder: "Please provide a brief overview of your legal situation...",
  consult_submit: "Request Appointment",
  consult_success_title: "Request Received!",
  consult_success_body:
    "Thank you for reaching out. One of our legal experts will review your request and contact you shortly to confirm your appointment time.",
  consult_submit_another: "Submit Another Request",

  // Contact Page
  contact_heading: "Get in Touch",
  contact_subtext:
    "Whether you need immediate legal representation or have questions about our services, we are here to help.",
  contact_info_title: "Contact Information",
  contact_location_title: "Office Location",
  contact_phone_title: "Phone",
  contact_email_title: "Email",
  contact_hours_title: "Office Hours",
  contact_hours_value: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday & Sunday: Closed",
  contact_form_title: "Send Us a Query",
  contact_your_email: "Your Email Address",
  contact_your_query: "Your Query",
  contact_query_placeholder: "Describe your legal issue or question...",
  contact_chars_left: "characters left",
  contact_send: "Send Query",
  contact_sent_title: "Message Sent Successfully!",
  contact_sent_body:
    "Thank you for contacting us. A member of our team will get back to you within 24 hours.",
  contact_send_another: "Send another message",

  // Footer
  footer_tagline:
    "A premium law firm dedicated to providing exceptional legal services with integrity, professionalism, and respect for our clients.",
  footer_quick_links: "Quick Links",
  footer_expertise: "Our Expertise",
  footer_contact: "Contact Us",
  footer_copyright: "LexPrime Law Firm. All rights reserved.",
  footer_privacy: "Privacy Policy",
  footer_terms: "Terms of Service",
};

export type TranslationKey = keyof typeof en;
export default en;

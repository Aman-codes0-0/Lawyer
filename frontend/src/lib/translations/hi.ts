import type { TranslationKey } from "./en";

const hi: Record<TranslationKey, string | string[]> = {
  // Navbar
  nav_home: "होम",
  nav_about: "हमारे बारे में",
  nav_team: "हमारी टीम",
  nav_blog: "ब्लॉग",
  nav_contact: "संपर्क",
  nav_consult: "परामर्श करें",
  nav_book: "परामर्श बुक करें",

  // Hero Section
  hero_heading: "अनुभवी कानूनी समाधान",
  hero_tagline: "विश्वास के साथ आपके अधिकारों की रक्षा",
  hero_subtext:
    "व्यक्तियों, व्यवसायों और परिवारों के लिए पेशेवर कानूनी प्रतिनिधित्व। हम आपके लिए न्याय की लड़ाई लड़ते हैं।",
  hero_book: "परामर्श बुक करें",
  hero_learn: "अधिक जानें",

  // Stats
  stat_experience: "वर्षों का अनुभव",
  stat_cases: "मामले संभाले",
  stat_success: "सफलता दर",
  stat_lawyers: "विशेषज्ञ वकील",

  // Search Section
  search_tag: "खोजें और पाएं",
  search_heading: "अपने लिए सही वकील खोजें",
  search_subtext:
    "स्थान, विशेषज्ञता या नाम से खोजें और सही कानूनी विशेषज्ञ से जुड़ें।",
  search_location: "स्थान",
  search_category: "विशेषज्ञता",
  search_name: "वकील का नाम",
  search_placeholder_name: "नाम से खोजें...",
  search_button: "वकील खोजें",
  search_found: "वकील",
  search_found_plural: "वकील",
  search_found_label: "मिले",

  // Why Choose Us
  why_tag: "LexPrime का लाभ",
  why_heading: "हमें क्यों चुनें?",
  why_body:
    "हम गहरी कानूनी विशेषज्ञता को अपने मुवक्किलों के लिए सर्वोत्तम परिणाम प्राप्त करने की प्रतिबद्धता के साथ जोड़ते हैं।",
  why_link: "हमारी फर्म का इतिहास जानें",
  why_features: [
    "अनुभवी वकील",
    "व्यक्तिगत रणनीति",
    "पारदर्शी शुल्क",
    "गोपनीय परामर्श",
    "सिद्ध परिणाम",
  ],

  // CTA
  cta_heading: "कानूनी सलाह चाहिए?",
  cta_sub: "आज अपना गोपनीय परामर्श शेड्यूल करें",
  cta_button: "अपॉइंटमेंट बुक करें",

  // Team Page
  team_heading: "हमारे कानूनी विशेषज्ञ",
  team_subtext:
    "असाधारण परिणाम प्राप्त करने के लिए समर्पित अनुभवी पेशेवरों की एक विविध टीम।",
  team_showing: "दिखाया जा रहा है",
  team_of: "में से",
  team_lawyers: "वकील",
  team_no_results: "आपकी खोज से कोई वकील नहीं मिला।",
  team_clear: "फ़िल्टर साफ़ करें",
  team_book_with: "के साथ बुक करें",

  // Consultation Form
  consult_heading: "परामर्श बुक करें",
  consult_subtext:
    "अपनी कानूनी समस्या को सुलझाने की दिशा में पहला कदम उठाएं। हमें कुछ बुनियादी जानकारी दें, और हम जल्द ही आपसे संपर्क करेंगे।",
  consult_form_title: "परामर्श फ़ॉर्म",
  consult_confidential: "सभी जानकारी पूरी तरह गोपनीय रखी जाती है।",
  consult_name: "पूरा नाम",
  consult_phone: "फ़ोन नंबर",
  consult_email: "ईमेल पता",
  consult_case_type: "केस का प्रकार",
  consult_case_placeholder: "जैसे आपराधिक बचाव, संपत्ति विवाद, पारिवारिक कानून...",
  consult_date: "पसंदीदा तारीख",
  consult_time: "पसंदीदा समय",
  consult_time_morning: "सुबह (9 बजे - 12 बजे)",
  consult_time_afternoon: "दोपहर (1 बजे - 4 बजे)",
  consult_time_evening: "शाम (4 बजे - 7 बजे)",
  consult_message: "अपने मामले का संक्षिप्त विवरण",
  consult_message_placeholder: "कृपया अपनी कानूनी स्थिति का संक्षिप्त विवरण दें...",
  consult_submit: "अपॉइंटमेंट अनुरोध करें",
  consult_success_title: "अनुरोध प्राप्त हुआ!",
  consult_success_body:
    "संपर्क करने के लिए धन्यवाद। हमारे एक कानूनी विशेषज्ञ आपके अनुरोध की समीक्षा करेंगे और जल्द ही आपसे संपर्क करेंगे।",
  consult_submit_another: "एक और अनुरोध भेजें",

  // Contact Page
  contact_heading: "संपर्क करें",
  contact_subtext:
    "चाहे आपको तत्काल कानूनी प्रतिनिधित्व की आवश्यकता हो या हमारी सेवाओं के बारे में प्रश्न हों, हम यहाँ हैं।",
  contact_info_title: "संपर्क जानकारी",
  contact_location_title: "कार्यालय का पता",
  contact_phone_title: "फ़ोन",
  contact_email_title: "ईमेल",
  contact_hours_title: "कार्यालय समय",
  contact_hours_value: "सोमवार - शुक्रवार: सुबह 9 बजे - शाम 6 बजे\nशनिवार और रविवार: बंद",
  contact_form_title: "अपना प्रश्न भेजें",
  contact_your_email: "आपका ईमेल पता",
  contact_your_query: "आपका प्रश्न",
  contact_query_placeholder: "अपनी कानूनी समस्या या प्रश्न का वर्णन करें...",
  contact_chars_left: "अक्षर शेष",
  contact_send: "प्रश्न भेजें",
  contact_sent_title: "संदेश सफलतापूर्वक भेजा गया!",
  contact_sent_body:
    "हमसे संपर्क करने के लिए धन्यवाद। हमारी टीम का एक सदस्य 24 घंटों के भीतर आपसे संपर्क करेगा।",
  contact_send_another: "एक और संदेश भेजें",

  // Footer
  footer_tagline:
    "एक प्रीमियम लॉ फर्म जो ईमानदारी, व्यावसायिकता और ग्राहकों के प्रति सम्मान के साथ असाधारण कानूनी सेवाएं प्रदान करने के लिए समर्पित है।",
  footer_quick_links: "त्वरित लिंक",
  footer_expertise: "हमारी विशेषज्ञता",
  footer_contact: "संपर्क करें",
  footer_copyright: "LexPrime लॉ फर्म। सर्वाधिकार सुरक्षित।",
  footer_privacy: "गोपनीयता नीति",
  footer_terms: "सेवा की शर्तें",
};

export default hi;

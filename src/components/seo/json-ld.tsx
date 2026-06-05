import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/constants/seo";

export default function JsonLd() {
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "GameApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    browserRequirements: "Requires a modern web browser with JavaScript enabled",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Just Pick Already?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Just Pick Already is a free, browser-based personality discovery game. You control a stickman character through 5 themed zones, answer real-life dilemma scenarios, and receive a detailed AI-generated personality profile at the end.",
        },
      },
      {
        "@type": "Question",
        name: "Is Just Pick Already free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, it is completely free. There is no sign-up, no login, and no payment required. You can play instantly and anonymously.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to create an account to play?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Just Pick Already requires no account, no sign-up, and no personal data. You can start playing immediately in any web browser.",
        },
      },
      {
        "@type": "Question",
        name: "How long does the personality game take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The whole experience takes about 5 to 10 minutes. You walk through 5 themed zones, answer dilemma-based questions, and receive your AI-generated personality card.",
        },
      },
      {
        "@type": "Question",
        name: "What do the 5 zones test?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 5 zones cover Social Situations (introvert vs extrovert, empathy), Relationships (attachment style, loyalty), Career & Ambition (risk tolerance, values), Moral Grey Areas (true priorities under pressure), and Impulse vs Logic (gut instinct vs careful thinking).",
        },
      },
      {
        "@type": "Question",
        name: "Can I share my personality results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! At the end of the game, you receive a shareable personality card designed to be posted on social media.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}

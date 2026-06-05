import React from "react";
import { Metadata } from "next";
import ContactPageComp from "@/components/contact-about/contact-page";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have questions, feedback, or ideas? Get in touch with the team behind Just Pick Already, the free AI personality game.",
  openGraph: {
    url: `${SITE_URL}/contact`,
    title: "Contact Us",
    description:
      "Reach out to the team behind the free AI personality game.",
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

const ContactPage: React.FC = () => {
  return (
    <ContactPageComp />
  );
}

export default ContactPage;
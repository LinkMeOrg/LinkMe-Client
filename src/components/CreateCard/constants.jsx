import {
  Globe,
  Linkedin,
  Instagram,
  Twitter,
  Github,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";

import ReactCountryFlag from "react-country-flag";

export const SOCIAL_PLATFORMS = [
  {
    key: "website",
    label: "Website",
    placeholder: "https://yoursite.com",
    icon: Globe,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    placeholder: "Your LinkedIn Username/link",
    icon: Linkedin,
  },
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "Your Instagram Username/link",
    icon: Instagram,
  },
  {
    key: "twitter",
    label: "Twitter",
    placeholder: "Your Twitter Username/link",
    icon: Twitter,
  },
  {
    key: "github",
    label: "GitHub",
    placeholder: "Your GitHub Username/link",
    icon: Github,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    placeholder: "Your WhatsApp Number",
    icon: MessageCircle,
  },
  {
    key: "email",
    label: "Email",
    placeholder: "hello@example.com",
    icon: Mail,
  },
  {
    key: "phone",
    label: "Phone",
    placeholder: "+962 7X XXX XXXX",
    icon: Phone,
  },
];

export const countryCodes = [
  {
    name: "Jordan",
    code: "+962",
    shortcut: "JO",
    // JSX Element for easy rendering
    flag: (
      <ReactCountryFlag
        countryCode="JO"
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    ),
  },
  {
    name: "Saudi Arabia",
    code: "+966",
    shortcut: "SA",
    flag: (
      <ReactCountryFlag
        countryCode="SA"
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    ),
  },
  {
    name: "UAE",
    code: "+971",
    shortcut: "AE",
    flag: (
      <ReactCountryFlag
        countryCode="AE"
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    ),
  },
  {
    name: "Qatar",
    code: "+974",
    shortcut: "QA",
    flag: (
      <ReactCountryFlag
        countryCode="QA"
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    ),
  },
  {
    name: "Kuwait",
    code: "+965",
    shortcut: "KW",
    flag: (
      <ReactCountryFlag
        countryCode="KW"
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    ),
  },
  {
    name: "USA",
    code: "+1",
    shortcut: "US",
    flag: (
      <ReactCountryFlag
        countryCode="US"
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    ),
  },
  {
    name: "UK",
    code: "+44",
    shortcut: "GB",
    flag: (
      <ReactCountryFlag
        countryCode="GB"
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    ),
  },
  {
    name: "Australia",
    code: "+61",
    shortcut: "AU",
    flag: (
      <ReactCountryFlag
        countryCode="AU"
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    ),
  },
  {
    name: "Germany",
    code: "+49",
    shortcut: "DE",
    flag: (
      <ReactCountryFlag
        countryCode="DE"
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    ),
  },
  {
    name: "France",
    code: "+33",
    shortcut: "FR",
    flag: (
      <ReactCountryFlag
        countryCode="FR"
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    ),
  },
  {
    name: "Italy",
    code: "+39",
    shortcut: "IT",
    flag: (
      <ReactCountryFlag
        countryCode="IT"
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    ),
  },
  {
    name: "Spain",
    code: "+34",
    shortcut: "ES",
    flag: (
      <ReactCountryFlag
        countryCode="ES"
        svg
        style={{ width: "1.5em", height: "1.5em" }}
      />
    ),
  },
];

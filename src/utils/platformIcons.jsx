import React from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Globe,
  Link as LinkIcon,
  Music,
} from "lucide-react";

export const getPlatformIcon = (platform) => {
  const iconClass = "w-6 h-6 text-white";

  const icons = {
    phone: <Phone className={iconClass} />,
    email: <Mail className={iconClass} />,
    whatsapp: <MessageCircle className={iconClass} />,
    facebook: <Facebook className={iconClass} />,
    twitter: <Twitter className={iconClass} />,
    linkedin: <Linkedin className={iconClass} />,
    instagram: <Instagram className={iconClass} />,
    youtube: <Youtube className={iconClass} />,
    github: <Github className={iconClass} />,
    website: <Globe className={iconClass} />,
    tiktok: <Music className={iconClass} />,
    snapchat: <MessageCircle className={iconClass} />,
    telegram: <MessageCircle className={iconClass} />,
    pinterest: <LinkIcon className={iconClass} />,
    reddit: <LinkIcon className={iconClass} />,
    discord: <MessageCircle className={iconClass} />,
    twitch: <Youtube className={iconClass} />,
    spotify: <Music className={iconClass} />,
  };

  return icons[platform] || <LinkIcon className={iconClass} />;
};

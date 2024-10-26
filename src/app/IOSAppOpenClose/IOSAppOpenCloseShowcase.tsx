import type { ReactNode } from "react";
import { IOSApp, IOSAppOpenClose } from "./IOSAppOpenClose";

const apps: IOSApp[] = [
  {
    id: "1",
    name: "Spotify",
    icon: "fab fa-spotify",
    color: "#1DB954",
  },
  {
    id: "2",
    name: "Instagram",
    icon: "fab fa-instagram",
    color: "#E1306C",
  },
  {
    id: "3",
    name: "WhatsApp",
    icon: "fab fa-whatsapp",
    color: "#25D366",
  },
  {
    id: "4",
    name: "Snapchat",
    icon: "fab fa-snapchat-ghost",
    color: "#FFFC00",
  },
  {
    id: "5",
    name: "Twitter",
    icon: "fab fa-twitter",
    color: "#1DA1F2",
  },
  {
    id: "6",
    name: "Facebook",
    icon: "fab fa-facebook",
    color: "#1877F2",
  },
  {
    id: "7",
    name: "Medium",
    icon: "fab fa-medium",
    color: "#00AB6C",
  },
  {
    id: "8",
    name: "TikTok",
    icon: "fab fa-tiktok",
    color: "#000000",
  },
  {
    id: "9",
    name: "Gmail",
    icon: "far fa-envelope",
    color: "#D44638",
  },
  {
    id: "10",
    name: "Duolingo",
    icon: "fas fa-language",
    color: "#58C472",
  },
  {
    id: "11",
    name: "Amazon",
    icon: "fab fa-amazon",
    color: "#FF9900",
  },
  {
    id: "12",
    name: "Pinterest",
    icon: "fab fa-pinterest",
    color: "#E60023",
  },
  {
    id: "13",
    name: "LinkedIn",
    icon: "fab fa-linkedin",
    color: "#0077B5",
  },
  {
    id: "14",
    name: "Reddit",
    icon: "fab fa-reddit",
    color: "#FF4500",
  },
  {
    id: "15",
    name: "Slack",
    icon: "fab fa-slack",
    color: "#4A154B",
  },
  {
    id: "16",
    name: "Dropbox",
    icon: "fab fa-dropbox",
    color: "#0061FF",
  },
  {
    id: "17",
    name: "Zoom",
    icon: "fas fa-video",
    color: "#2D8CFF",
  },
  {
    id: "18",
    name: "Uber",
    icon: "fas fa-car",
    color: "#000000",
  },
  {
    id: "19",
    name: "Airbnb",
    icon: "fas fa-home",
    color: "#FF5A5F",
  },
  {
    id: "20",
    name: "Twitch",
    icon: "fab fa-twitch",
    color: "#9146FF",
  },
  {
    id: "21",
    name: "Spotify for Artists",
    icon: "fas fa-music",
    color: "#1DB954",
  },
  {
    id: "22",
    name: "Discord",
    icon: "fab fa-discord",
    color: "#7289DA",
  },
  {
    id: "23",
    name: "Telegram",
    icon: "fab fa-telegram-plane",
    color: "#0088CC",
  },
  {
    id: "24",
    name: "YouTube",
    icon: "fab fa-youtube",
    color: "#FF0000",
  },
];

export function IOSAppOpenCloseShowcase(): ReactNode {
  return <IOSAppOpenClose apps={apps} />;
}

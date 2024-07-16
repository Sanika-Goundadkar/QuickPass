// import resources from assets folder

import { ShieldCheck } from "lucide-react";
import { Layers3 } from "lucide-react";
import { WifiOff } from "lucide-react";
import { MonitorSmartphone } from "lucide-react";
import { Search } from "lucide-react";
import { Database } from "lucide-react";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const features = [
  {
    icon: <ShieldCheck />,
    text: "Securely Store Passwords",
    description: "Passwords are stored with AES-256 bit encryption technology.",
  },
  {
    icon: <Layers3 />,
    text: "3 Layers of Security",
    description:
      "Secured with three layers of authentication,Master password, TOTP, & Color Recognition.",
  },
  {
    icon: <WifiOff />,
    text: "Access Offline",
    description:
      "Can also access your vault even when with being offline after you have logged-in.",
  },
  {
    icon: <MonitorSmartphone />,
    text: "Access Anytime, Anywhere",
    description:
      "Cross-platform access for mobiles, tablets, & PCs via browser.",
  },
  {
    icon: <Search />,
    text: "Search your passwords",
    description:
      "Easily find your passwords or specific accounts via search functionality.",
  },
  {
    icon: <Database />,
    text: "Centralized Management",
    description:
      "Store & manage all your passwords in one centralized & secure location.",
  },
];

export const checklistItems = [
  {
    title: "User Registration and Authentication",
    description: "Register and login to your account from anywhere.",
  },
  {
    title: "Account Recovery",
    description:
      "Recover the master password of your account if you ever forgot it.",
  },
  {
    title: "Password Management",
    description:
      "Add new passwords, View all the passwords, Update the current passwords and Delete the passwords you no longer need.",
  },
  {
    title: "Password Retrieval",
    description:
      "Easily search and retrive specific password or account easily.",
  },
  {
    title: "User Settings",
    description: "Update the profile details and master password easily. .",
  },
];

// export const footItems = [
//   { label: "About", href: "#" },
//   { label: "Contact", href: "#" },
//   { label: "Privacy Polocy", href: "#" },
//   { label: "Terms & Conditions", href: "#" },
// ];

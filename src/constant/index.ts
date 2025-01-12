export type MenuLink = {
  icon?: any;
  route: string;
  label: string;
  submenu?: MenuLink[];
};

export const menuLink: MenuLink[] = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/projects",
    label: "Projects",
  },

  {
    route: "/about",
    label: "About",
  },
  {
    route: "/contact",
    label: "Contact",
  },
];

import {
  Brain,
  Wifi,
  CircuitBoardIcon as Circuit,
  Phone,
  Radio,
  Bluetooth,
  Camera,
  VenetianMaskIcon as Mask,
  Lightbulb,
  Cpu,
  Car,
} from "lucide-react";
import type { LucideIcon } from 'lucide-react';

export type Project = {
  title: string;
  count: number;
  images: string[];
  href: string;
  icon: LucideIcon;
};

export const projects: Project[] = [
  {
    title: "AI and ML Projects",
    count: 8,
    images: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    href: "/projects/ai-ml",
    icon: Brain,
  },
  {
    title: "IOT Projects",
    count: 15,
    images: Array(4).fill("/placeholder.svg?height=100&width=100"),
    href: "/projects/iot",
    icon: Wifi,
  },
  {
    title: "MINI Projects",
    count: 12,
    images: Array(4).fill("/placeholder.svg?height=100&width=100"),
    href: "/projects/mini",
    icon: Circuit,
  },
  {
    title: "GSM Projects",
    count: 20,
    images: Array(4).fill("/placeholder.svg?height=100&width=100"),
    href: "/projects/gsm",
    icon: Phone,
  },
  {
    title: "LoRa Projects",
    count: 5,
    images: Array(4).fill("/placeholder.svg?height=100&width=100"),
    href: "/projects/lora",
    icon: Radio,
  },
  {
    title: "Bluetooth Projects",
    count: 29,
    images: Array(4).fill("/placeholder.svg?height=100&width=100"),
    href: "/projects/bluetooth",
    icon: Bluetooth,
  },
  {
    title: "ESP32 CAM",
    count: 10,
    images: Array(4).fill("/placeholder.svg?height=100&width=100"),
    href: "/projects/esp32-cam",
    icon: Camera,
  },
  {
    title: "ESP32-CAM FACE MASK",
    count: 7,
    images: Array(4).fill("/placeholder.svg?height=100&width=100"),
    href: "/projects/esp32-cam-face-mask",
    icon: Mask,
  },
  {
    title: "LIFI Projects",
    count: 6,
    images: Array(4).fill("/placeholder.svg?height=100&width=100"),
    href: "/projects/lifi",
    icon: Lightbulb,
  },
  {
    title: "RASPBERRY PI PICO",
    count: 18,
    images: Array(4).fill("/placeholder.svg?height=100&width=100"),
    href: "/projects/raspberry-pi-pico",
    icon: Cpu,
  },
  {
    title: "EV Projects",
    count: 14,
    images: Array(4).fill("/placeholder.svg?height=100&width=100"),
    href: "/projects/ev",
    icon: Car,
  },
];

import {
  Home,
  FolderTree,
  Plus,
  Eye,
  Settings,
  LogOut,
  Users,
  BookOpen,
  MessageSquare,
} from "lucide-react";

export const adminMenuLink: MenuLink[] = [
  {
    route: "/admin/dashboard",
    label: "Home",
    icon: Home
  },
  {
    route: "#",
    label: "Categories",
    icon: FolderTree,
    submenu: [
      {
        route: "/admin/dashboard/add-category",
        label: "Add Category",
        icon: Plus
      },
    ],
  },
  {
    route: "#",
    label: "Projects",
    icon: BookOpen,
    submenu: [
      {
        route: "/admin/dashboard/add-project",
        label: "Add Project",
        icon: Plus
      },
      {
        route: "/admin/dashboard/view-project",
        label: "View Project",
        icon: Eye
      },
    ],
  },
  {
    route: "/admin/dashboard/settings",
    label: "Settings",
    icon: Settings
  },
  {
    route: "/admin/dashboard/users",
    label: "Users",
    icon: Users
  },
  {
    route: "/admin/dashboard/messages",
    label: "Messages",
    icon: MessageSquare
  },
  {
    route: "/logout",
    label: "Logout",
    icon: LogOut
  }
];

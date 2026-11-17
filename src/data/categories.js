import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Speaker,
  Plug,
} from "lucide-react";

export const categories = [
  {
    slug: "phones",
    name: "Phones",
    blurb: "Flagships and sensible picks",
    icon: Smartphone,
  },
  {
    slug: "laptops",
    name: "Laptops",
    blurb: "For work, study and travel",
    icon: Laptop,
  },
  {
    slug: "audio",
    name: "Audio",
    blurb: "Headphones, buds, speakers",
    icon: Headphones,
  },
  {
    slug: "wearables",
    name: "Wearables",
    blurb: "Watches and fitness trackers",
    icon: Watch,
  },
  {
    slug: "cameras",
    name: "Cameras",
    blurb: "Mirrorless, action, instant",
    icon: Camera,
  },
  {
    slug: "gaming",
    name: "Gaming",
    blurb: "Controllers, headsets, gear",
    icon: Gamepad2,
  },
  {
    slug: "smart-home",
    name: "Smart home",
    blurb: "Lighting, plugs, hubs",
    icon: Speaker,
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "Keyboards, chargers, cables",
    icon: Plug,
  },
];

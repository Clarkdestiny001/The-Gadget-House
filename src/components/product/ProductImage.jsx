import { cn } from "../../lib/format.js";

// Original line illustrations so the storefront works with no image hosting.
// If a product has an `image` URL it is shown instead (see ProductCard).
const INK = "#121212";
const PAPER = "#fffdf8";

const stroke = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" };

function Headphones({ tone }) {
  return (
    <g {...stroke}>
      <path d="M48 118V100a52 52 0 0 1 104 0v18" fill="none" strokeWidth="7" />
      <rect x="36" y="110" width="28" height="52" rx="11" fill={tone} />
      <rect x="136" y="110" width="28" height="52" rx="11" fill={tone} />
      <rect x="42" y="122" width="8" height="28" rx="4" fill={PAPER} strokeWidth="2" />
    </g>
  );
}

function Earbuds({ tone }) {
  return (
    <g {...stroke}>
      <rect x="46" y="100" width="108" height="68" rx="30" fill={tone} />
      <path d="M46 126h108" fill="none" />
      <circle cx="100" cy="146" r="4" fill={PAPER} strokeWidth="2" />
      <circle cx="76" cy="62" r="15" fill={PAPER} />
      <rect x="86" y="62" width="9" height="30" rx="4.5" fill={PAPER} transform="rotate(-12 90 77)" />
      <circle cx="124" cy="62" r="15" fill={PAPER} />
      <rect x="105" y="62" width="9" height="30" rx="4.5" fill={PAPER} transform="rotate(12 110 77)" />
    </g>
  );
}

function Phone({ tone }) {
  return (
    <g {...stroke}>
      <rect x="62" y="22" width="76" height="156" rx="16" fill={tone} />
      <rect x="70" y="30" width="36" height="36" rx="9" fill={INK} />
      <circle cx="80" cy="40" r="6" fill={PAPER} strokeWidth="2" />
      <circle cx="96" cy="56" r="6" fill={PAPER} strokeWidth="2" />
      <circle cx="122" cy="38" r="3" fill={PAPER} strokeWidth="2" />
    </g>
  );
}

function Watch({ tone }) {
  return (
    <g {...stroke}>
      <rect x="78" y="14" width="44" height="46" rx="8" fill={tone} />
      <rect x="78" y="140" width="44" height="46" rx="8" fill={tone} />
      <rect x="60" y="48" width="80" height="104" rx="24" fill={INK} />
      <rect x="67" y="55" width="66" height="90" rx="18" fill={PAPER} strokeWidth="2" />
      <path d="M100 100V78M100 100l15 5" fill="none" strokeWidth="4" />
      <circle cx="100" cy="100" r="3.5" fill={INK} />
      <rect x="140" y="82" width="7" height="16" rx="3" fill={INK} />
    </g>
  );
}

function Laptop({ tone }) {
  return (
    <g {...stroke}>
      <rect x="34" y="42" width="132" height="92" rx="9" fill={INK} />
      <rect x="41" y="49" width="118" height="78" rx="4" fill={tone} strokeWidth="2" />
      <path d="M16 142h168l-10 16H26z" fill={PAPER} />
      <rect x="86" y="142" width="28" height="6" rx="3" fill={INK} strokeWidth="1" />
    </g>
  );
}

function Speaker({ tone }) {
  return (
    <g {...stroke}>
      <rect x="60" y="28" width="80" height="144" rx="26" fill={tone} />
      <circle cx="100" cy="66" r="12" fill={INK} />
      <circle cx="100" cy="124" r="28" fill={INK} />
      <circle cx="100" cy="124" r="11" fill={PAPER} strokeWidth="2" />
      <circle cx="100" cy="152" r="0" />
    </g>
  );
}

function Camera({ tone }) {
  return (
    <g {...stroke}>
      <rect x="60" y="44" width="46" height="26" rx="7" fill={INK} />
      <rect x="26" y="60" width="148" height="96" rx="15" fill={INK} />
      <circle cx="100" cy="110" r="38" fill={PAPER} />
      <circle cx="100" cy="110" r="27" fill={tone} />
      <circle cx="100" cy="110" r="14" fill={INK} />
      <circle cx="94" cy="104" r="3.5" fill={PAPER} strokeWidth="0" />
      <rect x="136" y="70" width="26" height="12" rx="3" fill={PAPER} strokeWidth="2" />
    </g>
  );
}

function Keyboard({ tone }) {
  const rows = [
    { y: 76, keys: 10, x: 32 },
    { y: 98, keys: 10, x: 38 },
    { y: 120, keys: 9, x: 46 },
  ];
  return (
    <g {...stroke}>
      <rect x="18" y="62" width="164" height="92" rx="12" fill={PAPER} />
      {rows.map((row) =>
        Array.from({ length: row.keys }).map((_, i) => (
          <rect
            key={`${row.y}-${i}`}
            x={row.x + i * 14.5}
            y={row.y}
            width="11"
            height="16"
            rx="2.5"
            fill={i === 0 && row.y === 76 ? tone : PAPER}
            strokeWidth="2"
          />
        )),
      )}
      <rect x="54" y="140" width="92" height="10" rx="3" fill={tone} strokeWidth="2" />
    </g>
  );
}

function Controller({ tone }) {
  return (
    <g {...stroke}>
      <path
        d="M58 66h84c18 0 30 12 34 34l7 36c2 14-8 24-20 22-9-1-14-7-18-14l-6-10H61l-6 10c-4 7-9 13-18 14-12 2-22-8-20-22l7-36c4-22 16-34 34-34z"
        fill={tone}
      />
      <path d="M66 96h22M77 85v22" fill="none" strokeWidth="6" />
      <circle cx="124" cy="90" r="5.5" fill={INK} />
      <circle cx="138" cy="102" r="5.5" fill={INK} />
      <circle cx="110" cy="102" r="5.5" fill={INK} />
      <circle cx="124" cy="114" r="5.5" fill={INK} />
    </g>
  );
}

function Bulb({ tone }) {
  return (
    <g {...stroke}>
      <path d="M100 24a44 44 0 0 0-26 79c5 4 8 9 8 15v6h36v-6c0-6 3-11 8-15a44 44 0 0 0-26-79z" fill={tone} />
      <rect x="80" y="130" width="40" height="14" rx="4" fill={PAPER} />
      <rect x="84" y="148" width="32" height="14" rx="5" fill={INK} />
      <path d="M92 108V80l8 12 8-12v28" fill="none" strokeWidth="3" />
    </g>
  );
}

const illustrations = {
  headphones: Headphones,
  earbuds: Earbuds,
  phone: Phone,
  watch: Watch,
  laptop: Laptop,
  speaker: Speaker,
  camera: Camera,
  keyboard: Keyboard,
  controller: Controller,
  bulb: Bulb,
};

export default function ProductImage({ kind, tone = "#ff6a3d", label, className }) {
  const Illustration = illustrations[kind] ?? Phone;
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={label}
      className={cn("size-full", className)}
    >
      <Illustration tone={tone} />
    </svg>
  );
}

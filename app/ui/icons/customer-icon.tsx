export default function CustomerIcon({ color }: { color: string }) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.4261 30.8328C25.9185 29.254 24.7999 27.8589 23.2438 26.8639C21.6877 25.8689 19.7812 25.3296 17.8198 25.3296C15.8584 25.3296 13.9519 25.8689 12.3958 26.8639C10.8397 27.8589 9.72115 29.254 9.21351 30.8328"
        stroke={color}
        strokeWidth="2.96996"
      />
      <circle
        cx="17.8198"
        cy="14.9348"
        r="4.45495"
        stroke={color}
        strokeWidth="2.96996"
        strokeLinecap="round"
      />
      <rect
        x="4.45507"
        y="4.53979"
        width="26.7297"
        height="26.7297"
        rx="4.45495"
        stroke={color}
        strokeWidth="2.96996"
      />
    </svg>
  );
}

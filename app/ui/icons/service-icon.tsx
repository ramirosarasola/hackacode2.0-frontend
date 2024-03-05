export default function ServiceIcon({ color }: { color: string }) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5.93994"
        y="5.93994"
        width="13.1574"
        height="18.1605"
        rx="2.96996"
        stroke={color}
        strokeWidth="2.96996"
      />
      <path
        d="M9.92493 9.92493H16.3948"
        stroke={color}
        strokeWidth="2.96996"
        strokeLinecap="round"
      />
      <path
        d="M9.92493 14.0848H16.3948"
        stroke={color}
        strokeWidth="2.96996"
        strokeLinecap="round"
      />
      <path
        d="M9.92493 18.2447H14.0848"
        stroke={color}
        strokeWidth="2.96996"
        strokeLinecap="round"
      />
    </svg>
  );
}
export default function ProfileIcon({ color }: { color: string }) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="18.6891"
        cy="15.5741"
        r="4.67226"
        stroke={color}
        strokeWidth="3.11484"
        strokeLinecap="round"
      />
      <circle
        cx="18.689"
        cy="18.689"
        r="14.0168"
        stroke={color}
        strokeWidth="3.11484"
      />
      <path
        d="M27.6917 29.3206C27.8897 29.212 27.9833 28.9766 27.8996 28.7668C27.2991 27.2619 26.1421 25.9364 24.5783 24.9705C22.8887 23.927 20.8186 23.3613 18.689 23.3613C16.5594 23.3613 14.4893 23.927 12.7998 24.9705C11.2359 25.9364 10.079 27.2619 9.47839 28.7668C9.39468 28.9766 9.48832 29.2119 9.68631 29.3206C15.2934 32.399 22.0846 32.399 27.6917 29.3206Z"
        fill={color}
      />
    </svg>
  );
}
/**
 * AH Growth wordmark, inline SVG. Ruby fill per design-ahgrowth.md: the logo
 * mark is the one place `{colors.primary}` appears in the header chrome.
 */
export function AhMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AH Growth"
    >
      <path
        d="M4 26L12 6H16.5L24.5 26H20.2L18.4 21.2H10L8.2 26H4ZM11.4 17.6H17L14.2 10.2L11.4 17.6Z"
        fill="currentColor"
      />
      <path
        d="M28.5 26V6H32.5V14H41.5V6H45.5V26H41.5V17.6H32.5V26H28.5Z"
        fill="var(--color-primary)"
      />
      <path
        d="M56 26.4C53.5 26.4 51.4 25.6 49.9 24C48.5 22.5 47.7 20.4 47.7 18C47.7 15.4 48.5 13.3 50.1 11.7C51.7 10.1 53.7 9.3 56.2 9.3C58.9 9.3 61 10.3 62.4 12.2L59.7 14.5C58.8 13.4 57.6 12.8 56.1 12.8C54.7 12.8 53.5 13.3 52.6 14.3C51.7 15.2 51.3 16.5 51.3 18C51.3 19.5 51.8 20.7 52.7 21.6C53.6 22.5 54.8 23 56.3 23C57.3 23 58.1 22.8 58.8 22.4V19.6H55.6V16.4H62.3V24.2C60.7 25.6 58.6 26.4 56 26.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex min-h-11 items-center gap-2.5"
      aria-label="The Halden, home"
    >
      <svg
        width="22"
        height="28"
        viewBox="0 0 22 28"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M1 27V7l10-6 10 6v20M1 27h20M7 27V17h8v10M1 12h20M1 17h6M15 17h6M1 22h6M15 22h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <span className="text-[0.95rem] font-bold tracking-[0.16em] whitespace-nowrap uppercase max-[400px]:text-[0.8rem] max-[400px]:tracking-[0.1em]">
        The Halden
      </span>
    </Link>
  );
}

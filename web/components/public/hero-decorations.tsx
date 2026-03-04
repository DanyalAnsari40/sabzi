export function LeafBranchLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 40 Q30 20 60 35 T120 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        fill="none"
      />
      <path
        d="M20 50 Q45 35 75 45"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
        fill="none"
      />
      <ellipse cx="25" cy="38" rx="8" ry="5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" fill="none" />
      <ellipse cx="55" cy="28" rx="6" ry="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" fill="none" />
      <ellipse cx="85" cy="32" rx="7" ry="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" fill="none" />
    </svg>
  );
}

export function LeafBranchRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M120 40 Q90 20 60 35 T0 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        fill="none"
      />
      <path
        d="M100 50 Q75 35 45 45"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.35"
        fill="none"
      />
      <ellipse cx="95" cy="38" rx="8" ry="5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" fill="none" />
      <ellipse cx="65" cy="28" rx="6" ry="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" fill="none" />
      <ellipse cx="35" cy="32" rx="7" ry="4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" fill="none" />
    </svg>
  );
}

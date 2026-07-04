interface PaymentIconsProps {
  className?: string;
}

export default function PaymentIcons({ className = "" }: PaymentIconsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Accepted payment methods">
      <svg viewBox="0 0 40 26" width="40" height="26" role="img" aria-label="Visa">
        <rect width="40" height="26" rx="4" fill="#1A56C4" />
        <text x="20" y="17" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Arial, sans-serif" fill="#FFFFFF">
          VISA
        </text>
      </svg>
      <svg viewBox="0 0 40 26" width="40" height="26" role="img" aria-label="Mastercard">
        <rect width="40" height="26" rx="4" fill="#F1E3CC" />
        <circle cx="17" cy="13" r="7" fill="#EB5F2E" opacity="0.85" />
        <circle cx="24" cy="13" r="7" fill="#B8933F" opacity="0.85" />
      </svg>
      <svg viewBox="0 0 40 26" width="40" height="26" role="img" aria-label="PayPal">
        <rect width="40" height="26" rx="4" fill="#123326" />
        <text x="20" y="17" textAnchor="middle" fontSize="7.5" fontWeight="700" fontFamily="Arial, sans-serif" fill="#D4B268">
          PayPal
        </text>
      </svg>
    </div>
  );
}

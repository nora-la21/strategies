interface ProgressRingProps {
  pct: number;
  color: string;
  size?: number;
}

export default function ProgressRing({ pct, color, size = 56 }: ProgressRingProps) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={4} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="rotate-90"
        style={{
          rotate: '90deg',
          transformOrigin: `${size / 2}px ${size / 2}px`,
          fontSize: size < 48 ? '10px' : '12px',
          fontWeight: 600,
          fill: '#374151',
        }}
      >
        {pct}%
      </text>
    </svg>
  );
}

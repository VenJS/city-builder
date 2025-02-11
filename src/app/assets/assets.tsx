export function Roof() {
  return (
    <svg
      width="100"
      height="60"
      viewBox="0 0 100 60"
      className="fill-white stroke-black stroke-2"
    >
      <polygon points="50,0 100,60 0,60" />
    </svg>
  );
}

export function HouseFloor({ color }: { color: string }) {
  return (
    <svg width="100" height="60" viewBox="0 0 100 60">
      <rect width="100" height="60" fill={color} />
      <rect x="20" y="15" width="20" height="30" fill="white" />
      <rect x="60" y="15" width="20" height="30" fill="white" />
    </svg>
  );
}

export function FirstFloor({ color }: { color: string }) {
  return (
    <svg width="100" height="60" viewBox="0 0 100 60">
      <rect width="100" height="60" fill={color} />
      <rect x="40" y="15" width="20" height="30" fill="white" />
    </svg>
  );
}

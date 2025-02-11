export function Roof() {
    return (
      <svg width="100" height="60" viewBox="0 0 100 60" className="fill-black">
        <polygon points="50,0 100,60 0,60" />
      </svg>
    );
  }

 export function HouseFloor() {
    return (
      <svg
        width="100"
        height="60"
        viewBox="0 0 100 60"
        className="fill-gray-400"
      >
        <rect width="100" height="60" />
        <rect x="20" y="15" width="20" height="30" className="fill-white" />
        <rect x="60" y="15" width="20" height="30" className="fill-white" />
      </svg>
    );
  }

 export function FirstFloor() {
    return (
      <svg
        width="100"
        height="60"
        viewBox="0 0 100 60"
        className="fill-gray-600"
      >
        <rect width="100" height="60" />
        <rect x="40" y="15" width="20" height="30" className="fill-white" />
      </svg>
    );
  }
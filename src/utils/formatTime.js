export function formatTime(secondsTotal) {
  const h = String(Math.floor(secondsTotal / 3600)).padStart(2, "0");
  const m = String(Math.floor((secondsTotal % 3600) / 60)).padStart(2, "0");
  const s = String(secondsTotal % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

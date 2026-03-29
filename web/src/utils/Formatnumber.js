export function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

export const COMMUNITIES = [
  { name: "r/programming", members: "4.2M", color: "#8B5CF6" },
  { name: "r/javascript", members: "2.1M", color: "#F59E0B" },
  { name: "r/react", members: "890K", color: "#38BDF8" },
  { name: "r/selfhosted", members: "654K", color: "#10B981" },
  { name: "r/homelab", members: "1.3M", color: "#F97316" },
  { name: "r/typescript", members: "512K", color: "#6366F1" },
  { name: "r/softwareengineering", members: "3.1M", color: "#EC4899" },
  { name: "r/opensource", members: "780K", color: "#14B8A6" },
];
/**
 * 朱砂印章:白厅体系唯一的图形标志物。
 * 纯内联 SVG,零外部请求;文字走系统宋体,与全站字体一致。
 * 入场动画(盖章)由 .stamp-in 类驱动,reduced-motion 下自动关闭。
 */
export function Stamp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="叁仟书屋印章" className={className}>
      <rect width="64" height="64" rx="3" fill="var(--seal)" />
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        opacity="0.85"
      />
      {/* 印文序:右上→右下→左上→左下(从右起竖读) */}
      <text x="41" y="27" textAnchor="middle" fontSize="17" fontFamily='"Songti SC", "Noto Serif SC", "STSong", "SimSun", serif' fill="#ffffff">
        叁
      </text>
      <text x="41" y="50" textAnchor="middle" fontSize="17" fontFamily='"Songti SC", "Noto Serif SC", "STSong", "SimSun", serif' fill="#ffffff">
        仟
      </text>
      <text x="23" y="27" textAnchor="middle" fontSize="17" fontFamily='"Songti SC", "Noto Serif SC", "STSong", "SimSun", serif' fill="#ffffff">
        书
      </text>
      <text x="23" y="50" textAnchor="middle" fontSize="17" fontFamily='"Songti SC", "Noto Serif SC", "STSong", "SimSun", serif' fill="#ffffff">
        屋
      </text>
    </svg>
  );
}

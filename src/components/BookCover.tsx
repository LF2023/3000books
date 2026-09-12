/**
 * 程序生成书衣:每本书一张纯 SVG 排印封面。
 * 不是原书装帧——是站内统一的「书衣」:白厅底、细线双框、竖排书名、mono 类目、朱砂小印。
 * 零外部请求、零图片文件;书名 fill 用 currentColor,随所在行 hover 一起转朱砂。
 */

const SERIF = '"Songti SC", "Noto Serif SC", "STSong", "SimSun", serif';
const MONO = 'ui-monospace, "SF Mono", "Cascadia Mono", Consolas, monospace';

function VTitle({
  chars,
  x,
  y,
  size,
  gap,
  maxChars,
}: {
  chars: string[];
  x: number;
  y: number;
  size: number;
  gap: number;
  maxChars: number;
}) {
  const shown = chars.slice(0, maxChars);
  return (
    <text x={x} y={y} fontSize={size} fontFamily={SERIF} fill="currentColor">
      {shown.map((ch, i) => (
        <tspan key={i} x={x} y={y + i * gap}>
          {ch}
        </tspan>
      ))}
      {chars.length > maxChars ? (
        <tspan x={x} y={y + maxChars * gap} fontSize={size * 0.7} fill="#a1a1aa">
          ▾
        </tspan>
      ) : null}
    </text>
  );
}

export function BookCover({
  title,
  category,
  author,
  variant,
  className = "",
}: {
  title: string;
  category?: string;
  author?: string;
  variant: "thumb" | "full";
  className?: string;
}) {
  if (variant === "thumb") {
    const chars = [...title];
    const overflow = chars.length > 6;
    return (
      <svg
        viewBox="0 0 80 120"
        aria-hidden="true"
        className={`${className} block bg-gallery-deep`}
      >
        <rect x="0.5" y="0.5" width="79" height="119" fill="none" stroke="#d4d4d8" strokeWidth="1" />
        <rect x="5.5" y="5.5" width="69" height="109" fill="none" stroke="#e4e4e7" strokeWidth="0.75" />
        <VTitle chars={chars} x={52} y={24} size={13} gap={15} maxChars={6} />
        {overflow ? (
          <text x={30} y={24} fontSize={11} fontFamily={SERIF} fill="currentColor">
            ···
          </text>
        ) : null}
        <rect x="36" y="104" width="8" height="8" fill="var(--seal)" />
      </svg>
    );
  }

  const chars = [...title];
  const size = chars.length <= 6 ? 34 : chars.length <= 10 ? 27 : 22;
  const gap = size + 8;
  const perCol = Math.floor((450 - 90 - 60) / gap) + 1;
  const cols: string[][] = [];
  for (let i = 0; i < chars.length; i += perCol) {
    cols.push(chars.slice(i, i + perCol));
  }

  return (
    <svg
      viewBox="0 0 300 450"
      role="img"
      aria-label={`${title} · 站内生成书衣`}
      className={`${className} block bg-gallery-deep`}
    >
      <rect x="0.5" y="0.5" width="299" height="449" fill="none" stroke="#d4d4d8" strokeWidth="1" />
      <rect x="10.5" y="10.5" width="279" height="429" fill="none" stroke="#e4e4e7" strokeWidth="0.75" />
      {category ? (
        <text
          x="150"
          y="40"
          textAnchor="middle"
          fontSize="11"
          letterSpacing="4"
          fontFamily={MONO}
          fill="#52525b"
        >
          {category}
        </text>
      ) : null}
      {/* 书名竖排,从右起竖读;第二列在左 */}
      {cols.map((col, ci) => (
        <VTitle
          key={ci}
          chars={col}
          x={236 - ci * 44}
          y={84}
          size={size}
          gap={gap}
          maxChars={perCol + 2}
        />
      ))}
      {author ? (
        <text
          x="150"
          y="414"
          textAnchor="middle"
          fontSize="11"
          letterSpacing="2"
          fontFamily={MONO}
          fill="#52525b"
        >
          {author}
        </text>
      ) : null}
      <rect x="28" y="396" width="22" height="22" fill="var(--seal)" />
      <text
        x="39"
        y="412"
        textAnchor="middle"
        fontSize="12"
        fontFamily={SERIF}
        fill="#ffffff"
      >
        書
      </text>
    </svg>
  );
}

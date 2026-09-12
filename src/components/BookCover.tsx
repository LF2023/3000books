/**
 * 程序生成书衣 v2:每本书一张纯 SVG 排印封面,且各不相同。
 * 由书名哈希确定性派生「构图 × 底纹」组合——同一本书永远同一张封面,
 * 不同书籍在白厅体系内各有版式面貌。零外部请求、零图片文件。
 * 不是原书装帧;不得替换为位图/外链封面(版权与覆盖问题,见 MASTER.md)。
 */

const SERIF = '"Songti SC", "Noto Serif SC", "STSong", "SimSun", serif';
const MONO = 'ui-monospace, "SF Mono", "Cascadia Mono", Consolas, monospace';

function hashStr(s: string): number {
  let h = 0;
  for (const ch of s) {
    h = ((h * 31 + (ch.codePointAt(0) ?? 0)) | 0) >>> 0;
  }
  return h;
}

type Layout = "v-right" | "h-center" | "v-left";
type Texture = "plain" | "grid" | "dots" | "diagonal";

function TextureDef({ kind, id }: { kind: Texture; id: string }) {
  if (kind === "grid") {
    return (
      <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse">
        <path d="M14 0H0V14" fill="none" stroke="#18181b" strokeOpacity="0.06" strokeWidth="0.75" />
      </pattern>
    );
  }
  if (kind === "dots") {
    return (
      <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="8" cy="8" r="1" fill="#18181b" fillOpacity="0.09" />
      </pattern>
    );
  }
  if (kind === "diagonal") {
    return (
      <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#18181b" strokeOpacity="0.05" strokeWidth="1" />
      </pattern>
    );
  }
  return null;
}

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
  coverUrl,
  className = "",
}: {
  title: string;
  category?: string;
  author?: string;
  variant: "thumb" | "full";
  coverUrl?: string;
  className?: string;
}) {
  if (coverUrl) {
    return (
      // 真实封面(数据仓托管,Google Books 来源);生成书衣仅作未命中回退
      <img
        src={coverUrl}
        alt={`${title} 封面`}
        loading="lazy"
        className={`${className} block bg-gallery-deep object-cover`}
      />
    );
  }

  const h = hashStr(title);
  const layout: Layout = (["v-right", "h-center", "v-left"] as Layout[])[h % 3];
  const texture: Texture = (["plain", "grid", "dots", "diagonal"] as Texture[])[
    Math.floor(h / 3) % 4
  ];
  const pid = `bt-${h.toString(36)}`;

  if (variant === "thumb") {
    const chars = [...title];
    const vertical = layout !== "h-center";
    return (
      <svg
        viewBox="0 0 80 120"
        aria-hidden="true"
        className={`${className} block bg-gallery-deep`}
      >
        {texture !== "plain" ? <defs><TextureDef kind={texture} id={pid} /></defs> : null}
        <rect width="80" height="120" fill={texture !== "plain" ? `url(#${pid})` : undefined} />
        <rect x="0.5" y="0.5" width="79" height="119" fill="none" stroke="#d4d4d8" strokeWidth="1" />
        <rect x="5.5" y="5.5" width="69" height="109" fill="none" stroke="#e4e4e7" strokeWidth="0.75" />
        {vertical ? (
          <VTitle chars={chars} x={layout === "v-right" ? 52 : 28} y={24} size={13} gap={15} maxChars={6} />
        ) : (
          <text
            x="40"
            y="52"
            textAnchor="middle"
            fontSize={chars.length > 4 ? 11 : 13}
            fontFamily={SERIF}
            fill="currentColor"
          >
            {chars.slice(0, 7).map((ch, i) => (
              <tspan key={i} x="40" y={52 + Math.floor(i / 4) * 15}>
                {ch}
              </tspan>
            ))}
          </text>
        )}
        <rect x="36" y="104" width="8" height="8" fill="var(--seal)" />
      </svg>
    );
  }

  const chars = [...title];

  return (
    <svg
      viewBox="0 0 300 450"
      role="img"
      aria-label={`${title} · 站内生成书衣`}
      className={`${className} block bg-gallery-deep`}
    >
      {texture !== "plain" ? <defs><TextureDef kind={texture} id={pid} /></defs> : null}
      <rect width="300" height="450" fill={texture !== "plain" ? `url(#${pid})` : undefined} />
      <rect x="0.5" y="0.5" width="299" height="449" fill="none" stroke="#d4d4d8" strokeWidth="1" />
      <rect x="10.5" y="10.5" width="279" height="429" fill="none" stroke="#e4e4e7" strokeWidth="0.75" />

      {layout === "h-center" ? (
        <>
          {category ? (
            <text x="150" y="48" textAnchor="middle" fontSize="11" letterSpacing="4" fontFamily={MONO} fill="#52525b">
              {category}
            </text>
          ) : null}
          {(() => {
            const rows = chars.length > 8 ? [chars.slice(0, Math.ceil(chars.length / 2)), chars.slice(Math.ceil(chars.length / 2))] : [chars];
            const size = Math.min(38, Math.floor(250 / Math.max(...rows.map((r) => r.length))));
            return (
              <text textAnchor="middle" fontSize={size} fontFamily={SERIF} fill="currentColor">
                {rows.map((row, ri) => (
                  <tspan key={ri} x="150" y={rows.length === 1 ? 250 : 230 + ri * (size + 14)}>
                    {row.join("")}
                  </tspan>
                ))}
              </text>
            );
          })()}
          {author ? (
            <text x="150" y="400" textAnchor="middle" fontSize="11" letterSpacing="2" fontFamily={MONO} fill="#52525b">
              {author}
            </text>
          ) : null}
        </>
      ) : (
        <>
          {category ? (
            layout === "v-left" ? (
              <text x="150" y="414" textAnchor="middle" fontSize="11" letterSpacing="4" fontFamily={MONO} fill="#52525b">
                {category}
              </text>
            ) : (
              <text x="150" y="40" textAnchor="middle" fontSize="11" letterSpacing="4" fontFamily={MONO} fill="#52525b">
                {category}
              </text>
            )
          ) : null}
          {(() => {
            const x = layout === "v-right" ? 236 : 64;
            const size = chars.length <= 6 ? 34 : chars.length <= 10 ? 27 : 22;
            const gap = size + 8;
            const perCol = Math.floor((450 - 90 - 60) / gap) + 1;
            const cols: string[][] = [];
            for (let i = 0; i < chars.length; i += perCol) {
              cols.push(chars.slice(i, i + perCol));
            }
            return cols.map((col, ci) => (
              <VTitle
                key={ci}
                chars={col}
                x={layout === "v-right" ? x - ci * 44 : x + ci * 44}
                y={84}
                size={size}
                gap={gap}
                maxChars={perCol + 2}
              />
            ));
          })()}
          {author ? (
            <text x="150" y="414" textAnchor="middle" fontSize="11" letterSpacing="2" fontFamily={MONO} fill="#52525b">
              {author}
            </text>
          ) : null}
        </>
      )}

      <rect x="28" y="396" width="22" height="22" fill="var(--seal)" />
      <text x="39" y="412" textAnchor="middle" fontSize="12" fontFamily={SERIF} fill="#ffffff">
        書
      </text>
    </svg>
  );
}

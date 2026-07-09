# Backup: Bản đồ hành trình SVG tĩnh (đã thay bằng iframe SUPER MAP)

Ngày 2026-07-08. Bản SVG này từng nằm trong `src/pages/programs/[id].astro`
(giữa day-tabs và daily-timelines), chưa từng được commit — lưu ở đây để có
thể khôi phục nếu cần (ví dụ: cần bản đồ hoạt động khi `/map/` chưa deploy).

Phần data vẫn còn trong repo, không cần khôi phục:
- `src/data/caobang-boundary.ts` (ranh giới tỉnh rút gọn 149 điểm)
- `src/data/programs.ts` — interface `MapStop`, `HOMESTAY_LOCATION`, `mapStops` từng ngày

## 1. Frontmatter (sau dòng `const base = ...`)

```ts
import boundary from '../../data/caobang-boundary';
import { HOMESTAY_LOCATION } from '../../data/programs'; // gộp vào import sẵn có

// ═══ Bản đồ hành trình: chiếu lat/lng → toạ độ SVG (tính lúc build) ═══
const MAP_W = 560;
const MAP_PAD = 22;
const KX = Math.cos((22.74 * Math.PI) / 180); // co giãn kinh độ tại vĩ tuyến giữa tỉnh
const bLats = boundary.map((p) => p[0]);
const bLngs = boundary.map((p) => p[1]);
const bb = {
  minLat: Math.min(...bLats), maxLat: Math.max(...bLats),
  minLng: Math.min(...bLngs), maxLng: Math.max(...bLngs),
};
const mapScale = (MAP_W - MAP_PAD * 2) / ((bb.maxLng - bb.minLng) * KX);
const MAP_H = Math.round((bb.maxLat - bb.minLat) * mapScale + MAP_PAD * 2);
const px = (lng: number) => MAP_PAD + (lng - bb.minLng) * KX * mapScale;
const py = (lat: number) => MAP_PAD + (bb.maxLat - lat) * mapScale;
const boundaryPath =
  boundary.map((p, i) => `${i ? 'L' : 'M'}${px(p[1]).toFixed(1)} ${py(p[0]).toFixed(1)}`).join('') + 'Z';
// Thanh tỉ lệ 20 km (1° vĩ ≈ 110,9 km)
const SCALE_KM = 20;
const scaleBarPx = (SCALE_KM / 110.9) * mapScale;

interface RoutePoint { name: string; home: boolean; x: number; y: number }

// Đẩy nhẹ các pin chồng nhau ra xa (cụm Bản Giốc/Ngườm Ngao/Khuổi Ky cách nhau
// ~2km — ở tỉ lệ toàn tỉnh sẽ đè lên nhau). Pin homestay giữ nguyên làm mốc neo.
function spreadPins(points: RoutePoint[], minD = 37, iters = 30): RoutePoint[] {
  const pts = points.map((p) => ({ ...p }));
  for (let k = 0; k < iters; k++) {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y;
        const d = Math.hypot(dx, dy) || 0.01;
        if (d >= minD) continue;
        const ux = dx / d, uy = dy / d, push = minD - d;
        if (pts[i].home) { pts[j].x += ux * push; pts[j].y += uy * push; }
        else if (pts[j].home) { pts[i].x -= ux * push; pts[i].y -= uy * push; }
        else {
          pts[i].x -= ux * push / 2; pts[i].y -= uy * push / 2;
          pts[j].x += ux * push / 2; pts[j].y += uy * push / 2;
        }
      }
    }
  }
  return pts;
}

const routeDays = program.itinerary
  .filter((d) => d.mapStops && d.mapStops.length > 0)
  .map((d) => {
    const raw: RoutePoint[] = [
      { name: HOMESTAY_LOCATION.name, home: true, x: px(HOMESTAY_LOCATION.lng), y: py(HOMESTAY_LOCATION.lat) },
      ...d.mapStops!.map((s) => ({ name: s.name, home: false, x: px(s.lng), y: py(s.lat) })),
    ];
    const stops = spreadPins(raw);
    // Đường đi: cong nhẹ giữa các điểm liên tiếp cho tự nhiên
    let path = `M${stops[0].x.toFixed(1)} ${stops[0].y.toFixed(1)}`;
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i], b = stops[i + 1];
      const dx = b.x - a.x, dy = b.y - a.y;
      const cx = (a.x + b.x) / 2 - dy * 0.14, cy = (a.y + b.y) / 2 + dx * 0.14;
      path += `Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    }
    return { dayNumber: d.dayNumber, stops, path };
  });
```

## 2. Markup (giữa day-tabs và `<div class="daily-timelines">`)

```astro
<!-- Bản đồ hành trình: điểm lớn trong ngày đánh số theo thứ tự đi -->
{routeDays.length > 0 && (
  <div class="route-map reveal">
    <div class="route-map-frame">
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label="Bản đồ Cao Bằng — các điểm đến trong ngày đánh số theo thứ tự">
        <path class="rm-province" d={boundaryPath} />
        {routeDays.map((rd, i) => (
          <g class={`rm-day ${i === 0 ? 'active' : ''}`} data-day={rd.dayNumber}>
            <path class="rm-route" d={rd.path} />
            {rd.stops.map((s, si) => s.home ? (
              <g class="rm-home" transform={`translate(${s.x.toFixed(1)} ${s.y.toFixed(1)})`}>
                <circle r="15" />
                <path d="M-5.5 0.5 L0 -4.5 L5.5 0.5 M-4 -0.5 V5 H-1.2 V1.6 H1.2 V5 H4 V-0.5" />
                <text class="rm-lbl" y="30">Sen's Homestay</text>
              </g>
            ) : (
              <g class="rm-pin" style={`--pi: ${si}`} transform={`translate(${s.x.toFixed(1)} ${s.y.toFixed(1)})`}>
                <circle r="16" />
                <text dy="5.5">{si}</text>
              </g>
            ))}
          </g>
        ))}
        <g class="rm-scale" transform={`translate(${MAP_PAD + 4} ${MAP_H - 14})`}>
          <line x1="0" y1="0" x2={scaleBarPx.toFixed(1)} y2="0" />
          <line x1="0" y1="-4" x2="0" y2="4" />
          <line x1={scaleBarPx.toFixed(1)} y1="-4" x2={scaleBarPx.toFixed(1)} y2="4" />
          <text x={(scaleBarPx / 2).toFixed(1)} y="-7">{SCALE_KM} km</text>
        </g>
        <text class="rm-region" x={MAP_W - MAP_PAD - 4} y={MAP_PAD + 12}>CAO BẰNG</text>
      </svg>
    </div>
    {routeDays.map((rd, i) => (
      <ol class={`rm-legend rm-day ${i === 0 ? 'active' : ''}`} data-day={rd.dayNumber}>
        <li class="rm-leg-home">
          <span class="rm-leg-dot rm-leg-dot-home" aria-hidden="true">⌂</span>
          Xuất phát từ Sen's Homestay
        </li>
        {rd.stops.filter((s) => !s.home).map((s, si) => (
          <li>
            <span class="rm-leg-dot" aria-hidden="true">{si + 1}</span>
            {s.name}
          </li>
        ))}
      </ol>
    ))}
  </div>
)}
```

## 3. CSS (trong `<style>` của [id].astro)

```css
/* ── Bản đồ hành trình: tấm bản đồ giấy trên nền trời của timeline ── */
.route-map {
  max-width: 640px;
  margin: 0 auto var(--space-xl);
}
.route-map-frame {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--r);
  padding: 10px;
  box-shadow: 0 10px 30px rgba(46, 38, 30, 0.1);
}
.route-map-frame svg {
  display: block;
  width: 100%;
  height: auto;
  font-family: inherit;
}
.rm-day { display: none; }
.rm-day.active { display: block; }
.rm-province {
  fill: rgba(60, 90, 64, 0.09);
  stroke: rgba(60, 90, 64, 0.4);
  stroke-width: 1.4;
  stroke-linejoin: round;
}
.rm-route {
  fill: none;
  stroke: var(--primary);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-dasharray: 7 8;
  opacity: 0.85;
  animation: rm-flow 1.4s linear infinite;
}
@keyframes rm-flow {
  to { stroke-dashoffset: -30; }
}
.rm-pin circle {
  fill: var(--primary);
  stroke: var(--bg);
  stroke-width: 2.5;
}
.rm-pin text {
  fill: var(--on-primary);
  font-size: 15px;
  font-weight: 700;
  text-anchor: middle;
}
g.rm-day.active .rm-pin {
  animation: rm-pop 0.4s var(--ease-out) both;
  animation-delay: calc(var(--pi) * 110ms);
}
@keyframes rm-pop {
  from { opacity: 0; }
}
.rm-home circle {
  fill: var(--accent);
  stroke: var(--bg);
  stroke-width: 2.5;
}
.rm-home > path {
  fill: none;
  stroke: #fff;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.rm-lbl, .rm-scale text {
  fill: var(--muted);
  font-size: 11.5px;
  font-weight: 600;
  text-anchor: middle;
  paint-order: stroke;
  stroke: var(--bg);
  stroke-width: 3.5;
}
.rm-region {
  fill: rgba(60, 90, 64, 0.5);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-anchor: end;
}
.rm-scale line {
  stroke: var(--muted);
  stroke-width: 1.3;
}
/* Chú thích: số → tên điểm, theo thứ tự đi trong ngày */
ol.rm-legend {
  list-style: none;
  display: none;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px 18px;
  margin-top: var(--space-sm);
  padding: 0;
}
ol.rm-legend.active { display: flex; }
.rm-legend li {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: var(--text-sm);
  color: var(--ink);
}
.rm-legend li.rm-leg-home { color: var(--muted); }
.rm-leg-dot {
  width: 22px;
  height: 22px;
  flex: none;
  display: grid;
  place-items: center;
  background: var(--primary);
  color: var(--on-primary);
  border-radius: 50%;
  font-size: 12.5px;
  font-weight: 700;
}
.rm-leg-dot-home { background: var(--accent); }
@media (max-width: 600px) {
  .route-map { margin-bottom: var(--space-lg); }
  .route-map-frame { padding: 6px; }
  ol.rm-legend { gap: 4px 14px; }
  .rm-legend li { font-size: var(--text-xs); }
  .rm-leg-dot { width: 19px; height: 19px; font-size: 11px; }
}
@media (prefers-reduced-motion: reduce) {
  .rm-route { animation: none; }
  g.rm-day.active .rm-pin { animation: none; }
}
```

## 4. JS (trong Day Timeline Switcher, sau `targetTimeline?.classList.add('active')`)

```js
// Bản đồ hành trình đổi theo ngày (pin trên SVG + chú thích dưới)
document.querySelectorAll('.rm-day').forEach(el => {
  el.classList.toggle('active', el.getAttribute('data-day') === dayNum);
});
```

Ảnh kết quả bản SVG: `sessions/screenshots/map-day1..3-{desktop,mobile}.png`, `map-2n1d-day2.png`.

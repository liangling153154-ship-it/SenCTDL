// Generator: tạo 2 trip riêng cho combo của Sen (sen-2n1d, sen-3n2d) với
// geometry đường đi THẬT tính trước bằng OSRM (authoring-time, đúng kiến trúc
// của CAO BANG SUPER MAP — runtime không gọi API ngoài).
//
// Chạy:  node sessions/snippets/make-sen-trips.mjs   (từ gốc repo)
// Ghi:   1) chèn/thay block SEN-TRIPS trong public/map/trips.js (bản copy tạm)
//        2) sessions/snippets/sen-trips.generated.js — bản commit để PORT sang
//           map thật ở web chính khi ghép nhánh.
//
// Ngày nào điểm đó lấy đúng theo itinerary trong src/data/programs.ts.

import fs from 'node:fs';

const OSRM = 'https://router.project-osrm.org/route/v1/driving';

// Toạ độ từ public/map/data.js (nguồn chuẩn)
const P = {
  home:       { id: 'sens-homestay',    lat: 22.67379,   lng: 106.25561 },
  banGioc:    { id: 'ban-gioc',         lat: 22.85436,   lng: 106.72427 },
  nguomNgao:  { id: 'nguom-ngao',       lat: 22.84542,   lng: 106.70585 },
  khuoiKy:    { id: 'khuoi-ky',         lat: 22.85485,   lng: 106.70091 },
  thangHen:   { id: 'thang-hen',        lat: 22.759,     lng: 106.2972  },
  matThan:    { id: 'mat-than',         lat: 22.77421,   lng: 106.31766 },
  pacBo:      { id: 'pac-bo',           lat: 22.98708,   lng: 106.0504  },
  doiCoChay:  { id: 'ba-quang',         lat: 22.67261,   lng: 106.6175  },
  piPha:      { id: 'pi-pha',           lat: 22.884,     lng: 106.583   },
  phatTich:   { id: 'phat-tich-pagoda', lat: 22.85085,   lng: 106.72313 },
  banGiang:   { id: 'ban-giang',        lat: 22.91214,   lng: 106.05841 },
  lungLuong:  { id: 'lung-luong',       lat: 22.92765,   lng: 106.06731 },
  quaySon:    { id: 'quay-son-swim',    lat: 22.856,     lng: 106.708   },
  langGiay:   { id: 'dia-tren',         lat: 22.714,     lng: 106.41    },
  nungIndigo: { id: 'nung-indigo',      lat: 22.6894384, lng: 106.3871184 },
  thangKham:  { id: 'thac-thang-kham',  lat: 22.6771433, lng: 106.5971808 },
};

// A(x) = mỏ neo xuất phát (nơi ngủ đêm trước): tính vào đường đi nhưng
// KHÔNG hiện badge số trên map (không phải điểm tham quan của ngày đó).
const A = (p) => ({ ...p, anchor: true });

// Mỗi ngày: xuất phát từ homestay (hoặc nơi ngủ đêm trước), qua các điểm lớn
// theo thứ tự timeline (khớp itineraryOptions trong src/data/programs.ts —
// nguồn: 4 LỊCH TRÌNH.md). Không vẽ chặng quay về — cùng đường, đè lên nhau.
const TRIP_DEFS = [
  {
    id: 'sen-2n1d-a',
    title: 'Combo 2N1Đ — Lộ trình 1',
    subtitle: 'Bản Giốc, Đồi Cỏ Cháy & cung Pác Bó — đêm ở Sen’s',
    pace: 'Vừa sức', vibe: 'Đủ điểm chính', cover: 'images/places/ban-gioc.jpg',
    daysStops: [
      [P.home, P.banGioc, P.nguomNgao, P.doiCoChay],
      [P.home, P.pacBo, P.banGiang, P.thangHen, P.matThan],
    ],
  },
  {
    id: 'sen-2n1d-b',
    title: 'Combo 2N1Đ — Lộ trình 2',
    subtitle: 'Pỉ Pha, Bản Giốc & đêm làng đá Khuổi Ky',
    pace: 'Vừa sức', vibe: 'Đêm trong bản đá', cover: 'images/places/stone-village.jpg',
    daysStops: [
      [P.home, P.piPha, P.phatTich, P.banGioc, P.khuoiKy, P.nguomNgao],
      [A(P.khuoiKy), P.doiCoChay, P.matThan, P.thangHen],
    ],
  },
  {
    id: 'sen-3n2d-a',
    title: 'Combo 3N2Đ — Lộ trình 1',
    subtitle: 'Pác Bó, Đồi Cỏ Cháy, Quây Sơn — đêm làng đá Yến Nhi',
    pace: 'Thong thả', vibe: 'Trọn vị Cao Bằng', cover: 'images/places/eye-mountain.jpg',
    daysStops: [
      [P.home, P.pacBo, P.lungLuong, P.banGiang, P.thangHen, P.matThan],
      [P.home, P.langGiay, P.doiCoChay, P.khuoiKy, P.nguomNgao, P.quaySon],
      [A(P.khuoiKy), P.phatTich, P.banGioc, P.piPha],
    ],
  },
  {
    id: 'sen-3n2d-b',
    title: 'Combo 3N2Đ — Lộ trình 2',
    subtitle: 'Pác Bó, Bản Giốc, Thàng Khám & Nùng Indigo',
    pace: 'Thong thả', vibe: 'Bản làng & thủ công', cover: 'images/places/ban-gioc.jpg',
    daysStops: [
      [P.home, P.pacBo, P.lungLuong, P.banGiang, P.thangHen, P.matThan],
      [P.home, P.phatTich, P.banGioc, P.nguomNgao, P.thangKham],
      [A(P.thangKham), P.doiCoChay, P.nungIndigo],
    ],
  },
];

const segCache = new Map();
async function osrmSeg(a, b) {
  const key = `${a.id}->${b.id}`;
  if (segCache.has(key)) return segCache.get(key);
  const url = `${OSRM}/${a.lng},${a.lat};${b.lng},${b.lat}?overview=simplified&geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OSRM ${res.status} for ${key}`);
  const json = await res.json();
  const route = json.routes?.[0];
  if (!route) throw new Error(`OSRM no route for ${key}`);
  const line = route.geometry.coordinates.map(([lng, lat]) => [+lat.toFixed(4), +lng.toFixed(4)]);
  const out = { line, km: route.distance / 1000 };
  segCache.set(key, out);
  await new Promise((r) => setTimeout(r, 600)); // lịch sự với server demo OSRM
  return out;
}

const trips = [];
for (const def of TRIP_DEFS) {
  const stopsByDay = [];
  const segsByDay = [];
  let km = 0;
  for (let di = 0; di < def.daysStops.length; di++) {
    const day = def.daysStops[di];
    stopsByDay.push(day.filter((s) => !s.anchor).map((s) => s.id));
    const segs = [];
    for (let i = 0; i < day.length - 1; i++) {
      const seg = await osrmSeg(day[i], day[i + 1]);
      segs.push(seg.line);
      km += seg.km;
    }
    segsByDay.push(segs);
    // km hiển thị là khứ hồi: cộng chặng cuối ngày về NƠI NGỦ đêm đó
    // (= điểm xuất phát ngày kế; ngày cuối về Sen's lên xe).
    // Chỉ lấy số km, không vẽ — đường về thường đè lên đường đi.
    const last = day[day.length - 1];
    const sleepAt = di < def.daysStops.length - 1 ? def.daysStops[di + 1][0] : P.home;
    if (last.id !== sleepAt.id) km += (await osrmSeg(last, sleepAt)).km;
  }
  trips.push({
    id: def.id, title: def.title, subtitle: def.subtitle,
    days: def.daysStops.length, pace: def.pace, vibe: def.vibe,
    cover: def.cover, km: Math.round(km),
    stopsByDay, segsByDay,
  });
  console.log(`${def.id}: ${def.daysStops.length} ngày, ~${Math.round(km)} km (khứ hồi), segs/ngày = ${segsByDay.map((s) => s.length).join(',')}`);
}

const BEGIN = '/* === SEN-TRIPS BEGIN (web nhánh Sen — PORT sang map web chính khi ghép) === */';
const END = '/* === SEN-TRIPS END === */';
const block = `${BEGIN}
/* Trip riêng theo combo bán trên web nhánh — ngày nào điểm đó đúng theo
   timeline src/data/programs.ts. Sinh bởi sessions/snippets/make-sen-trips.mjs
   (OSRM authoring-time). Không nằm trong SUGGESTED_TRIP_IDS — chỉ mở qua
   deep-link ?trip=sen-2n1d / ?trip=sen-3n2d từ trang tour. */
${trips.map((t) => `TRIPS.push(${JSON.stringify(t)});`).join('\n')}
${END}`;

// 1) Bản commit để port
fs.writeFileSync('sessions/snippets/sen-trips.generated.js', block + '\n');

// 2) Chèn/thay trong bản copy tạm public/map/trips.js
const tripsPath = 'public/map/trips.js';
let src = fs.readFileSync(tripsPath, 'utf8');
const re = new RegExp(BEGIN.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&') + '[\\s\\S]*?' + END.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&'));
src = re.test(src) ? src.replace(re, block) : src.trimEnd() + '\n\n' + block + '\n';
fs.writeFileSync(tripsPath, src);
console.log('Đã ghi', tripsPath, 'và sessions/snippets/sen-trips.generated.js');

# HƯỚNG DẪN GHÉP "Chương trình du lịch Sen" VÀO WEB CHÍNH

**Cho:** người/AI phụ trách web chính `SEN WEB OTA - main` (`SENota.git`).
**Từ:** nhánh `ĐIỀU HÀNH DU LỊCH` (Astro → đã build ra HTML tĩnh).

> ⚠️ ĐỌC HẾT phần "Bối cảnh" trước khi làm. Đây KHÔNG phải "tour" (dịch vụ dẫn
> đoàn, giá/người ở `tours.html`). Đây là **CHƯƠNG TRÌNH DU LỊCH TRỌN GÓI TỰ ĐI**
> (xe + phòng + xe máy + lịch trình gợi ý, giá/2 khách) — một mục MỚI, RIÊNG,
> KHÔNG đè lên `tours.html`.

---

## Bối cảnh & quyết định đã chốt

| Vấn đề | Đã chốt |
|---|---|
| Đây là gì | Chương trình du lịch trọn gói tự đi (khác "tour" dẫn đoàn) |
| Đặt ở đâu | **Mục nav MỚI riêng** trên web chính (không thay tours.html) |
| Ngôn ngữ | Tiếng Việt → đặt trong thư mục `vi/` |
| Liên hệ | Zalo `0822946888` — GIỐNG web chính VI, không đổi |
| Style | Light Highland (`--terra-deep:#9A4A2E`, `--forest:#3C5A40`,
|        | `--paper:#FBF7EF`, Bricolage+Hanken) — ĐÃ khớp web chính, không lo lạc tông |

---

## Nội dung gói này

```
index.html            trang chủ chương trình (hero, combo, bản đồ, gallery, FAQ)
programs/2n1d.html    combo 2 Ngày 1 Đêm (2 lộ trình)
programs/3n2d.html    combo 3 Ngày 2 Đêm (2 lộ trình)
404.html
_astro/               CSS (thuần, không JS framework)
images/  videos/       ảnh & video
_map-port-kit/        đồ nghề port bản đồ (xem PHẦN B)
```

Link nội bộ đang là **gốc `/`** (VD `/programs/2n1d.html`, `/_astro/...`,
`/images/...`). Nếu đặt web chính ở thư mục con, xem "Đổi base" cuối file.

---

# PHẦN A — Đặt trang & nối nav (KHÔNG đụng map/)

### A1. Copy file vào web chính

Đặt gói vào một thư mục con trong `vi/`, ví dụ `vi/chuong-trinh/`:

```
vi/chuong-trinh/index.html          (từ index.html gói này)
vi/chuong-trinh/programs/2n1d.html
vi/chuong-trinh/programs/3n2d.html
vi/chuong-trinh/_astro/...
```

Ảnh/video: gói có sẵn `images/` + `videos/`. Có 2 cách:
- **Đơn giản:** copy nguyên `images/` + `videos/` của gói vào `vi/chuong-trinh/`.
- **Gọn hơn (tránh trùng):** nhiều ảnh đã có trong `images/` web chính — có thể
  trỏ chung, nhưng phải rà từng path. Cách đơn giản an toàn hơn cho lần đầu.

### A2. Đổi base path (vì đặt trong thư mục con)

Gói build với base `/`. Đặt ở `vi/chuong-trinh/` thì mọi link `/programs/...`,
`/_astro/...`, `/images/...` phải thành `/vi/chuong-trinh/...`.

**Cách chuẩn (khuyến nghị):** báo lại bên nhánh — sửa 1 dòng
`astro.config.mjs` → `base: '/vi/chuong-trinh'`, chạy `npx astro build`, lấy gói
mới. Link tự đúng, không phải sửa tay.

**Cách tay (nếu không build lại được):** find-replace trong 3 file HTML:
`href="/` → `href="/vi/chuong-trinh/` và `src="/` → `src="/vi/chuong-trinh/`
(cẩn thận không đụng link ngoài `http`, `#`, `tel:`, `zalo.me`).

### A3. Thêm mục nav mới vào web chính

Nav VI web chính (trong MỖI file `vi/*.html`) có dạng:

```html
<div class="nav-links" id="navLinks">
  <a href="rooms.html">Phòng</a>
  <a href="motorbike.html">Thuê xe máy</a>
  <a href="tours.html">Tour</a>
  <a href="food.html">Ăn uống</a>
  <a href="services.html">Dịch vụ</a>
  <a href="itinerary.html">Lịch trình</a>
  <a href="bus-ticket.html">Vé xe khách</a>
  ...
</div>
```

Thêm 1 mục MỚI (ví dụ đặt cạnh "Tour"):

```html
  <a href="chuong-trinh/index.html">Chương trình</a>
```

→ Phải thêm vào nav của **tất cả file `vi/*.html`** (rooms, motorbike, tours,
food, services, itinerary, bus-ticket, index) để nav đồng nhất. Bản EN
(`*.html` gốc) tuỳ chọn — nếu chưa có bản EN của chương trình thì tạm bỏ qua,
hoặc trỏ mục EN về trang VI.

### A4. Đồng bộ nav/footer TRONG 3 trang chương trình (tuỳ chọn nhưng nên)

3 trang gói này đang mang **nav riêng** của nhánh Sen (Bản đồ / Bao gồm / FAQ +
nút Zalo) — gọn, tập trung chuyển đổi. Có 2 lựa chọn:

- **Giữ nguyên nav riêng (nhanh):** không cần sửa gì, 3 trang tự đứng được.
  Nhược: nav khác các trang web chính, khách khó nhảy sang Phòng/Ăn uống.
- **Thay bằng nav web chính (liền mạch):** thay khối `<nav id="detailNav">` /
  header trong 3 file bằng `<nav id="navbar">...` của web chính (copy từ
  `vi/tours.html`). Nhược: phải chỉnh tay + đảm bảo CSS navbar có sẵn.

Khuyến nghị: lần đầu **giữ nav riêng** cho nhanh, chạy được rồi tính đồng bộ sau.

Footer web chính rất gọn, có thể thêm vào cuối 3 trang nếu muốn:
```html
<footer><p>© 2025 Sen's Homestay · Cao Bằng, Việt Nam · <a href="https://zalo.me/0822946888" target="_blank">Zalo</a></p></footer>
```

---

# PHẦN B — Bản đồ (port patch vào map/ web chính)

3 trang tour nhúng iframe bản đồ. Map web chính nằm ở **GỐC** (`/map/`), còn
trang chương trình ở `vi/chuong-trinh/` — KHÁC CẤP thư mục.

### ⚠️ B0. SỬA đường dẫn iframe (BẮT BUỘC — nếu không map trắng)

Trong gói, iframe + link "Mở toàn màn hình" đang trỏ `map/...` (base `/`, sẽ
build ra `/map/`). Khi map web chính ở `/map/` gốc mà trang lại nằm sâu trong
`vi/chuong-trinh/programs/`, phải chắc đường dẫn trỏ **tuyệt đối `/map/`**.

- **Cách chuẩn:** build lại gói với `base` đúng (xem A2) — Astro tự sinh
  `/vi/chuong-trinh/...` cho asset NHƯNG map thì phải là `/map/`. Vì map dùng
  chung ở gốc, KHÔNG theo base của chương trình. → Báo nhánh Sen: đổi
  `MAP_EMBED_URL` và link "mở toàn màn hình" trong `[id].astro` sang path
  tuyệt đối `/map/index.html` (bỏ tiền tố `base`), rồi build lại.
- **Cách tay:** trong 2 file `programs/*.html`, sửa `src=".../map/index.html`
  và `href=".../map/index.html` → `src="/map/index.html`, `href="/map/index.html`.

→ Sau khi map web chính chưa hiểu chế độ nhúng và chưa có 4 lộ trình Sen thì
iframe vẫn trắng — port tiếp B1–B3 dưới đây.

> ⚠️ Lúc bàn giao, `map/` web chính đang có thay đổi CHƯA COMMIT (nâng cấp
> priority-pins, +800 dòng data). **Chờ đợt đó commit xong** rồi mới port, để
> không trộn code. Port trên bản map đã ổn định.

### B1. Vá `map/app.js` (3 chỗ)

Xem file tham chiếu `_map-port-kit/app.js.PATCHED-reference` (bản app.js của
nhánh ĐÃ vá đủ). Diff nó với `map/app.js` web chính để lấy đúng các đoạn:

1. **Đầu file** (sau `var REDUCED = ...`): thêm `QS`, `EMBED_MODE` (`?embed` →
   `body.embed`).
2. **`function activateTrip`**: thêm tham số `dayIdx`; lọc `segsByDay`/
   `stopsByDay` theo ngày (`if (dayIdx !== null && di !== dayIdx) return`);
   build `trip._daySet`; set `activeTripDay`; chip `.day-chip.active`.
3. **`var activeTripDay = null`** (cạnh `var activeTrip`) + reset trong
   `exitTrip()`.
4. **`function refresh()`**: khi lọc 1 ngày dùng `activeTrip._daySet[activeTripDay]`
   thay `activeTrip._set` (để pin ngày khác không đè lên nhau).
5. **Cuối file** (sau `buildChips(); refresh();`): deep-link `?trip=&day=` +
   listener `message` (`cbmap-trip` / `cbmap-day`, check
   `e.origin === location.origin`).

### B2. Vá `map/index.html` (CSS)

Sau block `.day-chip svg {}` thêm:
```css
.day-chip.active { box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--dc, var(--accent-deep)); }
body.embed .topbar { display: none; }
body.embed .trip-bar { display: none; }
```
(Xem `_map-port-kit/index.html.PATCHED-reference`.)

### B3. Thêm 4 lộ trình Sen vào `map/trips.js`

Copy nguyên block trong `_map-port-kit/sen-trips.generated.js` (4 trip
`sen-2n1d-a/b`, `sen-3n2d-a/b`, đường đi thật OSRM) vào cuối `map/trips.js`
web chính. Các trip này KHÔNG nằm trong `SUGGESTED_TRIP_IDS` (chỉ mở qua
deep-link), nên không ảnh hưởng danh sách gợi ý của map.

> Nếu itinerary đổi sau này: sửa `sessions/snippets/make-sen-trips.mjs` trong
> nhánh rồi chạy lại `node`, lấy `sen-trips.generated.js` mới.

### B4. Kiểm

Mở `vi/chuong-trinh/programs/3n2d.html`: bản đồ hiện, bấm switcher lộ trình +
day-tabs → map bay theo. Nếu iframe trắng: kiểm console (thường do `map/`
chưa port xong hoặc sai đường dẫn iframe `src`).

---

# Checklist tổng

- [ ] A1 Copy 3 trang + assets vào `vi/chuong-trinh/`
- [ ] A2 Đổi base (build lại với `base:'/vi/chuong-trinh'` — khuyến nghị)
- [ ] A3 Thêm mục "Chương trình" vào nav TẤT CẢ `vi/*.html`
- [ ] A4 (tuỳ chọn) đồng bộ nav/footer trong 3 trang
- [ ] B (chờ map hết dirty) port app.js + index.html + trips.js
- [ ] Nghiệm thu: 3 trang chạy, nav đúng, bản đồ đổi lộ trình/ngày, mobile ok

Chi tiết kỹ thuật đầy đủ hơn: `sessions/HANDOFF.md` trong nhánh (TICKET-013,
TICKET-014, mục "QUY TRÌNH · Cập nhật bản đồ").

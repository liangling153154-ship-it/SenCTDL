# 🎨 FILE 3 — PROMPT GENERATE ẢNH PHỤ TRỢ (Gemini / ChatGPT / Midjourney)

> **Cách dùng:** copy prompt → dán vào Gemini/ChatGPT/Midjourney → generate →
> duyệt ảnh ưng → lưu vào `public/images/` theo tên gợi ý → báo Claude gắn vào web.
>
> **Kèm vào MỌI prompt:** `photorealistic, natural light, no text, no watermark,
> no logo, authentic not staged`
>
> ⚠️ **QUY TẮC ĐỊA DANH:** Địa danh nhận diện được (Bản Giốc, Ngườm Ngao, Mắt
> Thần, Khuổi Ky...) → CHỈ dùng **ảnh thật**, không generate — khách nhận ra
> ảnh AI giả sẽ mất uy tín "người bạn địa phương". AI chỉ generate thứ vô danh:
> xe, món ăn cận cảnh, khoảnh khắc dịch vụ, cảnh mood chung (hoàng hôn thung
> lũng không claim tên địa danh).
>
> **Tỷ lệ khung:** ChatGPT/Gemini nói rõ "square 1:1" / "wide 1.91:1 banner";
> Midjourney thêm `--ar 1:1` / `--ar 21:9`.

---

## A · Ảnh OG share link — ✅ XONG (dùng ảnh thật)
**Đã làm:** crop ảnh Bản Giốc THẬT (`hero-main.jpg`) về 1200×630, lưu tại
`public/images/og-banner.jpg`, og:image đã trỏ vào. KHÔNG generate ảnh cho mục
này nữa (quy tắc địa danh — xem đầu file).

---

## B · Travel Book mockup — thay mockup CSS giả
**Tỷ lệ 4:5 · Lưu thành:** `public/images/travel-book.jpg`
**Dùng cho:** section "Sau khi đặt, bạn nhận Travel Book" trên trang chủ.

```
A printed travel guidebook mockup photographed on a rustic wooden table, morning light.
Cover design minimal: warm amber accents, a small waterfall photo, Vietnamese title layout.
Next to it: a smartphone showing a simple hourly timeline app screen, and a folded map
of Cao Bang. Slight top-down angle, shallow depth of field, cozy and premium feeling.
```

---

## C · Thumbnail tuỳ chọn phương tiện (5 ảnh)
**Tỷ lệ 1:1 (vuông, nhỏ) · Lưu thành:** `public/images/vehicles/<tên>.jpg`
**Dùng cho:** section "Tuỳ chọn phương tiện" trang chi tiết (slot ảnh đã sẵn trong code).

**C1 · Cabin xe giường nằm VIP** → `vehicles/sleeper-cabin.jpg`
```
Interior of a VIP sleeper bus cabin at night, single private pod with curtain,
soft reading light, USB port visible, clean and cozy. Eye-level, photorealistic.
```

**C2 · Limousine 9 chỗ** → `vehicles/limousine.jpg`
```
A black 9-seat luxury limousine van parked at a city bus station in Vietnam,
early morning, passengers' luggage nearby, clean urban background,
side 3/4 view, glossy black paint catching the light.
```

**C3 · Xe máy Honda** → `vehicles/motorbike.jpg`
```
A clean Honda Wave motorbike with two helmets on the seat, parked in front of
karst mountains in Cao Bang, bright daylight.
```

**C4 · Easy Rider** → `vehicles/easy-rider.jpg`
```
A young fit Vietnamese motorbike guide (Easy Rider) in his 20s, athletic build,
stylish riding jacket, gently helping a tourist put on a helmet — a caring
service moment. Both seen from behind / side angle, faces NOT visible.
A Honda Airblade scooter parked next to them, karst mountains of Cao Bang
in the background, golden light, warm and trustworthy vibe.
```

**C5 · Ô tô riêng có tài xế** → `vehicles/private-car.jpg`
```
A Mitsubishi Xpander MPV parked at the edge of a scenic mountain road in
Cao Bang, Vietnam — karst peaks and green valleys behind. Vietnamese travelers
(a small group with backpacks) getting into the car, driver holding the door
open — faces not clearly visible, candid moment. Bright daylight, winding road
visible ahead, welcoming and safe feeling, photorealistic.
```

---

## D · Nền CTA cuối — hoàng hôn khép lại
**Tỷ lệ 21:9 (ngang rộng) · Lưu thành:** `public/images/cta-sunset.jpg`
**Dùng cho:** section "Sẵn sàng chưa?" cuối trang chủ (hiện là dải tối trống).

```
Ultra-wide 21:9 photo. Golden hour over terraced valleys of Cao Bang, Vietnam,
a winding river catching low warm sun, thin mist settling. Two tiny figures on
a hillside path, relaxed. The BOTTOM third fades naturally darker (for button overlay).
Peaceful "end of a good day" mood, warm cinematic tones.
```

---

## E · Thumbnail 2 quán ăn trưa (đang thiếu ảnh)
**Tỷ lệ 1:1 · Lưu thành:** `public/images/Food/lunch-1.jpg`, `lunch-2.jpg`
**Dùng cho:** 2 lựa chọn ăn trưa trong timeline 3N2Đ Ngày 1.

**E1 · Nhà sàn ven suối Khuổi Ky**
```
A rustic stilt-house restaurant table by a stream near Ban Gioc: bamboo-tube rice
(com lam), roasted local pork, stir-fried wild greens on simple plates. Natural light.
```

**E2 · Quán thị trấn Trùng Khánh**
```
A simple clean roadside eatery in a small northern Vietnam town, rice trays and
fresh food display, honest local atmosphere, no tourists.
```

---

## F · Texture bầu trời sương (nguyên liệu blend cho nền timeline)
**Tỷ lệ 1:1 (vuông — để tile) · Lưu thành:** `public/images/sky-texture.jpg`
**Dùng cho:** phủ lên gradient bầu trời của timeline (blend overlay, tile lặp) —
tạo chất sương thay vì gradient phẳng. GRAYSCALE bắt buộc (màu do code nhuộm).

**v2 — chống lộ lặp:** texture lặp muốn "vô hình" phải ĐỀU MẬT ĐỘ tuyệt đối,
không có cụm mây/điểm nhấn nào (v1 có cụm đậm nhạt → lặp là mắt bắt được chu
kỳ). Khi duyệt: bản nào "nhàm nhất, đều nhất" là bản TỐT NHẤT.

```
A seamless TILEABLE texture of soft thin mist, square 1:1 format.
Fine, even, wispy haze spread UNIFORMLY across the entire image —
no focal point, no large distinct cloud shapes, no bright patches,
no dark areas, no corners different from the center. Every region must
look nearly identical in density, like a thin veil of fog.
GRAYSCALE only, very low contrast, extremely soft and smooth.
CRITICAL: perfectly seamless — all four edges continue into each other,
repeating infinitely with NO visible seams and NO recognizable features
that reveal repetition. Pure abstract background texture.
```

---

## G · Pattern "Non nước Cao Bằng" (họa tiết lặp vô hạn, kiểu giấy dán tường)
**Tỷ lệ 1:1 (vuông) · Lưu thành:** `public/images/caobang-pattern.png`
**Dùng cho:** họa tiết nền trang trí (timeline hoặc section khác) — motif Cao
Bằng rải đều, lặp mọi hướng. Nền trắng phẳng để code blend/nhuộm theo gradient
bầu trời hoặc để mờ ~15-20% sau các card.
**Mẹo:** từ khoá quyết định là "seamless repeating pattern tile, wallpaper
style". Mép chưa seamless thật cũng được — chọn bản motif rải đẹp, Claude xử
lý mép bằng Python. Muốn nét doodle viền đen: thêm "black outline doodle
style, like hand-drawn stickers".

```
A seamless repeating PATTERN TILE (square 1:1, wallpaper style), TOP-DOWN
AERIAL VIEW as if looking straight down from an airplane — cartoon map style.
Scattered motifs of Cao Bang Vietnam seen from above: clusters of cone-shaped
karst mountains viewed from the top (green rounded peaks with shadows),
winding turquoise rivers with tiny bamboo rafts, small villages of stilt
houses with brown roofs seen from above, patchwork rice paddies in different
greens, thin dirt roads connecting villages, a small multi-tier waterfall
from above, little clouds floating over the landscape casting soft shadows.
Flat cartoon doodle style with clean outlines, playful hand-drawn feel,
greens, teal and warm amber accents. Background PURE FLAT WHITE with generous
empty spacing between motif clusters — motifs never touch each other.
CRITICAL: true seamless repeat — all four edges tile perfectly.
No text, no people's faces, square format.
```

*(v2 — đổi sang góc nhìn từ máy bay theo yêu cầu: núi nhìn từ đỉnh, mái nhà
từ trên, mây có bóng đổ xuống đất. Bản v1 góc ngang đã generate đẹp — giữ
lại làm sticker/trang trí nếu thích.)*

*(Ghi chú: 2 ảnh minh họa núi karst đã generate trước đó vẫn giữ được — style
đẹp, có thể dùng làm ảnh trang trí section khác sau này.)*

---

## Checklist sau khi generate

- [x] A — og-banner.jpg (✅ dùng ảnh Bản Giốc THẬT, đã gắn vào og:image)
- [ ] B — travel-book.jpg
- [x] C1–C5 — vehicles/*.jpg (✅ đã gắn vào section Tuỳ chọn phương tiện)
- [x] D — cta-sunset.jpg (✅ đã gắn làm nền CTA cuối trang chủ)
- [ ] E1–E2 — Food/lunch-*.jpg
> NỘI DUNG THẬT (2026-07-07, từ USER-GUI-AI/1-cau-hoi-noi-dung.docx):
> Đã cập nhật giá + combo THẬT cho 2N1Đ (2.150.000đ/2 khách) và 3N2Đ
> (2.850.000đ/2 khách). 4N3Đ published:false (ẩn khỏi web) — chờ combo thật.
> Xe/homestay/dịch vụ đã theo file. Lịch trình chi tiết theo giờ CHỜ file
> 2-mau-lich-trinh.md (danh sách điểm mới: Ngọc Côn, Phúc Sen, Đồi Cỏ Cháy,
> Chùa Trúc Lâm, Pỉ Pha... khác timeline cũ — chưa viết lại timeline).

- [x] F — sky-texture.jpg (✅ ĐANG DÙNG: sương v2 tile seamless, blend
      overlay 55% lên gradient timeline, tự nhuộm màu theo giờ)
- [x] G — ĐÃ THỬ VÀ BỎ (2026-07-02): bản đồ toile grayscale + bản đồ nguyên
      màu loop đều không giữ. Ảnh gốc vẫn trong `ảnh generate/`.
- [x] H — Đồi Cỏ Cháy: ✅ dùng ảnh THẬT ba-quang.jpg (đồi cỏ vàng + nhà gỗ,
      theo chỉ định của chủ 2026-07-07) cho cả card dịch vụ lẫn highlight.
- [x] I — Nhà tắm: ✅ dùng ảnh THẬT từ web chính (rooms/room-102-rustic/05)
      → images/services/shower.jpg. Check-in sớm cũng có ảnh phòng thật
      (room-101-beige/01 → services/checkin-room.jpg).

> Ảnh gốc nằm ở thư mục `ảnh generate/` (đã convert + resize vào
> `public/images/`). Còn thiếu: **B (Travel Book)** và **E1–E2 (2 quán trưa)**.

Có ảnh nào → lưu đúng tên/thư mục → báo Claude: "đã có ảnh A, C1, C3..." →
Claude gắn vào code ngay (các slot đã sẵn).

# PROMPT CHO AI AGENT — TRẺ HOÁ NỘI DUNG TEXT

> Copy toàn bộ phần dưới đây đưa cho agent. Đọc kỹ LUẬT SẮT trước khi sửa bất kỳ chữ nào.

---

## VAI TRÒ

Bạn là copywriter tiếng Việt cho **Sen's Homestay** — dịch vụ tour trọn gói
Cao Bằng của người bản địa. Nhiệm vụ: viết lại phần TEXT hiển thị của website
cho **ngắn gọn, súc tích, hợp người Việt trẻ 20-30 tuổi**. Chỉ sửa chữ,
tuyệt đối không sửa code.

## GIỌNG VĂN

- **Chất giọng:** người bạn bản địa dẫn đi chơi — thân, thẳng, thật.
  KHÔNG phải giọng công ty du lịch, KHÔNG phải giọng quảng cáo sáo rỗng.
- **XƯng hô (BẮT BUỘC):** web tự xưng là **"Sen"**, KHÔNG dùng "chúng tôi".
  Mọi chỗ đang viết "chúng tôi" phải đổi thành "Sen" (VD: "chúng tôi lo
  mọi thứ" → "Sen lo hết"; "các chuyến đi của chúng tôi" → "những chuyến
  đi Sen dẫn"). Khách gọi là "bạn".
- **Trẻ nhưng không cringe:** được dùng "chill", "xách balo", "cháy máy",
  "flex nhẹ", xưng "bạn" — CẤM teencode (zui, hihi, kkk), CẤM emoji trong
  câu văn (emoji đã có ở icon UI), CẤM hashtag.
- **Ngắn là vua:** câu tối đa ~15 từ. Mô tả 2 câu trở xuống. Cắt mọi từ
  thừa: "được thiết kế nhằm mục đích" → "để". "vô cùng tuyệt vời" → bỏ.
- **Cụ thể > tính từ:** "ngủ bù 2 tiếng, tắm nóng rồi mới lên đường" tốt hơn
  "nghỉ ngơi thoải mái tuyệt đối".

### Ví dụ chuẩn (before → after)

1. "Không cần lên kế hoạch. Không cần lo lắng. Chọn chương trình — chúng tôi
   lo mọi thứ từ xe, phòng, lịch trình đến quán ăn."
   → "Khỏi lên kế hoạch. Chọn combo, xách balo đi — xe, phòng, lịch trình,
   quán ăn: Sen lo hết."
2. "Chúng tôi thiết kế và vận hành từng chi tiết nhỏ nhất trong chuyến đi
   của bạn." → "Từng chi tiết nhỏ nhất đã có Sen lo."
3. "Thưởng thức tại homestay ấm cúng." → "Ăn ngay tại homestay, ấm bụng
   trước khi ngủ."

## PHẠM VI ĐƯỢC SỬA

Chỉ 4 file, chỉ phần TEXT tiếng Việt hiển thị:

1. `src/pages/index.astro` — hero, section headers, includes, FAQ, CTA,
   problem section, footer tagline. (Mảng `gallery`: chỉ được sửa `alt`.)
2. `src/data/programs.ts` — CHỈ các field: `tagline`, `desc`, `details`,
   `title` của busInfo/motorbikeInfo/homestayInfo/night1Info/showerInfo/
   extraStayInfo, `tabLabel`, `tabSub`, `note` của vehicleGroups,
   `desc` của VehicleChoice. KHÔNG sửa field khác.
3. `src/pages/programs/[id].astro` — label tĩnh trong markup (tab strong/
   span, section headers, vehicle-note, sticky bar label).
4. `src/layouts/Base.astro` — meta description (nếu cần).

## LUẬT SẮT — VI PHẠM 1 ĐIỀU = HỎNG VIỆC

1. **CẤM sửa số liệu & danh từ riêng thật:** mọi con số giá (2.150.000đ,
   2.850.000đ, +80.000đ, +50.000đ, +70.000đ, 30.000đ...), giờ giấc
   (20h30–21h, ~4h30, 21:00...), tên nhà xe (Khánh Hoàn, Hiệp Giang,
   Limo Lâm Hiệu, Trùng Khánh), loại xe (Honda Wave Alpha, Vision/Future,
   cabin VIP), số phòng (3 phòng đôi, 3 phòng gia đình), SĐT/Zalo
   0822946888, "ăn sáng có phụ phí". Giữ nguyên từng ký tự số.
2. **CẤM bịa thông tin mới:** không thêm cam kết, review giả, sao xếp hạng,
   khuyến mãi, "top 1", "5 sao". Chỉ diễn đạt lại cái ĐÃ có.
3. **CẤM sửa code:** không đổi tên biến, key, id, class, interface, đường
   dẫn ảnh/video, thuộc tính HTML, `data-tab`, `published`, cấu trúc mảng.
   Không thêm/xoá phần tử mảng. Không format lại file.
4. **CẤM đụng `itinerary` (lịch trình theo giờ trong programs.ts):** phần
   này sắp được viết lại toàn bộ từ file gốc của chủ — bỏ qua hoàn toàn.
5. **Escape chuỗi TS:** trong programs.ts dấu nháy đơn phải viết `\'`
   (như file đang làm). File lưu UTF-8, giữ nguyên encoding.
6. **KHÔNG chạm** vào: `public/`, CSS, `<script>`, file khác ngoài 4 file
   trên, git (không commit/push).

## RÀNG BUỘC ĐỘ DÀI (layout sẽ vỡ nếu vượt)

- Label tab dịch vụ (`<strong>`): ≤ 18 ký tự. Dòng phụ (`<span>`): ≤ 22 ký tự.
- `tabLabel`/`tabSub` trong extraStayInfo: như trên.
- Tên điểm nổi bật (highlights `name`): ≤ 20 ký tự.
- Nút/CTA: ≤ 28 ký tự.
- `tagline` chương trình: ≤ 60 ký tự.
- **QUAN TRỌNG:** trên mobile, panel dịch vụ CHỈ HIỆN 2 BULLET ĐẦU của
  `details` — 2 bullet đầu phải chứa ý quan trọng nhất, bullet 3-4 là phụ.

## QUY TRÌNH BẮT BUỘC

1. Đọc kỹ 4 file trước khi sửa.
2. Sửa từng file, diff tối thiểu (chỉ dòng text thay đổi).
3. Chạy `npm run build` — PHẢI pass, không error/warning mới.
4. Báo cáo: liệt kê từng chỗ đã sửa dạng bảng `before → after`, ghi rõ
   file + lý do. Chỗ nào KHÔNG sửa (vì đã ổn) cũng nói.
5. Không tự ý làm thêm việc ngoài phạm vi (không sửa ảnh, không sửa layout,
   không "tiện tay" refactor).

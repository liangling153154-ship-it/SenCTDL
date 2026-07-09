export interface FoodOption {
  name: string;
  price?: string;
  meta?: string;         // "cách homestay 300m · mở 6h"
  reason?: string;       // vì sao nên chọn
  recommended?: boolean; // ✦ gợi ý chính
  image?: string;
}

export interface Activity {
  time: string;
  title: string;
  desc: string;
  image?: string;
  // Mở rộng: 'food' = mốc ăn có 2 lựa chọn (gọn, chạm bung);
  //          'sight' = điểm chính, bung sẵn (chip thông tin + lưu ý).
  type?: 'food' | 'sight';
  options?: FoodOption[];  // dùng khi type === 'food'
  chips?: string[];        // dùng khi type === 'sight' — "Đẹp nhất: 9h sáng"...
  tip?: string;            // lưu ý / phương án mưa cho điểm chính
}

// Điểm lớn trong ngày hiện trên bản đồ hành trình (đánh số 1-2-3 theo thứ tự đi).
// Toạ độ lấy từ CAO BANG SUPER MAP (public/map/data.js) — nguồn chuẩn.
export interface MapStop {
  name: string;
  lat: number;
  lng: number;
}

export interface DayItinerary {
  dayNumber: number;
  dayTitle: string;
  mapStops?: MapStop[];  // chỉ các điểm lớn — không tính mốc ăn/nhận xe
  activities: Activity[];
}

// Một lộ trình trọn vẹn của combo (mỗi combo có thể có 2 lộ trình cho khách chọn).
// Nguồn nội dung: USER-GUI-AI/4 LỊCH TRÌNH.md (cập nhật 2026-07-09).
export interface ItineraryOption {
  key: string;             // 'a' | 'b' — dùng làm id DOM + phân biệt trong JS
  label: string;           // tên ngắn trên switcher, VD "Lộ trình 1 — đêm ở Sen's"
  sub: string;             // dòng phụ tóm khác biệt
  mapTripId?: string;      // trip tương ứng trong CAO BANG SUPER MAP (trips.js)
  mapTripDayMap?: number[]; // ngày lộ trình ↔ Day trip (1-based)
  itinerary: DayItinerary[];
}

// Điểm xuất phát & kết thúc mỗi ngày — Sen's Homestay (TP. Cao Bằng)
export const HOMESTAY_LOCATION = { name: "Sen's Homestay", lat: 22.67379, lng: 106.25561 };

// Toạ độ các điểm lớn dùng chung giữa các combo (từ public/map/data.js)
const MAP_PLACES = {
  banGioc:    { name: 'Thác Bản Giốc',       lat: 22.85436, lng: 106.72427 },
  nguomNgao:  { name: 'Động Ngườm Ngao',     lat: 22.84542, lng: 106.70585 },
  khuoiKy:    { name: 'Làng đá Khuổi Ky',    lat: 22.85485, lng: 106.70091 },
  matThan:    { name: 'Núi Mắt Thần',        lat: 22.77421, lng: 106.31766 },
  thangHen:   { name: 'Hồ Thang Hen',        lat: 22.759,   lng: 106.2972  },
  pacBo:      { name: 'Khu di tích Pác Bó',  lat: 22.98708, lng: 106.0504  },
  doiCoChay:  { name: 'Đồi Cỏ Cháy',         lat: 22.67261, lng: 106.6175  },
  piPha:      { name: 'Pỉ Pha Viewpoint',    lat: 22.884,   lng: 106.583   },
  phatTich:   { name: 'Chùa Phật Tích Trúc Lâm', lat: 22.85085, lng: 106.72313 },
  banGiang:   { name: 'Thác Bản Giàng',      lat: 22.91214, lng: 106.05841 },
  lungLuong:  { name: 'Lũng Luông',          lat: 22.92765, lng: 106.06731 },
  quaySon:    { name: 'Sông Quây Sơn',       lat: 22.856,   lng: 106.708   },
  pacNga:     { name: 'Cầu Pác Sắc Ngà',     lat: 22.899,   lng: 106.562   },
  langGiay:   { name: 'Làng giấy Dìa Trên',  lat: 22.714,   lng: 106.41    },
  nungIndigo: { name: 'Nùng Indigo Workshop', lat: 22.6894384, lng: 106.3871184 },
  thangKham:  { name: 'Thàng Khám',          lat: 22.6771433, lng: 106.5971808 },
};

export interface ProgramDetails {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  days: number;
  spots: number;
  featured?: boolean;
  published?: boolean;   // false/undefined khi chưa phát hành → ẩn khỏi web
  image: string;
  // Điểm nổi bật: card ảnh nhỏ xếp 2 hàng ở trang chi tiết
  highlights: { name: string; image: string }[];

  // Detailed components shown on card click
  busInfo: {
    title: string;
    desc: string;
    details: string[];
    image: string;
  };
  motorbikeInfo: {
    title: string;
    desc: string;
    details: string[];
    image: string;
  };
  homestayInfo: {
    title: string;
    desc: string;
    details: string[];
    image: string;
  };
  night1Info: {
    title: string;
    desc: string;
    details: string[];
    image: string;
  };
  // Nhà tắm trước khi lên xe đêm rời Cao Bằng (áp dụng mọi combo)
  showerInfo: {
    title: string;
    desc: string;
    details: string[];
    image: string;
  };
  // Card nghỉ đặc biệt riêng của tour (VD: đêm làng đá ở 3N2Đ) —
  // tour nào có field này mới hiện thêm tab thứ 5 trong "Dịch vụ trọn gói".
  extraStayInfo?: {
    tabLabel: string;  // tên tab
    tabSub: string;    // dòng phụ trên tab
    title: string;
    desc: string;
    details: string[];
    image: string;
  };

  // Các lộ trình cho khách chọn (1 hoặc 2). Lộ trình đầu là mặc định.
  itineraryOptions: ItineraryOption[];
}

export interface VehicleChoice {
  name: string;
  desc: string;
  surcharge: string;      // "Đã bao gồm" | "+250.000đ/người" | "Liên hệ"
  recommended?: boolean;  // ✦ gợi ý mặc định
  image?: string;         // thumbnail 1:1 (tuỳ chọn — thêm khi có ảnh)
}

export interface VehicleGroup {
  key: string;
  label: string;
  note?: string;
  choices: VehicleChoice[];
}

// Tuỳ chọn phương tiện dùng chung cho mọi chương trình.
// Data thật theo file USER-GUI-AI/1-cau-hoi-noi-dung.docx (cập nhật 2026-07-07).
export const vehicleGroups: VehicleGroup[] = [
  {
    key: 'longhaul',
    label: 'Xe Hà Nội ↔ Cao Bằng',
    note: 'Khứ hồi, đưa đón tận Sen\'s Homestay. Nhà xe: Khánh Hoàn, Hiệp Giang, Limo Lâm Hiệu, Trùng Khánh.',
    choices: [
      { name: 'Xe giường đơn có màn che', desc: 'Giường nằm đơn có màn che — xuất phát 20h30–21h, tới Cao Bằng ~4h30 sáng.', surcharge: 'Đã bao gồm', recommended: true, image: 'images/vehicles/sleeper-single.jpg' },
      { name: 'Cabin VIP giường đôi', desc: 'Cabin nằm đôi rộng, hợp đi cặp — ngủ một giấc là tới.', surcharge: '+80.000đ/2 người', image: 'images/vehicles/cabin-vip-double.jpg' },
      { name: 'Cabin VIP nằm đơn', desc: 'Cabin đôi dùng riêng một mình — kín đáo, yên tĩnh.', surcharge: '+50.000đ/người', image: 'images/vehicles/cabin-vip-single.jpg' },
    ],
  },
  {
    key: 'local',
    label: 'Di chuyển tại Cao Bằng',
    note: 'Xe máy tự lái suốt hành trình, nhận xe tại Sen\'s Homestay.',
    choices: [
      { name: 'Xe máy Honda Wave Alpha tự lái', desc: 'Đầy xăng, có mũ 2/3, giá đỡ điện thoại, áo mưa — muốn dừng đâu dừng.', surcharge: 'Đã bao gồm', recommended: true, image: 'images/bikes/wave-alpha.jpg' },
      { name: 'Nâng cấp xe ga (Vision/Future)', desc: 'Xe tay ga dễ chạy, hợp bạn chưa quen xe số.', surcharge: '+70.000đ/ngày', image: 'images/bikes/vision.png' },
    ],
  },
];

// ═══════════════ Các mốc dùng lại giữa nhiều lộ trình ═══════════════

const ACT_ARRIVE: Activity = {
  time: '04:30',
  title: 'Đến Cao Bằng',
  desc: 'Xe đêm tới nơi, đưa bạn thẳng về Sen\'s Homestay — ngủ bù, tắm nóng rồi hãy tính tiếp.',
};

const ACT_BREAKFAST_CITY: Activity = {
  time: '06:30',
  title: 'Ăn sáng',
  desc: 'Hai quán ruột gần điểm nhận xe — chọn theo khẩu vị.',
  type: 'food',
  options: [
    { name: 'Phở vịt quay quán Lâm', price: '~40.000đ', meta: 'Gần bến xe · mở từ 6h', reason: 'Vịt quay da giòn, nước dùng đậm — món trứ danh Cao Bằng.', recommended: true, image: 'images/Food/breakfast.jpg' },
    { name: 'Bánh cuốn canh', price: '~30.000đ', meta: 'Gần chợ · phục vụ nhanh', reason: 'Nhẹ bụng, ăn nhanh để xuất phát sớm.', image: 'images/Food/banh-cuon/1.jpg' },
  ],
};

const ACT_GET_BIKE: Activity = {
  time: '07:15',
  title: 'Nhận xe máy đầy xăng',
  desc: 'Honda Wave Alpha đã kiểm tra lốp, phanh — kèm mũ 2/3, giá đỡ điện thoại và áo mưa.',
  image: 'images/bikes/wave-alpha.jpg',
};

const ACT_BAN_GIOC = (time: string): Activity => ({
  time,
  title: 'Khám phá Thác Bản Giốc',
  desc: 'Thác nước biên giới lớn nhất Đông Nam Á — điểm nhất định phải đến của Cao Bằng.',
  type: 'sight',
  image: 'images/places/ban-gioc.jpg',
  chips: ['Đẹp nhất: 8–10h sáng', 'Thời lượng: ~2 giờ', 'Góc chụp: bè tre trên sông', 'Có bãi gửi xe'],
  tip: 'Mưa lớn: đảo lịch — vào Động Ngườm Ngao trước, quay lại thác buổi chiều.',
});

const ACT_NGUOM_NGAO = (time: string): Activity => ({
  time,
  title: 'Khám phá Động Ngườm Ngao',
  desc: 'Một trong những hang động đẹp nhất miền Bắc — nhũ đá triệu năm tuổi.',
  type: 'sight',
  image: 'images/places/nguom-ngao.jpg',
  chips: ['Tuyến ngắn: ~45 phút', 'Tuyến dài: ~2 giờ', 'Trong động ~18–22°C', 'Góc chụp: Cây San Hô, Thác Bạc'],
  tip: 'Nền đá có thể trơn — đi giày thể thao.',
});

const ACT_THANG_HEN = (time: string, best: string, dur: string): Activity => ({
  time,
  title: 'Khám phá Hồ Thang Hen',
  desc: 'Hồ nước xanh ngọc giữa núi đá vôi — đi dạo cầu gỗ, bến thuyền là có ảnh đẹp.',
  type: 'sight',
  image: 'images/places/thang-hen.jpg',
  chips: [`Vé: 30.000đ/người`, `Đẹp nhất: ${best}`, `Thời lượng: ${dur}`, 'Có SUP & thuyền (tuỳ thời điểm)'],
});

const ACT_MAT_THAN = (time: string, best: string): Activity => ({
  time,
  title: 'Khám phá Núi Mắt Thần',
  desc: 'Biểu tượng của Công viên địa chất Non nước Cao Bằng — núi thủng giữa đồng cỏ và hồ nước.',
  type: 'sight',
  image: 'images/places/eye-mountain.jpg',
  chips: [`Đẹp nhất: ${best}`, 'Thời lượng: ~1,5–2 giờ', 'Bè mùa mưa: 50k–100k/người', 'Khô ráo: đi bộ quanh hồ'],
});

const ACT_PAC_BO = (time: string): Activity => ({
  time,
  title: 'Khu di tích Quốc gia đặc biệt Pác Bó',
  desc: 'Suối Lê Nin xanh vắt, núi Các Mác, hang Cốc Bó và cột mốc Km0 — đi một vòng là hiểu vì sao ai cũng ghé.',
  type: 'sight',
  image: 'images/places/pac-bo.jpg',
  chips: ['Miễn phí vé vào cổng', 'Thời lượng: ~2 giờ', 'Đẹp nhất: sáng có nắng', 'Có xe điện trong khu'],
});

const ACT_BAN_GIANG: Activity = {
  time: '11:00',
  title: 'Check-in Thác Bản Giàng',
  desc: 'Thác nhỏ ngay trên cung đường về — nước xanh trong, mùa hè ngâm chân, tắm suối được luôn.',
  type: 'sight',
  chips: ['Đẹp nhất: 10–14h', 'Thời lượng: ~45 phút', 'Có bãi gửi xe'],
  tip: 'Đường vào dễ đi — dừng nghỉ chân trước bữa trưa là vừa.',
};

const ACT_LUNCH_HA_QUANG: Activity = {
  time: '12:00',
  title: 'Ăn trưa khu Hà Quảng',
  desc: 'Nghỉ và nạp năng lượng trước chặng chiều.',
  type: 'food',
  options: [
    { name: 'Mế Farm Stay', price: '~100.000–180.000đ/người', meta: 'Thuận đường · không gian đẹp', reason: 'Món địa phương giữa khung cảnh farm — nghỉ giữa hành trình rất đã.', recommended: true },
    { name: 'Quán cơm thị trấn Hà Quảng', reason: 'Nhanh, giá hợp lý, tiện trên đường đi.' },
  ],
};

const ACT_DOI_CO_CHAY = (time: string, best: string, dur: string, sunset = false): Activity => ({
  time,
  title: sunset ? 'Ngắm hoàng hôn tại Đồi Cỏ Cháy' : 'Check-in Đồi Cỏ Cháy',
  desc: sunset
    ? 'Leo 15–20 phút là đứng trên đồi cỏ tầm nhìn 360° — cuối chiều trời chuyển màu đẹp nhất.'
    : 'Leo 15–20 phút để ôm trọn thung lũng Vinh Quý từ trên cao.',
  type: 'sight',
  image: 'images/places/ba-quang.jpg',
  chips: [`Đẹp nhất: ${best}`, 'Leo đồi: 15–20 phút', `Thời lượng: ${dur}`],
  tip: 'Mang nước, đội mũ, đi giày thể thao. Mưa lớn đường trơn — đừng lên đồi.',
});

const ACT_PHAT_TICH = (time: string, dur: string): Activity => ({
  time,
  title: 'Chùa Phật Tích Trúc Lâm Bản Giốc',
  desc: 'Ngôi chùa đầu tiên nơi biên giới phía Bắc — đứng sân chùa nhìn xuống trọn Thác Bản Giốc.',
  type: 'sight',
  image: 'images/places/phat-tich.jpg',
  chips: [`Thời lượng: ${dur}`, 'Góc chụp: sân chùa nhìn xuống thác'],
  tip: 'Ăn mặc lịch sự, giữ yên tĩnh khi tham quan.',
});

const ACT_PI_PHA = (time: string, chips: string[]): Activity => ({
  time,
  title: 'Check-in Pỉ Pha Viewpoint',
  desc: 'Điểm ngắm cảnh mới của Trùng Khánh — ban công, xích đu hướng thẳng ra thung lũng núi đá vôi.',
  type: 'sight',
  image: 'images/places/pi-pha-viewpoint.jpg',
  chips,
});

const ACT_NGUOM_BANG = (time: string, chips: string[]): Activity => ({
  time,
  title: 'Check-in Hang Ngườm Bàng',
  desc: 'Hang đá cửa rộng ngay trên cung đường — ghé chụp vài kiểu là đi tiếp.',
  type: 'sight',
  chips,
});

const ACT_DINNER_YEN: Activity = {
  time: '19:00',
  title: 'Ăn tối',
  desc: 'Bữa cơm đúng kiểu "ngon như mẹ nấu" — dân địa phương ăn ở đây thật.',
  type: 'food',
  options: [
    { name: 'Yến — Ngon Như Mẹ Nấu', price: '~80.000–150.000đ/người', meta: 'TP. Cao Bằng', reason: 'Cơm nhà đậm vị, hợp sau một ngày chạy xe.', recommended: true, image: 'images/Food/yen-com-me-nau/1.jpg' },
  ],
};

const ACT_DINNER_LAU_CA: Activity = {
  time: '19:00',
  title: 'Ăn tối',
  desc: 'Kết ngày bằng nồi lẩu nghi ngút.',
  type: 'food',
  options: [
    { name: 'Lẩu Cá Ngã Ba Sông', price: '~80.000–150.000đ/người', meta: 'TP. Cao Bằng', reason: 'Lẩu cá tươi, không gian rộng — hợp nhóm bạn, gia đình.', recommended: true },
  ],
};

const ACT_REST_SEN: Activity = {
  time: '21:00',
  title: 'Nghỉ ngơi tại Sen\'s Homestay',
  desc: 'Phòng riêng, tắm nóng, đệm sưởi — sạc pin cho ngày mai.',
};

const ACT_BUS_HOME: Activity = {
  time: '20:30',
  title: 'Lên xe về Hà Nội',
  desc: 'Tắm nóng ở Sen\'s, nhận hành lý, đợi xe 20h30–21h ngay tại homestay — ngủ một giấc là về tới Hà Nội ~4h30.',
};

// ═══════════════ Data chương trình ═══════════════

export const programsData: ProgramDetails[] = [
  {
    id: '2n1d',
    name: '2 Ngày 1 Đêm',
    tagline: 'Cao Bằng lần đầu: gọn, dễ đi, đủ điểm chính',
    price: '2.150.000đ',
    priceNote: '/2 khách',
    days: 2,
    spots: 8,
    published: true,
    image: 'images/places/ban-gioc.jpg',
    highlights: [
      { name: 'Thác Bản Giốc', image: 'images/places/ban-gioc.jpg' },
      { name: 'Động Ngườm Ngao', image: 'images/places/nguom-ngao.jpg' },
      { name: 'Đồi Cỏ Cháy', image: 'images/places/ba-quang.jpg' },
      { name: 'Núi Mắt Thần', image: 'images/places/eye-mountain.jpg' },
      { name: 'Hồ Thang Hen', image: 'images/places/thang-hen.jpg' },
      { name: 'Pác Bó', image: 'images/places/pac-bo.jpg' },
    ],
    busInfo: {
      title: 'Xe giường nằm VIP khứ hồi Hà Nội ⇆ Cao Bằng',
      desc: 'Xe giường đơn có màn che khứ hồi, đưa đón tận Sen\'s Homestay. Nhà xe: Khánh Hoàn, Hiệp Giang.',
      details: [
        'Xuất phát 20h30–21h từ bến xe Mỹ Đình / Giáp Bát (Hà Nội).',
        'Giường nằm đơn có màn che, có chăn gối sạch.',
        'Khoảng 4h30 tới Cao Bằng, xe đưa về Sen\'s Homestay.',
        'Có thể nâng cabin VIP giường đôi (+80.000đ/2 người) hoặc cabin đơn (+50.000đ/người).'
      ],
      image: 'images/services/bus-tickets.jpg'
    },
    motorbikeInfo: {
      title: 'Xe máy Honda Wave Alpha sử dụng 24 giờ',
      desc: 'Honda Wave Alpha đầy xăng, leo dốc ổn — bạn chủ động dừng chụp trên đường.',
      details: [
        'Nhận xe ngay tại Sen\'s Homestay, đã đổ đầy bình xăng.',
        'Kèm: mũ bảo hiểm 2/3, giá đỡ điện thoại, áo mưa tiện lợi, dây buộc đồ.',
        'Dùng trọn 24 giờ, muốn dừng chụp lúc nào cũng được.',
        'Nâng cấp xe ga Vision/Future chỉ +70.000đ/ngày.'
      ],
      image: 'images/bikes/wave-alpha.jpg'
    },
    homestayInfo: {
      title: '01 đêm phòng riêng ở Sen\'s Homestay',
      desc: 'Phòng riêng khép kín tại Sen\'s Homestay: ngủ êm, tắm nóng, nghỉ lại sức.',
      details: [
        'Phòng riêng: điều hoà, WC khép kín, nóng lạnh, đệm sưởi.',
        'Máy chiếu xem Netflix ngay trong phòng.',
        '3 phòng đôi 1 giường lớn & 3 phòng gia đình 2 giường lớn.',
        'Chọn lộ trình 2: đêm nghỉ chuyển sang homestay trong làng đá Khuổi Ky.',
        'Ăn sáng tại homestay có phụ phí (không bao gồm trong giá combo).'
      ],
      image: 'images/homestay.jpg'
    },
    night1Info: {
      title: 'Check-in sớm sau xe đêm',
      desc: 'Đến Cao Bằng ~4h30 sáng, nhận phòng sớm ở Sen\'s Homestay. Ngủ bù, tắm nóng rồi hãy lên đường.',
      details: [
        '~4h30: Xe đến Cao Bằng, đưa bạn thẳng về Sen\'s Homestay.',
        'Nhận phòng sớm, ngủ thêm 1–2 tiếng cho lại sức sau chuyến xe giường nằm.',
        'Tắm nước nóng, vệ sinh cá nhân, gửi hành lý cồng kềnh tại homestay.',
        'Ăn sáng đặc sản, nhận xe máy rồi bắt đầu đi chơi.'
      ],
      image: 'images/services/checkin-room.jpg'
    },
    showerInfo: {
      title: 'Tắm nóng trước khi về Hà Nội',
      desc: 'Ngày cuối về thành phố, bạn không cần lên xe đêm với bụi đường. Ghé tắm nóng, thay đồ sạch rồi đi.',
      details: [
        'Tắm nóng miễn phí trước giờ xe chạy.',
        'Khăn sạch chuẩn bị sẵn, có chỗ thay đồ.',
        'Gửi hành lý trong ngày cuối — về tắm xong nhận lại, thay bộ đồ sạch.',
        'Thảnh thơi ăn tối rồi lên xe 20h30 — ngủ một giấc thẳng tới Hà Nội.'
      ],
      image: 'images/services/shower.jpg'
    },
    itineraryOptions: [
      {
        key: 'a',
        label: 'Lộ trình 1 — đêm ở Sen\'s',
        sub: 'Bản Giốc & hoàng hôn Đồi Cỏ Cháy · ngủ TP. Cao Bằng',
        mapTripId: 'sen-2n1d-a',
        mapTripDayMap: [1, 2],
        itinerary: [
          {
            dayNumber: 1,
            dayTitle: 'Bản Giốc – Ngườm Ngao – Đồi Cỏ Cháy',
            mapStops: [MAP_PLACES.banGioc, MAP_PLACES.nguomNgao, MAP_PLACES.doiCoChay],
            activities: [
              ACT_ARRIVE,
              ACT_BREAKFAST_CITY,
              ACT_GET_BIKE,
              { time: '07:30', title: 'Khởi hành đi Bản Giốc', desc: 'Cung 85km uốn qua đèo Mã Phục — đường đẹp, cứ thong thả mà chạy.' },
              ACT_BAN_GIOC('09:30'),
              ACT_NGUOM_NGAO('11:30'),
              {
                time: '13:00', title: 'Ăn trưa', desc: 'Dùng bữa gần thác trước khi chạy tiếp.',
                type: 'food',
                options: [
                  { name: 'Nhà hàng Thác Bản Giốc', price: '~120.000–180.000đ/người', meta: 'Ngay khu du lịch', reason: 'Cá suối, lợn đen, rau rừng — đặc sản đủ món.', recommended: true },
                ],
              },
              ACT_NGUOM_BANG('13:30', ['Thời lượng: 20–30 phút', 'Góc chụp: cửa hang nhìn thung lũng', 'Gửi xe ven đường']),
              ACT_DOI_CO_CHAY('14:30', '16:00–17:30', '~2 giờ', true),
              { time: '17:00', title: 'Quay về thành phố Cao Bằng', desc: 'Kết ngày đầu — về Sen\'s nghỉ ngơi, chuẩn bị cho buổi tối.' },
              ACT_DINNER_YEN,
              ACT_REST_SEN,
            ],
          },
          {
            dayNumber: 2,
            dayTitle: 'Pác Bó – Bản Giàng – Thang Hen – Mắt Thần',
            mapStops: [MAP_PLACES.pacBo, MAP_PLACES.banGiang, MAP_PLACES.thangHen, MAP_PLACES.matThan],
            activities: [
              ACT_BREAKFAST_CITY,
              { time: '07:30', title: 'Khởi hành đi Pác Bó', desc: 'Chạy dọc biên giới hướng Hà Quảng — khoảng 9h là tới.' },
              ACT_PAC_BO('09:00'),
              ACT_BAN_GIANG,
              ACT_LUNCH_HA_QUANG,
              ACT_THANG_HEN('13:30', '13:30–15:00', '~1,5 giờ'),
              ACT_MAT_THAN('15:30', '16–18h (hoàng hôn)'),
              { time: '17:00', title: 'Quay về thành phố Cao Bằng', desc: 'Trả xe máy, mua ít đặc sản mang về.' },
              ACT_DINNER_LAU_CA,
              ACT_BUS_HOME,
            ],
          },
        ],
      },
      {
        key: 'b',
        label: 'Lộ trình 2 — đêm làng đá',
        sub: 'Pỉ Pha & Bản Giốc · ngủ trong làng đá Khuổi Ky',
        mapTripId: 'sen-2n1d-b',
        mapTripDayMap: [1, 2],
        itinerary: [
          {
            dayNumber: 1,
            dayTitle: 'Pỉ Pha – Bản Giốc – Làng đá (ngủ bản)',
            mapStops: [MAP_PLACES.piPha, MAP_PLACES.phatTich, MAP_PLACES.banGioc, MAP_PLACES.khuoiKy, MAP_PLACES.nguomNgao],
            activities: [
              { time: '06:00', title: 'Đến Cao Bằng', desc: 'Xe đón bạn về homestay nghỉ ngơi, vệ sinh cá nhân và chuẩn bị nhận xe.' },
              ACT_BREAKFAST_CITY,
              ACT_GET_BIKE,
              { time: '07:30', title: 'Khởi hành đi Trùng Khánh', desc: 'Cung 85km qua đèo Mã Phục — vừa chạy vừa ngắm là ~2 tiếng.' },
              ACT_PI_PHA('09:30', ['Thời lượng: ~1 giờ', 'Leo núi: ~30 phút', 'Góc chụp: các điểm check-in trên đỉnh']),
              { ...ACT_PHAT_TICH('10:45', '~30 phút'), desc: 'Ghé nếu kịp giờ — đứng sân chùa nhìn xuống trọn Thác Bản Giốc.' },
              {
                ...ACT_BAN_GIOC('11:30'),
                chips: ['Thời lượng: ~1,5 giờ', 'Bè tre: tuỳ chọn', 'Góc chụp: quảng trường & cầu đi bộ', 'Có bãi gửi xe'],
                tip: undefined,
              },
              {
                time: '13:00', title: 'Ăn trưa khu Bản Giốc', desc: 'Ăn xong là về làng đá nhận phòng luôn.',
                type: 'food',
                options: [
                  { name: 'Yến Nhi Homestay (làng đá)', meta: 'Ăn trưa + nhận phòng luôn', reason: 'Tiện một công đôi việc — ăn xong nghỉ trưa tại chỗ.', recommended: true },
                  { name: 'Nhà hàng gần thác', price: '~120.000–180.000đ/người', reason: 'Đặc sản đủ món ngay khu du lịch.' },
                ],
              },
              {
                time: '14:00', title: 'Nhận phòng & dạo Làng đá Khuổi Ky', desc: 'Bản đá 400 năm tuổi của người Tày — check-in cầu đá, đi chân trần nghe suối chảy.',
                type: 'sight',
                image: 'images/places/stone-village.jpg',
                chips: ['Nhà sàn đá 400+ năm', 'Góc chụp: cầu đá qua suối'],
              },
              ACT_NGUOM_NGAO('15:30'),
              {
                time: '18:30', title: 'Ăn tối tại homestay làng đá', desc: 'Cơm bản địa trong không gian bản đá cổ.',
                type: 'food',
                options: [
                  { name: 'Bữa tối tại homestay', reason: 'Đặc sản địa phương, không phải chạy xe buổi tối.', recommended: true },
                ],
              },
              { time: '21:00', title: 'Nghỉ đêm tại làng đá Khuổi Ky', desc: 'Đêm giữa bản đá cổ — chỉ còn tiếng suối và trời sao.' },
            ],
          },
          {
            dayNumber: 2,
            dayTitle: 'Ngườm Bàng – Đồi Cỏ Cháy – Mắt Thần – Thang Hen',
            mapStops: [MAP_PLACES.doiCoChay, MAP_PLACES.matThan, MAP_PLACES.thangHen],
            activities: [
              {
                time: '07:00', title: 'Ăn sáng tại homestay', desc: 'Ăn tại chỗ cho gọn, chuẩn bị check-out.',
                type: 'food',
                options: [
                  { name: 'Bữa sáng tại homestay', reason: 'Tiện, tiết kiệm thời gian cho cả ngày dài.', recommended: true, image: 'images/Food/breakfast.jpg' },
                ],
              },
              { time: '08:00', title: 'Check-out & khởi hành', desc: 'Rời làng đá, chạy hướng Quảng Hoà – Trà Lĩnh.' },
              ACT_NGUOM_BANG('08:30', ['Đẹp nhất: 8–10h', 'Thời lượng: ~30 phút', 'Có bãi gửi xe', 'Không cần trekking']),
              ACT_DOI_CO_CHAY('09:30', '8–11h', '~1,5 giờ'),
              {
                time: '11:30', title: 'Ăn trưa', desc: 'Nghỉ chân trước chặng chiều.',
                type: 'food',
                options: [
                  { name: 'Mế Farmstay', price: '~100.000–180.000đ/người', meta: 'Thuận đường đến Mắt Thần', reason: 'Không gian đẹp, món địa phương.', recommended: true },
                  { name: 'Quán cơm Quảng Hoà', reason: 'Phục vụ nhanh, giá hợp lý.' },
                ],
              },
              ACT_MAT_THAN('13:30', '14:00–16:30'),
              ACT_THANG_HEN('15:30', '15:30–17:00', '~1 giờ'),
              { time: '17:00', title: 'Về thành phố Cao Bằng', desc: 'Trả xe máy, tắm nóng ở Sen\'s cho tỉnh người.' },
              { time: '18:00', title: 'Ăn tối trước giờ xe chạy', desc: 'Còn thời gian thì làm bữa tối ở thành phố — Yến Ngon Như Mẹ Nấu hoặc Lẩu Cá Ngã Ba Sông.' },
              ACT_BUS_HOME,
            ],
          },
        ],
      },
    ],
  },
  {
    id: '3n2d',
    name: '3 Ngày 2 Đêm',
    tagline: 'Đồi Cỏ Cháy, Bản Giốc, Thang Hen, Pác Bó trong 3 ngày',
    featured: true,
    price: '2.850.000đ',
    priceNote: '/2 khách',
    days: 3,
    spots: 12,
    published: true,
    image: 'images/places/eye-mountain.jpg',
    highlights: [
      { name: 'Núi Mắt Thần', image: 'images/places/eye-mountain.jpg' },
      { name: 'Đồi Cỏ Cháy', image: 'images/places/ba-quang.jpg' },
      { name: 'Thác Bản Giốc', image: 'images/places/ban-gioc.jpg' },
      { name: 'Động Ngườm Ngao', image: 'images/places/nguom-ngao.jpg' },
      { name: 'Pỉ Pha Viewpoint', image: 'images/places/pi-pha-viewpoint.jpg' },
      { name: 'Hồ Thang Hen', image: 'images/places/thang-hen.jpg' },
      { name: 'Pác Bó', image: 'images/places/pac-bo.jpg' },
    ],
    busInfo: {
      title: 'Xe cabin VIP khứ hồi Hà Nội ⇆ Cao Bằng',
      desc: 'Xe cabin VIP khứ hồi cho 2 khách, đưa đón tận nơi. Nhà xe: Khánh Hoàn, Hiệp Giang, Lâm Hiệu.',
      details: [
        'Xuất phát 20h30–21h từ bến xe Mỹ Đình / Giáp Bát (Hà Nội).',
        'Cabin nằm riêng, có chăn gối sạch, dễ ngủ cả đêm.',
        'Khoảng 4h30 tới Cao Bằng, xe đưa thẳng về homestay.',
        'Muốn đổi cabin VIP giường đôi/đơn thì xem mục tuỳ chọn xe.'
      ],
      image: 'images/services/bus-tickets.jpg'
    },
    motorbikeInfo: {
      title: 'Xe máy Honda Wave Alpha sử dụng 72 giờ',
      desc: 'Honda Wave Alpha đầy xăng, leo dốc ổn — đủ chủ động cho 3 ngày.',
      details: [
        'Nhận xe tại Sen\'s Homestay, đã đổ đầy bình xăng.',
        'Kèm: mũ bảo hiểm 2/3, giá đỡ điện thoại, áo mưa tiện lợi, dây buộc đồ.',
        'Sử dụng trọn 72 giờ cho cả hành trình.',
        'Nâng cấp xe ga Vision/Future chỉ +70.000đ/ngày.'
      ],
      image: 'images/bikes/wave-alpha.jpg'
    },
    homestayInfo: {
      title: '01 đêm tại Sen\'s Homestay',
      desc: 'Đêm đầu nghỉ ở Sen\'s Homestay: phòng riêng, tắm nóng, đệm sưởi, ngủ lại sức.',
      details: [
        'Phòng riêng: điều hoà, WC khép kín, nóng lạnh, đệm sưởi.',
        'Máy chiếu xem Netflix ngay trong phòng.',
        '3 phòng đôi 1 giường lớn & 3 phòng gia đình 2 giường lớn.',
        'Ăn sáng tại homestay có phụ phí (không bao gồm trong giá combo).'
      ],
      image: 'images/homestay.jpg'
    },
    extraStayInfo: {
      tabLabel: 'Đêm làng đá',
      tabSub: 'Ngủ giữa bản đá cổ',
      title: 'Đêm thứ 2 ở làng đá Khuổi Ky',
      desc: 'Điểm riêng của combo 3N2Đ: một đêm trong bản đá 400 năm tuổi cạnh dòng Quây Sơn — chiều tắm suối, tối nghe tiếng nước chảy.',
      details: [
        'Nghỉ tại homestay trong làng đá Khuổi Ky (Yến Nhi Homestay).',
        'Chiều thư giãn ở sông Quây Sơn, ngắm hoàng hôn Cầu Pác Sắc Ngà.',
        'Chọn lộ trình 2: đêm nghỉ tại Thàng Khám — tắm suối ngay trước homestay.',
        'Bữa tối đặc sản tại homestay ~150.000–250.000đ/người (tự chọn, trả tại chỗ).'
      ],
      image: 'images/places/stone-village.jpg'
    },
    night1Info: {
      title: 'Check-in sớm sau xe đêm',
      desc: 'Xe đêm đến Cao Bằng ~4h30 sáng. Bạn về homestay nhận phòng sớm, ngủ bù rồi hãy bắt đầu ngày đầu tiên.',
      details: [
        '~4h30: Xe đến Cao Bằng, trung chuyển đưa bạn về homestay.',
        'Nhận phòng sớm, ngủ thêm cho lại sức sau chuyến xe giường nằm.',
        'Tắm nước nóng, sắp xếp lại hành lý gọn nhẹ cho hành trình xe máy.',
        'Ăn sáng xong nhận xe, khởi hành khi trời vừa đẹp nắng.'
      ],
      image: 'images/services/checkin-room.jpg'
    },
    showerInfo: {
      title: 'Tắm nóng trước khi về Hà Nội',
      desc: 'Ngày cuối về thành phố, bạn không cần lên xe đêm với bụi đường. Ghé tắm nóng, thay đồ sạch rồi đi.',
      details: [
        'Tắm nóng miễn phí trước giờ xe chạy.',
        'Khăn sạch chuẩn bị sẵn, có chỗ thay đồ.',
        'Gửi hành lý trong ngày cuối — về tắm xong nhận lại, thay bộ đồ sạch.',
        'Thảnh thơi ăn tối rồi lên xe 20h30 — ngủ một giấc thẳng tới Hà Nội.'
      ],
      image: 'images/services/shower.jpg'
    },
    itineraryOptions: [
      {
        key: 'a',
        label: 'Lộ trình 1 — đêm làng đá',
        sub: 'Quây Sơn & Đồi Cỏ Cháy · ngủ Yến Nhi (Khuổi Ky)',
        mapTripId: 'sen-3n2d-a',
        mapTripDayMap: [1, 2, 3],
        itinerary: [
          {
            dayNumber: 1,
            dayTitle: 'Pác Bó – Lũng Luông – Thang Hen – Mắt Thần',
            mapStops: [MAP_PLACES.pacBo, MAP_PLACES.lungLuong, MAP_PLACES.banGiang, MAP_PLACES.thangHen, MAP_PLACES.matThan],
            activities: [
              { time: '06:00', title: 'Đến Cao Bằng', desc: 'Xe đón bạn về homestay nghỉ ngơi, vệ sinh cá nhân và chuẩn bị nhận xe.' },
              ACT_BREAKFAST_CITY,
              ACT_GET_BIKE,
              { time: '07:30', title: 'Khởi hành đi Pác Bó', desc: 'Chạy dọc biên giới hướng Hà Quảng — khoảng 8h30 là tới.' },
              ACT_PAC_BO('08:30'),
              {
                time: '10:30', title: 'Ngắm thung lũng Lũng Luông', desc: 'Điểm ngắm thung lũng từ trên cao được ghi dấu trong Công viên địa chất UNESCO.',
                type: 'sight',
                image: 'images/places/lung-luong.jpg',
                chips: ['Thời lượng: ~30 phút', 'Góc chụp: từ trên cao', 'Đẹp nhất: sáng có nắng'],
              },
              ACT_BAN_GIANG,
              ACT_LUNCH_HA_QUANG,
              ACT_THANG_HEN('13:30', '13:30–15:00', '~1,5 giờ'),
              ACT_MAT_THAN('15:30', '16–18h (hoàng hôn)'),
              { time: '17:00', title: 'Quay về thành phố Cao Bằng', desc: 'Về Sen\'s nghỉ ngơi sau ngày đầu chạy cung Tây.' },
              ACT_DINNER_LAU_CA,
              ACT_REST_SEN,
            ],
          },
          {
            dayNumber: 2,
            dayTitle: 'Làng giấy – Đồi Cỏ Cháy – Ngườm Ngao – Quây Sơn',
            mapStops: [MAP_PLACES.langGiay, MAP_PLACES.doiCoChay, MAP_PLACES.khuoiKy, MAP_PLACES.nguomNgao, MAP_PLACES.quaySon],
            activities: [
              ACT_BREAKFAST_CITY,
              {
                time: '07:30', title: 'Tham quan Làng giấy Dìa Trên', desc: 'Làng nghề giấy bản yên bình dưới chân núi — đường làng, ruộng lúa, nhà truyền thống.',
                type: 'sight',
                image: 'images/places/dia-tren-village-paper.jpg',
                chips: ['Thời lượng: ~45 phút', 'Góc chụp: đường làng, ruộng lúa'],
              },
              ACT_DOI_CO_CHAY('08:30', '6–11h', '~1,5 giờ'),
              {
                time: '11:30', title: 'Ăn trưa tại Yến Nhi Homestay', desc: 'Về làng đá ăn trưa rồi nhận phòng nghỉ luôn.',
                type: 'food',
                options: [
                  { name: 'Yến Nhi Homestay', price: '~120.000–180.000đ/người', meta: 'Ngay nơi lưu trú', reason: 'Món địa phương, ăn xong nghỉ trưa tại chỗ.', recommended: true },
                ],
              },
              { time: '12:30', title: 'Nhận phòng Yến Nhi Homestay', desc: 'Homestay trong làng đá Khuổi Ky — nghỉ trưa, thư giãn trước chặng chiều.' },
              ACT_NGUOM_NGAO('14:30'),
              {
                time: '16:00', title: 'Thư giãn ở Sông Quây Sơn', desc: 'Dòng sông xanh ngọc của Trùng Khánh — ngâm chân, tắm suối hoặc ngồi ngắm núi.',
                type: 'sight',
                image: 'images/places/swimming-quay-son-river.jpg',
                chips: ['Đẹp nhất: 16–18h', 'Thời lượng: ~1,5–2 giờ', 'Ngâm chân, tắm suối'],
                tip: 'Mùa mưa nước chảy mạnh — theo hướng dẫn an toàn.',
              },
              {
                time: '17:30', title: 'Hoàng hôn ở Cầu Pác Sắc Ngà', desc: 'Đứng cầu treo ngắm hoàng hôn rơi trên dòng Quây Sơn — kiểu ảnh chốt ngày.',
                type: 'sight',
                image: 'images/places/pac-nga-hanging-bridge.jpg',
                chips: ['Thời lượng: ~30 phút'],
              },
              {
                time: '19:00', title: 'Ăn tối tại homestay', desc: 'Bữa tối giữa làng đá cổ.',
                type: 'food',
                options: [
                  { name: 'Bữa tối tại Yến Nhi Homestay', price: '~150.000–250.000đ/người', reason: 'Thực đơn đặc sản trong không gian bản đá yên bình.', recommended: true },
                ],
              },
              { time: '21:00', title: 'Nghỉ đêm giữa làng đá Khuổi Ky', desc: 'Đêm trong bản đá 400 năm — chỉ còn tiếng suối và trời sao.' },
            ],
          },
          {
            dayNumber: 3,
            dayTitle: 'Chùa Phật Tích – Bản Giốc – Pỉ Pha',
            mapStops: [MAP_PLACES.phatTich, MAP_PLACES.banGioc, MAP_PLACES.piPha],
            activities: [
              {
                time: '07:00', title: 'Ăn sáng tại homestay', desc: 'Ăn tại chỗ rồi lên đường sớm.',
                type: 'food',
                options: [
                  { name: 'Bữa sáng tại Yến Nhi Homestay', reason: 'Tiện và tiết kiệm thời gian cho ngày cuối.', recommended: true, image: 'images/Food/breakfast.jpg' },
                ],
              },
              ACT_PHAT_TICH('08:00', '~1 giờ'),
              {
                ...ACT_BAN_GIOC('09:30'),
                chips: ['Đẹp nhất: 9–11h', 'Thời lượng: ~2 giờ', 'Bè tre ra gần chân thác', 'Có bãi gửi xe'],
                tip: 'Thời tiết đẹp thì mua vé đi bè — đứng gần chân thác mới thấy đã.',
              },
              {
                time: '12:00', title: 'Ăn trưa', desc: 'Đặc sản gần khu du lịch thác.',
                type: 'food',
                options: [
                  { name: 'Nhà hàng Thác Bản Giốc', price: '~120.000–180.000đ/người', reason: 'Cá suối, gà đồi, lợn đen, rau rừng.', recommended: true },
                ],
              },
              ACT_PI_PHA('14:00', ['Đẹp nhất: 15:00–17:30', 'Thời lượng: ~2 giờ', 'Có quán đồ uống', 'Có bãi gửi xe']),
              { time: '16:30', title: 'Quay về thành phố Cao Bằng', desc: 'Trả xe máy, tắm nóng ở Sen\'s, nhận lại hành lý.' },
              ACT_DINNER_YEN,
              { ...ACT_BUS_HOME, title: 'Đợi xe tại Sen\'s Homestay', desc: 'Xe đón 20h30–21h ngay tại homestay — ngủ một giấc là về tới Hà Nội ~4h30.' },
            ],
          },
        ],
      },
      {
        key: 'b',
        label: 'Lộ trình 2 — đêm Thàng Khám',
        sub: 'Tắm suối Thàng Khám · trải nghiệm Nùng Indigo',
        mapTripId: 'sen-3n2d-b',
        mapTripDayMap: [1, 2, 3],
        itinerary: [
          {
            dayNumber: 1,
            dayTitle: 'Pác Bó – Lũng Luông – Thang Hen – Mắt Thần',
            mapStops: [MAP_PLACES.pacBo, MAP_PLACES.lungLuong, MAP_PLACES.banGiang, MAP_PLACES.thangHen, MAP_PLACES.matThan],
            activities: [
              { time: '06:00', title: 'Đến Cao Bằng', desc: 'Xe đón bạn về homestay nghỉ ngơi, vệ sinh cá nhân và chuẩn bị nhận xe.' },
              ACT_BREAKFAST_CITY,
              ACT_GET_BIKE,
              { time: '07:30', title: 'Khởi hành đi Pác Bó', desc: 'Chạy dọc biên giới hướng Hà Quảng — khoảng 8h30 là tới.' },
              ACT_PAC_BO('08:30'),
              {
                time: '10:30', title: 'Ngắm thung lũng Lũng Luông', desc: 'Điểm ngắm thung lũng từ trên cao được ghi dấu trong Công viên địa chất UNESCO.',
                type: 'sight',
                image: 'images/places/lung-luong.jpg',
                chips: ['Thời lượng: ~30 phút', 'Góc chụp: từ trên cao', 'Đẹp nhất: sáng có nắng'],
              },
              ACT_BAN_GIANG,
              ACT_LUNCH_HA_QUANG,
              ACT_THANG_HEN('13:30', '13:30–15:00', '~1,5 giờ'),
              ACT_MAT_THAN('15:30', '16–18h (hoàng hôn)'),
              { time: '17:00', title: 'Quay về thành phố Cao Bằng', desc: 'Về Sen\'s nghỉ ngơi sau ngày đầu chạy cung Tây.' },
              ACT_DINNER_LAU_CA,
              ACT_REST_SEN,
            ],
          },
          {
            dayNumber: 2,
            dayTitle: 'Chùa Phật Tích – Bản Giốc – Ngườm Ngao – Thàng Khám',
            mapStops: [MAP_PLACES.phatTich, MAP_PLACES.banGioc, MAP_PLACES.nguomNgao, MAP_PLACES.thangKham],
            activities: [
              ACT_BREAKFAST_CITY,
              { time: '07:30', title: 'Khởi hành đi Trùng Khánh', desc: 'Cung 85km, chạy thong thả khoảng 2–2,5 tiếng.' },
              { ...ACT_PHAT_TICH('09:45', '30–45 phút') },
              {
                ...ACT_BAN_GIOC('10:30'),
                chips: ['Thời lượng: 1,5–2 giờ', 'Bè tre (nếu trời đẹp)', 'Góc chụp: quảng trường & cầu đi bộ', 'Có bãi gửi xe'],
                tip: undefined,
              },
              {
                time: '12:30', title: 'Ăn trưa khu Bản Giốc', desc: 'Món nên thử: cá suối, gà đồi, lợn đen, xôi trám.',
                type: 'food',
                options: [
                  { name: 'Yến Nhi Homestay', price: '~120.000–180.000đ/người', reason: 'Không gian làng đá, món bản địa.', recommended: true },
                  { name: 'Nhà hàng gần Thác Bản Giốc', price: '~120.000–180.000đ/người', reason: 'Ngay khu du lịch, đủ món đặc sản.' },
                ],
              },
              ACT_NGUOM_NGAO('14:00'),
              { time: '16:00', title: 'Nhận phòng tại Thàng Khám', desc: 'Check-in homestay bên thác Thàng Khám, nghỉ ngơi sau hành trình.' },
              {
                time: '16:30', title: 'Tắm suối Thàng Khám', desc: 'Thác và suối ngay trước homestay — tắm hoặc ngâm chân, thả lỏng giữa núi rừng.',
                type: 'sight',
                image: 'images/places/thang-kham.jpg',
                chips: ['Ngay trước homestay', 'Đẹp nhất: cuối chiều'],
              },
              { time: '18:30', title: 'Ăn tối tại Thàng Khám', desc: 'Bữa tối đặc sản địa phương, tối tự do thư giãn.' },
              { time: '21:00', title: 'Nghỉ đêm tại Thàng Khám', desc: 'Không khí trong lành, yên tĩnh — ngủ sớm cho ngày mai.' },
            ],
          },
          {
            dayNumber: 3,
            dayTitle: 'Đồi Cỏ Cháy – Nùng Indigo Workshop',
            mapStops: [MAP_PLACES.doiCoChay, MAP_PLACES.nungIndigo],
            activities: [
              { time: '07:30', title: 'Ăn sáng & check-out', desc: 'Ăn sáng tại Thàng Khám, dọn hành lý lên đường.' },
              { time: '09:00', title: 'Khởi hành đến Đồi Cỏ Cháy', desc: 'Chạy khoảng 15–20 phút sang Vinh Quý.' },
              ACT_DOI_CO_CHAY('09:20', '8–11h', '~2 giờ'),
              { time: '11:30', title: 'Di chuyển đến Nùng Indigo Workshop', desc: 'Rời đồi cỏ, chạy về hướng Quảng Uyên.' },
              {
                time: '12:00', title: 'Ăn trưa tại Nùng Indigo', desc: 'Bữa cơm địa phương trong không gian truyền thống người Nùng An.',
                type: 'food',
                options: [
                  { name: 'Cơm địa phương tại workshop', reason: 'Ăn tại chỗ, nghỉ ngơi trước khi vào trải nghiệm.', recommended: true },
                ],
              },
              {
                time: '13:00', title: 'Trải nghiệm Nùng Indigo Workshop', desc: 'Vẽ sáp ong bằng bút đồng, tự tay nhuộm chàm — mang sản phẩm về làm kỷ niệm.',
                type: 'sight',
                chips: ['Thời lượng: ~2,5–3 giờ', 'Có sản phẩm mang về', 'Giao lưu cùng nghệ nhân'],
              },
              { time: '16:00', title: 'Khởi hành về thành phố', desc: 'Khoảng 35km — chạy 50–60 phút là tới.' },
              { time: '17:00', title: 'Về Sen\'s Homestay', desc: 'Trả xe, tắm nóng, thay đồ sạch và nhận lại hành lý.' },
              { time: '18:30', title: 'Ăn tối', desc: 'Yến Ngon Như Mẹ Nấu hoặc Lẩu Cá Ngã Ba Sông — chốt hành trình bằng một bữa ra trò.' },
              { ...ACT_BUS_HOME, title: 'Đợi xe tại Sen\'s Homestay', desc: 'Xe đón 20h30–21h ngay tại homestay — ngủ một giấc là về tới Hà Nội ~4h30.' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '4n3d',
    name: '4 Ngày 3 Đêm',
    tagline: 'Khám phá sâu — đi chậm, thấy nhiều',
    price: 'Liên hệ',
    priceNote: 'giá tuỳ chỉnh theo nhóm',
    published: false,   // chưa phát hành — chờ nội dung combo 4N3Đ thật
    days: 4,
    spots: 14,
    image: 'images/places/khau-coc-cha.jpg',
    highlights: [
      { name: 'Tất cả điểm 3N2Đ', image: 'images/places/ban-gioc.jpg' },
      { name: 'Pác Bó', image: 'images/places/pac-bo.jpg' },
      { name: 'Phja Oắc', image: 'images/places/phia-oac.jpg' },
      { name: 'Đèo Khâu Cốc Chà', image: 'images/places/khau-coc-cha.jpg' },
      { name: 'Đồi chè Kolia', image: 'images/places/kolia-tea.jpg' },
      { name: 'Cầu treo Pác Ngà', image: 'images/places/pac-nga-hanging-bridge.jpg' },
    ],
    busInfo: {
      title: 'Xe cabin VIP khứ hồi Hà Nội ⇆ Cao Bằng',
      desc: 'Xe cabin VIP giường nằm khứ hồi, đưa đón tận nơi. Nhà xe: Khánh Hoàn, Hiệp Giang, Lâm Hiệu.',
      details: [
        'Xuất phát 20h30–21h từ bến xe Mỹ Đình / Giáp Bát (Hà Nội).',
        'Cabin nằm riêng, có chăn gối sạch, dễ ngủ cả đêm.',
        'Khoảng 4h30 tới Cao Bằng, xe đưa thẳng về homestay.',
        'Muốn đổi cabin VIP giường đôi/đơn thì xem mục tuỳ chọn xe.'
      ],
      image: 'images/services/bus-tickets.jpg'
    },
    motorbikeInfo: {
      title: 'Xe máy Honda Wave Alpha tự lái',
      desc: 'Honda Wave Alpha đầy xăng, leo đèo ổn — sẵn sàng cho Khâu Cốc Chà 15 tầng.',
      details: [
        'Nhận xe tại Sen\'s Homestay, đã đổ đầy bình xăng.',
        'Kèm: mũ bảo hiểm 2/3, giá đỡ điện thoại, áo mưa tiện lợi, dây buộc đồ.',
        'Bền bỉ leo dốc, phù hợp cung đường đèo dài của tour 4 ngày.',
        'Nâng cấp xe ga Vision/Future chỉ +70.000đ/ngày.'
      ],
      image: 'images/bikes/wave-alpha.jpg'
    },
    homestayInfo: {
      title: '3 đêm nghỉ ở homestay Cao Bằng',
      desc: 'Nghỉ tại Sen\'s Homestay và homestay bản địa dọc đường. Phòng riêng khép kín, đủ tiện nghi.',
      details: [
        'Phòng riêng: điều hoà, WC khép kín, nóng lạnh, đệm sưởi.',
        'Sen\'s Homestay có máy chiếu xem Netflix ngay trong phòng.',
        'Các đêm ở Bảo Lạc nghỉ nhà sàn gỗ cổ ấm áp ven suối.',
        'Ăn sáng tại homestay có phụ phí (không bao gồm trong giá combo).'
      ],
      image: 'images/homestay.jpg'
    },
    night1Info: {
      title: 'Check-in sớm sau xe đêm',
      desc: 'Đến Cao Bằng ~4h30 sáng, nhận phòng sớm để ngủ bù trước hành trình 4 ngày.',
      details: [
        '~4h30: Đến Cao Bằng, đưa bạn về homestay nhận phòng sớm.',
        'Ngủ thêm 1–2 tiếng cho lại sức sau chuyến xe giường nằm.',
        'Tắm nước nóng, vệ sinh cá nhân và thưởng thức cafe Cao Bằng đón ngày mới.',
        'Sẵn sàng rồi nhận xe máy, bắt đầu cung đường đầu tiên.'
      ],
      image: 'images/services/checkin-room.jpg'
    },
    showerInfo: {
      title: 'Tắm nóng trước khi về Hà Nội',
      desc: 'Ngày cuối về thành phố, bạn không cần lên xe đêm với bụi đường. Ghé tắm nóng, thay đồ sạch rồi đi.',
      details: [
        'Tắm nóng miễn phí trước giờ xe chạy.',
        'Khăn sạch chuẩn bị sẵn, có chỗ thay đồ.',
        'Gửi hành lý trong ngày cuối — về tắm xong nhận lại, thay bộ đồ sạch.',
        'Thảnh thơi ăn tối rồi lên xe 20h30 — ngủ một giấc thẳng tới Hà Nội.'
      ],
      image: 'images/services/shower.jpg'
    },
    // Nội dung 4N3Đ là placeholder (chưa phát hành) — giữ lịch cũ trong 1 lộ trình.
    itineraryOptions: [
      {
        key: 'a',
        label: 'Lịch trình',
        sub: '',
        itinerary: [
          {
            dayNumber: 1,
            dayTitle: 'Thác Bản Giốc & Động Ngườm Ngao',
            activities: [
              { time: '06:30', title: 'Ăn sáng đặc sản', desc: 'Phở vịt quay Cao Bằng nức tiếng.', image: 'images/Food/breakfast.jpg' },
              { time: '07:15', title: 'Nhận xe máy Honda Wave Alpha', desc: 'Đầy xăng, kèm mũ 2/3, giá đỡ điện thoại & áo mưa tiện lợi.', image: 'images/bikes/wave-alpha.jpg' },
              { time: '07:30', title: 'Chinh phục đèo Mã Phục & Khau Liêu', desc: '2 con đèo kỳ vĩ bậc nhất trên đường đi Bản Giốc.' },
              { time: '09:45', title: 'Thác Bản Giốc mùa nước đổ', desc: 'Góc chụp ảnh thác nước đẹp mê hồn từ dòng sông Quây Sơn.', image: 'images/places/ban-gioc.jpg' },
              { time: '11:45', title: 'Động Ngườm Ngao tráng lệ', desc: 'Khám phá thế giới thạch nhũ lung linh ngàn năm.', image: 'images/places/nguom-ngao.jpg' },
              { time: '13:00', title: 'Ăn trưa hạt dẻ nướng & đặc sản', desc: 'Cơm lam, vịt quay, canh rau cải nương.' },
              { time: '14:30', title: 'Cầu đá & Suối cổ Khuổi Ky', desc: 'Ngắm dòng suối chảy qua làng đá cổ.', image: 'images/places/stone-village.jpg' },
              { time: '17:00', title: 'Check-in Homestay Deluxe', desc: 'Nhận phòng ban công view suối tuyệt đẹp.' },
              { time: '19:00', title: 'Bữa tối lẩu gà rừng nấu lá giang', desc: 'Thưởng thức tại homestay ấm cúng.' },
              { time: '21:00', title: 'Nghỉ ngơi tại homestay', desc: 'Thư giãn trên ban công view suối, chìm vào giấc ngủ trong tiếng nước chảy.' }
            ]
          },
          {
            dayNumber: 2,
            dayTitle: 'Hồ Thang Hen & Thảo Nguyên Núi Mắt Thần',
            activities: [
              { time: '07:30', title: 'Ăn sáng tại homestay', desc: 'Bánh cuốn Cao Bằng nóng hổi.' },
              { time: '08:30', title: 'Khởi hành qua Trà Lĩnh', desc: 'Tuyến đường rừng xanh mát mát.' },
              { time: '10:00', title: 'Khám phá Quần thể 36 hồ Thang Hen', desc: 'Ghé hồ chính Thang Hen xanh ngắt giữa thung lũng đá.', image: 'images/places/thang-hen.jpg' },
              { time: '12:30', title: 'Cơm trưa dã ngoại thảo nguyên', desc: 'Ăn trưa dã ngoại do homestay chuẩn bị sẵn.' },
              { time: '14:00', title: 'Check-in Núi Mắt Thần huyền ảo', desc: 'Dựng lều nghỉ ngơi, chụp hình cùng lỗ thủng độc đáo xuyên núi.', image: 'images/places/eye-mountain.jpg' },
              { time: '17:30', title: 'Quay về Homestay Khuổi Ky', desc: 'Thư giãn ngâm chân lá thuốc Dao Đỏ.' },
              { time: '19:00', title: 'Bữa tiệc BBQ nướng mắc mật', desc: 'Thịt lợn đen, lạp sườn nướng than hoa sực nức hương vị.' },
              { time: '21:00', title: 'Nghỉ ngơi tại homestay', desc: 'Ngủ sớm lấy sức, ngày mai chinh phục cung đèo 15 tầng huyền thoại.' }
            ]
          },
          {
            dayNumber: 3,
            dayTitle: 'Đèo Khâu Cốc Chà 15 Tầng Dốc Hùng Vĩ',
            activities: [
              { time: '07:00', title: 'Check-out & Đi Bảo Lạc', desc: 'Khởi hành sớm chuẩn bị chinh phục cung đường huyền thoại.' },
              { time: '09:30', title: 'Chinh phục đèo Khâu Cốc Chà 15 tầng dốc', desc: 'Cung đường đèo dốc uốn khúc tráng lệ nhất Việt Nam, leo lên chòi ngắm cảnh ngắm toàn bộ đèo.', image: 'images/places/khau-coc-cha.jpg' },
              { time: '12:30', title: 'Ăn trưa tại Bảo Lạc', desc: 'Thịt khâu nhục, cá suối om dưa tại thị trấn Bảo Lạc.' },
              { time: '14:30', title: 'Ghé bản người Lô Lô Chải đen', desc: 'Tìm hiểu phong tục, nét kiến trúc nhà trình tường đặc sắc.' },
              { time: '17:30', title: 'Check-in Homestay tại Bảo Lạc', desc: 'Nhà sàn gỗ cổ ấm áp ven suối.' },
              { time: '19:00', title: 'Bữa tối ẩm thực Lô Lô', desc: 'Thưởng thức rượu ngô và cơm bản địa.' },
              { time: '21:00', title: 'Nghỉ ngơi tại homestay', desc: 'Đêm Bảo Lạc tĩnh lặng, chỉ còn tiếng suối và bếp lửa tí tách.' }
            ]
          },
          {
            dayNumber: 4,
            dayTitle: 'Suối Lê-nin, Pác Bó & Trở về',
            activities: [
              { time: '07:30', title: 'Ăn sáng & Đi Hà Quảng', desc: 'Khởi hành sớm quay lại Hà Quảng.' },
              { time: '10:00', title: 'Khu di tích Pác Bó lịch sử', desc: 'Đi bộ ven suối Lê-nin xanh màu ngọc bích, thăm hang Cốc Bó mát lạnh.', image: 'images/places/pac-bo.jpg' },
              { time: '12:30', title: 'Ăn trưa tại Tp. Cao Bằng', desc: 'Cơm gia đình Cao Bằng với khâu nhục và rau dớn rừng.' },
              { time: '14:30', title: 'Trả xe máy & mua sắm quà đặc sản', desc: 'Mua chè Lam, hạt dẻ sấy dẻo Cao Bằng.' },
              { time: '16:00', title: 'Cafe chill bên sông Bằng', desc: 'Thư giãn ngắm hoàng hôn đổ xuống thành phố Cao Bằng.' },
              { time: '18:00', title: 'Bữa tối nhẹ phở chua địa phương', desc: 'Kết thúc hành trình bằng ẩm thực tinh túy.' },
              { time: '20:30', title: 'Lên xe Limousine cabin VIP về Hà Nội', desc: 'Nằm ngủ êm ái trên cabin, xe trả khách tại Hà Nội lúc 04:30 sáng hôm sau.' }
            ]
          }
        ],
      },
    ],
  }
];

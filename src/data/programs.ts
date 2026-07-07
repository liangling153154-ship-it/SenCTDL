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

export interface DayItinerary {
  dayNumber: number;
  dayTitle: string;
  activities: Activity[];
}

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
  // Card nghỉ đặc biệt riêng của tour (VD: đêm Đồi Cỏ Cháy ở 3N2Đ) —
  // tour nào có field này mới hiện thêm tab thứ 5 trong "Dịch vụ trọn gói".
  extraStayInfo?: {
    tabLabel: string;  // tên tab
    tabSub: string;    // dòng phụ trên tab
    title: string;
    desc: string;
    details: string[];
    image: string;
  };

  itinerary: DayItinerary[];
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
      { name: 'Xe giường đơn có màn che', desc: 'Giường nằm đơn, màn che riêng tư — xuất phát 20h30–21h, tới Cao Bằng ~4h30 sáng.', surcharge: 'Đã bao gồm', recommended: true, image: 'images/vehicles/sleeper-single.jpg' },
      { name: 'Cabin VIP giường đôi', desc: 'Cabin nằm đôi rộng rãi, hợp đi cặp — ngủ êm cả đêm, sáng tới nơi.', surcharge: '+80.000đ/2 người', image: 'images/vehicles/cabin-vip-double.jpg' },
      { name: 'Cabin VIP nằm đơn', desc: 'Cabin đôi rộng rãi dùng riêng một mình — kín đáo và yên tĩnh nhất.', surcharge: '+50.000đ/người', image: 'images/vehicles/cabin-vip-single.jpg' },
    ],
  },
  {
    key: 'local',
    label: 'Di chuyển tại Cao Bằng',
    note: 'Xe máy tự lái suốt hành trình, nhận xe tại Sen\'s Homestay.',
    choices: [
      { name: 'Xe máy Honda Wave Alpha tự lái', desc: 'Đầy xăng, kèm mũ 2/3, giá đỡ điện thoại, áo mưa tiện lợi — tự do dừng chụp ảnh mọi lúc.', surcharge: 'Đã bao gồm', recommended: true, image: 'images/bikes/wave-alpha.jpg' },
      { name: 'Nâng cấp xe ga (Vision/Future)', desc: 'Xe tay ga nhẹ nhàng, hợp ai chưa quen xe số.', surcharge: '+70.000đ/ngày', image: 'images/bikes/vision.png' },
    ],
  },
];

export const programsData: ProgramDetails[] = [
  {
    id: '2n1d',
    name: '2 Ngày 1 Đêm',
    tagline: 'Khám phá Cao Bằng hot nhất — tiết kiệm, chủ động',
    price: '2.150.000đ',
    priceNote: '/2 khách',
    days: 2,
    spots: 6,
    published: true,
    image: 'images/places/ban-gioc.jpg',
    highlights: [
      { name: 'Thác Bản Giốc', image: 'images/places/ban-gioc.jpg' },
      { name: 'Động Ngườm Ngao', image: 'images/places/nguom-ngao.jpg' },
      { name: 'Làng đá Khuổi Ky', image: 'images/places/stone-village.jpg' },
      { name: 'Núi Mắt Thần', image: 'images/places/eye-mountain.jpg' },
      { name: 'Hồ Thang Hen', image: 'images/places/thang-hen.jpg' },
      { name: 'Pác Bó', image: 'images/places/pac-bo.jpg' },
    ],
    busInfo: {
      title: 'Xe giường nằm VIP khứ hồi Hà Nội ⇆ Cao Bằng',
      desc: 'Xe giường đơn có màn che khứ hồi, đưa đón tận Sen\'s Homestay. Nhà xe uy tín: Khánh Hoàn, Hiệp Giang.',
      details: [
        'Xuất phát 20h30–21h từ bến xe Mỹ Đình / Giáp Bát (Hà Nội).',
        'Giường nằm đơn có màn che riêng tư, chăn gối sạch sẽ.',
        'Tới Cao Bằng khoảng 4h30 sáng, đưa thẳng về Sen\'s Homestay.',
        'Nâng cấp cabin VIP giường đôi (+80.000đ/2 người) hoặc cabin đơn (+50.000đ/người).'
      ],
      image: 'images/services/bus-tickets.jpg'
    },
    motorbikeInfo: {
      title: 'Xe máy Honda Wave Alpha sử dụng 24 giờ',
      desc: 'Xe số Honda Wave Alpha đầy xăng, bền bỉ leo dốc — tự do khám phá mọi cung đường Cao Bằng.',
      details: [
        'Nhận xe ngay tại Sen\'s Homestay, đã đổ đầy bình xăng.',
        'Kèm: mũ bảo hiểm 2/3, giá đỡ điện thoại, áo mưa tiện lợi, dây buộc đồ.',
        'Sử dụng trọn 24 giờ, tự do dừng chụp ảnh mọi lúc.',
        'Nâng cấp xe ga Vision/Future chỉ +70.000đ/ngày.'
      ],
      image: 'images/bikes/wave-alpha.jpg'
    },
    homestayInfo: {
      title: '01 đêm phòng riêng tại Sen\'s Homestay',
      desc: 'Nghỉ tại Sen\'s Homestay ấm cúng — phòng đôi hoặc phòng gia đình khép kín tiện nghi.',
      details: [
        'Phòng riêng: điều hoà, WC khép kín, nóng lạnh, đệm sưởi.',
        'Máy chiếu xem Netflix ngay trong phòng.',
        '3 phòng đôi 1 giường lớn & 3 phòng gia đình 2 giường lớn.',
        'Ăn sáng tại homestay có phụ phí (không bao gồm trong giá combo).'
      ],
      image: 'images/homestay.jpg'
    },
    night1Info: {
      title: 'Check-in sớm: nghỉ ngơi sau chuyến xe đêm',
      desc: 'Đến Cao Bằng ~4h30 sáng, bạn được nhận phòng sớm tại Sen\'s Homestay — ngủ bù, tắm nước nóng, nạp đầy năng lượng trước khi bắt đầu hành trình.',
      details: [
        '~4h30: Xe đến Cao Bằng, đưa bạn thẳng về Sen\'s Homestay.',
        'Nhận phòng sớm, ngủ thêm 1–2 tiếng cho lại sức sau chuyến xe giường nằm.',
        'Tắm nước nóng, vệ sinh cá nhân, gửi hành lý cồng kềnh tại homestay.',
        'Tỉnh táo rồi thì ăn sáng đặc sản và nhận xe máy bắt đầu khám phá.'
      ],
      image: 'images/services/checkin-room.jpg'
    },
    showerInfo: {
      title: 'Tắm nước nóng trước khi lên xe về Hà Nội',
      desc: 'Ngày cuối chạy xe về thành phố, bạn không phải lên xe đêm trong bộ đồ đầy bụi đường — có nhà tắm nước nóng chờ sẵn, sạch sẽ thơm tho rồi mới lên xe.',
      details: [
        'Nhà tắm nước nóng sạch sẽ — dùng miễn phí trước giờ xe chạy.',
        'Khăn sạch chuẩn bị sẵn, có chỗ thay đồ.',
        'Gửi hành lý trong ngày cuối — về tắm xong nhận lại, thay bộ đồ sạch.',
        'Thảnh thơi ăn tối rồi lên xe 20h30 — ngủ một giấc thẳng tới Hà Nội.'
      ],
      image: 'images/services/shower.jpg'
    },
    itinerary: [
      {
        dayNumber: 1,
        dayTitle: 'Thác Bản Giốc & Làng Đá Cổ',
        activities: [
          { time: '06:30', title: 'Ăn sáng phở vịt quay Cao Bằng', desc: 'Phở vịt quay nóng hổi tại quán Lâm địa phương ngon nổi tiếng cạnh bến xe.', image: 'images/Food/breakfast.jpg' },
          { time: '07:15', title: 'Nhận xe máy & chuẩn bị hành trình', desc: 'Kiểm tra xe, nhận mũ bảo hiểm và bắt đầu đi Bản Giốc.', image: 'images/bikes/wave-alpha.jpg' },
          { time: '07:30', title: 'Khởi hành đi Bản Giốc', desc: 'Cung đường 85km uốn lượn tuyệt đẹp qua đèo Mã Phục.' },
          { time: '09:30', title: 'Check-in thác Bản Giốc', desc: 'Thác nước biên giới lớn nhất Đông Nam Á, góc chụp đẹp nhất lúc nắng sớm xiên.', image: 'images/places/ban-gioc.jpg' },
          { time: '11:00', title: 'Khám phá Động Ngườm Ngao', desc: 'Hang động kỳ vĩ dài hơn 2000m với các thạch nhũ hình bông sen vàng độc đáo.', image: 'images/places/nguom-ngao.jpg' },
          { time: '12:30', title: 'Ăn trưa đặc sản Trùng Khánh', desc: 'Cơm lam, gà đồi nướng thơm lừng tại nhà sàn ven suối.' },
          { time: '14:30', title: 'Thăm Làng đá cổ Khuổi Ky', desc: 'Bản làng của người Tày với những ngôi nhà sàn bằng đá vững chãi hơn 400 năm tuổi.', image: 'images/places/stone-village.jpg' },
          { time: '17:00', title: 'Nhận phòng Homestay & nghỉ ngơi', desc: 'Check-in phòng riêng tại homestay đá cổ, thư giãn nghe tiếng suối reo.' },
          { time: '19:00', title: 'Bữa tối ấm cúng bếp lửa', desc: 'Lẩu gà đen nấu nấm rừng, thịt gác bếp bản địa cùng rượu ngô men lá ngọt nhẹ.' },
          { time: '21:00', title: 'Nghỉ ngơi tại homestay', desc: 'Chìm vào giấc ngủ giữa núi rừng, tiếng suối Khuổi Ky rì rào ru đêm.' }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: 'Núi Mắt Thần & Trở về',
        activities: [
          { time: '07:30', title: 'Ăn sáng tại homestay', desc: 'Bánh cuốn Cao Bằng nước canh xương nóng hổi tự làm tại làng.' },
          { time: '08:30', title: 'Check-out & Khởi hành đi Núi Mắt Thần', desc: 'Đi dọc thung lũng Trà Lĩnh về núi Mắt Thần.' },
          { time: '10:00', title: 'Cắm trại thung lũng núi Mắt Thần', desc: 'Bãi cỏ xanh thảo nguyên bao la quanh ngọn núi có lỗ thủng xuyên tâm độc nhất vô nhị.', image: 'images/places/eye-mountain.jpg' },
          { time: '12:30', title: 'Ăn trưa dã ngoại', desc: 'Bữa trưa nhẹ dã ngoại giữa thung lũng cỏ xanh.' },
          { time: '14:30', title: 'Quay về Tp. Cao Bằng', desc: 'Đường về qua đèo Cao Bắc, ngắm núi rừng xanh ngát.' },
          { time: '17:30', title: 'Trả xe máy & mua sắm đặc sản', desc: 'Mua lạp sườn, hạt dẻ Trùng Khánh làm quà.' },
          { time: '19:00', title: 'Ăn tối nhẹ Tp. Cao Bằng', desc: 'Thưởng thức bánh áp chao hoặc phở chua Cao Bằng trước khi về.' },
          { time: '20:30', title: 'Lên xe Limousine về Hà Nội', desc: 'Cabin VIP đưa bạn chìm vào giấc ngủ sâu, kết thúc hành trình lúc 04:30 sáng hôm sau.' }
        ]
      }
    ]
  },
  {
    id: '3n2d',
    name: '3 Ngày 2 Đêm',
    tagline: 'Được yêu thích nhất — Đồi Cỏ Cháy, Bản Giốc, Thang Hen, Pác Bó',
    featured: true,
    price: '2.850.000đ',
    priceNote: '/2 khách',
    days: 3,
    spots: 10,
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
      desc: 'Xe cabin VIP khứ hồi cho 2 khách, đưa đón tận nơi. Nhà xe uy tín: Khánh Hoàn, Hiệp Giang, Lâm Hiệu.',
      details: [
        'Xuất phát 20h30–21h từ bến xe Mỹ Đình / Giáp Bát (Hà Nội).',
        'Cabin nằm riêng tư, chăn gối sạch sẽ, ngủ êm cả đêm.',
        'Tới Cao Bằng khoảng 4h30 sáng, đưa thẳng về homestay.',
        'Nâng cấp cabin VIP giường đôi/đơn tuỳ nhu cầu (xem mục tuỳ chọn xe).'
      ],
      image: 'images/services/bus-tickets.jpg'
    },
    motorbikeInfo: {
      title: 'Xe máy Honda Wave Alpha sử dụng 72 giờ',
      desc: 'Xe số Honda Wave Alpha đầy xăng, bền bỉ leo dốc — chủ động khám phá suốt 3 ngày.',
      details: [
        'Nhận xe tại Sen\'s Homestay, đã đổ đầy bình xăng.',
        'Kèm: mũ bảo hiểm 2/3, giá đỡ điện thoại, áo mưa tiện lợi, dây buộc đồ.',
        'Sử dụng trọn 72 giờ cho cả hành trình.',
        'Nâng cấp xe ga Vision/Future chỉ +70.000đ/ngày.'
      ],
      image: 'images/bikes/wave-alpha.jpg'
    },
    homestayInfo: {
      title: 'Đêm tại Sen\'s Homestay tiện nghi',
      desc: 'Một đêm của hành trình bạn nghỉ tại Sen\'s Homestay — phòng riêng khép kín, tắm nóng, đệm sưởi, ngủ sâu lấy sức.',
      details: [
        'Phòng riêng: điều hoà, WC khép kín, nóng lạnh, đệm sưởi.',
        'Máy chiếu xem Netflix ngay trong phòng.',
        '3 phòng đôi 1 giường lớn & 3 phòng gia đình 2 giường lớn.',
        'Ăn sáng tại homestay có phụ phí (không bao gồm trong giá combo).'
      ],
      image: 'images/homestay.jpg'
    },
    extraStayInfo: {
      tabLabel: 'Đêm Đồi Cỏ Cháy',
      tabSub: 'Ngủ giữa thảo nguyên',
      title: 'Đêm đặc biệt tại Đồi Cỏ Cháy',
      desc: 'Điểm khác biệt của combo 3N2Đ — một đêm nghỉ ngay giữa đồi cỏ: chiều ngắm hoàng hôn phủ vàng thảo nguyên, tối ngắm trời sao, sáng mở cửa là bình minh.',
      details: [
        'Chỗ nghỉ riêng tư giữa đồi cỏ — yên tĩnh tuyệt đối, gần gũi thiên nhiên.',
        'Hoàng hôn, trời sao và bình minh ngay trước chỗ ngủ — dậy sớm chụp ảnh không cần di chuyển.',
        'Đêm trên đồi se lạnh kể cả mùa hè — chăn ấm được chuẩn bị đầy đủ.',
        'Thời tiết xấu có phương án nghỉ thay thế — Sen xác nhận cụ thể khi chốt lịch.'
      ],
      image: 'images/places/ba-quang.jpg'
    },
    night1Info: {
      title: 'Check-in sớm: nghỉ ngơi sau chuyến xe đêm',
      desc: 'Xe đêm đến Cao Bằng ~4h30 sáng — bạn về thẳng homestay nhận phòng sớm, ngủ bù thoải mái rồi mới bắt đầu ngày khám phá đầu tiên.',
      details: [
        '~4h30: Xe đến Cao Bằng, trung chuyển đưa bạn về homestay.',
        'Nhận phòng sớm — ngủ thêm cho lại sức sau chuyến xe giường nằm.',
        'Tắm nước nóng, sắp xếp lại hành lý gọn nhẹ cho hành trình xe máy.',
        'Ăn sáng xong nhận xe, khởi hành khi trời vừa đẹp nắng.'
      ],
      image: 'images/services/checkin-room.jpg'
    },
    showerInfo: {
      title: 'Tắm nước nóng trước khi lên xe về Hà Nội',
      desc: 'Ngày cuối chạy xe về thành phố, bạn không phải lên xe đêm trong bộ đồ đầy bụi đường — có nhà tắm nước nóng chờ sẵn, sạch sẽ thơm tho rồi mới lên xe.',
      details: [
        'Nhà tắm nước nóng sạch sẽ — dùng miễn phí trước giờ xe chạy.',
        'Khăn sạch chuẩn bị sẵn, có chỗ thay đồ.',
        'Gửi hành lý trong ngày cuối — về tắm xong nhận lại, thay bộ đồ sạch.',
        'Thảnh thơi ăn tối rồi lên xe 20h30 — ngủ một giấc thẳng tới Hà Nội.'
      ],
      image: 'images/services/shower.jpg'
    },
    itinerary: [
      {
        dayNumber: 1,
        dayTitle: 'Thác Bản Giốc & Ngườm Ngao',
        activities: [
          { time: '06:00', title: 'Đến Cao Bằng', desc: 'Xe đón bạn tại bến về văn phòng nghỉ ngơi.' },
          {
            time: '06:30',
            title: 'Ăn sáng',
            desc: 'Hai lựa chọn ngon gần điểm nhận xe — chọn theo khẩu vị.',
            type: 'food',
            options: [
              { name: 'Phở vịt quay quán Lâm', price: '~40.000đ', meta: 'Cạnh bến xe · mở từ 6h', reason: 'Vịt quay da giòn, nước dùng đậm — món trứ danh Cao Bằng.', recommended: true, image: 'images/Food/breakfast.jpg' },
              { name: 'Bánh cuốn canh', price: '~30.000đ', meta: 'Gần chợ · ăn nhanh', reason: 'Nhẹ bụng, hợp nếu muốn xuất phát sớm đi Bản Giốc.', image: 'images/Food/banh-cuon/1.jpg' },
            ],
          },
          { time: '07:15', title: 'Nhận xe máy đầy xăng', desc: 'Honda Wave Alpha đã kiểm tra lốp, phanh kỹ càng, kèm mũ 2/3, giá đỡ điện thoại & áo mưa.', image: 'images/bikes/wave-alpha.jpg' },
          { time: '07:30', title: 'Khởi hành đi Bản Giốc', desc: 'Hành trình 85km đi dọc theo đèo Mã Phục trùng điệp.' },
          {
            time: '09:30',
            title: 'Khám phá thác Bản Giốc',
            desc: 'Thác nước biên giới lớn nhất Đông Nam Á — điểm nhấn của cả hành trình.',
            type: 'sight',
            image: 'images/places/ban-gioc.jpg',
            chips: ['Đẹp nhất: 8–10h sáng', 'Thời lượng: ~2 giờ', 'Góc chụp: bè tre trên sông', 'Có bãi gửi xe'],
            tip: 'Nếu trời mưa: đảo lịch xuống chiều, sáng ghé Động Ngườm Ngao trước.',
          },
          { time: '11:00', title: 'Thăm động Ngườm Ngao', desc: 'Chiêm ngưỡng hệ thống thạch nhũ vàng óng và suối ngầm kỳ thú.', image: 'images/places/nguom-ngao.jpg' },
          {
            time: '12:00',
            title: 'Ăn trưa',
            desc: 'Đặc sản Trùng Khánh gần Bản Giốc.',
            type: 'food',
            options: [
              { name: 'Nhà sàn ven suối Khuổi Ky', price: '~150.000đ/người', meta: 'Không gian mát · yên tĩnh', reason: 'Cơm lam, lợn mán quay, rau dạ hiến — đúng vị bản địa.', recommended: true },
              { name: 'Quán ăn thị trấn Trùng Khánh', price: '~120.000đ/người', meta: 'Tiện đường · phục vụ nhanh', reason: 'Hợp nếu muốn tiết kiệm thời gian cho buổi chiều.' },
            ],
          },
          { time: '14:00', title: 'Làng đá cổ Khuổi Ky', desc: 'Ngắm những nếp nhà sàn đá Tày, check-in cây cầu đá bắc qua suối.', image: 'images/places/stone-village.jpg' },
          { time: '17:00', title: 'Check-in Homestay nghỉ ngơi', desc: 'Nhận phòng Suite view núi thơ mộng.' },
          { time: '19:00', title: 'Ăn tối lẩu gà đen', desc: 'Lẩu gà đen nấm rừng nghi ngút khói bên hiên nhà sàn.' },
          { time: '21:00', title: 'Nghỉ ngơi tại homestay', desc: 'Nhâm nhi chén trà nóng bên hiên nhà sàn, ngắm trời đêm đầy sao rồi ngủ sớm lấy sức.' }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: 'Hồ Thang Hen & Núi Mắt Thần',
        activities: [
          { time: '07:30', title: 'Ăn sáng tại homestay', desc: 'Bánh cuốn canh xương ngọt thanh rắc hành phi thơm.' },
          { time: '08:30', title: 'Khám phá Quần thể hồ Thang Hen', desc: 'Đi dọc tuyến đường thung lũng Trà Lĩnh xanh mướt đến cụm 36 hồ Thang Hen.', image: 'images/places/thang-hen.jpg' },
          { time: '10:30', title: 'Dạo thuyền hồ Thang Hen', desc: 'Hồ nước ngọt trong xanh như ngọc bích nằm giữa lòng núi đá vôi.' },
          { time: '12:00', title: 'Ăn trưa ẩm thực hồ', desc: 'Cá suối chiên giòn, xôi nếp nương thơm dẻo.' },
          { time: '14:00', title: 'Khám phá thảo nguyên núi Mắt Thần', desc: 'Tự do chạy xe máy trên bãi cỏ mênh mông, ngắm trâu bò gặm cỏ thanh bình dưới chân núi Thủng.', image: 'images/places/eye-mountain.jpg' },
          { time: '17:30', title: 'Trở về homestay Khuổi Ky', desc: 'Nghỉ ngơi sau ngày chạy xe máy dài.' },
          { time: '19:00', title: 'Ăn tối thịt nướng bản dã', desc: 'Thịt ba chỉ nướng lá mắc mật, lạp sườn nướng than hoa.' },
          { time: '21:00', title: 'Nghỉ ngơi tại homestay', desc: 'Đêm thứ hai ở bản đá — quen hơi núi rừng, giấc ngủ đến nhanh và sâu hơn.' }
        ]
      },
      {
        dayNumber: 3,
        dayTitle: 'Suối Lê-nin, Pác Bó & Quay về',
        activities: [
          { time: '07:30', title: 'Ăn sáng & Check-out', desc: 'Thưởng thức xôi ngũ sắc và cafe nóng trước khi trả phòng.' },
          { time: '08:30', title: 'Khởi hành đi Khu di tích Pác Bó', desc: 'Tuyến đường đi Pác Bó qua các bản làng thanh bình dọc biên giới.' },
          { time: '10:30', title: 'Thăm suối Lê-nin, hang Cốc Bó', desc: 'Nước suối Lê-nin xanh vắt nhìn thấu đáy, hang đá Bác Hồ từng sống và làm việc.', image: 'images/places/pac-bo.jpg' },
          { time: '12:30', title: 'Ăn trưa tại Pác Bó', desc: 'Thưởng thức măng rừng luộc, cá suối nướng tại lán ven suối.' },
          { time: '14:30', title: 'Quay về Tp. Cao Bằng', desc: 'Đường về rực rỡ nắng chiều.' },
          { time: '16:30', title: 'Trả xe máy & mua sắm quà lưu niệm', desc: 'Mua miến dong phia oắc, hạt dẻ chín Trùng Khánh.' },
          { time: '18:00', title: 'Bữa tối kết thúc hành trình', desc: 'Phở chua Cao Bằng nức tiếng.' },
          { time: '20:30', title: 'Lên xe Limousine cabin về lại Hà Nội', desc: 'Ngủ một giấc ngon lành trên cabin VIP và thức dậy tại Hà Nội lúc 04:30.' }
        ]
      }
    ]
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
      desc: 'Xe cabin VIP giường nằm khứ hồi, đưa đón tận nơi. Nhà xe uy tín: Khánh Hoàn, Hiệp Giang, Lâm Hiệu.',
      details: [
        'Xuất phát 20h30–21h từ bến xe Mỹ Đình / Giáp Bát (Hà Nội).',
        'Cabin nằm riêng tư, chăn gối sạch sẽ, ngủ êm cả đêm.',
        'Tới Cao Bằng khoảng 4h30 sáng, đưa thẳng về homestay.',
        'Nâng cấp cabin VIP giường đôi/đơn tuỳ nhu cầu (xem mục tuỳ chọn xe).'
      ],
      image: 'images/services/bus-tickets.jpg'
    },
    motorbikeInfo: {
      title: 'Xe máy Honda Wave Alpha tự lái',
      desc: 'Xe số Honda Wave Alpha đầy xăng, bền bỉ leo đèo dốc — sẵn sàng chinh phục Khâu Cốc Chà 15 tầng.',
      details: [
        'Nhận xe tại Sen\'s Homestay, đã đổ đầy bình xăng.',
        'Kèm: mũ bảo hiểm 2/3, giá đỡ điện thoại, áo mưa tiện lợi, dây buộc đồ.',
        'Bền bỉ leo dốc, phù hợp cung đường đèo dài của tour 4 ngày.',
        'Nâng cấp xe ga Vision/Future chỉ +70.000đ/ngày.'
      ],
      image: 'images/bikes/wave-alpha.jpg'
    },
    homestayInfo: {
      title: '3 đêm nghỉ tại homestay Cao Bằng',
      desc: 'Nghỉ tại Sen\'s Homestay và các homestay bản địa dọc hành trình — phòng riêng khép kín tiện nghi.',
      details: [
        'Phòng riêng: điều hoà, WC khép kín, nóng lạnh, đệm sưởi.',
        'Sen\'s Homestay có máy chiếu xem Netflix ngay trong phòng.',
        'Các đêm ở Bảo Lạc nghỉ nhà sàn gỗ cổ ấm áp ven suối.',
        'Ăn sáng tại homestay có phụ phí (không bao gồm trong giá combo).'
      ],
      image: 'images/homestay.jpg'
    },
    night1Info: {
      title: 'Check-in sớm: nghỉ ngơi sau chuyến xe đêm',
      desc: 'Đến Cao Bằng ~4h30 sáng, nhận phòng sớm tại homestay để ngủ bù và phục hồi trước hành trình dài 4 ngày.',
      details: [
        '~4h30: Đến Cao Bằng, đưa bạn về homestay nhận phòng sớm.',
        'Ngủ thêm 1–2 tiếng cho lại sức sau chuyến xe giường nằm.',
        'Tắm nước nóng, vệ sinh cá nhân và thưởng thức cafe Cao Bằng đón ngày mới.',
        'Sẵn sàng rồi thì nhận xe máy, bắt đầu chinh phục cung đường đầu tiên.'
      ],
      image: 'images/services/checkin-room.jpg'
    },
    showerInfo: {
      title: 'Tắm nước nóng trước khi lên xe về Hà Nội',
      desc: 'Ngày cuối chạy xe về thành phố, bạn không phải lên xe đêm trong bộ đồ đầy bụi đường — có nhà tắm nước nóng chờ sẵn, sạch sẽ thơm tho rồi mới lên xe.',
      details: [
        'Nhà tắm nước nóng sạch sẽ — dùng miễn phí trước giờ xe chạy.',
        'Khăn sạch chuẩn bị sẵn, có chỗ thay đồ.',
        'Gửi hành lý trong ngày cuối — về tắm xong nhận lại, thay bộ đồ sạch.',
        'Thảnh thơi ăn tối rồi lên xe 20h30 — ngủ một giấc thẳng tới Hà Nội.'
      ],
      image: 'images/services/shower.jpg'
    },
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
    ]
  }
];

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
  image: string;
  highlights: string[];
  
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
  
  itinerary: DayItinerary[];
}

export interface VehicleChoice {
  name: string;
  desc: string;
  surcharge: string;      // "Đã bao gồm" | "+250.000đ/người" | "Liên hệ"
  recommended?: boolean;  // ✦ gợi ý mặc định
}

export interface VehicleGroup {
  key: string;
  label: string;
  note?: string;
  choices: VehicleChoice[];
}

// Tuỳ chọn phương tiện dùng chung cho mọi chương trình.
// DATA MẪU — chủ dự án chỉnh giá/phụ thu thật sau.
export const vehicleGroups: VehicleGroup[] = [
  {
    key: 'longhaul',
    label: 'Xe Hà Nội ↔ Cao Bằng',
    note: 'Khứ hồi, đón trả tận nơi.',
    choices: [
      { name: 'Xe giường nằm cabin VIP', desc: 'Cabin riêng, rèm che, sạc USB — ngủ êm cả đêm, sáng tới nơi.', surcharge: 'Đã bao gồm', recommended: true },
      { name: 'Limousine 9 chỗ đi ban ngày', desc: 'Ngắm cảnh dọc đường, nhanh hơn ~1 giờ, phù hợp ai say xe đêm.', surcharge: '+250.000đ/người' },
    ],
  },
  {
    key: 'local',
    label: 'Di chuyển tại Cao Bằng',
    note: 'Trong suốt hành trình khám phá.',
    choices: [
      { name: 'Xe máy Honda tự lái', desc: 'Wave/Blade/Winner đầy xăng — tự do dừng chụp ảnh mọi lúc.', surcharge: 'Đã bao gồm', recommended: true },
      { name: 'Easy Rider (tài xế bản địa)', desc: 'Bạn ngồi sau, tài xế rành đường & điểm chụp đẹp, an tâm không lo lạc.', surcharge: '+350.000đ/ngày' },
      { name: 'Ô tô riêng có tài xế', desc: 'Kín gió, hợp nhóm/gia đình hoặc khi trời mưa.', surcharge: 'Liên hệ' },
    ],
  },
];

export const programsData: ProgramDetails[] = [
  {
    id: '2n1d',
    name: '2 Ngày 1 Đêm',
    tagline: 'Trải nghiệm nhanh, đủ tinh hoa',
    price: '1.890.000đ',
    priceNote: '/người',
    days: 2,
    spots: 6,
    image: 'images/places/ban-gioc.jpg',
    highlights: ['Thác Bản Giốc', 'Động Ngườm Ngao', 'Mắt Thần núi', 'Homestay bản địa'],
    busInfo: {
      title: 'Xe limousine giường phòng VIP',
      desc: 'Dòng xe 22 cabin cung điện khứ hồi Hà Nội - Cao Bằng đưa đón thoải mái nhất.',
      details: [
        'Xe xuất phát lúc 22:00 từ các điểm hẹn Hà Nội (Mỹ Đình, Giáp Bát, Rạp xiếc TW).',
        'Giường phòng nằm riêng biệt, rèm che riêng tư, cổng sạc USB, màn hình LCD.',
        'Được cung cấp nước uống, khăn lạnh và chăn gối sạch sẽ.',
        'Đón trả tận nơi tại Tp. Cao Bằng và đưa đón về homestay.'
      ],
      image: 'images/services/bus-tickets.jpg'
    },
    motorbikeInfo: {
      title: 'Xe máy thuê đời mới đầy bình xăng',
      desc: 'Dòng xe số Honda Wave Alpha/Blade hoặc tay ga (Vision) hoạt động cực tốt, leo dốc khỏe.',
      details: [
        'Nhận xe ngay khi đến văn phòng tại Tp. Cao Bằng.',
        'Đã đổ sẵn đầy bình xăng để bạn xuất phát ngay.',
        'Kèm sẵn: 2 mũ bảo hiểm chuẩn, 2 bộ áo mưa cánh dơi, giá đỡ điện thoại chắc chắn.',
        'Bảo dưỡng định kỳ, lốp gai bám đường chống trơn trượt.'
      ],
      image: 'images/welcome-icons/svc-motorbike.png'
    },
    homestayInfo: {
      title: 'Homestay nhà sàn đá cổ Khuổi Ky',
      desc: 'Nghỉ dưỡng tại nhà sàn đá cổ của người Tày bản địa ở làng cổ Khuổi Ky.',
      details: [
        'Phòng riêng Standard Double, khép kín sạch sẽ.',
        'Sàn gỗ mộc mạc ấm cúng, chăn đệm thơm tho dày dặn giữ ấm tốt.',
        'Có nước nóng lạnh, máy sấy tóc và wifi tốc độ cao.',
        'Khoảng sân chung nhìn thẳng ra ruộng ngô và thung lũng đá vôi.'
      ],
      image: 'images/homestay.jpg'
    },
    night1Info: {
      title: 'Đêm thứ 1: Ngủ đêm dưỡng sức',
      desc: 'Giấc ngủ ngon trên xe cabin VIP để nạp đầy năng lượng trước khi nhận xe máy.',
      details: [
        '22:00: Lên xe tại Hà Nội, ổn định cabin và ngủ đêm trên cung đường cao tốc.',
        'Xe chạy êm ái, dừng 1-2 trạm nghỉ chân dọc đường.',
        '05:30: Xe đến Tp. Cao Bằng. Người của Sen đón bạn tại bến xe, đưa về văn phòng nghỉ ngơi tạm thời.',
        'Vệ sinh cá nhân, gửi lại hành lý cồng kềnh và chuẩn bị ăn sáng.'
      ],
      image: 'images/services/luggages.jpg'
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
          { time: '19:00', title: 'Bữa tối ấm cúng bếp lửa', desc: 'Lẩu gà đen nấu nấm rừng, thịt gác bếp bản địa cùng rượu ngô men lá ngọt nhẹ.' }
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
    tagline: 'Được yêu thích nhất — đủ sâu, đủ chậm',
    featured: true,
    price: '2.690.000đ',
    priceNote: '/người',
    days: 3,
    spots: 10,
    image: 'images/places/eye-mountain.jpg',
    highlights: ['Thác Bản Giốc', 'Động Ngườm Ngao', 'Hồ Thang Hen', 'Làng đá Khuổi Ky', 'Chợ phiên địa phương', 'Xe máy khám phá'],
    busInfo: {
      title: 'Xe limousine giường phòng VIP khứ hồi',
      desc: 'Giường phòng nằm riêng biệt cao cấp cabin cung điện đưa đón Hà Nội - Cao Bằng.',
      details: [
        'Xe xuất phát lúc 22:00 tối từ Hà Nội, chạy thẳng cao tốc.',
        'Mỗi người một cabin riêng biệt rộng rãi, nệm êm ái, cổng sạc, màn hình giải trí.',
        'Đón trả trung tâm thành phố và có xe trung chuyển đưa đón tận nơi.',
        'Nhân viên điều phối chuyên nghiệp gọi điện nhắc nhở trước giờ đi.'
      ],
      image: 'images/services/bus-tickets.jpg'
    },
    motorbikeInfo: {
      title: 'Xe máy chất lượng cao leo dốc khỏe',
      desc: 'Honda Wave Alpha, Honda Blade 110 hoặc các dòng xe côn Winner X/PG-1 cực chất.',
      details: [
        'Nhận xe tại văn phòng Cao Bằng đầy ắp bình xăng.',
        'Mũ bảo hiểm nửa đầu chắc chắn kèm kính chắn bụi.',
        'Bộ áo mưa đôi cao cấp chống nước tuyệt đối.',
        'Giá đỡ điện thoại chống giật phục vụ xem Google Maps chỉ đường.'
      ],
      image: 'images/welcome-icons/svc-motorbike.png'
    },
    homestayInfo: {
      title: '2 Đêm nghỉ dưỡng Homestay đá Khuổi Ky',
      desc: 'Nhà sàn đá cổ truyền thống mang đậm bản sắc văn hóa Tày.',
      details: [
        'Phòng Suite Double rộng hơn, view núi cực đẹp.',
        'Vệ sinh riêng, đầy đủ nước nóng, đồ dùng cá nhân thân thiện môi trường.',
        'Đệm sưởi điện ấm áp cho giấc ngủ say nồng.',
        'Phục vụ trà, cafe địa phương miễn phí tại góc ban công homestay.'
      ],
      image: 'images/homestay.jpg'
    },
    night1Info: {
      title: 'Đêm thứ 1: Ngủ xe cabin êm ái',
      desc: 'Di chuyển đêm bằng xe cabin limousine giường nằm cabin cung điện giúp bạn nạp năng lượng.',
      details: [
        '22:00: Khởi hành tại Hà Nội, trải nghiệm giấc ngủ đêm trên xe cabin VIP.',
        'Xe chạy an toàn, nhẹ nhàng vượt đèo đêm lên Cao Bằng.',
        '05:30: Xe đến Cao Bằng, nhân viên đón bạn về văn phòng trung tâm.',
        'Nghỉ ngơi, vệ sinh cá nhân và tắm rửa nóng lạnh miễn phí trước khi nhận xe máy.'
      ],
      image: 'images/services/luggages.jpg'
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
          { time: '07:15', title: 'Nhận xe máy đầy xăng', desc: 'Honda Wave/Winner X đã kiểm tra lốp, phanh kỹ càng.', image: 'images/bikes/wave-alpha.jpg' },
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
          { time: '19:00', title: 'Ăn tối lẩu gà đen', desc: 'Lẩu gà đen nấm rừng nghi ngút khói bên hiên nhà sàn.' }
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
          { time: '19:00', title: 'Ăn tối thịt nướng bản dã', desc: 'Thịt ba chỉ nướng lá mắc mật, lạp sườn nướng than hoa.' }
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
    price: '3.490.000đ',
    priceNote: '/người',
    days: 4,
    spots: 14,
    image: 'images/places/khau-coc-cha.jpg',
    highlights: ['Tất cả điểm 3N2Đ', 'Pác Bó', 'Phja Oắc', 'Cốc Bó suối Lê-nin', 'Đèo Mã Phục', 'Cafe núi'],
    busInfo: {
      title: 'Xe cabin limousine VIP cao cấp',
      desc: 'Cabin đơn rộng rãi khứ hồi Hà Nội - Cao Bằng an toàn tối đa.',
      details: [
        'Cabin đơn có nệm mát-xa chỉnh điện, điều hòa riêng biệt.',
        'Đưa đón tại các điểm cố định nội thành Hà Nội.',
        'Cung cấp tai nghe chống ồn, chăn ấm, gối mềm giặt sạch sau mỗi chuyến.',
        'Hỗ trợ đổi giờ xe linh hoạt khi khách có yêu cầu.'
      ],
      image: 'images/services/bus-tickets.jpg'
    },
    motorbikeInfo: {
      title: 'Xe máy chuyên phượt leo đèo dốc',
      desc: 'Winner X 150cc, Yamaha PG-1 hoặc cào cào phượt chuyên dụng cực khỏe.',
      details: [
        'Dòng xe phân khối lớn hoặc xe số côn tay chuyên dụng vượt đèo 15 tầng Khâu Cốc Chà.',
        'Lốp gai địa hình chống trơn trượt, phanh đĩa trước sau chắc chắn.',
        'Trang bị bộ bảo hộ khuỷu tay, đầu gối chất lượng.',
        'Tặng kèm bản đồ phượt Cao Bằng offline tích hợp định vị GPS.'
      ],
      image: 'images/welcome-icons/svc-motorbike.png'
    },
    homestayInfo: {
      title: '3 Đêm phòng Deluxe Homestay Cao Bằng',
      desc: 'Sự lựa chọn nghỉ dưỡng cao cấp nhất tại làng đá Khuổi Ky và khu bảo tồn Phja Oắc.',
      details: [
        'Phòng Deluxe Double rộng rãi có bồn tắm gỗ ngâm lá thuốc người Dao đỏ.',
        'Ban công riêng nhìn ra dòng suối Khuổi Ky trong vắt.',
        'Sử dụng nước giếng khơi mát lịm, lọc sạch tiêu chuẩn.',
        'Đốt lửa trại nướng khoai ngọt miễn phí mỗi tối tại homestay.'
      ],
      image: 'images/homestay.jpg'
    },
    night1Info: {
      title: 'Đêm thứ 1: Giấc ngủ êm trên xe cung điện',
      desc: 'Giấc ngủ đêm trọn vẹn trên xe limousine cabin cung điện để phục hồi sức khỏe.',
      details: [
        '22:00: Khởi hành tại Hà Nội.',
        'Mỗi cabin là một phòng ngủ mini di động riêng tư.',
        '05:30: Đến Cao Bằng, trung chuyển về văn phòng tắm rửa nước nóng miễn phí.',
        'Thưởng thức tách cafe hạt Cao Bằng thơm lừng đón ngày mới.'
      ],
      image: 'images/services/luggages.jpg'
    },
    itinerary: [
      {
        dayNumber: 1,
        dayTitle: 'Thác Bản Giốc & Động Ngườm Ngao',
        activities: [
          { time: '06:30', title: 'Ăn sáng đặc sản', desc: 'Phở vịt quay Cao Bằng nức tiếng.', image: 'images/Food/breakfast.jpg' },
          { time: '07:15', title: 'Nhận xe máy Winner X / PG-1 chuyên phượt', desc: 'Đầy xăng, mũ bảo hiểm chất lượng.', image: 'images/bikes/wave-alpha.jpg' },
          { time: '07:30', title: 'Chinh phục đèo Mã Phục & Khau Liêu', desc: '2 con đèo kỳ vĩ bậc nhất trên đường đi Bản Giốc.' },
          { time: '09:45', title: 'Thác Bản Giốc mùa nước đổ', desc: 'Góc chụp ảnh thác nước đẹp mê hồn từ dòng sông Quây Sơn.', image: 'images/places/ban-gioc.jpg' },
          { time: '11:45', title: 'Động Ngườm Ngao tráng lệ', desc: 'Khám phá thế giới thạch nhũ lung linh ngàn năm.', image: 'images/places/nguom-ngao.jpg' },
          { time: '13:00', title: 'Ăn trưa hạt dẻ nướng & đặc sản', desc: 'Cơm lam, vịt quay, canh rau cải nương.' },
          { time: '14:30', title: 'Cầu đá & Suối cổ Khuổi Ky', desc: 'Ngắm dòng suối chảy qua làng đá cổ.', image: 'images/places/stone-village.jpg' },
          { time: '17:00', title: 'Check-in Homestay Deluxe', desc: 'Nhận phòng ban công view suối tuyệt đẹp.' },
          { time: '19:00', title: 'Bữa tối lẩu gà rừng nấu lá giang', desc: 'Thưởng thức tại homestay ấm cúng.' }
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
          { time: '19:00', title: 'Bữa tiệc BBQ nướng mắc mật', desc: 'Thịt lợn đen, lạp sườn nướng than hoa sực nức hương vị.' }
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
          { time: '19:00', title: 'Bữa tối ẩm thực Lô Lô', desc: 'Thưởng thức rượu ngô và cơm bản địa.' }
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

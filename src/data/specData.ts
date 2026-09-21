export interface SpecSection {
  id: string;
  title: string;
  shortTitle: string;
  contentHtml?: string;
  data?: any;
}

export const CANTEEN_PROJECT_CHARTER = {
  projectName: "UniCanteen — Nền tảng Đặt món trước và Quản lý Canteen Trường Đại học",
  teamMembers: [
    { name: "Nguyễn Linh Chi", id: "2374820028", role: "Project Manager (PM)" },
    { name: "Mai Thu Hà", id: "2374820052", role: "Business Analyst (BA)" },
    { name: "Nguyễn Thị Hồng", id: "2374820071", role: "Developer A (Lead Dev)" },
    { name: "Ngô Thị Hồng Thu", id: "2374820182", role: "Developer B (Fullstack Dev)" },
    { name: "Nguyễn Thị Huyền", id: "2374820092", role: "Quality Assurance / Tester" },
  ],
  problemStatement: "Sinh viên và giảng viên thường xuyên phải chịu cảnh chen lấn, xếp hàng từ 20 đến 35 phút vào giờ cao điểm ăn trưa và giải lao giữa giờ. Tình trạng này dẫn đến trễ giờ học, căng thẳng, quầy canteen bị quá tải cục bộ, không dự báo được số lượng suất ăn gây hao phí hoặc cháy món, đồng thời thanh toán tiền mặt gây chậm trễ và mất vệ sinh thực phẩm.",
  projectGoal: "Xây dựng hệ thống web kết nối sinh viên với các quầy ăn canteen trong khuôn viên trường; cung cấp tính năng xem thực đơn theo ngày kèm calo dinh dưỡng, đặt trước món ăn theo khung giờ nhận (Time-slot Pickup) và thanh toán qua ví sinh viên nội bộ CanteenPay, giúp giảm tối thiểu 70% thời gian chờ đợi lấy thức ăn và hỗ trợ nhà bếp chuẩn bị món tối ưu.",
  targetAudience: [
    "1. Sinh viên / Cán bộ giảng viên: Xem thực đơn, lọc món ăn (dinh dưỡng, giá, loại món), đặt trước theo giờ nghỉ, thanh toán ví demo, nhận mã lấy món (Pick-up code/QR), đánh giá chất lượng món.",
    "2. Chủ quầy / Nhà bếp Canteen: Quản lý thực đơn theo ca, tiếp nhận đơn đặt trước, cập nhật trạng thái chế biến (Đang nấu -> Sẵn sàng lấy), đối soát mã nhận món với sinh viên, xem thống kê doanh thu ca/ngày.",
    "3. Quản trị viên Canteen (Admin): Phê duyệt quầy hàng và món ăn mới, kiểm soát giá cả và vệ sinh an toàn thực phẩm, quản lý tài khoản người dùng, xem báo cáo tổng hợp toàn trường."
  ],
  mvpScope: "Đăng ký/đăng nhập phân quyền (Sinh viên, Chủ quầy, Admin); Tra cứu thực đơn & lọc món (theo quầy, danh mục, khoảng giá, món chay, calo); Xem chi tiết món (ảnh, thành phần, calo, dị ứng); Đặt món trước theo khung giờ; Thanh toán qua Ví sinh viên CanteenPay (demo); Quầy nhận đơn và cập nhật tiến độ chế biến; Sinh viên nhận món qua mã 4 số; Đánh giá món ăn sau khi dùng; Báo cáo thống kê cơ bản.",
  outOfScope: "Tích hợp cổng ngân hàng thực tế Napas/VNPAY (chỉ dùng ví sinh viên demo); Giao hàng tận phòng ký túc xá (chỉ nhận tại quầy để đảm bảo độ tươi nóng); Thiết bị POS phần cứng cơ học chuyên biệt.",
  developmentModel: "Agile / Scrum rút gọn — 3 Sprint theo các mốc học kỳ (Tuần 4, 7, 10).",
  toolsUsed: "Trello / Jira (quản lý backlog), Git / GitHub (quản lý mã nguồn), Figma (thiết kế UI/UX), draw.io (thiết kế sơ đồ kiến trúc & CSDL), Google Forms (khảo sát thói quen ăn uống của 150+ sinh viên)."
};

export const CANTEEN_PRODUCT_BACKLOG = [
  {
    epic: "Epic 1: Quản lý tài khoản & Ví sinh viên (Auth & Wallet)",
    stories: [
      { id: "US01", story: "Là Sinh viên / Chủ quầy, tôi muốn đăng ký/đăng nhập bằng Email hoặc MSSV để sử dụng đúng phân quyền hệ thống.", priority: "Phải có", points: 2, sprint: "Sprint 1" },
      { id: "US02", story: "Là Sinh viên, tôi muốn xem số dư và nạp tiền giả lập vào Ví CanteenPay để thanh toán không dùng tiền mặt.", priority: "Phải có", points: 2, sprint: "Sprint 1" },
      { id: "US03", story: "Là người dùng, tôi muốn xem lịch sử biến động số dư và hóa đơn chi tiêu tại canteen để quản lý tài chính sinh viên.", priority: "Nên có", points: 1, sprint: "Sprint 2" },
    ]
  },
  {
    epic: "Epic 2: Tìm kiếm & Quản lý thực đơn Canteen (Menu & Stalls)",
    stories: [
      { id: "US04", story: "Là Sinh viên, tôi muốn tìm kiếm món ăn và lọc theo quầy, mức giá, loại món (cơm, bún/phở, đồ ăn vặt, đồ uống, món chay) và calo để nhanh chóng chọn bữa ăn phù hợp.", priority: "Phải có", points: 3, sprint: "Sprint 1" },
      { id: "US05", story: "Là Sinh viên, tôi muốn xem chi tiết món ăn gồm hình ảnh, giá, định lượng calo, thành phần và cảnh báo dị ứng để bảo vệ sức khỏe.", priority: "Phải có", points: 2, sprint: "Sprint 1" },
      { id: "US06", story: "Là Chủ quầy, tôi muốn đăng món ăn mới, cập nhật giá và bật/tắt trạng thái (Còn món / Tạm hết) để sinh viên không đặt trùng món đã hết.", priority: "Phải có", points: 3, sprint: "Sprint 1" },
      { id: "US07", story: "Là Chủ quầy, tôi muốn tùy biến các lựa chọn đi kèm (ví dụ: thêm cơm, giảm ngọt, chọn size) để đáp ứng khẩu vị sinh viên.", priority: "Nên có", points: 2, sprint: "Sprint 1" },
    ]
  },
  {
    epic: "Epic 3: Đặt trước theo khung giờ & Thanh toán (Pre-order & Pickup)",
    stories: [
      { id: "US08", story: "Là Sinh viên, tôi muốn chọn khung giờ nhận món (vd: 11:30 - 11:45) và ghi chú cho nhà bếp khi đặt món để kịp giờ giải lao.", priority: "Phải có", points: 3, sprint: "Sprint 2" },
      { id: "US09", story: "Là Sinh viên, tôi muốn thanh toán đơn hàng qua Ví CanteenPay và nhận ngay Mã lấy món (4 chữ số & QR) để xuất trình tại quầy.", priority: "Phải có", points: 3, sprint: "Sprint 2" },
      { id: "US10", story: "Là Sinh viên, tôi muốn hủy đơn đặt trước nếu nhà bếp chưa bắt đầu chế biến và được hoàn 100% tiền về ví demo.", priority: "Nên có", points: 2, sprint: "Sprint 2" },
    ]
  },
  {
    epic: "Epic 4: Vận hành nhà bếp & Quản trị hệ thống (Kitchen KDS & Admin)",
    stories: [
      { id: "US11", story: "Là Chủ quầy/Nhà bếp, tôi muốn có màn hình hiển thị đơn đặt trước theo thời gian thực (KDS) để sắp xếp thứ tự nấu theo khung giờ.", priority: "Phải có", points: 3, sprint: "Sprint 2" },
      { id: "US12", story: "Là Chủ quầy, tôi muốn cập nhật tiến độ đơn (Nhận đơn -> Đang nấu -> Món đã sẵn sàng) và kiểm tra mã lấy món khi giao cho sinh viên.", priority: "Phải có", points: 2, sprint: "Sprint 2" },
      { id: "US13", story: "Là Admin, tôi muốn kiểm duyệt món ăn mới do các quầy đề xuất và tạm khóa quầy nếu có vi phạm an toàn thực phẩm.", priority: "Phải có", points: 2, sprint: "Sprint 2" },
    ]
  },
  {
    epic: "Epic 5: Đánh giá chất lượng & Báo cáo doanh thu (Review & Analytics)",
    stories: [
      { id: "US14", story: "Là Sinh viên, tôi muốn chấm điểm 1-5 sao và để lại nhận xét về hương vị, độ nóng sốt và thái độ phục vụ của quầy.", priority: "Có thể có", points: 2, sprint: "Sprint 3" },
      { id: "US15", story: "Là Chủ quầy & Admin, tôi muốn xem biểu đồ thống kê doanh thu, số suất ăn đã bán và top món ăn được yêu thích nhất trong ngày/tuần.", priority: "Nên có", points: 2, sprint: "Sprint 3" },
    ]
  }
];

export const CANTEEN_TEST_PLAN = [
  { id: "TC01", module: "Xác thực", input: "Nhập tài khoản đúng (Sinh viên / Chủ quầy / Admin)", expected: "Đăng nhập thành công, điều hướng vào giao diện theo đúng phân quyền", status: "Đạt" },
  { id: "TC02", module: "Xác thực", input: "Nhập sai thông tin đăng nhập", expected: "Hiển thị thông báo lỗi yêu cầu kiểm tra lại email/mật khẩu", status: "Đạt" },
  { id: "TC03", module: "Tìm kiếm & Lọc", input: "Lọc món 'Dưới 35.000đ' + Danh mục 'Cơm phần'", expected: "Chỉ hiển thị các món cơm có giá <= 35k", status: "Đạt" },
  { id: "TC04", module: "Tìm kiếm & Lọc", input: "Tích chọn lọc 'Món chay' + 'Dưới 500 kcal'", expected: "Danh sách chỉ gồm các món chay thỏa mãn calo thấp", status: "Đạt" },
  { id: "TC05", module: "Tìm kiếm & Lọc", input: "Tìm kiếm từ khóa không tồn tại (vd: 'pizza tôm hùm')", expected: "Hiển thị thông báo 'Không tìm thấy món ăn phù hợp, vui lòng thử từ khóa khác'", status: "Đạt" },
  { id: "TC06", module: "Giỏ hàng", input: "Thêm món ăn và tùy chọn topping/ghi chú vào giỏ", expected: "Cập nhật số lượng, tính đúng tổng tiền bao gồm phụ thu topping", status: "Đạt" },
  { id: "TC07", module: "Đặt món & Ví", input: "Thanh toán đơn hàng khi số dư Ví CanteenPay >= Tổng tiền", expected: "Trừ tiền ví thành công, sinh mã đơn hàng ORD-xxx và mã nhận món 4 chữ số", status: "Đạt" },
  { id: "TC08", module: "Đặt món & Ví", input: "Thanh toán khi số dư ví < Tổng tiền đơn hàng", expected: "Báo lỗi 'Số dư không đủ', hiển thị nút nạp thêm tiền vào ví demo", status: "Đạt" },
  { id: "TC09", module: "Khung giờ", input: "Chọn khung giờ lấy món hợp lệ trong ngày (vd: 11:30 - 11:45)", expected: "Lưu chính xác khung giờ vào đơn hàng để quầy chuẩn bị", status: "Đạt" },
  { id: "TC10", module: "Bếp / Chủ quầy", input: "Chủ quầy bấm 'Bắt đầu nấu' -> 'Món đã sẵn sàng'", expected: "Trạng thái đơn hàng cập nhật thời gian thực, sinh viên thấy thông báo sẵn sàng lấy", status: "Đạt" },
  { id: "TC11", module: "Bếp / Chủ quầy", input: "Chủ quầy đối soát mã nhận món 4 số và bấm 'Hoàn thành đơn'", expected: "Đơn chuyển sang trạng thái Đã hoàn tất, cho phép sinh viên đánh giá", status: "Đạt" },
  { id: "TC12", module: "Hủy đơn", input: "Sinh viên hủy đơn khi đơn còn ở trạng thái 'Chờ xác nhận'", expected: "Hủy đơn thành công, hoàn trả 100% tiền cọc/thanh toán về Ví CanteenPay", status: "Đạt" },
  { id: "TC13", module: "Quản lý món", input: "Chủ quầy chuyển công tắc món sang 'Tạm hết'", expected: "Món lập tức bị mờ, nút thêm vào giỏ chuyển thành 'Hết món'", status: "Đạt" },
  { id: "TC14", module: "Admin", input: "Admin kiểm duyệt món ăn mới do quầy gửi lên", expected: "Món sau khi duyệt sẽ xuất hiện công khai trên thực đơn trường", status: "Đạt" },
  { id: "TC15", module: "Đánh giá", input: "Sinh viên gửi đánh giá 5 sao kèm bình luận cho đơn đã hoàn thành", expected: "Đánh giá được lưu, cập nhật lại điểm trung bình sao của món ăn", status: "Đạt" }
];

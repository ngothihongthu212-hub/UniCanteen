import React, { useState } from 'react';
import {
  X,
  FileText,
  Copy,
  Check,
  Download,
  BookOpen,
  Layers,
  Calendar,
  AlertTriangle,
  GitBranch,
  ShieldCheck,
  Presentation
} from 'lucide-react';
import { useCanteen } from '../context/CanteenContext';
import {
  CANTEEN_PROJECT_CHARTER,
  CANTEEN_PRODUCT_BACKLOG,
  CANTEEN_TEST_PLAN
} from '../data/specData';

export const SpecModal: React.FC = () => {
  const { activeModal, setActiveModal, showToast } = useCanteen();
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'>('A');
  const [copied, setCopied] = useState<boolean>(false);

  if (activeModal !== 'spec') return null;

  const handleCopyFullSpec = () => {
    const fullText = `
DỰ ÁN: UniCanteen — NỀN TẢNG ĐẶT MÓN TRƯỚC VÀ QUẢN LÝ CANTEEN TRƯỜNG ĐẠI HỌC
Nhóm thực hiện:
- Nguyễn Linh Chi – 2374820028 (Project Manager)
- Mai Thu Hà - 2374820052 (Business Analyst)
- Nguyễn Thị Hồng - 2374820071 (Lead Developer)
- Ngô Thị Hồng Thu - 2374820182 (Fullstack Developer)
- Nguyễn Thị Huyền - 2374820092 (Quality Assurance / Tester)

==================================================
A. Project Charter - Hồ sơ khởi động dự án
- Tên dự án: UniCanteen — Nền tảng Tìm kiếm, Đặt món trước và Quản lý Canteen Sinh viên
- Vấn đề: Chen lấn, xếp hàng 20-35 phút giờ cao điểm gây trễ tiết, lãng phí thời gian, quầy canteen quá tải, thanh toán tiền mặt chậm và mất vệ sinh.
- Mục tiêu: Giảm tối thiểu 70% thời gian chờ đợi nhận món; đặt trước theo khung giờ (Time-slot); thanh toán ví sinh viên CanteenPay; số hóa 100% quy trình từ gọi món đến nhà bếp KDS.
- Tác nhân chính: 1. Sinh viên (End-User), 2. Chủ quầy/Nhà bếp (Vendor), 3. Ban Quản trị Canteen (Admin).
- Phạm vi MVP: Auth phân quyền; Menu & Tìm kiếm/Lọc món; Đặt trước theo khung giờ; Thanh toán ví demo; Màn hình bếp KDS cập nhật tiến độ; Mã lấy món 4 chữ số; Đánh giá món ăn; Báo cáo doanh thu.

==================================================
B. Product Backlog chi tiết (MoSCoW & Story Points)
- US01: Đăng ký/đăng nhập phân quyền (Phải có - 2 SP - Sprint 1)
- US02: Quản lý số dư & Ví CanteenPay demo (Phải có - 2 SP - Sprint 1)
- US03: Lịch sử biến động số dư (Nên có - 1 SP - Sprint 2)
- US04: Tìm kiếm & Lọc món theo quầy, giá, calo, món chay (Phải có - 3 SP - Sprint 1)
- US05: Xem chi tiết món, thành phần & cảnh báo dị ứng (Phải có - 2 SP - Sprint 1)
- US06: Chủ quầy đăng món, bật/tắt Còn món/Hết món (Phải có - 3 SP - Sprint 1)
- US07: Tùy biến topping và ghi chú nhà bếp (Nên có - 2 SP - Sprint 1)
- US08: Đặt món theo khung giờ nhận (Phải có - 3 SP - Sprint 2)
- US09: Thanh toán ví demo & sinh mã nhận món 4 số (Phải có - 3 SP - Sprint 2)
- US10: Hủy đơn & tự động hoàn tiền ví (Nên có - 2 SP - Sprint 2)
- US11: Màn hình bếp hiển thị đơn thời gian thực KDS (Phải có - 3 SP - Sprint 2)
- US12: Bếp đổi trạng thái Đang nấu -> Mời lấy -> Giao món (Phải có - 2 SP - Sprint 2)
- US13: Admin kiểm duyệt món ăn mới (Phải có - 2 SP - Sprint 2)
- US14: Sinh viên đánh giá 1-5 sao và bình luận (Có thể có - 2 SP - Sprint 3)
- US15: Thống kê doanh thu và món bán chạy (Nên có - 2 SP - Sprint 3)

==================================================
E. Đặc tả chi tiết 3 Use Case chính
1. UC-01: Tìm kiếm & Lọc món ăn theo khung giờ & calo
2. UC-02: Đặt trước theo khung giờ & Thanh toán Ví CanteenPay
3. UC-03: Vận hành chế biến Bếp KDS & Đối soát mã lấy món 4 số

==================================================
F. Thiết kế CSDL (Class Diagram)
- NguoiDung(Id, HoTen, Email, MatKhau, Sdt, VaiTro, Mssv, SoDuVi)
- GianHang(Id, TenGianHang, SoQuay, ChuQuay, Sdt, GioMoCua, GioDongCua)
- MonAn(Id, IdGianHang, TenMon, DanhMuc, Gia, Calo, ThoiGianNau, ConHang, DaDuyet)
- DonHang(Id, MaDonHang, MaLayMon, IdSinhVien, IdGianHang, KhungGioNhan, TongTien, TrangThai)
- ChiTietDonHang(Id, IdDonHang, IdMonAn, SoLuong, DonGia, TuyChon, GhiChu)
- GiaoDichVi(Id, IdNguoiDung, SoTien, LoaiGiaoDich, MoTa, NgayTao)
- DanhGia(Id, IdSinhVien, IdMonAn, SoSao, BinhLuan, NgayTao)
    `.trim();

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    showToast('Đã sao chép toàn bộ hồ sơ đặc tả dự án vào Clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-900 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black font-serif">
                  HỒ SƠ ĐẶC TẢ DỰ ÁN WEB CANTEEN (SRS & CHARTER)
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 font-bold text-[10px] uppercase">
                  Bản Chuẩn Học Kỳ
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Đồ án Canteen Sinh viên — Đầy đủ Mục A đến Mục H chuẩn phương pháp Agile/Scrum
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyFullSpec}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-xs"
              title="Sao chép toàn bộ văn bản để dán vào Word hoặc Google Docs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-950" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã chép!' : 'Chép nội dung Docs'}</span>
            </button>
            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-2 bg-stone-100 border-b border-stone-200 text-xs font-bold scrollbar-none">
          {[
            { key: 'A', label: 'Mục A. Project Charter' },
            { key: 'B', label: 'Mục B. Product Backlog' },
            { key: 'C', label: 'Mục C. Kế hoạch WBS' },
            { key: 'D', label: 'Mục D. Quản lý Rủi ro' },
            { key: 'E', label: 'Mục E. Use Case chi tiết' },
            { key: 'F', label: 'Mục F. Kiến trúc & CSDL' },
            { key: 'G', label: 'Mục G. Test Plan mở rộng' },
            { key: 'H', label: 'Mục H. Kịch bản Demo Day' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-amber-700 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:bg-stone-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-800 text-sm leading-relaxed">
          {/* MỤC A: PROJECT CHARTER */}
          {activeTab === 'A' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-3">
                <h3 className="text-lg font-black font-serif text-stone-900">
                  A. Project Charter — Hồ sơ khởi động dự án Web Canteen
                </h3>
                <p className="text-xs text-stone-500">
                  Văn bản khởi động dự án thiết lập mục tiêu, phạm vi và tổ chức nhân sự nhóm
                </p>
              </div>

              {/* Members */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Danh sách thành viên & Phân công vai trò trong nhóm
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                  {CANTEEN_PROJECT_CHARTER.teamMembers.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-stone-900 block">{m.name}</span>
                        <span className="text-stone-400 font-mono text-[11px]">MSSV: {m.id}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold text-[10px] border border-amber-200">
                        {m.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem Statement & Project Goal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800">
                    1. Vấn đề thực tế cần giải quyết
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {CANTEEN_PROJECT_CHARTER.problemStatement}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    2. Mục tiêu dự án
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {CANTEEN_PROJECT_CHARTER.projectGoal}
                  </p>
                </div>
              </div>

              {/* Audience & Scope */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  3. Đối tượng người dùng chính (Actors)
                </h4>
                <div className="space-y-2 text-xs">
                  {CANTEEN_PROJECT_CHARTER.targetAudience.map((aud, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white border border-stone-200 font-medium text-stone-700">
                      {aud}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                  <h4 className="font-bold text-amber-900 uppercase tracking-wider">
                    Phạm vi MVP (Trong học kỳ)
                  </h4>
                  <p className="text-stone-700 leading-relaxed">
                    {CANTEEN_PROJECT_CHARTER.mvpScope}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 space-y-1.5">
                  <h4 className="font-bold text-stone-700 uppercase tracking-wider">
                    Ngoài phạm vi (Out of Scope)
                  </h4>
                  <p className="text-stone-600 leading-relaxed">
                    {CANTEEN_PROJECT_CHARTER.outOfScope}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MỤC B: PRODUCT BACKLOG */}
          {activeTab === 'B' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-3">
                <h3 className="text-lg font-black font-serif text-stone-900">
                  B. Product Backlog chi tiết (15 User Stories)
                </h3>
                <p className="text-xs text-stone-500">
                  Mức độ ưu tiên chuẩn MoSCoW: Phải có (Must-have), Nên có (Should-have), Có thể có (Could-have). Điểm Story Point thang 1–5.
                </p>
              </div>

              <div className="space-y-6">
                {CANTEEN_PRODUCT_BACKLOG.map((epicGroup, gIdx) => (
                  <div key={gIdx} className="space-y-2">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 inline-block">
                      {epicGroup.epic}
                    </h4>

                    <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="p-3 w-16">Mã</th>
                            <th className="p-3">User Story</th>
                            <th className="p-3 w-24">Ưu tiên</th>
                            <th className="p-3 w-16 text-center">Điểm</th>
                            <th className="p-3 w-24 text-right">Sprint</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 font-medium">
                          {epicGroup.stories.map(s => (
                            <tr key={s.id} className="hover:bg-stone-50/60">
                              <td className="p-3 font-mono font-bold text-amber-700">{s.id}</td>
                              <td className="p-3 text-stone-800 leading-relaxed">{s.story}</td>
                              <td className="p-3">
                                <span
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                    s.priority === 'Phải có'
                                      ? 'bg-rose-100 text-rose-800'
                                      : s.priority === 'Nên có'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-emerald-100 text-emerald-800'
                                  }`}
                                >
                                  {s.priority}
                                </span>
                              </td>
                              <td className="p-3 text-center font-mono font-bold text-stone-700">{s.points}</td>
                              <td className="p-3 text-right font-semibold text-stone-500">{s.sprint}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
                <strong>Tổng kết Backlog:</strong> 15 User Stories (10 Phải có, 3 Nên có, 2 Có thể có). Tổng cộng: 33 Story Points trải dài qua 3 Sprint.
              </div>
            </div>
          )}

          {/* MỤC C: SPRINT WBS */}
          {activeTab === 'C' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-3">
                <h3 className="text-lg font-black font-serif text-stone-900">
                  C. Kế hoạch phân rã công việc theo Sprint (WBS)
                </h3>
                <p className="text-xs text-stone-500">
                  Lộ trình 3 Sprint bám sát tiến độ học phần phát triển phần mềm (Tuần 1–10)
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Sprint 0 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-stone-900 text-sm">Sprint 0: Khởi động & Khảo sát (Tuần 1 - 4)</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-700 font-bold text-[10px]">Đã hoàn thành</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-stone-600">
                    <li>Khảo sát Google Forms 150+ sinh viên về tình trạng ùn tắc giờ ăn trưa và nhu cầu đặt trước.</li>
                    <li>Xây dựng Project Charter, Product Backlog theo chuẩn MoSCoW, gán Story Points.</li>
                    <li>Vẽ Use Case Diagram, sơ đồ luồng người dùng (User Flow) và phác thảo Wireframe trên Figma.</li>
                    <li>Thiết lập bảng Kanban trên Trello, quy tắc commit và branching trên GitHub.</li>
                  </ul>
                </div>

                {/* Sprint 1 */}
                <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-amber-950 text-sm">Sprint 1: Xây dựng Lõi hệ thống & Thực đơn (Tuần 5 - 7)</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">Đã nghiệm thu</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-stone-700">
                    <li>Thiết kế cấu trúc CSDL 7 bảng (NguoiDung, GianHang, MonAn, DonHang, ChiTietDonHang, ViTien, DanhGia).</li>
                    <li>Code Module Auth phân quyền 3 vai trò: Sinh viên, Chủ quầy và Admin.</li>
                    <li>Code Module Menu & Bộ lọc thông minh (theo quầy, danh mục, calo, ăn chay, khoảng giá).</li>
                    <li>Code Module Quản lý thực đơn phía Chủ quầy: Bật/tắt Còn món/Tạm hết, thêm món mới.</li>
                  </ul>
                </div>

                {/* Sprint 2 */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-emerald-950 text-sm">Sprint 2: Đặt trước, Ví CanteenPay & Vận hành Bếp KDS (Tuần 8 - 10)</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Hoàn thiện & Demo</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-stone-700">
                    <li>Code Module Pre-order theo khung giờ nhận (11:30, 11:45, 12:00, 12:15...).</li>
                    <li>Code Module Ví CanteenPay: Thanh toán trừ số dư, nạp tiền demo, sinh mã nhận món 4 số.</li>
                    <li>Code Màn hình Bếp KDS (Kitchen Display System): Tiếp nhận đơn, cập nhật Đang nấu → Món đã sẵn sàng → Giao món.</li>
                    <li>Code Kiểm duyệt món Admin, Đánh giá 1-5 sao và hoàn thiện Test Report.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* MỤC D: QUẢN LÝ RỦI RO */}
          {activeTab === 'D' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-3">
                <h3 className="text-lg font-black font-serif text-stone-900">
                  D. Bảng quản lý rủi ro dự án (Risk Management Matrix)
                </h3>
                <p className="text-xs text-stone-500">
                  Đánh giá khả năng xảy ra, mức độ ảnh hưởng và phương án xử lý dự phòng
                </p>
              </div>

              <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Rủi ro tiềm ẩn</th>
                      <th className="p-3 w-28">Khả năng</th>
                      <th className="p-3 w-28">Ảnh hưởng</th>
                      <th className="p-3">Phương án ứng phó & Giải pháp dự phòng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                    <tr className="hover:bg-stone-50">
                      <td className="p-3 font-semibold text-stone-900">Sinh viên đặt trước nhưng không đến nhận món đúng giờ</td>
                      <td className="p-3"><span className="text-amber-700 font-bold">Trung bình</span></td>
                      <td className="p-3"><span className="text-amber-700 font-bold">Trung bình</span></td>
                      <td className="p-3">Yêu cầu thanh toán trừ tiền ví trước khi gửi đơn; quá thời hạn 30 phút đồ ăn được bảo quản riêng hoặc tính phí hủy.</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-3 font-semibold text-stone-900">Quầy quá tải đột biến cùng một khung giờ nhận đồ</td>
                      <td className="p-3"><span className="text-rose-700 font-bold">Cao</span></td>
                      <td className="p-3"><span className="text-rose-700 font-bold">Cao</span></td>
                      <td className="p-3">Thiết lập giới hạn số lượng suất ăn tối đa trên mỗi khung giờ 15 phút (vd: tối đa 20 suất/khung giờ).</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-3 font-semibold text-stone-900">Tích hợp cổng thanh toán ngân hàng thật phức tạp pháp lý</td>
                      <td className="p-3"><span className="text-rose-700 font-bold">Cao</span></td>
                      <td className="p-3"><span className="text-amber-700 font-bold">Trung bình</span></td>
                      <td className="p-3">Xác định rõ phạm vi MVP: Triển khai Ví CanteenPay sinh viên giả lập, hỗ trợ nạp tiền demo nhanh chóng.</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-3 font-semibold text-stone-900">Sự cố mạng hoặc mất kết nối khi đang trình chiếu Demo Day</td>
                      <td className="p-3"><span className="text-amber-700 font-bold">Trung bình</span></td>
                      <td className="p-3"><span className="text-rose-700 font-bold">Nghiêm trọng</span></td>
                      <td className="p-3">Chuẩn bị sẵn bộ dữ liệu mẫu nạp sẵn LocalStorage, hỗ trợ chuyển đổi vai trò tức thì không cần reload trang.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MỤC E: USE CASE */}
          {activeTab === 'E' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-3">
                <h3 className="text-lg font-black font-serif text-stone-900">
                  E. Đặc tả chi tiết 3 Use Case cốt lõi
                </h3>
                <p className="text-xs text-stone-500">
                  Phân tích luồng chính, tiền điều kiện, hậu điều kiện và luồng ngoại lệ
                </p>
              </div>

              {/* UC-01 */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-stone-900">
                    UC-01: Tìm kiếm và Lọc thực đơn Canteen (Sinh viên)
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    Tiền điều kiện: Sinh viên truy cập màn hình thực đơn
                  </span>
                </div>
                <div className="text-xs text-stone-700 space-y-1.5">
                  <p><strong>Hậu điều kiện:</strong> Danh sách các món ăn thỏa mãn tiêu chí được hiển thị kèm giá, calo và thời gian nấu.</p>
                  <p><strong>Luồng sự kiện chính:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Sinh viên nhập từ khóa món ăn hoặc chọn danh mục (Cơm phần, Bún phở, Trà sữa, Ăn vặt, Món chay).</li>
                    <li>Sinh viên chọn quầy canteen mong muốn (Quầy 01 Bách Khoa, Quầy 02 Bún Phở, Quầy 03 Cafe...).</li>
                    <li>Sinh viên tùy chọn bộ lọc nâng cao (Ăn chay 🌱, Ít calo &lt; 500 kcal, hoặc kéo thanh giá tối đa).</li>
                    <li>Hệ thống truy vấn dữ liệu theo thời gian thực và hiển thị các thẻ món ăn tương ứng.</li>
                    <li>Sinh viên nhấp vào món để xem chi tiết thành phần dinh dưỡng và cảnh báo dị ứng.</li>
                  </ol>
                  <p className="text-stone-500 italic">
                    * Luồng ngoại lệ: Không có món nào khớp tiêu chí → Hệ thống hiển thị thông báo "Không tìm thấy món ăn phù hợp" và gợi ý nút "Đặt lại bộ lọc".
                  </p>
                </div>
              </div>

              {/* UC-02 */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-stone-900">
                    UC-02: Đặt trước theo khung giờ & Thanh toán Ví CanteenPay
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Tiền điều kiện: Món còn hàng; SV có tài khoản ví
                  </span>
                </div>
                <div className="text-xs text-stone-700 space-y-1.5">
                  <p><strong>Hậu điều kiện:</strong> Đơn hàng tạo thành công; Ví bị trừ tiền; Hệ thống sinh Mã lấy món 4 chữ số.</p>
                  <p><strong>Luồng sự kiện chính:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Sinh viên thêm món vào giỏ hàng, chọn các topping và ghi chú riêng (nếu có).</li>
                    <li>Sinh viên mở Giỏ hàng, chọn Khung giờ nhận món (vd: 11:30 - 11:45).</li>
                    <li>Hệ thống tính tổng tiền và đối chiếu với số dư Ví CanteenPay của sinh viên.</li>
                    <li>Sinh viên xác nhận thanh toán → Hệ thống trừ số dư ví, ghi nhận lịch sử giao dịch.</li>
                    <li>Hệ thống tạo mã đơn hàng (ORD-xxxx) và cấp Mã lấy món 4 chữ số (vd: #6824).</li>
                    <li>Đơn hàng lập tức đẩy lên Màn hình Bếp KDS của quầy tương ứng.</li>
                  </ol>
                  <p className="text-stone-500 italic">
                    * Luồng ngoại lệ: Số dư ví không đủ → Hệ thống hiển thị cảnh báo đỏ và cung cấp nút nạp nhanh tiền ví demo ngay tại giỏ hàng.
                  </p>
                </div>
              </div>

              {/* UC-03 */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-stone-900">
                    UC-03: Chế biến món tại Nhà bếp (KDS) & Đối soát Mã lấy đồ
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold">
                    Tiền điều kiện: Đơn hàng ở trạng thái Chờ nhận đơn
                  </span>
                </div>
                <div className="text-xs text-stone-700 space-y-1.5">
                  <p><strong>Hậu điều kiện:</strong> Đơn chuyển sang Đã hoàn thành; Quầy ghi nhận doanh thu.</p>
                  <p><strong>Luồng sự kiện chính:</strong></p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Nhà bếp quan sát đơn hàng mới theo khung giờ nhận trên Màn hình Bếp KDS.</li>
                    <li>Nhà bếp nhấn "Bắt đầu nấu" → Trạng thái đơn chuyển sang "Đang nấu".</li>
                    <li>Khi món hoàn thành, nhà bếp nhấn "Món đã sẵn sàng - Mời lấy". Hệ thống gửi thông báo sẵn sàng lấy cho SV.</li>
                    <li>Sinh viên đến quầy, xuất trình Mã lấy món 4 chữ số (vd: #6824).</li>
                    <li>Nhà bếp nhập mã vào ô đối soát hoặc bấm xác nhận → Đơn chuyển sang "Đã hoàn thành".</li>
                  </ol>
                  <p className="text-stone-500 italic">
                    * Luồng ngoại lệ: Sinh viên hủy đơn khi nhà bếp chưa nấu → Hệ thống tự động hoàn 100% tiền vào Ví CanteenPay.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* MỤC F: ARCHITECTURE & DATA MODEL */}
          {activeTab === 'F' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-3">
                <h3 className="text-lg font-black font-serif text-stone-900">
                  F. Thiết kế Hệ thống, Cơ sở Dữ liệu & Quy ước Mã nguồn
                </h3>
                <p className="text-xs text-stone-500">
                  Sơ đồ Class Diagram thực thể, Coding conventions và Quy tắc phân nhánh Git
                </p>
              </div>

              {/* Database Schema Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  1. Cấu trúc bảng CSDL (Data Dictionary / Class Diagram)
                </h4>
                <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3 w-36">Tên bảng / Class</th>
                        <th className="p-3">Các trường thuộc tính chính</th>
                        <th className="p-3">Vai trò & Quan hệ dữ liệu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                      <tr>
                        <td className="p-3 font-bold font-mono text-amber-700">NguoiDung</td>
                        <td className="p-3 font-mono text-[11px]">Id, HoTen, Email, MatKhau, Sdt, VaiTro, Mssv, SoDuVi</td>
                        <td className="p-3">Lưu tài khoản chung, phân quyền (student, vendor, admin), lưu trữ số dư ví.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold font-mono text-amber-700">GianHang (Quay)</td>
                        <td className="p-3 font-mono text-[11px]">Id, TenGianHang, SoQuay, ChuQuay, Sdt, GioMoCua, GioDongCua</td>
                        <td className="p-3">Quản lý danh sách các quầy ăn canteen trong khuôn viên trường.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold font-mono text-amber-700">MonAn</td>
                        <td className="p-3 font-mono text-[11px]">Id, IdGianHang, TenMon, DanhMuc, Gia, Calo, ThoiGianNau, ConHang, DaDuyet</td>
                        <td className="p-3">Lưu trữ món ăn, trạng thái còn/hết hàng và trạng thái kiểm duyệt an toàn của Admin.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold font-mono text-amber-700">DonHang</td>
                        <td className="p-3 font-mono text-[11px]">Id, MaDonHang, MaLayMon, IdSinhVien, IdGianHang, KhungGioNhan, TongTien, TrangThai</td>
                        <td className="p-3">Quản lý đơn đặt trước, mã lấy đồ 4 chữ số và tiến độ bếp xử lý.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold font-mono text-amber-700">ChiTietDonHang</td>
                        <td className="p-3 font-mono text-[11px]">Id, IdDonHang, IdMonAn, SoLuong, DonGia, TuyChon, GhiChu</td>
                        <td className="p-3">Lưu chi tiết từng món ăn, số lượng và yêu cầu gia giảm khẩu vị cho bếp.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold font-mono text-amber-700">GiaoDichVi</td>
                        <td className="p-3 font-mono text-[11px]">Id, IdNguoiDung, SoTien, LoaiGiaoDich, MoTa, NgayTao, MaDonHang</td>
                        <td className="p-3">Quản lý biến động số dư: Nạp tiền ví, thanh toán đơn ăn, hoàn tiền hủy đơn.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold font-mono text-amber-700">DanhGia</td>
                        <td className="p-3 font-mono text-[11px]">Id, IdSinhVien, IdMonAn, SoSao, BinhLuan, NgayTao</td>
                        <td className="p-3">Lưu trữ phản hồi chất lượng món ăn và thái độ phục vụ của quầy.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Coding Conventions & Git */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <h4 className="font-bold text-stone-900 uppercase tracking-wider">
                    2. Quy ước viết mã (Coding Conventions)
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-stone-600">
                    <li>Tên Class / Interface: PascalCase (vd: <code className="font-mono text-amber-700">FoodItem</code>, <code className="font-mono text-amber-700">OrderController</code>).</li>
                    <li>Tên biến / hàm: camelCase (vd: <code className="font-mono text-amber-700">createOrder()</code>, <code className="font-mono text-amber-700">topUpWallet()</code>).</li>
                    <li>Hằng số: UPPER_SNAKE_CASE (vd: <code className="font-mono text-amber-700">TIME_SLOTS</code>).</li>
                    <li>Phân tách chặt chẽ Presentation, Context và Data layer.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <h4 className="font-bold text-stone-900 uppercase tracking-wider">
                    3. Chiến lược phân nhánh Git (Branching)
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-stone-600">
                    <li><strong className="text-stone-800">main:</strong> Nhánh sản phẩm chính thức chạy ổn định để chấm điểm và demo.</li>
                    <li><strong className="text-stone-800">develop:</strong> Nhánh tích hợp chung sau khi hoàn thành từng tính năng.</li>
                    <li><strong className="text-stone-800">feature/auth, feature/menu-search:</strong> Nhánh tính năng cá nhân.</li>
                    <li><strong className="text-stone-800">bugfix/order-timeout:</strong> Nhánh sửa lỗi phát hiện qua kiểm thử.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* MỤC G: TEST PLAN */}
          {activeTab === 'G' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-3">
                <h3 className="text-lg font-black font-serif text-stone-900">
                  G. Test Plan mở rộng — Kịch bản kiểm thử chi tiết (15 Test Cases)
                </h3>
                <p className="text-xs text-stone-500">
                  100% ca kiểm thử được thiết kế chi tiết bao phủ các luồng chính, luồng biên và luồng ngoại lệ
                </p>
              </div>

              <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3 w-16">Mã TC</th>
                      <th className="p-3 w-28">Phân hệ</th>
                      <th className="p-3">Dữ liệu đầu vào & Thao tác kiểm thử</th>
                      <th className="p-3">Kết quả mong đợi</th>
                      <th className="p-3 w-24 text-center">Đạt/Không</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                    {CANTEEN_TEST_PLAN.map(tc => (
                      <tr key={tc.id} className="hover:bg-stone-50">
                        <td className="p-3 font-mono font-bold text-amber-700">{tc.id}</td>
                        <td className="p-3 font-semibold text-stone-600">{tc.module}</td>
                        <td className="p-3 text-stone-800">{tc.input}</td>
                        <td className="p-3 text-stone-600">{tc.expected}</td>
                        <td className="p-3 text-center">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            {tc.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MỤC H: DEMO DAY SCRIPT */}
          {activeTab === 'H' && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-3">
                <h3 className="text-lg font-black font-serif text-stone-900">
                  H. Phân bổ kịch bản Demo Day bảo vệ đồ án trước Hội đồng (10–12 phút)
                </h3>
                <p className="text-xs text-stone-500">
                  Kịch bản phân chia vai trò và thời gian thuyết trình chi tiết cho 5 thành viên
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  {
                    time: '1.0 phút',
                    speaker: 'PM (Nguyễn Linh Chi)',
                    title: 'Giới thiệu dự án & Quản lý tiến độ Agile',
                    content: 'Nêu thực trạng chen lấn 20-35 phút tại canteen trường, giới thiệu mục tiêu giảm 70% thời gian chờ của UniCanteen và vận hành 3 Sprint trên Trello/GitHub.'
                  },
                  {
                    time: '1.5 phút',
                    speaker: 'BA (Mai Thu Hà)',
                    title: 'Phân tích yêu cầu & Khảo sát thị trường',
                    content: 'Trình chiếu biểu đồ khảo sát 150+ sinh viên từ Google Forms, giải thích cách nhóm xây dựng Product Backlog MoSCoW và 3 Use Case cốt lõi.'
                  },
                  {
                    time: '3.5 phút',
                    speaker: 'Lead Dev (Nguyễn Thị Hồng)',
                    title: 'Live Demo Luồng Sinh viên (End-User)',
                    content: 'Thao tác trực tiếp: Xem thực đơn, áp dụng bộ lọc calo & ăn chay, thêm món kèm topping, chọn khung giờ nhận 11:30 - 11:45, thanh toán trừ ví CanteenPay và sinh Mã lấy món 4 chữ số.'
                  },
                  {
                    time: '2.5 phút',
                    speaker: 'Dev 2 (Ngô Thị Hồng Thu)',
                    title: 'Live Demo Luồng Nhà bếp & Quản trị Admin',
                    content: 'Chuyển sang vai trò Bếp Quầy 01: Nhận đơn, bấm Đang nấu -> Mời lấy, nhập 4 số đối soát. Chuyển sang Admin: Xem KPI doanh thu toàn trường và duyệt món ăn mới.'
                  },
                  {
                    time: '1.5 phút',
                    speaker: 'Tester (Nguyễn Thị Huyền)',
                    title: 'Báo cáo Kiểm thử & Chất lượng phần mềm',
                    content: 'Tóm tắt 15 Test Case đạt 100%, demo ca kiểm thử biên (thanh toán khi ví không đủ tiền, hủy đơn hoàn tiền) và các lỗi đã fix ở Sprint 2.'
                  },
                  {
                    time: '2.0 phút',
                    speaker: 'Cả nhóm',
                    title: 'Hỏi đáp & Phản biện với Giảng viên',
                    content: 'BA trả lời logic nghiệp vụ, Dev trả lời kiến trúc CSDL & thuật toán, PM điều phối và tổng kết kết quả.'
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row gap-3">
                    <div className="sm:w-32 flex-shrink-0">
                      <span className="font-mono font-bold text-amber-700 block">{item.time}</span>
                      <span className="text-[11px] font-semibold text-stone-500">{item.speaker}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{item.title}</h4>
                      <p className="text-stone-600 mt-1 leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Dự án sinh viên: UniCanteen Campus System © 2026</span>
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold transition-colors"
          >
            Đóng & Trải nghiệm Ứng dụng
          </button>
        </div>
      </div>
    </div>
  );
};

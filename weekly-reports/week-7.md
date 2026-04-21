# Báo cáo Tuần 7

**Tuần:** 7 (13/04/2026 - 19/04/2026)  
**Nhóm:** 5  
**Đề tài:** 15 - AI Resume Screening System  
**Nhóm trưởng:** Trịnh Thị Anh Thư - 2351010205  

---

## 1. Công việc đã hoàn thành

| Thành viên | MSSV | Công việc | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Trịnh Thị Anh Thư** | 2351010205 | **Hiring Manager Frontend:** Tái cấu trúc toàn bộ folder theo chuẩn modular. Hoàn thiện giao diện Dashboard (Quick Edit), Pipeline (Table/Row), Comparison (Side-by-side) và Modal chi tiết ứng viên. Tích hợp API đánh giá ứng viên. | [e](https://github.com/thuttat/AI-RESUME-SCREENING/commit/6ed376bddd712e6b56c3ed7f29e4f7bcccf60022) |
| **Lê Hoàng Bảo Trân** | 2351010214 | **Recruiter Frontend:** Hoàn thiện luồng Upload CV (SessionStorage), quản lý Job và màn hình Ranking ứng viên với bộ lọc nâng cao. Đồng bộ hóa logic Bulk Action (thao tác hàng loạt) với Backend. | [e](https://github.com/thuttat/AI-RESUME-SCREENING/commit/c9ec609bb6b30acc2ee658ceb87018ce5eb3fbee) |
| **Nguyễn Triệu Duy** | 2351010036 | **Admin & Core Integration:** Hoàn thiện giao diện Quản lý người dùng và Email Templates cho Admin. Thực hiện tích hợp toàn diện JWT vào Header cho mọi request. Fix lỗi đồng bộ dữ liệu giữa RabbitMQ và Frontend Email Logs. | [e](https://github.com/thuttat/AI-RESUME-SCREENING/commit/e1aaf6aff4de47ff3b8b7333d799ebb304989703) |

---

## 2. Tiến độ tổng thể

| Hạng mục | Trạng thái | % |
| :--- | :--- | :--- |
| Phân tích yêu cầu | Đã hoàn thành | 100% |
| Thiết kế kiến trúc / DB / API | Đã hoàn thành | 100% |
| Backend Core & Security | Đã hoàn thành | 100% |
| Tích hợp AI & Xử lý bất đồng bộ | Đã hoàn thành | 100% |
| **Frontend UI (3 phân hệ)** | **Đã hoàn thành** | **100%** |
| **Ghép nối API & Kiểm thử (QA)** | **Đang hoàn thiện** | **45%** |

**Tổng tiến độ: ~82%** 

---

## 3. Kế hoạch tuần tới (Tuần 8 - Finalization & Deployment)

| Thành viên | Công việc dự kiến |
| :--- | :--- |
| **Trịnh Thị Anh Thư** | Viết tài liệu hướng dẫn sử dụng (User Manual) và tổng hợp file báo cáo cuối kỳ. Kiểm tra lại luồng đánh giá của Manager. |
| **Lê Hoàng Bảo Trân** | Kiểm thử hiệu năng (Stress test) khi upload file PDF dung lượng lớn. Tối ưu hóa giao diện mobile/responsive cho các bảng dữ liệu. |
| **Nguyễn Triệu Duy** | Đóng gói ứng dụng bằng **Docker** (Dockerfile cho Spring Boot và React). Thiết lập Docker Compose để chạy đồng bộ MySQL, RabbitMQ và Application. |

---

## 4. Ghi chú kỹ thuật & Khó khăn

### Công việc nổi bật trong tuần:
- **Tái cấu trúc (Refactoring):** Nhóm đã thực hiện tái cấu trúc phân hệ Hiring Manager theo mô hình "Feature-based" của Recruiter, giúp giảm 40% sự chồng chéo mã nguồn (code redundancy).
- **Trải nghiệm người dùng:** Áp dụng hiệu ứng Backdrop-blur và CSS Animation cho các Modal kết quả AI, giúp hệ thống chuyên nghiệp hơn.
- **Bảo mật:** Hoàn thiện `PrivateRoute` cho cả 3 Role (`ADMIN`, `RECRUITER`, `HIRING_MANAGER`), xử lý triệt để các trường hợp truy cập trái phép.

### Khó khăn hiện tại:
- Việc đồng bộ hóa dữ liệu từ RabbitMQ về giao diện Email Tracking đôi khi có độ trễ nhỏ (~1-2s). Nhóm đang cân nhắc thêm trạng thái "Processing" rõ ràng hơn cho người dùng.
- Cấu hình Docker để các container kết nối nội bộ trong mạng ảo cần được kiểm tra kỹ để tránh lỗi kết nối Database.

---
*Ngày nộp: 19/04/2026* *Xác nhận của Nhóm trưởng: Trịnh Thị Anh Thư*
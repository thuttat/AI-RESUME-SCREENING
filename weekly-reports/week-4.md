# Báo cáo Tuần 4

**Tuần:** 4 (23/03/2026 - 29/03/2026)  
**Nhóm:** 5  
**Đề tài:** 15 - AI Resume Screening System  
**Nhóm trưởng:** Trịnh Thị Anh Thư - 2351010205  

---

## 1. Công việc đã hoàn thành

| Thành viên | MSSV | Công việc | Link Commit/PR |
| :--- | :--- | :--- | :--- |
| **Trịnh Thị Anh Thư** | 2351010205 | Khởi tạo Spring Boot. Cấu hình 3 file `application.properties` quản lý môi trường (H2 cho Dev, MySQL cho Prod). Code 9 class `@Entity` chuẩn POJO thuần áp dụng thủ công Builder Pattern và đánh `@Index`. Khởi tạo project ReactJS, setup thư viện (Axios, Tailwind) và dựng Layout (Header, Sidebar). | [4d96090](https://github.com/thuttat/AI-RESUME-SCREENING/commit/4d9609033587db385c42822880f0f8711f66894b)|
| **Lê Hoàng Bảo Trân** | 2351010214 | Khởi tạo các interface JPA Repositories cho 9 bảng. Viết API Upload file CV (`/api/cvs/upload`). Dựng cấu trúc giao diện Frontend cho trang Quản lý Tin tuyển dụng (Job Posting) dành cho Recruiter. | [3054240](https://github.com/thuttat/AI-RESUME-SCREENING/commit/305424021ed25aebc7783158e8b6dc4c997257b7) |
| **Nguyễn Triệu Duy** | 2351010036 | Cấu hình Spring Security, thiết lập bộ lọc phân quyền. Viết API Authentication (`/api/auth/login`, `/api/auth/me`) và sinh JWT Token. Code Frontend trang Đăng nhập, Đăng ký và xử lý lưu Token vào LocalStorage, bảo vệ Private Route. | [293a675](https://github.com/thuttat/AI-RESUME-SCREENING/commit/293a675838f9634c4c57891ce5bc64cec9ef7f19) |

---

## 2. Tiến độ tổng thể

| Hạng mục | Trạng thái | % |
| :--- | :--- | :--- |
| Phân tích yêu cầu | Đã hoàn thành | 100% |
| Thiết kế kiến trúc / DB / API | Đã hoàn thành | 100% |
| **Backend Core & Security** | **Đã hoàn thành** | **1000%** |
| Frontend UI (Base & Auth) | Đang làm | 30% |
| API Core Business & AI | Chưa bắt đầu | 0% |
| Ghép nối & Kiểm thử (QA) | Chưa bắt đầu | 0% |

**Tổng tiến độ: ~45%** (Đã xây dựng xong nền tảng, chuẩn bị bước vào giai đoạn code AI & Core Business)

---

## 3. Kế hoạch tuần tới (Tuần 5 - API Core & AI Integration)

| Thành viên | Công việc dự kiến |
| :--- | :--- |
| **Trịnh Thị Anh Thư** | Viết API phân hệ Đánh giá (`/api/evaluations`) và xử lý chốt quyết định (`status`). Code Frontend trang Xem chi tiết ứng viên và Form nhập điểm phỏng vấn cho Hiring Manager. |
| **Lê Hoàng Bảo Trân** | Code logic gọi API OpenAI (`/api/cvs/{id}/parse`) bóc tách CV. Trích xuất JSON lưu vào `AI_Analysis_Result`. Làm tính năng Upload CV hàng loạt trên Frontend. |
| **Nguyễn Triệu Duy** | Viết API quản lý `Job_Template`, `Email_Template` và các API thống kê báo cáo Dashboard cho Admin. Dựng giao diện Admin Dashboard. |

---

## 4. Khó khăn / Cần hỗ trợ

- [x] **Đã giải quyết:** Xử lý xong việc ánh xạ đối tượng `@Entity` theo chuẩn Java POJO thuần (không dùng thư viện ngoài) nhưng vẫn hỗ trợ Builder Pattern thủ công và tự động tạo chỉ mục (index) dưới DB.
- [x] **Đã giải quyết:** Áp dụng Externalized Configuration với cơ chế Profile (`application-dev.properties` và `application-prod.properties`) để chuyển đổi nhanh giữa môi trường test (H2) và chạy thật (MySQL).
- [ ] **Khó khăn tuần tới:** Logic gửi request chứa CV và JD sang OpenAI API yêu cầu cấu trúc prompt chuẩn và cơ chế bắt lỗi JSON chặt chẽ (để tránh rủi ro API sập hoặc trả về sai định dạng). Nhóm sẽ sử dụng `try-catch` và test kỹ trên Postman.

---

*Ngày nộp: 29/03/2026*  
*Xác nhận của Nhóm trưởng: Trịnh Thị Anh Thư*
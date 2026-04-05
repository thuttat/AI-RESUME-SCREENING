# Báo cáo Tuần 5

**Tuần:** 5 (30/03/2026 - 05/04/2026)  
**Nhóm:** 5  
**Đề tài:** 15 - AI Resume Screening System  
**Nhóm trưởng:** Trịnh Thị Anh Thư - 2351010205  

---

## 1. Công việc đã hoàn thành

| Thành viên | MSSV | Công việc | Link Commit/PR |
| :--- | :--- | :--- | :--- |
| **Trịnh Thị Anh Thư** | 2351010205 | Hoàn thành API phân hệ Đánh giá (`/api/evaluations`, `/api/ratings`) và xử lý logic chốt quyết định tuyển dụng lưu vào `status` của Application. Hoàn thiện UI trang Xem chi tiết ứng viên và Form nhập điểm/feedback cho Hiring Manager. | [e](https://github.com/thuttat/AI-RESUME-SCREENING/commit/1c8982ec8cf339f92271734e6c524fc2c7280e4f) |
| **Lê Hoàng Bảo Trân** | 2351010214 | Tích hợp thành công OpenAI API (`/api/cvs/{id}/parse`). Áp dụng chiến lược tiền xử lý CV. Hoàn thành UI Upload CV hàng loạt. | [e](https://github.com/thuttat/AI-RESUME-SCREENING/commit/5e911490059848ae5e0ca45bb0ac796cfca8dc64) |
| **Nguyễn Triệu Duy** | 2351010036 | Xây dựng xong API quản lý `JobTemplate`, `EmailTemplate` và `AIConfig`. Hoàn thiện API `/api/dashboard` trả về số liệu tổng quan. Dựng xong giao diện Admin Dashboard hiển thị thống kê. | [e](https://github.com/thuttat/AI-RESUME-SCREENING/commit/482efa02ee59ef570d3d571c70d7540e35c6f30c) |

---

## 2. Tiến độ tổng thể

| Hạng mục | Trạng thái | % |
| :--- | :--- | :--- |
| Phân tích yêu cầu | Đã hoàn thành | 100% |
| Thiết kế kiến trúc / DB / API | Đã hoàn thành | 100% |
| Backend Core & Security | Đã hoàn thành | 100% |
| **API Core Business & AI** | **Đã hoàn thành** | **80%** |
| Frontend UI (Giao diện) | Cơ bản hoàn thành | 40% |
| Ghép nối & Kiểm thử (QA) | Đang làm | 10% |

**Tổng tiến độ: ~65%** 

---

## 3. Kế hoạch tuần tới (Tuần 6 - Ghép nối & Kiểm thử)

Tuần 6 tập trung vào việc dùng Axios gọi API từ Frontend, hiển thị dữ liệu thật và tìm lỗi.

| Thành viên | Công việc dự kiến |
| :--- | :--- |
| **Trịnh Thị Anh Thư** | Hoàn thành các api còn lại của hirring manager và hoàn thiện ui |
| **Lê Hoàng Bảo Trân** | Hoàn thành các api còn lại của recruiter và hoàn thiện ui |
| **Nguyễn Triệu Duy** | Hoàn thành các api còn lại của admin và hoàn thiện ui |

---

## 4. Khó khăn / Cần hỗ trợ

- [x] **Đã giải quyết:** Xử lý thành công việc cấu trúc dữ liệu JSON từ OpenAI bằng cách ép AI trả về định dạng chuẩn xác thông qua prompt instruction [1]. Đã cấu hình fallback (try-catch) khi API quá tải [2].
- [ ] **Khó khăn hiện tại:** Không 

---

*Ngày nộp: 05/04/2026*  
*Xác nhận của Nhóm trưởng: Trịnh Thị Anh Thư*

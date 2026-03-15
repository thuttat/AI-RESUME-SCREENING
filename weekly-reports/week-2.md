# Báo cáo Tuần 2

**Tuần:** 2 (09/03/2026 - 15/03/2026)
**Nhóm:** 5
**Đề tài:** 15 - AI Resume Screening System
**Nhóm trưởng:** Trịnh Thị Anh Thư - 2351010205

---

## 1. Công việc đã hoàn thành
| Thành viên | MSSV | Công việc | Link Commit/PR |
|------------|------|-----------|----------------|
| Trịnh Thị Anh Thư | 2351010205 | Phân tích Use cases và thiết kế Wireframes cho phân hệ Admin (Trang Dashboard, quản lý user, danh mục, job templates). | [a1b2c3d](https://github.com/thuttat/AI-RESUME-SCREENING/commit/a1b2c3d) |
| Lê Hoàng Bảo Trân | 2351010214 | Phân tích Use cases và vẽ Wireframes cho phân hệ Nhà tuyển dụng (Recruiter). Hoàn thiện luồng kịch bản tích hợp AI (AI Integration Workflow), quy trình chấm điểm và chiến lược tối ưu chi phí API. | [e4f5g6h](https://github.com/thuttat/AI-RESUME-SCREENING/commit/e4f5g6h) |
| Nguyễn Triệu Duy | 2351010036 | Phân tích Use cases, vẽ Wireframes cho phân hệ Hiring Manager. Tổng hợp, định dạng (format) và hoàn thành bản chốt file `docs/requirements.md`. |- [WF]([https://github.com/thuttat/AI-RESUME-SCREENING/commit/i7j8k9l](https://github.com/thuttat/AI-RESUME-SCREENING/issues/11)) - [UC](https://github.com/thuttat/AI-RESUME-SCREENING/issues/10) - [doc](https://github.com/thuttat/AI-RESUME-SCREENING/commit/7aa024c220bbff92b46aee9662502666c05a940b)| 

---

## 2. Tiến độ tổng thể
| Hạng mục | Trạng thái | % |
|----------|------------|---|
| Phân tích yêu cầu | Đã hoàn thành | 100% |
| Thiết kế kiến trúc / DB | Đang làm | 10% |
| Backend API | Chưa bắt đầu | 0% |
| Frontend UI | Chưa bắt đầu | 0% |
| Docker | Chưa bắt đầu | 0% |
| Testing | Chưa bắt đầu | 0% |
**Tổng tiến độ: 15%**

---

## 3. Kế hoạch tuần tới (Tuần 3)

| Thành viên | Công việc dự kiến |
|------------|-------------------|
| Trịnh Thị Anh Thư | Thiết kế sơ đồ ERD và cấu trúc Database (đảm bảo 6-10 bảng). Khởi tạo và hoàn thiện file `docs/database-design.md`. |
| Lê Hoàng Bảo Trân | Thiết kế danh sách RESTful API Endpoints cho luồng Recruiter và Admin. Định nghĩa cấu trúc JSON Request/Response cho các API gọi sang OpenAI. |
| Nguyễn Triệu Duy | Thiết kế danh sách RESTful API Endpoints cho luồng Hiring Manager. Tổng hợp và định dạng hoàn chỉnh file `docs/api-docs.md` (đảm bảo 20-30 endpoints). |

---

## 4. Khó khăn / Cần hỗ trợ
- Đang cân nhắc cách thiết kế Database tối ưu để lưu trữ kết quả phân tích CV trả về từ OpenAI (nên lưu dạng cấu trúc JSON nguyên bản vào cột JSONB hay tách ra thành từng cột riêng biệt trong bảng). Sẽ thảo luận thêm trong buổi họp nhóm tới.

---
*Ngày nộp: 14/03/2026*
*Xác nhận của Nhóm trưởng: Trịnh Thị Anh Thư*

# Báo cáo Tuần 3

**Tuần:** 3 (16/03/2026 - 22/03/2026)  
**Nhóm:** 5  
**Đề tài:** 15 - AI Resume Screening System  
**Nhóm trưởng:** Trịnh Thị Anh Thư - 2351010205  

---

## 1. Công việc đã hoàn thành

| Thành viên | MSSV | Công việc | Link Commit/PR |
| :--- | :--- | :--- | :--- |
| **Trịnh Thị Anh Thư** | 2351010205 | Hoàn thiện sơ đồ ERD và chốt cấu trúc Database (9 bảng). Hoàn thiện file `docs/database-design.md`. | ERD, DB Docs |
| **Lê Hoàng Bảo Trân** | 2351010214 | Thiết kế RESTful API Endpoints cho luồng Recruiter và Admin. | API Docs |
| **Nguyễn Triệu Duy** | 2351010036 | Thiết kế RESTful API cho luồng Hiring Manager. Tổng hợp định dạng file `docs/api-docs.md`. | API Docs |

---

## 2. Tiến độ tổng thể

| Hạng mục | Trạng thái | % |
| :--- | :--- | :--- |
| Phân tích yêu cầu | Done | 100% |
| **Thiết kế kiến trúc / DB / API** | **Done** | **100%** |
| Backend Core (Entities, Repositories) | Chưa bắt đầu | 0% |
| Backend API Logic & Security | Chưa bắt đầu | 0% |
| Frontend UI | Chưa bắt đầu | 0% |
| Tích hợp AI (OpenAI) | Chưa bắt đầu | 0% |
| Docker | Chưa bắt đầu | 0% |
| Testing | Chưa bắt đầu | 0% |

**Tổng tiến độ: ~25%**

---

## 3. Kế hoạch tuần tới (Tuần 4 - Backend Core)

| Thành viên | Công việc dự kiến |
| :--- | :--- |
| **Trịnh Thị Anh Thư** | Cấu hình file `application.properties`. Ánh xạ 9 bảng từ Database Design thành các class `@Entity` (Hibernate) trong Spring Boot. |
| **Lê Hoàng Bảo Trân** | Tạo các interface JPA Repository tương ứng cho các Entities. Bắt đầu code các API CRUD cơ bản cho phân hệ Admin và luồng quản lý Job Posting của Recruiter. |
| **Nguyễn Triệu Duy** | Thiết lập Spring Security cho project. Viết các API Authentication dùng chung (Đăng ký, Đăng nhập, cấp phát và xác thực JWT token). Khởi tạo base project Frontend ReactJS. |

---

## 4. Khó khăn / Cần hỗ trợ

- [x] **Đã giải quyết:** Nhóm đã thống nhất được cách thiết kế Database lưu trữ kết quả JSON từ OpenAI và xử lý triệt để các thuộc tính đa trị (Rating, Feedback) bằng cách tách/gộp bảng logic, đảm bảo giới hạn số bảng quy định (9 bảng).
- [ ] **Khó khăn hiện tại:** Do timeline 8 tuần, nhóm bắt buộc phải đẩy nhanh tiến độ làm Frontend song song với Backend từ tuần tới. 

---

*Ngày nộp: 22/03/2026*  
*Xác nhận của Nhóm trưởng: Trịnh Thị Anh Thư*

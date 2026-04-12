# Báo cáo Tuần 6

**Tuần:** 6 (06/04/2026 - 12/04/2026)  
**Nhóm:** 5  
**Đề tài:** 15 - AI Resume Screening System  
**Nhóm trưởng:** Trịnh Thị Anh Thư - 2351010205  

---

## 1. Công việc đã hoàn thành

| Thành viên | MSSV | Công việc | Link Commit/PR |
| :--- | :--- | :--- | :--- |
| **Trịnh Thị Anh Thư** | 2351010205 | Hoàn thiện logic so sánh ứng viên và tích hợp API đánh giá (`/api/evaluations`) vào giao diện chi tiết của Hiring Manager. Xử lý trạng thái duyệt/loại ứng viên đồng bộ với luồng hệ thống. | [e](https://github.com/thuttat/AI-RESUME-SCREENING/commit/...) |
| **Lê Hoàng Bảo Trân** | 2351010214 | Tối ưu hóa quy trình Parse CV, xử lý các ngoại lệ khi trích xuất dữ liệu từ OpenAI. Hoàn thiện giao diện bộ lọc ứng viên và danh sách ứng viên tiềm năng cho phân hệ Recruiter. | [e](https://github.com/thuttat/AI-RESUME-SCREENING/commit/...) |
| **Nguyễn Triệu Duy** | 2351010036 | **Backend:** Hoàn thành CRUD `EmailTemplate`, cấu hình Security fix lỗi 403 cho Role Manager, viết DataInitializer để seed dữ liệu mẫu. <br> **Frontend:** Tái cấu trúc trang `EmailTemplates` sang giao diện **Vertical Stack** tối ưu hóa trải nghiệm người dùng khi cấu hình nội dung thư. | [e](https://github.com/thuttat/AI-RESUME-SCREENING/commit/...) |

---

## 2. Tiến độ tổng thể

| Hạng mục | Trạng thái | % |
| :--- | :--- | :--- |
| Phân tích yêu cầu | Đã hoàn thành | 100% |
| Thiết kế kiến trúc / DB / API | Đã hoàn thành | 100% |
| Backend Core & Security | Đã hoàn thành | 100% |
| **API Core Business & AI** | **Đã hoàn thành** | **100%** |
| Frontend UI (Giao diện) | Đang hoàn thiện | 75% |
| Ghép nối & Kiểm thử (QA) | Đang thực hiện | 0% |

**Tổng tiến độ: ~75%** ---

## 3. Kế hoạch tuần tới (Tuần 7 - Hoàn thiện Frontend & Tích hợp API)


| Thành viên | Công việc dự kiến |
| :--- | :--- |
| **Trịnh Thị Anh Thư** | Hoàn thiện toàn bộ Frontend cho Role **Hiring Manager**: Chỉnh sửa Style chuẩn UX và gọi các API xử lý hồ sơ ứng viên còn lại. |
| **Lê Hoàng Bảo Trân** | Hoàn thiện toàn bộ Frontend cho Role **Recruiter**: Hoàn thành Style các trang quản lý và gọi toàn bộ API luồng tuyển dụng/AI trích xuất. |
| **Nguyễn Triệu Duy** | Hoàn thiện toàn bộ Frontend cho Role **Admin**: Hoàn thiện Style hệ thống, Dashboard và gọi các API quản trị, cấu hình mẫu (Email/Job Templates). |

---

## 4. Khó khăn / Cần hỗ trợ

- [x] **Đã giải quyết:** Khắc phục lỗi phân quyền **403 Forbidden** cho các phân hệ chức năng mới. Tái cấu trúc layout Form cấu hình email từ dạng dồn cục sang dạng hàng dọc (Vertical) ngay ngắn, chuẩn Tailwind.
- [ ] **Khó khăn hiện tại:** Việc đồng bộ Style giữa các Role khác nhau cần được kiểm tra kỹ để đảm bảo tính nhất quán của toàn hệ thống (Consistency).

---

*Ngày nộp: 12/04/2026* *Xác nhận của Nhóm trưởng: Trịnh Thị Anh Thư*
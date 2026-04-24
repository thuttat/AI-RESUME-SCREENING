# API documentation

## Hiring manager
1. Authentication (Xác thực và Đăng ký)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| POST | /api/auth/register | Đăng ký tài khoản Hiring Manager mới |
| POST | /api/auth/login | Xác thực Hiring Manager, trả về Access Token (JWT) |
| GET | /api/auth/me | Lấy thông tin profile của Hiring Manager đang đăng nhập |

2. Dashboard & Overview (Tổng quan)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/manager/dashboard | Thống kê tổng quan dữ liệu của Manager (Tổng đơn, đơn chờ duyệt, Shortlist, Hired...) |

3. Job Application History (Lịch sử tuyển dụng)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/jobs | Lấy danh sách các job/vị trí đang mở mà Hiring Manager này quản lý |
| GET | /api/jobs/{id} | Xem chi tiết thông tin một job cụ thể |

4. Applications & Shortlisted (Xem danh sách đơn ứng tuyển)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/applications | Lấy danh sách ứng viên nộp vào. Hỗ trợ query params: `?status=SHORTLIST` để lọc danh sách |
| PATCH | /api/applications/{id}/status | Cập nhật luồng trạng thái của đơn ứng tuyển (SHORTLIST, REJECT, HIRED) |

5. Candidates (Xem hồ sơ & So sánh)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/applications/comparison | So sánh ứng viên side-by-side (Truyền lên danh sách `?ids=1,2,3`) |

6. Evaluations (Đánh giá & Ghi Feedback phỏng vấn)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/applications/{applicationId}/evaluations | Lấy toàn bộ lịch sử đánh giá của hồ sơ (Bảng EVALUATION) |
| POST | /api/applications/{applicationId}/evaluations | Tạo một bài đánh giá mới (Gửi rating từ 1-5 và feedback) |
| PUT | /api/evaluations/{evaluationId} | Cập nhật lại nội dung bài đánh giá của chính mình |
| DELETE | /api/evaluations/{evaluationId} | Xóa một đánh giá |

---

## Recruiter
1. Dashboard

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/recruiter/dashboard | Thống kê tổng quan dữ liệu của Recruiter (Job đang mở, tổng ứng viên, Shortlist, Pending...) |

2. Job Posting (JD)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| POST | /api/jobs | Tạo job posting mới |
| GET | /api/jobs | Lấy danh sách job của recruiter (Hỗ trợ tìm kiếm, phân trang) |
| GET | /api/jobs/{id} | Lấy chi tiết một job |
| PUT | /api/jobs/{id} | Cập nhật thông tin job |
| PATCH | /api/jobs/{id}/status | Cập nhật trạng thái job (OPEN/CLOSED) |
| DELETE | /api/jobs/{id} | Xóa job |

3. Upload & AI Parsing CV

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| POST | /api/cvs/upload | Upload hàng loạt CV cho một job (Truyền `files` và `jobId`) |
| POST | /api/applications/{id}/parse | Kích hoạt AI bóc tách dữ liệu. Trả về kết quả phân tích AI Score, Kỹ năng |

4. Candidate Ranking

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/jobs/{id}/candidates | Lấy danh sách ứng viên theo job, sắp xếp rank từ cao xuống thấp theo match_score |

5. Shortlist / Reject

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| PATCH | /api/applications/{id}/status | Cập nhật trạng thái ứng viên (SHORTLIST hoặc REJECT) |

6. Email Notification

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/jobs/{id}/emails-recipients | Lấy danh sách người nhận email (Recipients) theo từng trạng thái của Job |
| POST | /api/emails/send | Gửi email cho ứng viên (Dùng BulkEmailRequest, lưu vào EMAIL_LOG) |
| GET | /api/email-logs/history | Lấy lịch sử email đã gửi theo Recruiter (Có phân trang) |
| GET | /api/email-logs | Lấy toàn bộ lịch sử email log |

7. Pipeline Report

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/reports/pipeline | Thống kê tổng quan pipeline (CV, PENDING, SHORTLIST, HIRED...) |
| GET | /api/reports/jobs/{id} | Thống kê chi tiết theo từng job |

---

## Admin
1. Dashboard

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/admin/dashboard | Lấy dữ liệu tổng hợp (Tổng Jobs, Tổng CVs, Biểu đồ thống kê CV tải lên...) |

2. Users Management

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/users | Lấy danh sách tất cả users (Bảng USERS) |
| GET | /api/users/{id} | Lấy thông tin chi tiết một User |
| POST | /api/users | Tạo tài khoản user mới |
| PUT | /api/users/{id} | Cập nhật thông tin user |
| PATCH | /api/users/{id} | Cập nhật nhanh một số trường của User (Trạng thái hoạt động, v.v) |
| DELETE | /api/users/{id} | Xóa user |
| GET | /api/users/export | Xuất danh sách users ra file dạng CSV |

3. Job Templates

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/job-templates | Lấy danh sách các mẫu tin tuyển dụng chuẩn |
| GET | /api/job-templates/{id} | Lấy chi tiết một mẫu tin tuyển dụng |
| POST | /api/job-templates | Tạo mới một mẫu tin tuyển dụng (Bảng JOB_TEMPLATE) |
| PUT | /api/job-templates/{id} | Cập nhật toàn bộ nội dung của mẫu tin |
| DELETE | /api/job-templates/{id} | Xóa mẫu tin tuyển dụng |

4. Email Templates

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/email-templates | Lấy danh sách mẫu email (Offer, Reject, Interview...) |
| POST | /api/email-templates | Tạo mới mẫu email (Bảng EMAIL_TEMPLATE) |
| PUT | /api/email-templates/{id} | Cập nhật nội dung (subject, body) của mẫu |
| DELETE | /api/email-templates/{id} | Xóa mẫu email |
| POST | /api/email-templates/{id}/preview | Xem trước nội dung email với Mock Data |

5. AI Configuration

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/ai-config | Lấy thiết lập cấu hình AI hiện tại (Bảng AI_CONFIG) |
| PUT | /api/ai-config | Cập nhật cấu hình AI |
| POST | /api/ai-config/test | Upload file test để kiểm tra kết nối API với AI |
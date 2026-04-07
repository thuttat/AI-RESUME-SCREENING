# API documentation

## Hiring manager
1. Authentication (Xác thực và Đăng ký)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| POST | /api/auth/register | Đăng ký tài khoản Hiring Manager mới |
| POST | /api/auth/login | Xác thực Hiring Manager, trả về Access Token (JWT) |
| POST | /api/auth/logout | Hủy token, đăng xuất khỏi hệ thống |
| GET | /api/auth/me | Lấy thông tin profile của Hiring Manager đang đăng nhập |

2. Job Application History (Lịch sử tuyển dụng)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/jobs | Lấy danh sách các job/vị trí đang mở mà Hiring Manager này quản lý |
| GET | /api/jobs/{job_id} | Xem chi tiết thông tin một job cụ thể |
| GET | /api/jobs/history | Lấy danh sách các chiến dịch tuyển dụng đã đóng (Lịch sử tuyển dụng) |

3. Applications & Shortlisted (Xem danh sách đơn ứng tuyển)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/jobs/{job_id}/applications | Lấy danh sách ứng viên nộp vào 1 job. Hỗ trợ query params: ?status=SHORTLIST để lọc danh sách được chọn |
| GET | /api/applications/{application_id} | Xem chi tiết một hồ sơ ứng tuyển (Kèm kết quả phân tích AI từ bảng AI_ANALYSIS_RESULT) |
| PATCH | /api/applications/{application_id}/status | Cập nhật luồng trạng thái của đơn ứng tuyển (SHORTLIST, REJECT) |

4. Candidates (Xem hồ sơ & So sánh)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/candidates/{cv_id} | Lấy thông tin cá nhân ứng viên (Bảng CV) và kỹ năng (AI_ANALYSIS_RESULT) |
| GET | /api/candidates/{cv_id}/resume | Lấy link xem file CV/Resume gốc từ Cloudinary |
| GET | /api/candidates/compare | So sánh ứng viên side-by-side dựa trên match_score và extracted_skills |

5. Evaluations (Đánh giá & Ghi Feedback phỏng vấn)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/applications/{application_id}/evaluations | Lấy toàn bộ lịch sử đánh giá của hồ sơ (Bảng EVALUATION) |
| POST | /api/applications/{application_id}/evaluations | Tạo một bài đánh giá mới (Gửi rating từ 1-5 và feedback) |
| PUT | /api/evaluations/{evaluation_id} | Cập nhật lại nội dung bài đánh giá của chính mình |
| DELETE | /api/evaluations/{evaluation_id} | Xóa một đánh giá |

6. Hiring Decisions (Quyết định tuyển dụng)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| PATCH | /api/applications/{application_id}/status | Chốt quyết định cuối cùng: HIRED (Nhận) hoặc REJECT (Từ chối) |

## Recruiter
1. Job Posting (JD)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| POST | /api/jobs | Tạo job posting mới (Dựa trên JOB_TEMPLATE) |
| GET | /api/jobs | Lấy danh sách job của recruiter (Hỗ trợ tìm kiếm, phân trang) |
| GET | /api/jobs/{id} | Lấy chi tiết một job |
| PUT | /api/jobs/{id} | Cập nhật thông tin job |
| DELETE | /api/jobs/{id} | Xóa job |

2. Upload & AI Parsing CV

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| POST | /api/cvs/upload | Upload hàng loạt CV cho một job (Lưu vào bảng CV và APPLICATION) |
| POST | /api/applications/{id}/parse | Kích hoạt AI bóc tách dữ liệu. Chuyển status PENDING -> SUCCESS |

3. Candidate Ranking

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/jobs/{id}/candidates | Lấy danh sách ứng viên theo job, sắp xếp theo match_score |
| GET | /api/candidates/{id} | Xem chi tiết ứng viên và kết quả phân tích kỹ năng của AI |

4. Shortlist / Reject

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| PATCH | /api/applications/{id}/status | Cập nhật trạng thái ứng viên (SHORTLIST hoặc REJECT) |

5. Email Notification

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| POST | /api/emails/send | Gửi email cho ứng viên (Dùng EMAIL_TEMPLATE, lưu vào EMAIL_LOG) |
| GET | /api/emails/history | Lấy lịch sử email đã gửi |

6. Pipeline Report

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/reports/pipeline | Thống kê tổng quan pipeline (CV, SUCCESS, SHORTLIST, REJECT) |
| GET | /api/reports/jobs/{id} | Thống kê chi tiết theo từng job |


## Admin
1. Users Management

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/users | Lấy danh sách tất cả users (Bảng USERS) |
| POST | /api/users | Tạo tài khoản user mới |
| PUT | /api/users/{id} | Cập nhật thông tin user |
| DELETE | /api/users/{id} | Xóa user |
| PATCH | /api/users/{id}/status | Đổi trạng thái hoạt động (ACTIVE/UNACTIVE) |
| GET | /api/users/export | Xuất danh sách users ra file CSV/Excel |

2. Job Templates

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/job-templates | Lấy danh sách các mẫu tin tuyển dụng chuẩn |
| POST | /api/job-templates | Tạo mới một mẫu tin tuyển dụng (Bảng JOB_TEMPLATE) |
| PUT | /api/job-templates/{id} | Cập nhật toàn bộ nội dung của mẫu tin |
| PATCH | /api/job-templates/{id} | Cập nhật trạng thái active/inactive của mẫu |
| DELETE | /api/job-templates/{id} | Xóa mẫu tin tuyển dụng |

3. Email Templates

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/email-templates | Lấy danh sách mẫu email (Offer, Reject, Interview...) |
| POST | /api/email-templates | Tạo mới mẫu email (Bảng EMAIL_TEMPLATE) |
| PUT | /api/email-templates/{id} | Cập nhật nội dung (subject, body) của mẫu |
| DELETE | /api/email-templates/{id} | Xóa mẫu email |
| POST | /api/email-templates/{id}/preview | Xem trước nội dung email với dữ liệu giả định |

4. AI Configuration

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/ai-config | Lấy thiết lập cấu hình AI hiện tại (Bảng AI_CONFIG) |
| PUT | /api/ai-config | Cập nhật các thông số AI (API Key, Model gpt-4o-mini) |
| POST | /api/ai-config/test | Chạy thử nghiệm AI với một file CV mẫu |

5. Dashboard / Reports

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/dashboard | Lấy dữ liệu tổng hợp (Tổng ứng viên, tỷ lệ HIRED, REJECT...) |
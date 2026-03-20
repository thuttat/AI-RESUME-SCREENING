# API documentation

## Hiring manager
1. Authentication (Đăng nhập)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| POST | /api/auth/login | Xác thực Hiring Manager, trả về Access Token (JWT) |
| POST | /api/auth/logout | Hủy token, đăng xuất khỏi hệ thống |
| GET | /api/auth/me | Lấy thông tin profile của Hiring Manager đang đăng nhập |

2. Jobs & Recruitment History (Xem lịch sử tuyển dụng)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/jobs | Lấy danh sách các job/vị trí đang mở mà Hiring Manager này phụ trách |
| GET | /api/jobs/{job_id} | Xem chi tiết thông tin một job cụ thể |
| GET | /api/jobs/history | Lấy danh sách lịch sử các chiến dịch tuyển dụng đã đóng trong quá khứ |

3. Applications & Shortlisted (Xem danh sách shortlisted)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/jobs/{job_id}/applications | Lấy danh sách ứng viên nộp vào 1 job. Hỗ trợ query params: ?status=shortlisted để lọc danh sách shortlisted |
| GET | /api/applications/{application_id} | Xem chi tiết một hồ sơ ứng tuyển (trạng thái, ngày nộp,...) |
| PATCH | /api/applications/{application_id}/status | Cập nhật trạng thái hồ sơ (ví dụ: chuyển từ Applied sang Shortlisted) |

4. Candidates (Xem hồ sơ & So sánh)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/candidates/{candidate_id} | Lấy thông tin cá nhân cơ bản của ứng viên (Tên, Email, Skills,...) |
| GET | /api/candidates/{candidate_id}/resume | Tải xuống hoặc lấy link xem file CV/Resume của ứng viên |
| GET | /api/candidates/compare | So sánh ứng viên. Truyền query params: ?ids=id1,id2,id3 để lấy data so sánh |

5. Ratings & Evaluations (Đánh giá và rating)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/applications/{application_id}/ratings | Lấy toàn bộ các đánh giá (điểm số, nhận xét sơ bộ) của hồ sơ này |
| POST | /api/applications/{application_id}/ratings | Tạo một bài đánh giá/chấm điểm mới cho ứng viên |
| PUT | /api/ratings/{rating_id} | Cập nhật điểm số/đánh giá đã tạo |
| DELETE | /api/ratings/{rating_id} | Xóa một đánh giá bị sai |

6. Interviews & Feedback (Ghi feedback phỏng vấn)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/applications/{application_id}/interviews |  |
| GET | /api/interviews/{interview_id}/feedbacks | Xem các feedback đã ghi lại trong một buổi phỏng vấn cụ thể |
| POST| /api/interviews/{interview_id}/feedbacks | Ghi nhận xét, feedback mới sau khi phỏng vấn xong |
| PUT| /api/feedbacks/{feedback_id} | Chỉnh sửa nội dung feedback phỏng vấn |
| DELETE| /api/feedbacks/{feedback_id} | Xóa feedback phỏng vấn |

7. Hiring Decisions (Quyết định tuyển dụng)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/applications/{application_id}/decision | Xem quyết định cuối cùng của hồ sơ này (Offer, Reject, Keep in pool) |
| POST | /api/applications/{application_id}/decision | Tạo quyết định tuyển dụng (chốt pass/fail và đính kèm lý do/mức lương đề xuất) |
| PUT | /api/decisions/{decision_id} | Cập nhật lại quyết định nếu có thay đổi (ví dụ: ứng viên từ chối offer) |
| DELETE | /api/decisions/{decision_id} | Thu hồi quyết định tuyển dụng. |

## Recruiter
1. Job Posting (JD)

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| POST | /api/jobs | Tạo job posting mới |
| GET | /api/jobs | Lấy danh sách job của recruiter(có search, pagination) |
| GET | /api/jobs/{id} | Lấy chi tiết một job |
| PUT | /api/jobs/{id} | Cập nhật thông tin job |
| DELETE | /api/jobs/{id} | Xóa job |

2. Upload & AI Parsing CV

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| POST | /api/cvs/upload | Upload nhiều CV cho một job |
| POST | /api/cvs/{id}/parse | Gửi CV vào hệ thống AI để phân tích(async) |

3. Candidate Ranking

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/jobs/{id}/candidates | Lấy danh sách ứng viên theo job, kèm ranking( score) |
| GET | /api/candidates/{id} | Xem chi tiết một ứng viên |

4. Shortlist / Reject

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| PATCH | /api/candidates/{id}/status | Cập nhật trạng thái ứng viên( Shortlisted/ Rejected) |

5. Email Notification

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| POST | /api/emails/send | Gửi email cho một hoặc nhiều ứng viên |
| GET | /api/emails/history | Lấy lịch sử email đã gửi |

6. Pipeline Report

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/reports/pipeline | Thống kê tổng pipeline( CV, parsed, shortlisted, rejected) |
| GET | /api/reports/jobs/{id} | Thống kê chi tiết theo từng job |


## Admin
1. Users Management

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/users | Lấy danh sách users |
| POST | /api/users | Tạo user |
| PUT | /api/users/{id} | Cập nhật user |
| DELETE | /api/users/{id} | Xóa user |
| PATCH | /api/users/{id}/status | Đổi trạng thái( Optional) |
| GET | /api/users/export | Export users( trả file CSV hoặc Excel) |

2. Job Templates

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/job-templates | Lấy danh sách các mẫu tin tuyển dụng (có hỗ trợ phân trang, lọc, tìm kiếm) |
| POST | /api/job-templates | Tạo mới một mẫu tin tuyển dụng (ví dụ: form chuẩn cho vị trí Frontend, Backend) |
| PUT | /api/job-templates/{id} | Cập nhật toàn bộ nội dung của một mẫu tin tuyển dụng cụ thể |
| PATCH | /api/job-templates/{id} | Cập nhật một phần thông tin (ví dụ: chỉ đổi tiêu đề hoặc đổi trạng thái active/inactive) |
| DELETE | /api/job-templates/{id} | Xóa một mẫu tin tuyển dụng khỏi hệ thống |

3. Email Templates

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/email-templates | Lấy danh sách các mẫu email (mời phỏng vấn, báo kết quả đậu/rớt, gửi offer...) |
| POST | /api/email-templates | Tạo mới một mẫu email với các biến động |
| PUT | /api/email-templates/{id} | Cập nhật nội dung (subject, body) của một mẫu email cụ thể |
| DELETE | /api/email-templates/{id} | Xóa mẫu email không còn sử dụng |
| POST | /api/email-templates/{id}/preview | Xem trước (render) mẫu email với một dữ liệu giả định để kiểm tra các biến động có hoạt động đúng không |

4. AI Configuration

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/ai-config | Lấy các thiết lập cấu hình AI hiện tại |
| PUT | /api/ai-config | Cập nhật lại các thông số thiết lập cấu hình AI cho hệ thống |
| POST | /api/ai-config/test | Chạy thử nghiệm cấu hình AI hiện tại với một file CV mẫu để kiểm tra độ chính xác trước khi áp dụng thực tế|

5. Dashboard / Reports

| Method | Endpoint | Description (Mô tả) |
|----------|------------|----------------------|
| GET | /api/dashboard | Lấy dữ liệu tổng hợp cho màn hình chính (tổng số ứng viên, số cuộc phỏng vấn sắp tới, tỷ lệ tuyển dụng thành công theo thời gian...) |

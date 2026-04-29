# Thiết Kế Cơ Sở Dữ Liệu (Database Design)

**Dự án:** 15 - AI Resume Screening System
**Hệ quản trị CSDL:** MySQL

---

## 1. Sơ đồ Thực thể - Liên kết (ERD)

![Sơ đồ ERD](../docs/assets/ERD.png)

---

## 2. Chi tiết Lược đồ CSDL (Database Schema)

### 2.1. Bảng `users`
Quản lý người dùng hệ thống (Admin, Recruiter, Hiring Manager).

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK | AUTO_INCREMENT | ID người dùng |
| `username` | VARCHAR(50) | | NOT NULL, UNIQUE | Tên đăng nhập |
| `password` | VARCHAR(255) | | NOT NULL | Mật khẩu đã mã hóa |
| `email` | VARCHAR(100) | | NOT NULL, UNIQUE | Email liên lạc |
| `fullname` | VARCHAR(100) | | NOT NULL | Họ và tên đầy đủ |
| `role` | VARCHAR(20) | | NOT NULL | Vai trò (ADMIN, RECRUITER, HIRING_MANAGER) |
| `status` | VARCHAR(20) | | DEFAULT 'ACTIVE' | Trạng thái (ACTIVE, INACTIVE) |
| `created_at` | TIMESTAMP | | DEFAULT NOW() | Ngày tạo tài khoản |

### 2.2. Bảng `job_postings`
Thông tin các vị trí tuyển dụng do Recruiter đăng tải.

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK | AUTO_INCREMENT | ID tin tuyển dụng |
| `title` | VARCHAR(255) | | NOT NULL | Tiêu đề công việc |
| `description` | TEXT | | NOT NULL | Mô tả công việc (JD) |
| `requirements` | TEXT | | | Yêu cầu công việc |
| `required_skills`| TEXT | | | Kỹ năng cần thiết (comma-separated) |
| `status` | VARCHAR(20) | | DEFAULT 'OPEN' | Trạng thái (OPEN, CLOSED) |
| `created_by` | BIGINT | FK | -> users(id) | Người tạo tin |
| `created_at` | TIMESTAMP | | DEFAULT NOW() | Ngày đăng |

### 2.3. Bảng `cvs`
Kho lưu trữ thông tin file hồ sơ ứng viên (Physical store).

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK | AUTO_INCREMENT | ID hồ sơ |
| `candidate_name`| VARCHAR(100) | | NOT NULL | Tên ứng viên trên CV |
| `candidate_email`| VARCHAR(100) | | NOT NULL | Email ứng viên |
| `cv_file_url` | VARCHAR(255) | | NOT NULL | Đường dẫn file (Cloudinary/S3) |
| `uploaded_by` | BIGINT | FK | -> users(id) | Người tải lên |
| `created_at` | TIMESTAMP | | DEFAULT NOW() | Ngày tải lên |

### 2.4. Bảng `applications`
Lưu trữ các đơn ứng tuyển và kết quả AI tương ứng cho từng tin tuyển dụng.

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK | AUTO_INCREMENT | ID đơn ứng tuyển |
| `job_id` | BIGINT | FK | -> job_postings(id)| Ứng tuyển vào vị trí nào |
| `cv_id` | BIGINT | FK | -> cvs(id) | Sử dụng bản CV nào |
| `status` | VARCHAR(20) | | DEFAULT 'PENDING' | PENDING, SHORTLIST, HIRED, REJECT |
| `match_score` | DECIMAL(5,2) | | | Điểm AI đánh giá (%) |
| `critique` | TEXT | | | Nhận xét chi tiết từ AI |
| `extracted_skills`| TEXT | | | Kỹ năng AI bóc tách được |
| `years_of_experience`| DECIMAL(4,1)| | | Số năm kinh nghiệm AI tính |
| `note` | TEXT | | | Ghi chú thêm của Recruiter |
| `created_at` | TIMESTAMP | | DEFAULT NOW() | Ngày nộp đơn |

### 2.5. Bảng `ai_analysis_results`
Kho lưu trữ kết quả parse CV gốc từ AI (Sử dụng cho mục đích caching/re-use).

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK | AUTO_INCREMENT | ID bản ghi |
| `cv_id` | BIGINT | FK | -> cvs(id), UNIQUE | Kết quả thuộc về CV nào |
| `raw_json_response`| JSON / TEXT | | | Dữ liệu gốc trả về từ OpenAI |
| `match_score` | DECIMAL(5,2) | | | Điểm trung bình |
| `created_at` | TIMESTAMP | | DEFAULT NOW() | Thời điểm phân tích |

### 2.6. Bảng `evaluations`
Đánh giá thủ công của Hiring Manager sau các vòng phỏng vấn.

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK | AUTO_INCREMENT | ID đánh giá |
| `application_id`| BIGINT | FK | -> applications(id)| Thuộc đơn ứng tuyển nào |
| `evaluator_id` | BIGINT | FK | -> users(id) | Người thực hiện đánh giá |
| `rating` | INT | | CHECK (1-5) | Số sao đánh giá |
| `feedback` | TEXT | | | Nhận xét/Phản hồi |
| `created_at` | TIMESTAMP | | DEFAULT NOW() | Ngày đánh giá |

### 2.7. Bảng `email_templates`
Mẫu email hệ thống để tự động gửi thông báo cho ứng viên.

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK | AUTO_INCREMENT | ID mẫu |
| `type` | VARCHAR(50) | | NOT NULL | Loại (OFFER_TEMPLATE, REJECT_TEMPLATE) |
| `template_name` | VARCHAR(100) | | | Tên hiển thị của mẫu |
| `subject` | VARCHAR(255) | | NOT NULL | Tiêu đề email |
| `body` | TEXT | | NOT NULL | Nội dung (chứa placeholders) |
| `is_active` | BOOLEAN | | DEFAULT TRUE | Trạng thái mẫu |

### 2.8. Bảng `email_logs`
Lịch sử gửi email hệ thống để theo dõi (Email Tracking).

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK | AUTO_INCREMENT | ID log |
| `application_id`| BIGINT | FK | -> applications(id)| Email gửi cho đơn nào |
| `subject` | VARCHAR(255) | | | Tiêu đề đã gửi |
| `body` | TEXT | | | Nội dung đã gửi |
| `status` | VARCHAR(20) | | | SENT, FAILED, PENDING |
| `sent_at` | TIMESTAMP | | DEFAULT NOW() | Thời điểm gửi thành công |

### 2.9. Bảng `job_templates`
Kho mẫu mô tả công việc (JD) tiêu chuẩn.

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK | AUTO_INCREMENT | ID mẫu |
| `title` | VARCHAR(255) | | NOT NULL | Tiêu đề vị trí |
| `department` | VARCHAR(100) | | | Phòng ban |
| `description` | TEXT | | | Mô tả chi tiết |
| `requirements` | TEXT | | | Yêu cầu chi tiết |
| `is_active` | BOOLEAN | | DEFAULT TRUE | Trạng thái mẫu |

---

## 3. Các mối quan hệ (Relationships)

1. **users - job_postings (1:N)**: Một người dùng (Recruiter) có thể đăng và quản lý nhiều tin tuyển dụng.
2. **users - cvs (1:N)**: Một Recruiter có quyền tải lên nhiều CV vào kho dữ liệu của hệ thống.
3. **job_postings - applications (1:N)**: Một vị trí tuyển dụng nhận được nhiều đơn ứng tuyển từ các ứng viên khác nhau.
4. **cvs - applications (1:N)**: Một bản CV trong kho có thể được sử dụng để ứng tuyển vào nhiều vị trí công việc khác nhau.
5. **cvs - ai_analysis_results (1:1)**: Mỗi bản CV chỉ có một kết quả phân tích dữ liệu gốc duy nhất từ hệ thống AI.
6. **applications - evaluations (1:N)**: Một đơn ứng tuyển có thể trải qua nhiều vòng phỏng vấn và nhận nhiều đánh giá từ Hiring Manager.
7. **applications - email_logs (1:N)**: Hệ thống ghi lại toàn bộ lịch sử các email (Offer/Reject) đã gửi cho một ứng viên cụ thể.
8. **users - evaluations (1:N)**: Một Hiring Manager có thể thực hiện đánh giá cho nhiều ứng viên khác nhau.
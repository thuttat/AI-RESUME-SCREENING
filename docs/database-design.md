# Thiết Kế Cơ Sở Dữ Liệu (Database Design)

**Dự án:** 15 - AI Resume Screening System
**Hệ quản trị CSDL:** MySQL

---

## 1. Sơ đồ Thực thể - Liên kết (ERD)

![Sơ đồ ERD](../docs/assets/ERD.png)

---

## 2. Chi tiết Lược đồ CSDL (Database Schema)
Hệ thống bao gồm 9 bảng chính

### 2.1. Bảng `User`
Lưu trữ thông tin tài khoản, phân quyền của Admin, Recruiter và Hiring Manager.

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT | PK | AUTO_INCREMENT | ID người dùng |
| `fullname` | VARCHAR(100) | | NOT NULL | Họ và tên |
| `email` | VARCHAR(100) | | NOT NULL, UNIQUE| Email đăng nhập |
| `password` | VARCHAR(255) | | NOT NULL | Mật khẩu |
| `role` | VARCHAR(20) | | NOT NULL | Vai trò (ADMIN, RECRUITER, HIRING_MANAGER) |
| `status` | VARCHAR(20) | | DEFAULT 'ACTIVE'| Trạng thái tài khoản |

### 2.2. Bảng `AI_Config`
Lưu trữ các cấu hình và trọng số AI do Admin thiết lập.

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT | PK | AUTO_INCREMENT | ID cấu hình |
| `config_key` | VARCHAR(50) | | NOT NULL, UNIQUE| Tên cấu hình |
| `config_value`| VARCHAR(255) | | NOT NULL | Giá trị |
| `updated_by` | INT | FK | -> User(id) | Admin cập nhật |
| `updated_at` | TIMESTAMP | | | Thời gian cập nhật |

### 2.3. Bảng `Job_Template`
Lưu trữ các mẫu mô tả công việc (JD) do Admin tạo để dùng lại.

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT | PK | AUTO_INCREMENT | ID mẫu |
| `title` | VARCHAR(255) | | NOT NULL | Tiêu đề mẫu |
| `description` | TEXT | | NOT NULL | Nội dung JD |
| `created_by` | INT | FK | -> User(id) | Admin tạo |

### 2.4. Bảng `Email_Template`
Lưu trữ các mẫu email hệ thống (Mời phỏng vấn, Từ chối).

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT | PK | AUTO_INCREMENT | ID mẫu email |
| `template_name`|VARCHAR(100) | | NOT NULL | Tên loại email |
| `subject` | VARCHAR(255) | | NOT NULL | Tiêu đề email |
| `body` | TEXT | | NOT NULL | Nội dung |

### 2.5. Bảng `Job_Posting`
Quản lý các tin tuyển dụng thực tế do Recruiter đăng tải.

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT | PK | AUTO_INCREMENT | ID tin tuyển dụng |
| `title` | VARCHAR(255) | | NOT NULL | Tiêu đề job |
| `description` | TEXT | | NOT NULL | Nội dung chi tiết |
| `required_skills`| TEXT | | | Kỹ năng yêu cầu |
| `status` | VARCHAR(20) | | DEFAULT 'OPEN' | Trạng thái (OPEN, CLOSED) |
| `created_at` | TIMESTAMP | | DEFAULT NOW() | Ngày tạo |
| `created_by` | INT | FK | -> User(id) | Người tạo (Recruiter) |

### 2.6. Bảng `CV` (Kho hồ sơ)
Lưu trữ thông tin vật lý của file CV ứng viên.

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT | PK | AUTO_INCREMENT | ID file CV |
| `candidate_name`|VARCHAR(100) | | NOT NULL | Tên ứng viên |
| `candidate_email`|VARCHAR(100) | | NOT NULL | Email ứng viên |
| `cv_file_url` | VARCHAR(255) | | NOT NULL | Link file PDF/Word của CV |
| `uploaded_by` | INT | FK | -> User(id) | Recruiter upload |
| `uploaded_at` | TIMESTAMP | | DEFAULT NOW() | Thời gian tải lên |

### 2.7. Bảng `Application` (Đơn ứng tuyển)
Lưu trữ lịch sử ứng tuyển: File CV nào được nộp vào Job nào. Cột `status` đồng thời đóng vai trò lưu trữ Quyết định tuyển dụng (Decision).

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT | PK | AUTO_INCREMENT | ID đơn ứng tuyển |
| `job_id` | INT | FK | -> Job_Posting(id)| Ứng tuyển vào Job nào |
| `cv_id` | INT | FK | -> CV(id) | Dùng CV nào để nộp |
| `status` | VARCHAR(20) | | DEFAULT 'PENDING'| Trạng thái (PENDING, SHORTLISTED, HIRED, REJECTED) |
| `applied_at` | TIMESTAMP | | DEFAULT NOW() | Thời gian nộp đơn |

### 2.8. Bảng `AI_Analysis_Result`
Lưu kết quả phân tích và điểm đánh giá chung cho một file CV từ hệ thống AI (OpenAI API).

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT | PK | AUTO_INCREMENT | ID kết quả |
| `cv_id` | INT | FK | -> CV(id) | Phân tích từ CV nào (UNIQUE) |
| `match_score` | DECIMAL(5,2) | | | Điểm phù hợp (0-100) |
| `extracted_skills`|TEXT | | | Các kỹ năng AI bóc tách |
| `years_of_experience`| DECIMAL(4,1) | | | Số năm kinh nghiệm AI tính |
| `raw_json_response`| JSONB / TEXT| | | Kết quả JSON gốc từ API |

### 2.9. Bảng `Evaluation`
Lưu trữ đánh giá thủ công và ghi chú nhận xét phỏng vấn của Hiring Manager.

| Tên cột | Kiểu dữ liệu | Khóa | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `id` | INT | PK | AUTO_INCREMENT | ID đánh giá |
| `application_id`| INT | FK | -> Application(id)| Đánh giá cho đơn ứng tuyển nào |
| `evaluator_id` | INT | FK | -> User(id) | Hiring Manager đánh giá |
| `rating` | INT | | CHECK (1-5) | Điểm số (1-5 sao) |
| `feedback` | TEXT | | | Nhận xét phỏng vấn |
| `created_at` | TIMESTAMP | | DEFAULT NOW() | Thời gian tạo đánh giá |

---

## 3. Các mối quan hệ (Relationships)

1. **User - JobPosting (Create):** Quan hệ **1-N**. Một Recruiter tạo nhiều tin tuyển dụng.
2. **User - CV (Upload):** Quan hệ **1-N**. Một Recruiter có thể tải lên nhiều file CV vào kho lưu trữ.
3. **JobPosting - Application (Apply):** Quan hệ **1-N**. Một vị trí tuyển dụng sẽ có nhiều đơn ứng tuyển.
4. **CV - Application:** Quan hệ **1-N**. Một CV có thể được sử dụng để nộp (apply) cho nhiều vị trí công việc khác nhau.
5. **CV - AIAnalysisResult (Parse):** Quan hệ **1-1**. Mỗi file CV tải lên chỉ cần parse qua AI 1 lần duy nhất, kết quả này sẽ được lưu để đối chiếu.
6. **Application - Evaluation (Feedback):** Quan hệ **1-N**. Một đơn ứng tuyển có thể nhận được nhiều đánh giá/feedback qua các vòng phỏng vấn khác nhau.
7. **User - Evaluation (Evaluate):** Quan hệ **1-N**. Một Hiring Manager có thể tham gia đánh giá nhiều hồ sơ ứng viên.

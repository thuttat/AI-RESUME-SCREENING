# AI RESUME SCREENING SYSTEM

---
## Mô tả
Hệ thống sàng lọc hồ sơ ứng viên ứng dụng AI, được xây dựng bằng Spring Boot và React. Hệ thống tự động phân tích CV, thực hiện so khớp ngữ nghĩa với mô tả công việc (JD) và xếp hạng ứng viên nhằm hỗ trợ nhà tuyển dụng đưa ra quyết định tuyển dụng nhanh chóng và chính xác hơn.

---
## Thành viên nhóm
| MSSV       | Họ tên | Vai trò                                                                | 
|------------|--------|------------------------------------------------------------------------| 
| 2351010205 | Trịnh Thị Anh Thư	 | Leader, Project Manager, Backend & Frontend Developer cho Module Admin | 
| 2351010214 | Lê Hoàng Bảo Trân	 | Backend & Frontend Developer cho Module Recruiter                      | 
| 2351010036 | Nguyễn Triệu Duy	 | Backend & Frontend Developer cho Module Hiring Manager                 |

---
## Tính năng chính (MVP)
- [ ] RECRUITER:
- Tạo Job Posting (JD)
- Upload và parse CV bằng AI
- Xem ranking ứng viên
- Shortlist/Reject ứng viên
- Gửi email thông báo
- Xem báo cáo pipeline
- [ ] HIRING MANAGER:
- Xem danh sách shortlisted
- So sánh ứng viên side-by-side
- Đánh giá và rating ứng viên
- Ghi feedback phỏng vấn
- Quyết định tuyển dụng
- Xem lịch sử tuyển dụng
- [ ] ADMIN:
- Quản lý users (CRUD)
- Quản lý job templates
- Cấu hình AI parsing rules
- Cấu hình skill weighting
- Báo cáo hệ thống
- Quản lý email templates

---
## Công nghệ sử dụng
- Backend: Spring Boot 
- Frontend: React
- Database: MySQL 
- AI: OpenAI API

---
## Cài đặt và chạy
### Yêu cầu
- Java 17+ 
- Node.js 18+
- MySQL
### Chạy Backend
cd backend

./mvnw spring-boot:run
### Chạy Frontend
cd frontend

npm install

npm start
### Truy cập
- Frontend: http://localhost:3000 
- Backend API: http://localhost:8080

---
## Demo
[Link video demo hoặc screenshots]

---
## Tài liệu
- [Phân tích yêu cầu](docs/requirements.md) 
- [Database Design](docs/database-design.md) 
- [API Documentation](docs/api-docs.md)
# Phân tích yêu cầu: AI Resume Screening System

## Sơ đồ Use case:
![UseCase Diagram](./assets/image.png)

## Wireframe:
[Xem chi tiết wireframe Recruiter](./assets/Wireframe_recruiter.pdf)

[Xem chi tiết wireframe Hiring manager](./assets/Wireframe_hiring_manager.pdf)

[Xem chi tiết wireframe Admin](./assets/Wireframe_admin.pdf)

## AI Integration Workflow
### 📌Quy trình thực hiện luồng xử lý của OpenAI API
1. Tải lên CV
2. Trích xuất văn bản từ CV (phân tích PDF/DOC)
3. Xử lý sơ bộ và lọc thông tin liên quan
4. Gửi nội dung CV + Mô tả công việc -> API OpenAI
5. AI phân tích thông tin ứng viên
6. Chấm điểm phù hợp và đầu ra có cấu trúc JSON
7. Lưu kết quả vào cơ sở dữ liệu
8. Hiển thị xếp hạng ứng viên cho nhà tuyển dụng

### 📌Quy trình chấm điểm CV bằng AI
- Trích xuất kỹ năng của ứng viên
- Xác định số năm kinh nghiệm
- So sánh kỹ năng với yêu cầu của công việc
- Tính toán match score (0–100)
- Trả về kết quả ở dạng dữ liệu có cấu trúc (JSON)
- VD:
```
{
  "candidate_name": "Nguyen Van A",
  "skills": ["Java", "Spring Boot", "MySQL"],
  "experience_years": 3,
  "match_score": 82,
  "matching_skills": ["Java", "Spring Boot"],
  "missing_skills": ["Docker"]
}
```

### 📌Chiến lược tối ưu chi phí khi sử dụng OpenAI API
**1. Tiền xử lý CV trước khi gửi**

Loại bỏ các phần ít liên quan như Objective, Activities hoặc Interests và chỉ gửi các phần quan trọng của CV như:
- Skills
- Work Experience
- Education

**2. Rút gọn Job Description**

Thay vì gửi toàn bộ JD, chỉ gửi các yêu cầu quan trọng:
- Required skills
- Minimum experience
- Preferred technologies

**3. Thiết kế prompt ngắn gọn**

Prompt được viết dưới dạng instruction ngắn gọn thay vì đoạn văn dài. 

VD:
```
Đánh giá mức độ phù hợp của ứng viên với mô tả công việc.
Nhiệm vụ:
- Trích xuất kỹ năng của ứng viên
- Ước tính số năm kinh nghiệm
- So sánh với yêu cầu công việc
- Cung cấp điểm số phù hợp (0–100)
Chỉ trả về kết quả ở định dạng JSON.
```
**4. Quản lý rủi ro**
- OpenAI API bị sập hoặc quá tải -> backend cấu hình timeout là 30s, frontend báo lỗi nếu quá hạn.
- AI trả sai định dạng -> dùng try-catch khi parse JSON, ghi log và báo thử lại.
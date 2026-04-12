import React, { useState } from "react";
import { Card } from "../../../components/common/Card";
import { Button } from "../../../components/common/Button";
import { ThumbsDown, ThumbsUp, Star } from "lucide-react"; // Đã thêm Star vào đây
import api from "../../../api/AxiosClient";

export default function EvaluationForm({ appId, candidateName, onClose }) {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    const handleAction = async (status) => {
        if (rating === 0) {
            alert("Vui lòng chọn mức điểm đánh giá (sao)!");
            return;
        }
        try {
            // Gửi đánh giá cho Backend
            await api.post(`/applications/${appId}/evaluations`, { 
                rating: rating, 
                feedback: feedback 
            });

            // Cập nhật trạng thái ứng viên
            await api.patch(`/applications/${appId}/status`, { 
                status: status, 
                note: feedback 
            });

            alert("Đã xử lý thành công!");
            onClose();
        } catch (error) { 
            console.error("Lỗi:", error.response?.data);
            const msg = error.response?.data?.message || "Lỗi hệ thống khi lưu đánh giá!";
            alert(msg); 
        }
    };

    return (
        <Card className="max-w-2xl mx-auto shadow-2xl border-none">
            <div className="p-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Đánh giá ứng viên: {candidateName}</h3>
                
                {/* Bộ chọn sao kế thừa Tailwind CSS */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Điểm đánh giá chuyên môn
                    </label>
                    <div className="flex items-center gap-2 bg-yellow-50/30 p-3 rounded-xl border border-yellow-100/50 w-fit">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setRating(s)}
                                    // Hiệu ứng hover và scale của Tailwind
                                    className={`transition-all duration-200 transform hover:scale-125 focus:outline-none`}
                                >
                                    <Star 
                                        size={28} 
                                        className={`${
                                            s <= rating 
                                            ? "text-yellow-400 fill-yellow-400" 
                                            : "text-gray-300"
                                        }`} 
                                    />
                                </button>
                            ))}
                        </div>
                        {rating > 0 && (
                            <span className="ml-3 text-sm font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-lg">
                                {rating}/5 sao
                            </span>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nhận xét chi tiết</label>
                    <textarea 
                        className="w-full p-4 border border-gray-200 rounded-xl min-h-[150px] focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50/30"
                        placeholder="VD: Kỹ năng chuyên môn tốt, thái độ cầu tiến..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>

                <div className="flex justify-end gap-3 border-t pt-5">
                    <Button 
                        variant="outline" 
                        onClick={() => handleAction('REJECT')} 
                        className="text-red-600 border-red-200 hover:bg-red-50 px-6"
                    >
                        <ThumbsDown size={18} className="mr-2"/> Loại
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={() => handleAction('HIRED')} 
                        className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100 px-6"
                    >
                        <ThumbsUp size={18} className="mr-2"/> Tuyển dụng (Gửi Offer)
                    </Button>
                </div>
            </div>
        </Card>
    );
}
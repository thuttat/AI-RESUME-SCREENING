import React, { useState } from "react";
import { Card } from "../../../components/common/Card";
import { Button } from "../../../components/common/Button";
import { Send, ThumbsDown, ThumbsUp } from "lucide-react";
import api from "../../../services/api";

export default function EvaluationForm({ appId, candidateName, onClose }) {
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState("");

    const handleAction = async (status) => {
        try {
            // Gửi feedback trước
            await api.post(`/applications/${appId}/evaluations`, { rating, feedback });
            // Sau đó chốt status để BE gửi mail
            await api.patch(`/applications/${appId}/status`, { status, note: feedback });
            alert("Đã xử lý và gửi mail thông báo!");
            onClose();
        } catch (error) { alert("Lỗi gửi dữ liệu!"); }
    };

    return (
        <Card className="max-w-2xl mx-auto shadow-2xl">
            <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Đánh giá: {candidateName}</h3>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Điểm đánh giá (1-5 sao)</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(s => (
                            <button key={s} onClick={() => setRating(s)} className={`w-10 h-10 rounded ${rating >= s ? 'bg-yellow-400 text-white' : 'bg-gray-100'}`}>★</button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Nhận xét chi tiết</label>
                    <textarea 
                        className="w-full p-3 border rounded-lg min-h-[150px] focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Viết nhận xét về năng lực ứng viên..."
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>

                <div className="flex justify-end gap-3 border-t pt-4">
                    <Button variant="outline" onClick={() => handleAction('REJECT')} className="text-red-600 border-red-200 hover:bg-red-50">
                        <ThumbsDown size={18} className="mr-2"/> Loại
                    </Button>
                    <Button variant="primary" onClick={() => handleAction('HIRED')} className="bg-green-600 hover:bg-green-700">
                        <ThumbsUp size={18} className="mr-2"/> Tuyển dụng (Gửi Offer)
                    </Button>
                </div>
            </div>
        </Card>
    );
}
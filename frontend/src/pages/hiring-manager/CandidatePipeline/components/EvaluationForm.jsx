import React, { useState } from "react";
import { Card } from "../../../../components/common/Card";
import { Button } from "../../../../components/common/Button";
import { ThumbsDown, ThumbsUp, Star } from "lucide-react";
import api from "../../../../apis/AxiosClient";

export default function EvaluationForm({ appId, candidateName, onClose }) {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    const handleAction = async (status) => {
        if (rating === 0) return alert("Pls rating first!");
        try {
            await api.post(`/applications/${appId}/evaluations`, { rating, feedback });
            await api.patch(`/applications/${appId}/status`, { status, note: feedback });
            onClose();
        } catch (error) { alert("Error can not save!"); }
    };

    return (
        <Card className="p-8 bg-white rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-2">Evaluate candidate</h2>
            <p className="text-gray-500 mb-6">{candidateName}</p>
            <div className="flex gap-2 mb-6">
                {[1,2,3,4,5].map(s => (
                    <Star key={s} size={30} className={`cursor-pointer ${rating >= s ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} onClick={() => setRating(s)}/>
                ))}
            </div>
            <textarea className="w-full p-4 border rounded-xl min-h-[120px] mb-6 outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nhận xét..." value={feedback} onChange={e => setFeedback(e.target.value)}/>
            <div className="flex justify-end gap-3">
                <Button variant="outline" className="text-red-500" onClick={() => handleAction('REJECT')}><ThumbsDown size={18} className="mr-2"/> Reject</Button>
                <Button variant="primary" className="bg-green-600" onClick={() => handleAction('HIRED')}><ThumbsUp size={18} className="mr-2"/> Hired</Button>
            </div>
        </Card>
    );
}
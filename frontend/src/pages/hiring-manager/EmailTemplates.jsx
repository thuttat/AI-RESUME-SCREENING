import React, { useState, useEffect } from "react";
import api from "../../api/AxiosClient";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Settings, Loader2, Save, FileText, User, Type, AlignLeft } from "lucide-react";

export default function EmailTemplates() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState("");
    const [editForm, setEditForm] = useState({ subject: "", body: "" });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = () => {
        setLoading(true);
        api.get("/email-templates")
            .then(res => {
                const data = res.data.content || res.data || [];
                setTemplates(data);
                if (data.length > 0) {
                    const first = data[0];
                    setSelectedId(first.id);
                    setEditForm({ subject: first.subject, body: first.body });
                }
            })
            .catch(err => console.error("Lỗi:", err))
            .finally(() => setLoading(false));
    };

    const handleSelectChange = (id) => {
        const template = templates.find(t => t.id === Number(id));
        if (template) {
            setSelectedId(id);
            setEditForm({ subject: template.subject, body: template.body });
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const currentTemplate = templates.find(t => t.id === Number(selectedId));
            await api.put(`/email-templates/${selectedId}`, {
                ...editForm,
                templateName: currentTemplate?.templateName
            });
            alert("Đã lưu thành công!");
            setTemplates(templates.map(t => t.id === Number(selectedId) ? { ...t, ...editForm } : t));
        } catch (error) {
            alert("Lỗi khi lưu!");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center font-bold">Đang tải...</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white min-h-screen">
            {/* 1. Header riêng 1 hàng */}
            <div className="flex items-center gap-3 mb-10 border-b pb-6">
                <Settings className="text-blue-600" size={28} />
                <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">Cấu hình Mẫu Email</h1>
            </div>

            <div className="flex flex-col gap-8">
                
                {/* 2. Combo Box riêng 1 hàng */}
                <div className="flex flex-col w-full gap-3">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <FileText size={18} className="text-blue-500" /> CHỌN LOẠI MẪU EMAIL
                    </label>
                    <select 
                        className="w-full h-14 px-5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all font-semibold text-gray-700 shadow-sm"
                        value={selectedId}
                        onChange={(e) => handleSelectChange(e.target.value)}
                    >
                        {templates.map(t => (
                            <option key={t.id} value={t.id}>{t.templateName}</option>
                        ))}
                    </select>
                </div>

                {/* 3. Biến Candidate Name riêng 1 hàng */}
                <div className="flex flex-col w-full gap-3">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <User size={18} className="text-gray-400" /> BIẾN: TÊN ỨNG VIÊN (KHÔNG ĐỔI)
                    </label>
                    <div className="w-full h-14 px-5 bg-gray-100 border-2 border-gray-100 rounded-xl flex items-center text-gray-500 font-mono font-bold shadow-inner">
                        [CandidateName]
                    </div>
                </div>

                {/* 4. Input Subject riêng 1 hàng */}
                <div className="flex flex-col w-full gap-3">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Type size={18} className="text-blue-500" /> TIÊU ĐỀ EMAIL (SUBJECT)
                    </label>
                    <input 
                        className="w-full h-14 px-5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-800 shadow-sm"
                        placeholder="Nhập tiêu đề thư..."
                        value={editForm.subject}
                        onChange={(e) => setEditForm({...editForm, subject: e.target.value})}
                    />
                </div>

                {/* 5. Textarea Body riêng 1 hàng */}
                <div className="flex flex-col w-full gap-3">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <AlignLeft size={18} className="text-blue-500" /> NỘI DUNG EMAIL (BODY)
                    </label>
                    <textarea 
                        className="w-full px-5 py-5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all min-h-[350px] font-sans text-gray-800 leading-relaxed shadow-sm resize-none"
                        placeholder="Nhập nội dung chi tiết..."
                        value={editForm.body}
                        onChange={(e) => setEditForm({...editForm, body: e.target.value})}
                    />
                </div>

                {/* 6. Nút Lưu riêng 1 hàng */}
                <div className="flex justify-start pb-10">
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full md:w-60 bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl font-bold shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        LƯU CẤU HÌNH
                    </button>
                </div>
            </div>
        </div>
    );
}
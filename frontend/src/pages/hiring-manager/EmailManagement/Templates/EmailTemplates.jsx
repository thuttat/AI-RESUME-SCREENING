import React, { useState, useEffect } from "react";
import api from "../../../../apis/AxiosClient";
import { Card, CardHeader, CardBody } from "../../../../components/common/Card";
import { Button } from "../../../../components/common/Button";
import { Settings, Save, FileText, Type, AlignLeft, Loader2, CheckCircle, Info } from "lucide-react";
import "./EmailTemplates.css";

export default function EmailTemplates() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [editForm, setEditForm] = useState({ subject: "", body: "" });
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchTemplates(); }, []);

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const res = await api.get("/email-templates");
            const data = res.data.content || res.data || [];
            setTemplates(data);
            if (data.length > 0) handleSelect(data[0]);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const handleSelect = (temp) => {
        setSelectedId(temp.id);
        setEditForm({ subject: temp.subject, body: temp.body });
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await api.put(`/email-templates/${selectedId}`, editForm);
            alert("Updated successfully!");
            fetchTemplates();
        } catch (error) { alert("cannot save!"); }
        finally { setSaving(false); }
    };

    if (loading) return (
        <div className="flex h-96 items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={40} />
        </div>
    );

    return (
        <div className="templates-workspace p-6">
            <header className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
                    <Settings size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Email Templates</h1>
                    <p className="text-gray-500">Automated Candidate Email Communication</p>
                </div>
            </header>

            <div className="templates-layout">
                <aside className="templates-sidebar">
                    <Card className="border-none shadow-sm bg-white overflow-hidden">
                        <CardHeader className="bg-gray-50 border-b p-4 font-bold text-gray-400 text-[10px] uppercase tracking-widest">
                            Available Templates
                        </CardHeader>
                        <div className="p-2 flex flex-col gap-1">
                            {templates.map(t => (
                                <button 
                                    key={t.id} 
                                    onClick={() => handleSelect(t)}
                                    className={`flex items-center gap-3 p-4 rounded-xl transition-all text-left ${selectedId === t.id ? 'bg-indigo-50 text-indigo-700 font-bold ring-1 ring-indigo-100' : 'hover:bg-gray-50 text-gray-600 font-medium'}`}
                                >
                                    <FileText size={18} className={selectedId === t.id ? 'text-indigo-600' : 'text-gray-400'} />
                                    <span className="truncate flex-1">{t.templateName}</span>
                                    {selectedId === t.id && <CheckCircle size={16} />}
                                </button>
                            ))}
                        </div>
                    </Card>

                    <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                        <Info className="text-amber-600 shrink-0" size={20} />
                        <p className="text-xs text-amber-800 leading-relaxed">
                            Clues: You can use variables like <strong>{'{candidate_name}'}</strong>
                        </p>
                    </div>
                </aside>

                <main className="templates-editor">
                    <Card className="border-none shadow-sm bg-white overflow-hidden">
                        <CardBody className="p-8 flex flex-col gap-8">
                            <div className="field-group">
                                <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2 mb-3">
                                    <Type size={14}/> Subject Line
                                </label>
                                <input 
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 font-bold text-gray-800 transition-all"
                                    value={editForm.subject}
                                    onChange={(e) => setEditForm({...editForm, subject: e.target.value})}
                                />
                            </div>

                            <div className="field-group">
                                <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2 mb-3">
                                    <AlignLeft size={14}/> Message Body
                                </label>
                                <textarea 
                                    className="w-full p-6 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 min-h-[400px] leading-relaxed text-gray-700 font-medium scrollbar-hide"
                                    value={editForm.body}
                                    onChange={(e) => setEditForm({...editForm, body: e.target.value})}
                                />
                            </div>

                            <div className="flex justify-end pt-4 border-t border-gray-50">
                                <Button 
                                    variant="primary" 
                                    size="lg" 
                                    className="px-12 py-6 rounded-2xl shadow-lg shadow-indigo-100" 
                                    onClick={handleSave} 
                                    disabled={saving}
                                >
                                    {saving ? <Loader2 className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />} 
                                    Save Changes
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </main>
            </div>
        </div>
    );
}
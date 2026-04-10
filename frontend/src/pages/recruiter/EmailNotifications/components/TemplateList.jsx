import { Card, CardHeader, CardBody } from '../../../../components/common/Card';
import {Mail, CheckCircle2, Loader2, FileText} from 'lucide-react';
import React from "react";

export default function TemplateList({
                                         templates,
                                         loading,
                                         activeTemplate,
                                         onSelect
                                     }) {
    return (
        <Card>
            <CardHeader className="card-header-compact">
                <h4 className="panel-title"><FileText size={16}/> Quick Templates</h4>
            </CardHeader>

            <CardBody className="template-list">
                {loading ? (
                    <div className="template-loading">
                        <Loader2 className="spinner" size={16} /> Loading templates...
                    </div>
                ) : templates.length === 0 ? (
                    <p className="template-empty">No templates found. Please create one.</p>
                ) : (
                    templates.map((template) => (
                        <button
                            key={template.id}
                            className={`template-item ${activeTemplate === template.id ? 'active' : ''}`}
                            onClick={() => onSelect(template)}
                        >
                            <Mail size={16} className="text-muted" />
                            <span className="template-name">
                                {template.templateName}
                            </span>
                            {activeTemplate === template.id && (
                                <CheckCircle2 size={16} className="active-icon" />
                            )}
                        </button>
                    ))
                )}
            </CardBody>
        </Card>
    );
}
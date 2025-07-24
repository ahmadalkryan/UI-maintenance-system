import React, { useState } from 'react';

const TicketForm = ({ categories, onSubmit, isLoading }) => {
    const [description, setDescription] = useState('');
    const [deviceCategoryId, setDeviceCategoryId] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!description) errors.description = '��� ������� �����';
        if (!deviceCategoryId) errors.deviceCategoryId = '��� ������ �����';

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});

        const formData = {
            description,
            deviceCategoryId,
            deviceId: deviceId || undefined,
            attachment: attachment || undefined
        };

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="ticket-form">
            <div className="form-group">
                <label>��� ������� *</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="�� ������� ��������..."
                />
                {validationErrors.description && (
                    <span className="validation-error">{validationErrors.description}</span>
                )}
            </div>

            <div className="form-group">
                <label>��� ������ *</label>
                <select
                    value={deviceCategoryId}
                    onChange={(e) => setDeviceCategoryId(e.target.value)}
                >
                    <option value="">���� ��� ������</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
                {validationErrors.deviceCategoryId && (
                    <span className="validation-error">{validationErrors.deviceCategoryId}</span>
                )}
            </div>

            <div className="form-group">
                <label>���� ������ (�������)</label>
                <input
                    type="text"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    placeholder="���� ���� ������ ��� ��� ������"
                />
            </div>

            <div className="form-group">
                <label>��� ��� ���� (�������)</label>
                <input
                    type="file"
                    onChange={(e) => setAttachment(e.target.files[0])}
                />
                <small>����� ��� ���� �� ��� ���� ������� (���� ������: 5MB)</small>
            </div>

            <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
            >
                {isLoading ? '���� �������...' : '����� �������'}
            </button>
        </form>
    );
};

export default TicketForm;
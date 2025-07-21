import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '@/services/ticketService';
import {
    TextField,
    Button,
    Box,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    CircularProgress
} from '@mui/material';
import { toast } from 'react-toastify';

const deviceTypes = [
    { value: 'PC', label: '������� ����' },
    { value: 'Laptop', label: '������' },
    { value: 'Printer', label: '�����' },
    { value: 'Other', label: '����' },
];

const TicketForm = () => {
    const [formData, setFormData] = useState({
        description: '',
        deviceType: '',
        deviceId: '',
        attachments: null,
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            attachments: e.target.files,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createTicket(formData);
            toast.success('�� ����� ������� �����');
            navigate('/dashboard');
        } catch (error) {
            toast.error('��� �� ����� �������');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Typography variant="h4" gutterBottom>
                ����� ����� �����
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>��� ������</InputLabel>
                    <Select
                        name="deviceType"
                        value={formData.deviceType}
                        onChange={handleChange}
                        label="��� ������"
                    >
                        {deviceTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                                {type.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    margin="normal"
                    label="����� ������ (�������)"
                    name="deviceId"
                    value={formData.deviceId}
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="��� �������"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                />

                <input
                    type="file"
                    id="attachments"
                    name="attachments"
                    onChange={handleFileChange}
                    multiple
                    style={{ display: 'none' }}
                />
                <label htmlFor="attachments">
                    <Button variant="outlined" component="span" sx={{ mt: 2, mb: 2 }}>
                        ����� �����
                    </Button>
                </label>
                {formData.attachments && (
                    <Typography variant="body2">
                        {formData.attachments.length} ���(��) ����(�)
                    </Typography>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : '����� �������'}
                </Button>
            </form>
        </Box>
    );
};

export default TicketForm;
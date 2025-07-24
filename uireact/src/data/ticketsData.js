export const ticketsData = [
    {
        id: 1,
        ticketNumber: "2024-001-PC",
        description: "��������� �� ����",
        deviceType: "������� ����",
        deviceId: "PC-101",
        status: "����",
        createdAt: "2024-05-20",
        userName: "���� ����",
        department: "IT",
        attachments: [],
        notes: []
    },
    {
        id: 2,
        ticketNumber: "2024-002-Laptop",
        description: "���� �������� �� ����",
        deviceType: "������",
        deviceId: "LP-205",
        status: "��� ��������",
        createdAt: "2024-05-19",
        userName: "���� �������",
        department: "��������",
        attachments: [],
        notes: [
            {
                id: 1,
                content: "�� ������� �� ������ ���� ��� ������",
                createdAt: "2024-05-19T14:30:00"
            }
        ]
    },
    {
        id: 3,
        ticketNumber: "2024-003-Printer",
        description: "������� �� ���� �������",
        deviceType: "�����",
        deviceId: "PR-308",
        status: "�����",
        createdAt: "2024-05-18",
        userName: "���� ����",
        department: "��������",
        attachments: [],
        notes: []
    }
];

export const usersData = [
    {
        id: 1,
        name: "���� ����",
        email: "ahmed@example.com",
        department: "IT",
        role: "employee"
    },
    {
        id: 2,
        name: "���� �������",
        email: "sara@example.com",
        department: "��������",
        role: "employee"
    },
    {
        id: 3,
        name: "���� ����",
        email: "khaled@example.com",
        department: "��������",
        role: "employee"
    },
    {
        id: 4,
        name: "��� �����",
        email: "ali@example.com",
        department: "�������",
        role: "admin"
    }
];

export const deviceTypes = [
    { value: "PC", label: "������� ����" },
    { value: "Laptop", label: "������" },
    { value: "Printer", label: "�����" },
    { value: "Scanner", label: "���� ����" },
    { value: "Other", label: "����" }
];
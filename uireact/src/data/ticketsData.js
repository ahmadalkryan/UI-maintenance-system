export const ticketsData = [
    {
        id: 1,
        ticketNumber: "2024-001-PC",
        description: "ÇáßãÈíæÊÑ áÇ íÚãá",
        deviceType: "ßãÈíæÊÑ ÔÎÕí",
        deviceId: "PC-101",
        status: "ÌÏíÏ",
        createdAt: "2024-05-20",
        userName: "ÃÍãÏ ãÍãÏ",
        department: "IT",
        attachments: [],
        notes: []
    },
    {
        id: 2,
        ticketNumber: "2024-002-Laptop",
        description: "ÔÇÔÉ ÇááÇÈÊæÈ áÇ ÊÚãá",
        deviceType: "áÇÈÊæÈ",
        deviceId: "LP-205",
        status: "ŞíÏ ÇáãÚÇáÌÉ",
        createdAt: "2024-05-19",
        userName: "ÓÇÑÉ ÚÈÏÇááå",
        department: "ÇáãÈíÚÇÊ",
        attachments: [],
        notes: [
            {
                id: 1,
                content: "Êã ÇáÊæÇÕá ãÚ ÇáãæÑÏ áØáÈ ŞØÚ ÇáÛíÇÑ",
                createdAt: "2024-05-19T14:30:00"
            }
        ]
    },
    {
        id: 3,
        ticketNumber: "2024-003-Printer",
        description: "ÇáØÇÈÚÉ áÇ ÊØÈÚ ÇáÃáæÇä",
        deviceType: "ØÇÈÚÉ",
        deviceId: "PR-308",
        status: "ãßÊãá",
        createdAt: "2024-05-18",
        userName: "ÎÇáÏ ÓÇáã",
        department: "ÇáãÍÇÓÈÉ",
        attachments: [],
        notes: []
    }
];

export const usersData = [
    {
        id: 1,
        name: "ÃÍãÏ ãÍãÏ",
        email: "ahmed@example.com",
        department: "IT",
        role: "employee"
    },
    {
        id: 2,
        name: "ÓÇÑÉ ÚÈÏÇááå",
        email: "sara@example.com",
        department: "ÇáãÈíÚÇÊ",
        role: "employee"
    },
    {
        id: 3,
        name: "ÎÇáÏ ÓÇáã",
        email: "khaled@example.com",
        department: "ÇáãÍÇÓÈÉ",
        role: "employee"
    },
    {
        id: 4,
        name: "Úáí ãÍãæÏ",
        email: "ali@example.com",
        department: "ÇáÕíÇäÉ",
        role: "admin"
    }
];

export const deviceTypes = [
    { value: "PC", label: "ßãÈíæÊÑ ÔÎÕí" },
    { value: "Laptop", label: "áÇÈÊæÈ" },
    { value: "Printer", label: "ØÇÈÚÉ" },
    { value: "Scanner", label: "ãÇÓÍ ÖæÆí" },
    { value: "Other", label: "ÃÎÑì" }
];
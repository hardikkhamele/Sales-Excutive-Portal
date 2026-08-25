export const initialCompanies = [
  {
    id: "COMP-001",
    name: "ABC Pvt Ltd",
    contactPerson: "Amit Verma",
    email: "amit@abc.com",
    phone: "+91 98765 43210",
    website: "www.abc.com",
    industry: "Information Technology",
    companySize: "201-500 Employees",
    address: "123, Business Park, Sector 62, Noida, Uttar Pradesh - 201301",
    notes: "Good potential client. Follow up in next quarter for expansion.",
    status: "Completed",
    onboardedOn: "12 May 2024",
    timeline: [
      { step: "Company Added", date: "10 May 2024", completed: true },
      { step: "Document Submitted", date: "11 May 2024", completed: true },
      { step: "Verification", date: "11 May 2024", completed: true },
      { step: "Review", date: "12 May 2024", completed: true },
      { step: "Completed", date: "12 May 2024", completed: true }
    ],
    history: [
      { title: "Company added by Rahul Sharma", date: "10 May 2024" },
      { title: "Documents submitted", date: "11 May 2024" },
      { title: "Verification completed", date: "11 May 2024" },
      { title: "Review completed and onboarded", date: "12 May 2024" }
    ]
  },
  {
    id: "COMP-002",
    name: "XYZ Solutions",
    contactPerson: "Neha Joshi",
    email: "neha@xyz.com",
    phone: "+91 98123 45678",
    website: "www.xyzsolutions.io",
    industry: "Financial Services",
    companySize: "51-200 Employees",
    address: "45 Cyber City, Tower B, Gurugram, Haryana - 122002",
    notes: "Awaiting final tax documents from legal team.",
    status: "Completed",
    onboardedOn: "10 May 2024",
    timeline: [
      { step: "Company Added", date: "08 May 2024", completed: true },
      { step: "Document Submitted", date: "09 May 2024", completed: true },
      { step: "Verification", date: "09 May 2024", completed: true },
      { step: "Review", date: "10 May 2024", completed: true },
      { step: "Completed", date: "10 May 2024", completed: true }
    ],
    history: [
      { title: "Initial call with Neha", date: "08 May 2024" },
      { title: "KYC Verified", date: "09 May 2024" },
      { title: "Account Activated", date: "10 May 2024" }
    ]
  },
  {
    id: "COMP-003",
    name: "Techno Soft",
    contactPerson: "Rohit Singh",
    email: "rohit@techno.com",
    phone: "+91 99555 11223",
    website: "www.technosoft.in",
    industry: "Software Development",
    companySize: "11-50 Employees",
    address: "88 MG Road, Bengaluru, Karnataka - 560001",
    notes: "Proposal shared. Pending contract sign-off.",
    status: "Pending",
    onboardedOn: "09 May 2024",
    timeline: [
      { step: "Company Added", date: "07 May 2024", completed: true },
      { step: "Document Submitted", date: "08 May 2024", completed: true },
      { step: "Verification", date: "09 May 2024", completed: false },
      { step: "Review", date: "Pending", completed: false },
      { step: "Completed", date: "Pending", completed: false }
    ],
    history: [
      { title: "Company registered", date: "07 May 2024" },
      { title: "Proposal submitted", date: "08 May 2024" }
    ]
  },
  {
    id: "COMP-004",
    name: "Global Infotech",
    contactPerson: "Pooja Mehta",
    email: "pooja@global.com",
    phone: "+91 97788 33445",
    website: "www.globalinfotech.com",
    industry: "Telecommunications",
    companySize: "500+ Employees",
    address: "Level 12, Express Towers, Nariman Point, Mumbai - 400021",
    notes: "Requires follow-up call tomorrow regarding SLA terms.",
    status: "Pending",
    onboardedOn: "08 May 2024",
    timeline: [
      { step: "Company Added", date: "05 May 2024", completed: true },
      { step: "Document Submitted", date: "07 May 2024", completed: true },
      { step: "Verification", date: "Pending", completed: false },
      { step: "Review", date: "Pending", completed: false },
      { step: "Completed", date: "Pending", completed: false }
    ],
    history: [
      { title: "Meeting conducted", date: "05 May 2024" },
      { title: "Documents requested", date: "07 May 2024" }
    ]
  },
  {
    id: "COMP-005",
    name: "Innovative Systems",
    contactPerson: "Vikram Rao",
    email: "vikram@innovate.com",
    phone: "+91 98333 77112",
    website: "www.innovativesystems.com",
    industry: "Healthcare Tech",
    companySize: "51-200 Employees",
    address: "Plot 14, Hitech City, Hyderabad, Telangana - 500081",
    notes: "Product demo completed. Email sent with pricing tier details.",
    status: "Completed",
    onboardedOn: "07 May 2024",
    timeline: [
      { step: "Company Added", date: "02 May 2024", completed: true },
      { step: "Document Submitted", date: "04 May 2024", completed: true },
      { step: "Verification", date: "05 May 2024", completed: true },
      { step: "Review", date: "06 May 2024", completed: true },
      { step: "Completed", date: "07 May 2024", completed: true }
    ],
    history: [
      { title: "Demo completed", date: "02 May 2024" },
      { title: "Contract signed", date: "07 May 2024" }
    ]
  },
  {
    id: "COMP-006",
    name: "Bright Future Pvt Ltd",
    contactPerson: "Arjun Nair",
    email: "arjun@bright.com",
    phone: "+91 96111 88990",
    website: "www.brightfuture.org",
    industry: "Education & EdTech",
    companySize: "100-250 Employees",
    address: "Sector 18, Commercial Hub, Chandigarh - 160018",
    notes: "Awaiting approval from CFO.",
    status: "Pending",
    onboardedOn: "05 May 2024",
    timeline: [
      { step: "Company Added", date: "03 May 2024", completed: true },
      { step: "Document Submitted", date: "04 May 2024", completed: true },
      { step: "Verification", date: "Pending", completed: false },
      { step: "Review", date: "Pending", completed: false },
      { step: "Completed", date: "Pending", completed: false }
    ],
    history: [
      { title: "Form submitted", date: "03 May 2024" }
    ]
  },
  {
    id: "COMP-007",
    name: "NextGen Solutions",
    contactPerson: "Karan Malhotra",
    email: "karan@nextgen.com",
    phone: "+91 98990 12345",
    website: "www.nextgensolutions.net",
    industry: "Cloud & Infrastructure",
    companySize: "50-100 Employees",
    address: "Phase 3, Industrial Area, Pune, Maharashtra - 411057",
    notes: "Technical verification phase under review.",
    status: "In Progress",
    onboardedOn: "01 May 2024",
    timeline: [
      { step: "Company Added", date: "28 Apr 2024", completed: true },
      { step: "Document Submitted", date: "29 Apr 2024", completed: true },
      { step: "Verification", date: "01 May 2024", completed: true },
      { step: "Review", date: "In Progress", completed: false },
      { step: "Completed", date: "Pending", completed: false }
    ],
    history: [
      { title: "Documents uploaded", date: "29 Apr 2024" },
      { title: "Verification underway", date: "01 May 2024" }
    ]
  },
  {
    id: "COMP-008",
    name: "Future Works",
    contactPerson: "Sneha Kapoor",
    email: "sneha@future.com",
    phone: "+91 97177 66554",
    website: "www.futureworks.co",
    industry: "Human Resources",
    companySize: "20-50 Employees",
    address: "Connaught Place, Block C, New Delhi - 110001",
    notes: "Account manager assigned: Rahul Sharma.",
    status: "Pending",
    onboardedOn: "28 Apr 2024",
    timeline: [
      { step: "Company Added", date: "26 Apr 2024", completed: true },
      { step: "Document Submitted", date: "27 Apr 2024", completed: true },
      { step: "Verification", date: "Pending", completed: false },
      { step: "Review", date: "Pending", completed: false },
      { step: "Completed", date: "Pending", completed: false }
    ],
    history: [
      { title: "Initial discovery session", date: "26 Apr 2024" }
    ]
  },
  {
    id: "COMP-009",
    name: "Digital Minds",
    contactPerson: "Ankit Gupta",
    email: "ankit@digital.com",
    phone: "+91 99222 44331",
    website: "www.digitalminds.io",
    industry: "Digital Marketing",
    companySize: "10-30 Employees",
    address: "Salt Lake, Sector V, Kolkata, West Bengal - 700091",
    notes: "Fully onboarded. SLA active.",
    status: "Completed",
    onboardedOn: "25 Apr 2024",
    timeline: [
      { step: "Company Added", date: "20 Apr 2024", completed: true },
      { step: "Document Submitted", date: "22 Apr 2024", completed: true },
      { step: "Verification", date: "23 Apr 2024", completed: true },
      { step: "Review", date: "24 Apr 2024", completed: true },
      { step: "Completed", date: "25 Apr 2024", completed: true }
    ],
    history: [
      { title: "Onboarding completed", date: "25 Apr 2024" }
    ]
  },
  {
    id: "COMP-010",
    name: "Cloud Systems",
    contactPerson: "Mehgul Shah",
    email: "mehgul@cloud.com",
    phone: "+91 98200 55443",
    website: "www.cloudsystems.com",
    industry: "DevOps & Infrastructure",
    companySize: "100-300 Employees",
    address: "SG Highway, Ahmedabad, Gujarat - 380015",
    notes: "Enterprise agreement executed.",
    status: "Completed",
    onboardedOn: "20 Apr 2024",
    timeline: [
      { step: "Company Added", date: "15 Apr 2024", completed: true },
      { step: "Document Submitted", date: "17 Apr 2024", completed: true },
      { step: "Verification", date: "18 Apr 2024", completed: true },
      { step: "Review", date: "19 Apr 2024", completed: true },
      { step: "Completed", date: "20 Apr 2024", completed: true }
    ],
    history: [
      { title: "Enterprise contract finalized", date: "20 Apr 2024" }
    ]
  },
  {
    id: "COMP-011",
    name: "Apex Logistics",
    contactPerson: "Rohan Joshi",
    email: "rohan@apexlogistics.com",
    phone: "+91 98711 22334",
    website: "www.apexlogistics.com",
    industry: "Logistics & Supply Chain",
    companySize: "500+ Employees",
    address: "NH 8 Freight Complex, Gurugram - 122001",
    notes: "Pending compliance team review.",
    status: "In Progress",
    onboardedOn: "18 Apr 2024",
    timeline: [
      { step: "Company Added", date: "14 Apr 2024", completed: true },
      { step: "Document Submitted", date: "16 Apr 2024", completed: true },
      { step: "Verification", date: "In Progress", completed: false },
      { step: "Review", date: "Pending", completed: false },
      { step: "Completed", date: "Pending", completed: false }
    ],
    history: [
      { title: "Compliance documents submitted", date: "16 Apr 2024" }
    ]
  },
  {
    id: "COMP-012",
    name: "Quantum Analytics",
    contactPerson: "Siddharth Ray",
    email: "siddharth@quant.ai",
    phone: "+91 99100 88776",
    website: "www.quant.ai",
    industry: "Artificial Intelligence",
    companySize: "25-50 Employees",
    address: "Koramangala 4th Block, Bengaluru - 560034",
    notes: "AI SaaS package customized.",
    status: "Completed",
    onboardedOn: "15 Apr 2024",
    timeline: [
      { step: "Company Added", date: "10 Apr 2024", completed: true },
      { step: "Document Submitted", date: "12 Apr 2024", completed: true },
      { step: "Verification", date: "13 Apr 2024", completed: true },
      { step: "Review", date: "14 Apr 2024", completed: true },
      { step: "Completed", date: "15 Apr 2024", completed: true }
    ],
    history: [
      { title: "Setup completed", date: "15 Apr 2024" }
    ]
  }
];

export const dailyActivities = [
  {
    id: "ACT-01",
    time: "10:00 AM",
    title: "Discussed with ABC Pvt Ltd",
    company: "ABC Pvt Ltd",
    type: "Discussion",
    status: "Completed",
    notes: "Reviewed Q3 expansion requirements and license upgrade options."
  },
  {
    id: "ACT-02",
    time: "11:30 AM",
    title: "Follow-up call with XYZ Solutions",
    company: "XYZ Solutions",
    type: "Follow-up",
    status: "Completed",
    notes: "Followed up on agreement signatures. Sent revised copy."
  },
  {
    id: "ACT-03",
    time: "02:00 PM",
    title: "Proposal shared with Techno Soft",
    company: "Techno Soft",
    type: "Proposal",
    status: "Pending",
    notes: "Emailed comprehensive commercial proposal and SLA breakdown."
  },
  {
    id: "ACT-04",
    time: "04:30 PM",
    title: "Meeting with Global Infotech",
    company: "Global Infotech",
    type: "Meeting",
    status: "Completed",
    notes: "In-person product demo with VP of Operations."
  },
  {
    id: "ACT-05",
    time: "05:15 PM",
    title: "Email sent to Innovative Systems",
    company: "Innovative Systems",
    type: "Email",
    status: "Completed",
    notes: "Sent onboarding checklist and support team contact points."
  }
];

export const upcomingActivities = [
  {
    id: "UP-01",
    date: "20 May 2024",
    time: "10:00 AM",
    activity: "Follow-up Call",
    company: "ABC Pvt Ltd",
    type: "Follow-up",
    status: "Scheduled"
  },
  {
    id: "UP-02",
    date: "20 May 2024",
    time: "02:30 PM",
    activity: "Meeting",
    company: "XYZ Solutions",
    type: "Meeting",
    status: "Scheduled"
  },
  {
    id: "UP-03",
    date: "21 May 2024",
    time: "11:00 AM",
    activity: "Proposal Discussion",
    company: "Techno Soft",
    type: "Proposal",
    status: "Scheduled"
  },
  {
    id: "UP-04",
    date: "22 May 2024",
    time: "04:00 PM",
    activity: "Requirement Gathering",
    company: "Global Infotech",
    type: "Discussion",
    status: "Scheduled"
  },
  {
    id: "UP-05",
    date: "23 May 2024",
    time: "03:15 PM",
    activity: "Product Demo",
    company: "Innovative Systems",
    type: "Meeting",
    status: "Scheduled"
  }
];

export const followUpReminders = [
  {
    id: "REM-01",
    company: "Global Infotech",
    contactPerson: "Neha Singh",
    dueText: "Due in 1 day",
    urgency: "urgent",
    date: "Tomorrow, 10:30 AM"
  },
  {
    id: "REM-02",
    company: "Innovative Systems",
    contactPerson: "Vikram Rao",
    dueText: "Due in 2 days",
    urgency: "warning",
    date: "22 May, 02:00 PM"
  },
  {
    id: "REM-03",
    company: "Bright Future Pvt Ltd",
    contactPerson: "Priya Patel",
    dueText: "Due in 3 days",
    urgency: "info",
    date: "23 May, 11:15 AM"
  }
];

export const onboardingTrendData = [
  { day: "1", value: 20 },
  { day: "3", value: 25 },
  { day: "5", value: 45 },
  { day: "8", value: 30 },
  { day: "10", value: 55 },
  { day: "12", value: 40 },
  { day: "15", value: 70 },
  { day: "18", value: 65 },
  { day: "20", value: 85 },
  { day: "22", value: 75 },
  { day: "25", value: 95 },
  { day: "28", value: 90 },
  { day: "30", value: 128 }
];

export const onboardingStatusPieData = [
  { name: "Completed", value: 86, color: "#10b981", percentage: "67%" },
  { name: "Pending", value: 30, color: "#f97316", percentage: "23%" },
  { name: "In Progress", value: 12, color: "#3b82f6", percentage: "10%" }
];

export const activityOverviewBarData = [
  { type: "Discussion", count: 65, fill: "#3b82f6" },
  { type: "Follow-up", count: 82, fill: "#10b981" },
  { type: "Proposal", count: 45, fill: "#f59e0b" },
  { type: "Meeting", count: 34, fill: "#8b5cf6" },
  { type: "Email", count: 19, fill: "#06b6d4" }
];

export const monthlySalesTrendData = [
  { month: "Jan", activities: 120, conversions: 45 },
  { month: "Feb", activities: 150, conversions: 62 },
  { month: "Mar", activities: 180, conversions: 78 },
  { month: "Apr", activities: 210, conversions: 95 },
  { month: "May", activities: 245, conversions: 110 },
  { month: "Jun", activities: 230, conversions: 102 }
];

export const initialCalendarEvents = [
  {
    id: "CAL-01",
    date: "2024-05-15",
    time: "10:00 AM",
    title: "10:00 AM Follow-up Call (ABC Pvt Ltd)",
    company: "ABC Pvt Ltd",
    type: "Follow-up",
    status: "Completed"
  },
  {
    id: "CAL-02",
    date: "2024-05-15",
    time: "11:30 AM",
    title: "11:30 AM Meeting (Neha - XYZ)",
    company: "XYZ Solutions",
    type: "Meeting",
    status: "Completed"
  },
  {
    id: "CAL-03",
    date: "2024-05-18",
    time: "02:00 PM",
    title: "02:00 PM Proposal Review",
    company: "Techno Soft",
    type: "Proposal",
    status: "Scheduled"
  },
  {
    id: "CAL-04",
    date: "2024-05-20",
    time: "10:30 AM",
    title: "10:30 AM Demo (Bright Future)",
    company: "Bright Future Pvt Ltd",
    type: "Meeting",
    status: "Scheduled"
  },
  {
    id: "CAL-05",
    date: "2024-05-22",
    time: "04:00 PM",
    title: "04:00 PM Discussion (Global Infotech)",
    company: "Global Infotech",
    type: "Discussion",
    status: "Scheduled"
  }
];

export const initialUserProfile = {
  fullName: "Rahul Sharma",
  role: "Sales Executive",
  email: "rahul.sharma@company.com",
  phone: "+91 98765 43210",
  employeeId: "ST-1001",
  department: "Sales",
  joinedOn: "01 Jan 2024",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"
};

export const initialNotifications = [
  {
    id: "NOTIF-01",
    title: "New Company Onboarded",
    description: "ABC Pvt Ltd completed onboarding verification",
    time: "10 mins ago",
    unread: true
  },
  {
    id: "NOTIF-02",
    title: "Follow-up Reminder",
    description: "Meeting scheduled with Global Infotech today at 4:30 PM",
    time: "1 hour ago",
    unread: true
  },
  {
    id: "NOTIF-03",
    title: "Proposal Approved",
    description: "Techno Soft requested updated SLA documents",
    time: "3 hours ago",
    unread: false
  }
];

// Helper to generate dynamic dates for realistic Today / This Week / This Month filtering
const getRelativeDate = (daysAgo = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
};

export const initialCallLogs = [
  {
    id: "CALL-101",
    company: "ABC Pvt Ltd",
    contactPerson: "Amit Verma (HR Head)",
    phone: "+91 98765 43210",
    caller: "Rahul Sharma",
    date: getRelativeDate(0), // Today
    time: "10:30 AM",
    duration: "6 mins",
    outcome: "Connected",
    status: "Completed",
    notes: "Discussed corporate licensing package. Client requested updated quotation with 50 user seats."
  },
  {
    id: "CALL-102",
    company: "XYZ Solutions",
    contactPerson: "Neha Joshi (Talent Acquisition)",
    phone: "+91 98123 45678",
    caller: "Rahul Sharma",
    date: getRelativeDate(0), // Today
    time: "11:45 AM",
    duration: "12 mins",
    outcome: "Interested",
    status: "Follow-up Required",
    notes: "Walked through demo recording. Positive response on applicant screening modules. Follow-up tomorrow."
  },
  {
    id: "CALL-103",
    company: "Techno Soft",
    contactPerson: "Rohit Singh (HR Operations)",
    phone: "+91 99555 11223",
    caller: "Rahul Sharma",
    date: getRelativeDate(0), // Today
    time: "02:15 PM",
    duration: "2 mins",
    outcome: "Busy / No Answer",
    status: "Callback Scheduled",
    notes: "Phone was busy. Sent a WhatsApp text and scheduled a callback for 5:00 PM."
  },
  {
    id: "CALL-104",
    company: "Global Infotech",
    contactPerson: "Pooja Mehta (HR Director)",
    phone: "+91 97788 33445",
    caller: "Rahul Sharma",
    date: getRelativeDate(1), // Yesterday (This Week)
    time: "03:30 PM",
    duration: "18 mins",
    outcome: "Deal Closed",
    status: "Completed",
    notes: "Negotiation completed successfully! Annual subscription agreement approved by management."
  },
  {
    id: "CALL-105",
    company: "Innovative Systems",
    contactPerson: "Vikram Rao (Recruitment Lead)",
    phone: "+91 98333 77112",
    caller: "Rahul Sharma",
    date: getRelativeDate(2), // 2 days ago (This Week)
    time: "11:00 AM",
    duration: "9 mins",
    outcome: "Connected",
    status: "Completed",
    notes: "Reviewed integration with their existing ERP. Next technical meeting scheduled for Friday."
  },
  {
    id: "CALL-106",
    company: "Bright Future Pvt Ltd",
    contactPerson: "Arjun Nair (HR Manager)",
    phone: "+91 96111 88990",
    caller: "Rahul Sharma",
    date: getRelativeDate(3), // 3 days ago (This Week)
    time: "04:45 PM",
    duration: "4 mins",
    outcome: "Voicemail / Message",
    status: "Pending",
    notes: "Left voicemail regarding proposal discount validity expiring this month."
  },
  {
    id: "CALL-107",
    company: "NextGen Solutions",
    contactPerson: "Karan Malhotra (HR VP)",
    phone: "+91 98990 12345",
    caller: "Rahul Sharma",
    date: getRelativeDate(5), // 5 days ago (This Week)
    time: "01:20 PM",
    duration: "15 mins",
    outcome: "Interested",
    status: "Follow-up Required",
    notes: "Showcased pricing comparison against competitors. Client requested SLA agreement draft."
  },
  {
    id: "CALL-108",
    company: "Future Works",
    contactPerson: "Sneha Kapoor (People & Culture)",
    phone: "+91 97177 66554",
    caller: "Rahul Sharma",
    date: getRelativeDate(8), // 8 days ago (Earlier this month)
    time: "12:10 PM",
    duration: "10 mins",
    outcome: "Connected",
    status: "Completed",
    notes: "Introductory discovery call. Requirement gathering for hiring pipeline automation."
  }
];


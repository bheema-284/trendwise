import React, { useContext, useEffect, useMemo, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend,
    ResponsiveContainer,
    Label,
} from "recharts";
import { FaChartBar, FaCode, FaUserTie } from "react-icons/fa";
import { FaLaptopCode, FaBuilding, FaHeadset, FaUsers, FaBullhorn, FaFileInvoiceDollar, FaUserCog } from "react-icons/fa";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, CalendarIcon, ChevronDownIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { Popover } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, differenceInDays, differenceInCalendarMonths, subDays, parseISO, isWithinInterval, startOfDay } from "date-fns";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const AdminDashboard = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectScheduleDate, setSelectScheduleDate] = useState(new Date());
    const [selectedStatType, setSelectedStatType] = useState("Applications");
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const display2Date = selectedDate ? format(selectedDate, "dd MMM yyyy") : "Today";
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, milliseconds to 0

    const normalizedSelectScheduleDate = new Date(selectScheduleDate); // Create a copy
    normalizedSelectScheduleDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, milliseconds to 0
    const displayScheduleDateDate = (normalizedSelectScheduleDate.getTime() === today.getTime())
        ? "Today"
        : format(selectScheduleDate, "dd MMM yyyy");
    const categoryColors = {
        Personal: 'bg-red-100',
        Business: 'bg-rose-100',
        Family: 'bg-yellow-100',
        Holiday: 'bg-green-100',
        ETC: 'bg-sky-100',
    };
    const tailwindBgToHex = {
        'bg-red-100': '#dc2626',
        'bg-rose-100': '#e0193a',
        'bg-yellow-100': '#facc15',
        'bg-green-100': '#4ade80',
        'bg-sky-100': '#38bdf8',
    };
    const scheduleData = [
        {
            title: 'Property Listing Review',
            startDate: '2025-07-05',
            endDate: '2025-07-05',
            category: 'Business',
            allDay: true,
            url: 'https://example.com/event-1734',
            guests: 'guest2',
            location: 'Location M',
            description: 'Description for Property Listing Review',
            id: 'job-1753599000001-9z7x8q2'
        },
        {
            title: 'Client Site Visit - Downtown Flats',
            startDate: '2025-07-06',
            endDate: '2025-07-06',
            category: 'Personal',
            allDay: false,
            url: 'https://example.com/event-8291',
            guests: 'guest4',
            location: 'Location R',
            description: 'Description for Client Site Visit - Downtown Flats',
            id: 'job-1753599000002-a1b2c3d'
        },
        {
            title: 'Photography Session - Villa Bella',
            startDate: '2025-07-07',
            endDate: '2025-07-07',
            category: 'Business',
            allDay: true,
            url: 'https://example.com/event-5823',
            guests: 'guest9',
            location: 'Location A',
            description: 'Description for Photography Session - Villa Bella',
            id: 'job-1753599000003-e4f5g6h'
        },
        {
            title: 'Team Standup - Weekly Sync',
            startDate: '2025-07-08',
            endDate: '2025-07-08',
            category: 'Meeting',
            allDay: false,
            url: 'https://example.com/event-1420',
            guests: 'guest1',
            location: 'Location W',
            description: 'Description for Team Standup - Weekly Sync',
            id: 'job-1753599000004-j1k2l3m'
        },
        {
            title: 'Broker Conference Call',
            startDate: '2025-07-09',
            endDate: '2025-07-09',
            category: 'Meeting',
            allDay: true,
            url: 'https://example.com/event-9731',
            guests: 'guest7',
            location: 'Location T',
            description: 'Description for Broker Conference Call',
            id: 'job-1753599000005-n4o5p6q'
        },
        {
            title: 'Final Deal Closure - Sunrise Apartments',
            startDate: '2025-07-10',
            endDate: '2025-07-10',
            category: 'Business',
            allDay: false,
            url: 'https://example.com/event-2104',
            guests: 'guest6',
            location: 'Location Z',
            description: 'Description for Final Deal Closure - Sunrise Apartments',
            id: 'job-1753599000006-r7s8t9u'
        },
        {
            title: 'Real Estate Webinar',
            startDate: '2025-07-11',
            endDate: '2025-07-11',
            category: 'Learning',
            allDay: true,
            url: 'https://example.com/event-3048',
            guests: 'guest8',
            location: 'Location B',
            description: 'Description for Real Estate Webinar',
            id: 'job-1753599000007-v1w2x3y'
        },
        {
            title: 'Site Visit with NRI Client',
            startDate: '2025-07-12',
            endDate: '2025-07-12',
            category: 'Business',
            allDay: false,
            url: 'https://example.com/event-4620',
            guests: 'guest3',
            location: 'Location D',
            description: 'Description for Site Visit with NRI Client',
            id: 'job-1753599000008-z5a6b7c'
        },
        {
            title: 'Family Get-together',
            startDate: '2025-07-13',
            endDate: '2025-07-13',
            category: 'Personal',
            allDay: true,
            url: 'https://example.com/event-1176',
            guests: 'guest5',
            location: 'Location H',
            description: 'Description for Family Get-together',
            id: 'job-1753599000009-c9d0e1f'
        },
        {
            title: 'Annual Property Audit',
            startDate: '2025-07-14',
            endDate: '2025-07-14',
            category: 'Business',
            allDay: false,
            url: 'https://example.com/event-6723',
            guests: 'guest0',
            location: 'Location E',
            description: 'Description for Annual Property Audit',
            id: 'job-1753599000010-g2h3i4j'
        },
        {
            title: 'Apartment Handover - Tower B',
            startDate: '2025-07-15',
            endDate: '2025-07-15',
            category: 'Business',
            allDay: true,
            url: 'https://example.com/event-3842',
            guests: 'guest2',
            location: 'Location K',
            description: 'Description for Apartment Handover - Tower B',
            id: 'job-1753599000011-l5m6n7o'
        },
        {
            title: 'Digital Marketing Campaign Launch',
            startDate: '2025-07-16',
            endDate: '2025-07-16',
            category: 'Marketing',
            allDay: false,
            url: 'https://example.com/event-5812',
            guests: 'guest6',
            location: 'Location J',
            description: 'Description for Digital Marketing Campaign Launch',
            id: 'job-1753599000012-p8q9r0s'
        },
        {
            title: 'Property Auction - Green Acres',
            startDate: '2025-07-17',
            endDate: '2025-07-17',
            category: 'Business',
            allDay: true,
            url: 'https://example.com/event-9053',
            guests: 'guest4',
            location: 'Location C',
            description: 'Description for Property Auction - Green Acres',
            id: 'job-1753599000013-t1u2v3w'
        },
        {
            title: 'Investment Portfolio Review',
            startDate: '2025-07-18',
            endDate: '2025-07-18',
            category: 'Finance',
            allDay: false,
            url: 'https://example.com/event-7289',
            guests: 'guest9',
            location: 'Location N',
            description: 'Description for Investment Portfolio Review',
            id: 'job-1753599000014-x4y5z6a'
        },
        {
            title: 'Family Feedback Session',
            startDate: '2025-07-19',
            endDate: '2025-07-19',
            category: 'Family',
            allDay: true,
            url: 'https://example.com/event-1893',
            guests: 'guest1',
            location: 'Location V',
            description: 'Description for Family Feedback Session',
            id: 'job-1753599000015-b7c8d9e'
        },
        {
            title: 'Business Feedback Session',
            startDate: '2025-07-19',
            endDate: '2025-07-19',
            category: 'Business',
            allDay: true,
            url: 'https://example.com/event-1893',
            guests: 'guest1',
            location: 'Location V',
            description: 'Description for Business Feedback Session',
            id: 'job-1753599000015-b7c8d9e'
        },
        {
            title: 'Holiday Feedback Session',
            startDate: '2025-07-19',
            endDate: '2025-07-19',
            category: 'Holiday',
            allDay: true,
            url: 'https://example.com/event-1893',
            guests: 'guest1',
            location: 'Location V',
            description: 'Description for Holyday Feedback Session',
            id: 'job-1753599000015-b7c8d9e'
        },
        {
            title: 'ETC Feedback Session',
            startDate: '2025-07-19',
            endDate: '2025-07-19',
            category: 'ETC',
            allDay: true,
            url: 'https://example.com/event-1893',
            guests: 'guest1',
            location: 'Location V',
            description: 'Description for ETC Feedback Session',
            id: 'job-1753599000015-b7c8d9e'
        }
    ]


    const filteredData = useMemo(() => {
        return scheduleData
            .filter(item => {
                // Normalize event start and end dates to the beginning of the day
                const eventStartDate = startOfDay(parseISO(item.startDate));
                // If endDate is not provided, treat it as a single-day event, normalized to start of day
                const eventEndDate = item.endDate ? startOfDay(parseISO(item.endDate)) : eventStartDate;

                // Normalize selectScheduleDate to the beginning of the day for consistent comparison
                const normalizedSelectDate = startOfDay(selectScheduleDate);

                // Check if normalizedSelectDate is within the event's normalized start and end date (inclusive)
                // This will correctly filter events where startDate and endDate are the same,
                // as long as normalizedSelectDate is also that same day.
                return isWithinInterval(normalizedSelectDate, { start: eventStartDate, end: eventEndDate });
            })
            .map(item => ({
                ...item,
                // Format time only if it exists; otherwise, it's an all-day event
                time: item.time ? format(parseISO(`2000-01-01T${item.time}`), 'hh:mm a') : undefined,
                dept: item.category,
                color: categoryColors[item.category] || 'bg-gray-400'
            }));
    }, [selectScheduleDate, scheduleData, categoryColors]); // Ensure all dependencies are listed

    const formatDateRange = () => {
        const endDate = new Date(); // today
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 6); // 7 days range: includes today

        const dayStart = startDate.getDate();
        const dayEnd = endDate.getDate();
        const monthName = endDate.toLocaleDateString('en-US', { month: 'long' });

        return `${dayStart}-${dayEnd} ${monthName}`;
    };

    const dynamicRange = formatDateRange();
    let display1Date = dynamicRange;
    if (startDate && endDate) {
        const sameMonth = format(startDate, "MMM yyyy") === format(endDate, "MMM yyyy");
        if (sameMonth) {
            display1Date = `${format(startDate, "d")}–${format(endDate, "d MMM")}`;
        } else {
            display1Date = `${format(startDate, "d MMM")} – ${format(endDate, "d MMM")}`;
        }
    }

    const PALETTES_BY_STAT_TYPE = {
        "Applications": [
            "#dbeafe", // blue-100
            "#bfdbfe", // blue-200
            "#93c5fd"  // blue-300
        ],
        "Shortlisted": [
            "#d9f99d", // lime-100
            "#bef264", // lime-200
            "#a3e635"  // lime-300
        ],
        "Selected": [
            "#dcfce7", // green-100
            "#bbf7d0", // green-200
            "#86efac"  // green-300
        ],
        "Not Selected": [
            "#fee2e2", // red-100
            "#fecaca", // red-200
            "#fca5a5"  // red-300
        ],
        // Default palette if selectedStatType doesn't match
        "default": [
            '#a29eff', // Fallback or general department colors
            '#e1fb9b',
            '#fef8ae',
            '#e4fcb0',
            '#e7f5e6',
            '#f8f5fc',
        ]
    };

    // --- MODIFIED getColorsForChart FUNCTION ---
    const getColorsForChart = (selectedStatType) => {
        let combinedPalette = [];

        switch (selectedStatType) {
            case "Applications":
                // Applications colors + Shortlisted colors
                combinedPalette = [
                    ...PALETTES_BY_STAT_TYPE["Applications"],
                    ...PALETTES_BY_STAT_TYPE["Shortlisted"]
                ];
                break;
            case "Shortlisted":
                // Shortlisted colors + Applications colors
                combinedPalette = [
                    ...PALETTES_BY_STAT_TYPE["Shortlisted"],
                    ...PALETTES_BY_STAT_TYPE["Applications"]
                ];
                break;
            case "Selected":
                // Selected colors + Not Selected colors
                combinedPalette = [
                    ...PALETTES_BY_STAT_TYPE["Selected"],
                    ...PALETTES_BY_STAT_TYPE["Not Selected"]
                ];
                break;
            case "Not Selected":
                // Not Selected colors + Selected colors
                combinedPalette = [
                    ...PALETTES_BY_STAT_TYPE["Not Selected"],
                    ...PALETTES_BY_STAT_TYPE["Selected"]
                ];
                break;
            default:
                // Fallback to default palette
                combinedPalette = PALETTES_BY_STAT_TYPE["default"];
                break;
        }
        return combinedPalette;
    };

    const COLORS = getColorsForChart(selectedStatType);

    const generateRecruitmentData = (start = new Date(), end = addDays(new Date(), 6)) => {
        const days = differenceInDays(end, start) + 1;
        const data = [];

        for (let i = 0; i < days; i++) {
            const date = format(addDays(start, i), "yyyy-MM-dd"); // full ISO date string
            const applications = Math.floor(Math.random() * 101) + 300; // 300–400
            const shortlisted = Math.floor(applications * 0.3);
            const selected = Math.floor(shortlisted * 0.2);
            const notselected = applications - shortlisted - selected;

            data.push({ date, Applications: applications, Shortlisted: shortlisted, Selected: selected, ["Not Selected"]: notselected });
        }

        return data;
    };

    const [dailyRecruitmentData, setDailyRecruitmentData] = useState(generateRecruitmentData(subDays(new Date(), 6), new Date()));

    useEffect(() => {
        if (startDate && endDate) {
            setDailyRecruitmentData(generateRecruitmentData(startDate, endDate));
        }
    }, [startDate, endDate]);

    // Base distributions (percentages or proportions) for pie charts.
    // These will be scaled by the total value of the selectedStatType.
    const departmentDistribution = [
        { name: "Engineering", proportion: 0.25 },
        { name: "Marketing", proportion: 0.20 },
        { name: "Sales", proportion: 0.15 },
        { name: "Customer Support", proportion: 0.15 },
        { name: "Finance", proportion: 0.10 },
        { name: "Human Resources", proportion: 0.149 },
    ];
    // Sum of proportions should ideally be 1 (100%)
    // console.log("Dept Proportion Sum:", departmentDistribution.reduce((sum, d) => sum + d.proportion, 0));


    const resourceDistribution = [
        { name: "Job Boards", proportion: 0.35 },
        { name: "Social Media Campaigns", proportion: 0.30 },
        { name: "Employee Referrals", proportion: 0.20 },
        { name: "Recruitment Agencies", proportion: 0.12 },
    ];
    // Sum of proportions should ideally be 1 (100%)
    // console.log("Resource Proportion Sum:", resourceDistribution.reduce((sum, r) => sum + r.proportion, 0));


    // --- STATS DATA (largely remains the same, but now derived from dailyRecruitmentData for consistency) ---
    // Calculate current totals from the dailyRecruitmentData for the stats cards
    const getRandomizedPercentage = (actual, total, min = 5, max = 95) => {
        if (total === 0) return 0;

        const actualPercent = (actual / total) * 100;
        const deviation = Math.random() * 10 - 5; // Random between -5 and +5
        const randomized = actualPercent + deviation;

        return Math.max(min, Math.min(max, Math.round(randomized)));
    };

    const totalApplications = dailyRecruitmentData.reduce((sum, entry) => sum + entry.Applications, 0);
    const totalShortlisted = dailyRecruitmentData.reduce((sum, entry) => sum + entry.Shortlisted, 0);
    const totalSelected = dailyRecruitmentData.reduce((sum, entry) => sum + entry.Selected, 0);
    const totalNotSelected = dailyRecruitmentData.reduce((sum, entry) => sum + entry["Not Selected"], 0);
    // Dynamically calculate percentages
    const shortlistedPercent = getRandomizedPercentage(totalShortlisted, totalApplications);
    const hiredPercent = getRandomizedPercentage(totalSelected, totalApplications);
    const rejectedPercent = getRandomizedPercentage(totalNotSelected, totalApplications);

    const getRandomChangeChip = (percent) => {
        const rand = Math.random();
        if (rand < 0.33) {
            return {
                bg: "bg-green-100",
                text: "text-green-700",
                icon: <ArrowTrendingUpIcon className="w-3 h-3 text-green-600" />,
            };
        } else if (rand < 0.66) {
            return {
                bg: "bg-red-100",
                text: "text-red-600",
                icon: <ArrowTrendingDownIcon className="w-3 h-3 text-red-500" />,
            };
        } else {
            return {
                bg: "bg-yellow-100",
                text: "text-yellow-600",
                icon: <MinusIcon className="w-3 h-3 text-yellow-500" />,
            };
        }
    };

    const stats = [
        {
            title: "Applications",
            value: totalApplications.toString(),
            ...getRandomChangeChip(95), // simulate percentage
            percent: "95%",
            details: {
                agency: "Dream Homes Realty",
                lastMonth: 475,
                growth: `${totalApplications - 475} more applications than last month`
            }
        },
        {
            title: "Shortlisted",
            value: totalShortlisted.toString(),
            ...getRandomChangeChip(shortlistedPercent),
            percent: `${shortlistedPercent}%`,
            details: {
                agency: "Urban Nest Group",
                lastMonth: 107,
                growth: `${totalShortlisted - 107} more shortlisted than last month`
            }
        },
        {
            title: "Selected",
            value: totalSelected.toString(),
            ...getRandomChangeChip(hiredPercent),
            percent: `${hiredPercent}%`,
            details: {
                agency: "Skyline Realtors",
                lastMonth: 40,
                growth: `${totalSelected - 40} more hires than last month`
            }
        },
        {
            title: "Not Selected",
            value: totalNotSelected.toString(),
            ...getRandomChangeChip(rejectedPercent),
            percent: `${rejectedPercent}%`,
            details: {
                agency: "Elite Brokers",
                lastMonth: 91,
                drop: `${91 - totalNotSelected} fewer rejections than last month`
            }
        }
    ];


    const getBarColorByType = (type) => {
        switch (type) {
            case "Applications": return "#bfdbfe"; // Tailwind blue-200
            case "Shortlisted": return "#bef264";  // Tailwind lime-200
            case "Selected": return "#bbf7d0";      // Tailwind green-200
            case "Not Selected": return "#fecaca";   // Tailwind red-200
            default: return "#bfdbfe"; // Default to blue-200 if type is not recognized
        }
    };

    const getPieColorClassByType = (type) => {
        switch (type) {
            case "Applications": return "bg-blue-50";
            case "Shortlisted": return "bg-yellow-50";
            case "Selected": return "bg-green-50";
            case "Not Selected": return "bg-red-50";
            default: return "bg-blue-50";
        }
    };

    // --- PIE CHART GETTER FUNCTIONS (now derive values from total of selectedStatType) ---
    const getPieDataByType = (type) => {
        // Find the total value of the selected stat type from dailyRecruitmentData
        const totalValue = dailyRecruitmentData.reduce((sum, entry) => sum + (entry[type] || 0), 0);

        // Distribute this total value across departments based on proportions
        return departmentDistribution.map(dept => ({
            name: dept.name,
            value: Math.round(totalValue * dept.proportion) // Use Math.round for whole numbers
        })).filter(item => item.value > 0); // Filter out zero values for better pie chart rendering
    };

    const getResourceDataByType = (type) => {
        // Find the total value of the selected stat type from dailyRecruitmentData
        const totalValue = dailyRecruitmentData.reduce((sum, entry) => sum + (entry[type] || 0), 0);

        // Distribute this total value across resources based on proportions
        return resourceDistribution.map(res => ({
            name: res.name,
            value: Math.round(totalValue * res.proportion) // Use Math.round for whole numbers
        })).filter(item => item.value > 0); // Filter out zero values for better pie chart rendering
    };

    // Pre-calculate the data based on selectedStatType
    const currentPieChartData = getPieDataByType(selectedStatType);
    const currentResourceChartData = getResourceDataByType(selectedStatType);

    const events = [
        {
            "id": "job-1753249533581-t8lcig7",
            "jobTitle": "Real Estate Sales",
            "jobDescription": "Sell properties in a fast-paced real estate market.",
            "employmentTypes": [
                "full-time"
            ],
            "workingSchedule": {
                "dayShift": true,
                "nightShift": false,
                "weekendAvailability": true,
                "custom": "Flexible weekends"
            },
            "salaryType": "hourly",
            "salaryAmount": "80,000 + Commission",
            "salaryFrequency": "Weekly",
            "hiringMultiple": true,
            "location": "Bangalore",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249534307-7iy01jw",
            "jobTitle": "Channel Partners",
            "jobDescription": "Develop B2B networks and alliances.",
            "employmentTypes": [
                "contract",
                "negotiable"
            ],
            "workingSchedule": {
                "dayShift": true,
                "nightShift": false,
                "weekendAvailability": false,
                "custom": ""
            },
            "salaryType": "fixed",
            "salaryAmount": "75,000",
            "salaryFrequency": "Yearly",
            "hiringMultiple": true,
            "location": "Remote",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249535004-injnu4q",
            "jobTitle": "Tele Caller",
            "jobDescription": "Engage prospects over phone and pitch services.",
            "employmentTypes": [
                "contract",
                "negotiable"
            ],
            "workingSchedule": {
                "dayShift": true,
                "nightShift": false,
                "weekendAvailability": false,
                "custom": ""
            },
            "salaryType": "custom",
            "salaryAmount": "25",
            "salaryFrequency": "Weekly",
            "hiringMultiple": false,
            "location": "Mumbai",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249535684-rwlhae1",
            "jobTitle": "HR & Operations",
            "jobDescription": "Join our team as a HR & Operations specialist.",
            "employmentTypes": [
                "full-time",
                "remote"
            ],
            "workingSchedule": {
                "dayShift": true,
                "nightShift": false,
                "weekendAvailability": true,
                "custom": "Flexible weekends"
            },
            "salaryType": "monthly",
            "salaryAmount": "60,000",
            "salaryFrequency": "Yearly",
            "hiringMultiple": true,
            "location": "Remote",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249536283-fssr2hj",
            "jobTitle": "Accounts & Auditing",
            "jobDescription": "Join our team as a Accounts & Auditing specialist.",
            "employmentTypes": [
                "full-time",
                "remote"
            ],
            "workingSchedule": {
                "dayShift": true,
                "nightShift": false,
                "weekendAvailability": false,
                "custom": ""
            },
            "salaryType": "monthly",
            "salaryAmount": "55,000",
            "salaryFrequency": "Weekly",
            "hiringMultiple": false,
            "location": "Bangalore",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249536835-3l7uypm",
            "jobTitle": "Digital Marketing",
            "jobDescription": "This is an auto-generated description for a Digital Marketing role.",
            "employmentTypes": [
                "contract",
                "negotiable"
            ],
            "workingSchedule": {
                "dayShift": false,
                "nightShift": true,
                "weekendAvailability": true,
                "custom": "Night shift only"
            },
            "salaryType": "monthly",
            "salaryAmount": "70,000",
            "salaryFrequency": "Monthly",
            "hiringMultiple": true,
            "location": "Mumbai",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249537460-tuhp7e9",
            "jobTitle": "Web Development",
            "jobDescription": "Join our team as a Web Development specialist.",
            "employmentTypes": [
                "part-time"
            ],
            "workingSchedule": {
                "dayShift": false,
                "nightShift": true,
                "weekendAvailability": true,
                "custom": "Night shift only"
            },
            "salaryType": "fixed",
            "salaryAmount": "85,000",
            "salaryFrequency": "Monthly",
            "hiringMultiple": false,
            "location": "Mumbai",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249538068-lrp0fzr",
            "jobTitle": "CRM Executive",
            "jobDescription": "Join our team as a CRM Executive specialist.",
            "employmentTypes": [
                "on-demand"
            ],
            "workingSchedule": {
                "dayShift": false,
                "nightShift": true,
                "weekendAvailability": true,
                "custom": "Night shift only"
            },
            "salaryType": "monthly",
            "salaryAmount": "48,000",
            "salaryFrequency": "Yearly",
            "hiringMultiple": false,
            "location": "Mumbai",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249541371-lwyxixx",
            "jobTitle": "HR & Operations",
            "jobDescription": "This is an auto-generated description for a HR & Operations role.",
            "employmentTypes": [
                "on-demand"
            ],
            "workingSchedule": {
                "dayShift": true,
                "nightShift": false,
                "weekendAvailability": true,
                "custom": "Flexible weekends"
            },
            "salaryType": "custom",
            "salaryAmount": "60,000",
            "salaryFrequency": "Monthly",
            "hiringMultiple": true,
            "location": "Hyderabad",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249541981-njwzbnq",
            "jobTitle": "Tele Caller",
            "jobDescription": "Contact and follow up with clients effectively.",
            "employmentTypes": [
                "full-time",
                "remote"
            ],
            "workingSchedule": {
                "dayShift": true,
                "nightShift": false,
                "weekendAvailability": false,
                "custom": ""
            },
            "salaryType": "hourly",
            "salaryAmount": "25",
            "salaryFrequency": "Monthly",
            "hiringMultiple": false,
            "location": "Bangalore",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249542619-jsrp8je",
            "jobTitle": "Channel Partners",
            "jobDescription": "Manage and grow channel partnerships.",
            "employmentTypes": [
                "part-time"
            ],
            "workingSchedule": {
                "dayShift": true,
                "nightShift": false,
                "weekendAvailability": false,
                "custom": ""
            },
            "salaryType": "fixed",
            "salaryAmount": "70,000",
            "salaryFrequency": "Monthly",
            "hiringMultiple": true,
            "location": "Pune",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249543262-4nto179",
            "jobTitle": "Real Estate Sales",
            "jobDescription": "<p><em>Help clients buy dream homes while achieving sales goals.</em></p>",
            "employmentTypes": [
                "part-time"
            ],
            "workingSchedule": {
                "dayShift": true,
                "nightShift": false,
                "weekendAvailability": false,
                "custom": ""
            },
            "salaryType": "monthly",
            "salaryAmount": "80,000 + Commission",
            "salaryFrequency": "Yearly",
            "hiringMultiple": false,
            "location": "Hyderabad",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249546435-2guuuxp",
            "jobTitle": "CRM Executive",
            "jobDescription": "This is an auto-generated description for a CRM Executive role.",
            "employmentTypes": [
                "part-time"
            ],
            "workingSchedule": {
                "dayShift": false,
                "nightShift": true,
                "weekendAvailability": true,
                "custom": "Night shift only"
            },
            "salaryType": "custom",
            "salaryAmount": "48,000",
            "salaryFrequency": "Weekly",
            "hiringMultiple": false,
            "location": "Hyderabad",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249547108-38wh0ug",
            "jobTitle": "Web Development",
            "jobDescription": "This is an auto-generated description for a Web Development role.",
            "employmentTypes": [
                "contract",
                "negotiable"
            ],
            "workingSchedule": {
                "dayShift": true,
                "nightShift": false,
                "weekendAvailability": false,
                "custom": ""
            },
            "salaryType": "fixed",
            "salaryAmount": "25,000",
            "salaryFrequency": "Yearly",
            "hiringMultiple": true,
            "location": "Mumbai",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249547661-rpol9gb",
            "jobTitle": "Digital Marketing",
            "jobDescription": "Join our team as a Digital Marketing specialist.",
            "employmentTypes": [
                "contract",
                "negotiable"
            ],
            "workingSchedule": {
                "dayShift": true,
                "nightShift": false,
                "weekendAvailability": true,
                "custom": "Flexible weekends"
            },
            "salaryType": "custom",
            "salaryAmount": "70,000",
            "salaryFrequency": "Weekly",
            "hiringMultiple": true,
            "location": "Hyderabad",
            "postedOn": "2025-07-23"
        },
        {
            "id": "job-1753249548235-h4d4dda",
            "jobTitle": "Accounts & Auditing",
            "jobDescription": "Join our team as a Accounts & Auditing specialist.",
            "employmentTypes": [
                "full-time",
                "remote"
            ],
            "workingSchedule": {
                "dayShift": true,
                "nightShift": false,
                "weekendAvailability": false,
                "custom": ""
            },
            "salaryType": "custom",
            "salaryAmount": "50,000",
            "salaryFrequency": "Yearly",
            "hiringMultiple": true,
            "location": "Remote",
            "postedOn": "2025-07-23"
        }
    ]


    // const [startDate, setStartDate] = useState(new Date());
    const [filterType, setFilterType] = useState("Popular");
    const [showTaskForm, setShowTaskForm] = useState(false);
    const taskList = [{
        title: 'Done',
        tasks: [
            {
                id: '7',
                title: 'Fix broken image on homepage',
                dueDate: '2025-08-02',
                type: 'Bug',
                progress: 100,
                priority: 'High',
                assignedTo: ['A'],
                bookmarked: true,
                attachments: false,
                comments: true,
                duration: '00:30',
                timeSpent: '00:30',
                remaining: '00:00',
                overdue: false
            },
            {
                id: '8',
                title: 'Update user settings UI',
                dueDate: '2025-08-01',
                type: 'Improvement',
                progress: 100,
                priority: 'Medium',
                assignedTo: ['A'],
                bookmarked: false,
                attachments: true,
                comments: false,
                duration: '01:30',
                timeSpent: '01:30',
                remaining: '00:00',
                overdue: false
            }
        ]
    }].map(item => item.tasks).flat(1) || [];
    const getNumericSalary = (salaryStr) => {
        const match = salaryStr.replace(/,/g, "").match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
    };

    const filteredEvents =
        filterType === "Popular"
            ? [...events]
                .sort((a, b) => getNumericSalary(b.salaryAmount) - getNumericSalary(a.salaryAmount))
                .slice(0, 5)
            : events;

    const Icons = {
        RealEstateSales: <FaBuilding className="w-4 h-4 text-gray-800" />,
        ChannelPartners: <FaUsers className="w-4 h-4 text-gray-800" />,
        TeleCaller: <FaHeadset className="w-4 h-4 text-gray-800" />,
        HROperations: <FaUserTie className="w-4 h-4 text-gray-800" />,
        CRMExecutive: <FaUserCog className="w-4 h-4 text-gray-800" />,
        WebDevelopment: <FaCode className="w-4 h-4 text-gray-800" />,
        DigitalMarketing: <FaChartBar className="w-4 h-4 text-gray-800" />,
        AccountsAuditing: <FaFileInvoiceDollar className="w-4 h-4 text-gray-800" />,
        Default: <ExclamationTriangleIcon className="w-4 h-4 text-gray-800" />,
    };

    const jobCategories = [
        {
            title: 'Real Estate Sales',
            description: 'Sell Property Faster',
            icon: Icons.RealEstateSales,
        },
        {
            title: 'Channel Partners',
            description: 'Collaborate & Earn',
            icon: Icons.ChannelPartners,
        },
        {
            title: 'Tele Caller',
            description: 'Engage & Convert',
            icon: Icons.TeleCaller,
        },
        {
            title: 'HR & Operations',
            description: 'People & Process',
            icon: Icons.HROperations,
        },
        {
            title: 'CRM Executive',
            description: 'Manage Client Relations',
            icon: Icons.CRMExecutive,
        },
        {
            title: 'Web Development',
            description: 'Build Real Estate Tech',
            icon: Icons.WebDevelopment,
        },
        {
            title: 'Digital Marketing',
            description: 'Promote & Convert',
            icon: Icons.DigitalMarketing,
        },
        {
            title: 'Accounts & Auditing',
            description: 'Ensure Financial Clarity',
            icon: Icons.AccountsAuditing,
        },
    ];

    const getAltBackgroundColor = (selectedStatType, index) => {
        const colorPairs = {
            "Applications": ["Applications", "Shortlisted"],
            "Shortlisted": ["Shortlisted", "Applications"],
            "Selected": ["Selected", "Not Selected"],
            "Not Selected": ["Not Selected", "Selected"],
        };

        const pair = colorPairs[selectedStatType];

        if (!pair) {
            // If selectedStatType doesn't match, return null or fallback logic (up to you)
            return "#ffc9c9ff";
        }

        const [firstType, secondType] = pair;

        // Get the second color (index 1) from each corresponding stat type
        const firstColor = PALETTES_BY_STAT_TYPE[firstType]?.[2] || "#ffffff";
        const secondColor = PALETTES_BY_STAT_TYPE[secondType]?.[1] || "#ffffff";

        // Alternate based on index
        return index % 2 === 0 ? firstColor : secondColor;
    };

    // 2. Distribute total applications randomly but consistently across jobs
    const distributeApplications = (total, count) => {
        const randoms = Array.from({ length: count }, () => Math.random());
        const sum = randoms.reduce((acc, val) => acc + val, 0);
        return randoms.map((val, idx, arr) =>
            idx === count - 1
                ? total - arr.slice(0, count - 1).reduce((s, v, i) => s + Math.round((v / sum) * total), 0) // make sure total is preserved
                : Math.round((val / sum) * total)
        );
    };

    // 3. Generate once and memoize to avoid recalculating on re-render
    const jobApplications = useMemo(() => distributeApplications(totalApplications, events.length), [totalApplications, events.length]);


    function VacancyCard({ index, job }) {
        // Construct salary text based on structure
        const salaryText = `${job.salaryAmount} / ${job.salaryFrequency}`;

        return (
            <div className="border border-gray-50 rounded-xl shadow-sm p-3">
                <div className="flex items-center gap-2">
                    {/* <p className="bg-[#bef264] p-1 rounded-sm">{job.icon}</p> */}
                    <p className="p-1 rounded-sm" style={{ backgroundColor: getAltBackgroundColor(selectedStatType, index) }}>
                        {job.icon}
                    </p>
                    <h2 className="text-sm font-semibold text-gray-800">{job.jobTitle}</h2>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {job.employmentTypes.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 font-semibold text-gray-600 text-[11px] px-2 py-1 rounded-full capitalize"
                        >
                            {tag.replace("-", " ")}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center text-xs font-semibold text-gray-900">
                    <p className="mb-1">
                        <span className="">{salaryText}</span>
                    </p>
                    <p className="">
                        {job.applicants ?? jobApplications[index]} Applicants
                    </p>
                </div>
            </div>
        );
    }

    const EnhancedJobs = filteredEvents.map((job) => {
        const category = jobCategories.find(
            (cat) => cat.title.toLowerCase() === job.jobTitle.toLowerCase()
        );
        return {
            ...job,
            icon: category?.icon || <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />,
            tags: job.employmentTypes,
        };
    });

    // Function to aggregate daily data into monthly data
    const aggregateToMonthly = (data) => {
        const monthlyData = {};
        data.forEach(item => {
            const date = new Date(item.date);
            const monthKey = format(date, 'yyyy-MM'); // YYYY-MM format

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = {
                    month: monthKey,
                    Applications: 0,
                    Shortlisted: 0,
                    Selected: 0,
                    ["Not Selected"]: 0,
                };
            }
            monthlyData[monthKey].Applications += item.Applications || 0;
            monthlyData[monthKey].Shortlisted += item.Shortlisted || 0;
            monthlyData[monthKey].Selected += item.Selected || 0;
            monthlyData[monthKey]["Not Selected"] += item["Not Selected"] || 0;
        });

        // Convert object back to array and sort by month
        return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
    };

    // Use useMemo to calculate chart data based on date range and aggregation logic
    const chartData = useMemo(() => {
        // Calculate the difference in calendar months between the start and end dates
        const diffInMonths = differenceInCalendarMonths(endDate, startDate);

        // If the date range is 3 months or more, aggregate to monthly
        if (diffInMonths >= 3) {
            return aggregateToMonthly(dailyRecruitmentData);
        }
        // Otherwise, show daily data for the selected range
        return dailyRecruitmentData;
    }, [dailyRecruitmentData, startDate, endDate]); // Re-calculate when raw data or range changes

    const xAxisDataKey = differenceInCalendarMonths(endDate, startDate) >= 3 ? 'month' : 'date';

    return (
        <div className="text-gray-800 font-sans pb-6 space-y-8">
            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {stats.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedStatType(item.title)}
                                // Dynamic className based on selection and type
                                className={`px-4 py-3 rounded-xl shadow cursor-pointer transition-transform duration-200 ${selectedStatType === item.title ? item.title === "Applications" ? "bg-[#bfdbfe]" : // Tailwind blue-200
                                    item.title === "Shortlisted" ? "bg-[#bef264]" :
                                        item.title === "Selected" ? "bg-[#bbf7d0]" :
                                            item.title === "Not Selected" ? "bg-[#fecaca]" :
                                                "bg-gray-200" : "bg-white"}`}>

                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-600">{item.title}</p>
                                    <Popover className="relative">
                                        <Popover.Button className="text-sm text-gray-600 mb-2 cursor-pointer font-semibold">...</Popover.Button>

                                        <Popover.Panel className="absolute z-10 w-56 right-[-35px] mt-2 bg-white rounded-lg shadow-lg p-4 text-sm text-gray-700 space-y-1">
                                            <p><span className="font-semibold">Agency:</span> {item.details.agency}</p>
                                            {item.details.lastMonth && (
                                                <p><span className="font-semibold">Last Month:</span> {item.details.lastMonth}</p>
                                            )}
                                            {item.details.growth && (
                                                <p><span className="font-semibold">Growth:</span> {item.details.growth}</p>
                                            )}
                                            {item.details.drop && (
                                                <p><span className="font-semibold">Drop:</span> {item.details.drop}</p>
                                            )}
                                        </Popover.Panel>
                                    </Popover>
                                </div>
                                <div className="flex mt-2 justify-between items-center flex-wrap">
                                    <h2 className="text-2xl font-bold">{Number(item.value).toLocaleString()}</h2>
                                    <p className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${item.bg}`}>
                                        {item.icon}
                                        <span className={`text-xs ${item.text}`}>{item.percent}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Charts */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="bg-white shadow rounded-xl w-full lg:w-1/2">
                            <div className="flex justify-between items-center pt-4 px-4">
                                <h3 className="text-md font-semibold">{selectedStatType}</h3>
                                <Popover className="relative">
                                    {({ open, close }) => (
                                        <>
                                            <Popover.Button className="w-auto h-6 bg-gray-200 text-gray-500 px-2 rounded flex items-center justify-between text-[9px] gap-1">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span className="font-semibold">{display1Date}</span>
                                                <ChevronDownIcon className="w-4 h-4" />
                                            </Popover.Button>

                                            <Popover.Panel className="absolute z-10 mt-2 right-0">
                                                <div className="bg-white p-2 rounded shadow-lg">
                                                    <DatePicker
                                                        selectsRange
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                        onChange={(update) => {
                                                            setDateRange(update);
                                                            if (update[0] && update[1]) {
                                                                close();
                                                            }
                                                        }}
                                                        inline
                                                    />
                                                </div>
                                            </Popover.Panel>
                                        </>
                                    )}
                                </Popover>
                            </div>
                            <div className="w-full h-64 bg-white rounded-xl mt-5">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        width={750}
                                        height={200}
                                        data={chartData}
                                        barCategoryGap="30%"
                                        barGap={5}
                                    >
                                        <CartesianGrid stroke="white" strokeDashArray="4 4" />

                                        {/* XAxis: Labels are now conditionally formatted or hidden. */}
                                        <XAxis
                                            dataKey={xAxisDataKey} // 'date' for short, 'month' for long range
                                            axisLine={{ stroke: "#e5e7eb" }}
                                            tickLine={false}
                                            tickFormatter={(tick) => {
                                                try {
                                                    if (xAxisDataKey === 'month') {
                                                        return format(new Date(tick + '-01'), 'MMM yyyy');
                                                    }
                                                    return format(new Date(tick), 'dd MMM');
                                                } catch {
                                                    return tick;
                                                }
                                            }}
                                            // Conditionally rotate labels for daily view if many data points
                                            angle={xAxisDataKey === 'date' && chartData.length > 10 ? -45 : 0}
                                            textAnchor={xAxisDataKey === 'date' && chartData.length > 10 ? "end" : "middle"}
                                            interval="preserveStartEnd" // Show start and end ticks, and some in between
                                            tick={{ fontSize: 11, fill: "#9ca3af" }}
                                        />
                                        <YAxis
                                            axisLine={{ stroke: "#f3f4f6" }}    // gray-100
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: "#9ca3af" }}
                                        />
                                        <Tooltip />
                                        <Legend />

                                        {/* Conditional Bar Rendering Logic for Stacking */}

                                        {/* Case 1: selectedStatType is "Applications" */}
                                        {selectedStatType === "Applications" && (
                                            <>
                                                {/* Shortlisted at the bottom */}
                                                <Bar
                                                    dataKey="Shortlisted"
                                                    fill={getBarColorByType("Shortlisted")}
                                                    stackId="applications-shortlisted"
                                                    radius={[0, 0, 0, 0]} // Flat bottom for stack
                                                    barSize={20}
                                                />
                                                {/* Applications on top */}
                                                <Bar
                                                    dataKey="Applications"
                                                    fill={getBarColorByType("Applications")}
                                                    stackId="applications-shortlisted"
                                                    radius={[8, 8, 0, 0]} // Rounded top for stack
                                                    barSize={20}
                                                />
                                            </>
                                        )}

                                        {/* Case 2: selectedStatType is "Shortlisted" */}
                                        {selectedStatType === "Shortlisted" && (
                                            <>
                                                {/* Applications at the bottom */}
                                                <Bar
                                                    dataKey="Applications"
                                                    fill={getBarColorByType("Applications")}
                                                    stackId="applications-shortlisted"
                                                    radius={[0, 0, 0, 0]} // Flat bottom for stack
                                                    barSize={20}
                                                />
                                                {/* Shortlisted on top */}
                                                <Bar
                                                    dataKey="Shortlisted"
                                                    fill={getBarColorByType("Shortlisted")}
                                                    stackId="applications-shortlisted"
                                                    radius={[8, 8, 0, 0]} // Rounded top for stack
                                                    barSize={20}
                                                />
                                            </>
                                        )}

                                        {/* Case 3: selectedStatType is "Selected" */}
                                        {selectedStatType === "Selected" && (
                                            <>
                                                {/* Not Selected at the bottom */}
                                                <Bar
                                                    dataKey="Not Selected"
                                                    fill={getBarColorByType("Not Selected")}
                                                    stackId="selected-notselected"
                                                    radius={[0, 0, 0, 0]} // Flat bottom for stack
                                                    barSize={20}
                                                />
                                                {/* Selected on top */}
                                                <Bar
                                                    dataKey="Selected"
                                                    fill={getBarColorByType("Selected")}
                                                    stackId="selected-notselected"
                                                    radius={[8, 8, 0, 0]} // Rounded top for stack
                                                    barSize={20}
                                                />
                                            </>
                                        )}

                                        {/* Case 4: selectedStatType is "Not Selected" */}
                                        {selectedStatType === "Not Selected" && (
                                            <>
                                                {/* Selected at the bottom */}
                                                <Bar
                                                    dataKey="Selected"
                                                    fill={getBarColorByType("Selected")}
                                                    stackId="selected-notselected"
                                                    radius={[0, 0, 0, 0]} // Flat bottom for stack
                                                    barSize={20}
                                                />
                                                {/* Not Selected on top */}
                                                <Bar
                                                    dataKey="Not Selected"
                                                    fill={getBarColorByType("Not Selected")}
                                                    stackId="selected-notselected"
                                                    radius={[8, 8, 0, 0]} // Rounded top for stack
                                                    barSize={20}
                                                />
                                            </>
                                        )}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-4 shadow rounded-xl w-full lg:w-1/2">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-md font-semibold">{selectedStatType} by Deportment</h3>
                                <Popover className="relative ">
                                    {({ open, close }) => (
                                        <>
                                            <Popover.Button className="w-26 h-6 bg-gray-200 text-gray-500 px-2 rounded flex items-center justify-between text-[9px]">
                                                <CalendarIcon className="w-4 h-4" />
                                                <span className="font-semibold">{display2Date}</span>
                                                <ChevronDownIcon className="w-4 h-4" />
                                            </Popover.Button>

                                            <Popover.Panel className="absolute z-10 mt-2 right-0">
                                                <div className="bg-white p-2 rounded shadow-lg">
                                                    <DatePicker
                                                        selected={selectedDate}
                                                        onChange={(date) => { setSelectedDate(date); close() }}
                                                        inline
                                                    />
                                                </div>
                                            </Popover.Panel>
                                        </>
                                    )}
                                </Popover>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between w-full bg-white rounded-xl">
                                <div className="flex flex-col justify-center items-center">
                                    <PieChart width={200} height={200}>
                                        <Pie
                                            data={currentPieChartData} // Use the dynamic data
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={45}
                                            outerRadius={80}
                                            paddingAngle={0}
                                            stroke="none"
                                        >
                                            {currentPieChartData.map((entry, index) => ( // Map over the dynamic data
                                                <Cell key={`cell-dept-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                    <p className="font-bold text-xl">{Number(currentPieChartData.reduce((sum, item) => sum + item.value, 0) || 0).toLocaleString()}</p>
                                    <p>Total {selectedStatType}</p>
                                </div>
                                <ul className="text-xs text-gray-700 mt-6">
                                    {currentPieChartData.map((item, idx) => ( // Map over the dynamic data for the legend
                                        <li key={idx} className="flex items-center gap-2">
                                            <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                            {item.name}: {item.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className={`${getPieColorClassByType(selectedStatType)} pt-3 shadow rounded-xl w-full space-y-4`}>
                    <h3 className="text-md font-semibold text-center">Applicant Resources</h3>
                    <div className="flex justify-center items-center">
                        <PieChart width={250} height={250}>
                            <Pie
                                data={currentResourceChartData} // Use the dynamic data
                                cx="50%"
                                cy="50%"
                                innerRadius={85}
                                outerRadius={102}
                                paddingAngle={2}
                                stroke="none"
                            >
                                {currentResourceChartData.map((entry, index) => ( // Map over the dynamic data
                                    <Cell key={`cell-resource-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                                <Label
                                    position="center"
                                    content={() => (
                                        <>
                                            <text x="50%" y="48%" textAnchor="middle" dominantBaseline="central" fontSize="16" fontWeight="bold" fill="#333">
                                                {Number(currentResourceChartData.reduce((sum, item) => sum + item.value, 0) || 0).toLocaleString()}
                                            </text>
                                            <text x="50%" y="55%" textAnchor="middle" dominantBaseline="central" fontSize="11" fill="#666">
                                                Total Applicants
                                            </text>
                                        </>
                                    )}
                                />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <div className="flex justify-center items-center">
                        <ul className="text-xs text-gray-700 my-2 grid grid-cols-2 gap-2 list-none">
                            {currentResourceChartData.map((item, idx) => ( // Map over the dynamic data for the legend
                                <li key={idx} className="flex gap-1 items-center">
                                    <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                    <div className="leading-tight">
                                        <span className="font-medium text-gray-900">{item.value}</span>
                                        <span className="text-[11px] text-gray-500 block">{item.name}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Events, Tasks, Schedule */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                {/* Events */}
                <div className="bg-white p-2 rounded-xl shadow w-full sm:w-1/2">
                    <div className="flex gap-5 justify-between items-center">
                        <p className="text-medium font-semibold">Current Vacancies <span className="text-medium">({filteredEvents.length})</span></p>
                        <div className="flex gap-2">
                            <div
                                onClick={() => setFilterType("Popular")}
                                className={`flex gap-1 text-xs cursor-pointer ${filterType === "Popular" ? "text-lime-600 font-bold text-lg" : "text-blue-400 hover:text-orange-600"}`}
                            >
                                <p>Popular</p>
                            </div>
                            <p
                                onClick={() => setFilterType("All")}
                                className={`text-xs cursor-pointer ${filterType === "All" ? "text-lime-600 font-bold text-lg" : "text-blue-400 hover:text-orange-600"}`}
                            >
                                See All
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-[300px] overflow-y-auto">
                        {EnhancedJobs.map((job, indx) => (
                            <VacancyCard key={indx} index={indx} job={job} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 w-full sm:w-1/2">
                    {/* Tasks */}
                    <div className="bg-white p-4 rounded-xl shadow w-full">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-md font-semibold">Tasks</h3>
                            <button className="w-5 h-5 bg-lime-300 p-1 rounded" onClick={() => setShowTaskForm(!showTaskForm)}><PlusIcon /></button>
                        </div>
                        <div className="space-y-4  h-[300px] overflow-y-auto">
                            {taskList.map((task, idx) => (
                                <div key={idx} className="flex text-xs items-center gap-4 bg-gray-200 rounded-lg p-1">
                                    <div className="relative w-12 h-12">
                                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                                            <path
                                                className="text-blue-200"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                fill="none"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path
                                                className="text-blue-500"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeDasharray={`${task.progress}, 100`}
                                                fill="none"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
                                            {task.progress}%
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-semibold text-gray-800">{task.title}</h4>
                                        <p className="text-xs text-gray-500">{task.priority} — {task.dueDate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Schedule */}
                    <div className="bg-white p-4 rounded-xl shadow w-full">
                        <div className="flex justify-between mb-3">
                            <h3 className="text-sm font-semibold">Daily Schedule</h3>
                            <Popover className="relative">
                                {({ open, close }) => (
                                    <>
                                        <Popover.Button className="w-32 h-6 bg-gray-200 text-gray-500 px-2 rounded flex items-center justify-between text-[9px]">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span className="font-semibold text-[10px]">{displayScheduleDateDate}</span>
                                            <ChevronDownIcon className="w-4 h-4" />
                                        </Popover.Button>
                                        <Popover.Panel className="absolute z-30 mt-2 right-0">
                                            <div className="bg-white p-2 rounded shadow-lg">
                                                <DatePicker
                                                    selected={selectScheduleDate}
                                                    onChange={(date) => {
                                                        setSelectScheduleDate(date);
                                                        close(); // close popover
                                                    }}
                                                    inline
                                                />
                                            </div>
                                        </Popover.Panel>
                                    </>
                                )}
                            </Popover>
                        </div>

                        <div className="relative h-[300px] overflow-y-auto">
                            {filteredData.length === 0 ? (
                                <p className="text-center text-xs text-gray-400">No events for this day.</p>
                            ) : (
                                filteredData.map((item, index) => {
                                    const bgColorClass = item.color;
                                    const borderColorHex = tailwindBgToHex[bgColorClass] || 'gray';

                                    return (
                                        <div key={index} className="flex items-start gap-4 relative mt-2">
                                            <div className="w-[18%] text-xs font-medium text-gray-500">{item.time}</div>

                                            <div className="flex flex-col items-center relative">
                                                <span className={`w-3 h-3 rounded-full ${bgColorClass} z-10`} />

                                                <div
                                                    className="absolute left-1/2 transform -translate-x-1/2 w-px border-l-2 border-dashed"
                                                    style={{
                                                        borderColor: borderColorHex,
                                                        top: '6px',
                                                        height: index === filteredData.length - 1 ? '3rem' : '4.3rem'
                                                    }}
                                                />
                                            </div>

                                            <div className={`w-[75%] flex flex-col gap-1 p-2 rounded-xl ${bgColorClass}`}>
                                                <span className="text-xs font-semibold text-gray-900">{item.title}</span>
                                                <span className="text-xs text-gray-600">{item.dept}</span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
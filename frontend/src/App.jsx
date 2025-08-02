import React, { useEffect, useState, useRef, useContext } from 'react'; // Added useContext
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Article from './pages/Article';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin'; // Changed to AdminDashboard for consistency
import RootContext from './config/rootcontext';
import { BellAlertIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/24/solid';
import { FaThLarge, FaSuitcase, FaCalendarAlt, FaCog, FaBell } from "react-icons/fa"; // Simplified imports
import Calendar from './pages/Calendar';
import SettingsPage from './pages/Settings';
import Toast from './pages/toast';

function App() {
  const location = useLocation();
  const navigate = useNavigate(); // Get navigate hook here for App-level redirection
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Initialize rootContext with data from localStorage if available, and set loader to true initially
  const [rootContext, setRootContext] = useState(() => {
    const storedUserDetails = typeof window !== "undefined" ? localStorage.getItem("user_details") : null;
    const storedAuthToken = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    let userDetails = null;
    let authenticated = false;

    if (storedUserDetails && storedAuthToken) {
      try {
        userDetails = JSON.parse(storedUserDetails);
        authenticated = true;
      } catch (e) {
        console.error("Failed to parse user_details from localStorage", e);
        // Clear invalid storage if parsing fails
        localStorage.removeItem("user_details");
        localStorage.removeItem("auth_token");
      }
    }

    return {
      authenticated: authenticated,
      loader: true, // Keep loader true initially to signify loading state
      user: userDetails || { name: "", email: "", mobile: "", password: "", token: "", isAdmin: false },
      accessToken: storedAuthToken || '',
      remember: false, // You might want to derive this from stored settings
      toast: { show: false, dismiss: true, type: '', title: '', message: '' },
      // ... (your existing jobs, tasksColumns, schedule data)
      jobs: [
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
          "jobDescription": "Help clients buy dream homes while achieving sales goals.",
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
          "salaryAmount": "95,000",
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
      ],
      notification: false,
      tasksColumns: [
        {
          title: 'Backlog',
          tasks: [
            {
              id: '1',
              title: 'Add discount code to checkout page',
              dueDate: '2025-08-10',
              type: 'Feature Request',
              progress: 60,
              priority: 'High',
              assignedTo: ['A'],
              bookmarked: true,
              attachments: true,
              comments: false,
              duration: '03:14',
              timeSpent: '00:50',
              remaining: '02:24',
              overdue: false
            },
            {
              id: '2',
              title: 'Provide documentation on integrations',
              dueDate: '2025-08-07',
              progress: 25,
              priority: 'Medium',
              assignedTo: ['A'],
              bookmarked: false,
              attachments: true,
              comments: false,
              duration: '03:36',
              timeSpent: '02:00',
              remaining: '01:36',
              overdue: false
            }
          ]
        },
        {
          title: 'In Progress',
          tasks: [
            {
              id: '3',
              title: 'Fix bug in mobile nav',
              dueDate: '2025-08-01',
              type: 'Bug',
              progress: 30,
              priority: 'High',
              assignedTo: ['A'],
              bookmarked: true,
              attachments: true,
              comments: true,
              duration: '02:00',
              timeSpent: '01:00',
              remaining: '01:00',
              overdue: false
            },
            {
              id: '4',
              title: 'Refactor dashboard layout',
              dueDate: '2025-08-06',
              type: 'Feature Request',
              progress: 10,
              priority: 'Low',
              assignedTo: ['A'],
              bookmarked: false,
              attachments: false,
              comments: true,
              duration: '02:40',
              timeSpent: '00:40',
              remaining: '02:00',
              overdue: false
            }
          ]
        },
        {
          title: 'Review',
          tasks: [
            {
              id: '5',
              title: 'Add API rate limit warning',
              dueDate: '2025-08-09',
              type: 'Feature Request',
              progress: 80,
              priority: 'Medium',
              assignedTo: ['A'],
              bookmarked: true,
              attachments: false,
              comments: false,
              duration: '01:30',
              timeSpent: '01:20',
              remaining: '00:10',
              overdue: false
            },
            {
              id: '6',
              title: 'Remove legacy payment code',
              dueDate: '2025-07-31',
              type: 'Cleanup',
              progress: 90,
              priority: 'Low',
              assignedTo: ['A'],
              bookmarked: false,
              attachments: true,
              comments: true,
              duration: '00:45',
              timeSpent: '00:30',
              remaining: '00:15',
              overdue: false
            }
          ]
        },
        {
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
        }
      ],
      schedule: [
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
          category: 'Personal',
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
          allDay: false,
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
      ],
      notification: false,
    };
  });
  const { pathname } = useLocation();
  const [loadingParams, setLoadingParams] = useState(true);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const name = params.get('name');
    const email = params.get('email');

    const fromQuery = token && name && email;

    const loadFromLocalStorage = () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user_details"));
        const storedToken = localStorage.getItem("auth_token");

        if (storedUser && storedToken && storedUser.token === storedToken) {
          setRootContext(prev => ({
            ...prev,
            authenticated: true,
            user: storedUser,
            accessToken: storedToken,
            loader: false,
          }));
          return true;
        }
      } catch (err) {
        console.error("Invalid localStorage data:", err);
      }

      localStorage.clear();
      setRootContext(prev => ({
        ...prev,
        authenticated: false,
        user: null,
        accessToken: '',
        loader: false,
      }));
      return false;
    };

    const saveFromQueryParams = () => {
      const userDetails = {
        name: decodeURIComponent(name),
        email: decodeURIComponent(email),
        token,
        isAdmin: true,
      };

      try {
        localStorage.setItem("user_details", JSON.stringify(userDetails));
        localStorage.setItem("auth_token", token);

        setRootContext(prev => ({
          ...prev,
          authenticated: true,
          user: userDetails,
          accessToken: token,
          loader: false,
        }));

        console.log("User authenticated via URL params. Cleaning URL...");
        navigate('/admin', { replace: true });
        return true;
      } catch (err) {
        console.error("Error saving user from URL params:", err);
        localStorage.clear();
        setRootContext(prev => ({
          ...prev,
          authenticated: false,
          user: null,
          accessToken: '',
          loader: false,
        }));
        return false;
      }
    };

    const authenticated = fromQuery ? saveFromQueryParams() : loadFromLocalStorage();

    if (!authenticated) {
      console.warn("User not authenticated. Redirecting to login...");
      navigate('/login');
    }

    setLoadingParams(false);
  }, [location.search, pathname, navigate, setRootContext]);



  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logOut = () => {
    localStorage.clear();
    setRootContext(prev => ({
      ...prev,
      authenticated: false,
      user: { name: "", email: "", mobile: "", password: "", token: "", isAdmin: false },
      accessToken: '',
    }));
    navigate(`/login`); // Use navigate for React Router v6
  };

  const sidebarItems = [
    { icon: <FaThLarge />, label: "Dashboard", link: "/admin" }, // Assuming /admin is the dashboard
    { icon: <FaSuitcase />, label: "Articles", link: "/articles" },
    { icon: <FaCalendarAlt />, label: "Calendar", link: "/calendar" },
    { icon: <FaCog />, label: "Settings", link: "/settings" },
  ];

  const Sidebar = ({ isMobileOpen, toggleSidebar }) => {
    const navigate = useNavigate(); // ✅ Correct hook usage within component

    const isPathActive = (itemLink) => {
      return pathname === itemLink || pathname.startsWith(`${itemLink}/`);
    };

    return (
      <div
        className={`fixed top-26 sm:top-16 left-0 h-screen w-36 bg-white shadow-md z-50 transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0 z-50" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="p-4 space-y-4">
          {sidebarItems.map((item, idx) => {
            const isActive = isPathActive(item.link);
            return (
              <div
                key={idx}
                onClick={() => {
                  navigate(item.link); // ✅ Use navigate here
                  toggleSidebar(false);
                }}
                className={`flex items-center gap-3 px-2 py-1 rounded-md cursor-pointer transition-colors duration-200 ${isActive
                  ? "text-black bg-indigo-200 font-bold"
                  : "text-black hover:text-black hover:font-medium"
                  }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const NotificationBell = ({ count }) => {
    return (
      <div className="relative w-4 h-4">
        <FaBell className="text-gray-700 dark:text-white w-full h-full" />
        {count > 0 && (
          <span className="absolute -top-[2px] -right-[2px] min-w-[12px] h-[12px] px-[2px] text-[8px] leading-[12px] text-white bg-red-500 rounded-full text-center ring-1 ring-white dark:ring-gray-800">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>
    );
  };

  const Topbar = () => (
    <div className="flex h-26 sm:h-16 flex-wrap sm:flex-nowrap fixed top-0 left-0 w-full z-50 justify-between items-center px-4 sm:px-6 py-2 bg-white shadow-md gap-2">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="w-32 h-16 cursor-pointer bg-green-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">logo</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
          className="sm:hidden text-gray-700 focus:outline-none"
        >
          ☰
        </button>
      </div>

      <div className="flex-1 flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
        <input
          type="text"
          placeholder="Search candidate, vacancy, etc"
          className="px-3 py-2 border rounded w-full sm:w-1/3 text-sm"
        />
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          {rootContext.notification ? <NotificationBell count={3} /> : <FaBell className="text-gray-600" />}
          <div className="flex items-center gap-1 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
            <UserIcon className="w-4 h-4 text-gray-400" />
            <div className="text-sm flex flex-col sm:flex-row sm:items-center gap-1">
              {/* 👇 Small screens: initial in a circle */}
              <div className="sm:hidden w-6 h-6 rounded-full bg-indigo-900 text-white flex items-center justify-center font-semibold">
                {(rootContext?.user?.name || "U").charAt(0).toUpperCase()}
              </div>

              {/* 👇 Larger screens: full name and role */}
              <div className="hidden sm:flex flex-col">
                <p className="font-semibold">{rootContext?.user?.name || "User"}</p>
                <p className="text-gray-500 text-xs">Role</p>
              </div>
            </div>
            <p className="hidden sm:block"><ChevronDownIcon className="w-4 h-4 text-gray-400" /></p>
          </div>
          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-36 bg-white shadow-lg border rounded-md z-50">
              <button
                onClick={logOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // If still loading initial context or authentication state, show a loading screen
  if (rootContext.loader) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-2xl">
        Loading application...
      </div>
    );
  }

  return (
    <RootContext.Provider value={{ rootContext, setRootContext }}>
      <div className="antialiased">
        <div className="flex flex-col sm:flex-row pt-26 sm:pt-16 bg-gray-100 min-h-screen">
          {/* Only render Sidebar if authenticated */}
          {rootContext.authenticated && (
            <Sidebar isMobileOpen={isMobileSidebarOpen} toggleSidebar={setMobileSidebarOpen} />
          )}
          <main className={`flex-1 p-1 w-full ${rootContext.authenticated ? 'sm:ml-36' : ''}`}>
            {rootContext.authenticated && <Topbar />}
            <Routes>
              {/* Always register public routes */}
              <Route path="/login" element={<Login />} />

              {/* Protected routes */}
              {rootContext.authenticated && (
                <>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/article/:slug" element={<Article />} />
                  <Route path="/articles" element={<Home />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </>
              )}

              {/* Optional: Redirect all other routes */}
              <Route path="*" element={<Navigate to={rootContext.authenticated ? "/" : "/login"} replace />} />
            </Routes>
            <Toast />
          </main>
        </div>
      </div>
    </RootContext.Provider >
  );
}

export default App;
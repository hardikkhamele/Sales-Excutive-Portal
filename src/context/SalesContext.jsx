import React, { createContext, useContext, useState } from "react";
import {
  initialCompanies,
  dailyActivities as mockDaily,
  upcomingActivities as mockUpcoming,
  followUpReminders as mockReminders,
  initialCalendarEvents as mockCalendar,
  initialUserProfile,
  initialNotifications,
  initialCallLogs
} from "../data/mockData";
import { toast } from "react-toastify";

const SalesContext = createContext(null);

export const SalesProvider = ({ children }) => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [callLogs, setCallLogs] = useState(initialCallLogs);
  const [activities, setActivities] = useState([
    ...mockDaily,
    ...mockUpcoming.map(u => ({
      id: u.id,
      time: u.time,
      title: `${u.activity} with ${u.company}`,
      company: u.company,
      type: u.type,
      status: u.status,
      date: u.date,
      notes: "Scheduled activity."
    }))
  ]);
  const [reminders, setReminders] = useState(mockReminders);
  const [calendarEvents, setCalendarEvents] = useState(mockCalendar);
  const [userProfile, setUserProfile] = useState(initialUserProfile);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");

  // CRUD for Companies
  const addCompany = (newComp) => {
    const created = {
      ...newComp,
      id: `COMP-${String(companies.length + 1).padStart(3, "0")}`,
      status: newComp.status || "Pending",
      onboardedOn: newComp.onboardedOn || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      timeline: [
        { step: "Company Added", date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }), completed: true },
        { step: "Document Submitted", date: "Pending", completed: false },
        { step: "Verification", date: "Pending", completed: false },
        { step: "Review", date: "Pending", completed: false },
        { step: "Completed", date: "Pending", completed: false }
      ],
      history: [
        { title: `Company added by ${userProfile.fullName}`, date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) }
      ]
    };
    setCompanies(prev => [created, ...prev]);
    toast.success("Company added successfully!");
    return created;
  };

  const updateCompany = (id, updatedData) => {
    setCompanies(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updatedData } : c))
    );
    toast.success("Company updated successfully!");
  };

  const deleteCompany = (id) => {
    setCompanies(prev => prev.filter(c => c.id !== id));
    toast.success("Company deleted successfully!");
  };

  const getCompanyById = (id) => {
    return companies.find(c => c.id === id);
  };

  // CRUD for Call Logs
  const addCallLog = (callData) => {
    const newCall = {
      ...callData,
      id: `CALL-${Date.now().toString().slice(-4)}`,
      date: callData.date || new Date().toISOString().split("T")[0],
      time: callData.time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      caller: userProfile.fullName || "Rahul Sharma",
      status: callData.status || "Completed",
      outcome: callData.outcome || "Connected",
      duration: callData.duration || "5 mins"
    };

    setCallLogs(prev => [newCall, ...prev]);

    // Also add to activities timeline if needed
    const newActivity = {
      id: `ACT-C-${Date.now().toString().slice(-4)}`,
      time: newCall.time,
      title: `Call: ${newCall.company} (${newCall.outcome})`,
      company: newCall.company,
      type: "Discussion",
      status: "Completed",
      date: newCall.date,
      notes: newCall.notes || "Sales call completed."
    };
    setActivities(prev => [newActivity, ...prev]);

    toast.success("Call log saved successfully!");
    return newCall;
  };

  const deleteCallLog = (id) => {
    setCallLogs(prev => prev.filter(c => c.id !== id));
    toast.success("Call log removed!");
  };

  // CRUD for Activities
  const addActivity = (actData) => {
    const newAct = {
      ...actData,
      id: `ACT-${String(activities.length + 1).padStart(3, "0")}`,
      status: actData.status || "Scheduled",
      time: actData.time || "10:00 AM",
      date: actData.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    };
    setActivities(prev => [newAct, ...prev]);

    // Also add event to calendar if date matches
    if (actData.date) {
      setCalendarEvents(prev => [
        {
          id: `CAL-${prev.length + 1}`,
          date: actData.date.includes("-") ? actData.date : "2024-05-20",
          time: actData.time || "10:00 AM",
          title: `${actData.time || "10:00 AM"} ${actData.type || "Activity"} (${actData.company})`,
          company: actData.company,
          type: actData.type || "Discussion",
          status: actData.status || "Scheduled"
        },
        ...prev
      ]);
    }

    toast.success("Activity added successfully!");
  };

  // Profile Update
  const updateProfile = (profileData) => {
    setUserProfile(prev => ({ ...prev, ...profileData }));
    toast.success("Profile updated successfully!");
  };

  // Mark all notifications as read
  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <SalesContext.Provider
      value={{
        companies,
        callLogs,
        activities,
        reminders,
        calendarEvents,
        userProfile,
        notifications,
        searchQuery,
        setSearchQuery,
        addCompany,
        updateCompany,
        deleteCompany,
        getCompanyById,
        addCallLog,
        deleteCallLog,
        addActivity,
        updateProfile,
        markNotificationsRead
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error("useSales must be used within a SalesProvider");
  }
  return context;
};

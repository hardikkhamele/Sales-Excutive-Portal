import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  Building2,
  UserCheck,
  Mail,
  Phone,
  Globe,
  MapPin,
  FileText,
  Briefcase,
  Plus,
  Trash2,
  Lock,
  CheckCircle2
} from "lucide-react";
import { Button } from "../components/common/Button";
import { useSales } from "../context/SalesContext";
import { Breadcrumb } from "../components/common/Breadcrumb";
import { toast } from "react-toastify";

const INDUSTRY_OPTIONS = [
  "Information Technology",
  "Software Development",
  "Financial Services",
  "Telecommunications",
  "Healthcare Tech",
  "Education & EdTech",
  "Cloud & Infrastructure",
  "Human Resources",
  "Digital Marketing",
  "Logistics & Supply Chain",
  "Manufacturing & Industrial",
  "Retail & E-Commerce",
  "Others"
];

const stateOptions = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Jammu and Kashmir", "Ladakh", "Delhi",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep", "Puducherry"
];
const cityOptions = [
  "Bengaluru", "Chennai", "Hyderabad", "Mumbai", "Delhi", "Pune", "Kolkata",
  "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Gurugram", "Noida", "Indore",
  "Bhopal", "Surat", "Visakhapatnam", "Coimbatore", "Patna", "Thiruvananthapuram",
  "Kochi", "Mysuru", "Nashik", "Vadodara", "Hubballi", "Dehradun", "Raipur",
  "Amritsar", "Nagpur", "Jodhpur", "Bhubaneswar", "Agra", "Kanpur", "Varanasi"
];
const experienceOptions = [
  "0-1 Years", "1-2 Years", "2-3 Years", "3-4 Years", "4-5 Years", "5-6 Years",
  "6-7 Years", "7-8 Years", "8-9 Years", "9-10 Years", "10+ Years"
];
const workModeOptions = ["Remote", "Onsite", "Hybrid"];
const noticePeriodOptions = ["Immediate", "15 Days", "30 Days", "45 Days", "60 Days", "90 Days"];

const emptyRequirement = {
  profile: "",
  state: "",
  city: "",
  category: "",
  technology: "",
  requiredCandidates: "",
  experience: "",
  budget: "",
  workMode: "",
  noticePeriod: "",
  deadline: ""
};

export const AddCompany = () => {
  const navigate = useNavigate();
  const { addCompany } = useSales();

  const [formData, setFormData] = useState({
    name: "",
    companyType: "",
    industry: "Information Technology",
    customIndustry: "",
    companyEmail: "",
    companyPhone: "",
    website: "",
    address: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    notes: "",
    status: "Pending"
  });

  // Phase state: false = company form editable, true = company locked + requirement fields visible
  const [isCompanyLocked, setIsCompanyLocked] = useState(false);
  const [requirementsList, setRequirementsList] = useState([{ ...emptyRequirement }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = () => {
    const finalIndustry =
      formData.industry === "Others" && formData.customIndustry.trim()
        ? formData.customIndustry.trim()
        : formData.industry;

    return {
      ...formData,
      name: formData.name.trim() || "Untitled Company",
      industry: finalIndustry,
      email: formData.companyEmail || formData.contactEmail || "N/A",
      phone: formData.companyPhone || formData.contactPhone || "N/A",
      contactPerson: formData.contactPerson || "N/A",
      address: formData.address || "N/A"
    };
  };

  // Save Company only
  const handleSubmit = (e) => {
    e.preventDefault();
    addCompany(buildPayload());
    toast.success("Company saved successfully!");
    navigate("/companies");
  };

  // Lock company form and show requirement fields
  const handleSaveAndAddRequirement = () => {
    setIsCompanyLocked(true);
    toast.success("Company info locked! Now add requirements below.");
  };

  // Requirement handlers
  const handleFieldChange = (index, name, value) => {
    setRequirementsList((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [name]: value };
      return next;
    });
  };

  const handleAddRequirementBlock = () => {
    setRequirementsList((prev) => [...prev, { ...emptyRequirement }]);
  };

  const handleRemoveRequirementBlock = (index) => {
    setRequirementsList((prev) => prev.filter((_, i) => i !== index));
  };

  // Final submit: save company + all requirements
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const payload = buildPayload();
    // Attach requirements to payload
    payload.requirements = requirementsList;
    addCompany(payload);
    toast.success(`Company & ${requirementsList.length} requirement(s) saved successfully!`);
    navigate("/companies");
  };

  // Common disabled input class
  const lockedInputClass = "w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 cursor-not-allowed";
  const activeInputClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";

  return (
    <div className="w-full space-y-3">
      {/* Top Navigation & Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Companies", path: "/companies" },
          { label: "Add New Company" }
        ]}
        backPath="/companies"
        className="mb-0"
      />

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
        <div className="border-b border-slate-100 pb-6 mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Add New Company</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">Fill in any company or contact details (all fields are optional)</p>
        </div>

        <form onSubmit={isCompanyLocked ? handleFinalSubmit : handleSubmit} className="space-y-8">

          {/* ──────────────────── COMPANY INFO SECTION ──────────────────── */}
          <div className={`space-y-4 ${isCompanyLocked ? "relative" : ""}`}>
            {/* Locked overlay badge */}
            {isCompanyLocked && (
              <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-emerald-700">Company info saved & locked — add requirements below</span>
                <button
                  type="button"
                  onClick={() => setIsCompanyLocked(false)}
                  className="ml-auto text-xs font-semibold text-emerald-600 hover:text-emerald-800 underline cursor-pointer"
                >
                  Unlock & Edit
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              {isCompanyLocked ? (
                <Lock className="w-4 h-4 text-emerald-600" />
              ) : (
                <Building2 className="w-4 h-4 text-blue-600" />
              )}
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Company Information</h3>
            </div>

            {/* IT / NON-IT Company Type Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Company Type
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={isCompanyLocked}
                  onClick={() => setFormData((prev) => ({ ...prev, companyType: "IT" }))}
                  className={`px-5 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                    formData.companyType === "IT"
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                  } ${isCompanyLocked ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  IT
                </button>
                <button
                  type="button"
                  disabled={isCompanyLocked}
                  onClick={() => setFormData((prev) => ({ ...prev, companyType: "Non IT" }))}
                  className={`px-5 py-2 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                    formData.companyType === "Non IT"
                      ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20"
                      : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:bg-purple-50"
                  } ${isCompanyLocked ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  NON - IT
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isCompanyLocked}
                    placeholder="Enter company name"
                    className={isCompanyLocked ? lockedInputClass : activeInputClass}
                  />
                </div>
              </div>

              {/* Industry Sector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Industry Sector
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    disabled={isCompanyLocked}
                    className={`${isCompanyLocked ? lockedInputClass : activeInputClass} cursor-pointer`}
                  >
                    {INDUSTRY_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Industry (Shown if 'Others' selected) */}
              {formData.industry === "Others" && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Specify Industry Name
                  </label>
                  <input
                    type="text"
                    name="customIndustry"
                    value={formData.customIndustry}
                    onChange={handleChange}
                    disabled={isCompanyLocked}
                    placeholder="Enter industry sector name"
                    className={`w-full px-4 py-2.5 ${isCompanyLocked ? "bg-slate-100 cursor-not-allowed text-slate-600" : "bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"} border border-slate-200 rounded-xl text-xs font-medium transition-all`}
                  />
                </div>
              )}

              {/* Company Official Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Company Official Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    disabled={isCompanyLocked}
                    placeholder="e.g. contact@company.com"
                    className={isCompanyLocked ? lockedInputClass : activeInputClass}
                  />
                </div>
              </div>

              {/* Company Mobile / Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Company Mobile / Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                    disabled={isCompanyLocked}
                    placeholder="e.g. +91 011-23456789 / +91 98765 00000"
                    className={isCompanyLocked ? lockedInputClass : activeInputClass}
                  />
                </div>
              </div>

              {/* Website */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    disabled={isCompanyLocked}
                    placeholder="e.g. https://www.company.com"
                    className={isCompanyLocked ? lockedInputClass : activeInputClass}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    disabled={isCompanyLocked}
                    placeholder="Enter complete company address"
                    className={`${isCompanyLocked ? "w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 cursor-not-allowed" : "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────── CONTACT PERSON / HR ──────────────────── */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              {isCompanyLocked ? (
                <Lock className="w-4 h-4 text-emerald-600" />
              ) : (
                <UserCheck className="w-4 h-4 text-emerald-600" />
              )}
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Contact Person / HR Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Contact Person / HR Name
                </label>
                <div className="relative">
                  <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    disabled={isCompanyLocked}
                    placeholder="e.g. John Doe (HR Manager)"
                    className={isCompanyLocked ? lockedInputClass : activeInputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  HR Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    disabled={isCompanyLocked}
                    placeholder="e.g. +91 98765 43210"
                    className={isCompanyLocked ? lockedInputClass : activeInputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  HR Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    disabled={isCompanyLocked}
                    placeholder="e.g. hr@company.com"
                    className={isCompanyLocked ? lockedInputClass : activeInputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────── NOTES ──────────────────── */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Notes
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                disabled={isCompanyLocked}
                placeholder="Enter any additional notes or details"
                className={`${isCompanyLocked ? "w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 cursor-not-allowed" : "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"}`}
              />
            </div>
          </div>

          {/* ──────────────────── REQUIREMENT SECTION (visible after lock) ──────────────────── */}
          {isCompanyLocked && (
            <div className="space-y-5 pt-6 border-t-2 border-purple-200">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Briefcase className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Job Requirements</h3>
              </div>

              <div className="space-y-5">
                {requirementsList.map((req, index) => (
                  <div
                    key={index}
                    className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-extrabold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800">
                          Requirement #{index + 1}
                        </h4>
                      </div>
                      {requirementsList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveRequirementBlock(index)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove this requirement"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="space-y-1.5">
                        <span className="text-xs font-bold uppercase text-slate-600">Category (IT / Non IT)</span>
                        <select
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          value={req.category}
                          onChange={(e) => handleFieldChange(index, "category", e.target.value)}
                        >
                          <option value="">Select Category</option>
                          <option value="IT">IT</option>
                          <option value="Non IT">Non IT</option>
                        </select>
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-xs font-bold uppercase text-slate-600">Profile</span>
                        <input
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          value={req.profile}
                          onChange={(e) => handleFieldChange(index, "profile", e.target.value)}
                          placeholder="e.g. Senior Frontend Developer"
                        />
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-xs font-bold uppercase text-slate-600">State</span>
                        <select
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          value={req.state}
                          onChange={(e) => handleFieldChange(index, "state", e.target.value)}
                        >
                          <option value="">Select State</option>
                          {stateOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-xs font-bold uppercase text-slate-600">City</span>
                        <select
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          value={req.city}
                          onChange={(e) => handleFieldChange(index, "city", e.target.value)}
                        >
                          <option value="">Select City</option>
                          {cityOptions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-xs font-bold uppercase text-slate-600">Technology</span>
                        <input
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          value={req.technology}
                          onChange={(e) => handleFieldChange(index, "technology", e.target.value)}
                          placeholder="e.g. React, Node.js"
                        />
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-xs font-bold uppercase text-slate-600">Required Candidates</span>
                        <input
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          value={req.requiredCandidates}
                          onChange={(e) => handleFieldChange(index, "requiredCandidates", e.target.value)}
                          placeholder="e.g. 5"
                        />
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-xs font-bold uppercase text-slate-600">Experience</span>
                        <select
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          value={req.experience}
                          onChange={(e) => handleFieldChange(index, "experience", e.target.value)}
                        >
                          <option value="">Select Experience</option>
                          {experienceOptions.map((exp) => (
                            <option key={exp} value={exp}>{exp}</option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-xs font-bold uppercase text-slate-600">Budget</span>
                        <input
                          type="number"
                          min="0"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          value={req.budget}
                          onChange={(e) => handleFieldChange(index, "budget", e.target.value)}
                          placeholder="e.g. 800000"
                        />
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-xs font-bold uppercase text-slate-600">Work Mode</span>
                        <select
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          value={req.workMode}
                          onChange={(e) => handleFieldChange(index, "workMode", e.target.value)}
                        >
                          <option value="">Select Work Mode</option>
                          {workModeOptions.map((wm) => (
                            <option key={wm} value={wm}>{wm}</option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-1.5">
                        <span className="text-xs font-bold uppercase text-slate-600">Notice Period</span>
                        <select
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          value={req.noticePeriod}
                          onChange={(e) => handleFieldChange(index, "noticePeriod", e.target.value)}
                        >
                          <option value="">Select Notice Period</option>
                          {noticePeriodOptions.map((np) => (
                            <option key={np} value={np}>{np}</option>
                          ))}
                        </select>
                      </label>

                      <label className="space-y-1.5 md:col-span-2">
                        <span className="text-xs font-bold uppercase text-slate-600">Deadline</span>
                        <input
                          type="date"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          value={req.deadline}
                          onChange={(e) => handleFieldChange(index, "deadline", e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ──────────────────── FORM ACTIONS ──────────────────── */}
          <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-100">
            <div>
              {isCompanyLocked && (
                <Button
                  variant="outline"
                  type="button"
                  icon={Plus}
                  onClick={handleAddRequirementBlock}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 cursor-pointer"
                >
                  Add Another Requirement
                </Button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" type="button" onClick={() => navigate("/companies")}>
                Cancel
              </Button>

              {!isCompanyLocked ? (
                <>
                  <Button
                    variant="outline"
                    type="button"
                    icon={Plus}
                    onClick={handleSaveAndAddRequirement}
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    Save Company & Add Requirement
                  </Button>
                  <Button variant="primary" type="submit" icon={Save}>
                    Save Company
                  </Button>
                </>
              ) : (
                <Button variant="primary" type="submit" icon={Save}>
                  Save Company & Requirements
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

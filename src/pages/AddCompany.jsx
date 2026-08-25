import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Building2,
  UserCheck,
  Mail,
  Phone,
  Globe,
  MapPin,
  FileText,
  Briefcase
} from "lucide-react";
import { Button } from "../components/common/Button";
import { useSales } from "../context/SalesContext";

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

export const AddCompany = () => {
  const navigate = useNavigate();
  const { addCompany } = useSales();

  const [formData, setFormData] = useState({
    name: "",
    industry: "Information Technology",
    customIndustry: "",
    // Company contact details
    companyEmail: "",
    companyPhone: "",
    website: "",
    address: "",
    // Contact Person / HR details
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    // Extra
    notes: "",
    status: "Pending"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalIndustry =
      formData.industry === "Others" && formData.customIndustry.trim()
        ? formData.customIndustry.trim()
        : formData.industry;

    const payload = {
      ...formData,
      name: formData.name.trim() || "Untitled Company",
      industry: finalIndustry,
      // Provide backwards compatibility for existing table/views
      email: formData.companyEmail || formData.contactEmail || "N/A",
      phone: formData.companyPhone || formData.contactPhone || "N/A",
      contactPerson: formData.contactPerson || "N/A",
      address: formData.address || "N/A"
    };

    addCompany(payload);
    navigate("/companies");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/companies")}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </button>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
        <div className="border-b border-slate-100 pb-6 mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Add New Company</h2>
          <p className="text-xs text-slate-500 font-medium mt-1">Fill in any company or contact details (all fields are optional)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* SECTION 1: Company Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Building2 className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Company Information</h3>
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
                    placeholder="Enter company name"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Industry Sector Dropdown with 'Others' */}
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    {INDUSTRY_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Industry Input (Shown if 'Others' is selected) */}
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
                    placeholder="Enter industry sector name"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                    placeholder="e.g. contact@company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Company Mobile / Telephone */}
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
                    placeholder="e.g. +91 011-23456789 / +91 98765 00000"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                    placeholder="e.g. https://www.company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                    placeholder="Enter complete company address"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Contact Person / HR Details */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Contact Person / HR Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* HR / Contact Person Name */}
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
                    placeholder="e.g. John Doe (HR Manager)"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* HR Mobile Number */}
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
                    placeholder="e.g. +91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* HR Email */}
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
                    placeholder="e.g. hr@company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Notes */}
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
                placeholder="Enter any additional notes or details"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <Button variant="outline" onClick={() => navigate("/companies")}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={Save}>
              Save Company
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Trash2,
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
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { Breadcrumb } from "../components/common/Breadcrumb";
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

export const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCompanyById, updateCompany, deleteCompany } = useSales();

  const company = getCompanyById(id);

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

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (company) {
      const isCustomIndustry =
        company.industry && !INDUSTRY_OPTIONS.slice(0, -1).includes(company.industry);

      setFormData({
        name: company.name || "",
        industry: isCustomIndustry ? "Others" : company.industry || "Information Technology",
        customIndustry: isCustomIndustry ? company.industry : "",
        companyEmail: company.companyEmail || company.email || "",
        companyPhone: company.companyPhone || company.phone || "",
        website: company.website || "",
        address: company.address || "",
        contactPerson: company.contactPerson || "",
        contactPhone: company.contactPhone || company.phone || "",
        contactEmail: company.contactEmail || company.email || "",
        notes: company.notes || "",
        status: company.status || "Pending"
      });
    }
  }, [company]);

  if (!company) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-xl mx-auto my-12 space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Company Not Found</h3>
        <p className="text-xs text-slate-500">The company you are trying to edit does not exist.</p>
        <Button variant="primary" onClick={() => navigate("/companies")}>
          Return to Companies
        </Button>
      </div>
    );
  }

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
      name: formData.name.trim() || company.name || "Untitled Company",
      industry: finalIndustry,
      email: formData.companyEmail || formData.contactEmail || "N/A",
      phone: formData.companyPhone || formData.contactPhone || "N/A",
      contactPerson: formData.contactPerson || "N/A",
      address: formData.address || "N/A"
    };

    updateCompany(company.id, payload);
    navigate("/companies");
  };

  const handleDelete = () => {
    deleteCompany(company.id);
    setShowDeleteModal(false);
    navigate("/companies");
  };

  return (
    <div className="w-full space-y-3">
      {/* Top Navigation & Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Companies", path: "/companies" },
          { label: company.name, path: `/companies/${company.id}` },
          { label: "Edit Company" }
        ]}
        backPath={`/companies/${company.id}`}
        className="mb-0"
      />

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
        <div className="border-b border-slate-100 pb-6 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Edit Company</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">Update company and contact details (all fields are optional)</p>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">
            ID: {company.id}
          </span>
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Website */}
              <div>
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

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                </select>
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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <Button
              variant="danger"
              type="button"
              icon={Trash2}
              onClick={() => setShowDeleteModal(true)}
              className="w-full sm:w-auto"
            >
              Delete Company
            </Button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Button variant="outline" type="button" onClick={() => navigate("/companies")}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" icon={Save}>
                Update Company
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Company"
        message={`Are you sure you want to delete "${company.name}"? This action cannot be undone.`}
      />
    </div>
  );
};


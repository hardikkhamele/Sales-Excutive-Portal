import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Building2,
  Plus
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { useSales } from "../context/SalesContext";

export const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCompanyById, updateCompany } = useSales();
  const company = getCompanyById(id);
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
  const workModeOptions = [
    "Remote", "Onsite", "Hybrid"
  ];
  const noticePeriodOptions = [
    "Immediate", "15 Days", "30 Days", "45 Days", "60 Days", "90 Days"
  ];

  const [isRequirementModalOpen, setIsRequirementModalOpen] = useState(false);
  const [formData, setFormData] = useState({
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
  });

  if (!company) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-xl mx-auto my-12 space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Company Not Found</h3>
        <p className="text-xs text-slate-500">The requested company ID "{id}" does not exist or was deleted.</p>
        <Button variant="primary" onClick={() => navigate("/companies")}>
          Return to Companies
        </Button>
      </div>
    );
  }

  const detailRows = [
    { label: "Profile", value: company.profile || "" },
    { label: "State", value: company.state || "" },
    { label: "City", value: company.city || "" },
    { label: "Category (IT / Non IT)", value: company.category || "" },
    { label: "Technology", value: company.technology || "" },
    { label: "Required Candidates", value: company.requiredCandidates || "" },
    { label: "Experience", value: company.experience || "" },
    { label: "Budget", value: company.budget || "" },
    { label: "Work Mode", value: company.workMode || "" },
    { label: "Notice Period", value: company.noticePeriod || "" },
    { label: "Deadline", value: company.deadline || "" }
  ];

  const handleRequirementSubmit = (event) => {
    event.preventDefault();

    updateCompany(company.id, {
      profile: formData.profile,
      state: formData.state,
      city: formData.city,
      category: formData.category,
      technology: formData.technology,
      requiredCandidates: formData.requiredCandidates,
      experience: formData.experience,
      budget: formData.budget,
      workMode: formData.workMode,
      noticePeriod: formData.noticePeriod,
      deadline: formData.deadline
    });

    setIsRequirementModalOpen(false);
  };

  const rowsForRender = detailRows;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/companies")}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </button>

        <Button
          variant="outline"
          icon={Edit}
          onClick={() => navigate(`/companies/${company.id}/edit`)}
        >
          Edit Company
        </Button>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-500/20 shrink-0">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{company.name}</h2>
              <Badge status={company.status} />
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Onboarded On: <span className="text-slate-700">{company.onboardedOn}</span>
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsRequirementModalOpen(true)}
          className="whitespace-nowrap"
        >
          Add Requirement
        </Button>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Company Details
          </h2>
        </div>

        <div className="overflow-x-auto pt-6">
          <table className="min-w-full border border-slate-200 rounded-2xl overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                {rowsForRender.map((row) => (
                  <th key={row.label} className="px-4 py-3 text-center text-[11px] font-black uppercase text-slate-600 whitespace-nowrap border-b border-slate-200">
                    {row.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {rowsForRender.map((row) => (
                  <td key={row.label} className="px-4 py-4 text-sm font-semibold text-slate-800 border-b border-slate-100 text-center whitespace-nowrap">
                    {row.value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isRequirementModalOpen}
        onClose={() => setIsRequirementModalOpen(false)}
        title="Add Requirement"
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleRequirementSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Category (IT / Non IT)</span>
            <select className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              <option value="">Select Category</option>
              <option value="IT">IT</option>
              <option value="Non IT">Non IT</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Profile</span>
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="profile" value={formData.profile} onChange={(e) => setFormData({ ...formData, profile: e.target.value })} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">State</span>
            <select className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })}>
              <option value="">Select State</option>
              {stateOptions.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">City</span>
            <select className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}>
              <option value="">Select City</option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Technology</span>
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="technology" value={formData.technology} onChange={(e) => setFormData({ ...formData, technology: e.target.value })} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Required Candidates</span>
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="requiredCandidates" value={formData.requiredCandidates} onChange={(e) => setFormData({ ...formData, requiredCandidates: e.target.value })} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Experience</span>
            <select className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="experience" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}>
              <option value="">Select Experience</option>
              {experienceOptions.map((experience) => (
                <option key={experience} value={experience}>{experience}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Budget</span>
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" type="number" min="0" name="budget" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Work Mode</span>
            <select className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="workMode" value={formData.workMode} onChange={(e) => setFormData({ ...formData, workMode: e.target.value })}>
              <option value="">Select Work Mode</option>
              {workModeOptions.map((workMode) => (
                <option key={workMode} value={workMode}>{workMode}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Notice Period</span>
            <select className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="noticePeriod" value={formData.noticePeriod} onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}>
              <option value="">Select Notice Period</option>
              {noticePeriodOptions.map((noticePeriod) => (
                <option key={noticePeriod} value={noticePeriod}>{noticePeriod}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Deadline</span>
            <input type="date" className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="deadline" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} />
          </label>

          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsRequirementModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Requirement
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

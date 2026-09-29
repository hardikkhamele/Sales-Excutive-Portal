import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Building2,
  Plus,
  Trash2
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { Breadcrumb } from "../components/common/Breadcrumb";
import { useSales } from "../context/SalesContext";
import { toast } from "react-toastify";

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

  const [isRequirementModalOpen, setIsRequirementModalOpen] = useState(false);
  const [requirementsList, setRequirementsList] = useState([{ ...emptyRequirement }]);

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
    if (requirementsList.length <= 1) return;
    setRequirementsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRequirementSubmit = (event) => {
    event.preventDefault();
    const latestReq = requirementsList[requirementsList.length - 1] || requirementsList[0];
    updateCompany(company.id, latestReq);
    toast.success(`${requirementsList.length} Requirement(s) saved successfully!`);
    setRequirementsList([{ ...emptyRequirement }]);
    setIsRequirementModalOpen(false);
  };

  const rowsForRender = detailRows;

  return (
    <div className="w-full space-y-3">
      <Breadcrumb
        items={[
          { label: "Companies", path: "/companies" },
          { label: company.name || "Company Details" }
        ]}
        backPath="/companies"
        className="mb-0"
        rightAction={
          <Button
            variant="outline"
            icon={Edit}
            onClick={() => navigate(`/companies/${company.id}/edit`)}
          >
            Edit Company
          </Button>
        }
      />

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
        title="Add Requirements"
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleRequirementSubmit} className="space-y-6">
          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
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
                      name="category"
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
                      name="profile"
                      value={req.profile}
                      onChange={(e) => handleFieldChange(index, "profile", e.target.value)}
                      placeholder="e.g. Senior Frontend Developer"
                    />
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-xs font-bold uppercase text-slate-600">State</span>
                    <select
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      name="state"
                      value={req.state}
                      onChange={(e) => handleFieldChange(index, "state", e.target.value)}
                    >
                      <option value="">Select State</option>
                      {stateOptions.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-xs font-bold uppercase text-slate-600">City</span>
                    <select
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      name="city"
                      value={req.city}
                      onChange={(e) => handleFieldChange(index, "city", e.target.value)}
                    >
                      <option value="">Select City</option>
                      {cityOptions.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-xs font-bold uppercase text-slate-600">Technology</span>
                    <input
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      name="technology"
                      value={req.technology}
                      onChange={(e) => handleFieldChange(index, "technology", e.target.value)}
                      placeholder="e.g. React, Node.js"
                    />
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-xs font-bold uppercase text-slate-600">Required Candidates</span>
                    <input
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      name="requiredCandidates"
                      value={req.requiredCandidates}
                      onChange={(e) => handleFieldChange(index, "requiredCandidates", e.target.value)}
                      placeholder="e.g. 5"
                    />
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-xs font-bold uppercase text-slate-600">Experience</span>
                    <select
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      name="experience"
                      value={req.experience}
                      onChange={(e) => handleFieldChange(index, "experience", e.target.value)}
                    >
                      <option value="">Select Experience</option>
                      {experienceOptions.map((experience) => (
                        <option key={experience} value={experience}>{experience}</option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-xs font-bold uppercase text-slate-600">Budget</span>
                    <input
                      type="number"
                      min="0"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      name="budget"
                      value={req.budget}
                      onChange={(e) => handleFieldChange(index, "budget", e.target.value)}
                      placeholder="e.g. 800000"
                    />
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-xs font-bold uppercase text-slate-600">Work Mode</span>
                    <select
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      name="workMode"
                      value={req.workMode}
                      onChange={(e) => handleFieldChange(index, "workMode", e.target.value)}
                    >
                      <option value="">Select Work Mode</option>
                      {workModeOptions.map((workMode) => (
                        <option key={workMode} value={workMode}>{workMode}</option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-1.5">
                    <span className="text-xs font-bold uppercase text-slate-600">Notice Period</span>
                    <select
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      name="noticePeriod"
                      value={req.noticePeriod}
                      onChange={(e) => handleFieldChange(index, "noticePeriod", e.target.value)}
                    >
                      <option value="">Select Notice Period</option>
                      {noticePeriodOptions.map((noticePeriod) => (
                        <option key={noticePeriod} value={noticePeriod}>{noticePeriod}</option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-1.5 md:col-span-2">
                    <span className="text-xs font-bold uppercase text-slate-600">Deadline</span>
                    <input
                      type="date"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      name="deadline"
                      value={req.deadline}
                      onChange={(e) => handleFieldChange(index, "deadline", e.target.value)}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              type="button"
              icon={Plus}
              onClick={handleAddRequirementBlock}
              className="border-purple-200 text-purple-700 hover:bg-purple-50 cursor-pointer"
            >
              Add Another Requirement
            </Button>

            <div className="flex items-center gap-3">
              <Button variant="outline" type="button" onClick={() => setIsRequirementModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Requirements
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

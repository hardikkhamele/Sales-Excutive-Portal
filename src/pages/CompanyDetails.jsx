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

  const [isRequirementModalOpen, setIsRequirementModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    postedOn: "",
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
    { label: "Posted On", value: company.postedOn || company.onboardedOn || "" },
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
      postedOn: formData.postedOn,
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
            <span className="text-xs font-bold uppercase text-slate-600">Posted On</span>
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="postedOn" value={formData.postedOn} onChange={(e) => setFormData({ ...formData, postedOn: e.target.value })} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">State</span>
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">City</span>
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Category (IT / Non IT)</span>
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
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
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="experience" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Budget</span>
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="budget" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Work Mode</span>
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="workMode" value={formData.workMode} onChange={(e) => setFormData({ ...formData, workMode: e.target.value })} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Notice Period</span>
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="noticePeriod" value={formData.noticePeriod} onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })} />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase text-slate-600">Deadline</span>
            <input className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm" name="deadline" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} />
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

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Building2,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Globe,
  MapPin,
  FileText,
  User,
  Activity
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { useSales } from "../context/SalesContext";

export const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCompanyById } = useSales();

  const company = getCompanyById(id);

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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Navigation Top Bar */}
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

      {/* Main Header Banner matching Image #5 */}
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
      </div>

      {/* Info & Progress Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Company Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Company Details
            </h3>

            {/* Company Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div>
                <span className="font-semibold text-slate-400 uppercase tracking-wider block">Industry</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{company.industry}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 uppercase tracking-wider block">Company Phone</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {company.companyPhone || company.phone || "N/A"}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 uppercase tracking-wider block">Company Email</span>
                <span className="font-bold text-blue-600 text-sm mt-0.5 block flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  {company.companyEmail || company.email || "N/A"}
                </span>
              </div>
              <div>
                <span className="font-semibold text-slate-400 uppercase tracking-wider block">Website</span>
                <span className="font-bold text-blue-600 text-sm mt-0.5 block flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                  {company.website || "N/A"}
                </span>
              </div>
            </div>

            {/* HR / Contact Person Section */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                Contact Person / HR Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="font-semibold text-slate-400 uppercase tracking-wider block text-[10px]">Name</span>
                  <span className="font-bold text-slate-800 text-xs mt-0.5 block">{company.contactPerson}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 uppercase tracking-wider block text-[10px]">HR Mobile</span>
                  <span className="font-bold text-slate-800 text-xs mt-0.5 block flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {company.contactPhone || company.phone || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-400 uppercase tracking-wider block text-[10px]">HR Email</span>
                  <span className="font-bold text-blue-600 text-xs mt-0.5 block flex items-center gap-1 truncate">
                    <Mail className="w-3 h-3 text-blue-500 shrink-0" />
                    <span className="truncate">{company.contactEmail || company.email || "N/A"}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs">
              <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1">Address</span>
              <p className="text-slate-700 font-medium leading-relaxed flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                {company.address}
              </p>
            </div>

            {company.notes && (
              <div className="pt-4 border-t border-slate-100 text-xs">
                <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1">Notes</span>
                <p className="text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                  {company.notes}
                </p>
              </div>
            )}
          </div>

          {/* Recent Company Activities History */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Recent Activities
            </h3>

            <div className="space-y-3">
              {(company.history || []).map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-800">{h.title}</span>
                  <span className="text-[11px] font-bold text-slate-400 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    {h.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Onboarding Progress Timeline matching Image #5 */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Onboarding Progress
            </h3>

            <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
              {(company.timeline || []).map((step, idx) => (
                <div key={idx} className="relative flex items-center justify-between">
                  {/* Circle Indicator */}
                  <span
                    className={`absolute -left-[31px] w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs ${
                      step.completed
                        ? "bg-emerald-500 ring-4 ring-emerald-50"
                        : "bg-slate-300 ring-4 ring-slate-100"
                    }`}
                  >
                    {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </span>

                  <div>
                    <h4 className={`text-xs font-bold ${step.completed ? "text-slate-900" : "text-slate-400"}`}>
                      {step.step}
                    </h4>
                  </div>

                  <span className={`text-[11px] font-semibold ${step.completed ? "text-emerald-600 bg-emerald-50" : "text-slate-400 bg-slate-100"} px-2.5 py-0.5 rounded-md`}>
                    {step.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

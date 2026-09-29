import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plus, Search, Eye, Edit, Trash2, Building2, Filter } from "lucide-react";
import { DataTable } from "../components/common/DataTable";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { Breadcrumb } from "../components/common/Breadcrumb";
import { useSales } from "../context/SalesContext";

export const Companies = () => {
  const navigate = useNavigate();
  const { companies, deleteCompany } = useSales();
  const [filterQuery, setFilterQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteId, setDeleteId] = useState(null);

  // Filter by status if selected
  const filteredData = companies.filter((c) => {
    const matchesStatus = statusFilter === "All" || c.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      (c.name || "").toLowerCase().includes(filterQuery.toLowerCase()) ||
      (c.contactPerson || "").toLowerCase().includes(filterQuery.toLowerCase()) ||
      (c.industry || "").toLowerCase().includes(filterQuery.toLowerCase()) ||
      (c.email || "").toLowerCase().includes(filterQuery.toLowerCase()) ||
      (c.companyEmail || "").toLowerCase().includes(filterQuery.toLowerCase()) ||
      (c.contactEmail || "").toLowerCase().includes(filterQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const columns = [
    {
      id: "index",
      header: "#",
      cell: ({ row }) => <span className="font-bold text-slate-400 text-xs">{row.index + 1}</span>
    },
    {
      accessorKey: "name",
      header: "Company Name",
      cell: (info) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-800">{info.getValue()}</span>
        </div>
      )
    },
    {
      accessorKey: "contactPerson",
      header: "Contact Person",
      cell: (info) => <span className="text-slate-600 font-medium">{info.getValue()}</span>
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => <span className="text-blue-600 font-medium text-xs">{info.getValue()}</span>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => <Badge status={info.getValue()} />
    },
    {
      accessorKey: "onboardedOn",
      header: "Onboarded On",
      cell: (info) => <span className="text-slate-500 font-medium text-xs">{info.getValue()}</span>
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/companies/${row.original.id}`)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title="View Company"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(`/companies/${row.original.id}/edit`)}
            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Edit Company"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteId(row.original.id)}
            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Company"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="w-full space-y-3">
      {/* Top Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Companies" }
        ]}
        backPath="/dashboard"
        className="mb-0"
      />

      {/* Top Header Controls matching Image #3 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search company..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
        </div>

        {/* Add Company Button */}
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => navigate("/companies/add")}
          className="w-full sm:w-auto"
        >
          Add Company
        </Button>
      </div>

      {/* Companies TanStack Table Container */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <DataTable
          data={filteredData}
          columns={columns}
          globalFilter={filterQuery}
          setGlobalFilter={setFilterQuery}
          pageSize={10}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          deleteCompany(deleteId);
          setDeleteId(null);
        }}
        title="Delete Company"
        message="Are you sure you want to delete this company record? This will also remove all historical onboarding logs."
      />
    </div>
  );
};

import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle, Printer, FileText } from "lucide-react";
import { useSales } from "../context/SalesContext";
import { toast } from "react-toastify";

export const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTransactionById, transactions } = useSales();
  const printRef = useRef(null);

  // Look up transaction by ID or fallback to the primary reference transaction
  const item = getTransactionById(id) || (transactions && transactions[0]) || {
    id: "6A897F4735",
    transactionId: "6A897F4735",
    gatewayTransactionId: "pay_1787395911980",
    clientName: "Ram Prasad",
    mobileNumber: "8090909408",
    email: "ram.prasad@example.com",
    plan: "Premium Plan",
    planType: "Prime Plan",
    amount: 499,
    planCharges: 499,
    gstRate: 0,
    gstAmount: 0.0,
    totalPaid: 499,
    status: "Successful",
    paymentStatus: "PAID",
    paymentDate: "August 22, 2026 at 04:21 PM",
    paymentMethod: "Online (Razorpay)",
    invoiceNumber: "INV-2026-0891"
  };

  const handleDownloadInvoice = () => {
    toast.success(`Invoice ${item.invoiceNumber || "INV-2026-0891"} downloaded successfully!`);
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/revenue")}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs group-hover:border-slate-300 group-hover:bg-slate-50 transition-all">
            <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Payment Details</h1>
        </button>

        {/* Download Invoice Button */}
        <button
          onClick={handleDownloadInvoice}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Invoice</span>
        </button>
      </div>

      {/* Main Details Card matching Image #2 */}
      <div
        ref={printRef}
        className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
      >
        <div className="p-6 sm:p-8 space-y-8">
          {/* Payment Status Row */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <span className="text-xs font-medium text-slate-500">Payment Status</span>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                item.paymentStatus === "PAID" || item.status?.toLowerCase() === "successful"
                  ? "text-emerald-600 font-extrabold"
                  : "text-rose-600 font-extrabold"
              }`}
            >
              {item.paymentStatus || "PAID"}
            </span>
          </div>

          {/* General Info Section */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">General Info</h2>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Name</span>
                <span className="text-slate-800 font-semibold">{item.clientName || "Ram Prasad"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Mobile Number</span>
                <span className="text-slate-800 font-semibold">{item.mobileNumber || "8090909408"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Transaction ID</span>
                <span className="text-slate-800 font-semibold font-mono">
                  {item.gatewayTransactionId || item.transactionId || "pay_1787395911980"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Payment Date</span>
                <span className="text-slate-800 font-semibold">
                  {item.paymentDate || "August 22, 2026 at 04:21 PM"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Payment Method</span>
                <span className="text-slate-800 font-semibold">
                  {item.paymentMethod || "Online (Razorpay)"}
                </span>
              </div>
            </div>
          </div>

          {/* General Billing Details Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              General Billing Details
            </h2>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Plan Details</span>
                <span className="text-slate-800 font-semibold">{item.planType || item.plan || "Prime Plan"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Plan Charges</span>
                <span className="text-slate-800 font-semibold">
                  ₹{item.planCharges || item.amount || 499}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">GST (0%)</span>
                <span className="text-slate-800 font-semibold">
                  ₹{(item.gstAmount || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Total Amount Paid Footer */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900">Total Amount Paid</span>
            <span className="text-2xl font-black text-emerald-600 tracking-tight">
              ₹{item.totalPaid !== undefined ? item.totalPaid : item.amount || 499}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

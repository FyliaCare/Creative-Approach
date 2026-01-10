import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Eye,
  Save,
  Plus,
  Trash2,
  FileText,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import toast from 'react-hot-toast';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://creative-approach-backend.onrender.com';

const currencyOptions = ['GHS', 'USD', 'EUR', 'XOF'];

const buildLineItem = (overrides = {}) => ({
  id: Date.now() + Math.random(),
  title: 'New service',
  description: '',
  quantity: 1,
  rate: 0,
  unit: 'unit',
  category: 'Service',
  ...overrides
});

export default function QuotationGenerator() {
  const [invoiceInfo, setInvoiceInfo] = useState({
    invoiceNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    currency: 'GHS',
    language: 'english'
  });

  const [clientInfo, setClientInfo] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: ''
  });

  const [projectInfo, setProjectInfo] = useState({
    projectName: 'Drone survey',
    service: 'Mapping & Surveying',
    scope: 'Flight planning, capture, processing, analytics',
    location: '',
    startDate: '',
    dueDate: ''
  });

  const [billing, setBilling] = useState({
    taxRate: 5,
    discountType: 'percent',
    discountValue: 0,
    deposit: 40,
    paymentTerms: 'Payment due within 10 working days after delivery.',
    validity: 'Quotation valid for 14 days from issue.',
    notes: 'We combine flight safety, data quality, and quick delivery.'
  });

  const [extras, setExtras] = useState({
    travel: 0,
    misc: 0
  });

  const [lineItems, setLineItems] = useState([
    buildLineItem({
      title: 'Field survey and flight operations',
      description: 'Flight crew, control points, safety supervision',
      quantity: 2,
      rate: 1200,
      unit: 'day',
      category: 'Operations'
    }),
    buildLineItem({
      title: 'Processing and analytics',
      description: 'Orthomosaic, DEM, feature extraction, reporting',
      quantity: 1,
      rate: 2500,
      unit: 'project',
      category: 'Processing'
    })
  ]);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const now = new Date();
    const serial = `Q-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
      now.getDate()
    ).padStart(2, '0')}-${Math.floor(Math.random() * 900 + 100)}`;
    setInvoiceInfo((prev) => ({ ...prev, invoiceNumber: serial }));
  }, []);

  const calculations = useMemo(() => {
    const subtotal = lineItems.reduce(
      (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.rate) || 0),
      0
    );

    const discountAmount =
      billing.discountType === 'percent'
        ? (subtotal * (Number(billing.discountValue) || 0)) / 100
        : Number(billing.discountValue) || 0;

    const adjusted = Math.max(subtotal - discountAmount, 0);
    const taxAmount = (adjusted * (Number(billing.taxRate) || 0)) / 100;
    const extrasTotal = (Number(extras.travel) || 0) + (Number(extras.misc) || 0);
    const total = adjusted + taxAmount + extrasTotal;
    const depositDue = (total * (Number(billing.deposit) || 0)) / 100;

    return { subtotal, discountAmount, adjusted, taxAmount, extrasTotal, total, depositDue };
  }, [lineItems, billing, extras]);

  const formatMoney = (value) => `${invoiceInfo.currency} ${Number(value || 0).toFixed(2)}`;

  const updateLineItem = (id, field, value) => {
    setLineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addLineItem = () => {
    setLineItems((prev) => [...prev, buildLineItem()]);
  };

  const removeLineItem = (id) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const ensureValid = () => {
    if (!clientInfo.name) {
      toast.error('Client name is required');
      return false;
    }
    if (!lineItems.length) {
      toast.error('Add at least one line item');
      return false;
    }
    return true;
  };

  const buildPdf = () => {
    if (!ensureValid()) return null;

    try {
      console.log('Building PDF document...');
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      console.log('jsPDF instance created, pageWidth:', pageWidth);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('Creative Approach', 14, 16);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Quotation', pageWidth - 14, 16, { align: 'right' });
      doc.text(`Quote #: ${invoiceInfo.invoiceNumber || 'Draft'}`, pageWidth - 14, 22, {
        align: 'right'
      });
      doc.text(`Issue: ${invoiceInfo.issueDate}`, pageWidth - 14, 28, { align: 'right' });
      doc.text(`Due: ${invoiceInfo.dueDate || 'On approval'}`, pageWidth - 14, 34, {
        align: 'right'
      });

      doc.setFontSize(12);
      doc.text('Client', 14, 34);
      doc.setFontSize(10);
      const clientLines = [
        clientInfo.name,
        clientInfo.company,
        clientInfo.email,
        clientInfo.phone,
        clientInfo.address
      ].filter(Boolean);
      doc.text(clientLines, 14, 42);

      doc.setFontSize(12);
      doc.text('Project', pageWidth / 2 + 10, 34);
      doc.setFontSize(10);
      const projectLines = [
        projectInfo.projectName || 'Project',
        projectInfo.service,
        projectInfo.location,
        projectInfo.scope
      ].filter(Boolean);
      doc.text(projectLines, pageWidth / 2 + 10, 42);

      const startY = 64;
      doc.setFontSize(12);
      doc.text('Line items', 14, startY);

      console.log('Adding line items table, count:', lineItems.length);
      doc.autoTable({
        startY: startY + 4,
        head: [['Item', 'Qty', 'Rate', 'Line total']],
        body: lineItems.map((item) => [
          `${item.title}${item.category ? ` (${item.category})` : ''}\n${item.description || ''}`,
          item.quantity || 0,
          formatMoney(item.rate || 0),
          formatMoney((Number(item.quantity) || 0) * (Number(item.rate) || 0))
        ]),
        theme: 'striped',
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [59, 130, 246], textColor: 255 },
        columnStyles: {
          1: { halign: 'right', cellWidth: 20 },
          2: { halign: 'right', cellWidth: 32 },
          3: { halign: 'right', cellWidth: 32 }
        }
      });

      let yCursor = doc.lastAutoTable.finalY + 6;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Financial summary', 14, yCursor);

      doc.autoTable({
        startY: yCursor + 2,
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: { 0: { fontStyle: 'bold' }, 1: { halign: 'right' } },
        body: [
          ['Subtotal', formatMoney(calculations.subtotal)],
          [
            `Discount (${billing.discountType === 'percent' ? `${billing.discountValue || 0}%` : ''})`,
            `- ${formatMoney(calculations.discountAmount)}`
          ],
          [`Tax ${billing.taxRate || 0}%`, formatMoney(calculations.taxAmount)],
          ['Extras', formatMoney(calculations.extrasTotal)],
          ['Total', formatMoney(calculations.total)],
          [`Deposit ${billing.deposit || 0}%`, formatMoney(calculations.depositDue)]
        ]
      });

      yCursor = doc.lastAutoTable.finalY + 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('Terms and notes', 14, yCursor);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);

      const termsText = doc.splitTextToSize(
        `${billing.paymentTerms} ${billing.validity}`,
        pageWidth - 28
      );
      doc.text(termsText, 14, yCursor + 6);

      let notesStart = yCursor + 6 + termsText.length * 4;
      if (billing.notes) {
        const notes = doc.splitTextToSize(billing.notes, pageWidth - 28);
        doc.text(notes, 14, notesStart + 4);
        notesStart += notes.length * 4 + 4;
      }

      doc.setFont('helvetica', 'italic');
      doc.text(
        `Prepared for ${clientInfo.name || 'client'} | Currency: ${invoiceInfo.currency}`,
        14,
        notesStart + 6
      );

      console.log('PDF built successfully');
      return doc;
    } catch (error) {
      console.error('Error building PDF', error);
      console.error('Error stack:', error.stack);
      toast.error(`Failed to build PDF: ${error.message}`);
      return null;
    }
  };

  const handlePreview = () => {
    try {
      console.log('Starting PDF preview...');
      const doc = buildPdf();
      if (!doc) {
        console.error('buildPdf returned null for preview');
        return;
      }

      console.log('Creating blob...');
      const blob = doc.output('blob');
      console.log('Blob created, size:', blob.size);
      const url = URL.createObjectURL(blob);
      const newWindow = window.open(url, '_blank');

      if (!newWindow) {
        toast.error('Popup blocked - allow popups to preview');
        URL.revokeObjectURL(url);
        return;
      }

      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      toast.success('Preview opened in new tab');
    } catch (error) {
      console.error('Preview error:', error);
      toast.error(`Failed to preview PDF: ${error.message}`);
    }
  };

  const handleDownload = () => {
    try {
      console.log('Starting PDF download...');
      const doc = buildPdf();
      if (!doc) {
        console.error('buildPdf returned null');
        return;
      }

      const filename = `Quotation_${invoiceInfo.invoiceNumber || 'draft'}.pdf`;
      console.log('Saving PDF with filename:', filename);
      doc.save(filename);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error(`Failed to download PDF: ${error.message}`);
    }
  };

  const handleSave = async () => {
    const doc = buildPdf();
    if (!doc) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Login required to save quotations');
        setSaving(false);
        return;
      }

      const arrayBuffer = await doc.output('arraybuffer');
      const uint8Array = new Uint8Array(arrayBuffer);
      const binaryString = Array.from(uint8Array, (byte) => String.fromCharCode(byte)).join('');
      const pdfBase64 = btoa(binaryString);

      const payload = {
        clientInfo,
        invoiceInfo,
        items: lineItems.map((item) => ({
          ...item,
          total: (Number(item.quantity) || 0) * (Number(item.rate) || 0)
        })),
        imageProcessing: { description: 'Extras', price: calculations.extrasTotal },
        transport: { included: Number(extras.travel) > 0, price: Number(extras.travel) || 0 },
        terms: {
          payment: billing.paymentTerms,
          liability: billing.validity,
          notes: billing.notes
        },
        language: invoiceInfo.language,
        subtotal: calculations.subtotal,
        total: calculations.total,
        pdfData: pdfBase64,
        filename: `Quotation_${invoiceInfo.invoiceNumber || 'draft'}.pdf`
      };

      const response = await fetch(`${API_URL}/api/quotations/save-detailed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.success) {
        setSuccess(true);
        toast.success('Quotation saved and stored');
        setTimeout(() => setSuccess(false), 2500);
      } else {
        toast.error(data?.message || 'Save failed');
      }
    } catch (error) {
      console.error('Error saving quotation', error);
      toast.error('Unable to save quotation');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Advanced Quotation Builder</h1>
            <p className="text-slate-600">Create, preview, download, and persist detailed quotes.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handlePreview}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              <Eye className="h-4 w-4" />
              Preview PDF
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save to CRM
            </button>
            {success && (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> Saved
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Client & Project</h2>
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Quote #{invoiceInfo.invoiceNumber || 'Draft'}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-700">Client name</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    placeholder="Client name"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Company</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    placeholder="Optional"
                    value={clientInfo.company}
                    onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    placeholder="client@example.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Phone</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    placeholder="+233..."
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Address</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    placeholder="Street, city"
                    value={clientInfo.address}
                    onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Project</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    placeholder="Project name"
                    value={projectInfo.projectName}
                    onChange={(e) => setProjectInfo({ ...projectInfo, projectName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Service type</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    placeholder="Mapping & Surveying"
                    value={projectInfo.service}
                    onChange={(e) => setProjectInfo({ ...projectInfo, service: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Location</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    placeholder="Site location"
                    value={projectInfo.location}
                    onChange={(e) => setProjectInfo({ ...projectInfo, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Scope</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    placeholder="Capture, processing, analytics"
                    value={projectInfo.scope}
                    onChange={(e) => setProjectInfo({ ...projectInfo, scope: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Financial controls</h2>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Live totals
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium text-slate-700">Currency</label>
                  <select
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    value={invoiceInfo.currency}
                    onChange={(e) => setInvoiceInfo({ ...invoiceInfo, currency: e.target.value })}
                  >
                    {currencyOptions.map((cur) => (
                      <option key={cur} value={cur}>
                        {cur}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Tax %</label>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    value={billing.taxRate}
                    onChange={(e) => setBilling({ ...billing, taxRate: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Deposit %</label>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    value={billing.deposit}
                    onChange={(e) => setBilling({ ...billing, deposit: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Discount</label>
                  <div className="mt-1 flex gap-2">
                    <select
                      className="w-32 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                      value={billing.discountType}
                      onChange={(e) => setBilling({ ...billing, discountType: e.target.value })}
                    >
                      <option value="percent">Percent</option>
                      <option value="flat">Flat</option>
                    </select>
                    <input
                      type="number"
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                      value={billing.discountValue}
                      onChange={(e) => setBilling({ ...billing, discountValue: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Travel / logistics</label>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    value={extras.travel}
                    onChange={(e) => setExtras({ ...extras, travel: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Misc fees</label>
                  <input
                    type="number"
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    value={extras.misc}
                    onChange={(e) => setExtras({ ...extras, misc: Number(e.target.value) })}
                  />
                </div>
                <div className="md:col-span-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Issue date</label>
                    <input
                      type="date"
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                      value={invoiceInfo.issueDate}
                      onChange={(e) => setInvoiceInfo({ ...invoiceInfo, issueDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Due date</label>
                    <input
                      type="date"
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                      value={invoiceInfo.dueDate}
                      onChange={(e) => setInvoiceInfo({ ...invoiceInfo, dueDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Language</label>
                    <select
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                      value={invoiceInfo.language}
                      onChange={(e) => setInvoiceInfo({ ...invoiceInfo, language: e.target.value })}
                    >
                      <option value="english">English</option>
                      <option value="french">French</option>
                    </select>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <label className="text-sm font-medium text-slate-700">Payment terms</label>
                  <textarea
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    rows={2}
                    value={billing.paymentTerms}
                    onChange={(e) => setBilling({ ...billing, paymentTerms: e.target.value })}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="text-sm font-medium text-slate-700">Validity</label>
                  <textarea
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    rows={2}
                    value={billing.validity}
                    onChange={(e) => setBilling({ ...billing, validity: e.target.value })}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="text-sm font-medium text-slate-700">Notes</label>
                  <textarea
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                    rows={2}
                    value={billing.notes}
                    onChange={(e) => setBilling({ ...billing, notes: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">Line items</h2>
                </div>
                <button
                  onClick={addLineItem}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
                >
                  <Plus className="h-4 w-4" /> Add item
                </button>
              </div>

              <div className="space-y-4">
                {lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-slate-200 p-4 shadow-sm hover:border-indigo-200"
                  >
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Title</label>
                        <input
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                          value={item.title}
                          onChange={(e) => updateLineItem(item.id, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Category</label>
                        <input
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                          value={item.category}
                          onChange={(e) => updateLineItem(item.id, 'category', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="text-sm font-medium text-slate-700">Description</label>
                        <input
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                          value={item.description}
                          onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Quantity</label>
                        <input
                          type="number"
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(item.id, 'quantity', Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Rate</label>
                        <input
                          type="number"
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                          value={item.rate}
                          onChange={(e) => updateLineItem(item.id, 'rate', Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Unit</label>
                        <input
                          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring"
                          value={item.unit}
                          onChange={(e) => updateLineItem(item.id, 'unit', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Line total</label>
                        <div className="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900">
                          {formatMoney((Number(item.quantity) || 0) * (Number(item.rate) || 0))}
                        </div>
                      </div>
                      <div className="md:col-span-2 flex items-center justify-end">
                        <button
                          onClick={() => removeLineItem(item.id)}
                          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                        >
                          <Trash2 className="h-4 w-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">Live summary</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900">
                  <span>Subtotal</span>
                  <span>{formatMoney(calculations.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <span>Discount</span>
                  <span>- {formatMoney(calculations.discountAmount)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <span>Tax ({billing.taxRate || 0}%)</span>
                  <span>{formatMoney(calculations.taxAmount)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <span>Extras</span>
                  <span>{formatMoney(calculations.extrasTotal)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-indigo-50 px-3 py-3 text-base font-semibold text-indigo-900">
                  <span>Total</span>
                  <span>{formatMoney(calculations.total)}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
                  <span>Deposit due ({billing.deposit || 0}%)</span>
                  <span>{formatMoney(calculations.depositDue)}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">Quick checklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  Verify client contact and project scope.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  Confirm currency, tax, and deposit rules.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  Review totals before sending or saving.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

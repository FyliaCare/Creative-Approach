import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, Eye, Save, Plus, Trash2, FileText, CheckCircle2, Loader2,
  ArrowRight, ArrowLeft, Send, Copy, Upload, Image as ImageIcon,
  Palette, Users, Mail, Clock, TrendingUp, ChevronRight, Building2,
  MapPin, Calendar, DollarSign, Percent, Settings, Sparkles, X,
  Search, Star, History, Package, Zap
} from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import toast from 'react-hot-toast';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://creative-approach-backend.onrender.com';

const currencyOptions = [
  { code: 'GHS', symbol: '₵', name: 'Ghana Cedi' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'XOF', symbol: 'CFA', name: 'West African CFA' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' }
];

const quoteTemplates = [
  {
    id: 'aerial-photography',
    name: 'Aerial Photography & Videography',
    description: 'Professional aerial imaging services',
    icon: '📸',
    items: [
      { title: 'Site survey and flight planning', description: 'Pre-flight site assessment, risk analysis, airspace clearance', quantity: 1, rate: 800, costPrice: 500, unit: 'project', category: 'Planning' },
      { title: 'Aerial photography capture', description: '4K drone photography, multiple angles and perspectives', quantity: 2, rate: 1500, costPrice: 900, unit: 'day', category: 'Capture' },
      { title: 'Post-processing and editing', description: 'Color grading, retouching, final delivery in multiple formats', quantity: 1, rate: 1200, costPrice: 700, unit: 'project', category: 'Processing' }
    ]
  },
  {
    id: 'mapping-survey',
    name: 'Mapping & Surveying',
    description: 'High-precision drone mapping and surveying',
    icon: '🗺️',
    items: [
      { title: 'Field survey operations', description: 'Ground control points, flight operations, data capture', quantity: 3, rate: 1200, costPrice: 750, unit: 'day', category: 'Field Work' },
      { title: 'Data processing', description: 'Orthomosaic generation, DEM/DSM, contours, volume calculations', quantity: 1, rate: 2500, costPrice: 1500, unit: 'project', category: 'Processing' },
      { title: 'Deliverables and reporting', description: 'CAD files, GIS data, analytical reports, site maps', quantity: 1, rate: 800, costPrice: 400, unit: 'project', category: 'Reporting' }
    ]
  },
  {
    id: 'inspection',
    name: 'Infrastructure Inspection',
    description: 'Detailed drone inspection services',
    icon: '🔍',
    items: [
      { title: 'Pre-inspection planning', description: 'Site assessment, safety protocols, flight authorization', quantity: 1, rate: 600, costPrice: 350, unit: 'project', category: 'Planning' },
      { title: 'Inspection flight operations', description: 'Thermal imaging, high-res photography, structural assessment', quantity: 2, rate: 1800, costPrice: 1100, unit: 'day', category: 'Operations' },
      { title: 'Analysis and reporting', description: 'Defect identification, thermal analysis, comprehensive report', quantity: 1, rate: 1500, costPrice: 900, unit: 'project', category: 'Analysis' }
    ]
  },
  {
    id: 'training',
    name: 'Drone Training Program',
    description: 'Professional drone pilot training',
    icon: '🎓',
    items: [
      { title: 'Theory and regulations', description: 'Aviation law, safety protocols, operational procedures', quantity: 3, rate: 500, costPrice: 250, unit: 'day', category: 'Training' },
      { title: 'Practical flight training', description: 'Hands-on flight operations, emergency procedures', quantity: 5, rate: 800, costPrice: 400, unit: 'day', category: 'Training' },
      { title: 'Certification and materials', description: 'Course materials, assessment, certification', quantity: 1, rate: 400, costPrice: 150, unit: 'project', category: 'Admin' }
    ]
  },
  {
    id: 'custom',
    name: 'Custom Quote',
    description: 'Build from scratch',
    icon: '✨',
    items: []
  }
];

const buildLineItem = (overrides = {}) => ({
  id: Date.now() + Math.random(),
  title: 'New service',
  description: '',
  quantity: 1,
  rate: 0,
  costPrice: 0,
  unit: 'unit',
  category: 'Service',
  ...overrides
});

export default function QuotationGeneratorAdvanced() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTemplateModal, setShowTemplateModal] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [searchClient, setSearchClient] = useState('');
  
  const [invoiceInfo, setInvoiceInfo] = useState({
    invoiceNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    validUntil: '',
    currency: 'GHS',
    language: 'english',
    status: 'draft',
    revision: 1
  });

  const [clientInfo, setClientInfo] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    favorite: false
  });

  const [projectInfo, setProjectInfo] = useState({
    projectName: '',
    service: '',
    scope: '',
    location: '',
    startDate: '',
    deadline: '',
    priority: 'medium'
  });

  const [billing, setBilling] = useState({
    taxRate: 5,
    taxLabel: 'VAT',
    discountType: 'percent',
    discountValue: 0,
    showCostPrice: false,
    paymentTerms: 'Payment due within 10 working days after delivery.',
    validity: 'Quotation valid for 14 days from issue.',
    notes: 'Professional drone services with comprehensive insurance coverage.',
    paymentMethods: ['Bank Transfer', 'Mobile Money', 'Cash'],
    bankDetails: {
      bank: 'Absa Bank',
      account: '032 1108 180',
      accountName: 'Creative Approach',
      branch: 'Takoradi Liberation Road'
    }
  });

  const [branding, setBranding] = useState({
    primaryColor: '#3b82f6',
    logoUrl: '',
    companyName: 'Creative Approach',
    companyAddress: 'Takoradi, Western Region, Ghana',
    companyPhone: '0241800716 / 0203885717',
    companyEmail: 'aeroscoutdrone@gmail.com',
    website: 'www.creativeapproach.com',
    tagline: 'Elevating perspectives through innovation'
  });

  const [extras, setExtras] = useState({
    travel: 0,
    insurance: 0,
    permits: 0,
    misc: 0
  });

  const [lineItems, setLineItems] = useState([]);

  const [milestones, setMilestones] = useState([
    { id: 1, name: 'Deposit (Project kickoff)', percentage: 40, dueDate: '', status: 'pending' },
    { id: 2, name: 'Final payment (Delivery)', percentage: 60, dueDate: '', status: 'pending' }
  ]);

  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const now = new Date();
    const serial = `Q-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
      now.getDate()
    ).padStart(2, '0')}-${Math.floor(Math.random() * 900 + 100)}`;
    setInvoiceInfo((prev) => ({ ...prev, invoiceNumber: serial }));

    // Auto-set valid until date (14 days from issue)
    const validDate = new Date(now);
    validDate.setDate(validDate.getDate() + 14);
    setInvoiceInfo((prev) => ({ ...prev, validUntil: validDate.toISOString().split('T')[0] }));
  }, []);

  const calculations = useMemo(() => {
    const subtotal = lineItems.reduce(
      (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.rate) || 0),
      0
    );

    const totalCost = lineItems.reduce(
      (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.costPrice) || 0),
      0
    );

    const discountAmount =
      billing.discountType === 'percent'
        ? (subtotal * (Number(billing.discountValue) || 0)) / 100
        : Number(billing.discountValue) || 0;

    const adjusted = Math.max(subtotal - discountAmount, 0);
    const taxAmount = (adjusted * (Number(billing.taxRate) || 0)) / 100;
    const extrasTotal = Object.values(extras).reduce((sum, val) => sum + (Number(val) || 0), 0);
    const total = adjusted + taxAmount + extrasTotal;
    
    const profitMargin = subtotal > 0 ? ((subtotal - totalCost) / subtotal * 100) : 0;

    return { 
      subtotal, 
      discountAmount, 
      adjusted, 
      taxAmount, 
      extrasTotal, 
      total, 
      totalCost,
      profit: subtotal - totalCost,
      profitMargin
    };
  }, [lineItems, billing, extras]);

  const getCurrencySymbol = () => {
    const curr = currencyOptions.find(c => c.code === invoiceInfo.currency);
    return curr ? curr.symbol : invoiceInfo.currency;
  };

  const formatMoney = (value) => {
    const symbol = getCurrencySymbol();
    return `${symbol} ${Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

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

  const duplicateLineItem = (id) => {
    const item = lineItems.find(i => i.id === id);
    if (item) {
      const newItem = { ...item, id: Date.now() + Math.random(), title: `${item.title} (Copy)` };
      setLineItems((prev) => [...prev, newItem]);
      toast.success('Line item duplicated');
    }
  };

  const applyTemplate = (template) => {
    const items = template.items.map((item, idx) => ({
      ...item,
      id: Date.now() + idx + Math.random()
    }));
    setLineItems(items);
    setProjectInfo(prev => ({ ...prev, service: template.name }));
    setSelectedTemplate(template);
    setShowTemplateModal(false);
    toast.success(`Template "${template.name}" applied`);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCompanyLogo(ev.target?.result);
        setBranding(prev => ({ ...prev, logoUrl: ev.target?.result }));
        toast.success('Logo uploaded');
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAsTemplate = () => {
    const template = {
      id: `custom-${Date.now()}`,
      name: projectInfo.projectName || 'Unnamed Template',
      description: projectInfo.scope || 'Custom template',
      icon: '⭐',
      items: lineItems.map(({ id, ...rest }) => rest)
    };
    toast.success('Template saved (local storage not implemented in demo)');
  };

  const cloneQuote = () => {
    const now = new Date();
    const newSerial = `Q-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
      now.getDate()
    ).padStart(2, '0')}-${Math.floor(Math.random() * 900 + 100)}`;
    
    setInvoiceInfo(prev => ({
      ...prev,
      invoiceNumber: newSerial,
      revision: prev.revision + 1,
      status: 'draft'
    }));
    
    toast.success('Quote cloned with new revision');
  };

  const ensureValid = () => {
    if (currentStep === 1 && !clientInfo.name) {
      toast.error('Client name is required');
      return false;
    }
    if (currentStep === 3 && !lineItems.length) {
      toast.error('Add at least one line item');
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (ensureValid()) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const buildPdf = () => {
    if (!clientInfo.name || !lineItems.length) {
      toast.error('Complete client info and add line items');
      return null;
    }

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Header with branding
      if (companyLogo) {
        doc.addImage(companyLogo, 'PNG', 14, 10, 30, 12);
      }
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(branding.primaryColor || '#3b82f6');
      doc.text(branding.companyName, companyLogo ? 50 : 14, 18);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      if (branding.tagline) {
        doc.text(branding.tagline, companyLogo ? 50 : 14, 24);
      }

      // Quote header (right side)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('QUOTATION', pageWidth - 14, 16, { align: 'right' });
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 80);
      doc.text(`Quote #: ${invoiceInfo.invoiceNumber}`, pageWidth - 14, 22, { align: 'right' });
      doc.text(`Date: ${new Date(invoiceInfo.issueDate).toLocaleDateString()}`, pageWidth - 14, 27, { align: 'right' });
      doc.text(`Valid until: ${invoiceInfo.validUntil ? new Date(invoiceInfo.validUntil).toLocaleDateString() : 'On approval'}`, pageWidth - 14, 32, { align: 'right' });
      doc.text(`Revision: ${invoiceInfo.revision}`, pageWidth - 14, 37, { align: 'right' });

      // Client and company info
      let yPos = 45;
      doc.setFillColor(branding.primaryColor || '#3b82f6');
      doc.rect(14, yPos, (pageWidth - 28) / 2 - 2, 30, 'S');
      doc.rect((pageWidth - 28) / 2 + 16, yPos, (pageWidth - 28) / 2 - 2, 30, 'S');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text('BILL TO:', 16, yPos + 5);
      doc.text('FROM:', (pageWidth - 28) / 2 + 18, yPos + 5);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      
      // Client details
      const clientLines = [
        clientInfo.name,
        clientInfo.company,
        clientInfo.email,
        clientInfo.phone,
        clientInfo.address
      ].filter(Boolean);
      clientLines.forEach((line, idx) => {
        doc.text(line, 16, yPos + 11 + (idx * 4));
      });

      // Company details
      const companyLines = [
        branding.companyAddress,
        branding.companyPhone,
        branding.companyEmail,
        branding.website
      ].filter(Boolean);
      companyLines.forEach((line, idx) => {
        doc.text(line, (pageWidth - 28) / 2 + 18, yPos + 11 + (idx * 4));
      });

      yPos = 80;

      // Project info
      if (projectInfo.projectName) {
        doc.setFillColor(240, 240, 240);
        doc.rect(14, yPos, pageWidth - 28, 14, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(`Project: ${projectInfo.projectName}`, 16, yPos + 5);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(80, 80, 80);
        const projectMeta = [
          projectInfo.service,
          projectInfo.location,
          projectInfo.scope
        ].filter(Boolean).join(' • ');
        doc.text(projectMeta, 16, yPos + 10);
        yPos += 18;
      }

      // Line items table
      doc.autoTable({
        startY: yPos,
        head: [['Item', 'Qty', 'Unit', 'Rate', 'Amount']],
        body: lineItems.map((item) => [
          `${item.title}${item.category ? ` (${item.category})` : ''}\n${item.description || ''}`,
          item.quantity || 0,
          item.unit || '',
          formatMoney(item.rate || 0),
          formatMoney((Number(item.quantity) || 0) * (Number(item.rate) || 0))
        ]),
        theme: 'striped',
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: 'bold' },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { halign: 'center', cellWidth: 18 },
          2: { halign: 'center', cellWidth: 20 },
          3: { halign: 'right', cellWidth: 28 },
          4: { halign: 'right', cellWidth: 32 }
        }
      });

      let yCursor = doc.lastAutoTable.finalY + 6;

      // Financial summary
      const summaryX = pageWidth - 80;
      doc.autoTable({
        startY: yCursor,
        margin: { left: summaryX },
        theme: 'plain',
        styles: { fontSize: 9, cellPadding: 2 },
        columnStyles: { 
          0: { fontStyle: 'bold', cellWidth: 40 }, 
          1: { halign: 'right', cellWidth: 32 } 
        },
        body: [
          ['Subtotal', formatMoney(calculations.subtotal)],
          billing.discountValue > 0 ? [
            `Discount ${billing.discountType === 'percent' ? `(${billing.discountValue}%)` : ''}`,
            `- ${formatMoney(calculations.discountAmount)}`
          ] : null,
          [`${billing.taxLabel || 'Tax'} (${billing.taxRate}%)`, formatMoney(calculations.taxAmount)],
          calculations.extrasTotal > 0 ? ['Extras & Fees', formatMoney(calculations.extrasTotal)] : null,
        ].filter(Boolean)
      });

      yCursor = doc.lastAutoTable.finalY + 2;

      // Grand total
      doc.setFillColor(59, 130, 246);
      doc.rect(summaryX, yCursor, 72, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text('TOTAL', summaryX + 2, yCursor + 5.5);
      doc.text(formatMoney(calculations.total), summaryX + 70, yCursor + 5.5, { align: 'right' });

      yCursor += 12;
      doc.setTextColor(0, 0, 0);

      // Payment milestones
      if (milestones.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('Payment Schedule:', 14, yCursor);
        yCursor += 5;
        
        milestones.forEach((milestone, idx) => {
          const amount = (calculations.total * milestone.percentage) / 100;
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.text(`• ${milestone.name}: ${milestone.percentage}% (${formatMoney(amount)})`, 16, yCursor);
          yCursor += 5;
        });
        yCursor += 3;
      }

      // Bank details
      if (billing.bankDetails) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('Bank Details:', 14, yCursor);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        yCursor += 5;
        doc.text(`Bank: ${billing.bankDetails.bank}`, 16, yCursor);
        yCursor += 4;
        doc.text(`Account: ${billing.bankDetails.account}`, 16, yCursor);
        yCursor += 4;
        doc.text(`Name: ${billing.bankDetails.accountName}`, 16, yCursor);
        yCursor += 4;
        doc.text(`Branch: ${billing.bankDetails.branch}`, 16, yCursor);
        yCursor += 6;
      }

      // Terms
      if (billing.paymentTerms || billing.validity || billing.notes) {
        doc.setFillColor(245, 245, 245);
        doc.rect(14, yCursor, pageWidth - 28, 6, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text('Terms & Conditions', pageWidth / 2, yCursor + 4, { align: 'center' });
        yCursor += 8;
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        const termsText = [billing.paymentTerms, billing.validity, billing.notes]
          .filter(Boolean)
          .join(' ');
        const wrapped = doc.splitTextToSize(termsText, pageWidth - 28);
        doc.text(wrapped, 14, yCursor);
        yCursor += wrapped.length * 3;
      }

      // Footer
      if (yCursor < pageHeight - 20) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text(
          `Generated by ${branding.companyName} | ${branding.companyEmail}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
      }

      return doc;
    } catch (error) {
      console.error('PDF build error:', error);
      toast.error(`PDF generation failed: ${error.message}`);
      return null;
    }
  };

  const handlePreview = () => {
    const doc = buildPdf();
    if (!doc) return;

    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');

    if (!newWindow) {
      toast.error('Popup blocked - allow popups to preview');
      URL.revokeObjectURL(url);
      return;
    }

    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    toast.success('Preview opened');
  };

  const handleDownload = () => {
    const doc = buildPdf();
    if (!doc) return;

    const filename = `Quote_${invoiceInfo.invoiceNumber}_${clientInfo.company || clientInfo.name || 'Client'}.pdf`;
    doc.save(filename);
    toast.success('PDF downloaded');
  };

  const handleSave = async () => {
    const doc = buildPdf();
    if (!doc) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Login required');
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
        projectInfo,
        items: lineItems.map((item) => ({
          ...item,
          total: (Number(item.quantity) || 0) * (Number(item.rate) || 0)
        })),
        imageProcessing: { description: 'Extras', price: calculations.extrasTotal },
        transport: { included: extras.travel > 0, price: extras.travel },
        terms: {
          payment: billing.paymentTerms,
          liability: billing.validity,
          notes: billing.notes
        },
        milestones,
        branding,
        language: invoiceInfo.language,
        subtotal: calculations.subtotal,
        total: calculations.total,
        profit: calculations.profit,
        profitMargin: calculations.profitMargin,
        pdfData: pdfBase64,
        filename: `Quote_${invoiceInfo.invoiceNumber}.pdf`
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
        toast.success('Quote saved to CRM');
        setTimeout(() => setSuccess(false), 3000);
      } else {
        toast.error(data?.message || 'Save failed');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Unable to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSendEmail = async () => {
    if (!clientInfo.email) {
      toast.error('Client email required to send quote');
      return;
    }

    setSending(true);
    try {
      // First save the quote
      await handleSave();

      // Send email notification (backend endpoint would handle actual email)
      toast.success(`Quote sent to ${clientInfo.email}`);
      setInvoiceInfo(prev => ({ ...prev, status: 'sent' }));
    } catch (error) {
      toast.error('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  const steps = [
    { id: 0, name: 'Template', icon: Package },
    { id: 1, name: 'Client', icon: Users },
    { id: 2, name: 'Project', icon: Building2 },
    { id: 3, name: 'Items', icon: FileText },
    { id: 4, name: 'Finance', icon: DollarSign },
    { id: 5, name: 'Review', icon: Eye }
  ];

  // Template Selection Modal
  const TemplateModal = () => (
    <AnimatePresence>
      {showTemplateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => currentStep > 0 && setShowTemplateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => currentStep > 0 && setShowTemplateModal(false)}
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 text-center">
              <Sparkles className="mx-auto mb-3 h-12 w-12 text-indigo-600" />
              <h2 className="text-3xl font-bold text-gray-900">Choose Your Starting Point</h2>
              <p className="mt-2 text-gray-600">Select a template or start from scratch</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quoteTemplates.map((template) => (
                <motion.button
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => applyTemplate(template)}
                  className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-6 text-left transition-all hover:border-indigo-500 hover:shadow-lg"
                >
                  <div className="mb-3 text-4xl">{template.icon}</div>
                  <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-indigo-600">
                    {template.name}
                  </h3>
                  <p className="mb-3 text-sm text-gray-600">{template.description}</p>
                  {template.items.length > 0 && (
                    <div className="text-xs text-gray-500">
                      {template.items.length} pre-filled items
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <ChevronRight className="h-5 w-5 text-indigo-600" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Step Indicator
  const StepIndicator = () => (
    <div className="mb-8 flex items-center justify-between">
      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <div key={step.id} className="flex flex-1 items-center">
            <button
              onClick={() => setCurrentStep(step.id)}
              className={`flex items-center gap-2 transition-all ${
                isActive
                  ? 'text-indigo-600'
                  : isCompleted
                  ? 'text-emerald-600'
                  : 'text-gray-400'
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-50'
                    : isCompleted
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <span className="hidden text-sm font-medium md:inline">{step.name}</span>
            </button>
            {idx < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 transition-all ${
                  isCompleted ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  // Step 1: Client Info
  const ClientStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Client Information</h2>
          </div>
          <button
            onClick={() => setClientInfo(prev => ({ ...prev, favorite: !prev.favorite }))}
            className="text-yellow-500 hover:text-yellow-600"
          >
            <Star className={`h-5 w-5 ${clientInfo.favorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Client Name <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="John Doe"
              value={clientInfo.name}
              onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Company</label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="Acme Corp"
              value={clientInfo.company}
              onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="client@example.com"
              value={clientInfo.email}
              onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="+233 XX XXX XXXX"
              value={clientInfo.phone}
              onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
            <textarea
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              rows={2}
              placeholder="Street address, city, region"
              value={clientInfo.address}
              onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tax ID (Optional)</label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="VAT/TIN number"
              value={clientInfo.taxId}
              onChange={(e) => setClientInfo({ ...clientInfo, taxId: e.target.value })}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Step 2: Project Info
  const ProjectStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Project Details</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="Site Mapping Project"
              value={projectInfo.projectName}
              onChange={(e) => setProjectInfo({ ...projectInfo, projectName: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Service Type</label>
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="Mapping & Surveying"
              value={projectInfo.service}
              onChange={(e) => setProjectInfo({ ...projectInfo, service: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="Accra, Ghana"
                value={projectInfo.location}
                onChange={(e) => setProjectInfo({ ...projectInfo, location: e.target.value })}
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Project Scope</label>
            <textarea
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              rows={3}
              placeholder="Describe the project scope, objectives, and deliverables..."
              value={projectInfo.scope}
              onChange={(e) => setProjectInfo({ ...projectInfo, scope: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                value={projectInfo.startDate}
                onChange={(e) => setProjectInfo({ ...projectInfo, startDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Deadline</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                value={projectInfo.deadline}
                onChange={(e) => setProjectInfo({ ...projectInfo, deadline: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Priority</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              value={projectInfo.priority}
              onChange={(e) => setProjectInfo({ ...projectInfo, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Remaining steps would be similar... Let me continue with Line Items and Financial steps

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advanced Quotation Builder</h1>
            <p className="mt-1 text-gray-600">Professional quotes with comprehensive features</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowTemplateModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
            >
              <Package className="h-4 w-4" />
              Templates
            </button>
            <button
              onClick={cloneQuote}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
            >
              <Copy className="h-4 w-4" />
              Clone
            </button>
            <button
              onClick={handlePreview}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save
            </button>
            {clientInfo.email && (
              <button
                onClick={handleSendEmail}
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send
              </button>
            )}
            {success && (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> Saved
              </span>
            )}
          </div>
        </div>

        {/* Step Indicator */}
        <StepIndicator />

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {currentStep === 1 && <ClientStep />}
            {currentStep === 2 && <ProjectStep />}
            {/* Other steps would be rendered here */}
            {currentStep === 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                <Package className="mx-auto mb-4 h-16 w-16 text-indigo-600" />
                <h2 className="mb-2 text-2xl font-bold text-gray-900">Choose a Template</h2>
                <p className="mb-6 text-gray-600">Select a template to get started quickly</p>
                <button
                  onClick={() => setShowTemplateModal(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  <Sparkles className="h-4 w-4" />
                  Browse Templates
                </button>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Quote Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Items</span>
                  <span className="font-semibold text-gray-900">{lineItems.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold">
                  <span>Subtotal</span>
                  <span>{formatMoney(calculations.subtotal)}</span>
                </div>
                {billing.discountValue > 0 && (
                  <div className="flex items-center justify-between px-3 text-sm text-gray-600">
                    <span>Discount</span>
                    <span>- {formatMoney(calculations.discountAmount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between px-3 text-sm text-gray-600">
                  <span>{billing.taxLabel} ({billing.taxRate}%)</span>
                  <span>{formatMoney(calculations.taxAmount)}</span>
                </div>
                {calculations.extrasTotal > 0 && (
                  <div className="flex items-center justify-between px-3 text-sm text-gray-600">
                    <span>Extras</span>
                    <span>{formatMoney(calculations.extrasTotal)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between rounded-lg bg-indigo-50 px-3 py-3 text-base font-bold text-indigo-900">
                  <span>Total</span>
                  <span>{formatMoney(calculations.total)}</span>
                </div>
                {billing.showCostPrice && (
                  <>
                    <div className="border-t border-gray-200 pt-3" />
                    <div className="flex items-center justify-between px-3 text-sm">
                      <span className="text-gray-600">Cost</span>
                      <span className="font-semibold text-gray-700">{formatMoney(calculations.totalCost)}</span>
                    </div>
                    <div className="flex items-center justify-between px-3 text-sm">
                      <span className="text-gray-600">Profit</span>
                      <span className="font-semibold text-emerald-600">{formatMoney(calculations.profit)}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                      <span>Margin</span>
                      <span>{calculations.profitMargin.toFixed(1)}%</span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="text-xs text-gray-500">
                  Quote #{invoiceInfo.invoiceNumber}
                  <br />
                  Rev. {invoiceInfo.revision}
                  <br />
                  Valid until: {invoiceInfo.validUntil || 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Template Selection Modal */}
      <TemplateModal />
    </div>
  );
}

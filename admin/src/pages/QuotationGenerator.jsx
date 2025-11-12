import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Send, Eye, Calendar, DollarSign,
  Plus, Trash2, Save, Loader, CheckCircle
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function QuotationGenerator() {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState('english'); // 'english' or 'french'
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Client Details
  const [clientInfo, setClientInfo] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    company: ''
  });

  // Invoice Details
  const [invoiceInfo, setInvoiceInfo] = useState({
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    currency: 'GHS'
  });

  // Line Items
  const [items, setItems] = useState([
    {
      id: 1,
      category: 'Equipment & Field Survey',
      description: 'Drone Survey',
      days: 1,
      area: 130,
      unitPrice: 100,
      total: 13000
    }
  ]);

  // Additional Sections
  const [imageProcessing, setImageProcessing] = useState({
    description: 'Orthophotography, Digitalization of blocks and calculation of areas, Extraction of plots, surfaces and collectors and slabs, Production of location map',
    price: 7738.80
  });

  const [transport, setTransport] = useState({
    included: true,
    price: 0
  });

  const [terms, setTerms] = useState({
    payment: 'Payment is due within 10 working days from the date of the invoice.',
    liability: 'Creative Approach will perform all services with reasonable care and skill. However, the AeroScout is not liable for any damages, losses, or expenses incurred by the Client as a result of the drone survey services, except in cases of gross negligence or willful misconduct.'
  });

  useEffect(() => {
    // Generate invoice number
    const date = new Date();
    const invoiceNum = `INV${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${Math.floor(Math.random() * 1000)}`;
    setInvoiceInfo(prev => ({ ...prev, invoiceNumber: invoiceNum }));
  }, []);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      category: 'Equipment & Field Survey',
      description: '',
      days: 1,
      area: 0,
      unitPrice: 0,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'days' || field === 'area' || field === 'unitPrice') {
          updated.total = (updated.days || 0) * (updated.area || 0) * (updated.unitPrice || 0);
        }
        return updated;
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + (imageProcessing.price || 0) + (transport.price || 0);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    // Colors
    const primaryColor = [41, 128, 185]; // Blue
    const headerColor = [236, 240, 241]; // Light gray
    const darkText = [44, 62, 80];
    
    if (language === 'english') {
      // English Invoice Format
      
      // Header - Company Name
      doc.setFontSize(14);
      doc.setTextColor(...darkText);
      doc.text('Creative Approach', 14, 20);
      doc.setFontSize(9);
      doc.text('Contact: 0241800716 / 0203885717', 14, 26);
      
      // Invoice Title
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('INVOICE', pageWidth - 60, 20);
      
      // AeroScout Logo Text (right side)
      doc.setFontSize(16);
      doc.text('AeroScout', pageWidth - 60, 30);
      
      // Invoice Details (right side)
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Invoice No:`, pageWidth - 60, 40);
      doc.text(`${invoiceInfo.invoiceNumber}`, pageWidth - 60, 46);
      doc.text(`Invoice Date:`, pageWidth - 60, 52);
      doc.text(`${new Date(invoiceInfo.invoiceDate).toLocaleDateString()}`, pageWidth - 60, 58);
      doc.text(`Due Date:`, pageWidth - 60, 64);
      doc.text(`${invoiceInfo.dueDate ? new Date(invoiceInfo.dueDate).toLocaleDateString() : 'Upon Receipt'}`, pageWidth - 60, 70);
      
      // Bill To Section
      doc.setFont('helvetica', 'bold');
      doc.text('BILL TO', 14, 45);
      doc.setFont('helvetica', 'normal');
      doc.text(clientInfo.name || 'CLIENT CST Limited', 14, 52);
      doc.setFontSize(9);
      doc.text(`ADDRESS: ${clientInfo.address || 'SW-36 Bank Rd, Abora Gomoa Off, Springs Rd, Accra'}`, 14, 58);
      
      // Invoice Title/Description
      doc.setFillColor(...headerColor);
      doc.rect(14, 75, pageWidth - 28, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(`INVOICE FOR DRONE SURVEY OF ${items[0]?.area || '130'} ACRES LAND`, pageWidth / 2, 80, { align: 'center' });
      
      // Equipment & Field Survey Section
      doc.setFillColor(...headerColor);
      doc.rect(14, 90, pageWidth - 28, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text('EQUIPMENT, FACILITIES AND FIELD SURVEY', 16, 94);
      
      // Table for items
      const itemsData = items.map(item => [
        item.description,
        item.days?.toString() || '1',
        item.area?.toString() || '',
        `${invoiceInfo.currency}`,
        item.unitPrice?.toFixed(2) || '0.00',
        `${invoiceInfo.currency}`,
        item.total?.toFixed(2) || '0.00'
      ]);
      
      doc.autoTable({
        startY: 100,
        head: [['DESCRIPTION', 'No. of Days', 'No. Acres', '', 'UNIT PRICE', '', 'TOTAL']],
        body: itemsData,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], fontSize: 9, halign: 'center' },
        bodyStyles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 20, halign: 'center' },
          2: { cellWidth: 20, halign: 'center' },
          3: { cellWidth: 15, halign: 'center' },
          4: { cellWidth: 25, halign: 'right' },
          5: { cellWidth: 15, halign: 'center' },
          6: { cellWidth: 25, halign: 'right' }
        },
        didDrawPage: (data) => {
          // Subtotal
          doc.setFont('helvetica', 'bold');
          doc.text('SUBTOTAL:', pageWidth - 70, data.cursor.y + 8);
          doc.text(`${invoiceInfo.currency}`, pageWidth - 40, data.cursor.y + 8);
          doc.text(calculateSubtotal().toFixed(2), pageWidth - 15, data.cursor.y + 8, { align: 'right' });
        }
      });
      
      let currentY = doc.lastAutoTable.finalY + 15;
      
      // Image Processing Section
      doc.setFillColor(...headerColor);
      doc.rect(14, currentY, pageWidth - 28, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text('IMAGE PROCESSING AND GEOREFERENCING', 16, currentY + 4);
      
      doc.autoTable({
        startY: currentY + 8,
        body: [[
          imageProcessing.description,
          '',
          '',
          `${invoiceInfo.currency}`,
          imageProcessing.price.toFixed(2),
          `${invoiceInfo.currency}`,
          imageProcessing.price.toFixed(2)
        ]],
        theme: 'grid',
        bodyStyles: { fontSize: 8 },
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 20 },
          2: { cellWidth: 20 },
          3: { cellWidth: 15, halign: 'center' },
          4: { cellWidth: 25, halign: 'right' },
          5: { cellWidth: 15, halign: 'center' },
          6: { cellWidth: 25, halign: 'right' }
        },
        didDrawPage: (data) => {
          doc.setFont('helvetica', 'bold');
          doc.text('SUBTOTAL:', pageWidth - 70, data.cursor.y + 6);
          doc.text(`${invoiceInfo.currency}`, pageWidth - 40, data.cursor.y + 6);
          doc.text(imageProcessing.price.toFixed(2), pageWidth - 15, data.cursor.y + 6, { align: 'right' });
        }
      });
      
      // Grand Total
      currentY = doc.lastAutoTable.finalY + 12;
      doc.setFillColor(...primaryColor);
      doc.setTextColor(255, 255, 255);
      doc.rect(pageWidth - 90, currentY, 76, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('GRAND TOTAL', pageWidth - 85, currentY + 5.5);
      doc.text(`${invoiceInfo.currency} ${calculateTotal().toFixed(2)}`, pageWidth - 15, currentY + 5.5, { align: 'right' });
      
      // Bank Details
      currentY += 18;
      doc.setTextColor(...darkText);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('BANK DETAILS', 14, currentY);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('Bank Name: Absa Bank', 14, currentY + 6);
      doc.text('Account Name: Creative Approach', 14, currentY + 11);
      doc.text('Account Number: 032 1108 180', 14, currentY + 16);
      doc.text('Branch: Takoradi Liberation Road', 14, currentY + 21);
      
      // Payment Terms
      currentY += 28;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      const paymentText = doc.splitTextToSize(terms.payment, pageWidth - 28);
      doc.text(paymentText, 14, currentY);
      
      // Terms and Conditions
      currentY += paymentText.length * 4 + 5;
      doc.setFillColor(...headerColor);
      doc.rect(14, currentY, pageWidth - 28, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('TERMS AND CONDITIONS AND LIABILITIES', pageWidth / 2, currentY + 4, { align: 'center' });
      
      currentY += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const termsText = doc.splitTextToSize(terms.liability, pageWidth - 28);
      doc.text(termsText, 14, currentY);
      
      // Footer
      currentY += termsText.length * 3 + 8;
      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('For enquiries and bookings: aeroscoutdrone@gmail.com', pageWidth / 2, currentY, { align: 'center' });
      
    } else {
      // French Invoice Format
      
      // Header
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('FACTURE', pageWidth - 70, 20);
      
      // Company Branding
      doc.setFontSize(18);
      doc.text('creative|approach', pageWidth - 70, 30);
      
      // Invoice Details
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`N° de facture :`, pageWidth - 70, 42);
      doc.text(`${invoiceInfo.invoiceNumber}`, pageWidth - 70, 48);
      doc.text(`Date de la facture :`, pageWidth - 70, 54);
      doc.text(`${new Date(invoiceInfo.invoiceDate).toLocaleDateString('fr-FR')}`, pageWidth - 70, 60);
      doc.text(`Échéance`, pageWidth - 70, 66);
      
      // Client Info
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('FACTURE A', 14, 45);
      doc.setFont('helvetica', 'normal');
      doc.text(`CLIENT: ${clientInfo.name || 'Banael Ahondo'}`, 14, 52);
      doc.text(`Adresse: ${clientInfo.address || '26BP 742 Abidjan 26'}`, 14, 58);
      
      // Invoice Title
      doc.setFillColor(...headerColor);
      doc.rect(14, 72, pageWidth - 28, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...darkText);
      doc.text(`FACTURE POUR L'ÉTUDE PAR DRONE DE ${items[0]?.area || '660'} HA DE PLANTATION`, pageWidth / 2, 78, { align: 'center' });
      
      // Equipment Section
      doc.setFillColor(...headerColor);
      doc.rect(14, 88, pageWidth - 28, 6, 'F');
      doc.text('ÉQUIPEMENTS, INSTALLATIONS ET ÉTUDE DE TERRAIN', 16, 92);
      
      // Items Table
      const frenchItemsData = items.map(item => [
        item.description,
        item.days?.toString() || '5',
        item.area?.toString() || '660',
        `${item.unitPrice?.toFixed(2) || '4.127'} XOF`,
        `${item.total?.toFixed(2) || '2,723,820'} XOF`
      ]);
      
      doc.autoTable({
        startY: 96,
        head: [['DESCRIPTION', 'Nombre de jours', 'Nom. Ha', 'Prix / (ha)', 'TOTAL']],
        body: frenchItemsData,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], fontSize: 9, halign: 'center' },
        bodyStyles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 70 },
          1: { cellWidth: 30, halign: 'center' },
          2: { cellWidth: 25, halign: 'center' },
          3: { cellWidth: 30, halign: 'right' },
          4: { cellWidth: 35, halign: 'right' }
        },
        didDrawPage: (data) => {
          doc.setFont('helvetica', 'bold');
          doc.text('SOUS-TOTAL', pageWidth - 70, data.cursor.y + 8);
          doc.text(`${calculateSubtotal().toFixed(2)} XOF`, pageWidth - 15, data.cursor.y + 8, { align: 'right' });
        }
      });
      
      let currentY = doc.lastAutoTable.finalY + 15;
      
      // Image Processing
      doc.setFillColor(...headerColor);
      doc.rect(14, currentY, pageWidth - 28, 6, 'F');
      doc.text('TRAITEMENT D\'IMAGES ET GÉORÉFÉRENCEMENT', 16, currentY + 4);
      
      doc.autoTable({
        startY: currentY + 8,
        body: [[
          imageProcessing.description,
          '',
          '',
          `${imageProcessing.price.toFixed(2)} XOF`,
          `${imageProcessing.price.toFixed(2)} XOF`
        ]],
        theme: 'grid',
        bodyStyles: { fontSize: 8 },
        columnStyles: {
          0: { cellWidth: 70 },
          1: { cellWidth: 30 },
          2: { cellWidth: 25 },
          3: { cellWidth: 30, halign: 'right' },
          4: { cellWidth: 35, halign: 'right' }
        },
        didDrawPage: (data) => {
          doc.setFont('helvetica', 'bold');
          doc.text('SOUS-TOTAL', pageWidth - 70, data.cursor.y + 6);
          doc.text(`${imageProcessing.price.toFixed(2)} XOF`, pageWidth - 15, data.cursor.y + 6, { align: 'right' });
        }
      });
      
      // Transport Section
      currentY = doc.lastAutoTable.finalY + 12;
      doc.setFillColor(...headerColor);
      doc.rect(14, currentY, pageWidth - 28, 6, 'F');
      doc.text('TRANSPORT ET LOGISTIQUE', 16, currentY + 4);
      
      doc.autoTable({
        startY: currentY + 8,
        body: [['Transport', '', '', `${transport.price.toFixed(2)} XOF`, `${transport.price.toFixed(2)} XOF`]],
        theme: 'grid',
        bodyStyles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 70 },
          1: { cellWidth: 30 },
          2: { cellWidth: 25 },
          3: { cellWidth: 30, halign: 'right' },
          4: { cellWidth: 35, halign: 'right' }
        },
        didDrawPage: (data) => {
          doc.setFont('helvetica', 'bold');
          doc.text('TOTAL GÉNÉRAL', pageWidth - 70, data.cursor.y + 8);
          doc.text(`${calculateTotal().toFixed(2)} XOF`, pageWidth - 15, data.cursor.y + 8, { align: 'right' });
        }
      });
      
      // Bank Details
      currentY = doc.lastAutoTable.finalY + 18;
      doc.setFillColor(...headerColor);
      doc.rect(14, currentY, pageWidth - 28, 6, 'F');
      doc.text('COORDONNÉES BANCAIRES', 16, currentY + 4);
      
      currentY += 10;
      doc.setFont('helvetica', 'normal');
      doc.text('Nom de la banque : Absa Bank', 14, currentY);
      doc.text('Nom du compte : Creative Approach', 14, currentY + 5);
      doc.text('Numéro de compte : 032 1108 180', 14, currentY + 10);
      doc.text('Succursale : Takoradi Liberation Road, Ghana.', 14, currentY + 15);
      
      // Payment Terms
      currentY += 22;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      const frenchPaymentText = doc.splitTextToSize('Le paiement est dû dans les 10 jours ouvrables à compter de la date de la facture. Le Client est responsable de toutes les taxes applicables.', pageWidth - 28);
      doc.text(frenchPaymentText, 14, currentY);
      
      // Terms
      currentY += frenchPaymentText.length * 4 + 5;
      doc.setFillColor(...headerColor);
      doc.rect(14, currentY, pageWidth - 28, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('TERMES ET CONDITIONS ET RESPONSABILITÉS', pageWidth / 2, currentY + 4, { align: 'center' });
      
      currentY += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const frenchTermsText = doc.splitTextToSize("L'approche créative effectuera tous les services avec soin et une compétence raisonnables. Toutefois, l'Approche Créative n'est pas responsable des dommages, pertes ou dépenses encourus par le Client à la suite des services de relevé par drone, sauf en cas de négligence grave ou de faute intentionnelle. Sauf accord contraire, le client est responsable de l'obtention des autorisations et permis nécessaires pour le relevé par drone.", pageWidth - 28);
      doc.text(frenchTermsText, 14, currentY);
      
      // Footer
      currentY += frenchTermsText.length * 3 + 10;
      if (currentY > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('Pour toute demande de renseignements et réservations : benjyemp@gmail.com', pageWidth / 2, currentY, { align: 'center' });
      doc.setFontSize(8);
      doc.text('Contact : +233 (0) 541800716 / (0) 203885717', pageWidth / 2, currentY + 5, { align: 'center' });
    }
    
    return doc;
  };

  const downloadPDF = () => {
    const doc = generatePDF();
    doc.save(`${language === 'french' ? 'Facture' : 'Invoice'}_${invoiceInfo.invoiceNumber}.pdf`);
  };

  const previewPDF = () => {
    const doc = generatePDF();
    window.open(doc.output('bloburl'), '_blank');
  };

  const saveQuotation = async () => {
    setSaving(true);
    try {
      const quotationData = {
        clientInfo,
        invoiceInfo,
        items,
        imageProcessing,
        transport,
        terms,
        language,
        subtotal: calculateSubtotal(),
        total: calculateTotal()
      };

      const response = await fetch(`${API_URL}/api/quotations/save-detailed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(quotationData)
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error saving quotation:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Professional Quotation Generator
          </h1>
          <p className="text-gray-600">
            Create detailed invoices for drone services with automatic calculations
          </p>
        </div>

        {/* Language Toggle */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Invoice Language
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setLanguage('english')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                language === 'english'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              English (GHS)
            </button>
            <button
              onClick={() => setLanguage('french')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                language === 'french'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              French (XOF)
            </button>
          </div>
        </div>

        {/* Form Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Client Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="CLIENT CST Limited"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={clientInfo.company}
                    onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Optional"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <input
                    type="text"
                    value={clientInfo.address}
                    onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="SW-36 Bank Rd, Abora Gomoa Off, Springs Rd, Accra"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="client@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>
              </div>
            </motion.div>

            {/* Invoice Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Invoice Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    value={invoiceInfo.invoiceNumber}
                    onChange={(e) => setInvoiceInfo({ ...invoiceInfo, invoiceNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Date
                  </label>
                  <input
                    type="date"
                    value={invoiceInfo.invoiceDate}
                    onChange={(e) => setInvoiceInfo({ ...invoiceInfo, invoiceDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={invoiceInfo.dueDate}
                    onChange={(e) => setInvoiceInfo({ ...invoiceInfo, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Line Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  Equipment & Field Survey Items
                </h2>
                <button
                  onClick={addItem}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Drone Survey"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Days
                        </label>
                        <input
                          type="number"
                          value={item.days}
                          onChange={(e) => updateItem(item.id, 'days', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Area ({language === 'french' ? 'Ha' : 'Acres'})
                        </label>
                        <input
                          type="number"
                          value={item.area}
                          onChange={(e) => updateItem(item.id, 'area', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Unit Price
                        </label>
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Total
                          </label>
                          <input
                            type="text"
                            value={item.total.toFixed(2)}
                            readOnly
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50"
                          />
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Subtotal:</span>
                  <span className="text-xl font-bold text-gray-900">
                    {invoiceInfo.currency} {calculateSubtotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Image Processing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Image Processing & Georeferencing
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={imageProcessing.description}
                    onChange={(e) => setImageProcessing({ ...imageProcessing, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    value={imageProcessing.price}
                    onChange={(e) => setImageProcessing({ ...imageProcessing, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Transport */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Transport & Logistics
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={transport.included}
                    onChange={(e) => setTransport({ ...transport, included: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Include transport costs
                  </label>
                </div>
                {transport.included && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transport Price
                    </label>
                    <input
                      type="number"
                      value={transport.price}
                      onChange={(e) => setTransport({ ...transport, price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Invoice Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Field Survey:</span>
                    <span className="font-medium">{invoiceInfo.currency} {calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Image Processing:</span>
                    <span className="font-medium">{invoiceInfo.currency} {imageProcessing.price.toFixed(2)}</span>
                  </div>
                  {transport.included && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transport:</span>
                      <span className="font-medium">{invoiceInfo.currency} {transport.price.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Grand Total:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {invoiceInfo.currency} {calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 space-y-3"
              >
                <button
                  onClick={previewPDF}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  Preview PDF
                </button>
                <button
                  onClick={downloadPDF}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={saveQuotation}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : success ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {saving ? 'Saving...' : success ? 'Saved!' : 'Save to Database'}
                </button>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-50 rounded-xl p-6"
              >
                <h3 className="text-sm font-semibold text-blue-900 mb-2">
                  💡 Quick Tips
                </h3>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Fill all required client information</li>
                  <li>• Add multiple line items as needed</li>
                  <li>• Toggle between English/French formats</li>
                  <li>• Preview before downloading</li>
                  <li>• Save to database for record keeping</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

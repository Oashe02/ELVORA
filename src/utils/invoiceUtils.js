import { pdf } from '@react-pdf/renderer';
import InvoiceDocument from '../components/InvoiceDocument';
import RecentOrderDocument from '../components/RecentOrderDocument';

export const generateRecentOrderPDF = async (order, customer) => {
  return pdf(<RecentOrderDocument order={order} customer={customer} />).toBlob();
};

export const generateInvoicePDF = async (order, customer) => {
  return pdf(<InvoiceDocument order={order} customer={customer} />).toBlob();
};

export const downloadRecentOrder = async (order, customer) => {
  try {
    const blob = await generateRecentOrderPDF(order, customer);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `volvo-receipt-${order.orderId}.pdf`;
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Error generating receipt:', error);
    throw error;
  }
};

export const downloadInvoice = async (order, customer) => {
  try {
    const blob = await generateInvoicePDF(order, customer);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `volvo-invoice-${order.orderId}.pdf`;
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
};
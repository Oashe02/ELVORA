import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import moment from 'moment';

const styles = StyleSheet.create({
  page: {
    padding: 0,
    margin: 0,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#fff',
    color: '#333',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  headerSection: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 30,
    marginBottom: 0,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  brandSub: {
    fontSize: 11,
    marginBottom: 15,
    textAlign: 'center',
    color: '#e0e0e0',
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceInfo: {
    textAlign: 'right',
  },
  invoiceNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  invoiceDate: {
    fontSize: 10,
    color: '#e0e0e0',
  },
  contentArea: {
    padding: 30,
    flexShrink: 1,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    paddingBottom: 4,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  infoItem: {
    width: '50%',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 9,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  tableContainer: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  tableRowAlt: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },
  tableCol: {
    flex: 1,
    paddingRight: 8,
    fontSize: 9,
  },
  tableColLarge: {
    flex: 2,
    paddingRight: 8,
    fontSize: 9,
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryContainer: {
    marginTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#000',
    paddingTop: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  summaryLabel: {
    fontSize: 10,
    color: '#666',
  },
  summaryValue: {
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#000',
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },
  historyDate: {
    fontSize: 9,
    color: '#666',
    flex: 1,
  },
  historyNote: {
    fontSize: 9,
    color: '#000',
    flex: 2,
  },
  footer: {
    marginTop: 20,
    paddingTop: 15,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

const formatCurrency = (amount) => `AED ${amount.toFixed(2)}`;

const InvoiceDocument = ({ order, customer }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.headerSection}>
          <Text style={styles.brandTitle}>VOLVO XPERTS</Text>
          <Text style={styles.brandSub}>Professional Volvo Parts & Expertise - volvoxperts.com/</Text>
          <View style={styles.invoiceHeader}>
            <View>
              <Text style={{ fontSize: 11, color: '#e0e0e0' }}>INVOICE</Text>
            </View>
            <View style={styles.invoiceInfo}>
              <Text style={styles.invoiceNumber}>#{order.orderId}</Text>
              <Text style={styles.invoiceDate}>{moment(order.placedOn).format('MMMM D, YYYY')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentArea}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Information</Text>
            <View style={styles.infoGrid}>
              {[
                { label: 'NAME', value: `${customer.profile.firstName} ${customer.profile.lastName}` },
                { label: 'EMAIL', value: customer.email },
                { label: 'PHONE', value: `+${customer.profile.phone}` },
                { label: 'APARTMENT', value: customer.profile.apartment },
                { label: 'ADDRESS', value: customer.profile.address },
                { label: 'LOCATION', value: `${customer.profile.emirate}, ${customer.profile.country}` },
              ].map((item, idx) => (
                <View key={idx} style={styles.infoItem}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Details</Text>
            <View style={styles.infoGrid}>
              {[
                { label: 'STATUS', value: order.status },
                { label: 'FULFILLMENT', value: order.fulfillmentType },
                { label: 'PAYMENT METHOD', value: order.paymentMethod.replace(/_/g, ' ') },
                { label: 'PAYMENT STATUS', value: order.paymentStatus },
              ].map((item, idx) => (
                <View key={idx} style={styles.infoItem}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Items</Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableColLarge, styles.tableHeaderText]}>PRODUCT</Text>
                <Text style={[styles.tableCol, styles.tableHeaderText]}>PRICE</Text>
                <Text style={[styles.tableCol, styles.tableHeaderText]}>QTY</Text>
                <Text style={[styles.tableCol, styles.tableHeaderText]}>SUBTOTAL</Text>
              </View>
              {order.items.map((item, idx) => (
                <View key={idx} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                  <Text style={styles.tableColLarge}>{item.name}</Text>
                  <Text style={styles.tableCol}>{formatCurrency(item.price)}</Text>
                  <Text style={styles.tableCol}>{item.quantity}</Text>
                  <Text style={styles.tableCol}>{formatCurrency(item.subtotal)}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>{formatCurrency(order.subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax:</Text>
              <Text style={styles.summaryValue}>{formatCurrency(order.tax)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping:</Text>
              <Text style={styles.summaryValue}>{formatCurrency(order.shippingCharge)}</Text>
            </View>
            {order.couponCode && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Coupon ({order.couponCode}):</Text>
                <Text style={styles.summaryValue}>-{formatCurrency(order.discount || 0)}</Text>
              </View>
            )}

            {/* <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount:</Text>
              <Text style={styles.summaryValue}>{formatCurrency(order.discount)}</Text>
            </View> */}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL:</Text>
              <Text style={styles.totalValue}>{formatCurrency(order.total)}</Text>
            </View>
          </View>

          {order.history?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order History</Text>
              {order.history.map((entry, idx) => (
                <View key={idx} style={styles.historyItem}>
                  <Text style={styles.historyDate}>
                    {moment(entry.timestamp).format('MMM D, YYYY h:mm A')}
                  </Text>
                  <Text style={styles.historyNote}>{entry.note}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.footer}>
            <Text>Thank you for choosing Volvo xperts - Your trusted partner for Volvo parts and expertise</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;

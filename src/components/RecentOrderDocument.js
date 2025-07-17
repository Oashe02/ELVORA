import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';

const styles = StyleSheet.create({
  page: {
    padding: 20, // Reduced from 40
    fontSize: 8, // Reduced from 10
    fontFamily: 'Helvetica',
    backgroundColor: '#fff',
    color: '#111',
  },
  header: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 10, // Reduced from 20
    marginBottom: 15, // Reduced from 30
    borderRadius: 4,
  },
  title: {
    fontSize: 16, // Reduced from 20
    fontWeight: 'bold',
    marginBottom: 4, // Reduced from 6
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#facc15',
  },
  subtitle: {
    fontSize: 10, // Reduced from 12
    textAlign: 'center',
    marginBottom: 4, // Reduced from 6
    color: '#e5e5e5',
  },
  headerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8, // Reduced from 10
    marginTop: 6, // Reduced from 10
    color: '#ccc',
  },
  section: {
    marginBottom: 15, // Reduced from 25
  },
  sectionTitle: {
    fontSize: 10, // Reduced from 12
    fontWeight: 'bold',
    marginBottom: 6, // Reduced from 10
    borderBottomWidth: 1, // Reduced from 2
    borderBottomColor: '#facc15',
    paddingBottom: 2, // Reduced from 4
    textTransform: 'uppercase',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4, // Reduced from 6
  },
  label: {
    width: '40%',
    fontWeight: 'bold',
    color: '#444',
  },
  value: {
    width: '58%',
    color: '#000',
  },
  statusBadge: {
    padding: 3, // Reduced from 4
    borderRadius: 2, // Reduced from 3
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 6, // Reduced from 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 4, // Reduced from 6
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    padding: 4, // Reduced from 6
  },
  tableCell: {
    flex: 1,
    fontSize: 7, // Reduced from 9
  },
  total: {
    marginTop: 10, // Reduced from 15
    paddingTop: 6, // Reduced from 10
    borderTopWidth: 1,
    borderTopColor: '#000',
    fontWeight: 'bold',
    fontSize: 10, // Reduced from 12
  },
  notes: {
    fontSize: 7, // Reduced from 9
    color: '#333',
    lineHeight: 1.2, // Reduced from 1.4
  },
  footer: {
    marginTop: 20, // Reduced from 40
    textAlign: 'center',
    fontSize: 7, // Reduced from 9
    color: '#666',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8, // Reduced from 12
  },
});

const getStatusColor = (status) => {
  switch (status) {
    case 'delivered': return '#10B981';
    case 'processing': return '#3B82F6';
    case 'shipped': return '#8B5CF6';
    case 'pending': return '#F59E0B';
    case 'cancelled': return '#EF4444';
    default: return '#6B7280';
  }
};

const RecentOrderDocument = ({ order, customer }) => {
  // Log data received by RecentOrderDocument
  console.log('RecentOrderDocument - Order:', JSON.stringify(order, null, 2));
  console.log('RecentOrderDocument - Customer:', JSON.stringify(customer, null, 2));

  // Validate numeric fields
  const validatedOrder = {
    ...order,
    subtotal: Number(order.subtotal) || 0,
    tax: Number(order.tax) || 0,
    discount: Number(order.discount) || 0,
    shippingCharge: Number(order.shippingCharge) || 0,
    total: Number(order.total) || 0,
    items: order.items?.map(item => ({
      ...item,
      price: Number(item.price) || 0,
      subtotal: Number(item.subtotal) || 0,
      quantity: Number(item.quantity) || 0,
      tax: Number(item.tax) || 0,
    })) || [],
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Recent Order Receipt</Text>
          <Text style={styles.subtitle}>Volvo Parts Store - Order Confirmation</Text>
          <View style={styles.headerDetails}>
            <Text>Order ID: {validatedOrder.orderId}</Text>
            <Text>Date: {moment(validatedOrder.createdAt).format('MMMM D, YYYY h:mm A')}</Text>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Order Status:</Text>
            <Text
              style={[
                styles.value,
                styles.statusBadge,
                { color: getStatusColor(validatedOrder.status) },
              ]}
            >
              {validatedOrder.status.toUpperCase()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Status:</Text>
            <Text
              style={[
                styles.value,
                styles.statusBadge,
                { color: getStatusColor(validatedOrder.paymentStatus) },
              ]}
            >
              {validatedOrder.paymentStatus.toUpperCase()}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Order Date:</Text>
            <Text style={styles.value}>
              {moment(validatedOrder.createdAt).format('MMMM D, YYYY h:mm A')}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method:</Text>
            <Text style={styles.value}>
              {validatedOrder.paymentMethod ? validatedOrder.paymentMethod.replace(/_/g, ' ').toUpperCase() : 'N/A'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fulfillment Type:</Text>
            <Text style={styles.value}>
              {validatedOrder.fulfillmentType ? validatedOrder.fulfillmentType.replace(/_/g, ' ').toUpperCase() : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { flex: 2 }]}>Product</Text>
              <Text style={styles.tableCell}>SKU</Text>
              <Text style={styles.tableCell}>Qty</Text>
              <Text style={styles.tableCell}>Price (AED)</Text>
              <Text style={styles.tableCell}>Subtotal (AED)</Text>
            </View>
            {validatedOrder.items.map((item, idx) => (
              <View style={styles.tableRow} key={idx}>
                <Text style={[styles.tableCell, { flex: 2 }]}>{item.name || 'Unnamed Product'}</Text>
                <Text style={styles.tableCell}>{item.sku || 'N/A'}</Text>
                <Text style={styles.tableCell}>{item.quantity}</Text>
                <Text style={styles.tableCell}>{item.price.toFixed(2)}</Text>
                <Text style={styles.tableCell}>{item.subtotal.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Financial Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Details</Text>
          {validatedOrder.couponCode && (
            <View style={styles.row}>
              <Text style={styles.label}>Coupon Code:</Text>
              <Text style={styles.value}>{validatedOrder.couponCode}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal:</Text>
            <Text style={styles.value}>AED {validatedOrder.subtotal.toFixed(2)}</Text>
          </View>
          {validatedOrder.discount > 0 && (
            <View style={styles.row}>
              <Text style={styles.label}>Discount:</Text>
              <Text style={styles.value}>AED {validatedOrder.discount.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Tax:</Text>
            <Text style={styles.value}>AED {validatedOrder.tax.toFixed(2)}</Text>
          </View>
          {validatedOrder.shippingCharge > 0 && (
            <View style={styles.row}>
              <Text style={styles.label}>Shipping Charge:</Text>
              <Text style={styles.value}>AED {validatedOrder.shippingCharge.toFixed(2)}</Text>
            </View>
          )}
          <View style={[styles.row, styles.total]}>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.value}>AED {validatedOrder.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Delivery Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          {validatedOrder.estimatedDeliveryDate ? (
            <View style={styles.row}>
              <Text style={styles.label}>Estimated Delivery:</Text>
              <Text style={styles.value}>
                {moment(validatedOrder.estimatedDeliveryDate).format('MMMM D, YYYY')}
              </Text>
            </View>
          ) : (
            <View style={styles.row}>
              <Text style={styles.label}>Estimated Delivery:</Text>
              <Text style={styles.value}>Not Available</Text>
            </View>
          )}
          {validatedOrder.actualDeliveryDate ? (
            <View style={styles.row}>
              <Text style={styles.label}>Delivered On:</Text>
              <Text style={styles.value}>
                {moment(validatedOrder.actualDeliveryDate).format('MMMM D, YYYY')}
              </Text>
            </View>
          ) : validatedOrder.status === 'delivered' ? (
            <View style={styles.row}>
              <Text style={styles.label}>Delivered On:</Text>
              <Text style={styles.value}>Not Available</Text>
            </View>
          ) : null}
          <View style={styles.row}>
            <Text style={styles.label}>Carrier:</Text>
            <Text style={styles.value}>{validatedOrder.carrier || 'Not Available'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tracking ID:</Text>
            <Text style={styles.value}>{validatedOrder.tracking || 'Not Available'}</Text>
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          {[
            { label: 'Name', value: `${customer.profile?.firstName || ''} ${customer.profile?.lastName || ''}`.trim() || 'N/A' },
            { label: 'Email', value: customer.email || 'N/A' },
            { label: 'Phone', value: customer.profile?.phone ? `+${customer.profile.phone}` : 'N/A' },
            { label: 'Address', value: customer.profile?.address || 'N/A' },
            { label: 'Apartment', value: customer.profile?.apartment || 'N/A' },
            { label: 'Country', value: customer.profile?.country || 'N/A' },
            { label: 'Emirate', value: customer.profile?.emirate || 'N/A' },
          ].map((item, idx) => (
            <View style={styles.row} key={idx}>
              <Text style={styles.label}>{item.label}:</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Order History */}
        {validatedOrder.history?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order History</Text>
            {validatedOrder.history.map((event, idx) => (
              <View style={styles.row} key={idx}>
                <Text style={styles.label}>
                  {moment(event.timestamp).format('MMMM D, YYYY h:mm A')}:
                </Text>
                <Text style={styles.value}>
                  {event.note} (Status: {event.status.toUpperCase()})
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Order Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.notes}>
            Thank you for your recent order. This is a confirmation of your purchase. You’ll receive another notification when your order ships.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Volvo Parts Store</Text>
          <Text>123 Business Road, Dubai, UAE</Text>
          <Text>Contact: +971 4 123 4567</Text>
        </View>
      </Page>
    </Document>
  );
};

export default RecentOrderDocument;
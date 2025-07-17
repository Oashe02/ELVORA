"use client";

import { useRef } from "react";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Printer } from "lucide-react";
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";


export function PrintInvoice({
  order,
  companyInfo = {
  name: "The Nuaims Perfume",
  address: "123 Business Street",
  city: "Dubai",
  state: "Dubai",
  postalCode: "00000",
  country: "UAE",
  phone: "+971 564451624",
  email: "contact@thenuaimsperfume.com",
  website: "thenuaimsperfume.com",

  },
}) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Print Button */}
        <div className="flex justify-end">
          <Button 
            onClick={reactToPrintFn} 
            className="print:hidden bg-black hover:bg-gray-800 text-white"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Invoice
          </Button>
        </div>

        {/* Main Invoice Card */}
        <Card className="shadow-lg border border-gray-300">
          <div className="p-6" ref={contentRef}>
            {/* Invoice Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8 pb-6 border-b border-gray-300">
              <div>
                <h1 className="text-3xl font-bold text-black mb-2">
                  {companyInfo.name}
                </h1>
                <address className="not-italic text-gray-700 text-sm leading-relaxed">
                  <p>{companyInfo.address}</p>
                  <p>{companyInfo.city}, {companyInfo.state} {companyInfo.postalCode}</p>
                  <p>{companyInfo.country}</p>
                  <p className="mt-2">{companyInfo.phone}</p>
                  <p>{companyInfo.email}</p>
                  <p>{companyInfo.website}</p>
                  {companyInfo.taxId && <p>Tax ID: {companyInfo.taxId}</p>}
                </address>
              </div>
              
              <div className="mt-6 lg:mt-0 text-right">
                <h2 className="text-2xl font-bold text-black mb-4">INVOICE</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between lg:justify-end lg:gap-4">
                    <span className="text-gray-600">Invoice #:</span>
                    <span className="font-semibold text-black">{order.orderId}</span>
                  </div>
                  <div className="flex justify-between lg:justify-end lg:gap-4">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold text-black">
                      {format(new Date(order.createdAt), "PP")}
                    </span>
                  </div>
                  {order.paymentStatus === "paid" &&
                    order.payments &&
                    order.payments[0]?.timestamp && (
                      <div className="flex justify-between lg:justify-end lg:gap-4">
                        <span className="text-gray-600">Payment Date:</span>
                        <span className="font-semibold text-black">
                          {format(new Date(order.payments[0].timestamp), "PP")}
                        </span>
                      </div>
                    )}
                  <div className="pt-2">
                    <span className={`inline-block px-3 py-1 border text-xs font-bold uppercase tracking-wide ${
                      order.paymentStatus === 'paid' 
                        ? 'bg-black text-white border-black' 
                        : order.paymentStatus === 'pending'
                        ? 'bg-white text-black border-black'
                        : 'bg-gray-100 text-black border-gray-400'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bill To and Payment Method */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg text-black mb-3 border-b border-gray-300 pb-1">
                  Bill To
                </h3>
                <address className="not-italic text-gray-700 text-sm leading-relaxed">
                  <p className="font-semibold text-black">
                    {order?.customer?.firstName} {order?.customer?.lastName}
                  </p>
                  {order?.customer?.company && (
                    <p className="font-medium">{order?.customer?.company}</p>
                  )}
                  <p>{order?.customer?.address}</p>
                  {order?.customer?.address2 && <p>{order?.customer?.address2}</p>}
                  <p>
                    {order?.customer?.city}, {order?.customer?.state}{" "}
                    {order?.customer?.postalCode}
                  </p>
                  <p>{order?.customer?.country}</p>
                  {order?.customer?.phone && <p>{order?.customer?.phone}</p>}
                </address>
              </div>

              <div>
                <h3 className="font-bold text-lg text-black mb-3 border-b border-gray-300 pb-1">
                  Payment Method
                </h3>
                <div className="text-sm">
                  <p className="font-semibold text-black">{order.paymentMethod}</p>
                  {order.payments &&
                    order.payments.length > 0 &&
                    order.payments[0].transactionId && (
                      <p className="text-gray-600 mt-1">
                        Transaction ID: {order.payments[0].transactionId}
                      </p>
                    )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h3 className="font-bold text-lg text-black mb-4 border-b border-gray-300 pb-1">
                Order Items
              </h3>
              <div className="border border-gray-300">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border-r border-gray-300">
                        Item
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-bold text-black uppercase tracking-wider border-r border-gray-300">
                        Price
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-bold text-black uppercase tracking-wider border-r border-gray-300">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-bold text-black uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {order.products.map((item, index) => (
                      <tr key={index} className="border-t border-gray-300">
                        <td className="px-4 py-3 border-r border-gray-300">
                          <div>
                            <p className="font-semibold text-black text-sm">{item.name}</p>
                            <div className="text-xs text-gray-600 mt-1">
                              {item.sku && <span>SKU: {item.sku}</span>}
                              {item.variant && (
                                <span className={item.sku ? " | " : ""}>{item.variant}</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-black text-sm border-r border-gray-300">
                          <ServerPriceDisplay amount={item.price.toFixed(2)} />
                        </td>
                        <td className="px-4 py-3 text-right text-black text-sm border-r border-gray-300">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-black text-sm">
                          <ServerPriceDisplay amount={item.subtotal.toFixed(2)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8 flex justify-end">
              <div className="w-full sm:w-80">
                <div className="border border-gray-300">
                  <div className="bg-gray-100 px-4 py-2">
                    <h3 className="font-bold text-base text-black">Order Summary</h3>
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-700">Subtotal:</span>
                      <span className="font-semibold text-black"><ServerPriceDisplay amount={order.subtotal.toFixed(2)}/></span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between py-1">
                        <span className="text-gray-700">Discount:</span>
                        <span className="font-semibold text-black">- <ServerPriceDisplay amount={order.discount.toFixed(2)}/></span>
                      </div>
                    )}
                    {order.tax > 0 && (
                      <div className="flex justify-between py-1">
                        <span className="text-gray-700">Tax:</span>
                        <span className="font-semibold text-black"><ServerPriceDisplay amount={order.tax.toFixed(2)}/></span>
                      </div>
                    )}
                    {order.shippingCharge > 0 && (
                      <div className="flex justify-between py-1">
                        <span className="text-gray-700">Shipping:</span>
                        <span className="font-semibold text-black"><ServerPriceDisplay amount={order.shippingCharge.toFixed(2)}/></span>
                      </div>
                    )}
                    <Separator className="my-2 bg-gray-300" />
                    <div className="flex justify-between  text-base font-bold bg-gray-100 px-3 py-2 -mx-1">
                      <span className="text-black">Total:</span>
                      <span className="text-black"><ServerPriceDisplay amount={order.total.toFixed(2)}/></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {order.customerNotes && (
              <div className="mb-6 border-l-4 border-gray-400 pl-4">
                <h3 className="font-bold text-base text-black mb-2">
                  Customer Notes
                </h3>
                <p className="text-gray-700 italic text-sm leading-relaxed">{order.customerNotes}</p>
              </div>
            )}

            {/* Thank You */}
            <div className="text-center py-6 border-t border-gray-300">
              <h3 className="text-lg font-bold text-black">Thank you for your business!</h3>
              <p className="text-gray-600 text-sm mt-1">We appreciate your trust in our services.</p>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-300 space-y-1">
              <p>This is a computer-generated invoice and does not require a signature.</p>
              <p>
                Questions about this invoice? Contact us at{" "}
                <span className="font-semibold text-black">{companyInfo.email}</span>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
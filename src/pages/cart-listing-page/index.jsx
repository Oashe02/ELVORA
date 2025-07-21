"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { Plus, Minus, X, ShoppingCart } from "lucide-react";
import Layout from "@/components/layouts/Layout";
import axiosInstance from "@/lib/axiosInstance";
import ServerPriceDisplay from "@/components/blocks/ServerPriceDisplay";

const CartPage = ({ categories, banners, addons, addonsProducts }) => {
    const {
        isEmpty,
        items,
        updateItemQuantity,
        removeItem,
        addItem,
        cartTotal
    } = useCart();

    const [isClient, setIsClient] = useState(false);
    // Simplified state to only track the ID of the active addon category
    const [activeAddOnCategoryId, setActiveAddOnCategoryId] = useState(null);

    useEffect(() => {
        setIsClient(true);
        // Set the first addon category as the default selection when the component mounts
        if (addons && addons.length > 0 && !activeAddOnCategoryId) {
            setActiveAddOnCategoryId(addons[0]._id);
        }
    }, [addons, activeAddOnCategoryId]);

    // Filter the addon products based on the selected addon category ID
    const filteredAddonProducts = useMemo(() => {
        if (!activeAddOnCategoryId || !addonsProducts) return [];
        // The product's category can be a string ID or an object with an _id.
        // This handles both cases for robustness.
        return addonsProducts.filter(product => 
            (typeof product.category === 'string' && product.category === activeAddOnCategoryId) ||
            (typeof product.category === 'object' && product.category?._id === activeAddOnCategoryId)
        );
    }, [activeAddOnCategoryId, addonsProducts]);


    if (!isClient) {
        return (
            <Layout categories={categories} banners={banners}>
                <div className="text-center py-20 min-h-[60vh]">Loading Cart...</div>
            </Layout>
        );
    }

    if (isEmpty) {
        return (
            <Layout categories={categories} banners={banners}>
                <div className="flex flex-col items-center justify-center text-center py-20 min-h-[60vh]">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Your Cart is Empty</h1>
                    <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <Link href="/" className="px-6 py-3 bg-gray-800 text-white font-semibold -md hover:bg-black transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            </Layout>
        );
    }
    
    return (
        <Layout categories={categories} banners={banners}>
            <div className="bg-[#F7F7F7] px-4 sm:px-8 lg:px-16 py-12">
                <div className="max-w-7xl mx-auto">

                    {/* --- Quick Add On's Section --- */}
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-light tracking-widest text-gray-800">QUICK ADD ON'S FOR MORE ATTRACTIONS</h2>
                    </div>

                    {/* Addon Category Filters */}
                    <div className="flex justify-center items-center gap-4 sm:gap-8 mb-12">
                        {addons.map((addon) => (
                            <button
                                key={addon._id}
                                onClick={() => setActiveAddOnCategoryId(addon._id)}
                                className={`text-sm font-semibold pb-2 transition-all duration-300 ${
                                    activeAddOnCategoryId === addon._id
                                        ? 'border-b-2 border-black text-black'
                                        : 'border-b-2 border-transparent text-gray-500 hover:text-black'
                                }`}
                            >
                                {addon.name}
                            </button>
                        ))}
                    </div>
                    
                    {/* Addon Product Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-20">
                        {filteredAddonProducts.map((product) => (
                            <div key={product._id} className="text-center group bg-white flex flex-col shadow-sm  overflow-hidden">
                                <div className="relative w-full aspect-square overflow-hidden">
                                    <Image 
                                        src={product.thumbnail || "/images/product/placeholder.png"} 
                                        alt={product.name} 
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105" 
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="flex-grow">
                                        <p className="text-sm font-semibold h-10 flex items-center justify-center">{product.name}</p>
                                        <p className="text-sm text-gray-600 mb-2">                  <ServerPriceDisplay amount={ product.price} />
 </p>
                                    </div>
                                    <button
                                        onClick={() => addItem({ ...product, id: product._id })}
                                        className="w-full bg-black text-white text-xs py-2 mt-2 font-bold tracking-wider hover:bg-gray-800 transition-colors"
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- Your Cart Section --- */}
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-medium tracking-wider text-gray-800">YOUR CART</h2>
                    </div>
                    
                    <div className="bg-white p-6 md:p-10">
                        {/* --- Cart Headers --- */}
                        <div className="hidden md:grid grid-cols-12 gap-4 text-left text-xs font-semibold text-gray-500 uppercase pb-4 border-b">
                            <div className="col-span-5">Selected Products</div>
                            <div className="col-span-2">Product Name</div>
                            <div className="col-span-2">Product Code</div>
                            <div className="col-span-2">Quantity</div>
                            <div className="col-span-1 text-right">Amount</div>
                        </div>

                        {/* --- Cart Items --- */}
                        <div className="divide-y divide-gray-200">
                           {items.map((item) => (
                               <div key={item.id} className="grid grid-cols-12 gap-4 py-6 items-center">
                                   {/* Product Image & Details */}
                                   <div className="col-span-12 md:col-span-5 flex items-start ">
                                       <div className="w-24 h-24 flex-shrink-0">
                                           <Image src={item.thumbnail || "/images/product/placeholder.png"} alt={item.name} width={96} height={96} className="w-full h-full object-cover" />
                                       </div>
                                       
                                   </div>
                                   
                                   {/* Product Name & Attributes */}
                                   <div className="col-span-12 md:col-span-2 text-sm text-gray-600">
                                       <p className="font-semibold text-gray-800">{item.name}</p>
                                       <div className="mt-1 text-xs">
                                           <p>Included:</p>
                                           <p>Size: {item.size || 'Standard medium'}</p>
                                           <p>Color: {item.color || 'Pink Rose'}</p>
                                           <p>Candle: {item.candle || '5 Candles (Pink)'}</p>
                                           <p>Gift Card: {item.giftCard || 'Birthday Card (Selected)'}</p>
                                       </div>
                                   </div>
                                   
                                   {/* Product Code */}
                                   <div className="col-span-6 md:col-span-2 text-sm font-mono text-gray-800">{item.sku || 'N/A'}</div>
                                   
                                   {/* Quantity Selector */}
                                   <div className="col-span-6 md:col-span-2 flex items-center space-x-3 border border-gray-300 px-2 py-1 w-fit">
                                       <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-black"><Minus size={16}/></button>
                                       <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                       <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-black"><Plus size={16}/></button>
                                   </div>
                                   
                                   {/* Amount & Remove */}
                                   <div className="col-span-12 md:col-span-1 flex md:flex-col items-center justify-between md:justify-start md:items-end mt-4 md:mt-0">
                                       <p className="font-bold text-gray-800">                  <ServerPriceDisplay amount={item.price} />
</p>
                                       <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 md:mt-4">
                                           <X size={20}/>
                                       </button>
                                   </div>
                               </div>
                           ))}
                        </div>
                        
                        {/* --- Grand Total & Checkout Button --- */}
                        <div className="mt-10 flex flex-col items-end space-y-4">
                            <div className="text-center">
                                <p className="text-sm text-gray-500 text-center">GRAND TOTAL AMOUNT</p>
                                <p className="text-5xl font-bold text-gray-800 text-center"> <ServerPriceDisplay amount={cartTotal} /></p>
                            </div>
                            <Link href="/checkout" className="w-full sm:w-auto text-center px-10 py-3 bg-[#1C94A4] text-white font-bold tracking-wider hover:bg-[#187a87] transition-colors">
                                    PROCEED TO PAYMENT
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;

// This function runs at build time on the server.
export async function getStaticProps() {
    try {
      // Fetch all required data in parallel for performance
      const [ categoriesRes, bannersRes, addonsRes, addonsProductsRes] = await Promise.all([
        axiosInstance.get("/categories?status=active").catch(e => { console.error('Categories fetch failed:', e.message); return null; }),
        axiosInstance.get("/banners?status=active").catch(e => { console.error('Banners fetch failed:', e.message); return null; }),
        axiosInstance.get("/addons?status=active").catch(e => { console.error('Addons fetch failed:', e.message); return null; }),
        axiosInstance.get("/addons-product?status=active").catch(e => { console.error('Addon Products fetch failed:', e.message); return null; }),
      ]);
  
      return {
        props: {
          categories: categoriesRes?.data?.categories || [],
          banners: bannersRes?.data?.banners || [],
          addons: addonsRes?.data?.addons || [],
          addonsProducts: addonsProductsRes?.data?.products || [],
        },
        revalidate: 3600, 
      };
    } catch (error) {
      console.error("Error in getStaticProps for Cart Page:", error);
      return {
        props: {
          categories: [],
          banners: [],
          addons: [],
          addonsProducts: [],
        },
      };
    }
  }

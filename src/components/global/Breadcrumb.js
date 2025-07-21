// components/global/Breadcrumb.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

// Define custom breadcrumb trails for specific pages
const customPaths = {
  '/cart-listing-page': [
    { label: 'Product Category Listing', href: '/category' },
    { label: 'Product Details Page', href: '/products' }, // This is a placeholder as it's not a real page
    { label: 'Cart Listing Page', href: '/cart-listing-page' },
  ],
  // You can add other custom paths here, for example:
  // '/checkout': [
  //   { label: 'Cart', href: '/cart-listing-page' },
  //   { label: 'Checkout', href: '/checkout' },
  // ],
};


const Breadcrumb = () => {
  const pathname = usePathname();
  const customBreadcrumbLinks = customPaths[pathname];

  let breadcrumbs = [];

  if (customBreadcrumbLinks) {
    // If a custom path is defined for the current page, use it
    breadcrumbs = [
      { label: 'Home', href: '/' },
      ...customBreadcrumbLinks,
    ];
  } else {
    // Otherwise, generate the breadcrumb automatically from the URL
    const pathSegments = pathname.split('/').filter(segment => segment);
    
    // Don't show auto-generated breadcrumbs on the homepage
    if (pathSegments.length > 0) {
        breadcrumbs = [
            { label: 'Home', href: '/' },
            ...pathSegments.map((segment, index) => {
              const href = '/' + pathSegments.slice(0, index + 1).join('/');
              // Capitalize the first letter and replace dashes with spaces for display
              const label = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              return { label, href };
            })
        ];
    }
  }
  
  // If there are no breadcrumbs to show (e.g., on the homepage), render nothing
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 py-3 px-4 sm:px-8 lg:px-16 ">
      <ol className="max-w-7xl mx-auto flex items-center space-x-2 text-sm text-gray-500">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href + index} className="flex items-center">
            {/* Add separator for all items except the first one */}
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />}
            
            {/* The last item is not a link, it's the current page. Also handle non-clickable links */}
            {index === breadcrumbs.length - 1 || breadcrumb.href === '#' ? (
              <span className="font-semibold text-gray-700" aria-current="page">
                {breadcrumb.label}
              </span>
            ) : (
              <Link href={breadcrumb.href}>
                <span className="hover:text-gray-900 hover:underline transition-colors">
                  {breadcrumb.label}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

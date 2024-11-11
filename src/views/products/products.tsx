"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";

export const Products: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  // Opens the modal for a product and updates the URL with the product ID
  const handleOpenModal = useCallback(
    (product: Product) => {
      setSelectedProduct(product);
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", product.id.toString());
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Closes the modal and removes the product ID from the URL
  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    router.push("/products");
  }, [router]);

  // Syncs the selected product with the URL on page load and navigation
  useEffect(() => {
    const productId = searchParams.get("id");
    if (!productId) {
      // If No product ID in URL, clear state
      setSelectedProduct(null);
    } else {
      // Find and set product based on ID
      const product = PRODUCTS_DATA.find((p) => p.id.toString() === productId);
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [searchParams]);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

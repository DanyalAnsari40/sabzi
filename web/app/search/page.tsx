'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/navbar';
import { Footer } from '@/components/public/footer';
import { ProductCard } from '@/components/public/product-card';
import { EmptyState } from '@/components/public/empty-state';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { products, categories } from '@/lib/mock-data';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minStock, setMinStock] = useState(0);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(true);

  const certificationOptions = ['Organic', 'Non-GMO', 'Pasteurized', 'Free-Range', 'Fair Trade'];

  // Filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search query
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.categoryId);

      // Price range
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      // Stock filter
      const matchesStock = product.stock >= minStock;

      // Certifications
      const matchesCertifications =
        certifications.length === 0 ||
        certifications.some((cert) => product.certifications.includes(cert));

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesStock &&
        matchesCertifications
      );
    });
  }, [searchQuery, selectedCategories, priceRange, minStock, certifications]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'stock':
        return sorted.sort((a, b) => b.stock - a.stock);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const toggleCertification = (cert: string) => {
    setCertifications((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setMinStock(0);
    setCertifications([]);
    setSortBy('relevance');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Search Bar Section */}
        <section className="py-8 md:py-12 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 animate-fade-in-down">
              <h1 className="text-4xl font-bold text-foreground mb-2">Product Search</h1>
              <p className="text-foreground/60">Find the exact products you need with advanced filters</p>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <Input
                type="text"
                placeholder="Search by product name, description, origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 border-primary/30 focus:border-primary"
              />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden'} lg:block`}>
                <div className="flex items-center justify-between mb-4 lg:hidden">
                  <h3 className="font-bold text-foreground">Filters</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Reset Filters */}
                {(selectedCategories.length > 0 ||
                  priceRange[0] > 0 ||
                  priceRange[1] < 200 ||
                  minStock > 0 ||
                  certifications.length > 0) && (
                  <Button variant="outline" className="w-full" onClick={resetFilters}>
                    Reset All Filters
                  </Button>
                )}

                {/* Price Range */}
                <Card className="p-4 border-0">
                  <h3 className="font-bold text-foreground mb-4">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={500}
                    step={10}
                    className="mb-4"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground/60">₹{priceRange[0]}</span>
                    <span className="text-sm text-foreground/60">to</span>
                    <span className="text-sm text-foreground/60">₹{priceRange[1]}</span>
                  </div>
                </Card>

                {/* Categories */}
                <Card className="p-4 border-0">
                  <h3 className="font-bold text-foreground mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                          checked={selectedCategories.includes(cat.id)}
                          onCheckedChange={() => toggleCategory(cat.id)}
                        />
                        <span className="text-sm">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </Card>

                {/* Stock Availability */}
                <Card className="p-4 border-0">
                  <h3 className="font-bold text-foreground mb-4">Stock</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'All', value: 0 },
                      { label: 'In Stock (50+)', value: 50 },
                      { label: 'In Stock (100+)', value: 100 },
                      { label: 'In Stock (500+)', value: 500 },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                          checked={minStock === option.value}
                          onCheckedChange={() => setMinStock(option.value)}
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </Card>

                {/* Certifications */}
                <Card className="p-4 border-0">
                  <h3 className="font-bold text-foreground mb-4">Certifications</h3>
                  <div className="space-y-3">
                    {certificationOptions.map((cert) => (
                      <label key={cert} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                          checked={certifications.includes(cert)}
                          onCheckedChange={() => toggleCertification(cert)}
                        />
                        <span className="text-sm">{cert}</span>
                      </label>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3 space-y-6">
                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-foreground/70 font-medium">
                    Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
                  </p>

                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden gap-2"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      Filters
                    </Button>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 text-sm border border-border rounded-lg bg-background"
                    >
                      <option value="relevance">Sort by: Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name: A-Z</option>
                      <option value="stock">Most In Stock</option>
                    </select>
                  </div>
                </div>

                {/* Products Grid */}
                {sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<Search className="w-12 h-12" />}
                    title="No Products Found"
                    description="Try adjusting your filters or search terms."
                    actionLabel="Reset Filters"
                    onAction={resetFilters}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

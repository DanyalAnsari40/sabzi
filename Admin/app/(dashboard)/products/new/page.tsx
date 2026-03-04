'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { categories } from '@/lib/mock-data';

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  unit: string;
  price: string;
  minOrderQuantity: string;
  stock: string;
  certifications: string[];
  origin: string;
  shelfLifeDays: string;
  sku: string;
}

const certificationOptions = ['Organic', 'Non-GMO', 'Pasteurized', 'Free-Range', 'Fair Trade', 'Kosher'];

export default function NewProductPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    unit: 'kg',
    price: '',
    minOrderQuantity: '',
    stock: '',
    certifications: [],
    origin: '',
    shelfLifeDays: '',
    sku: '',
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stock || parseInt(formData.stock) < 0) newErrors.stock = 'Valid stock quantity is required';
    if (!formData.minOrderQuantity || parseInt(formData.minOrderQuantity) <= 0)
      newErrors.minOrderQuantity = 'Minimum order quantity must be greater than 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/products');
      }, 2000);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleCertificationChange = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert],
    }));
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/products">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Product</h1>
          <p className="text-foreground/60">Create and configure a new product for your catalog</p>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert className="border-green-500/50 bg-green-50">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Product created successfully! Redirecting to products list...
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card className="p-6">
              {/* Product Name */}
              <div className="space-y-2 mb-6">
                <Label htmlFor="name" className="font-semibold">
                  Product Name *
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Organic Apples"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              {/* Category */}
              <div className="space-y-2 mb-6">
                <Label htmlFor="category" className="font-semibold">
                  Category *
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger id="category" className={errors.category ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="font-semibold">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Detailed product description..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`min-h-32 ${errors.description ? 'border-destructive' : ''}`}
                />
                {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
              </div>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <Card className="p-6 space-y-6">
              {/* SKU */}
              <div className="space-y-2">
                <Label htmlFor="sku" className="font-semibold">
                  SKU
                </Label>
                <Input
                  id="sku"
                  placeholder="e.g., APPLE-001"
                  value={formData.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Unit */}
                <div className="space-y-2">
                  <Label htmlFor="unit" className="font-semibold">
                    Unit of Measurement
                  </Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="g">Gram (g)</SelectItem>
                      <SelectItem value="L">Liter (L)</SelectItem>
                      <SelectItem value="box">Box</SelectItem>
                      <SelectItem value="unit">Unit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="font-semibold">
                    Price per Unit (₹) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className={errors.price ? 'border-destructive' : ''}
                  />
                  {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stock */}
                <div className="space-y-2">
                  <Label htmlFor="stock" className="font-semibold">
                    Current Stock *
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    className={errors.stock ? 'border-destructive' : ''}
                  />
                  {errors.stock && <p className="text-xs text-destructive">{errors.stock}</p>}
                </div>

                {/* Min Order */}
                <div className="space-y-2">
                  <Label htmlFor="minOrderQuantity" className="font-semibold">
                    Minimum Order Quantity *
                  </Label>
                  <Input
                    id="minOrderQuantity"
                    type="number"
                    min="1"
                    placeholder="1"
                    value={formData.minOrderQuantity}
                    onChange={(e) => handleInputChange('minOrderQuantity', e.target.value)}
                    className={errors.minOrderQuantity ? 'border-destructive' : ''}
                  />
                  {errors.minOrderQuantity && <p className="text-xs text-destructive">{errors.minOrderQuantity}</p>}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <Card className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Origin */}
                <div className="space-y-2">
                  <Label htmlFor="origin" className="font-semibold">
                    Country of Origin
                  </Label>
                  <Input
                    id="origin"
                    placeholder="e.g., India"
                    value={formData.origin}
                    onChange={(e) => handleInputChange('origin', e.target.value)}
                  />
                </div>

                {/* Shelf Life */}
                <div className="space-y-2">
                  <Label htmlFor="shelfLifeDays" className="font-semibold">
                    Shelf Life (Days)
                  </Label>
                  <Input
                    id="shelfLifeDays"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.shelfLifeDays}
                    onChange={(e) => handleInputChange('shelfLifeDays', e.target.value)}
                  />
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-3">
                <Label className="font-semibold">Certifications</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {certificationOptions.map((cert) => (
                    <label key={cert} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={formData.certifications.includes(cert)}
                        onCheckedChange={() => handleCertificationChange(cert)}
                      />
                      <span className="text-sm">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex gap-4 pt-6">
          <Button type="submit" disabled={isLoading} className="gap-2 bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4" />
            {isLoading ? 'Creating...' : 'Create Product'}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/products">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

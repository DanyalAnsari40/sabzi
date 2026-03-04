"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { products, requestsForQuote } from "@/lib/mock-data";
import { Plus, Trash2, Check } from "lucide-react";

interface RFQItemLocal {
  productId: string;
  quantity: number;
  unit: string;
}

export default function RequestQuotePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  // Initial item from URL params if coming from product detail
  const initialProductId = searchParams.get("product");
  const initialQuantity = searchParams.get("quantity");
  const initialUnit = searchParams.get("unit");

  const initialItems: RFQItemLocal[] = initialProductId
    ? [{ productId: initialProductId, quantity: parseInt(initialQuantity || "1"), unit: initialUnit || "kg" }]
    : [];

  const [items, setItems] = useState<RFQItemLocal[]>(initialItems);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    notes: "",
  });

  const handleAddItem = () => {
    if (products.length > 0) {
      setItems([
        ...items,
        { productId: products[0].id, quantity: 10, unit: "kg" },
      ]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (items.length === 0) {
      alert("Please add at least one product");
      return;
    }

    if (!formData.companyName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    // In a real app, this would send to backend
    // For now, we'll show success and create a local RFQ
    console.log("RFQ Submitted:", {
      items,
      ...formData,
    });

    setSubmitted(true);
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-12 text-center max-w-md w-full mx-4 border-primary/30 bg-green-50">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Quote Request Submitted
            </h2>
            <p className="text-foreground/60 mb-6">
              Thank you! We will review your request and send you a quote within 24 hours.
            </p>
            <Button asChild className="w-full">
              <a href="/">Return to Home</a>
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-12 md:py-16 bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Request a Quote
            </h1>
            <p className="text-lg text-foreground/60">
              Get personalized pricing for your bulk order. Fill out the form below and our team will contact you shortly.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Items Section */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Products
                </h2>

                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-foreground/60 mb-4">
                      No products added yet
                    </p>
                    <Button
                      type="button"
                      onClick={handleAddItem}
                      variant="outline"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    {items.map((item, index) => {
                      const product = products.find((p) => p.id === item.productId);
                      return (
                        <Card key={index} className="p-4 bg-muted/30">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div>
                              <label className="text-sm font-semibold text-foreground block mb-2">
                                Product
                              </label>
                              <select
                                value={item.productId}
                                onChange={(e) =>
                                  handleItemChange(index, "productId", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-border rounded-md bg-background"
                              >
                                {products.map((p) => (
                                  <option key={p.id} value={p.id}>
                                    {p.name} - ₹{p.price}/{p.unit}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="text-sm font-semibold text-foreground block mb-2">
                                Quantity
                              </label>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "quantity",
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                min={product?.minOrderQuantity || 1}
                              />
                            </div>

                            <div>
                              <label className="text-sm font-semibold text-foreground block mb-2">
                                Unit
                              </label>
                              <Input
                                type="text"
                                value={item.unit}
                                disabled
                                className="bg-muted"
                              />
                            </div>

                            <div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => handleRemoveItem(index)}
                                className="w-full"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          {product && (
                            <p className="text-xs text-foreground/50 mt-2">
                              Min order: {product.minOrderQuantity} {product.unit}
                            </p>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handleAddItem}
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Product
                </Button>
              </Card>

              {/* Company Information */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Company Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                      Company Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) =>
                        handleFormChange("companyName", e.target.value)
                      }
                      placeholder="Your company name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                      Contact Person *
                    </label>
                    <Input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        handleFormChange("contactPerson", e.target.value)
                      }
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleFormChange("email", e.target.value)
                        }
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-foreground block mb-2">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleFormChange("phone", e.target.value)
                        }
                        placeholder="+1-555-0000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                      Delivery Address *
                    </label>
                    <Textarea
                      value={formData.deliveryAddress}
                      onChange={(e) =>
                        handleFormChange("deliveryAddress", e.target.value)
                      }
                      placeholder="Street address, city, state, zip"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground block mb-2">
                      Special Notes
                    </label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) =>
                        handleFormChange("notes", e.target.value)
                      }
                      placeholder="Any special requirements or notes..."
                      rows={3}
                    />
                  </div>
                </div>
              </Card>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Submit Quote Request
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

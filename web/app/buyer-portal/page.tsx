'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/public/navbar';
import { Footer } from '@/components/public/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Clock, CheckCircle, AlertCircle, Download, MessageSquare, Plus } from 'lucide-react';

export default function BuyerPortal() {
  const [activeTab, setActiveTab] = useState('orders');

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-03-01',
      status: 'delivered',
      total: 45000,
      items: 3,
      deliveryDate: '2024-03-05',
    },
    {
      id: 'ORD-002',
      date: '2024-02-28',
      status: 'in-transit',
      total: 32500,
      items: 2,
      deliveryDate: '2024-03-04',
    },
    {
      id: 'ORD-003',
      date: '2024-02-25',
      status: 'pending',
      total: 28000,
      items: 4,
      deliveryDate: '2024-03-02',
    },
  ];

  const quotes = [
    {
      id: 'QUOTE-001',
      date: '2024-03-02',
      status: 'quoted',
      items: 5,
      validUntil: '2024-03-16',
      total: 85000,
    },
    {
      id: 'QUOTE-002',
      date: '2024-02-28',
      status: 'expired',
      items: 3,
      validUntil: '2024-02-28',
      total: 42000,
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      delivered: 'bg-green-100 text-green-700',
      'in-transit': 'bg-blue-100 text-blue-700',
      pending: 'bg-orange-100 text-orange-700',
      quoted: 'bg-purple-100 text-purple-700',
      expired: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      delivered: 'Delivered',
      'in-transit': 'In Transit',
      pending: 'Pending',
      quoted: 'Quoted',
      expired: 'Expired',
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in-down">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Buyer Portal</h1>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                Manage your orders, track shipments, and request quotes all in one place
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: Package, label: 'Total Orders', value: '24', color: 'text-blue-600' },
                { icon: Clock, label: 'In Transit', value: '3', color: 'text-orange-600' },
                { icon: CheckCircle, label: 'Delivered', value: '20', color: 'text-green-600' },
                { icon: MessageSquare, label: 'Active Quotes', value: '5', color: 'text-purple-600' },
              ].map((stat, idx) => (
                <Card key={idx} className="p-6 border-0 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gray-100 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tabs Content */}
        <section className="py-12 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 lg:w-auto mb-8">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="quotes">Quotes</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Your Orders</h2>
                  <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
                    <Link href="/categories">
                      <Plus className="w-4 h-4" />
                      New Order
                    </Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-6 border-0 hover:shadow-lg transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Order ID</p>
                          <p className="font-bold text-foreground">{order.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Date</p>
                          <p className="font-medium text-foreground">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Items</p>
                          <p className="font-medium text-foreground">{order.items} products</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Status</p>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                        <div className="flex items-end justify-between md:flex-col">
                          <p className="text-lg font-bold text-primary">₹{order.total.toLocaleString()}</p>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Download className="w-4 h-4" />
                            Invoice
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Quotes Tab */}
              <TabsContent value="quotes" className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Quote Requests</h2>
                  <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
                    <Link href="/request-quote">
                      <Plus className="w-4 h-4" />
                      Request Quote
                    </Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <Card key={quote.id} className="p-6 border-0 hover:shadow-lg transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Quote ID</p>
                          <p className="font-bold text-foreground">{quote.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Date</p>
                          <p className="font-medium text-foreground">{new Date(quote.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Items</p>
                          <p className="font-medium text-foreground">{quote.items} products</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-1">Status</p>
                          <Badge className={getStatusColor(quote.status)}>
                            {getStatusLabel(quote.status)}
                          </Badge>
                        </div>
                        <div className="flex items-end justify-between md:flex-col">
                          <p className="text-lg font-bold text-primary">₹{quote.total.toLocaleString()}</p>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Account Settings</h2>

                <Card className="p-6 border-0">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Company Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-foreground/60 mb-1">Company Name</p>
                        <p className="font-medium text-foreground">Premium Hotels Ltd</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60 mb-1">Email</p>
                        <p className="font-medium text-foreground">orders@premiumhotels.com</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60 mb-1">Phone</p>
                        <p className="font-medium text-foreground">+91 98765 43210</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60 mb-1">GST Number</p>
                        <p className="font-medium text-foreground">27AABCS1234H1Z0</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full md:w-auto">
                      Edit Information
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 border-0">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Billing Address</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-foreground">Premium Hotels Ltd</p>
                    <p className="text-foreground">123 Business Street</p>
                    <p className="text-foreground">Mumbai, Maharashtra 400001</p>
                    <p className="text-foreground">India</p>
                  </div>
                  <Button variant="outline">Edit Address</Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

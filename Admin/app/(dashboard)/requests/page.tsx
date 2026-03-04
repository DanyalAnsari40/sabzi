"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requestsForQuote, getProductById } from "@/lib/mock-data";
import { RequestForQuote } from "@/lib/types";
import { Search, Eye, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function AdminRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRFQ, setSelectedRFQ] = useState<RequestForQuote | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [quoteNotes, setQuoteNotes] = useState("");

  const filteredRFQs = requestsForQuote.filter((r) =>
    r.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    reviewed: "bg-blue-100 text-blue-800",
    quoted: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
  };

  const handleViewDetails = (rfq: RequestForQuote) => {
    setSelectedRFQ(rfq);
    setDetailsOpen(true);
  };

  const handleCreateQuote = (rfq: RequestForQuote) => {
    setSelectedRFQ(rfq);
    setQuoteDialogOpen(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">RFQ Requests</h1>
        <p className="text-foreground/60">Manage customer quote requests</p>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-foreground/50" />
          <Input
            type="text"
            placeholder="Search by company or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-0"
          />
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRFQs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-foreground/60">No requests found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRFQs.map((rfq) => (
                  <TableRow key={rfq.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{rfq.companyName}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{rfq.contactPerson}</p>
                        <p className="text-xs text-foreground/60">{rfq.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{rfq.items.length}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${statusColors[rfq.status]} text-xs`}
                        variant="outline"
                      >
                        {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-foreground/60">
                      {new Date(rfq.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(rfq)}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {rfq.status !== "completed" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCreateQuote(rfq)}
                            title="Create Quote"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Details Dialog */}
      {selectedRFQ && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>RFQ Request Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Company Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Company</p>
                  <p className="font-semibold text-foreground">
                    {selectedRFQ.companyName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Contact Person</p>
                  <p className="font-semibold text-foreground">
                    {selectedRFQ.contactPerson}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Email</p>
                  <p className="font-semibold text-foreground">{selectedRFQ.email}</p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Phone</p>
                  <p className="font-semibold text-foreground">{selectedRFQ.phone}</p>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <p className="text-sm text-foreground/60 mb-1">Delivery Address</p>
                <p className="font-semibold text-foreground">
                  {selectedRFQ.deliveryAddress}
                </p>
              </div>

              {/* Items */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">Items</p>
                <div className="space-y-2">
                  {selectedRFQ.items.map((item, i) => {
                    const product = getProductById(item.productId);
                    return (
                      <div
                        key={i}
                        className="p-3 bg-muted rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {product?.name}
                          </p>
                          <p className="text-sm text-foreground/60">
                            {item.quantity} {item.unit}
                          </p>
                        </div>
                        {product && (
                          <p className="text-sm font-semibold text-primary">
                            ₹{(product.price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              {selectedRFQ.notes && (
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Notes</p>
                  <p className="text-foreground">{selectedRFQ.notes}</p>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                setDetailsOpen(false);
                handleCreateQuote(selectedRFQ);
              }}>
                Create Quote
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Quote Dialog */}
      {selectedRFQ && (
        <Dialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Quote for {selectedRFQ.companyName}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">
                  Quote Items
                </p>
                <div className="space-y-2">
                  {selectedRFQ.items.map((item, i) => {
                    const product = getProductById(item.productId);
                    return (
                      <div
                        key={i}
                        className="p-3 bg-muted rounded-lg"
                      >
                        <div className="flex justify-between mb-2">
                          <p className="font-medium text-foreground">
                            {product?.name}
                          </p>
                          <p className="text-sm text-primary font-semibold">
                            ₹{product?.price}/{product?.unit}
                          </p>
                        </div>
                        <div className="flex justify-between text-sm text-foreground/60">
                          <span>Quantity: {item.quantity} {item.unit}</span>
                          <span className="font-medium text-foreground">
                            ₹{product ? (product.price * item.quantity).toFixed(2) : 0}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Additional Notes for Customer
                </label>
                <Textarea
                  placeholder="E.g., delivery date, special conditions, discounts..."
                  value={quoteNotes}
                  onChange={(e) => setQuoteNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setQuoteDialogOpen(false);
                  setQuoteNotes("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Quote created for", selectedRFQ.id);
                  setQuoteDialogOpen(false);
                  setQuoteNotes("");
                }}
              >
                Send Quote
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

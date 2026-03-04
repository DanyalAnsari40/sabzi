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
import { inquiries } from "@/lib/mock-data";
import { Inquiry } from "@/lib/types";
import { Search, Eye, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function AdminInquiriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const filteredInquiries = inquiries.filter((i) =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors = {
    new: "bg-red-100 text-red-800",
    read: "bg-blue-100 text-blue-800",
    replied: "bg-green-100 text-green-800",
  };

  const handleViewDetails = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setDetailsOpen(true);
  };

  const handleReply = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setReplyOpen(true);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inquiries</h1>
        <p className="text-foreground/60">Manage customer inquiries and messages</p>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-foreground/50" />
          <Input
            type="text"
            placeholder="Search by name or email..."
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-foreground/60">No inquiries found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <TableRow key={inquiry.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{inquiry.name}</TableCell>
                    <TableCell className="text-sm">{inquiry.email}</TableCell>
                    <TableCell className="text-sm">{inquiry.subject}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${statusColors[inquiry.status]} text-xs`}
                        variant="outline"
                      >
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-foreground/60">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(inquiry)}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
      {selectedInquiry && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Inquiry Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Name</p>
                  <p className="font-semibold text-foreground">
                    {selectedInquiry.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Status</p>
                  <Badge className={`${statusColors[selectedInquiry.status]}`}>
                    {selectedInquiry.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-foreground/60 mb-1">Email</p>
                <p className="font-semibold text-foreground">
                  {selectedInquiry.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-foreground/60 mb-1">Phone</p>
                <p className="font-semibold text-foreground">
                  {selectedInquiry.phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-foreground/60 mb-1">Subject</p>
                <p className="font-semibold text-foreground">
                  {selectedInquiry.subject}
                </p>
              </div>

              <div>
                <p className="text-sm text-foreground/60 mb-2">Message</p>
                <Card className="p-4 bg-muted/30">
                  <p className="text-foreground">{selectedInquiry.message}</p>
                </Card>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setDetailsOpen(false);
                  handleReply(selectedInquiry);
                }}
              >
                Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reply Dialog */}
      {selectedInquiry && (
        <Dialog open={replyOpen} onOpenChange={setReplyOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reply to {selectedInquiry.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-foreground/60 mb-2">To:</p>
                <p className="font-semibold text-foreground">
                  {selectedInquiry.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-foreground/60 mb-2">Subject:</p>
                <p className="font-semibold text-foreground">
                  Re: {selectedInquiry.subject}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">
                  Your Reply
                </label>
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={6}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setReplyOpen(false);
                  setReplyMessage("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Reply sent to", selectedInquiry.email);
                  setReplyOpen(false);
                  setReplyMessage("");
                }}
              >
                Send Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

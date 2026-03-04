"use client";

import { useState } from "react";
import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { inquiries } from "@/lib/mock-data";
import { Phone, Mail, MapPin, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields");
      return;
    }

    // In a real app, this would send to backend
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-12 md:py-16 bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-foreground/60">
              Have questions? We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Phone
                      </h3>
                      <p className="text-foreground/60">+1 (555) 123-4567</p>
                      <p className="text-sm text-foreground/50">
                        Mon-Fri, 9AM-6PM IST
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Email
                      </h3>
                      <p className="text-foreground/60">sales@wholegrains.com</p>
                      <p className="text-sm text-foreground/50">
                        We respond within 24 hours
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Address
                      </h3>
                      <p className="text-foreground/60">
                        123 Wholesale Avenue
                        <br />
                        Commerce City, ST 12345
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Send us a Message
                  </h2>

                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-foreground/60">
                        Thank you for contacting us. We'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">
                          Name *
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Your name"
                          required
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
                              handleChange("email", e.target.value)
                            }
                            placeholder="your@email.com"
                            required
                          />
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-foreground block mb-2">
                            Phone
                          </label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleChange("phone", e.target.value)
                            }
                            placeholder="+1-555-0000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">
                          Subject
                        </label>
                        <Input
                          type="text"
                          value={formData.subject}
                          onChange={(e) =>
                            handleChange("subject", e.target.value)
                          }
                          placeholder="How can we help?"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-foreground block mb-2">
                          Message *
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) =>
                            handleChange("message", e.target.value)
                          }
                          placeholder="Tell us more..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

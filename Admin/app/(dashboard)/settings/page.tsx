"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Lock, Bell, Shield } from "lucide-react";

export default function AdminSettingsPage() {
  const [businessSettings, setBusinessSettings] = useState({
    companyName: "WholeGrains Co",
    email: "sales@wholegrains.com",
    phone: "+1-555-123-4567",
    address: "123 Wholesale Avenue, Commerce City, ST 12345",
    about: "Premium wholesale grocery solutions for businesses",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: 90,
    sessionTimeout: 30,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    rfqNotifications: true,
    inquiryNotifications: true,
    orderNotifications: true,
    emailDigest: "daily",
  });

  const [saved, setSaved] = useState(false);

  const handleBusinessChange = (field: string, value: string) => {
    setBusinessSettings({ ...businessSettings, [field]: value });
    setSaved(false);
  };

  const handleSecurityChange = (field: string, value: any) => {
    setSecuritySettings({ ...securitySettings, [field]: value });
    setSaved(false);
  };

  const handleNotificationChange = (field: string, value: any) => {
    setNotificationSettings({ ...notificationSettings, [field]: value });
    setSaved(false);
  };

  const handleSave = () => {
    console.log("Settings saved:", {
      businessSettings,
      securitySettings,
      notificationSettings,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-foreground/60">Manage your business settings and preferences</p>
      </div>

      {/* Business Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Business Information
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={businessSettings.companyName}
              onChange={(e) => handleBusinessChange("companyName", e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={businessSettings.email}
                onChange={(e) => handleBusinessChange("email", e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={businessSettings.phone}
                onChange={(e) => handleBusinessChange("phone", e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={businessSettings.address}
              onChange={(e) => handleBusinessChange("address", e.target.value)}
              rows={2}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              value={businessSettings.about}
              onChange={(e) => handleBusinessChange("about", e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Security
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-foreground/60">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={securitySettings.twoFactorAuth}
              onCheckedChange={(checked) =>
                handleSecurityChange("twoFactorAuth", checked)
              }
            />
          </div>

          <div className="border-t border-border pt-6">
            <label className="text-sm font-semibold text-foreground block mb-2">
              Password Expiry (days)
            </label>
            <Input
              type="number"
              value={securitySettings.passwordExpiry}
              onChange={(e) =>
                handleSecurityChange(
                  "passwordExpiry",
                  parseInt(e.target.value) || 0
                )
              }
              min="0"
            />
            <p className="text-xs text-foreground/60 mt-2">
              Set to 0 to disable password expiry
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <label className="text-sm font-semibold text-foreground block mb-2">
              Session Timeout (minutes)
            </label>
            <Input
              type="number"
              value={securitySettings.sessionTimeout}
              onChange={(e) =>
                handleSecurityChange(
                  "sessionTimeout",
                  parseInt(e.target.value) || 0
                )
              }
              min="5"
            />
            <p className="text-xs text-foreground/60 mt-2">
              Users will be logged out after this period of inactivity
            </p>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">
            Notifications
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">RFQ Notifications</p>
              <p className="text-sm text-foreground/60">
                Get notified when new quote requests arrive
              </p>
            </div>
            <Switch
              checked={notificationSettings.rfqNotifications}
              onCheckedChange={(checked) =>
                handleNotificationChange("rfqNotifications", checked)
              }
            />
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  Inquiry Notifications
                </p>
                <p className="text-sm text-foreground/60">
                  Get notified about new customer inquiries
                </p>
              </div>
              <Switch
                checked={notificationSettings.inquiryNotifications}
                onCheckedChange={(checked) =>
                  handleNotificationChange("inquiryNotifications", checked)
                }
              />
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">
                  Order Notifications
                </p>
                <p className="text-sm text-foreground/60">
                  Get notified about new orders
                </p>
              </div>
              <Switch
                checked={notificationSettings.orderNotifications}
                onCheckedChange={(checked) =>
                  handleNotificationChange("orderNotifications", checked)
                }
              />
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <label className="text-sm font-semibold text-foreground block mb-2">
              Email Digest
            </label>
            <select
              value={notificationSettings.emailDigest}
              onChange={(e) =>
                handleNotificationChange("emailDigest", e.target.value)
              }
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="immediately">Immediately</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <Button
          onClick={handleSave}
          className="gap-2"
          disabled={saved}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : "Save Settings"}
        </Button>
        {saved && (
          <p className="text-sm text-green-600 font-medium">
            All changes have been saved
          </p>
        )}
      </div>
    </div>
  );
}

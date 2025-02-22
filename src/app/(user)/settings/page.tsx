import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Shield, CreditCard, Lock, LogOut } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive emails about your account activity
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Change Password</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Update your password to keep your account secure
                </p>
                <div className="space-y-4">
                  <Input type="password" placeholder="Current Password" />
                  <Input type="password" placeholder="New Password" />
                  <Input type="password" placeholder="Confirm New Password" />
                  <Button variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Methods
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Manage Payment Methods</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Add or remove payment methods
                </p>
                <div className="space-y-4">
                  <Input placeholder="Card number" />
                  <Button variant="outline">Add Payment Method</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-600 flex items-center">
              <LogOut className="h-5 w-5 mr-2" />
              Account Actions
            </h2>
            <div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

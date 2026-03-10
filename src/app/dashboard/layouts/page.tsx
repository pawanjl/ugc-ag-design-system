"use client";

import { useState } from "react";
import { Compass, Book, Home, Settings } from "lucide-react";
import { PageBreadcrumb } from "@/components/navigation/PageBreadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MobileBottomNav } from "@/components/navigation/MobileBottomNav";

export default function LayoutsShowcasePage() {
  const [activeTab, setActiveTab] = useState("horizontal");

  const sampleBreadcrumb = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Layouts", href: "/dashboard/layouts" },
    { label: "Navigation Elements" },
  ];

  return (
    <div className="flex-1 space-y-12 p-8 pt-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col space-y-4">
        <PageBreadcrumb items={sampleBreadcrumb} />
        <h2 className="text-3xl font-bold tracking-tight">Layout & Navigation Blocks</h2>
        <p className="text-muted-foreground">
          Premium navigation elements integrating ShadCN with Framer Motion.
        </p>
      </div>

      {/* Tabs Showcase */}
      <section className="space-y-6">
        <div className="border-b border-border pb-4">
          <h3 className="text-xl font-semibold tracking-tight">Tab Navigation Variants</h3>
          <p className="text-sm text-muted-foreground">Horizontal default, subtle pill shapes, and classic underline styles.</p>
        </div>

        <div className="grid gap-8">
          {/* Default / Horizontal Tabs */}
          <div className="p-6 border border-border rounded-xl bg-card space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Default Horizontal Tabs</h4>
            <Tabs defaultValue="account" className="w-full max-w-md">
              <TabsList className="w-full grid-cols-2">
                <TabsTrigger value="account">Account Settings</TabsTrigger>
                <TabsTrigger value="password">Password & Security</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Pill Tabs */}
          <div className="p-6 border border-border rounded-xl bg-card space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Pill Style Tabs</h4>
            <Tabs defaultValue="all" className="w-full">
              <TabsList variant="pill">
                <TabsTrigger value="all">All View</TabsTrigger>
                <TabsTrigger value="recent">Recently Added</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Underline Tabs */}
          <div className="p-6 border border-border rounded-xl bg-card space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Underline Style Tabs</h4>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList variant="underline">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Mobile Nav Context Showcase */}
      <section className="space-y-6">
        <div className="border-b border-border pb-4">
          <h3 className="text-xl font-semibold tracking-tight">Mobile Bottom Navigation</h3>
          <p className="text-sm text-muted-foreground">Resize your browser window strictly to mobile size to see the floating capsule appear at the bottom.</p>
        </div>
        
        <div className="h-[200px] rounded-xl border border-dashed border-border/60 bg-muted/20 flex items-center justify-center p-6 text-center">
            <div className="max-w-md space-y-2">
                <h4 className="font-medium text-foreground">Interactive on Mobile</h4>
                <p className="text-sm text-muted-foreground">
                    The MobileBottomNav component is fixed to the viewport on mobile devices (`md:hidden`) and smartly auto-hides when scrolling down to maximize reading space.
                </p>
            </div>
        </div>
      </section>
    </div>
  );
}

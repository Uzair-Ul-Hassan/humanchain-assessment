"use client";

import { useState, useEffect } from "react";

import type { Incident, Severity } from "@/types/incident";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IncidentList } from "./incident-list";
import { NewIncidentForm } from "./new-incident-form";

const initialIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description:
      "Algorithm consistently favored certain demographics in content recommendations, leading to reinforcement of stereotypes and limited exposure to diverse perspectives for affected users.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description:
      "LLM provided incorrect safety procedure information when queried about emergency protocols, potentially endangering users who might have followed the fabricated instructions in a real emergency.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description:
      "Chatbot inadvertently exposed non-sensitive user metadata in responses, including approximate location and device type. No personally identifiable information was compromised.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z",
  },
];

export const AISafetyIncidentDashboard = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [activeTab, setActiveTab] = useState<"incidents" | "report">(
    "incidents"
  );
  const [filteredIncidents, setFilteredIncidents] =
    useState<Incident[]>(incidents);
  const [severityFilter, setSeverityFilter] = useState<Severity | "All">("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Apply filters and sorting
  useEffect(() => {
    let result = [...incidents];

    // Apply severity filter
    if (severityFilter !== "All") {
      result = result.filter(
        (incident) => incident.severity === severityFilter
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredIncidents(result);
  }, [incidents, severityFilter, sortOrder]);

  // Add new incident
  const handleAddIncident = (
    incident: Omit<Incident, "id" | "reported_at">
  ) => {
    const newIncident: Incident = {
      ...incident,
      id: incidents.length + 1,
      reported_at: new Date().toISOString(),
    };

    setIncidents((prev) => [...prev, newIncident]);
    setActiveTab("incidents");
  };

  return (
    <div className="px-3 space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold">
            AI Safety Incident Dashboard
          </CardTitle>
          <CardDescription>
            Track, manage, and report AI safety incidents across your
            organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "incidents" | "report")
            }
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="incidents">Incidents</TabsTrigger>
                <TabsTrigger value="report">Report New Incident</TabsTrigger>
              </TabsList>

              {activeTab === "incidents" && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Select
                    value={severityFilter}
                    onValueChange={(value) =>
                      setSeverityFilter(value as Severity | "All")
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Severities</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={sortOrder}
                    onValueChange={(value) =>
                      setSortOrder(value as "newest" | "oldest")
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <TabsContent value="incidents">
              <IncidentList incidents={filteredIncidents} />
            </TabsContent>

            <TabsContent value="report">
              <NewIncidentForm onSubmit={handleAddIncident} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

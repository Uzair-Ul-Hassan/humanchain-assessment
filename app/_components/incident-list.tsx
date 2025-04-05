"use client";

import type { Incident } from "@/types/incident";

import { ReportedIncident } from "./reported-incident";

interface IncidentListProps {
  incidents: Incident[];
}

export const IncidentList = ({ incidents }: IncidentListProps) => {
  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <ReportedIncident key={incident.id} incident={incident} />
      ))}
    </div>
  );
};

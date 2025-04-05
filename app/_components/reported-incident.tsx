import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import type { Incident, Severity } from "@/types/incident";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getSeverityColor = (severity: Severity) => {
  switch (severity) {
    case "Low":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "High":
      return "bg-red-100 text-red-800 hover:bg-red-200";
  }
};

interface ReportedIncidentProps {
  incident: Incident;
}

export const ReportedIncident = ({ incident }: ReportedIncidentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card key={incident.id} className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{incident.title}</h3>
            <p className="text-sm text-muted-foreground">
              Reported: {formatDate(incident.reported_at)}
            </p>
          </div>
          <Badge
            className={`${getSeverityColor(incident.severity)} self-start`}
          >
            {incident.severity}
          </Badge>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pb-3 pt-0">
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="text-sm">{incident.description}</p>
          </div>
        </CardContent>
      )}

      <CardFooter className="pt-0 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-sm"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Hide Details
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              View Details
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground">ID: {incident.id}</p>
      </CardFooter>
    </Card>
  );
};

import { Link } from "react-router-dom";
import { Clock, Play, FileCode2, GitCommit, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sessions() {
  const sessions = [
    {
      id: "1",
      project: "saha-frontend",
      date: "Today, 2:30 PM",
      duration: "1h 45m",
      status: "active",
      summary: "Working on authentication flow and session tracking.",
      files: 3,
    },
    {
      id: "2",
      project: "api-gateway",
      date: "Yesterday, 10:15 AM",
      duration: "45m",
      status: "completed",
      summary: "Added rate limiting middleware to API routes.",
      files: 2,
    },
    {
      id: "3",
      project: "saha-frontend",
      date: "Yesterday, 9:00 AM",
      duration: "2h 10m",
      status: "completed",
      summary: "Initial setup of the dashboard layout and routing.",
      files: 5,
    },
    {
      id: "4",
      project: "context-analyzer",
      date: "Oct 24, 4:00 PM",
      duration: "3h 20m",
      status: "completed",
      summary: "Implemented AST parsing for Python files.",
      files: 4,
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Session History</h1>
          <p className="text-muted-foreground mt-1">
            Review your past work sessions and context summaries.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="border border-white/10 rounded-xl p-6 bg-card/40 backdrop-blur-xl hover:border-primary/30 transition-colors shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-mono font-semibold text-lg">
                    {session.project}
                  </h3>
                  {session.status === "active" && (
                    <span className="bg-emerald-500/10 text-emerald-500 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {session.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {session.duration}
                  </span>
                </div>
              </div>
              <Button
                variant={session.status === "active" ? "default" : "outline"}
                size="sm"
                asChild
              >
                <Link to={`/projects/${session.project}/session/current`}>
                  {session.status === "active" ? "Resume" : "View Context"}
                </Link>
              </Button>
            </div>

            <p className="text-sm text-foreground/80 mb-4">{session.summary}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t">
              <span className="flex items-center gap-1">
                <FileCode2 size={14} /> {session.files} files modified
              </span>
              <span className="flex items-center gap-1">
                <GitCommit size={14} /> 12 uncommitted changes
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

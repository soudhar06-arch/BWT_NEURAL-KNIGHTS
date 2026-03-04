import { Link } from "react-router-dom";
import {
  Clock,
  GitCommit,
  FileCode2,
  ArrowRight,
  Sparkles,
  Play,
  FolderGit2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, Developer
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what you missed since your last session.
          </p>
        </div>
        <Button className="gap-2">
          <Play size={16} />
          Start New Session
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Context Recovery Widget - Takes up 2 columns */}
        <Card className="md:col-span-2 border-primary/20 bg-primary/5 backdrop-blur-md shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Sparkles size={120} />
          </div>
          <CardHeader>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Sparkles size={20} />
              <span className="font-semibold text-sm tracking-wider uppercase">
                Context Recovery
              </span>
            </div>
            <CardTitle className="text-2xl">Where You Left Off</CardTitle>
            <CardDescription className="text-base text-foreground/80">
              You were working on the authentication flow in{" "}
              <span className="font-mono bg-background/50 px-1 py-0.5 rounded text-sm">
                saha-frontend
              </span>
              .
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <FileCode2 size={16} className="text-muted-foreground" />
                Key Files Modified
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span className="font-mono text-muted-foreground">
                    src/app/api/auth/route.ts
                  </span>
                  <span className="text-emerald-600 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    +45 lines
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-mono text-muted-foreground">
                    src/components/auth-form.tsx
                  </span>
                  <span className="text-emerald-600 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    +12 lines
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <GitCommit size={16} className="text-muted-foreground" />
                Uncommitted Changes
              </h4>
              <p className="text-sm text-muted-foreground">
                Implemented GitHub OAuth callback handler and session creation
                logic. The error handling for invalid tokens is partially
                complete.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full sm:w-auto gap-2">
              <Link to="/projects/saha-frontend/session/current">
                Restore Context & Resume <ArrowRight size={16} />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  project: "saha-frontend",
                  action: "Ended session",
                  time: "2 hours ago",
                  duration: "1h 45m",
                },
                {
                  project: "api-gateway",
                  action: "Committed changes",
                  time: "Yesterday",
                  duration: "45m",
                },
                {
                  project: "saha-frontend",
                  action: "Started session",
                  time: "Yesterday",
                  duration: "2h 10m",
                },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 bg-secondary p-2 rounded-full h-fit">
                    <Clock size={14} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                      {activity.project}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                      <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">
                        {activity.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-sm" asChild>
              <Link to="/sessions">View all history</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Active Projects
          </h2>
          <Button variant="outline" size="sm" asChild>
            <Link to="/projects">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "saha-frontend",
              desc: "Next.js App Router frontend for SAHA",
              updated: "2 hours ago",
              branch: "main",
            },
            {
              name: "api-gateway",
              desc: "Express.js API Gateway",
              updated: "Yesterday",
              branch: "feature/auth",
            },
            {
              name: "context-analyzer",
              desc: "Python service for code analysis",
              updated: "3 days ago",
              branch: "main",
            },
          ].map((project) => (
            <Link
              key={project.name}
              to={`/projects/${project.name}/session/current`}
            >
              <Card className="hover:border-primary/50 transition-colors cursor-pointer group h-full flex flex-col">
                <CardHeader className="pb-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FolderGit2
                        size={18}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                      <CardTitle className="text-base font-mono">
                        {project.name}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2 text-xs">
                    {project.desc}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 text-xs text-muted-foreground flex justify-between items-center border-t border-white/5 p-4 mt-auto bg-background/20 backdrop-blur-sm rounded-b-xl">
                  <span className="flex items-center gap-1">
                    <GitCommit size={12} /> {project.branch}
                  </span>
                  <span>Updated {project.updated}</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

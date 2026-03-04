import { Link } from "react-router-dom";
import { FolderGit2, GitCommit, Clock, MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Projects() {
  const projects = [
    {
      name: "saha-frontend",
      desc: "Next.js App Router frontend for SAHA",
      updated: "2 hours ago",
      branch: "main",
      language: "TypeScript",
    },
    {
      name: "api-gateway",
      desc: "Express.js API Gateway",
      updated: "Yesterday",
      branch: "feature/auth",
      language: "TypeScript",
    },
    {
      name: "context-analyzer",
      desc: "Python service for code analysis",
      updated: "3 days ago",
      branch: "main",
      language: "Python",
    },
    {
      name: "saha-docs",
      desc: "Documentation website",
      updated: "1 week ago",
      branch: "main",
      language: "Markdown",
    },
    {
      name: "legacy-dashboard",
      desc: "Old React dashboard",
      updated: "2 months ago",
      branch: "master",
      language: "JavaScript",
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your connected repositories.
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          Connect Repository
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Link
            key={project.name}
            to={`/projects/${project.name}/session/current`}
          >
            <Card className="hover:border-primary/50 transition-colors cursor-pointer group flex flex-col h-full">
              <CardHeader className="pb-3 flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FolderGit2
                      size={20}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                    <CardTitle className="text-lg font-mono">
                      {project.name}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 -mt-2 -mr-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreVertical size={16} />
                  </Button>
                </div>
                <CardDescription className="line-clamp-2 mt-2">
                  {project.desc}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0 text-xs text-muted-foreground flex justify-between items-center border-t border-white/5 p-4 mt-auto bg-background/20 backdrop-blur-sm rounded-b-xl">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {project.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitCommit size={12} /> {project.branch}
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {project.updated}
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

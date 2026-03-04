import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import {
  FileCode2,
  Folder,
  ChevronRight,
  ChevronDown,
  Sparkles,
  MessageSquare,
  Wand2,
  Play,
  ArrowLeft,
  Terminal,
  X,
  Loader2,
  Plus,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";

// Mock file tree
const initialFileTree = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "app",
        type: "folder",
        children: [
          {
            name: "api",
            type: "folder",
            children: [
              {
                name: "auth",
                type: "folder",
                children: [{ name: "route.ts", type: "file", modified: true }],
              },
            ],
          },
          { name: "layout.tsx", type: "file" },
          { name: "page.tsx", type: "file" },
        ],
      },
      {
        name: "components",
        type: "folder",
        children: [
          { name: "auth-form.tsx", type: "file", modified: true },
          {
            name: "ui",
            type: "folder",
            children: [{ name: "button.tsx", type: "file" }],
          },
        ],
      },
    ],
  },
  { name: "package.json", type: "file" },
  { name: "README.md", type: "file" },
];

const initialFileData: Record<
  string,
  { code: string; explanation: string; leftOff?: string; language: string }
> = {
  "src/app/api/auth/route.ts": {
    language: "typescript",
    code: `import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient();
    
    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // TODO: Initialize SAHA session tracking here
      // 1. Check if user exists in our DB
      // 2. Create new active session record
      // 3. Sync recent GitHub events
      
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    
    // Handle specific auth errors
    console.error('Auth error:', error.message);
    return NextResponse.redirect(
      new URL(\`/login?error=\${encodeURIComponent(error.message)}\`, request.url)
    );
  }

  return NextResponse.redirect(new URL('/login', request.url));
}`,
    explanation: `This file handles the OAuth callback from GitHub via Supabase Auth.

**Key Logic Flow:**
1. Extracts the \`code\` parameter from the URL.
2. Initializes the Supabase server client.
3. Exchanges the code for an active session.
4. On success, redirects to \`/dashboard\`.
5. On failure, redirects back to \`/login\` with an error message.`,
    leftOff: `You added the \`TODO\` comments to initialize SAHA session tracking after a successful login. The next step is to implement the database calls to create the user record and start the session timer.`,
  },
  "src/app/layout.tsx": {
    language: "typescript",
    code: `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SAHA - AI Context Recovery',
  description: 'AI Context Recovery Companion for developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}`,
    explanation: `The root layout component for the Next.js application. It sets up the HTML structure, global fonts (Inter), and metadata.`,
  },
  "src/app/page.tsx": {
    language: "typescript",
    code: `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
      </div>
    </main>
  )
}`,
    explanation: `The main landing page of the application.`,
  },
  "src/components/auth-form.tsx": {
    language: "typescript",
    code: `import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  )
}`,
    explanation: `A reusable authentication form component. Currently implements a mock email sign-in flow with a loading state.`,
  },
  "src/components/ui/button.tsx": {
    language: "typescript",
    code: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`,
    explanation: `A standard Shadcn UI Button component with variant and size configurations using class-variance-authority.`,
  },
  "package.json": {
    language: "json",
    code: `{
  "name": "saha-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.2.3",
    "lucide-react": "^0.378.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.3"
  }
}`,
    explanation: `The project's manifest file, defining dependencies, scripts, and metadata for the Next.js application.`,
  },
  "README.md": {
    language: "markdown",
    code: `# SAHA Frontend

This is the frontend application for SAHA - AI Context Recovery Companion.

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.`,
    explanation: `The main documentation file for the repository.`,
  },
};

export function ProjectSession() {
  const { projectId } = useParams();
  const [activeFile, setActiveFile] = useState("src/app/api/auth/route.ts");
  const [showAI, setShowAI] = useState(true);
  const [fileData, setFileData] = useState(initialFileData);
  const [fileTree, setFileTree] = useState(initialFileTree);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentFileData = fileData[activeFile] || {
    code: "// File content not found",
    explanation: "No explanation available.",
    language: "plaintext",
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setFileData((prev) => ({
        ...prev,
        [activeFile]: {
          ...prev[activeFile],
          code: value,
        },
      }));
    }
  };

  const handleCreateFile = () => {
    const fileName = prompt("Enter new file name (e.g., new-file.ts):");
    if (!fileName) return;

    // Check if file already exists
    if (fileData[fileName]) {
      alert("File already exists!");
      return;
    }

    // Add to file tree
    setFileTree((prev) => [...prev, { name: fileName, type: "file" }]);

    // Add to file data
    setFileData((prev) => ({
      ...prev,
      [fileName]: {
        code: "// New file created",
        explanation: "This is a newly created file.",
        language:
          fileName.endsWith(".ts") || fileName.endsWith(".tsx")
            ? "typescript"
            : fileName.endsWith(".js") || fileName.endsWith(".jsx")
              ? "javascript"
              : fileName.endsWith(".json")
                ? "json"
                : fileName.endsWith(".md")
                  ? "markdown"
                  : "plaintext",
      },
    }));

    setActiveFile(fileName);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const fileName = file.name;

      // Check if file already exists
      if (fileData[fileName]) {
        alert("File already exists!");
        return;
      }

      // Add to file tree
      setFileTree((prev) => [...prev, { name: fileName, type: "file" }]);

      // Add to file data
      setFileData((prev) => ({
        ...prev,
        [fileName]: {
          code: content,
          explanation: "This file was uploaded.",
          language:
            fileName.endsWith(".ts") || fileName.endsWith(".tsx")
              ? "typescript"
              : fileName.endsWith(".js") || fileName.endsWith(".jsx")
                ? "javascript"
                : fileName.endsWith(".json")
                  ? "json"
                  : fileName.endsWith(".md")
                    ? "markdown"
                    : "plaintext",
        },
      }));

      setActiveFile(fileName);
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGenerateBoilerplate = () => {
    if (activeFile !== "src/app/api/auth/route.ts") return;

    setIsGenerating(true);
    setTimeout(() => {
      setFileData((prev) => ({
        ...prev,
        "src/app/api/auth/route.ts": {
          ...prev["src/app/api/auth/route.ts"],
          code: prev["src/app/api/auth/route.ts"].code.replace(
            `      // TODO: Initialize SAHA session tracking here
      // 1. Check if user exists in our DB
      // 2. Create new active session record
      // 3. Sync recent GitHub events`,
            `      // SAHA Session Tracking Initialized
      const { data: user } = await supabase.from('users').select('id').eq('id', session.user.id).single();
      
      if (!user) {
        await supabase.from('users').insert({ id: session.user.id, email: session.user.email });
      }
      
      const { data: newSession } = await supabase.from('sessions').insert({
        user_id: session.user.id,
        started_at: new Date().toISOString(),
        status: 'active'
      }).select().single();
      
      // Trigger background sync
      fetch(\`\${process.env.NEXT_PUBLIC_API_URL}/api/github/sync?userId=\${session.user.id}\`);`,
          ),
          leftOff: undefined, // Clear the leftOff message after generating
        },
      }));
      setIsGenerating(false);
    }, 1500);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      if (activeFile === "src/app/api/auth/route.ts") {
        setOutput(`> Running src/app/api/auth/route.ts...
[INFO] Next.js API route detected.
[INFO] Mocking request to /api/auth?code=mock_oauth_code_123
[SUCCESS] Supabase client initialized.
[SUCCESS] Code exchanged for session successfully.
[INFO] User ID: 9f8a2b1e-4c3d-4b2a-9a8b-7c6d5e4f3a2b
[SUCCESS] SAHA session tracking initialized.
[INFO] Session ID: sess_8f7e6d5c
[INFO] Background sync triggered for user 9f8a2b1e-4c3d-4b2a-9a8b-7c6d5e4f3a2b
[REDIRECT] 302 Found -> /dashboard
> Execution finished in 142ms.`);
      } else {
        setOutput(`> Running ${activeFile}...
[INFO] File executed successfully.
> Execution finished in 45ms.`);
      }
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      {/* Header */}
      <header className="h-14 border-b bg-background/80 backdrop-blur-md flex items-center justify-between px-4 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link to="/">
              <ArrowLeft size={16} />
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-mono font-medium">
              {projectId || "saha-frontend"}
            </span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Active Session
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleRunCode}
            disabled={isRunning}
          >
            {isRunning ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Play size={14} />
            )}
            Run Code
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setShowAI(!showAI)}
          >
            <Sparkles
              size={14}
              className={showAI ? "text-primary" : "text-muted-foreground"}
            />
            AI Assistant
          </Button>
          <Button size="sm" variant="destructive" className="gap-2">
            End Session
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer */}
        <div className="w-64 border-r bg-muted/10 flex flex-col">
          <div className="p-3 border-b flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Explorer</span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleCreateFile}
                title="New File"
              >
                <Plus size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => fileInputRef.current?.click()}
                title="Upload File"
              >
                <Upload size={14} />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>
          <div className="p-2 overflow-auto flex-1">
            {fileTree.map((node) => (
              <FileTreeNode
                key={node.name}
                node={node}
                depth={0}
                activeFile={activeFile}
                setActiveFile={setActiveFile}
                path={node.name}
              />
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <div className="h-10 border-b flex items-center px-4 bg-background/50 backdrop-blur-sm text-sm font-mono text-muted-foreground z-10">
            {activeFile}
          </div>
          <div className="flex-1 relative">
            <Editor
              height="100%"
              language={currentFileData.language}
              theme="vs-dark"
              value={currentFileData.code}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "JetBrains Mono, monospace",
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
              }}
            />
          </div>

          {/* Output Terminal Panel */}
          {output !== null && (
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-zinc-950 border-t border-zinc-800 flex flex-col z-20 animate-in slide-in-from-bottom-2">
              <div className="h-10 flex items-center justify-between px-4 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <Terminal size={14} />
                  OUTPUT
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-zinc-400 hover:text-white"
                  onClick={() => setOutput(null)}
                >
                  <X size={14} />
                </Button>
              </div>
              <div className="flex-1 overflow-auto p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap">
                {output}
              </div>
            </div>
          )}
        </div>

        {/* AI Assistant Panel */}
        {showAI && (
          <div className="w-80 border-l bg-background/80 backdrop-blur-md flex flex-col z-10">
            <div className="p-3 border-b flex items-center gap-2 text-sm font-semibold">
              <Sparkles size={16} className="text-primary" />
              Context & Explanation
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <MessageSquare size={14} className="text-muted-foreground" />
                  Code Explanation
                </h3>
                <div className="text-sm text-foreground/80 prose prose-sm dark:prose-invert">
                  <Markdown>{currentFileData.explanation}</Markdown>
                </div>
              </div>

              {currentFileData.leftOff && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-3 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-sm font-medium flex items-center gap-2 text-primary">
                    <Wand2 size={14} />
                    Where You Left Off
                  </h3>
                  <div className="text-sm text-foreground/80 prose prose-sm dark:prose-invert">
                    <Markdown>{currentFileData.leftOff}</Markdown>
                  </div>
                  <div className="pt-2">
                    <Button
                      size="sm"
                      className="w-full gap-2 text-xs h-8"
                      onClick={handleGenerateBoilerplate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Play size={12} />
                          Generate Boilerplate for TODOs
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FileTreeNode({ node, depth, activeFile, setActiveFile, path }: any) {
  const [isOpen, setIsOpen] = useState(true);
  const isFile = node.type === "file";
  const isActive = activeFile === path;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-sm cursor-pointer text-sm hover:bg-secondary/80 transition-colors",
          isActive && "bg-secondary text-foreground font-medium",
          !isActive && "text-muted-foreground",
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => {
          if (isFile) setActiveFile(path);
          else setIsOpen(!isOpen);
        }}
      >
        {!isFile && (
          <span className="w-4 h-4 flex items-center justify-center">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
        {isFile && <span className="w-4" />}

        {isFile ? (
          <FileCode2
            size={14}
            className={node.modified ? "text-emerald-500" : ""}
          />
        ) : (
          <Folder size={14} className="text-blue-400" />
        )}

        <span
          className={cn(
            "truncate",
            node.modified && "text-emerald-600 dark:text-emerald-400",
          )}
        >
          {node.name}
        </span>
      </div>

      {!isFile && isOpen && node.children && (
        <div>
          {node.children.map((child: any) => (
            <FileTreeNode
              key={child.name}
              node={child}
              depth={depth + 1}
              activeFile={activeFile}
              setActiveFile={setActiveFile}
              path={`${path}/${child.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

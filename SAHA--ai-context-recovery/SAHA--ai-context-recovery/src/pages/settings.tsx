import { useTheme } from "@/components/theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor } from "lucide-react";

export function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your application preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how SAHA looks on your device.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              className="gap-2"
              onClick={() => setTheme("light")}
            >
              <Sun size={16} /> Light
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              className="gap-2"
              onClick={() => setTheme("dark")}
            >
              <Moon size={16} /> Dark
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              className="gap-2"
              onClick={() => setTheme("system")}
            >
              <Monitor size={16} /> System
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

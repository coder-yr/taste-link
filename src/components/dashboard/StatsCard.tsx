import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'accent' | 'secondary';
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  variant = 'default'
}: StatsCardProps) {
  const getCardClasses = () => {
    switch (variant) {
      case 'accent':
        return "bg-gradient-warm border-accent/20 shadow-warm";
      case 'secondary':
        return "bg-gradient-blue border-secondary/20 shadow-glow";
      default:
        return "hover:shadow-soft transition-all duration-200";
    }
  };

  return (
    <Card className={`${getCardClasses()} hover:scale-[1.02] transition-all duration-200`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`w-4 h-4 ${
          variant === 'default' 
            ? 'text-muted-foreground' 
            : variant === 'accent' 
              ? 'text-accent-foreground' 
              : 'text-secondary-foreground'
        }`} />
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-2xl font-bold">
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center space-x-1">
              <Badge 
                variant={trend.isPositive ? "default" : "destructive"}
                className="text-xs"
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </Badge>
              <span className="text-xs text-muted-foreground">
                from last month
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
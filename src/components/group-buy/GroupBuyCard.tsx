import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Users, Package, MapPin } from "lucide-react";

interface GroupBuyCardProps {
  id: string;
  title: string;
  supplier: {
    name: string;
    image?: string;
    location: string;
    rating: number;
  };
  product: {
    name: string;
    image?: string;
    originalPrice: number;
    groupPrice: number;
  };
  progress: {
    current: number;
    target: number;
    percentage: number;
  };
  timeLeft: string;
  participants: number;
  isJoined?: boolean;
  onJoin?: () => void;
  onViewDetails?: () => void;
}

export function GroupBuyCard({
  title,
  supplier,
  product,
  progress,
  timeLeft,
  participants,
  isJoined = false,
  onJoin,
  onViewDetails
}: GroupBuyCardProps) {
  const discount = Math.round(((product.originalPrice - product.groupPrice) / product.originalPrice) * 100);

  return (
    <Card className="group hover:shadow-glow transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={supplier.image} alt={supplier.name} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {supplier.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{supplier.name}</p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>{supplier.location}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Product Info */}
        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{product.name}</h4>
            <Badge className="bg-gradient-warm text-accent-foreground">
              -{discount}% OFF
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="space-x-2">
              <span className="line-through text-muted-foreground">
                ${product.originalPrice}
              </span>
              <span className="font-bold text-primary">
                ${product.groupPrice}
              </span>
            </div>
            <span className="text-muted-foreground">per unit</span>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {progress.current} / {progress.target} units
            </span>
          </div>
          <Progress value={progress.percentage} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{participants} participants</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{timeLeft} left</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          {isJoined ? (
            <Button variant="secondary" className="flex-1" disabled>
              <Package className="w-4 h-4 mr-2" />
              Joined
            </Button>
          ) : (
            <Button 
              variant="glow" 
              className="flex-1" 
              onClick={onJoin}
            >
              Join Group Buy
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={onViewDetails}
          >
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Package, Clock, Shield } from "lucide-react";

interface SupplierCardProps {
  id: string;
  name: string;
  image?: string;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  trustScore: number;
  deliveryTime: string;
  activeGroupBuys: number;
  isVerified?: boolean;
  onContact?: () => void;
  onViewProfile?: () => void;
}

export function SupplierCard({
  name,
  image,
  location,
  distance,
  rating,
  reviewCount,
  specialties,
  trustScore,
  deliveryTime,
  activeGroupBuys,
  isVerified = false,
  onContact,
  onViewProfile
}: SupplierCardProps) {
  return (
    <Card className="group hover:shadow-glow transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{name}</h3>
                {isVerified && (
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{location} • {distance}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviewCount})</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Trust Score: {trustScore}/100
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Specialties */}
        <div>
          <h4 className="text-sm font-medium mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-1">
            {specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {specialties.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{specialties.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span>{activeGroupBuys} active deals</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="default" 
            className="flex-1" 
            onClick={onContact}
          >
            Contact
          </Button>
          <Button 
            variant="outline" 
            onClick={onViewProfile}
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Package, MapPin } from "lucide-react";
import { useState } from "react";
import { SupplierJoinModal } from "@/components/modals/SupplierJoinModal";

const groupBuyData = [
  {
    id: "1",
    title: "Premium Rice Bowls",
    product: "Eco-friendly Rice Containers",
    image: "/placeholder.svg",
    currentOrders: 150,
    minQuantity: 500,
    pricePerUnit: 2.50,
    originalPrice: 3.20,
    timeLeft: "3 days",
    location: "Downtown District",
    participants: 12,
    supplier: "GreenPack Solutions"
  },
  {
    id: "2", 
    title: "Organic Vegetables",
    product: "Fresh Seasonal Vegetables",
    image: "/placeholder.svg",
    currentOrders: 80,
    minQuantity: 200,
    pricePerUnit: 4.80,
    originalPrice: 6.50,
    timeLeft: "5 days",
    location: "Market Square",
    participants: 8,
    supplier: "Farm Fresh Co."
  },
  {
    id: "3",
    title: "Compostable Utensils",
    product: "Biodegradable Cutlery Set",
    image: "/placeholder.svg", 
    currentOrders: 300,
    minQuantity: 1000,
    pricePerUnit: 0.45,
    originalPrice: 0.65,
    timeLeft: "1 week",
    location: "City Center",
    participants: 15,
    supplier: "EcoSupply Ltd."
  }
];

export default function GroupBuyers() {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header userType="vendor" />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Active Group Buy Campaigns
          </h1>
          <p className="text-muted-foreground text-lg">
            Start saving together with trusted suppliers. Join ongoing campaigns or create your own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {groupBuyData.map((campaign) => {
            const progress = (campaign.currentOrders / campaign.minQuantity) * 100;
            const discount = Math.round(((campaign.originalPrice - campaign.pricePerUnit) / campaign.originalPrice) * 100);
            
            return (
              <Card key={campaign.id} className="group hover:shadow-glow transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold">{campaign.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{campaign.supplier}</p>
                    </div>
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{campaign.location}</span>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Product Info */}
                  <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{campaign.product}</h4>
                      <Badge className="bg-gradient-warm text-accent-foreground">
                        -{discount}% OFF
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="space-x-2">
                        <span className="line-through text-muted-foreground">
                          ${campaign.originalPrice}
                        </span>
                        <span className="font-bold text-primary">
                          ${campaign.pricePerUnit}
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
                        {campaign.currentOrders} / {campaign.minQuantity} units
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{campaign.participants} participants</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{campaign.timeLeft} left</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button 
                      variant="glow" 
                      className="w-full" 
                      onClick={() => setSelectedCampaign(campaign.id)}
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Join as Supplier
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <SupplierJoinModal 
        isOpen={selectedCampaign !== null}
        onClose={() => setSelectedCampaign(null)}
        campaignId={selectedCampaign}
      />
    </div>
  );
}
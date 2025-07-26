import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { GroupBuyCard } from "@/components/group-buy/GroupBuyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Package,
  Star,
  MapPin,
  Clock,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import marketplaceHero from "@/assets/marketplace-hero.jpg";

export default function VendorDashboard() {
  const { toast } = useToast();

  const handleJoinGroupBuy = () => {
    toast({
      title: "Joined Group Buy!",
      description: "You've successfully joined the group buy. We'll notify you when it reaches the target.",
    });
  };

  const groupBuys = [
    {
      id: "1",
      title: "Premium Rice Bulk Order",
      supplier: {
        name: "GreenField Supplies",
        image: "/placeholder.svg",
        location: "Downtown",
        rating: 4.8
      },
      product: {
        name: "Jasmine Rice 25kg bags",
        originalPrice: 45,
        groupPrice: 32
      },
      progress: {
        current: 147,
        target: 200,
        percentage: 73.5
      },
      timeLeft: "2 days",
      participants: 23,
      isJoined: false
    },
    {
      id: "2", 
      title: "Fresh Vegetable Package",
      supplier: {
        name: "FarmFresh Direct",
        image: "/placeholder.svg",
        location: "Suburb",
        rating: 4.9
      },
      product: {
        name: "Mixed Vegetable Box",
        originalPrice: 28,
        groupPrice: 22
      },
      progress: {
        current: 89,
        target: 100,
        percentage: 89
      },
      timeLeft: "5 hours",
      participants: 34,
      isJoined: true
    }
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      supplier: "GreenField Supplies",
      items: "Rice, Oil, Spices",
      amount: 156,
      status: "Delivered",
      date: "2 days ago"
    },
    {
      id: "ORD-002", 
      supplier: "FarmFresh Direct",
      items: "Vegetables, Fruits",
      amount: 89,
      status: "In Transit",
      date: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header userType="vendor" />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-warm">
          <div 
            className="h-64 bg-cover bg-center bg-gradient-primary"
            style={{ backgroundImage: `url(${marketplaceHero})` }}
          >
            <div className="absolute inset-0 bg-gradient-primary/80 flex items-center">
              <div className="container mx-auto px-4 text-primary-foreground">
                <h1 className="text-4xl font-bold mb-2 animate-fade-in">
                  Welcome back, John! 👋
                </h1>
                <p className="text-lg opacity-90 animate-fade-in delay-100">
                  Discover trusted suppliers and join group buys to save on your inventory.
                </p>
                <Button 
                  variant="secondary" 
                  className="mt-4 animate-fade-in delay-200"
                >
                  Explore New Deals
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Orders"
            value={12}
            subtitle="3 pending delivery"
            icon={ShoppingCart}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Monthly Savings"
            value="$2,847"
            subtitle="From group buys"
            icon={TrendingUp}
            trend={{ value: 23, isPositive: true }}
            variant="accent"
          />
          <StatsCard
            title="Trusted Suppliers"
            value={18}
            subtitle="In your network"
            icon={Users}
            variant="secondary"
          />
          <StatsCard
            title="Group Buys Joined"
            value={7}
            subtitle="This month"
            icon={Package}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Group Buys */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Group Buys</h2>
              <Button variant="outline">View All</Button>
            </div>
            
            <div className="grid gap-6">
              {groupBuys.map((groupBuy) => (
                <GroupBuyCard
                  key={groupBuy.id}
                  {...groupBuy}
                  onJoin={handleJoinGroupBuy}
                  onViewDetails={() => console.log('View details')}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Recent Orders</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.supplier}</p>
                      <p className="text-xs text-muted-foreground">{order.items}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium">${order.amount}</p>
                      <Badge 
                        variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            {/* Top Suppliers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Top Suppliers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "GreenField Supplies", rating: 4.9, orders: 15 },
                  { name: "FarmFresh Direct", rating: 4.8, orders: 12 },
                  { name: "Quality Foods Co", rating: 4.7, orders: 8 }
                ].map((supplier, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-muted/30 rounded-lg transition-colors">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {supplier.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{supplier.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{supplier.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{supplier.orders} orders</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Suppliers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
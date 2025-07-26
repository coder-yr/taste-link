import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { SupplierCard } from "@/components/suppliers/SupplierCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter,
  MapPin,
  Star,
  SlidersHorizontal
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SupplierList() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const suppliers = [
    {
      id: "1",
      name: "GreenField Supplies",
      image: "/placeholder.svg",
      location: "Downtown District",
      distance: "2.3 km",
      rating: 4.9,
      reviewCount: 156,
      specialties: ["Rice", "Grains", "Cooking Oil", "Spices"],
      trustScore: 98,
      deliveryTime: "Same day",
      activeGroupBuys: 3,
      isVerified: true
    },
    {
      id: "2",
      name: "FarmFresh Direct",
      image: "/placeholder.svg", 
      location: "Suburban Area",
      distance: "4.1 km",
      rating: 4.8,
      reviewCount: 89,
      specialties: ["Vegetables", "Fruits", "Organic Produce"],
      trustScore: 95,
      deliveryTime: "Next day",
      activeGroupBuys: 5,
      isVerified: true
    },
    {
      id: "3",
      name: "Quality Foods Co",
      image: "/placeholder.svg",
      location: "Industrial Zone",
      distance: "6.7 km", 
      rating: 4.7,
      reviewCount: 234,
      specialties: ["Frozen Foods", "Dairy", "Beverages", "Snacks"],
      trustScore: 92,
      deliveryTime: "2-3 days",
      activeGroupBuys: 2,
      isVerified: false
    },
    {
      id: "4",
      name: "Spice Masters Ltd",
      image: "/placeholder.svg",
      location: "Traditional Market",
      distance: "3.2 km",
      rating: 4.6,
      reviewCount: 67,
      specialties: ["Spices", "Herbs", "Seasonings", "Condiments"],
      trustScore: 88,
      deliveryTime: "Same day",
      activeGroupBuys: 1,
      isVerified: true
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "grains", label: "Rice & Grains" },
    { value: "vegetables", label: "Fresh Produce" },
    { value: "spices", label: "Spices & Seasonings" },
    { value: "frozen", label: "Frozen Foods" },
    { value: "dairy", label: "Dairy Products" }
  ];

  const handleContact = (supplierName: string) => {
    toast({
      title: "Contact Request Sent",
      description: `Your message has been sent to ${supplierName}. They'll get back to you soon!`,
    });
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header userType="vendor" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Trusted Suppliers</h1>
          <p className="text-muted-foreground">
            Connect with verified suppliers in your area and join group buys for better prices.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-soft">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search suppliers or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="distance">Nearest First</SelectItem>
                  <SelectItem value="trust">Trust Score</SelectItem>
                  <SelectItem value="deals">Most Deals</SelectItem>
                </SelectContent>
              </Select>

              {/* Quick Filters */}
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  <MapPin className="w-3 h-3 mr-1" />
                  Nearby
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  <Star className="w-3 h-3 mr-1" />
                  Top Rated
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Found {filteredSuppliers.length} suppliers
          </p>
          <Button variant="outline">
            Map View
          </Button>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <SupplierCard
              key={supplier.id}
              {...supplier}
              onContact={() => handleContact(supplier.name)}
              onViewProfile={() => console.log('View profile', supplier.id)}
            />
          ))}
        </div>

        {/* Load More */}
        {filteredSuppliers.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Suppliers
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No suppliers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or explore different categories.
            </p>
            <Button variant="default">
              Browse All Categories
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
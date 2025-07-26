import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, Users, ShoppingCart, Star, ArrowRight, Shield, TrendingUp } from "lucide-react";
import marketplaceHero from "@/assets/marketplace-hero.jpg";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Connect with Trusted Suppliers",
      description: "Find verified suppliers in your area with transparent ratings and reviews.",
      color: "text-primary"
    },
    {
      icon: ShoppingCart,
      title: "Join Group Buying",
      description: "Team up with other vendors to get better prices through bulk purchasing.",
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "All transactions are protected with our trust-based verification system.",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      title: "Track Your Savings",
      description: "Monitor your cost savings and optimize your supply chain efficiency.",
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                TrustedMarket
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/vendor">
                <Button variant="outline">
                  I'm a Vendor
                </Button>
              </Link>
              <Link to="/supplier">
                <Button variant="default">
                  I'm a Supplier
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(${marketplaceHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-primary/80 flex items-center">
            <div className="container mx-auto px-4 text-center text-primary-foreground">
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                Connect. Collaborate. Save.
              </h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 animate-fade-in delay-100">
                The trusted marketplace where street food vendors connect with reliable suppliers 
                for group buying, better prices, and transparent sourcing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-200">
                <Link to="/vendor">
                  <Button variant="secondary" size="lg" className="min-w-48">
                    Start as Vendor
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/supplier">
                  <Button variant="accent" size="lg" className="min-w-48">
                    Join as Supplier
                    <Users className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose TrustedMarket?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built specifically for street food vendors and suppliers to create lasting, 
              profitable relationships through transparency and collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">2,500+</div>
              <p className="text-muted-foreground">Active Vendors</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">850+</div>
              <p className="text-muted-foreground">Trusted Suppliers</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">$1.2M+</div>
              <p className="text-muted-foreground">Total Savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Supply Chain?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of vendors and suppliers who are already saving money 
              and building stronger business relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/vendor">
                <Button variant="glow" size="lg">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
              TrustedMarket
            </span>
          </div>
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 TrustedMarket. Connecting vendors and suppliers for a better food ecosystem.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

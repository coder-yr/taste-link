import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Package, Loader2 } from "lucide-react";

const formSchema = z.object({
  supplierName: z.string().min(2, "Supplier name must be at least 2 characters"),
  supplierId: z.string().min(3, "Supplier ID must be at least 3 characters"),
  productOffering: z.string().min(1, "Please select a product offering"),
  pricePerUnit: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Price must be a positive number"
  ),
  minOrderQuantity: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Minimum order quantity must be a positive number"
  ),
});

interface SupplierJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string | null;
}

export function SupplierJoinModal({ isOpen, onClose, campaignId }: SupplierJoinModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierName: "",
      supplierId: "",
      productOffering: "",
      pricePerUnit: "",
      minOrderQuantity: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Here you would make the actual API call
      console.log("Joining campaign:", campaignId, values);
      
      setIsJoined(true);
      toast({
        title: "Successfully joined!",
        description: "Submitted successfully! We'll notify you once approved.",
      });
      
      // Reset form and close modal after success
      setTimeout(() => {
        form.reset();
        setIsJoined(false);
        onClose();
      }, 2000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      form.reset();
      setIsJoined(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Join as Supplier</span>
          </DialogTitle>
          <DialogDescription>
            Fill out the details below to join this group buy campaign as a supplier.
          </DialogDescription>
        </DialogHeader>

        {isJoined ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">You've Joined!</h3>
            <p className="text-muted-foreground">
              Submitted successfully! We'll notify you once approved.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="supplierName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supplierId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier ID</FormLabel>
                      <FormControl>
                        <Input placeholder="SUP001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="productOffering"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Offering</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select what you can supply" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rice-bowls">Rice Bowls & Containers</SelectItem>
                        <SelectItem value="vegetables">Fresh Vegetables</SelectItem>
                        <SelectItem value="utensils">Compostable Utensils</SelectItem>
                        <SelectItem value="packaging">Food Packaging</SelectItem>
                        <SelectItem value="ingredients">Cooking Ingredients</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pricePerUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Unit ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="2.50" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minOrderQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Order Quantity</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="100" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="glow" 
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Join Campaign"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
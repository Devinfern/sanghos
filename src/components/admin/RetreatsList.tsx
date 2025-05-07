
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface Retreat {
  id: string;
  title: string;
  location_city: string;
  location_state: string;
  date: string;
  capacity: number;
  remaining: number;
  price: number;
  featured: boolean;
  category: string[];
}

interface RetreatsListProps {
  onCreateNew: () => void;
  onEditRetreat: (retreat: Retreat) => void;
}

const RetreatsList = ({ onCreateNew, onEditRetreat }: RetreatsListProps) => {
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [retreatToDelete, setRetreatToDelete] = useState<string | null>(null);

  // Fetch retreats
  useEffect(() => {
    fetchRetreats();
  }, []);

  const fetchRetreats = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('retreats')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setRetreats(data || []);
    } catch (error: any) {
      console.error("Error fetching retreats:", error);
      toast.error("Failed to load retreats");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter retreats based on search term
  const filteredRetreats = retreats.filter((retreat) =>
    retreat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (retreatId: string) => {
    setRetreatToDelete(retreatId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!retreatToDelete) return;
    
    try {
      const { error } = await supabase
        .from('retreats')
        .delete()
        .eq('id', retreatToDelete);
      
      if (error) throw error;
      
      toast.success("Retreat deleted successfully");
      fetchRetreats();
    } catch (error: any) {
      console.error("Error deleting retreat:", error);
      toast.error("Failed to delete retreat");
    } finally {
      setShowDeleteDialog(false);
      setRetreatToDelete(null);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getRemainingText = (capacity: number, remaining: number): string => {
    if (remaining <= 0) return "Sold out";
    if (remaining === 1) return "Only 1 spot left";
    if (remaining <= 3) return `Only ${remaining} spots left`;
    return `${capacity - remaining} of ${capacity} booked`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <CardTitle>All Retreats</CardTitle>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search retreats..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={onCreateNew}>
            <Plus className="mr-2 h-4 w-4" /> Add Retreat
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Loading retreats...</div>
        ) : filteredRetreats.length === 0 ? (
          <div className="text-center py-8">
            {searchTerm ? (
              <p>No retreats found matching "{searchTerm}"</p>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">You haven't created any retreats yet</p>
                <Button onClick={onCreateNew}>
                  <Plus className="mr-2 h-4 w-4" /> Create Your First Retreat
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRetreats.map((retreat) => (
                    <TableRow key={retreat.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          {retreat.title}
                          {retreat.featured && (
                            <Badge className="ml-2">Featured</Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {retreat.category.join(", ")}
                        </div>
                      </TableCell>
                      <TableCell>
                        {retreat.location_city}, {retreat.location_state}
                      </TableCell>
                      <TableCell>
                        {new Date(retreat.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{formatCurrency(retreat.price)}</TableCell>
                      <TableCell>
                        {getRemainingText(retreat.capacity, retreat.remaining)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/retreat/${retreat.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEditRetreat(retreat)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(retreat.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this retreat? This action cannot
                    be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteConfirm}>
                    Delete Retreat
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RetreatsList;

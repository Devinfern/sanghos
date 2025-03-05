
import { useState } from "react";
import { useHost } from "@/contexts/HostContext";
import { Navigate, Link } from "react-router-dom";
import HostHeader from "@/components/HostHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Calendar,
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { retreats, formatCurrency, getRemainingText } from "@/lib/data";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const HostRetreats = () => {
  const { host } = useHost();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [retreatToDelete, setRetreatToDelete] = useState<string | null>(null);

  // Filter retreats based on search term
  const filteredRetreats = retreats.filter((retreat) =>
    retreat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (retreatId: string) => {
    setRetreatToDelete(retreatId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    // In a real app, this would make an API call to delete the retreat
    toast.success("Retreat deleted successfully");
    setShowDeleteDialog(false);
  };

  // Redirect if not logged in
  if (!host) {
    return <Navigate to="/host/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-sand-50">
      <HostHeader />
      <div className="flex-1 container px-4 md:px-6 pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Retreats</h1>
            <p className="text-muted-foreground">
              Manage your wellness retreats
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
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
            <Button asChild>
              <Link to="/host/retreats/new">
                <Plus className="mr-2 h-4 w-4" /> Add Retreat
              </Link>
            </Button>
          </div>
        </div>

        {filteredRetreats.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No retreats found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm
                  ? `No retreats matching "${searchTerm}"`
                  : "You haven't created any retreats yet"}
              </p>
              <Button asChild>
                <Link to="/host/retreats/new">
                  <Plus className="mr-2 h-4 w-4" /> Create Your First Retreat
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRetreats.map((retreat) => (
              <Card key={retreat.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={retreat.image}
                    alt={retreat.title}
                    className="object-cover w-full h-full"
                  />
                  {retreat.featured && (
                    <Badge className="absolute top-3 right-3">Featured</Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>
                      {retreat.location.city}, {retreat.location.state}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1">{retreat.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {retreat.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(retreat.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {getRemainingText(retreat.remaining)}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">
                      {formatCurrency(retreat.price)}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      {retreat.capacity - retreat.remaining} booked
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/retreat/${retreat.id}`}>
                      <Eye className="mr-2 h-4 w-4" /> View
                    </Link>
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/host/retreats/edit/${retreat.id}`}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(retreat.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

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
      </div>
    </div>
  );
};

export default HostRetreats;

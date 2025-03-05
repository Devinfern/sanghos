
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
import { MapPin, Plus, Search, Edit, Trash2, Eye, Home } from "lucide-react";
import { retreats } from "@/lib/data";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// For demo purposes, we'll create mock spaces from retreat locations
const mockSpaces = retreats.map((retreat) => ({
  id: `space-${retreat.id}`,
  name: retreat.location.name,
  address: retreat.location.address,
  city: retreat.location.city,
  state: retreat.location.state,
  description: retreat.location.description,
  image: retreat.image,
  capacity: retreat.capacity,
  amenities: retreat.amenities,
}));

const HostSpaces = () => {
  const { host } = useHost();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [spaceToDelete, setSpaceToDelete] = useState<string | null>(null);

  // Filter spaces based on search term
  const filteredSpaces = mockSpaces.filter((space) =>
    space.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (spaceId: string) => {
    setSpaceToDelete(spaceId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    // In a real app, this would make an API call to delete the space
    toast.success("Space deleted successfully");
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
            <h1 className="text-3xl font-bold">My Spaces</h1>
            <p className="text-muted-foreground">
              Manage your retreat locations and spaces
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search spaces..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button asChild>
              <Link to="/host/spaces/new">
                <Plus className="mr-2 h-4 w-4" /> Add Space
              </Link>
            </Button>
          </div>
        </div>

        {filteredSpaces.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No spaces found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm
                  ? `No spaces matching "${searchTerm}"`
                  : "You haven't added any spaces yet"}
              </p>
              <Button asChild>
                <Link to="/host/spaces/new">
                  <Plus className="mr-2 h-4 w-4" /> Add Your First Space
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpaces.map((space) => (
              <Card key={space.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={space.image}
                    alt={space.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>
                      {space.city}, {space.state}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1">{space.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {space.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-sm text-muted-foreground">
                    {space.address}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Capacity: {space.capacity}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/host/spaces/edit/${space.id}`}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(space.id)}
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
                Are you sure you want to delete this space? This action cannot
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
                Delete Space
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HostSpaces;

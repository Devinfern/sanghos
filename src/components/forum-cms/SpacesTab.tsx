
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, ChevronUp, ChevronDown, Pencil, Trash2, MessageSquare, Calendar, Users } from "lucide-react";
import { toast } from "sonner";
import { forumSpaces, updateForumSpaces } from "@/lib/forumData";

export const SpacesTab = () => {
  const [spaces, setSpaces] = useState([...forumSpaces]);
  const [editingSpace, setEditingSpace] = useState<{
    categoryIndex: number;
    spaceIndex: number;
    name: string;
    icon: string;
    count: number | null;
  } | null>(null);
  const [spaceDialogOpen, setSpaceDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "" });

  const handleEditSpace = (categoryIndex: number, spaceIndex: number) => {
    const space = spaces[categoryIndex].spaces[spaceIndex];
    setEditingSpace({
      categoryIndex,
      spaceIndex,
      name: space.name,
      icon: space.icon,
      count: space.count,
    });
    setSpaceDialogOpen(true);
  };

  const handleAddSpace = (categoryIndex: number) => {
    setEditingSpace({
      categoryIndex,
      spaceIndex: -1,
      name: "",
      icon: "MessageSquare",
      count: null,
    });
    setSpaceDialogOpen(true);
  };

  const handleSaveSpace = () => {
    if (!editingSpace) return;

    const newSpaces = [...spaces];
    
    if (editingSpace.spaceIndex === -1) {
      newSpaces[editingSpace.categoryIndex].spaces.push({
        name: editingSpace.name,
        icon: editingSpace.icon,
        count: editingSpace.count,
      });
    } else {
      newSpaces[editingSpace.categoryIndex].spaces[editingSpace.spaceIndex] = {
        name: editingSpace.name,
        icon: editingSpace.icon,
        count: editingSpace.count,
      };
    }
    
    setSpaces(newSpaces);
    updateForumSpaces(newSpaces);
    setSpaceDialogOpen(false);
    toast.success(editingSpace.spaceIndex === -1 ? "Space added successfully" : "Space updated successfully");
  };

  const handleDeleteSpace = (categoryIndex: number, spaceIndex: number) => {
    const newSpaces = [...spaces];
    newSpaces[categoryIndex].spaces.splice(spaceIndex, 1);
    setSpaces(newSpaces);
    updateForumSpaces(newSpaces);
    toast.success("Space deleted successfully");
  };

  const handleAddCategory = () => {
    setNewCategory({ name: "" });
    setCategoryDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (!newCategory.name.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    const newSpaces = [...spaces, { name: newCategory.name, spaces: [] }];
    setSpaces(newSpaces);
    updateForumSpaces(newSpaces);
    setCategoryDialogOpen(false);
    toast.success("Category added successfully");
  };

  const handleDeleteCategory = (categoryIndex: number) => {
    const newSpaces = [...spaces];
    newSpaces.splice(categoryIndex, 1);
    setSpaces(newSpaces);
    updateForumSpaces(newSpaces);
    toast.success("Category deleted successfully");
  };

  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === spaces.length - 1)) {
      return;
    }
    
    const newSpaces = [...spaces];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSpaces[index], newSpaces[targetIndex]] = [newSpaces[targetIndex], newSpaces[index]];
    
    setSpaces(newSpaces);
    updateForumSpaces(newSpaces);
  };

  const handleMoveSpace = (categoryIndex: number, spaceIndex: number, direction: 'up' | 'down') => {
    const categorySpaces = spaces[categoryIndex].spaces;
    
    if ((direction === 'up' && spaceIndex === 0) || 
        (direction === 'down' && spaceIndex === categorySpaces.length - 1)) {
      return;
    }
    
    const newSpaces = [...spaces];
    const targetIndex = direction === 'up' ? spaceIndex - 1 : spaceIndex + 1;
    
    [newSpaces[categoryIndex].spaces[spaceIndex], newSpaces[categoryIndex].spaces[targetIndex]] = 
    [newSpaces[categoryIndex].spaces[targetIndex], newSpaces[categoryIndex].spaces[spaceIndex]];
    
    setSpaces(newSpaces);
    updateForumSpaces(newSpaces);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Forum Spaces & Categories</CardTitle>
          <CardDescription>Manage your forum categories and spaces</CardDescription>
        </div>
        <Button onClick={handleAddCategory}>
          <Plus className="h-4 w-4 mr-2" /> Add Category
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {spaces.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleMoveCategory(categoryIndex, 'up')}
                  disabled={categoryIndex === 0}
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleMoveCategory(categoryIndex, 'down')}
                  disabled={categoryIndex === spaces.length - 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAddSpace(categoryIndex)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteCategory(categoryIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {category.spaces.map((space, spaceIndex) => (
                <div key={spaceIndex} className="flex justify-between items-center p-2 border rounded hover:bg-slate-50">
                  <div className="flex items-center">
                    {space.icon === "MessageSquare" && <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />}
                    {space.icon === "Calendar" && <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />}
                    {space.icon === "Users" && <Users className="h-4 w-4 mr-2 text-muted-foreground" />}
                    <span>{space.name}</span>
                    {space.count !== null && (
                      <span className="ml-2 text-sm text-muted-foreground">({space.count})</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleMoveSpace(categoryIndex, spaceIndex, 'up')}
                      disabled={spaceIndex === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleMoveSpace(categoryIndex, spaceIndex, 'down')}
                      disabled={spaceIndex === category.spaces.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditSpace(categoryIndex, spaceIndex)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteSpace(categoryIndex, spaceIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>

      {/* Space Dialog */}
      <Dialog open={spaceDialogOpen} onOpenChange={setSpaceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSpace?.spaceIndex === -1 ? "Add New Space" : "Edit Space"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="space-name" className="text-right">Name</Label>
              <Input
                id="space-name"
                value={editingSpace?.name || ""}
                onChange={(e) => setEditingSpace(prev => prev ? {...prev, name: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="space-icon" className="text-right">Icon</Label>
              <select
                id="space-icon"
                value={editingSpace?.icon || "MessageSquare"}
                onChange={(e) => setEditingSpace(prev => prev ? {...prev, icon: e.target.value} : null)}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="MessageSquare">Message Square</option>
                <option value="Calendar">Calendar</option>
                <option value="Users">Users</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="space-count" className="text-right">Count</Label>
              <Input
                id="space-count"
                type="number"
                value={editingSpace?.count === null ? "" : editingSpace?.count}
                onChange={(e) => setEditingSpace(prev => prev ? {
                  ...prev, 
                  count: e.target.value ? parseInt(e.target.value) : null
                } : null)}
                placeholder="Leave empty for no count"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSpaceDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSpace}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category-name" className="text-right">Name</Label>
              <Input
                id="category-name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveCategory}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

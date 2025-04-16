
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { TrendingPost, trendingPosts, updateTrendingPosts } from "@/lib/forumData";

export const TrendingTab = () => {
  const [trending, setTrending] = useState([...trendingPosts]);
  const [editingTrending, setEditingTrending] = useState<Partial<TrendingPost> | null>(null);
  const [trendingDialogOpen, setTrendingDialogOpen] = useState(false);

  const handleEditTrending = (post: TrendingPost) => {
    setEditingTrending({...post});
    setTrendingDialogOpen(true);
  };

  const handleAddTrending = () => {
    setEditingTrending({
      id: String(Date.now()), // Convert to string for compatibility
      title: "",
      author: "Admin",
      avatar: "/lovable-uploads/91da0c1f-b9f1-4310-aea3-1afbfe1358f7.png",
    });
    setTrendingDialogOpen(true);
  };

  const handleSaveTrending = () => {
    if (!editingTrending) return;

    if (!editingTrending.title || !editingTrending.author) {
      toast.error("Title and author are required");
      return;
    }

    const newTrending = [...trending];
    const postIndex = newTrending.findIndex(p => String(p.id) === String(editingTrending.id));
    
    if (postIndex === -1) {
      newTrending.push(editingTrending as TrendingPost);
    } else {
      newTrending[postIndex] = editingTrending as TrendingPost;
    }
    
    setTrending(newTrending);
    updateTrendingPosts(newTrending);
    setTrendingDialogOpen(false);
    toast.success(postIndex === -1 ? "Trending post added successfully" : "Trending post updated successfully");
  };

  const handleDeleteTrending = (postId: string | number) => {
    const newTrending = trending.filter(p => String(p.id) !== String(postId));
    
    setTrending(newTrending);
    updateTrendingPosts(newTrending);
    toast.success("Trending post deleted successfully");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Trending Posts</CardTitle>
          <CardDescription>Manage trending posts displayed in the sidebar</CardDescription>
        </div>
        <Button onClick={handleAddTrending}>
          <Plus className="h-4 w-4 mr-2" /> Add Trending Post
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trending.map((post) => (
            <div key={post.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img src={post.avatar} alt={post.author} />
                </Avatar>
                <div>
                  <h4 className="font-medium">{post.title}</h4>
                  <p className="text-sm text-muted-foreground">{post.author}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleEditTrending(post)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteTrending(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Trending Dialog */}
      <Dialog open={trendingDialogOpen} onOpenChange={setTrendingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {trending.some(p => p.id === editingTrending?.id) ? "Edit Trending Post" : "Add Trending Post"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trending-title" className="text-right">Title</Label>
              <Input
                id="trending-title"
                value={editingTrending?.title || ""}
                onChange={(e) => setEditingTrending(prev => prev ? {...prev, title: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trending-author" className="text-right">Author</Label>
              <div className="col-span-3 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img src={editingTrending?.avatar || ""} alt="Author" />
                </Avatar>
                <Input
                  id="trending-author"
                  value={editingTrending?.author || ""}
                  onChange={(e) => setEditingTrending(prev => prev ? {...prev, author: e.target.value} : null)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTrendingDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveTrending}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

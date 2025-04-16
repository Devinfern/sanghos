
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ForumPost, ForumAuthor, forumPosts, updateForumPosts } from "@/lib/forumData";

export const PostsTab = () => {
  const [posts, setPosts] = useState<ForumPost[]>([...forumPosts]);
  const [editingPost, setEditingPost] = useState<Partial<ForumPost> | null>(null);
  const [postDialogOpen, setPostDialogOpen] = useState(false);

  const handleEditPost = (post: ForumPost) => {
    const typedPost = {
      ...post,
      id: typeof post.id === 'string' ? parseInt(post.id) : post.id
    };
    setEditingPost(typedPost);
    setPostDialogOpen(true);
  };

  const handleAddPost = () => {
    setEditingPost({
      id: Date.now(),
      author: {
        name: "Admin",
        role: "Admin",
        avatar: "/lovable-uploads/91da0c1f-b9f1-4310-aea3-1afbfe1358f7.png",
      },
      postedIn: "Open Conversation",
      timeAgo: "just now",
      title: "",
      content: "",
      likes: 0,
      comments: 0,
      bookmarked: false,
    });
    setPostDialogOpen(true);
  };

  const handleSavePost = () => {
    if (!editingPost) return;

    if (!editingPost.title || !editingPost.content) {
      toast.error("Title and content are required");
      return;
    }

    const newPosts = [...posts];
    const postIndex = newPosts.findIndex(p => p.id === editingPost.id);
    
    if (postIndex === -1) {
      newPosts.unshift(editingPost as ForumPost);
    } else {
      newPosts[postIndex] = editingPost as ForumPost;
    }
    
    setPosts(newPosts);
    updateForumPosts(newPosts);
    setPostDialogOpen(false);
    toast.success(postIndex === -1 ? "Post added successfully" : "Post updated successfully");
  };

  const handleDeletePost = (postId: string | number) => {
    const idToDelete = typeof postId === 'string' ? postId : postId;
    const newPosts = posts.filter(p => {
      const currentId = p.id;
      return currentId !== idToDelete;
    });
    
    setPosts(newPosts);
    updateForumPosts(newPosts);
    toast.success("Post deleted successfully");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Forum Posts</CardTitle>
          <CardDescription>Manage posts that appear in the forum feed</CardDescription>
        </div>
        <Button onClick={handleAddPost}>
          <Plus className="h-4 w-4 mr-2" /> Add Post
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={post.author.avatar} alt={post.author.name} />
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{post.author.name}</span>
                      <span className="text-xs px-2 py-1 bg-slate-100 rounded-full">{post.author.role}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Posted in {post.postedIn} · {post.timeAgo}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditPost(post)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-sm mb-2 line-clamp-2">{post.content}</p>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Post Dialog */}
      <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {posts.some(p => p.id === editingPost?.id) ? "Edit Post" : "Add New Post"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-title" className="text-right">Title</Label>
              <Input
                id="post-title"
                value={editingPost?.title || ""}
                onChange={(e) => setEditingPost(prev => prev ? {...prev, title: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-category" className="text-right">Category</Label>
              <select
                id="post-category"
                value={editingPost?.postedIn || ""}
                onChange={(e) => setEditingPost(prev => prev ? {...prev, postedIn: e.target.value} : null)}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="Open Conversation">Open Conversation</option>
                <option value="Open Here">Open Here</option>
                <option value="Open Events">Open Events</option>
                <option value="Meditation Circle">Meditation Circle</option>
                <option value="LYF Course">LYF Course</option>
                <option value="LYF Community">LYF Community</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="post-content" className="text-right pt-2">Content</Label>
              <Textarea
                id="post-content"
                value={editingPost?.content || ""}
                onChange={(e) => setEditingPost(prev => prev ? {...prev, content: e.target.value} : null)}
                className="col-span-3 min-h-[150px]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-author" className="text-right">Author</Label>
              <div className="col-span-3 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img src={editingPost?.author?.avatar || ""} alt="Author" />
                </Avatar>
                <Input
                  id="post-author"
                  value={editingPost?.author?.name || ""}
                  onChange={(e) => setEditingPost(prev => prev ? {
                    ...prev, 
                    author: {...prev.author as ForumAuthor, name: e.target.value}
                  } : null)}
                  className="w-40"
                />
                <select
                  value={editingPost?.author?.role || "Member"}
                  onChange={(e) => setEditingPost(prev => prev ? {
                    ...prev, 
                    author: {...prev.author as ForumAuthor, role: e.target.value}
                  } : null)}
                  className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Admin">Admin</option>
                  <option value="Host">Host</option>
                  <option value="Member">Member</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPostDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePost}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

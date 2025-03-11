
import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  MessageSquare,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import {
  ForumAuthor,
  ForumPost,
  ForumEvent,
  TrendingPost,
  forumSpaces,
  forumPosts,
  forumEvents,
  trendingPosts,
} from "@/lib/forumData";

const ForumCMS = () => {
  // State for all forum data
  const [spaces, setSpaces] = useState([...forumSpaces]);
  const [posts, setPosts] = useState<ForumPost[]>([...forumPosts]);
  const [events, setEvents] = useState([...forumEvents]);
  const [trending, setTrending] = useState([...trendingPosts]);

  // State for editing/creating items
  const [editingSpace, setEditingSpace] = useState<{
    categoryIndex: number;
    spaceIndex: number;
    name: string;
    icon: string;
    count: number | null;
  } | null>(null);

  const [editingPost, setEditingPost] = useState<Partial<ForumPost> | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<ForumEvent> | null>(null);
  const [editingTrending, setEditingTrending] = useState<Partial<TrendingPost> | null>(null);

  // Dialogs open state
  const [spaceDialogOpen, setSpaceDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [trendingDialogOpen, setTrendingDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  
  // New category state
  const [newCategory, setNewCategory] = useState({ name: "" });

  // Functions to handle spaces
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
      // Adding new space
      newSpaces[editingSpace.categoryIndex].spaces.push({
        name: editingSpace.name,
        icon: editingSpace.icon,
        count: editingSpace.count,
      });
    } else {
      // Editing existing space
      newSpaces[editingSpace.categoryIndex].spaces[editingSpace.spaceIndex] = {
        name: editingSpace.name,
        icon: editingSpace.icon,
        count: editingSpace.count,
      };
    }
    
    setSpaces(newSpaces);
    setSpaceDialogOpen(false);
    toast.success(editingSpace.spaceIndex === -1 ? "Space added successfully" : "Space updated successfully");
  };

  const handleDeleteSpace = (categoryIndex: number, spaceIndex: number) => {
    const newSpaces = [...spaces];
    newSpaces[categoryIndex].spaces.splice(spaceIndex, 1);
    setSpaces(newSpaces);
    toast.success("Space deleted successfully");
  };

  // Functions to handle categories
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
    setCategoryDialogOpen(false);
    toast.success("Category added successfully");
  };

  const handleDeleteCategory = (categoryIndex: number) => {
    const newSpaces = [...spaces];
    newSpaces.splice(categoryIndex, 1);
    setSpaces(newSpaces);
    toast.success("Category deleted successfully");
  };

  // Functions to handle posts
  const handleEditPost = (post: ForumPost) => {
    setEditingPost({ ...post });
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
      // Adding new post
      newPosts.unshift(editingPost as ForumPost);
    } else {
      // Updating existing post
      newPosts[postIndex] = editingPost as ForumPost;
    }
    
    setPosts(newPosts);
    setPostDialogOpen(false);
    toast.success(postIndex === -1 ? "Post added successfully" : "Post updated successfully");
  };

  const handleDeletePost = (postId: number) => {
    const newPosts = posts.filter(p => p.id !== postId);
    setPosts(newPosts);
    toast.success("Post deleted successfully");
  };

  // Functions to handle events
  const handleEditEvent = (event: ForumEvent) => {
    setEditingEvent({ ...event });
    setEventDialogOpen(true);
  };

  const handleAddEvent = () => {
    const today = new Date();
    setEditingEvent({
      id: Date.now(),
      date: {
        day: today.getDate(),
        month: today.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      },
      title: "",
      time: "9:00 - 10:00 AM PDT",
    });
    setEventDialogOpen(true);
  };

  const handleSaveEvent = () => {
    if (!editingEvent) return;

    if (!editingEvent.title || !editingEvent.time) {
      toast.error("Title and time are required");
      return;
    }

    const newEvents = [...events];
    const eventIndex = newEvents.findIndex(e => e.id === editingEvent.id);
    
    if (eventIndex === -1) {
      // Adding new event
      newEvents.push(editingEvent as ForumEvent);
    } else {
      // Updating existing event
      newEvents[eventIndex] = editingEvent as ForumEvent;
    }
    
    setEvents(newEvents);
    setEventDialogOpen(false);
    toast.success(eventIndex === -1 ? "Event added successfully" : "Event updated successfully");
  };

  const handleDeleteEvent = (eventId: number) => {
    const newEvents = events.filter(e => e.id !== eventId);
    setEvents(newEvents);
    toast.success("Event deleted successfully");
  };

  // Functions to handle trending posts
  const handleEditTrending = (post: TrendingPost) => {
    setEditingTrending({ ...post });
    setTrendingDialogOpen(true);
  };

  const handleAddTrending = () => {
    setEditingTrending({
      id: Date.now(),
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
    const postIndex = newTrending.findIndex(p => p.id === editingTrending.id);
    
    if (postIndex === -1) {
      // Adding new trending post
      newTrending.push(editingTrending as TrendingPost);
    } else {
      // Updating existing trending post
      newTrending[postIndex] = editingTrending as TrendingPost;
    }
    
    setTrending(newTrending);
    setTrendingDialogOpen(false);
    toast.success(postIndex === -1 ? "Trending post added successfully" : "Trending post updated successfully");
  };

  const handleDeleteTrending = (postId: number) => {
    const newTrending = trending.filter(p => p.id !== postId);
    setTrending(newTrending);
    toast.success("Trending post deleted successfully");
  };

  // Function to save all changes back to forumData.ts
  const handleSaveAll = () => {
    // In a real application, this would send the data to a backend API
    // For now, we'll just show a success message
    toast.success("All changes saved successfully");
    console.log("Spaces:", spaces);
    console.log("Posts:", posts);
    console.log("Events:", events);
    console.log("Trending posts:", trending);
  };

  // Function to move category up or down
  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === spaces.length - 1)) {
      return;
    }
    
    const newSpaces = [...spaces];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap the categories
    [newSpaces[index], newSpaces[targetIndex]] = [newSpaces[targetIndex], newSpaces[index]];
    
    setSpaces(newSpaces);
  };

  // Function to move space up or down within a category
  const handleMoveSpace = (categoryIndex: number, spaceIndex: number, direction: 'up' | 'down') => {
    const categorySpaces = spaces[categoryIndex].spaces;
    
    if ((direction === 'up' && spaceIndex === 0) || 
        (direction === 'down' && spaceIndex === categorySpaces.length - 1)) {
      return;
    }
    
    const newSpaces = [...spaces];
    const targetIndex = direction === 'up' ? spaceIndex - 1 : spaceIndex + 1;
    
    // Swap the spaces
    [newSpaces[categoryIndex].spaces[spaceIndex], newSpaces[categoryIndex].spaces[targetIndex]] = 
    [newSpaces[categoryIndex].spaces[targetIndex], newSpaces[categoryIndex].spaces[spaceIndex]];
    
    setSpaces(newSpaces);
  };

  return (
    <div className="container mx-auto py-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Forum Content Management System</CardTitle>
          <CardDescription>
            Easily manage all your forum content in one place
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={handleSaveAll}>Save All Changes</Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="spaces">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="spaces">Spaces & Categories</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        {/* Spaces Tab */}
        <TabsContent value="spaces">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Forum Spaces & Categories</CardTitle>
                <CardDescription>
                  Manage your forum categories and spaces
                </CardDescription>
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
          </Card>
        </TabsContent>

        {/* Posts Tab */}
        <TabsContent value="posts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Forum Posts</CardTitle>
                <CardDescription>
                  Manage posts that appear in the forum feed
                </CardDescription>
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
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Manage events displayed in the sidebar
                </CardDescription>
              </div>
              <Button onClick={handleAddEvent}>
                <Plus className="h-4 w-4 mr-2" /> Add Event
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-center justify-between border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-16">
                        <div className="text-lg font-bold">{event.date.day}</div>
                        <div className="text-xs text-muted-foreground">{event.date.month}</div>
                      </div>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditEvent(event)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trending Tab */}
        <TabsContent value="trending">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Trending Posts</CardTitle>
                <CardDescription>
                  Manage trending posts displayed in the sidebar
                </CardDescription>
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
          </Card>
        </TabsContent>
      </Tabs>

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
              <Label htmlFor="space-name" className="text-right">
                Name
              </Label>
              <Input
                id="space-name"
                value={editingSpace?.name || ""}
                onChange={(e) => setEditingSpace(prev => prev ? {...prev, name: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="space-icon" className="text-right">
                Icon
              </Label>
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
              <Label htmlFor="space-count" className="text-right">
                Count
              </Label>
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
            <Button variant="outline" onClick={() => setSpaceDialogOpen(false)}>
              Cancel
            </Button>
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
              <Label htmlFor="category-name" className="text-right">
                Name
              </Label>
              <Input
                id="category-name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCategory}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              <Label htmlFor="post-title" className="text-right">
                Title
              </Label>
              <Input
                id="post-title"
                value={editingPost?.title || ""}
                onChange={(e) => setEditingPost(prev => prev ? {...prev, title: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-category" className="text-right">
                Category
              </Label>
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
              <Label htmlFor="post-content" className="text-right pt-2">
                Content
              </Label>
              <Textarea
                id="post-content"
                value={editingPost?.content || ""}
                onChange={(e) => setEditingPost(prev => prev ? {...prev, content: e.target.value} : null)}
                className="col-span-3 min-h-[150px]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-author" className="text-right">
                Author
              </Label>
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
            <Button variant="outline" onClick={() => setPostDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePost}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Dialog */}
      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {events.some(e => e.id === editingEvent?.id) ? "Edit Event" : "Add New Event"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-title" className="text-right">
                Title
              </Label>
              <Input
                id="event-title"
                value={editingEvent?.title || ""}
                onChange={(e) => setEditingEvent(prev => prev ? {...prev, title: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-time" className="text-right">
                Time
              </Label>
              <Input
                id="event-time"
                value={editingEvent?.time || ""}
                onChange={(e) => setEditingEvent(prev => prev ? {...prev, time: e.target.value} : null)}
                placeholder="e.g. 9:00 - 10:00 AM PDT"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="event-day" className="text-right">
                Day
              </Label>
              <Input
                id="event-day"
                type="number"
                min="1"
                max="31"
                value={editingEvent?.date?.day || ""}
                onChange={(e) => setEditingEvent(prev => prev ? {
                  ...prev, 
                  date: {...prev.date!, day: parseInt(e.target.value)}
                } : null)}
                className="col-span-1"
              />
              <Label htmlFor="event-month" className="text-right">
                Month
              </Label>
              <select
                id="event-month"
                value={editingEvent?.date?.month || ""}
                onChange={(e) => setEditingEvent(prev => prev ? {
                  ...prev, 
                  date: {...prev.date!, month: e.target.value}
                } : null)}
                className="col-span-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="JAN">JAN</option>
                <option value="FEB">FEB</option>
                <option value="MAR">MAR</option>
                <option value="APR">APR</option>
                <option value="MAY">MAY</option>
                <option value="JUN">JUN</option>
                <option value="JUL">JUL</option>
                <option value="AUG">AUG</option>
                <option value="SEP">SEP</option>
                <option value="OCT">OCT</option>
                <option value="NOV">NOV</option>
                <option value="DEC">DEC</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEventDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEvent}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              <Label htmlFor="trending-title" className="text-right">
                Title
              </Label>
              <Input
                id="trending-title"
                value={editingTrending?.title || ""}
                onChange={(e) => setEditingTrending(prev => prev ? {...prev, title: e.target.value} : null)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trending-author" className="text-right">
                Author
              </Label>
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
            <Button variant="outline" onClick={() => setTrendingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTrending}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ForumCMS;

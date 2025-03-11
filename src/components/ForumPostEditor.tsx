
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { ForumPost } from "@/lib/forumData";

interface ForumPostEditorProps {
  onPostCreated?: (post: Partial<ForumPost>) => void;
  buttonLabel?: string;
  initialPost?: Partial<ForumPost>;
  isEdit?: boolean;
}

const ForumPostEditor = ({ 
  onPostCreated, 
  buttonLabel = "New post", 
  initialPost,
  isEdit = false
}: ForumPostEditorProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialPost?.title || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const [category, setCategory] = useState(initialPost?.postedIn || "Open Conversation");

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your post");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }

    const newPost = {
      title,
      content,
      postedIn: category,
      timeAgo: "just now",
      likes: 0,
      comments: 0,
      bookmarked: false,
    };

    if (onPostCreated) {
      onPostCreated(newPost);
    }

    toast.success(isEdit ? "Post updated successfully!" : "Post created successfully!");
    setOpen(false);
    
    // Reset form if not editing
    if (!isEdit) {
      setTitle("");
      setContent("");
      setCategory("Open Conversation");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {isEdit ? buttonLabel : <><Plus className="h-4 w-4 mr-2" /> {buttonLabel}</>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit post" : "Create a new post"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="post-category" className="text-right">
              Category
            </Label>
            <select
              id="post-category"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Open Conversation">Open Conversation</option>
              <option value="Meditation Circle">Meditation Circle</option>
              <option value="LYF Course">LYF Course</option>
              <option value="LYF Community">LYF Community</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="post-title" className="text-right">
              Title
            </Label>
            <Input 
              id="post-title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="post-content" className="text-right">
              Content
            </Label>
            <Textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="col-span-3 min-h-[150px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {isEdit ? "Save changes" : "Create post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForumPostEditor;

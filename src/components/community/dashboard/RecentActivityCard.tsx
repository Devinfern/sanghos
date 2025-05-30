
import { Clock, MessageSquare, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCommunityPosts } from "@/hooks/useCommunityPosts";

interface RecentActivityCardProps {
  onSectionChange: (section: string) => void;
}

const RecentActivityCard = ({ onSectionChange }: RecentActivityCardProps) => {
  const { posts } = useCommunityPosts("", "");

  return (
    <Card className="bento-card col-span-full bg-white border-brand-subtle/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl">
          <Clock className="h-5 w-5 mr-2 text-brand-primary" />
          Recent Community Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {posts.slice(0, 3).map((post, index) => (
            <div key={index} className="p-4 rounded-xl hover:bg-brand-subtle/5 transition-colors cursor-pointer border border-brand-subtle/10">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-brand-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-brand-dark mb-1 line-clamp-2">{post.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    by {post.user_profiles?.username || 'Anonymous'} • {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <Badge variant="outline" className="text-xs bg-brand-subtle/10 border-brand-subtle/30">
                    {post.category}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full py-3 rounded-xl hover:bg-brand-subtle/10 transition-colors"
          onClick={() => onSectionChange("discussions")}
        >
          View All Activity
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;

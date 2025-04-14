
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { TrendingPost } from "@/lib/forumData";

interface CommunityMembersProps {
  trendingPosts: TrendingPost[];
}

const CommunityMembers = ({ trendingPosts }: CommunityMembersProps) => {
  return (
    <Card className="overflow-hidden border border-brand-subtle/30 shadow-sm">
      <div className="p-4 border-b border-brand-subtle/30 bg-brand-subtle/10">
        <h3 className="font-semibold text-brand-dark">Trending Posts</h3>
      </div>
      <div className="divide-y divide-brand-subtle/30">
        {trendingPosts.map((post) => (
          <div key={post.id} className="p-4 flex items-center gap-3 hover:bg-brand-subtle/5 transition-colors">
            <Avatar className="h-10 w-10 border-2 border-brand-subtle/30">
              <img src={post.avatar} alt={post.author} />
            </Avatar>
            <div>
              <h4 className="text-sm font-medium text-brand-dark">{post.title}</h4>
              <p className="text-xs text-brand-slate">{post.author}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CommunityMembers;

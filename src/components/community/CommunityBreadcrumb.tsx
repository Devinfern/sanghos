
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CommunityBreadcrumbProps {
  activeSection: string;
  currentSpace?: string;
  currentPost?: string;
}

const CommunityBreadcrumb = ({
  activeSection,
  currentSpace,
  currentPost
}: CommunityBreadcrumbProps) => {
  const getSectionTitle = (section: string) => {
    switch (section) {
      case "dashboard":
        return "Dashboard";
      case "discussions":
        return "Discussions";
      case "events":
        return "Events";
      case "retreats":
        return "Retreats";
      case "resources":
        return "Resources";
      case "members":
        return "Members";
      default:
        return "Community";
    }
  };

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink 
            href="/community" 
            className="flex items-center text-brand-primary hover:text-brand-dark transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            Community
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {activeSection !== "dashboard" && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {currentSpace || currentPost ? (
                <BreadcrumbLink 
                  href={`/community?section=${activeSection}`}
                  className="text-brand-primary hover:text-brand-dark transition-colors"
                >
                  {getSectionTitle(activeSection)}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-brand-dark font-medium">
                  {getSectionTitle(activeSection)}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {currentSpace && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {currentPost ? (
                <BreadcrumbLink 
                  href={`/community/space/${currentSpace.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-brand-primary hover:text-brand-dark transition-colors"
                >
                  {currentSpace}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="text-brand-dark font-medium">
                  {currentSpace}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {currentPost && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-brand-dark font-medium truncate max-w-[200px]">
                {currentPost}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CommunityBreadcrumb;

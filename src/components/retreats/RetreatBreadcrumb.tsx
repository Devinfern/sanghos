
import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

interface RetreatBreadcrumbProps {
  activeTab?: string;
  searchQuery?: string;
  selectedCategory?: string | null;
}

const RetreatBreadcrumb: React.FC<RetreatBreadcrumbProps> = ({ 
  activeTab = "all", 
  searchQuery, 
  selectedCategory 
}) => {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className="flex items-center">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Retreats</BreadcrumbPage>
        </BreadcrumbItem>
        {activeTab !== "all" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">
                {activeTab === "sanghos" ? "Sanghos" : "Partner"} Retreats
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
        {selectedCategory && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedCategory}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
        {searchQuery && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Search: "{searchQuery}"</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default RetreatBreadcrumb;

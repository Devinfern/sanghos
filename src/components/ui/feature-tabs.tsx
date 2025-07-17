
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Layout, Pointer, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AIRetreatFinderWidget from "@/components/ai/AIRetreatFinderWidget";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface FeatureTabsProps {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const FeatureTabs = ({
  badge = "Features",
  heading = "Transform Your Wellness Journey",
  description = "Discover the power of our comprehensive wellness platform.",
  tabs = [
    {
      value: "tab-1",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "AI-Powered Matching",
      content: {
        badge: "Smart Technology",
        title: "Find Your Perfect Retreat",
        description:
          "Our AI analyzes your preferences, goals, and lifestyle to match you with retreats that align perfectly with your wellness journey.",
        buttonText: "Try AI Matching",
        imageSrc: "/lovable-uploads/96b3ade1-573a-4ad1-982b-e36418466313.png",
        imageAlt: "AI-powered retreat matching",
      },
    },
    {
      value: "tab-2",
      icon: <Pointer className="h-auto w-4 shrink-0" />,
      label: "Curated Experiences",
      content: {
        badge: "Expert Curation",
        title: "Premium Wellness Experiences",
        description:
          "Every retreat is carefully vetted by wellness experts to ensure you receive transformative, high-quality experiences that deliver real results.",
        buttonText: "Explore Retreats",
        imageSrc: "/lovable-uploads/6f3e15d7-ded9-44d1-b616-98e32efd7326.png",
        imageAlt: "Curated wellness experiences",
      },
    },
    {
      value: "tab-3",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: "Community Support",
      content: {
        badge: "Connected Wellness",
        title: "Join a Thriving Community",
        description:
          "Connect with like-minded individuals, share your journey, and find ongoing support in our vibrant wellness community.",
        buttonText: "Join Community",
        imageSrc: "/lovable-uploads/a049189f-8c74-4fdc-882b-aae9abe5ddad.png",
        imageAlt: "Wellness community support",
      },
    },
  ],
}: FeatureTabsProps) => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <Badge variant="outline" className="text-brand-primary border-brand-primary">{badge}</Badge>
          <h2 className="max-w-4xl text-4xl md:text-6xl font-bold text-brand-dark">
            {heading}
          </h2>
          <p className="text-xl text-brand-slate max-w-3xl">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10 bg-brand-subtle/20 p-2 rounded-2xl">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-brand-slate data-[state=active]:bg-white data-[state=active]:text-brand-primary data-[state=active]:shadow-md transition-all duration-300"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-12 max-w-screen-xl rounded-3xl bg-brand-subtle/10 p-8 lg:p-16">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-16"
              >
                <div className="flex flex-col gap-6">
                  <Badge variant="outline" className="w-fit bg-white text-brand-primary border-brand-primary">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-bold lg:text-5xl text-brand-dark">
                    {tab.content.title}
                  </h3>
                  <p className="text-brand-slate lg:text-lg leading-relaxed">
                    {tab.content.description}
                  </p>
                  {tab.value === "tab-1" ? (
                    <div className="mt-4">
                      <AIRetreatFinderWidget variant="inline" />
                    </div>
                  ) : (
                    <Button className="mt-4 w-fit gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full px-8 py-6 text-lg font-medium" size="lg">
                      {tab.content.buttonText}
                    </Button>
                  )}
                </div>
                <div className="relative">
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    className="rounded-3xl shadow-lg w-full h-auto object-cover"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { FeatureTabs };

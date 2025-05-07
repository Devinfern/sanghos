
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, Settings, FilePlus, ListChecks } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CommunityCMS = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Forum Management",
      description: "Create and moderate community discussions"
    },
    {
      icon: Users,
      title: "User Management",
      description: "Manage community members and permissions"
    },
    {
      icon: ListChecks,
      title: "Content Moderation",
      description: "Review and approve community content"
    },
    {
      icon: FilePlus,
      title: "Resource Library",
      description: "Upload and manage community resources"
    }
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-brand-dark mb-2">Community Management</h1>
              <p className="text-muted-foreground">Tools to grow and nurture your wellness community</p>
            </div>
            <Button className="bg-brand-primary hover:bg-brand-primary/90">
              <Settings className="mr-2 h-4 w-4" />
              Configure Settings
            </Button>
          </div>
          
          <div className="bg-brand-light border border-brand-sand/20 rounded-xl p-8 mb-12">
            <div className="flex items-center justify-center flex-col text-center p-8">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users size={32} className="text-brand-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-brand-dark">Community Management Coming Soon</h2>
              <p className="text-muted-foreground max-w-xl mb-6">
                Our comprehensive suite of community management tools is under development. 
                You'll soon be able to create, moderate, and grow your wellness community with ease.
              </p>
              <Button className="bg-brand-primary hover:bg-brand-primary/90">
                Join the Waitlist
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 border border-brand-sand/10 rounded-lg bg-white">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon size={20} className="text-brand-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-brand-dark">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CommunityCMS;

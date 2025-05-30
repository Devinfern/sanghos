
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatePicker } from '@/components/ui/date-picker';
import { toast } from 'sonner';
import { WellnessModule, SelectedModule } from '@/types/wellness';
import ModuleLibrary from './ModuleLibrary';
import RetreatSchedule from './RetreatSchedule';
import PricingCalculator from './PricingCalculator';

interface RetreatBuilderProps {
  onSave: (retreatData: any) => void;
  onCancel: () => void;
}

const RetreatBuilder: React.FC<RetreatBuilderProps> = ({ onSave, onCancel }) => {
  const [activeTab, setActiveTab] = useState("modules");
  const [selectedModules, setSelectedModules] = useState<SelectedModule[]>([]);
  
  // Basic retreat info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [capacity, setCapacity] = useState<number>(20);
  const [location, setLocation] = useState({
    name: "",
    address: "",
    city: "",
    state: ""
  });

  const handleAddModule = (module: WellnessModule) => {
    const isAlreadySelected = selectedModules.some(selected => selected.id === module.id);
    
    if (isAlreadySelected) {
      toast.info("Module already added to retreat");
      return;
    }

    const selectedModule: SelectedModule = {
      ...module,
      customDuration: module.default_duration,
      sortOrder: selectedModules.length
    };

    setSelectedModules(prev => [...prev, selectedModule]);
    toast.success(`${module.name} added to retreat`);
    
    // Auto-advance to schedule tab after adding first module
    if (selectedModules.length === 0) {
      setTimeout(() => setActiveTab("schedule"), 500);
    }
  };

  const handleUpdateModule = (moduleId: string, updates: Partial<SelectedModule>) => {
    setSelectedModules(prev => 
      prev.map(module => 
        module.id === moduleId ? { ...module, ...updates } : module
      )
    );
  };

  const handleRemoveModule = (moduleId: string) => {
    setSelectedModules(prev => prev.filter(module => module.id !== moduleId));
    toast.success("Module removed from retreat");
  };

  const handleReorderModules = (modules: SelectedModule[]) => {
    setSelectedModules(modules);
  };

  const calculateTotalPrice = () => {
    return selectedModules.reduce((total, module) => {
      const durationRatio = module.customDuration / module.default_duration;
      return total + (module.base_price * durationRatio);
    }, 0);
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Please enter a retreat title");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a retreat description");
      return;
    }

    if (!date) {
      toast.error("Please select a retreat date");
      return;
    }

    if (selectedModules.length === 0) {
      toast.error("Please add at least one module to your retreat");
      return;
    }

    if (!location.name.trim() || !location.city.trim()) {
      toast.error("Please fill in location details");
      return;
    }

    const totalDuration = selectedModules.reduce((total, module) => total + module.customDuration, 0);
    const totalPrice = calculateTotalPrice();

    const retreatData = {
      title,
      description,
      date: date.toISOString().split('T')[0],
      time: selectedModules[0]?.startTime || "09:00",
      duration: `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`,
      price: totalPrice,
      capacity,
      remaining: capacity,
      location: {
        name: location.name,
        address: location.address,
        city: location.city,
        state: location.state,
        description: `${location.name}, ${location.city}, ${location.state}`
      },
      category: [...new Set(selectedModules.map(m => m.category))],
      amenities: [
        ...new Set(selectedModules.flatMap(m => m.equipment_needed)),
        "Professional instruction",
        "All materials included"
      ],
      modules: selectedModules,
      featured: false,
      isSanghos: true
    };

    onSave(retreatData);
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Retreat Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Retreat Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter retreat title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity *</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                max="100"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value) || 20)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your retreat experience"
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date *</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h4 className="font-medium">Location Details *</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location-name">Venue Name</Label>
                <Input
                  id="location-name"
                  value={location.name}
                  onChange={(e) => setLocation(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Studio or venue name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location-address">Address</Label>
                <Input
                  id="location-address"
                  value={location.address}
                  onChange={(e) => setLocation(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Street address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location-city">City</Label>
                <Input
                  id="location-city"
                  value={location.city}
                  onChange={(e) => setLocation(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="City"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location-state">State</Label>
                <Input
                  id="location-state"
                  value={location.state}
                  onChange={(e) => setLocation(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="State"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Builder Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="modules">1. Add Modules</TabsTrigger>
          <TabsTrigger value="schedule">2. Schedule</TabsTrigger>
          <TabsTrigger value="pricing">3. Pricing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="modules" className="space-y-4">
          <ModuleLibrary 
            selectedModules={selectedModules}
            onAddModule={handleAddModule}
          />
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-4">
          <RetreatSchedule
            selectedModules={selectedModules}
            onUpdateModule={handleUpdateModule}
            onRemoveModule={handleRemoveModule}
            onReorderModules={handleReorderModules}
          />
        </TabsContent>
        
        <TabsContent value="pricing" className="space-y-4">
          <PricingCalculator 
            selectedModules={selectedModules}
            capacity={capacity}
          />
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={selectedModules.length === 0}>
          Create Retreat
        </Button>
      </div>
    </div>
  );
};

export default RetreatBuilder;

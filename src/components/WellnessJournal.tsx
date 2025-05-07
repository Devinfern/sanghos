
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { retreats } from "@/lib/data";
import JournalTabs from "./journal/JournalTabs";
import JournalHistory from "./journal/JournalHistory";
import JournalInput from "./journal/JournalInput";
import LocationSelector from "./journal/LocationSelector";
import RetreatRecommendationCard from "./journal/RetreatRecommendationCard";

interface JournalEntry {
  id: string;
  content: string;
  createdAt: string;
  prompt?: string;
}

interface RetreatRecommendation {
  retreatId: string;
  title: string;
  matchScore: number;
  reason: string;
  location?: string;
  date?: string;
  time?: string;
  description?: string;
  url?: string;
  image?: string;
  category?: string[];
}

const wellnessPrompts = [
  "What are you grateful for today?", 
  "How are you taking care of your body this week?", 
  "What's one area of your wellness journey you'd like to explore more?", 
  "Describe a moment of peace you experienced recently.", 
  "What's causing you stress right now, and how might you address it?", 
  "How connected do you feel to your community lately?", 
  "What type of movement would feel good for your body today?", 
  "Describe your ideal wellness retreat experience.", 
  "What self-care practice would you like to develop?", 
  "How has your relationship with mindfulness changed recently?"
];

export default function WellnessJournal() {
  const [journalEntry, setJournalEntry] = useState("");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<RetreatRecommendation[]>([]);
  const [isJournalSubmitted, setIsJournalSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const [userLocation, setUserLocation] = useState<string>("");
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const randomPrompt = wellnessPrompts[Math.floor(Math.random() * wellnessPrompts.length)];
    setSelectedPrompt(randomPrompt);
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries));
    }
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setUserLocation(savedLocation);
    } else {
      detectUserLocation();
    }
  }, []);

  const detectUserLocation = () => {
    setIsLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14&addressdetails=1`
          );
          if (response.ok) {
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || data.address.county;
            const state = data.address.state;
            const country = data.address.country;
            const locationString = city ? `${city}, ${state || country}` : `${state}, ${country}`;
            setUserLocation(locationString);
            localStorage.setItem("userLocation", locationString);
          } else {
            setUserLocation("San Francisco, CA");
          }
        } catch (error) {
          console.error("Error getting location details:", error);
          setUserLocation("San Francisco, CA");
        } finally {
          setIsLocationLoading(false);
        }
      }, error => {
        console.error("Error getting geolocation:", error);
        setUserLocation("San Francisco, CA");
        setIsLocationLoading(false);
      });
    } else {
      setUserLocation("San Francisco, CA");
      setIsLocationLoading(false);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLocation(e.target.value);
    localStorage.setItem("userLocation", e.target.value);
  };

  const saveJournalEntry = () => {
    if (journalEntry.trim().length < 10) {
      toast.error("Please write at least a few sentences in your journal entry.");
      return;
    }
    
    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      content: journalEntry,
      createdAt: new Date().toISOString(),
      prompt: selectedPrompt
    };
    
    const updatedEntries = [newEntry, ...journalEntries];
    setJournalEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    
    toast.success("Journal entry saved successfully!");
    analyzeJournal(journalEntry);
  };

  const analyzeJournal = async (entry: string) => {
    if (entry.trim().length < 20) {
      toast.error("Please write at least a few sentences to get personalized recommendations.");
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const extractKeywords = (text: string): string[] => {
        const wellnessKeywords = [
          "yoga", "meditation", "mindfulness", "stress", "anxiety", 
          "wellness", "health", "fitness", "nature", "outdoors", 
          "breathing", "relaxation", "community", "healing", "therapy", 
          "mental health", "exercise", "movement", "peace", "balance"
        ];
        const lowerText = text.toLowerCase();
        return wellnessKeywords.filter(keyword => lowerText.includes(keyword));
      };
      
      const keywords = extractKeywords(entry);
      console.log("Extracted keywords:", keywords);
      
      const now = new Date();
      const startDatetime = now.toISOString();
      const endDate = new Date();
      endDate.setDate(now.getDate() + 7);
      const endDatetime = endDate.toISOString();
      
      if (userLocation) {
        try {
          const { data, error } = await supabase.functions.invoke('fetch-local-events', {
            body: {
              location: userLocation,
              interests: keywords,
              startDatetime,
              endDatetime
            }
          });
          
          if (error) throw new Error(error.message);
          
          if (data && data.recommendations && data.recommendations.length > 0) {
            console.log("Events received from API:", data.recommendations);
            setRecommendations(data.recommendations);
          } else {
            toast.info("No local wellness events found for your area. Showing retreat recommendations instead.");
            const mockRecommendations = generateMockRecommendations(entry);
            setRecommendations(mockRecommendations);
          }
        } catch (apiError: any) {
          console.error("Error fetching local events:", apiError);
          setError(apiError.message);
          toast.error(`Couldn't find local events: ${apiError.message}`);
          const mockRecommendations = generateMockRecommendations(entry);
          setRecommendations(mockRecommendations);
        }
      } else {
        const mockRecommendations = generateMockRecommendations(entry);
        setRecommendations(mockRecommendations);
      }
    } catch (error: any) {
      console.error("Error analyzing journal entry:", error);
      setError(error.message);
      toast.error("Something went wrong analyzing your journal. Please try again.");
      const mockRecommendations = generateMockRecommendations(entry);
      setRecommendations(mockRecommendations);
    } finally {
      setIsJournalSubmitted(true);
      setActiveTab("recommendations");
      setIsAnalyzing(false);
    }
  };

  const generateMockRecommendations = (journal: string): RetreatRecommendation[] => {
    const text = journal.toLowerCase();
    const availableRetreats = retreats.slice(0, 3);
    
    const stressKeywords = ["stress", "anxiety", "overwhelmed", "busy", "pressure", "tense"];
    const meditationKeywords = ["meditation", "mindful", "peace", "calm", "quiet", "reflect"];
    const natureKeywords = ["nature", "outdoor", "forest", "hike", "mountain", "fresh air"];
    const healingKeywords = ["healing", "sound", "therapy", "recover", "restore", "rejuvenate"];
    
    const getMatchScore = (keywords: string[]): number => {
      const matches = keywords.filter(word => text.includes(word)).length;
      return Math.min(0.5 + matches * 0.1, 0.95);
    };
    
    const generateReason = (retreatId: string): string => {
      switch (retreatId) {
        case "ret-1":
          return text.includes("stress") || text.includes("anxiety") 
            ? "This retreat focuses on mindfulness practices that can help reduce the anxiety and stress you mentioned." 
            : "The mindfulness practices in this retreat align with your wellness goals and could bring the calm you're seeking.";
        case "ret-2":
          return text.includes("relax") || text.includes("tension") 
            ? "Sound healing can deeply address the tension and help you relax as you mentioned in your journal." 
            : "The sound healing techniques offered would provide the restorative experience you're looking for.";
        case "ret-3":
          return text.includes("nature") || text.includes("connect") 
            ? "This retreat offers the nature connection experience you're seeking, combined with gentle movement practices." 
            : "The forest setting and qigong practice would help you reconnect with both nature and yourself.";
        default:
          return "This retreat aligns well with your current wellness needs.";
      }
    };
    
    return availableRetreats.map(retreat => {
      let score = 0.7;
      if (retreat.id === "ret-1") {
        score = getMatchScore(meditationKeywords);
      } else if (retreat.id === "ret-2") {
        score = getMatchScore(healingKeywords);
      } else if (retreat.id === "ret-3") {
        score = getMatchScore(natureKeywords);
      }
      
      const locations = ["Portland, OR", "Seattle, WA", "San Francisco, CA", "Los Angeles, CA"];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      
      const currentDate = new Date();
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 30) + 1);
      const formattedDate = futureDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      
      const hours = Math.floor(Math.random() * 12) + 1;
      const minutes = Math.random() < 0.5 ? '00' : '30';
      const ampm = Math.random() < 0.5 ? 'AM' : 'PM';
      const time = `${hours}:${minutes} ${ampm}`;
      
      return {
        retreatId: retreat.id,
        title: retreat.title,
        matchScore: score,
        reason: generateReason(retreat.id),
        location: randomLocation,
        date: formattedDate,
        time: time,
        image: retreat.imageSrc
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const handleReset = () => {
    setJournalEntry("");
    setRecommendations([]);
    setIsJournalSubmitted(false);
    setActiveTab("write");
    setError(null);
    
    const randomPrompt = wellnessPrompts[Math.floor(Math.random() * wellnessPrompts.length)];
    setSelectedPrompt(randomPrompt);
  };

  const navigateToRetreat = (retreatId: string) => {
    const recommendation = recommendations.find(rec => rec.retreatId === retreatId);
    if (recommendation && recommendation.url) {
      window.open(recommendation.url, '_blank');
    } else {
      navigate(`/retreat/${retreatId}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Card 
      className="w-full border-none shadow-lg bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden relative"
    >
      <CardContent className="p-0">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-brand-primary/10 to-brand-peach/10 rounded-t-xl flex items-center justify-center">
          <div className="flex items-center gap-2 text-brand-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Wellness Journal</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
        
        <div className="pt-20 px-6 pb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <JournalTabs 
              hasRecommendations={recommendations.length > 0} 
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
    
            <TabsContent value="write" className="focus-visible:outline-none">
              <div className="space-y-6">
                <JournalInput 
                  value={journalEntry}
                  placeholder={selectedPrompt}
                  onChange={setJournalEntry}
                  onRefresh={() => {
                    const randomPrompt = wellnessPrompts[Math.floor(Math.random() * wellnessPrompts.length)];
                    setSelectedPrompt(randomPrompt);
                  }}
                  onSubmit={saveJournalEntry}
                  isDisabled={isAnalyzing}
                />
                
                <div className="p-4 bg-sage-50/50 rounded-lg border border-sage-100/40">
                  <LocationSelector 
                    location={userLocation}
                    isLoading={isLocationLoading}
                    onChange={handleLocationChange}
                    onDetect={detectUserLocation}
                    isDisabled={isAnalyzing}
                  />
                </div>
              </div>
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="text-center space-y-3 p-6 max-w-md">
                    <div className="relative mx-auto w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-sage-300 animate-spin"></div>
                      <div className="absolute inset-2 rounded-full border-t-2 border-brand-primary animate-spin"></div>
                      <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-brand-primary animate-pulse" />
                    </div>
                    <h3 className="text-lg font-medium text-sage-800">Analyzing your wellness journal</h3>
                    <p className="text-sage-600">Finding personalized retreat recommendations based on your thoughts and preferences</p>
                  </div>
                </div>
              )}
            </TabsContent>
    
            <TabsContent value="history" className="min-h-[400px] focus-visible:outline-none">
              <JournalHistory entries={journalEntries} onAnalyze={analyzeJournal} formatDate={formatDate} />
            </TabsContent>
    
            <TabsContent value="recommendations" className="min-h-[400px] focus-visible:outline-none">
              {recommendations.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-4">
                  <MapPin className="h-8 w-8 text-sage-400 mb-3" />
                  <h3 className="text-lg font-medium text-sage-700 mb-2">No recommendations yet</h3>
                  <p className="text-sage-600 max-w-sm">
                    {error 
                      ? `We encountered an issue: ${error}` 
                      : "Write in your journal to receive personalized retreat recommendations based on your wellness needs."}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("write")}
                    className="mt-4 border-sage-300 text-sage-700"
                  >
                    Start Journaling
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-sage-900">
                        {recommendations[0].url
                          ? `Wellness Events Near ${userLocation}`
                          : 'Retreat Recommendations'}
                      </h3>
                      <p className="text-sm text-sage-600">
                        Based on your wellness journal
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-2">
                    {recommendations.map((recommendation, index) => (
                      <RetreatRecommendationCard
                        key={recommendation.retreatId}
                        recommendation={recommendation}
                        index={index}
                        onNavigate={navigateToRetreat}
                      />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center px-6 py-4 border-t border-sage-100 bg-sage-50/50">
        <div className="text-xs text-sage-500">
          {recommendations.length > 0 
            ? `${recommendations.length} wellness ${recommendations.length === 1 ? 'option' : 'options'} found for you` 
            : 'Share your thoughts to get personalized recommendations'}
        </div>
        
        <Button 
          variant="ghost" 
          onClick={handleReset} 
          className="text-sage-600 hover:text-sage-800 hover:bg-sage-100 group"
        >
          <span className="flex items-center gap-1">
            New Entry
            <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-all 
              group-hover:translate-x-0.5" />
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}

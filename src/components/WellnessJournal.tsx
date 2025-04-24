import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Layout, Pointer, Zap, ArrowRight, Book, Sparkles, MapPin, Calendar, Clock, ExternalLink, Search, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { retreats } from "@/lib/data";
import JournalEntryForm from "./journal/JournalEntryForm";
import JournalHistory from "./journal/JournalHistory";
import EventRecommendations from "./journal/EventRecommendations";
import JournalTabs from "./journal/JournalTabs";

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

const wellnessPrompts = ["What are you grateful for today?", "How are you taking care of your body this week?", "What's one area of your wellness journey you'd like to explore more?", "Describe a moment of peace you experienced recently.", "What's causing you stress right now, and how might you address it?", "How connected do you feel to your community lately?", "What type of movement would feel good for your body today?", "Describe your ideal wellness retreat experience.", "What self-care practice would you like to develop?", "How has your relationship with mindfulness changed recently?"];

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
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [eventError, setEventError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
          const {
            latitude,
            longitude
          } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14&addressdetails=1`);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJournalEntry(e.target.value);
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
    setIsLoadingEvents(true);
    setEventError(null);
    try {
      const extractKeywords = (text: string): string[] => {
        const wellnessKeywords = ["yoga", "meditation", "mindfulness", "stress", "anxiety", "wellness", "health", "fitness", "nature", "outdoors", "breathing", "relaxation", "community", "healing", "therapy", "mental health", "exercise", "movement", "peace", "balance"];
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
          const {
            data,
            error
          } = await supabase.functions.invoke('fetch-local-events', {
            body: {
              location: userLocation,
              interests: keywords,
              startDatetime,
              endDatetime
            }
          });
          if (error) throw new Error(error.message);
          if (data && data.recommendations) {
            console.log("Events received from API:", data.recommendations);
            if (data.recommendations.length > 0) {
              setRecommendations(data.recommendations);
              setIsJournalSubmitted(true);
              setActiveTab("recommendations");
              setIsAnalyzing(false);
              setIsLoadingEvents(false);
              return;
            }
          }
          toast.info("No local wellness events found for your area. Showing retreat recommendations instead.");
          const mockRecommendations = generateMockRecommendations(entry);
          setRecommendations(mockRecommendations);
        } catch (apiError: any) {
          console.error("Error fetching local events:", apiError);
          setEventError(apiError.message);
          toast.error(`Couldn't find local events: ${apiError.message}`);
          const mockRecommendations = generateMockRecommendations(entry);
          setRecommendations(mockRecommendations);
        }
      }
    } catch (error: any) {
      console.error("Error analyzing journal entry:", error);
      setEventError(error.message);
      toast.error("Something went wrong analyzing your journal. Please try again.");
      const mockRecommendations = generateMockRecommendations(entry);
      setRecommendations(mockRecommendations);
    } finally {
      setIsJournalSubmitted(true);
      setActiveTab("recommendations");
      setIsAnalyzing(false);
      setIsLoadingEvents(false);
    }
  };

  const fetchRetreatRecommendations = async (
    journalText: string,
    location: string,
    interests: string[]
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching events with:", { location, interests });
      
      const { data, error } = await supabase.functions.invoke("fetch-local-events", {
        body: {
          location,
          interests,
          startDatetime: new Date().toISOString(),
        },
      });

      console.log("Edge function response:", data, error);
      
      if (error) {
        console.error("Error calling edge function:", error);
        setError(`Error fetching events: ${error.message}`);
        setRecommendations([]);
      } else {
        if (data?.recommendations && data.recommendations.length > 0) {
          setRecommendations(data.recommendations);
        } else {
          setRecommendations([]);
          setError("No events found matching your criteria. Try broadening your search.");
        }
      }
    } catch (err) {
      console.error("Error in fetchRetreatRecommendations:", err);
      setError(`Failed to fetch events: ${err.message}`);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const generateMockRecommendations = (journal: string): RetreatRecommendation[] => {
    const text = journal.toLowerCase();
    const availableRetreats = retreats.slice(0, 3);
    const stressKeywords = ["stress", "anxiety", "overwhelmed", "busy", "pressure", "tense"];
    const meditationKeywords = ["meditation", "mindful", "peace", "calm", "quiet", "reflect"];
    const natureKeywords = ["nature", "outdoor", "forest", "hike", "mountain", "fresh air"];
    const healingKeywords = ["healing", "sound", "therapy", "recover", "restore", "rejuvenate"];
    const communityKeywords = ["community", "connection", "together", "social", "group", "belong"];
    const getMatchScore = (keywords: string[]): number => {
      const matches = keywords.filter(word => text.includes(word)).length;
      return Math.min(0.5 + matches * 0.1, 0.95);
    };
    const generateReason = (retreatId: string, score: number): string => {
      switch (retreatId) {
        case "ret-1":
          return text.includes("stress") || text.includes("anxiety") ? "This retreat focuses on mindfulness practices that can help reduce the anxiety and stress you mentioned." : "The mindfulness practices in this retreat align with your wellness goals and could bring the calm you're seeking.";
        case "ret-2":
          return text.includes("relax") || text.includes("tension") ? "Sound healing can deeply address the tension and help you relax as you mentioned in your journal." : "The sound healing techniques offered would provide the restorative experience you're looking for.";
        case "ret-3":
          return text.includes("nature") || text.includes("connect") ? "This retreat offers the nature connection experience you're seeking, combined with gentle movement practices." : "The forest setting and qigong practice would help you reconnect with both nature and yourself.";
        case "ret-4":
          return text.includes("balance") || text.includes("peace") ? "This mountain yoga experience directly addresses your desire for balance and inner peace." : "The mountain setting provides a perfect backdrop for finding the peace and perspective you're seeking.";
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
      } else if (retreat.id === "ret-4") {
        score = getMatchScore(stressKeywords);
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
        reason: generateReason(retreat.id, score),
        location: randomLocation,
        date: formattedDate,
        time: time
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const handleReset = () => {
    setJournalEntry("");
    setRecommendations([]);
    setIsJournalSubmitted(false);
    setActiveTab("write");
    setEventError(null);
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
      className="w-full border-sage-200/30 shadow-lg bg-gradient-to-br from-sage-50 to-sage-100/80 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-sky/20 opacity-50 pointer-events-none" />
      
      <CardContent className="relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 mt-[180px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-36 left-0 right-0 z-20"
          >
            <JournalTabs 
              hasRecommendations={recommendations.length > 0} 
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </motion.div>

          <TabsContent value="write" className="mt-8">
            <div className="relative">
              <div className="absolute -top-8 left-0 right-0 bg-brand-primary/10 rounded-t-xl p-2 text-center">
                <div className="flex items-center justify-center gap-2 text-brand-primary">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-semibold">Your Wellness Insight Starts Here</span>
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              
              <JournalEntryForm 
                isAnalyzing={isAnalyzing} 
                journalEntry={journalEntry} 
                selectedPrompt={selectedPrompt} 
                userLocation={userLocation} 
                isLocationLoading={isLocationLoading} 
                onJournalChange={setJournalEntry} 
                onLocationChange={handleLocationChange} 
                onLocationDetect={detectUserLocation} 
                onNewPrompt={() => {
                  const randomPrompt = wellnessPrompts[Math.floor(Math.random() * wellnessPrompts.length)];
                  setSelectedPrompt(randomPrompt);
                }} 
                onSave={saveJournalEntry} 
              />
            </div>
          </TabsContent>

          <TabsContent value="history">
            <JournalHistory entries={journalEntries} onAnalyze={analyzeJournal} formatDate={formatDate} />
          </TabsContent>

          <TabsContent value="recommendations">
            <EventRecommendations isLoading={isLoadingEvents} recommendations={recommendations} userLocation={userLocation} error={eventError} onRetry={handleReset} onNavigateToRetreat={navigateToRetreat} />
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-sage-200/20 pt-4 relative z-10">
        <div className="text-xs text-sage-500">
          {recommendations.length > 0 
            ? `${recommendations.length} event${recommendations.length === 1 ? '' : 's'} found based on your journal` 
            : 'Share your thoughts to get personalized event recommendations'}
        </div>
        
        <Button 
          variant="ghost" 
          onClick={handleReset} 
          className="text-sage-600 hover:text-sage-700 hover:bg-sage-50 group"
        >
          Start New Entry
          <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </CardFooter>
    </Card>
  );
}

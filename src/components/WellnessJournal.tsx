import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { retreats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Layout, Pointer, Zap, ArrowRight, Book, Sparkles, MapPin, Calendar, Clock, ExternalLink, Search, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

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

  return (
    <Card className="w-full border-sage-200/30 shadow-lg bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto bg-sage-100/50 w-fit p-2 rounded-full">
          <Layout className="w-5 h-5 text-sage-600" />
        </div>
        <CardTitle className="text-2xl font-semibold text-sage-900">
          Wellness Journal
        </CardTitle>
        <CardDescription className="text-sage-600 max-w-lg mx-auto">
          Express yourself and discover local wellness events that align with your journey
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-center mb-8">
            <TabsList className="grid grid-cols-3 gap-4 p-1 bg-transparent">
              <TabsTrigger value="write" className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white p-3 shadow-md hover:bg-sage-50 data-[state=active]:bg-sage-700 data-[state=active]:text-white">
                <Pencil className="h-5 w-5" />
                <span className="text-sm font-medium">Write</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white p-3 shadow-md hover:bg-sage-50 data-[state=active]:bg-sage-700 data-[state=active]:text-white">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">History</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" disabled={recommendations.length === 0} className="flex flex-col items-center justify-center gap-1 rounded-lg bg-white p-3 shadow-md hover:bg-sage-50 data-[state=active]:bg-sage-700 data-[state=active]:text-white disabled:opacity-50 disabled:cursor-not-allowed my-0 py-[14px]">
                <Zap className="h-5 w-5" />
                <span className="text-sm font-medium">Local Events</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="write" className="space-y-4">
            {isAnalyzing ? <div className="min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <Spinner className="mx-auto mb-4 h-8 w-8 text-sage-600" />
                  <p className="text-sage-600">Analyzing your wellness aspirations...</p>
                </div>
              </div> : <div className="space-y-6 my-[60px]">
                <div className="bg-sage-50 p-4 rounded-lg border border-sage-200/50 text-sage-800 my-0">
                  <p className="font-medium mb-1">Today's Prompt</p>
                  <p className="italic">{selectedPrompt}</p>
                </div>
                
                <Textarea placeholder="Start writing your thoughts here..." value={journalEntry} onChange={handleInputChange} className="min-h-[200px] p-4 text-sage-900 border-sage-200" />

                <div className="bg-sage-50 p-4 rounded-lg border border-sage-200/50 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                    <label htmlFor="location" className="text-sm font-medium text-sage-700">Your Location</label>
                    <div className="flex items-center gap-2 flex-grow sm:max-w-xs">
                      <input type="text" id="location" value={userLocation} onChange={handleLocationChange} placeholder="Enter your location" className="px-3 py-1 text-sm border rounded-md flex-grow" disabled={isLocationLoading} />
                      <Button type="button" variant="outline" size="sm" onClick={detectUserLocation} disabled={isLocationLoading} className="border-sage-300 text-sage-700 hover:bg-sage-50">
                        {isLocationLoading ? <Spinner className="h-4 w-4" /> : "Detect"}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-sage-500">
                    We'll use your location to find relevant wellness events near you
                  </p>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => {
                const randomPrompt = wellnessPrompts[Math.floor(Math.random() * wellnessPrompts.length)];
                setSelectedPrompt(randomPrompt);
              }} className="border-sage-300 text-sage-700 hover:bg-sage-50">
                    New Prompt
                  </Button>
                  <Button onClick={saveJournalEntry} className="bg-sage-700 hover:bg-sage-800 text-white flex items-center gap-2" disabled={journalEntry.trim().length < 10}>
                    <span>Save & Find Events</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {journalEntries.length === 0 ? <div className="text-center py-12 text-sage-600">
                <Book className="mx-auto h-12 w-12 mb-4 text-sage-400" />
                <h3 className="text-lg font-medium mb-2">No journal entries yet</h3>
                <p>Start writing to create your wellness journey</p>
              </div> : <div className="space-y-4">
                {journalEntries.map(entry => <Card key={entry.id} className="border-sage-200/20 hover:border-sage-300/50 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-sm font-medium text-sage-500">
                          {formatDate(entry.createdAt)}
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-sage-600 hover:text-sage-700" onClick={() => analyzeJournal(entry.content)}>
                          <Sparkles className="h-4 w-4 mr-1" /> Analyze
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {entry.prompt && <div className="mb-2 text-sm italic text-sage-600">
                          Prompt: {entry.prompt}
                        </div>}
                      <p className="text-sage-800 line-clamp-3">{entry.content}</p>
                    </CardContent>
                  </Card>)}
              </div>}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            {isLoadingEvents ? <div className="min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <Spinner className="mx-auto mb-4 h-8 w-8 text-sage-600" />
                  <p className="text-sage-600">Finding events near you...</p>
                </div>
              </div> : recommendations.length > 0 ? <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-sage-900">
                    {recommendations[0].url ? 'Wellness Events Near ' + userLocation : 'Retreat Recommendations'}
                  </h3>
                </div>
                
                {recommendations.map((rec, index) => <motion.div key={rec.retreatId} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.3,
              delay: index * 0.1
            }}>
                    <Card className="border border-sage-200/20 hover:border-sage-300/30 transition-all duration-300 hover:shadow-md overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {rec.image && <div className="md:w-1/4 h-40 md:h-auto">
                            <img src={rec.image} alt={rec.title} className="w-full h-full object-cover" onError={e => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86";
                    }} />
                          </div>}
                        
                        <CardContent className={cn("pt-6 space-y-4", rec.image ? "md:w-3/4" : "w-full")}>
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-lg text-sage-900">{rec.title}</h4>
                            <div className="bg-sage-100/50 text-sage-700 text-sm py-1 px-3 rounded-full">
                              {Math.round(rec.matchScore * 100)}% match
                            </div>
                          </div>
                          
                          <p className="text-sage-600">{rec.reason}</p>
                          
                          {rec.description && <p className="text-sage-700 text-sm line-clamp-2">{rec.description}</p>}
                          
                          {(rec.location || rec.date || rec.time) && <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-sage-50/50 p-3 rounded-lg">
                              {rec.location && <div className="flex items-center text-sage-700">
                                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span className="text-sm">{rec.location}</span>
                                </div>}
                              {rec.date && <div className="flex items-center text-sage-700">
                                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span className="text-sm">{rec.date}</span>
                                </div>}
                              {rec.time && <div className="flex items-center text-sage-700">
                                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                                  <span className="text-sm">{rec.time}</span>
                                </div>}
                            </div>}
                          
                          <div className="flex justify-end">
                            <Button variant="outline" onClick={() => navigateToRetreat(rec.retreatId)} className="border-sage-300 text-sage-700 hover:bg-sage-50 hover:text-sage-800">
                              {rec.url ? <>
                                  View Event
                                  <ExternalLink className="ml-2 h-4 w-4" />
                                </> : <>
                                  View Retreat
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </>}
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>)}
              </div> : <div className="text-center py-12">
                {eventError ? <div className="space-y-3">
                    <Search className="h-12 w-12 mx-auto text-sage-400" />
                    <p className="text-sage-700 font-medium">Unable to find events</p>
                    <p className="text-sage-600 max-w-md mx-auto text-sm">{eventError}</p>
                    <Button variant="outline" onClick={handleReset} className="mt-4">
                      Try Again
                    </Button>
                  </div> : <p className="text-sage-600">No matching events found yet. Write in your journal to get recommendations.</p>}
              </div>}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-sage-200/20 pt-4">
        <div className="text-xs text-sage-500">
          {recommendations.length > 0 ? `${recommendations.length} event${recommendations.length === 1 ? '' : 's'} found based on your journal` : 'Share your thoughts to get personalized event recommendations'}
        </div>
        
        <Button variant="ghost" onClick={handleReset} className="text-sage-600 hover:text-sage-700 hover:bg-sage-50">
          Start New Entry
        </Button>
      </CardFooter>
    </Card>
  );
}


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { retreats } from "@/lib/data";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

// Type for retreat recommendation
interface RetreatRecommendation {
  retreatId: string;
  title: string;
  matchScore: number;
  reason: string;
}

export default function WellnessJournal() {
  const [journalEntry, setJournalEntry] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<RetreatRecommendation[]>([]);
  const [isJournalSubmitted, setIsJournalSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJournalEntry(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await analyzeJournal();
  };

  const analyzeJournal = async () => {
    if (journalEntry.trim().length < 20) {
      toast.error("Please write at least a few sentences to get a personalized recommendation.");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Instead of calling the API, we'll generate mock recommendations
      // Short timeout to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate retreat recommendations based on journal content
      const mockRecommendations: RetreatRecommendation[] = generateMockRecommendations(journalEntry);
      
      setRecommendations(mockRecommendations);
      setIsJournalSubmitted(true);
    } catch (error) {
      console.error("Error analyzing journal entry:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Function to generate mock recommendations based on journal content
  const generateMockRecommendations = (journal: string): RetreatRecommendation[] => {
    const text = journal.toLowerCase();
    const availableRetreats = retreats.slice(0, 3); // Use the first 3 retreats from data
    
    // Check for keywords in the journal entry to personalize recommendations
    const stressKeywords = ["stress", "anxiety", "overwhelmed", "busy", "pressure", "tense"];
    const meditationKeywords = ["meditation", "mindful", "peace", "calm", "quiet", "reflect"];
    const natureKeywords = ["nature", "outdoor", "forest", "hike", "mountain", "fresh air"];
    const healingKeywords = ["healing", "sound", "therapy", "recover", "restore", "rejuvenate"];
    
    // Calculate match scores based on keyword matches
    const getMatchScore = (keywords: string[]): number => {
      const matches = keywords.filter(word => text.includes(word)).length;
      return Math.min(0.5 + (matches * 0.1), 0.95); // Base 0.5 + 0.1 per match, max 0.95
    };
    
    // Generate personalized reasons based on content
    const generateReason = (retreatId: string, score: number): string => {
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
        case "ret-4":
          return text.includes("balance") || text.includes("peace")
            ? "This mountain yoga experience directly addresses your desire for balance and inner peace."
            : "The mountain setting provides a perfect backdrop for finding the peace and perspective you're seeking.";
        default:
          return "This retreat aligns well with your current wellness needs.";
      }
    };
    
    // Create recommendations with different scores based on journal content
    return availableRetreats.map(retreat => {
      let score = 0.7; // Default score
      
      if (retreat.id === "ret-1") {
        // Mindfulness retreat
        score = getMatchScore(meditationKeywords);
      } else if (retreat.id === "ret-2") {
        // Sound healing retreat
        score = getMatchScore(healingKeywords);
      } else if (retreat.id === "ret-3") {
        // Nature retreat
        score = getMatchScore(natureKeywords);
      } else if (retreat.id === "ret-4") {
        // Mountain yoga retreat
        score = getMatchScore(stressKeywords);
      }
      
      return {
        retreatId: retreat.id,
        title: retreat.title,
        matchScore: score,
        reason: generateReason(retreat.id, score)
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const handleReset = () => {
    setJournalEntry("");
    setRecommendations([]);
    setIsJournalSubmitted(false);
  };

  const navigateToRetreat = (retreatId: string) => {
    navigate(`/retreat/${retreatId}`);
  };

  // Wellness journal placeholders
  const journalPlaceholders = [
    "How are you feeling today?",
    "What's been on your mind lately?",
    "What kind of wellness experience are you seeking?",
    "Describe your ideal retreat experience...",
    "What aspects of wellness do you want to focus on?"
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white border-brand-subtle/30 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-brand-primary">
          Wellness Journal
        </CardTitle>
        <CardDescription>
          Share your thoughts and feelings to receive personalized retreat recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isJournalSubmitted ? (
          <div className="space-y-4">
            {isAnalyzing ? (
              <div className="min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <Spinner className="mx-auto mb-4 h-8 w-8" />
                  <p className="text-muted-foreground">Analyzing your journal entry...</p>
                </div>
              </div>
            ) : (
              <PlaceholdersAndVanishInput 
                placeholders={journalPlaceholders}
                onChange={handleInputChange}
                onSubmit={handleFormSubmit}
              />
            )}
            {journalEntry.length > 0 && !isAnalyzing && (
              <Button 
                onClick={() => analyzeJournal()}
                className="w-full bg-brand-primary hover:bg-brand-primary/90"
              >
                Get Personalized Retreat Recommendations
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-brand-subtle/10 p-4 rounded-lg">
              <h3 className="font-medium text-lg text-brand-primary mb-2">Your Wellness Analysis</h3>
              <p className="text-muted-foreground">Based on your journal entry, we've found retreats that align with your current needs and interests.</p>
            </div>
            
            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <Card key={rec.retreatId} className="border border-brand-subtle/20 hover:border-brand-primary/30 transition-all">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-lg mb-2">{rec.title}</h4>
                      <p className="text-muted-foreground mb-3">{rec.reason}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-brand-primary/10 text-brand-primary text-sm py-1 px-3 rounded-full">
                            {Math.round(rec.matchScore * 100)}% match
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          onClick={() => navigateToRetreat(rec.retreatId)}
                          className="border-brand-primary text-brand-primary hover:bg-brand-primary/5"
                        >
                          View Retreat
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No matching retreats found. Try writing more about your wellness goals.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t border-brand-subtle/10 pt-4">
        {isJournalSubmitted && (
          <Button variant="ghost" onClick={handleReset}>
            Start Over
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

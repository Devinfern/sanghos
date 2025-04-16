
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { retreats } from "@/lib/data";

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

  const analyzeJournal = async () => {
    if (journalEntry.trim().length < 20) {
      toast.error("Please write at least a few sentences to get a personalized recommendation.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-journal", {
        body: { journalEntry },
      });

      if (error) throw error;

      // Process and display recommendations
      if (data && data.recommendations) {
        // Map API recommendations to actual retreat data
        const retreatRecommendations = data.recommendations.map((rec: any) => {
          const retreat = retreats.find(r => r.id === rec.retreatId);
          if (!retreat) return null;
          
          return {
            retreatId: rec.retreatId,
            title: retreat.title,
            matchScore: rec.matchScore,
            reason: rec.reason
          };
        }).filter(Boolean);
        
        setRecommendations(retreatRecommendations);
        setIsJournalSubmitted(true);
      }
    } catch (error) {
      console.error("Error analyzing journal entry:", error);
      toast.error("Unable to analyze your entry. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setJournalEntry("");
    setRecommendations([]);
    setIsJournalSubmitted(false);
  };

  const navigateToRetreat = (retreatId: string) => {
    navigate(`/retreat/${retreatId}`);
  };

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
            <Textarea
              placeholder="How are you feeling today? What's on your mind? What kind of wellness experience are you seeking?"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="min-h-[200px] p-4 text-brand-dark"
            />
            <Button 
              onClick={analyzeJournal}
              disabled={isAnalyzing || journalEntry.length < 20}
              className="w-full bg-brand-primary hover:bg-brand-primary/90"
            >
              {isAnalyzing ? (
                <>
                  <Spinner className="mr-2" /> Analyzing...
                </>
              ) : (
                "Get Personalized Retreat Recommendations"
              )}
            </Button>
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

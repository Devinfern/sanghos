
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { retreats } from "@/lib/data";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
      await new Promise(resolve => setTimeout(resolve, 1000));
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

  const journalPlaceholders = ["How are you feeling today?", "What's been on your mind lately?", "What kind of wellness experience are you seeking?", "Describe your ideal retreat experience...", "What aspects of wellness do you want to focus on?"];

  return (
    <Card className="w-full border-sage-200/30 shadow-lg bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto bg-sage-100/50 w-fit p-2 rounded-full">
          <Sparkles className="w-5 h-5 text-sage-600" />
        </div>
        <CardTitle className="text-2xl font-semibold text-sage-900">
          Share Your Journey
        </CardTitle>
        <CardDescription className="text-sage-600 max-w-lg mx-auto">
          Express your wellness aspirations and let our AI guide you to transformative experiences
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {!isJournalSubmitted ? (
          <div className="space-y-4">
            {isAnalyzing ? (
              <div className="min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <Spinner className="mx-auto mb-4 h-8 w-8 text-sage-600" />
                  <p className="text-sage-600">Analyzing your wellness aspirations...</p>
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
                className="w-full bg-sage-700 hover:bg-sage-800 text-white font-medium"
              >
                Find Your Perfect Retreat
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-sage-50/50 p-6 rounded-xl border border-sage-200/50">
              <h3 className="font-medium text-lg mb-2 text-sage-800">Your Wellness Analysis</h3>
              <p className="text-sage-700">Based on your journal entry, we've found retreats that align with your wellness journey.</p>
            </div>
            
            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={rec.retreatId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card
                      className="border border-sage-200/20 hover:border-sage-300/30 transition-all duration-300 hover:shadow-md"
                    >
                      <CardContent className="pt-6">
                        <h4 className="font-semibold text-lg mb-2 text-sage-900">{rec.title}</h4>
                        <p className="text-sage-600 mb-4">{rec.reason}</p>
                        <div className="flex justify-between items-center">
                          <div className="bg-sage-100/50 text-sage-700 text-sm py-1 px-3 rounded-full">
                            {Math.round(rec.matchScore * 100)}% match
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => navigateToRetreat(rec.retreatId)}
                            className="border-sage-300 text-sage-700 hover:bg-sage-50 hover:text-sage-800"
                          >
                            View Retreat
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sage-600">No matching retreats found. Try writing more about your wellness goals.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t border-sage-200/20 pt-4">
        {isJournalSubmitted && (
          <Button variant="ghost" onClick={handleReset} className="text-sage-600 hover:text-sage-700 hover:bg-sage-50">
            Start Over
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

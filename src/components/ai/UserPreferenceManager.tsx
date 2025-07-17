import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Settings, Save, X, Plus, History, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserPreferences {
  interests: string[];
  budget: string;
  location: string;
  duration: string;
  groupSize: string;
  experience: string;
  previousSearches: string[];
  conversationContext: string;
}

interface UserPreferenceManagerProps {
  currentPreferences?: Partial<UserPreferences>;
  onPreferencesUpdate?: (preferences: UserPreferences) => void;
  variant?: 'compact' | 'expanded';
}

const UserPreferenceManager = ({ 
  currentPreferences = {},
  onPreferencesUpdate,
  variant = 'compact'
}: UserPreferenceManagerProps) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: [],
    budget: '',
    location: '',
    duration: '',
    groupSize: '',
    experience: '',
    previousSearches: [],
    conversationContext: '',
    ...currentPreferences
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const [user, setUser] = useState<any>(null);

  const budgetOptions = [
    { value: 'under_100', label: 'Under $100' },
    { value: '100_300', label: '$100 - $300' },
    { value: '300_500', label: '$300 - $500' },
    { value: 'over_500', label: 'Over $500' }
  ];

  const durationOptions = [
    { value: 'half_day', label: 'Half Day (4 hours)' },
    { value: 'full_day', label: 'Full Day (8 hours)' },
    { value: 'weekend', label: 'Weekend (2 days)' },
    { value: 'week', label: 'Week (7 days)' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'all_levels', label: 'All Levels' }
  ];

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        await loadUserPreferences(user.id);
      }
    };
    
    getUser();
  }, []);

  const loadUserPreferences = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading user preferences:', error);
        return;
      }

      if (data) {
        // Load preferences from user profile or localStorage
        const savedPreferences = localStorage.getItem(`userPreferences_${userId}`);
        if (savedPreferences) {
          const parsed = JSON.parse(savedPreferences);
          setPreferences(prev => ({ ...prev, ...parsed }));
        }
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
  };

  const saveUserPreferences = async () => {
    if (!user) {
      toast.error('Please sign in to save preferences');
      return;
    }

    setIsSaving(true);
    try {
      // Save to localStorage for now (could be enhanced with database storage)
      localStorage.setItem(`userPreferences_${user.id}`, JSON.stringify(preferences));
      
      // Update conversation context
      const contextData = {
        ...preferences,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(`aiConversationContext_${user.id}`, JSON.stringify(contextData));
      
      toast.success('Preferences saved successfully');
      onPreferencesUpdate?.(preferences);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !preferences.interests.includes(newInterest.trim())) {
      setPreferences(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleInputChange = (field: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (variant === 'compact') {
    return (
      <Card className="border-brand-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-medium text-brand-dark">Your Preferences</h3>
                <p className="text-sm text-sage-600">
                  {preferences.interests.length} interests saved
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="outline"
              className="border-brand-primary/20 text-brand-primary hover:bg-brand-primary/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-brand-primary/20">
        <CardHeader className="bg-gradient-to-r from-brand-primary/5 to-brand-peach/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-brand-dark">
                  Your Retreat Preferences
                </CardTitle>
                <p className="text-sm text-sage-600 mt-1">
                  Help us find better matches for you
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    size="sm"
                    className="border-sage-200"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={saveUserPreferences}
                    disabled={isSaving}
                    size="sm"
                    className="bg-brand-primary hover:bg-brand-primary/90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  size="sm"
                  variant="outline"
                  className="border-brand-primary/20 text-brand-primary hover:bg-brand-primary/10"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                {/* Interests */}
                <div>
                  <label className="text-sm font-medium text-brand-dark mb-3 block">
                    Interests & Activities
                  </label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="Add interest (e.g., meditation, yoga)"
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    />
                    <Button
                      onClick={addInterest}
                      size="sm"
                      variant="outline"
                      className="border-brand-primary/20 text-brand-primary hover:bg-brand-primary/10"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="bg-brand-primary/10 text-brand-primary cursor-pointer hover:bg-red-100 hover:text-red-700"
                        onClick={() => removeInterest(interest)}
                      >
                        {interest}
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="text-sm font-medium text-brand-dark mb-2 block">
                    Budget Range
                  </label>
                  <Select
                    value={preferences.budget}
                    onValueChange={(value) => handleInputChange('budget', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium text-brand-dark mb-2 block">
                    Preferred Location
                  </label>
                  <Input
                    value={preferences.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., San Francisco, CA or within 50 miles"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="text-sm font-medium text-brand-dark mb-2 block">
                    Preferred Duration
                  </label>
                  <Select
                    value={preferences.duration}
                    onValueChange={(value) => handleInputChange('duration', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="text-sm font-medium text-brand-dark mb-2 block">
                    Experience Level
                  </label>
                  <Select
                    value={preferences.experience}
                    onValueChange={(value) => handleInputChange('experience', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="viewing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-brand-dark mb-2">Interests</p>
                    <div className="flex flex-wrap gap-1">
                      {preferences.interests.length > 0 ? (
                        preferences.interests.map((interest) => (
                          <Badge key={interest} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-sage-500">None set</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-dark mb-2">Budget</p>
                    <span className="text-sm text-sage-600">
                      {preferences.budget ? 
                        budgetOptions.find(b => b.value === preferences.budget)?.label || preferences.budget 
                        : 'Not specified'
                      }
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-dark mb-2">Location</p>
                    <span className="text-sm text-sage-600">
                      {preferences.location || 'Not specified'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-dark mb-2">Experience</p>
                    <span className="text-sm text-sage-600">
                      {preferences.experience ? 
                        experienceOptions.find(e => e.value === preferences.experience)?.label || preferences.experience 
                        : 'Not specified'
                      }
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserPreferenceManager;
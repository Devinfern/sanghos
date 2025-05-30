export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      community_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          likes: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          id?: string
          likes?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          likes?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      direct_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean
          recipient_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean
          recipient_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean
          recipient_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      event_bookings: {
        Row: {
          attendees: number
          created_at: string
          email: string
          event_id: string
          first_name: string
          id: string
          last_name: string
          payment_intent_id: string | null
          phone: string
          special_requests: string | null
          status: string
          stripe_session_id: string | null
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          attendees?: number
          created_at?: string
          email: string
          event_id: string
          first_name: string
          id?: string
          last_name: string
          payment_intent_id?: string | null
          phone: string
          special_requests?: string | null
          status?: string
          stripe_session_id?: string | null
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          attendees?: number
          created_at?: string
          email?: string
          event_id?: string
          first_name?: string
          id?: string
          last_name?: string
          payment_intent_id?: string | null
          phone?: string
          special_requests?: string | null
          status?: string
          stripe_session_id?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      forum_events: {
        Row: {
          capacity: number | null
          created_at: string
          date_day: number
          date_month: string
          description: string | null
          id: string
          instructor_name: string | null
          location: string | null
          price: number | null
          remaining: number | null
          retreat_id: string | null
          time: string
          title: string
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          date_day: number
          date_month: string
          description?: string | null
          id?: string
          instructor_name?: string | null
          location?: string | null
          price?: number | null
          remaining?: number | null
          retreat_id?: string | null
          time: string
          title: string
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          created_at?: string
          date_day?: number
          date_month?: string
          description?: string | null
          id?: string
          instructor_name?: string | null
          location?: string | null
          price?: number | null
          remaining?: number | null
          retreat_id?: string | null
          time?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      forum_posts: {
        Row: {
          author_avatar: string
          author_id: string | null
          author_name: string
          author_role: string
          author_tag: string | null
          bookmarked: boolean | null
          comments: number | null
          content: string
          created_at: string
          id: string
          likes: number | null
          posted_in: string
          title: string
          updated_at: string
        }
        Insert: {
          author_avatar: string
          author_id?: string | null
          author_name: string
          author_role: string
          author_tag?: string | null
          bookmarked?: boolean | null
          comments?: number | null
          content: string
          created_at?: string
          id?: string
          likes?: number | null
          posted_in: string
          title: string
          updated_at?: string
        }
        Update: {
          author_avatar?: string
          author_id?: string | null
          author_name?: string
          author_role?: string
          author_tag?: string | null
          bookmarked?: boolean | null
          comments?: number | null
          content?: string
          created_at?: string
          id?: string
          likes?: number | null
          posted_in?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      forum_spaces: {
        Row: {
          category: string
          count: number | null
          created_at: string
          icon: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          count?: number | null
          created_at?: string
          icon: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          count?: number | null
          created_at?: string
          icon?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      retreat_modules: {
        Row: {
          created_at: string
          custom_description: string | null
          custom_duration: number
          custom_name: string | null
          custom_price: number | null
          id: string
          module_id: string
          retreat_id: string
          scheduled_date: string | null
          scheduled_start_time: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          custom_description?: string | null
          custom_duration: number
          custom_name?: string | null
          custom_price?: number | null
          id?: string
          module_id: string
          retreat_id: string
          scheduled_date?: string | null
          scheduled_start_time?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          custom_description?: string | null
          custom_duration?: number
          custom_name?: string | null
          custom_price?: number | null
          id?: string
          module_id?: string
          retreat_id?: string
          scheduled_date?: string | null
          scheduled_start_time?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "retreat_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "wellness_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retreat_modules_retreat_id_fkey"
            columns: ["retreat_id"]
            isOneToOne: false
            referencedRelation: "retreats"
            referencedColumns: ["id"]
          },
        ]
      }
      retreat_template_modules: {
        Row: {
          created_at: string
          custom_duration: number
          id: string
          module_id: string
          scheduled_date: string | null
          scheduled_start_time: string | null
          sort_order: number
          template_id: string
        }
        Insert: {
          created_at?: string
          custom_duration: number
          id?: string
          module_id: string
          scheduled_date?: string | null
          scheduled_start_time?: string | null
          sort_order?: number
          template_id: string
        }
        Update: {
          created_at?: string
          custom_duration?: number
          id?: string
          module_id?: string
          scheduled_date?: string | null
          scheduled_start_time?: string | null
          sort_order?: number
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "retreat_template_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "wellness_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retreat_template_modules_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "retreat_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      retreat_templates: {
        Row: {
          category: string | null
          created_at: string
          creator_id: string
          description: string | null
          difficulty_level: string
          estimated_price: number | null
          id: string
          is_public: boolean
          name: string
          total_duration: number | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          creator_id: string
          description?: string | null
          difficulty_level?: string
          estimated_price?: number | null
          id?: string
          is_public?: boolean
          name: string
          total_duration?: number | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          creator_id?: string
          description?: string | null
          difficulty_level?: string
          estimated_price?: number | null
          id?: string
          is_public?: boolean
          name?: string
          total_duration?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      retreats: {
        Row: {
          additional_images: string[] | null
          amenities: string[] | null
          capacity: number
          category: string[]
          created_at: string
          date: string
          description: string
          duration: string
          featured: boolean | null
          id: string
          image: string
          instructor_id: string | null
          is_sanghos: boolean | null
          location_address: string | null
          location_city: string
          location_description: string | null
          location_name: string
          location_state: string
          price: number
          remaining: number
          time: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          additional_images?: string[] | null
          amenities?: string[] | null
          capacity: number
          category: string[]
          created_at?: string
          date: string
          description: string
          duration: string
          featured?: boolean | null
          id?: string
          image: string
          instructor_id?: string | null
          is_sanghos?: boolean | null
          location_address?: string | null
          location_city: string
          location_description?: string | null
          location_name: string
          location_state: string
          price: number
          remaining: number
          time: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          additional_images?: string[] | null
          amenities?: string[] | null
          capacity?: number
          category?: string[]
          created_at?: string
          date?: string
          description?: string
          duration?: string
          featured?: boolean | null
          id?: string
          image?: string
          instructor_id?: string | null
          is_sanghos?: boolean | null
          location_address?: string | null
          location_city?: string
          location_description?: string | null
          location_name?: string
          location_state?: string
          price?: number
          remaining?: number
          time?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      trending_posts: {
        Row: {
          author: string
          avatar: string
          created_at: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          avatar: string
          created_at?: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          avatar?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          expertise: string[] | null
          full_name: string | null
          id: string
          is_wellness_practitioner: boolean | null
          updated_at: string
          username: string
          years_experience: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          expertise?: string[] | null
          full_name?: string | null
          id: string
          is_wellness_practitioner?: boolean | null
          updated_at?: string
          username: string
          years_experience?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          expertise?: string[] | null
          full_name?: string | null
          id?: string
          is_wellness_practitioner?: boolean | null
          updated_at?: string
          username?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      wellness_events: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          event_date: string
          id: string
          location: string
          max_participants: number | null
          price: number | null
          title: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          event_date: string
          id?: string
          location: string
          max_participants?: number | null
          price?: number | null
          title: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          event_date?: string
          id?: string
          location?: string
          max_participants?: number | null
          price?: number | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      wellness_modules: {
        Row: {
          base_price: number
          category: string
          created_at: string
          default_duration: number
          description: string
          difficulty_level: string
          equipment_needed: string[] | null
          id: string
          image_url: string | null
          instructor_specialties: string[] | null
          max_duration: number
          max_participants: number | null
          min_duration: number
          name: string
          space_requirements: string | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          base_price?: number
          category: string
          created_at?: string
          default_duration: number
          description: string
          difficulty_level?: string
          equipment_needed?: string[] | null
          id?: string
          image_url?: string | null
          instructor_specialties?: string[] | null
          max_duration?: number
          max_participants?: number | null
          min_duration?: number
          name: string
          space_requirements?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          base_price?: number
          category?: string
          created_at?: string
          default_duration?: number
          description?: string
          difficulty_level?: string
          equipment_needed?: string[] | null
          id?: string
          image_url?: string | null
          instructor_specialties?: string[] | null
          max_duration?: number
          max_participants?: number | null
          min_duration?: number
          name?: string
          space_requirements?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_email: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

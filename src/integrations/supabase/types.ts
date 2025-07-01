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
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string | null
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
          category: string | null
          content: string
          created_at: string
          id: string
          likes: number | null
          retreat_id: string | null
          retreat_phase: string | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          likes?: number | null
          retreat_id?: string | null
          retreat_phase?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          likes?: number | null
          retreat_id?: string | null
          retreat_phase?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          certificate_issued: boolean | null
          completed: boolean | null
          completed_at: string | null
          course_id: string | null
          created_at: string
          id: string
          progress: number | null
          user_id: string | null
        }
        Insert: {
          certificate_issued?: boolean | null
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          created_at?: string
          id?: string
          progress?: number | null
          user_id?: string | null
        }
        Update: {
          certificate_issued?: boolean | null
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          created_at?: string
          id?: string
          progress?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "wellness_courses"
            referencedColumns: ["id"]
          },
        ]
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
          payment_status: string | null
          phone: string | null
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
          payment_status?: string | null
          phone?: string | null
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
          payment_status?: string | null
          phone?: string | null
          special_requests?: string | null
          status?: string
          stripe_session_id?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string | null
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
          is_pinned: boolean | null
          likes: number | null
          posted_in: string
          title: string
          updated_at: string
          user_id: string | null
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
          is_pinned?: boolean | null
          likes?: number | null
          posted_in: string
          title: string
          updated_at?: string
          user_id?: string | null
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
          is_pinned?: boolean | null
          likes?: number | null
          posted_in?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      host_earnings: {
        Row: {
          amount: number
          booking_id: string | null
          commission_amount: number
          created_at: string
          host_id: string | null
          id: string
          payout_date: string | null
          status: Database["public"]["Enums"]["commission_status"]
          stripe_transfer_id: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          commission_amount: number
          created_at?: string
          host_id?: string | null
          id?: string
          payout_date?: string | null
          status?: Database["public"]["Enums"]["commission_status"]
          stripe_transfer_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          commission_amount?: number
          created_at?: string
          host_id?: string | null
          id?: string
          payout_date?: string | null
          status?: Database["public"]["Enums"]["commission_status"]
          stripe_transfer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "host_earnings_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "hosts"
            referencedColumns: ["id"]
          },
        ]
      }
      hosts: {
        Row: {
          bio: string | null
          business_email: string
          business_name: string
          commission_rate: number | null
          created_at: string
          id: string
          phone: string | null
          specialties: string[] | null
          status: Database["public"]["Enums"]["host_status"]
          stripe_account_id: string | null
          updated_at: string
          user_id: string | null
          verification_documents: string[] | null
          years_experience: number | null
        }
        Insert: {
          bio?: string | null
          business_email: string
          business_name: string
          commission_rate?: number | null
          created_at?: string
          id?: string
          phone?: string | null
          specialties?: string[] | null
          status?: Database["public"]["Enums"]["host_status"]
          stripe_account_id?: string | null
          updated_at?: string
          user_id?: string | null
          verification_documents?: string[] | null
          years_experience?: number | null
        }
        Update: {
          bio?: string | null
          business_email?: string
          business_name?: string
          commission_rate?: number | null
          created_at?: string
          id?: string
          phone?: string | null
          specialties?: string[] | null
          status?: Database["public"]["Enums"]["host_status"]
          stripe_account_id?: string | null
          updated_at?: string
          user_id?: string | null
          verification_documents?: string[] | null
          years_experience?: number | null
        }
        Relationships: []
      }
      premium_content: {
        Row: {
          content_id: string | null
          content_type: string
          created_at: string
          id: string
          required_tier: Database["public"]["Enums"]["subscription_tier"]
          title: string
        }
        Insert: {
          content_id?: string | null
          content_type: string
          created_at?: string
          id?: string
          required_tier?: Database["public"]["Enums"]["subscription_tier"]
          title: string
        }
        Update: {
          content_id?: string | null
          content_type?: string
          created_at?: string
          id?: string
          required_tier?: Database["public"]["Enums"]["subscription_tier"]
          title?: string
        }
        Relationships: []
      }
      retreats: {
        Row: {
          amenities: string[] | null
          capacity: number
          category: string[] | null
          created_at: string
          date: string
          description: string
          duration: string
          featured: boolean | null
          id: string
          image: string
          location_address: string | null
          location_city: string
          location_name: string
          location_state: string
          price: number
          remaining: number
          time: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amenities?: string[] | null
          capacity: number
          category?: string[] | null
          created_at?: string
          date: string
          description: string
          duration: string
          featured?: boolean | null
          id?: string
          image: string
          location_address?: string | null
          location_city: string
          location_name: string
          location_state: string
          price: number
          remaining: number
          time: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amenities?: string[] | null
          capacity?: number
          category?: string[] | null
          created_at?: string
          date?: string
          description?: string
          duration?: string
          featured?: boolean | null
          id?: string
          image?: string
          location_address?: string | null
          location_city?: string
          location_name?: string
          location_state?: string
          price?: number
          remaining?: number
          time?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: Database["public"]["Enums"]["subscription_tier"]
          trial_end: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          trial_end?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          trial_end?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          is_wellness_practitioner: boolean | null
          updated_at: string
          user_id: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_wellness_practitioner?: boolean | null
          updated_at?: string
          user_id?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_wellness_practitioner?: boolean | null
          updated_at?: string
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      wellness_courses: {
        Row: {
          certificate_template: string | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          duration_hours: number | null
          id: string
          instructor_id: string | null
          is_premium: boolean | null
          materials_url: string | null
          price: number | null
          published: boolean | null
          tags: string[] | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          certificate_template?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration_hours?: number | null
          id?: string
          instructor_id?: string | null
          is_premium?: boolean | null
          materials_url?: string | null
          price?: number | null
          published?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          certificate_template?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration_hours?: number | null
          id?: string
          instructor_id?: string | null
          is_premium?: boolean | null
          materials_url?: string | null
          price?: number | null
          published?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      wellness_modules: {
        Row: {
          category: string
          content: string | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          duration_minutes: number | null
          id: string
          materials: string[] | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          id?: string
          materials?: string[] | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          id?: string
          materials?: string[] | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      user_has_subscription_tier: {
        Args: {
          required_tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Returns: boolean
      }
    }
    Enums: {
      commission_status: "pending" | "paid" | "cancelled"
      host_status: "pending" | "approved" | "suspended" | "rejected"
      subscription_tier: "free" | "basic" | "premium" | "enterprise"
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
    Enums: {
      commission_status: ["pending", "paid", "cancelled"],
      host_status: ["pending", "approved", "suspended", "rejected"],
      subscription_tier: ["free", "basic", "premium", "enterprise"],
    },
  },
} as const

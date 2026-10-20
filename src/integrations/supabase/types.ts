export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      integration_events: {
        Row: {
          created_at: string
          detail: string | null
          http_status: number | null
          id: string
          operation: string
          outcome: string
          provider: string
          quote_request_id: string | null
        }
        Insert: {
          created_at?: string
          detail?: string | null
          http_status?: number | null
          id?: string
          operation: string
          outcome: string
          provider: string
          quote_request_id?: string | null
        }
        Update: {
          created_at?: string
          detail?: string | null
          http_status?: number | null
          id?: string
          operation?: string
          outcome?: string
          provider?: string
          quote_request_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_events_quote_request_id_fkey"
            columns: ["quote_request_id"]
            isOneToOne: false
            referencedRelation: "quote_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_requests: {
        Row: {
          attribution: Json
          company: string | null
          consent_at: string | null
          consent_contact: boolean
          consent_marketing: boolean
          created_at: string
          crm_lead_status: Database["public"]["Enums"]["crm_lead_status"]
          delivery_mode: string | null
          email: string | null
          full_name: string
          id: string
          idempotency_key: string | null
          location_lat: number | null
          location_lng: number | null
          location_text: string
          maps_link: string | null
          notes: string | null
          offloading_needed: string | null
          phone: string
          preferred_contact: Database["public"]["Enums"]["contact_method"]
          pricing_status: string
          product: string
          quantity: string | null
          reatech_attempts: number
          reatech_last_attempt_at: string | null
          reatech_last_error: string | null
          reatech_submission_ref: string | null
          reatech_sync_status: Database["public"]["Enums"]["reatech_sync_status"]
          reference: string
          site_access: string | null
          source_page: string | null
          status: Database["public"]["Enums"]["quote_status"]
          timeframe: string | null
          unit: string | null
          updated_at: string
        }
        Insert: {
          attribution?: Json
          company?: string | null
          consent_at?: string | null
          consent_contact?: boolean
          consent_marketing?: boolean
          created_at?: string
          crm_lead_status?: Database["public"]["Enums"]["crm_lead_status"]
          delivery_mode?: string | null
          email?: string | null
          full_name: string
          id?: string
          idempotency_key?: string | null
          location_lat?: number | null
          location_lng?: number | null
          location_text: string
          maps_link?: string | null
          notes?: string | null
          offloading_needed?: string | null
          phone: string
          preferred_contact?: Database["public"]["Enums"]["contact_method"]
          pricing_status?: string
          product: string
          quantity?: string | null
          reatech_attempts?: number
          reatech_last_attempt_at?: string | null
          reatech_last_error?: string | null
          reatech_submission_ref?: string | null
          reatech_sync_status?: Database["public"]["Enums"]["reatech_sync_status"]
          reference?: string
          site_access?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          timeframe?: string | null
          unit?: string | null
          updated_at?: string
        }
        Update: {
          attribution?: Json
          company?: string | null
          consent_at?: string | null
          consent_contact?: boolean
          consent_marketing?: boolean
          created_at?: string
          crm_lead_status?: Database["public"]["Enums"]["crm_lead_status"]
          delivery_mode?: string | null
          email?: string | null
          full_name?: string
          id?: string
          idempotency_key?: string | null
          location_lat?: number | null
          location_lng?: number | null
          location_text?: string
          maps_link?: string | null
          notes?: string | null
          offloading_needed?: string | null
          phone?: string
          preferred_contact?: Database["public"]["Enums"]["contact_method"]
          pricing_status?: string
          product?: string
          quantity?: string | null
          reatech_attempts?: number
          reatech_last_attempt_at?: string | null
          reatech_last_error?: string | null
          reatech_submission_ref?: string | null
          reatech_sync_status?: Database["public"]["Enums"]["reatech_sync_status"]
          reference?: string
          site_access?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          timeframe?: string | null
          unit?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "sales" | "operations"
      contact_method: "whatsapp" | "phone" | "email"
      crm_lead_status: "unconfirmed" | "confirmed"
      quote_status:
        | "new"
        | "contacted"
        | "quotation_sent"
        | "follow_up"
        | "won"
        | "lost"
      reatech_sync_status:
        | "pending"
        | "skipped_no_email"
        | "not_configured"
        | "submitted"
        | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "sales", "operations"],
      contact_method: ["whatsapp", "phone", "email"],
      crm_lead_status: ["unconfirmed", "confirmed"],
      quote_status: [
        "new",
        "contacted",
        "quotation_sent",
        "follow_up",
        "won",
        "lost",
      ],
      reatech_sync_status: [
        "pending",
        "skipped_no_email",
        "not_configured",
        "submitted",
        "failed",
      ],
    },
  },
} as const

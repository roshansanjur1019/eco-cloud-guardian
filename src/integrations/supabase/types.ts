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
      client_details: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          role: string
          status: string | null
          user_id: string
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          role: string
          status?: string | null
          user_id: string
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          role?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cloud_accounts: {
        Row: {
          account_id: string
          created_at: string
          id: string
          last_scan: string | null
          name: string
          provider: string
          resources_count: number | null
          status: string
        }
        Insert: {
          account_id: string
          created_at?: string
          id?: string
          last_scan?: string | null
          name: string
          provider: string
          resources_count?: number | null
          status: string
        }
        Update: {
          account_id?: string
          created_at?: string
          id?: string
          last_scan?: string | null
          name?: string
          provider?: string
          resources_count?: number | null
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          tenant_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          tenant_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          tenant_id?: string | null
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          implementation_effort: string
          implemented_at: string | null
          priority: string
          resource_id: string | null
          savings_amount: number
          status: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          implementation_effort: string
          implemented_at?: string | null
          priority: string
          resource_id?: string | null
          savings_amount: number
          status: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          implementation_effort?: string
          implemented_at?: string | null
          priority?: string
          resource_id?: string | null
          savings_amount?: number
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          cloud_account_id: string | null
          cost_30d: number
          created_at: string
          id: string
          region: string
          resource_id: string
          resource_type: string
        }
        Insert: {
          cloud_account_id?: string | null
          cost_30d: number
          created_at?: string
          id?: string
          region: string
          resource_id: string
          resource_type: string
        }
        Update: {
          cloud_account_id?: string | null
          cost_30d?: number
          created_at?: string
          id?: string
          region?: string
          resource_id?: string
          resource_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "resources_cloud_account_id_fkey"
            columns: ["cloud_account_id"]
            isOneToOne: false
            referencedRelation: "cloud_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      revenue: {
        Row: {
          amount: number | null
          date: string | null
          description: string | null
          id: string
          tenant_id: string | null
        }
        Insert: {
          amount?: number | null
          date?: string | null
          description?: string | null
          id?: string
          tenant_id?: string | null
        }
        Update: {
          amount?: number | null
          date?: string | null
          description?: string | null
          id?: string
          tenant_id?: string | null
        }
        Relationships: []
      }
      traffic: {
        Row: {
          id: string
          page: string | null
          tenant_id: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          page?: string | null
          tenant_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          page?: string | null
          tenant_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

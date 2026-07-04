/**
 * Types correspondant au schéma SQL (voir schema.sql).
 * Si le schéma évolue, mettre à jour ces types et régénérer avec
 * `supabase gen types typescript` si besoin.
 */
export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          project_type: string | null;
          brand: string | null;
          budget: string | null;
          deadline: string | null;
          message: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          email?: string | null;
          project_type?: string | null;
          brand?: string | null;
          budget?: string | null;
          deadline?: string | null;
          message?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      chat_messages: {
        Row: {
          id: string;
          session_id: string;
          role: "user" | "assistant";
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          role: "user" | "assistant";
          content: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["chat_messages"]["Insert"]>;
      };
    };
  };
};

export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type ChatMessage = Database["public"]["Tables"]["chat_messages"]["Row"];

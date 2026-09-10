import type { Asana } from "../types/asana";
import type {
  CoachPersona,
  CoachSessionSummary,
  AsanaAttemptResult,
} from "../types/coach-session";
import { FREE_ASANAS, getAsanaImageUrl } from "../data/freeAsanas";

export type { Asana, CoachPersona, CoachSessionSummary, AsanaAttemptResult };

export interface IAsanaService {
  getFreeSessionAsanas(): Promise<Asana[]>;
  getAsanaById(id: string): Promise<Asana | null>;
  getAllAsanas(options?: { isPremium?: boolean; category?: string }): Promise<Asana[]>;
  getLibraryStats(): Promise<{
    freeCount: number;
    premiumCount: number;
    totalCount: number;
  }>;
  getAsanaImageUrl(storagePathOrFilename: string): string;
}

export interface ISessionService {
  createSession(coach: CoachPersona, isFree?: boolean): { sessionId: string; startedAt: number };
  recordAsanaAttempt(sessionId: string, attempt: AsanaAttemptResult): Promise<void>;
  saveSessionSummary(summary: CoachSessionSummary): Promise<{ success: boolean; sessionId: string }>;
  getLastSessionSummary(): CoachSessionSummary | null;
  getHistory(): CoachSessionSummary[];
}

const STORAGE_KEY_LAST_SESSION = "ai_yoga_coach_last_session";
const STORAGE_KEY_SESSION_HISTORY = "ai_yoga_coach_history";

class LocalAsanaService implements IAsanaService {
  private asanaCache: Asana[] = FREE_ASANAS;

  async getFreeSessionAsanas(): Promise<Asana[]> {
    // Returns the 10 sequential free asanas
    return [...this.asanaCache].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  }

  async getAsanaById(id: string): Promise<Asana | null> {
    const found = this.asanaCache.find((a) => a.id === id || a.slug === id);
    return found ? { ...found } : null;
  }

  async getAllAsanas(options?: { isPremium?: boolean; category?: string }): Promise<Asana[]> {
    let list = [...this.asanaCache];
    if (options?.isPremium !== undefined) {
      list = list.filter((a) => a.isPremium === options.isPremium);
    }
    if (options?.category) {
      list = list.filter((a) => a.category === options.category);
    }
    return list;
  }

  async getLibraryStats(): Promise<{
    freeCount: number;
    premiumCount: number;
    totalCount: number;
  }> {
    // 10 free asanas in introductory onboarding, 174+ in premium catalog
    const freeCount = this.asanaCache.length;
    const premiumCount = 174;
    return {
      freeCount,
      premiumCount,
      totalCount: freeCount + premiumCount,
    };
  }

  getAsanaImageUrl(storagePathOrFilename: string): string {
    if (storagePathOrFilename.startsWith("http://") || storagePathOrFilename.startsWith("https://")) {
      return storagePathOrFilename;
    }
    const cleanFilename = storagePathOrFilename.replace(/^.*[\\/]/, "");
    return getAsanaImageUrl(cleanFilename);
  }
}

class LocalCoachSessionService implements ISessionService {
  createSession(coach: CoachPersona, isFree: boolean = true) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    return {
      sessionId,
      startedAt: Date.now(),
      coach,
      isFree,
    };
  }

  async recordAsanaAttempt(sessionId: string, attempt: AsanaAttemptResult): Promise<void> {
    try {
      const existing = localStorage.getItem(`session_attempts_${sessionId}`);
      const attempts: AsanaAttemptResult[] = existing ? JSON.parse(existing) : [];
      attempts.push(attempt);
      localStorage.setItem(`session_attempts_${sessionId}`, JSON.stringify(attempts));
    } catch (err) {
      console.error("Failed to record asana attempt:", err);
    }
  }

  async saveSessionSummary(
    summary: CoachSessionSummary,
  ): Promise<{ success: boolean; sessionId: string }> {
    try {
      localStorage.setItem(STORAGE_KEY_LAST_SESSION, JSON.stringify(summary));

      const history = this.getHistory();
      const updatedHistory = [summary, ...history.slice(0, 29)]; // keep last 30
      localStorage.setItem(STORAGE_KEY_SESSION_HISTORY, JSON.stringify(updatedHistory));

      return { success: true, sessionId: summary.sessionId };
    } catch (err) {
      console.error("Failed to persist session summary:", err);
      return { success: false, sessionId: summary.sessionId };
    }
  }

  getLastSessionSummary(): CoachSessionSummary | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_LAST_SESSION);
      if (!raw) return null;
      return JSON.parse(raw) as CoachSessionSummary;
    } catch {
      return null;
    }
  }

  getHistory(): CoachSessionSummary[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SESSION_HISTORY);
      if (!raw) return [];
      return JSON.parse(raw) as CoachSessionSummary[];
    } catch {
      return [];
    }
  }
}

export const asanaService: IAsanaService = new LocalAsanaService();
export const sessionService: ISessionService = new LocalCoachSessionService();

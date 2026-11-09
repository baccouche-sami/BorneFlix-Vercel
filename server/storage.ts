import { users,quotes, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq,desc } from "drizzle-orm";
// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id,  role: "user",};
    this.users.set(id, user);
    return user;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();

    return user;
  }
  
  // Récupérer toutes les demandes de devis depuis PostgreSQL
  // Les demandes les plus récentes apparaissent en premier
  async getAllQuotes() {
    const allQuotes = await db
      .select()
      .from(quotes)
      .orderBy(desc(quotes.createdAt));

    return allQuotes;
  }
  async updateQuoteStatus(id: number, statut: string) {
  const [updatedQuote] = await db
    .update(quotes)
    .set({ statut })
    .where(eq(quotes.id, id))
    .returning();

  // Retourner la demande modifiée
  return updatedQuote;
}

}


export const storage = new DatabaseStorage();

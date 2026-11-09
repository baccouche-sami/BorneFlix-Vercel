import { pgTable, text, serial, integer, boolean,timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  // Rôle de l'utilisateur : administrateur ou utilisateur ordinaire
  // Par défaut, aucun nouvel utilisateur n'obtient les droits administrateur
  role: text("role").notNull().default("user"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),

  // Informations personnelles
  nom: text("nom").notNull(),
  prenom: text("prenom").notNull(),
  email: text("email").notNull(),
  telephone: text("telephone").notNull(),

  // Informations sur la copropriété
  typeLogement: text("type_logement"),
  adresse: text("adresse"),
  codePostal: text("code_postal"),
  ville: text("ville"),
  nombrePlacesParking: text("nombre_places_parking"),
  nombreResidents: text("nombre_residents"),

  // Informations techniques
  typeInstallation: text("type_installation"),
  nombreBornes: text("nombre_bornes"),
  puissanceRequise: text("puissance_requise"),

  // Informations complémentaires
  statutDemandeur: text("statut_demandeur"),
  dateProjet: text("date_projet"),
  commentaires: text("commentaires"),

  // Suivi de la demande
  statut: text("statut").notNull().default("nouveau"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertQuoteSchema = createInsertSchema(quotes)
  .omit({
    id: true,
    statut: true,
    createdAt: true,
  });

export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;


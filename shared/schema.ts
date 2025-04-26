import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  avatarUrl: text("avatar_url"),
});

// Destination model
export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description"),
});

// Trip model
export const trips = pgTable("trips", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  destinationId: integer("destination_id").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  travelingWith: text("traveling_with").notNull(),
});

// Hotel model
export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  destinationId: integer("destination_id").notNull(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  pricePerNight: integer("price_per_night").notNull(),
  rating: integer("rating"),
  amenities: text("amenities"),
});

// Activity model
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  destinationId: integer("destination_id").notNull(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  duration: text("duration").notNull(),
  description: text("description"),
  highlights: text("highlights"),
  directions: text("directions"),
  bestTime: text("best_time"),
  entranceFee: text("entrance_fee"),
});

// Flight model
export const flights = pgTable("flights", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id").notNull(),
  airline: text("airline").notNull(),
  flightNumber: text("flight_number").notNull(),
  departureAirport: text("departure_airport").notNull(),
  departureTime: text("departure_time").notNull(),
  arrivalAirport: text("arrival_airport").notNull(),
  arrivalTime: text("arrival_time").notNull(),
  duration: text("duration").notNull(),
  class: text("class").notNull(),
});

// TripActivity model - for tracking which activities are part of a trip
export const tripActivities = pgTable("trip_activities", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id").notNull(),
  activityId: integer("activity_id").notNull(),
  day: integer("day").notNull(),
  timeSlot: text("time_slot"),
});

// TripHotel model - for tracking which hotels are part of a trip
export const tripHotels = pgTable("trip_hotels", {
  id: serial("id").primaryKey(),
  tripId: integer("trip_id").notNull(),
  hotelId: integer("hotel_id").notNull(),
  checkInDate: text("check_in_date").notNull(),
  checkOutDate: text("check_out_date").notNull(),
  numberOfNights: integer("number_of_nights").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  avatarUrl: true,
});

export const insertDestinationSchema = createInsertSchema(destinations);
export const insertTripSchema = createInsertSchema(trips);
export const insertHotelSchema = createInsertSchema(hotels);
export const insertActivitySchema = createInsertSchema(activities);
export const insertFlightSchema = createInsertSchema(flights);
export const insertTripActivitySchema = createInsertSchema(tripActivities);
export const insertTripHotelSchema = createInsertSchema(tripHotels);

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;

export type InsertTrip = z.infer<typeof insertTripSchema>;
export type Trip = typeof trips.$inferSelect;

export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type Hotel = typeof hotels.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

export type InsertFlight = z.infer<typeof insertFlightSchema>;
export type Flight = typeof flights.$inferSelect;

export type InsertTripActivity = z.infer<typeof insertTripActivitySchema>;
export type TripActivity = typeof tripActivities.$inferSelect;

export type InsertTripHotel = z.infer<typeof insertTripHotelSchema>;
export type TripHotel = typeof tripHotels.$inferSelect;

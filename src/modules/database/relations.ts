import { relations } from "drizzle-orm";
import {
	actor,
	address,
	category,
	city,
	country,
	customer,
	film,
	filmActor,
	filmCategory,
	inventory,
	language,
	payment,
	rental,
	staff,
	store,
} from "./schema";

export const storeRelations = relations(store, ({ one }) => ({
	address: one(address, {
		fields: [store.addressId],
		references: [address.addressId],
	}),
	staff: one(staff, {
		fields: [store.managerStaffId],
		references: [staff.staffId],
	}),
}));

export const addressRelations = relations(address, ({ one, many }) => ({
	stores: many(store),
	city: one(city, {
		fields: [address.cityId],
		references: [city.cityId],
	}),
	customers: many(customer),
	staff: many(staff),
}));

export const staffRelations = relations(staff, ({ one, many }) => ({
	stores: many(store),
	rentals: many(rental),
	address: one(address, {
		fields: [staff.addressId],
		references: [address.addressId],
	}),
	payments: many(payment),
}));

export const cityRelations = relations(city, ({ one, many }) => ({
	addresses: many(address),
	country: one(country, {
		fields: [city.countryId],
		references: [country.countryId],
	}),
}));

export const countryRelations = relations(country, ({ many }) => ({
	cities: many(city),
}));

export const customerRelations = relations(customer, ({ one, many }) => ({
	address: one(address, {
		fields: [customer.addressId],
		references: [address.addressId],
	}),
	rentals: many(rental),
	payments: many(payment),
}));

export const inventoryRelations = relations(inventory, ({ one, many }) => ({
	film: one(film, {
		fields: [inventory.filmId],
		references: [film.filmId],
	}),
	rentals: many(rental),
}));

export const filmRelations = relations(film, ({ one, many }) => ({
	inventories: many(inventory),
	language: one(language, {
		fields: [film.languageId],
		references: [language.languageId],
	}),
	filmActors: many(filmActor),
	filmCategories: many(filmCategory),
}));

export const rentalRelations = relations(rental, ({ one, many }) => ({
	customer: one(customer, {
		fields: [rental.customerId],
		references: [customer.customerId],
	}),
	inventory: one(inventory, {
		fields: [rental.inventoryId],
		references: [inventory.inventoryId],
	}),
	staff: one(staff, {
		fields: [rental.staffId],
		references: [staff.staffId],
	}),
	payments: many(payment),
}));

export const paymentRelations = relations(payment, ({ one }) => ({
	customer: one(customer, {
		fields: [payment.customerId],
		references: [customer.customerId],
	}),
	rental: one(rental, {
		fields: [payment.rentalId],
		references: [rental.rentalId],
	}),
	staff: one(staff, {
		fields: [payment.staffId],
		references: [staff.staffId],
	}),
}));

export const languageRelations = relations(language, ({ many }) => ({
	films: many(film),
}));

export const filmActorRelations = relations(filmActor, ({ one }) => ({
	actor: one(actor, {
		fields: [filmActor.actorId],
		references: [actor.actorId],
	}),
	film: one(film, {
		fields: [filmActor.filmId],
		references: [film.filmId],
	}),
}));

export const actorRelations = relations(actor, ({ many }) => ({
	filmActors: many(filmActor),
}));

export const filmCategoryRelations = relations(filmCategory, ({ one }) => ({
	category: one(category, {
		fields: [filmCategory.categoryId],
		references: [category.categoryId],
	}),
	film: one(film, {
		fields: [filmCategory.filmId],
		references: [film.filmId],
	}),
}));

export const categoryRelations = relations(category, ({ many }) => ({
	filmCategories: many(filmCategory),
}));

const myRelations = {
	storeRelations,
	addressRelations,
	staffRelations,
	cityRelations,
	countryRelations,
	customerRelations,
	inventoryRelations,
	filmRelations,
	rentalRelations,
	paymentRelations,
	languageRelations,
	filmActorRelations,
	actorRelations,
	filmCategoryRelations,
	categoryRelations,
};

export default myRelations;

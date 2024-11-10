import {
	AnyPgColumn,
	boolean,
	char,
	customType,
	date,
	foreignKey,
	index,
	integer,
	numeric,
	pgEnum,
	pgSequence,
	pgTable,
	pgView,
	primaryKey,
	smallint,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from "drizzle-orm/pg-core";
import { SQL, sql } from "drizzle-orm/sql";

export type SelectFilmType = typeof film.$inferSelect;
export type SelectLanguageType = typeof language.$inferSelect;
export type SelectCategoryType = typeof category.$inferSelect;
export type SelectActorType = typeof actor.$inferSelect;
export type SelectFilmActorType = typeof filmActor.$inferSelect;


export const year = customType<{ data: number }>({
	dataType() {
		return "year";
	},
});

export const tsVector = customType<{
	data: string & { readonly __brand: unique symbol };
}>({
	dataType() {
		return "tsvector";
	},
});

export const bytea = customType<{
	data: Buffer;
	notNull: false;
	default: false;
}>({
	dataType() {
		return "bytea";
	},
});

export function lower(email: AnyPgColumn): SQL {
	return sql`lower(${email})`;
}

export const mpaaRating = pgEnum("mpaa_rating", [
	"G",
	"PG",
	"PG-13",
	"R",
	"NC-17",
]);

export const customerCustomerIdSeq = pgSequence("customer_customer_id_seq", {
	startWith: "1",
	increment: "1",
	minValue: "1",
	maxValue: "9223372036854775807",
	cache: "1",
	cycle: false,
});
export const actorActorIdSeq = pgSequence("actor_actor_id_seq", {
	startWith: "1",
	increment: "1",
	minValue: "1",
	maxValue: "9223372036854775807",
	cache: "1",
	cycle: false,
});
export const categoryCategoryIdSeq = pgSequence("category_category_id_seq", {
	startWith: "1",
	increment: "1",
	minValue: "1",
	maxValue: "9223372036854775807",
	cache: "1",
	cycle: false,
});
export const filmFilmIdSeq = pgSequence("film_film_id_seq", {
	startWith: "1",
	increment: "1",
	minValue: "1",
	maxValue: "9223372036854775807",
	cache: "1",
	cycle: false,
});
export const addressAddressIdSeq = pgSequence("address_address_id_seq", {
	startWith: "1",
	increment: "1",
	minValue: "1",
	maxValue: "9223372036854775807",
	cache: "1",
	cycle: false,
});
export const cityCityIdSeq = pgSequence("city_city_id_seq", {
	startWith: "1",
	increment: "1",
	minValue: "1",
	maxValue: "9223372036854775807",
	cache: "1",
	cycle: false,
});
export const countryCountryIdSeq = pgSequence("country_country_id_seq", {
	startWith: "1",
	increment: "1",
	minValue: "1",
	maxValue: "9223372036854775807",
	cache: "1",
	cycle: false,
});
export const inventoryInventoryIdSeq = pgSequence(
	"inventory_inventory_id_seq",
	{
		startWith: "1",
		increment: "1",
		minValue: "1",
		maxValue: "9223372036854775807",
		cache: "1",
		cycle: false,
	},
);
export const languageLanguageIdSeq = pgSequence("language_language_id_seq", {
	startWith: "1",
	increment: "1",
	minValue: "1",
	maxValue: "9223372036854775807",
	cache: "1",
	cycle: false,
});
export const paymentPaymentIdSeq = pgSequence("payment_payment_id_seq", {
	startWith: "1",
	increment: "1",
	minValue: "1",
	maxValue: "9223372036854775807",
	cache: "1",
	cycle: false,
});
export const rentalRentalIdSeq = pgSequence("rental_rental_id_seq", {
	startWith: "1",
	increment: "1",
	minValue: "1",
	maxValue: "9223372036854775807",
	cache: "1",
	cycle: false,
});
export const staffStaffIdSeq = pgSequence("staff_staff_id_seq", {
	startWith: "1",
	increment: "1",
	minValue: "1",
	maxValue: "9223372036854775807",
	cache: "1",
	cycle: false,
});
export const storeStoreIdSeq = pgSequence("store_store_id_seq", {
	startWith: "1",
	increment: "1",
	minValue: "1",
	maxValue: "9223372036854775807",
	cache: "1",
	cycle: false,
});

export const actor = pgTable(
	"actor",
	{
		actorId: integer("actor_id")
			.default(sql`nextval('actor_actor_id_seq'::regclass)`)
			.primaryKey()
			.notNull(),
		firstName: varchar("first_name", { length: 45 }).notNull(),
		lastName: varchar("last_name", { length: 45 }).notNull(),
		lastUpdate: timestamp("last_update", { mode: "string" })
			.defaultNow()
			.notNull(),
	},
	(table) => {
		return {
			idxActorLastName: index("idx_actor_last_name").using(
				"btree",
				table.lastName.asc().nullsLast().op("text_ops"),
			),
		};
	},
);

export const store = pgTable(
	"store",
	{
		storeId: integer("store_id")
			.default(sql`nextval('store_store_id_seq'::regclass)`)
			.primaryKey()
			.notNull(),
		managerStaffId: smallint("manager_staff_id").notNull(),
		addressId: smallint("address_id").notNull(),
		lastUpdate: timestamp("last_update", { mode: "string" })
			.defaultNow()
			.notNull(),
	},
	(table) => {
		return {
			idxUnqManagerStaffId: uniqueIndex("idx_unq_manager_staff_id").using(
				"btree",
				table.managerStaffId.asc().nullsLast().op("int2_ops"),
			),
			storeAddressIdFkey: foreignKey({
				columns: [table.addressId],
				foreignColumns: [address.addressId],
				name: "store_address_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
			storeManagerStaffIdFkey: foreignKey({
				columns: [table.managerStaffId],
				foreignColumns: [staff.staffId],
				name: "store_manager_staff_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
		};
	},
);

export const address = pgTable(
	"address",
	{
		addressId: integer("address_id")
			.default(sql`nextval('address_address_id_seq'::regclass)`)
			.primaryKey()
			.notNull(),
		address: varchar({ length: 50 }).notNull(),
		address2: varchar({ length: 50 }),
		district: varchar({ length: 20 }).notNull(),
		cityId: smallint("city_id").notNull(),
		postalCode: varchar("postal_code", { length: 10 }),
		phone: varchar({ length: 20 }).notNull(),
		lastUpdate: timestamp("last_update", { mode: "string" })
			.defaultNow()
			.notNull(),
	},
	(table) => {
		return {
			idxFkCityId: index("idx_fk_city_id").using(
				"btree",
				table.cityId.asc().nullsLast().op("int2_ops"),
			),
			fkAddressCity: foreignKey({
				columns: [table.cityId],
				foreignColumns: [city.cityId],
				name: "fk_address_city",
			}),
		};
	},
);

export const category = pgTable("category", {
	categoryId: integer("category_id")
		.default(sql`nextval('category_category_id_seq'::regclass)`)
		.primaryKey()
		.notNull(),
	name: varchar({ length: 25 }).notNull(),
	lastUpdate: timestamp("last_update", { mode: "string" })
		.defaultNow()
		.notNull(),
});

export const city = pgTable(
	"city",
	{
		cityId: integer("city_id")
			.default(sql`nextval('city_city_id_seq'::regclass)`)
			.primaryKey()
			.notNull(),
		city: varchar({ length: 50 }).notNull(),
		countryId: smallint("country_id").notNull(),
		lastUpdate: timestamp("last_update", { mode: "string" })
			.defaultNow()
			.notNull(),
	},
	(table) => {
		return {
			idxFkCountryId: index("idx_fk_country_id").using(
				"btree",
				table.countryId.asc().nullsLast().op("int2_ops"),
			),
			fkCity: foreignKey({
				columns: [table.countryId],
				foreignColumns: [country.countryId],
				name: "fk_city",
			}),
		};
	},
);

export const country = pgTable("country", {
	countryId: integer("country_id")
		.default(sql`nextval('country_country_id_seq'::regclass)`)
		.primaryKey()
		.notNull(),
	country: varchar({ length: 50 }).notNull(),
	lastUpdate: timestamp("last_update", { mode: "string" })
		.defaultNow()
		.notNull(),
});

export const customer = pgTable(
	"customer",
	{
		customerId: integer("customer_id")
			.default(sql`nextval('customer_customer_id_seq'::regclass)`)
			.primaryKey()
			.notNull(),
		storeId: smallint("store_id").notNull(),
		firstName: varchar("first_name", { length: 45 }).notNull(),
		lastName: varchar("last_name", { length: 45 }).notNull(),
		email: varchar({ length: 50 }),
		addressId: smallint("address_id").notNull(),
		activebool: boolean().default(true).notNull(),
		createDate: date("create_date").default(sql`('now'`).notNull(),
		lastUpdate: timestamp("last_update", { mode: "string" }).defaultNow(),
		active: integer(),
	},
	(table) => {
		return {
			idxFkAddressId: index("idx_fk_address_id").using(
				"btree",
				table.addressId.asc().nullsLast().op("int2_ops"),
			),
			idxFkStoreId: index("idx_fk_store_id").using(
				"btree",
				table.storeId.asc().nullsLast().op("int2_ops"),
			),
			idxLastName: index("idx_last_name").using(
				"btree",
				table.lastName.asc().nullsLast().op("text_ops"),
			),
			customerAddressIdFkey: foreignKey({
				columns: [table.addressId],
				foreignColumns: [address.addressId],
				name: "customer_address_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
		};
	},
);

export const inventory = pgTable(
	"inventory",
	{
		inventoryId: integer("inventory_id")
			.default(sql`nextval('inventory_inventory_id_seq'::regclass)`)
			.primaryKey()
			.notNull(),
		filmId: smallint("film_id").notNull(),
		storeId: smallint("store_id").notNull(),
		lastUpdate: timestamp("last_update", { mode: "string" })
			.defaultNow()
			.notNull(),
	},
	(table) => {
		return {
			idxStoreIdFilmId: index("idx_store_id_film_id").using(
				"btree",
				table.storeId.asc().nullsLast().op("int2_ops"),
				table.filmId.asc().nullsLast().op("int2_ops"),
			),
			inventoryFilmIdFkey: foreignKey({
				columns: [table.filmId],
				foreignColumns: [film.filmId],
				name: "inventory_film_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
		};
	},
);

export const language = pgTable("language", {
	languageId: integer("language_id")
		.default(sql`nextval('language_language_id_seq'::regclass)`)
		.primaryKey()
		.notNull(),
	name: char({ length: 20 }).notNull(),
	lastUpdate: timestamp("last_update", { mode: "string" })
		.defaultNow()
		.notNull(),
});

export const rental = pgTable(
	"rental",
	{
		rentalId: integer("rental_id")
			.default(sql`nextval('rental_rental_id_seq'::regclass)`)
			.primaryKey()
			.notNull(),
		rentalDate: timestamp("rental_date", { mode: "string" }).notNull(),
		inventoryId: integer("inventory_id").notNull(),
		customerId: smallint("customer_id").notNull(),
		returnDate: timestamp("return_date", { mode: "string" }),
		staffId: smallint("staff_id").notNull(),
		lastUpdate: timestamp("last_update", { mode: "string" })
			.defaultNow()
			.notNull(),
	},
	(table) => {
		return {
			idxFkInventoryId: index("idx_fk_inventory_id").using(
				"btree",
				table.inventoryId.asc().nullsLast().op("int4_ops"),
			),
			idxUnqRentalRentalDateInventoryIdCustomerId: uniqueIndex(
				"idx_unq_rental_rental_date_inventory_id_customer_id",
			).using(
				"btree",
				table.rentalDate.asc().nullsLast().op("int4_ops"),
				table.inventoryId.asc().nullsLast().op("int2_ops"),
				table.customerId.asc().nullsLast().op("timestamp_ops"),
			),
			rentalCustomerIdFkey: foreignKey({
				columns: [table.customerId],
				foreignColumns: [customer.customerId],
				name: "rental_customer_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
			rentalInventoryIdFkey: foreignKey({
				columns: [table.inventoryId],
				foreignColumns: [inventory.inventoryId],
				name: "rental_inventory_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
			rentalStaffIdKey: foreignKey({
				columns: [table.staffId],
				foreignColumns: [staff.staffId],
				name: "rental_staff_id_key",
			}),
		};
	},
);

export const staff = pgTable(
	"staff",
	{
		staffId: integer("staff_id")
			.default(sql`nextval('staff_staff_id_seq'::regclass)`)
			.primaryKey()
			.notNull(),
		firstName: varchar("first_name", { length: 45 }).notNull(),
		lastName: varchar("last_name", { length: 45 }).notNull(),
		addressId: smallint("address_id").notNull(),
		email: varchar({ length: 50 }),
		storeId: smallint("store_id").notNull(),
		active: boolean().default(true).notNull(),
		username: varchar({ length: 16 }).notNull(),
		password: varchar({ length: 40 }),
		lastUpdate: timestamp("last_update", { mode: "string" })
			.defaultNow()
			.notNull(),
		// TODO: failed to parse database type 'bytea'
		picture: bytea("picture"),
	},
	(table) => {
		return {
			staffAddressIdFkey: foreignKey({
				columns: [table.addressId],
				foreignColumns: [address.addressId],
				name: "staff_address_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
		};
	},
);

export const payment = pgTable(
	"payment",
	{
		paymentId: integer("payment_id")
			.default(sql`nextval('payment_payment_id_seq'::regclass)`)
			.primaryKey()
			.notNull(),
		customerId: smallint("customer_id").notNull(),
		staffId: smallint("staff_id").notNull(),
		rentalId: integer("rental_id").notNull(),
		amount: numeric({ precision: 5, scale: 2 }).notNull(),
		paymentDate: timestamp("payment_date", { mode: "string" }).notNull(),
	},
	(table) => {
		return {
			idxFkCustomerId: index("idx_fk_customer_id").using(
				"btree",
				table.customerId.asc().nullsLast().op("int2_ops"),
			),
			idxFkRentalId: index("idx_fk_rental_id").using(
				"btree",
				table.rentalId.asc().nullsLast().op("int4_ops"),
			),
			idxFkStaffId: index("idx_fk_staff_id").using(
				"btree",
				table.staffId.asc().nullsLast().op("int2_ops"),
			),
			paymentCustomerIdFkey: foreignKey({
				columns: [table.customerId],
				foreignColumns: [customer.customerId],
				name: "payment_customer_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
			paymentRentalIdFkey: foreignKey({
				columns: [table.rentalId],
				foreignColumns: [rental.rentalId],
				name: "payment_rental_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("set null"),
			paymentStaffIdFkey: foreignKey({
				columns: [table.staffId],
				foreignColumns: [staff.staffId],
				name: "payment_staff_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
		};
	},
);

export const film = pgTable(
	"film",
	{
		filmId: integer("film_id")
			.default(sql`nextval('film_film_id_seq'::regclass)`)
			.primaryKey()
			.notNull(),
		title: varchar({ length: 255 }).notNull(),
		description: text(),
		// TODO: failed to parse database type 'year'
		releaseYear: year("release_year"),
		languageId: smallint("language_id").notNull(),
		rentalDuration: smallint("rental_duration").default(3).notNull(),
		rentalRate: numeric("rental_rate", { precision: 4, scale: 2 })
			.default("4.99")
			.notNull(),
		length: smallint(),
		replacementCost: numeric("replacement_cost", { precision: 5, scale: 2 })
			.default("19.99")
			.notNull(),
		rating: mpaaRating().default("G"),
		lastUpdate: timestamp("last_update", { mode: "string" })
			.defaultNow()
			.notNull(),
		specialFeatures: text("special_features").array(),
		// TODO: failed to parse database type 'tsvector'
		fulltext: tsVector("fulltext").notNull(),
	},
	(table) => {
		return {
			fulltextIdx: index("film_fulltext_idx").using(
				"gist",
				table.fulltext.asc().nullsLast().op("tsvector_ops"),
			),
			idxFkLanguageId: index("idx_fk_language_id").using(
				"btree",
				table.languageId.asc().nullsLast().op("int2_ops"),
			),
			idxTitle: index("idx_title").using(
				"btree",
				table.title.asc().nullsLast().op("text_ops"),
			),
			filmLanguageIdFkey: foreignKey({
				columns: [table.languageId],
				foreignColumns: [language.languageId],
				name: "film_language_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),

			idxTitleUnique: uniqueIndex("idx_title_unique").on(lower(table.title)),
		};
	},
);

export const filmActor = pgTable(
	"film_actor",
	{
		actorId: smallint("actor_id").notNull(),
		filmId: smallint("film_id").notNull(),
		lastUpdate: timestamp("last_update", { mode: "string" })
			.defaultNow()
			.notNull(),
	},
	(table) => {
		return {
			idxFkFilmId: index("idx_fk_film_id").using(
				"btree",
				table.filmId.asc().nullsLast().op("int2_ops"),
			),
			filmActorActorIdFkey: foreignKey({
				columns: [table.actorId],
				foreignColumns: [actor.actorId],
				name: "film_actor_actor_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
			filmActorFilmIdFkey: foreignKey({
				columns: [table.filmId],
				foreignColumns: [film.filmId],
				name: "film_actor_film_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
			filmActorPkey: primaryKey({
				columns: [table.actorId, table.filmId],
				name: "film_actor_pkey",
			}),
		};
	},
);

export const filmCategory = pgTable(
	"film_category",
	{
		filmId: smallint("film_id").notNull(),
		categoryId: smallint("category_id").notNull(),
		lastUpdate: timestamp("last_update", { mode: "string" })
			.defaultNow()
			.notNull(),
	},
	(table) => {
		return {
			filmCategoryCategoryIdFkey: foreignKey({
				columns: [table.categoryId],
				foreignColumns: [category.categoryId],
				name: "film_category_category_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
			filmCategoryFilmIdFkey: foreignKey({
				columns: [table.filmId],
				foreignColumns: [film.filmId],
				name: "film_category_film_id_fkey",
			})
				.onUpdate("cascade")
				.onDelete("restrict"),
			filmCategoryPkey: primaryKey({
				columns: [table.filmId, table.categoryId],
				name: "film_category_pkey",
			}),
		};
	},
);
export const actorInfo = pgView("actor_info", {
	actorId: integer("actor_id"),
	firstName: varchar("first_name", { length: 45 }),
	lastName: varchar("last_name", { length: 45 }),
	filmInfo: text("film_info"),
}).as(
	sql`SELECT a.actor_id, a.first_name, a.last_name, group_concat(DISTINCT (c.name::text || ': '::text) || (( SELECT group_concat(f.title::text) AS group_concat FROM film f JOIN film_category fc_1 ON f.film_id = fc_1.film_id JOIN film_actor fa_1 ON f.film_id = fa_1.film_id WHERE fc_1.category_id = c.category_id AND fa_1.actor_id = a.actor_id GROUP BY fa_1.actor_id))) AS film_info FROM actor a LEFT JOIN film_actor fa ON a.actor_id = fa.actor_id LEFT JOIN film_category fc ON fa.film_id = fc.film_id LEFT JOIN category c ON fc.category_id = c.category_id GROUP BY a.actor_id, a.first_name, a.last_name`,
);

export const customerList = pgView("customer_list", {
	id: integer(),
	name: text(),
	address: varchar({ length: 50 }),
	zipCode: varchar("zip code", { length: 10 }),
	phone: varchar({ length: 20 }),
	city: varchar({ length: 50 }),
	country: varchar({ length: 50 }),
	notes: text(),
	sid: smallint(),
}).as(
	sql`SELECT cu.customer_id AS id, (cu.first_name::text || ' '::text) || cu.last_name::text AS name, a.address, a.postal_code AS "zip code", a.phone, city.city, country.country, CASE WHEN cu.activebool THEN 'active'::text ELSE ''::text END AS notes, cu.store_id AS sid FROM customer cu JOIN address a ON cu.address_id = a.address_id JOIN city ON a.city_id = city.city_id JOIN country ON city.country_id = country.country_id`,
);

export const filmList = pgView("film_list", {
	fid: integer(),
	title: varchar({ length: 255 }),
	description: text(),
	category: varchar({ length: 25 }),
	price: numeric({ precision: 4, scale: 2 }),
	length: smallint(),
	rating: mpaaRating(),
	actors: text(),
}).as(
	sql`SELECT film.film_id AS fid, film.title, film.description, category.name AS category, film.rental_rate AS price, film.length, film.rating, group_concat((actor.first_name::text || ' '::text) || actor.last_name::text) AS actors FROM category LEFT JOIN film_category ON category.category_id = film_category.category_id LEFT JOIN film ON film_category.film_id = film.film_id JOIN film_actor ON film.film_id = film_actor.film_id JOIN actor ON film_actor.actor_id = actor.actor_id GROUP BY film.film_id, film.title, film.description, category.name, film.rental_rate, film.length, film.rating`,
);

export const nicerButSlowerFilmList = pgView("nicer_but_slower_film_list", {
	fid: integer(),
	title: varchar({ length: 255 }),
	description: text(),
	category: varchar({ length: 25 }),
	price: numeric({ precision: 4, scale: 2 }),
	length: smallint(),
	rating: mpaaRating(),
	actors: text(),
}).as(
	sql`SELECT film.film_id AS fid, film.title, film.description, category.name AS category, film.rental_rate AS price, film.length, film.rating, group_concat(((upper("substring"(actor.first_name::text, 1, 1)) || lower("substring"(actor.first_name::text, 2))) || upper("substring"(actor.last_name::text, 1, 1))) || lower("substring"(actor.last_name::text, 2))) AS actors FROM category LEFT JOIN film_category ON category.category_id = film_category.category_id LEFT JOIN film ON film_category.film_id = film.film_id JOIN film_actor ON film.film_id = film_actor.film_id JOIN actor ON film_actor.actor_id = actor.actor_id GROUP BY film.film_id, film.title, film.description, category.name, film.rental_rate, film.length, film.rating`,
);

export const salesByFilmCategory = pgView("sales_by_film_category", {
	category: varchar({ length: 25 }),
	totalSales: numeric("total_sales"),
}).as(
	sql`SELECT c.name AS category, sum(p.amount) AS total_sales FROM payment p JOIN rental r ON p.rental_id = r.rental_id JOIN inventory i ON r.inventory_id = i.inventory_id JOIN film f ON i.film_id = f.film_id JOIN film_category fc ON f.film_id = fc.film_id JOIN category c ON fc.category_id = c.category_id GROUP BY c.name ORDER BY (sum(p.amount)) DESC`,
);

export const salesByStore = pgView("sales_by_store", {
	store: text(),
	manager: text(),
	totalSales: numeric("total_sales"),
}).as(
	sql`SELECT (c.city::text || ','::text) || cy.country::text AS store, (m.first_name::text || ' '::text) || m.last_name::text AS manager, sum(p.amount) AS total_sales FROM payment p JOIN rental r ON p.rental_id = r.rental_id JOIN inventory i ON r.inventory_id = i.inventory_id JOIN store s ON i.store_id = s.store_id JOIN address a ON s.address_id = a.address_id JOIN city c ON a.city_id = c.city_id JOIN country cy ON c.country_id = cy.country_id JOIN staff m ON s.manager_staff_id = m.staff_id GROUP BY cy.country, c.city, s.store_id, m.first_name, m.last_name ORDER BY cy.country, c.city`,
);

export const staffList = pgView("staff_list", {
	id: integer(),
	name: text(),
	address: varchar({ length: 50 }),
	zipCode: varchar("zip code", { length: 10 }),
	phone: varchar({ length: 20 }),
	city: varchar({ length: 50 }),
	country: varchar({ length: 50 }),
	sid: smallint(),
}).as(
	sql`SELECT s.staff_id AS id, (s.first_name::text || ' '::text) || s.last_name::text AS name, a.address, a.postal_code AS "zip code", a.phone, city.city, country.country, s.store_id AS sid FROM staff s JOIN address a ON s.address_id = a.address_id JOIN city ON a.city_id = city.city_id JOIN country ON city.country_id = country.country_id`,
);

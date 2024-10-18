import { sql } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTableCreator,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `todo_t3-app_${name}`);
export const priorityEnum = pgEnum("task_priority", ["low", "medium", "high"]);

export const taskTable = createTable(
  "tasks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    task: varchar("task", { length: 256 }),
    content: varchar("content", { length: 2048 }),
    startAt: timestamp("start_at", { withTimezone: true }),
    endAt: timestamp("end_at", { withTimezone: true }),
    priority: priorityEnum("priority").default("medium"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    taskIndex: index("task_idx").on(example.task),
  }),
);

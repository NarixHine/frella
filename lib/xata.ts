// Generated by Xata Codegen 0.26.5. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "frellas",
    columns: [
      { name: "content", type: "text", notNull: true, defaultValue: "" },
      { name: "user", type: "link", link: { table: "users" } },
      { name: "isPublic", type: "bool", notNull: true, defaultValue: "true" },
    ],
  },
  {
    name: "users",
    columns: [
      { name: "description", type: "text" },
      { name: "isPublic", type: "bool", notNull: true, defaultValue: "true" },
      { name: "userId", type: "string", unique: true },
    ],
    revLinks: [
      { column: "user", table: "frellas" },
      { column: "user", table: "images" },
    ],
  },
  {
    name: "images",
    columns: [
      { name: "user", type: "link", link: { table: "users" } },
      { name: "src", type: "file", file: { defaultPublicAccess: true } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Frellas = InferredTypes["frellas"];
export type FrellasRecord = Frellas & XataRecord;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type Images = InferredTypes["images"];
export type ImagesRecord = Images & XataRecord;

export type DatabaseSchema = {
  frellas: FrellasRecord;
  users: UsersRecord;
  images: ImagesRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://INK-ai3lvl.us-east-1.xata.sh/db/frella",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};

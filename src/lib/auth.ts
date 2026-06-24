import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db(process.env.MONGO_CLIENT_NAME);

export const auth = betterAuth({
  //   baseURL: "http://localhost:3000",

  // cookies: {
  //   sessionToken: {
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       secure: false
  //     }
  //   }
  // },

  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "client",
      },
      plan: {
        type: "string",
        defaultValue: "free",
      },
    },
  },
});

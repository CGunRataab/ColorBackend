import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    "./src/graphql/schemas/picture-schema.ts",
    "./src/graphql/schemas/user-schema.ts",
  ],
  documents: ["./src/graphql/documents/**/*.graphql"],
  generates: {
    "./src/graphql/generated/index.ts": {
      overwrite: true,
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;

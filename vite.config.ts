import fs from "node:fs";
import path from "path";
import { parse } from "@babel/parser";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const PREVIEW_SCRIPT_FILES = [
  "node_modules/html-to-image/dist/html-to-image.js",
  "vite-plugins/preview-tools.js",
];

const UNTAGGED_NAMES = new Set(["Fragment", "Suspense", "StrictMode"]);

function readPreviewScript(file: string): string | null {
  try {
    return fs.readFileSync(path.resolve(process.cwd(), file), "utf8");
  } catch {
    return null;
  }
}

function collectOpeningElements(node: any, found: any[]) {
  if (!node || typeof node.type !== "string") return;
  if (node.type === "JSXOpeningElement") found.push(node);
  for (const key of Object.keys(node)) {
    if (key === "loc" || key.endsWith("Comments")) continue;
    const child = node[key];
    if (Array.isArray(child)) child.forEach((item) => collectOpeningElements(item, found));
    else if (child && typeof child.type === "string") collectOpeningElements(child, found);
  }
}

function tagJsxSource(code: string, file: string): string | null {
  const isTypeScript = file.endsWith(".tsx");
  const ast = parse(code, {
    sourceType: "module",
    plugins: isTypeScript ? ["jsx", "typescript"] : ["jsx"],
  });
  const elements: any[] = [];
  collectOpeningElements(ast.program, elements);
  const relative = path.relative(process.cwd(), file).split(path.sep).join("/");
  let output = code;
  elements
    .filter((element) => element.name.type === "JSXIdentifier")
    .filter((element) => !UNTAGGED_NAMES.has(element.name.name))
    .filter((element) => !element.attributes.some((attr: any) => attr.name?.name === "data-upf-id"))
    .sort((a, b) => b.name.end - a.name.end)
    .forEach((element) => {
      const { line, column } = element.loc.start;
      const attributes = ` data-upf-id="${relative}:${line}:${column}" data-upf-name="${element.name.name}"`;
      output = output.slice(0, element.name.end) + attributes + output.slice(element.name.end);
    });
  return output === code ? null : output;
}

function upfTagger(): Plugin {
  return {
    name: "upf-tagger",
    apply: "serve",
    enforce: "pre",
    transform(code, id) {
      const file = id.split("?")[0];
      if (!/\.(tsx|jsx)$/.test(file) || file.includes("node_modules")) return null;
      try {
        const tagged = tagJsxSource(code, file);
        return tagged === null ? null : { code: tagged, map: null };
      } catch {
        return null;
      }
    },
  };
}

function previewTools(): Plugin {
  return {
    name: "preview-tools",
    apply: "serve",
    transformIndexHtml() {
      return PREVIEW_SCRIPT_FILES.map(readPreviewScript)
        .filter((script): script is string => script !== null)
        .map((children) => ({ tag: "script", children, injectTo: "head" as const }));
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const clientEnv = Object.fromEntries(
    Object.entries(env).filter(([key]) => key.startsWith("VITE_")),
  );

  return {
    plugins: [upfTagger(), react(), previewTools()],
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "./src"),
      },
    },
    define: {
      "process.env": JSON.stringify(clientEnv),
    },
    server: {
      host: "0.0.0.0",
      port: 5173,
      strictPort: false,
      hmr: {
        protocol: "wss",
        clientPort: 443,
      },
      allowedHosts: [
        ".modal.host",
        ".modal.run",
        ".modal.sh",
        "localhost",
        "127.0.0.1",
      ],
    },
  };
});

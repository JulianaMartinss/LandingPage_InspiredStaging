/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  // adicione outras variáveis VITE_... aqui se precisar
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

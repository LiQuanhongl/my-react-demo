import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import postcssPxToViewport from "postcss-px-to-viewport";

// import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// import inject from "@rollup/plugin-inject";
import { ip } from "./src/utils/tools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // inject({
    //   "window.Quill": ["react-quill-new", "Quill"],
    //   Quill: ["react-quill-new", "Quill"],
    // }),
    // viteCommonjs({
    //   include: ["quill-image-resize-module"], // 明确指定转换的包
    // }),
  ],
  css: {
    postcss: {
      plugins: [
        // postcssPxToViewport({
        //   viewportWidth: 375, // 设计稿宽度
        //   unitPrecision: 5,
        //   propList: ["*"],
        //   selectorBlackList: [/^.pc-/], // 忽略PC样式
        //   exclude: [/\/pc\//], // 忽略PC目录
        // }),
      ], //先不用了
    },
  },
  server: {
    proxy: {
      "/rich-text": {
        target: `${ip}:8081`,
        changeOrigin: true,
      },
      "/upload": {
        target: `${ip}:8081`,
        changeOrigin: true,
      },
    },
  },
});

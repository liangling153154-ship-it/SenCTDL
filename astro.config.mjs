// @ts-check
import { defineConfig } from 'astro/config';

// base '/' — build gốc (chỉnh khi ghép web chính ở pha 2).
// build.format 'file' — xuất trang phẳng: programs/2n1d.html thay vì
// programs/2n1d/index.html, hợp để bê sang web chính (HTML tĩnh).
export default defineConfig({
  build: {
    format: 'file',
  },
});

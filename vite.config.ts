import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  console.log('Loaded environment variables:', {
    supabaseUrl: env.VITE_SUPABASE_URL,
    hasSupabaseKey: !!env.VITE_SUPABASE_ANON_KEY
  });

  return {
    server: {
      host: "localhost",
      port: 8080,
      hmr: {
        protocol: 'ws',
        host: 'localhost'
      },
      proxy: {
        '/api': {
          target: env.VITE_SUPABASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      react({
        jsxImportSource: 'react'
      }),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          }
        }
      }
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        '@supabase/supabase-js',
        '@radix-ui/react-accordion',
        '@radix-ui/react-alert-dialog',
        '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-avatar',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-collapsible',
        '@radix-ui/react-context-menu',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-hover-card',
        '@radix-ui/react-label',
        '@radix-ui/react-menubar',
        '@radix-ui/react-navigation-menu',
        '@radix-ui/react-popover',
        '@radix-ui/react-progress',
        '@radix-ui/react-radio-group',
        '@radix-ui/react-scroll-area',
        '@radix-ui/react-select',
        '@radix-ui/react-separator',
        '@radix-ui/react-slider',
        '@radix-ui/react-slot',
        '@radix-ui/react-switch',
        '@radix-ui/react-tabs',
        '@radix-ui/react-toast',
        '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group',
        '@radix-ui/react-tooltip'
      ]
    }
  };
});

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig
} from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

const config = defineConfig({
  globalCss: {
    "html, body": {
      margin: 0,
      minHeight: "100%",
      bg: "pine.900",
      color: "pine.100",
      overscrollBehavior: "none"
    },
    body: {
      WebkitFontSmoothing: "antialiased",
      textRendering: "optimizeLegibility"
    },
    "#root": {
      minHeight: "100vh",
      minBlockSize: "100dvh"
    },
    "button, input": {
      font: "inherit"
    }
  },
  theme: {
    tokens: {
      colors: {
        pine: {
          950: { value: "#101a1a" },
          900: { value: "#162222" },
          800: { value: "#1f2f2f" },
          700: { value: "#2a3c3b" },
          600: { value: "#35504d" },
          500: { value: "#4b6f69" },
          300: { value: "#9fd1c4" },
          100: { value: "#e8f4f1" }
        },
        ember: { value: "#e68a73" }
      },
      shadows: {
        breath: { value: "0 24px 70px rgba(0, 0, 0, 0.38)" }
      }
    }
  }
});

const system = createSystem(defaultConfig, config);

export function Provider({ children }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" forcedTheme="dark" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}

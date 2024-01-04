# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Shadow AI is an Electron application that serves as a coding assistant for competitive programming and interviews. It captures screenshots of coding problems, processes them using AI (OpenAI GPT or Google Gemini), and provides solutions with explanations.

## Key Features

- **Screenshot Capture** - Global hotkeys for instant problem screenshot capture
- **AI Problem Analysis** - Extract coding problems from images using GPT/Gemini
- **Multi-Language Support** - Generate solutions in Python, C++, Java, and more
- **Solution Generation** - Optimized code with detailed explanations and complexity analysis
- **Debug Mode** - Analyze error screenshots for solution improvements
- **Dual AI Providers** - Switch between OpenAI GPT and Google Gemini models
- **Always-On-Top Window** - Overlay interface that stays accessible during coding
- **Click-Through Mode** - Toggle window interaction for seamless workflow
- **Global Shortcuts** - Complete keyboard control without leaving your IDE
- **Screenshot Management** - Queue system for multiple problem images
- **Automatic Cleanup** - Smart file management and temporary data handling
- **Configuration Persistence** - Save API keys, preferences, and window settings
- **Cross-Platform** - Works on Windows, macOS, and Linux
- **Opacity Control** - Adjust window transparency for optimal visibility

## Core Technologies

### Framework & Runtime
- **Electron 35.0.0**: Cross-platform desktop application framework
- **Node.js**: Server-side JavaScript runtime for main process
- **Electron Vite 3.1.0**: Modern build tooling with HMR support
- **Vite 6.2.6**: Fast build tool and development server

### Frontend Stack
- **React 19.1.0**: UI library with modern hooks and concurrent features
- **TypeScript 5.8.3**: Static typing for JavaScript
- **TailwindCSS 4.1.4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives for dialogs and toasts
- **TanStack Query 5.74.4**: Server state management and caching
- **Framer Motion 12.23.12**: Animation library
- **React Syntax Highlighter**: Code syntax highlighting

### AI & Image Processing
- **OpenAI SDK 4.94.0**: GPT model integration for code generation
- **Google Generative AI 0.24.0**: Gemini model integration
- **screenshot-desktop 1.15.1**: Cross-platform screenshot capture

### Development Tools
- **ESLint 9.24.0**: Code linting with TypeScript and React rules
- **Prettier 3.5.3**: Code formatting
- **Electron Builder 25.1.8**: Application packaging and distribution

### Utilities & Libraries
- **uuid 11.1.0**: Unique identifier generation
- **class-variance-authority & clsx**: CSS class management
- **lucide-react**: Icon library

## Folder Structure

```
shadow-stealth-ai-assistant/
├── src/
│   ├── main/                    # Electron main process
│   │   ├── index.ts            # Application entry point and window management
│   │   └── lib/                # Core business logic
│   │       ├── config-manager.ts        # User settings and API key management
│   │       ├── processing-manager.ts    # AI processing orchestration
│   │       ├── screenshot-manager.ts    # Screenshot capture and file management
│   │       ├── keyboard-shortcut.ts     # Global shortcuts and window controls
│   │       └── ipc-handler.ts          # Inter-process communication handlers
│   ├── preload/                # Secure IPC bridge
│   │   ├── index.ts            # Preload script for renderer communication
│   │   └── index.d.ts          # TypeScript definitions for exposed APIs
│   └── renderer/               # React frontend
│       ├── index.html          # HTML entry point
│       └── src/
│           ├── App.tsx         # Root React component
│           ├── main.tsx        # React DOM render entry
│           ├── components/     # UI components
│           │   ├── main-app.tsx         # Primary application interface
│           │   ├── screenshots-view.tsx # Screenshot management UI
│           │   ├── settings-dialog.tsx  # Configuration interface
│           │   ├── solutions.tsx        # AI solution display
│           │   └── welcome-screen.tsx   # Initial setup screen
│           ├── providers/      # React context providers
│           │   ├── query-provider.tsx   # TanStack Query setup
│           │   ├── toast-context.tsx    # Toast notification context
│           │   └── toast-provider.tsx   # Toast provider implementation
│           ├── lib/           # Shared utilities and types
│           │   ├── types.ts   # TypeScript type definitions
│           │   ├── utils.ts   # Utility functions
│           │   └── languages.ts # Programming language configurations
│           └── assets/        # Static assets (CSS, images)
├── build/                     # Build configuration and assets
│   ├── icon.ico              # Windows application icon
│   ├── icon.icns             # macOS application icon
│   ├── icon.png              # Linux application icon
│   └── entitlements.mac.plist # macOS security entitlements
├── resources/                 # Application resources
├── .vscode/                   # VS Code workspace settings
├── electron-builder.yml       # Application packaging configuration
├── electron.vite.config.ts    # Vite build configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # Root TypeScript configuration
├── tsconfig.node.json        # Node.js TypeScript configuration
├── tsconfig.web.json         # Web/renderer TypeScript configuration
├── eslint.config.mjs         # ESLint configuration
└── WARP.md                   # This file
```

### Core Architecture

**Multi-Process Electron Architecture:**
- **Main Process** (`src/main/`): Core application logic, window management, AI processing
- **Renderer Process** (`src/renderer/`): React-based UI with TypeScript
- **Preload Process** (`src/preload/`): Secure IPC bridge between main and renderer

**Key Components:**
- **ProcessingManager**: Orchestrates AI API calls for problem extraction and solution generation
- **ScreenshotManager**: Handles screenshot capture, storage, and management across different views
- **ConfigManager**: Manages user settings including API keys, models, and preferences
- **KeyboardShortcutHelper**: Global keyboard shortcuts for window control and screenshot operations

**State Management:**
- Central application state in `src/main/index.ts`
- React Query for UI state management and caching
- Context-based toast notifications and configuration

## Development Commands

### Core Development
```bash
# Install dependencies
npm install

# Development mode with hot reload
npm run dev

# Build the application
npm run build

# Type checking
npm run typecheck
# or separately
npm run typecheck:node
npm run typecheck:web

# Linting and formatting
npm run lint
npm run format
```

### Testing & Quality
```bash
# Run single file type check
npx tsc --noEmit path/to/file.ts

# Check specific TypeScript config
npx tsc --noEmit -p tsconfig.node.json
npx tsc --noEmit -p tsconfig.web.json
```

### Platform-Specific Builds
```bash
# Windows build
npm run build:win

# macOS build  
npm run build:mac

# Linux build
npm run build:linux

# Build without packaging (for testing)
npm run build:unpack
```

## Architecture Patterns

### IPC Communication Pattern
The application uses a dependency injection pattern for IPC handlers. Main process managers implement interfaces that define their capabilities, making the system modular and testable.

### AI Provider Abstraction
Support for multiple AI providers (OpenAI/Gemini) with automatic model selection based on API key format. Configuration automatically updates provider-specific models when switching providers.

### Screenshot Management
Two-queue system:
- **Primary queue**: Initial problem screenshots
- **Extra queue**: Debug screenshots for solution refinement
- Automatic cleanup and file management across application lifecycle

### Window Management
Overlay window system with:
- Always-on-top behavior with click-through capabilities
- Global keyboard shortcuts for positioning and control
- Opacity control and window state persistence
- Multi-monitor support

## AI Integration Details

### Processing Flow
1. **Screenshot Analysis**: Extract problem statements from images
2. **Solution Generation**: Create optimized code solutions with explanations
3. **Debug Mode**: Analyze error screenshots for solution improvements

### Model Configuration
- Extraction models: Parse problem statements from screenshots
- Solution models: Generate code solutions with complexity analysis  
- Debugging models: Analyze errors and provide fixes

### Language Support
Configurable programming language preference affects:
- Code generation language
- Solution optimization strategies
- Comment and explanation styles

## Key Global Shortcuts

- `Ctrl/Cmd + H`: Take screenshot
- `Ctrl/Cmd + Enter`: Process screenshots with AI
- `Ctrl/Cmd + B`: Toggle window visibility
- `Ctrl/Cmd + R`: Reset/cancel current processing
- `Ctrl/Cmd + L`: Delete last screenshot
- `Ctrl/Cmd + Arrow Keys`: Move window position
- `Ctrl/Cmd + [/]`: Adjust window opacity

## Configuration Management

User settings stored in `userData/config.json`:
- API keys and provider selection
- Model preferences per operation type
- UI preferences (language, opacity)
- Automatic provider detection from API key format

## Development Considerations

### File Structure
- Main process files use Node.js/Electron APIs
- Renderer files use React with Vite bundling
- Shared types in `src/renderer/src/lib/types.ts`
- Path aliases configured for `@renderer` imports

### Error Handling
- Comprehensive error boundaries in React components
- Main process error handling with user notifications
- API failure graceful degradation
- File system operation safety checks

### Performance Optimization
- Screenshot compression and cleanup
- Query invalidation strategies
- Window rendering optimizations
- Memory-conscious file handling

### Security
- Context isolation enabled in webPreferences
- API keys stored securely in user data directory
- IPC validation and sanitization
- Screenshot data handling with automatic cleanup
# Vencord Markdown Live Preview Plugin

## Overview
This plugin enables previewing text-based file attachments (.md, .txt, .json, .yaml, .log) directly in Discord without downloading them. It utilizes a caching system to minimize network requests and provides syntax highlighting for supported formats.

## Architecture

- **ContentCache**: LRU Cache (max 50 entries) with 5-minute TTL. Handles storage of fetched file content.
- **FileTypeDetector**: Utility service to identify file types based on extension or MIME type and provide metadata (icons, display names).
- **GlobalState**: Zustand store for managing UI loading and error states.

### Service Relationships

- `Plugin Entry` initializes services.
- `ContentCache` is used by UI components (to be implemented) to retrieve data.
- `FileTypeDetector` is used to determine if a file is previewable and how to render it.

## Development Setup

1. **Prerequisites**: Node.js, Vencord development environment.
2. **Install Dependencies**:
   ```bash
   pnpm install
   ```
3. **Build**:
   The plugin is designed to be built as part of the Vencord ecosystem. Ensure `tsconfig.json` is respected by the build system.

## Supported File Types
- Markdown (`.md`)
- Text (`.txt`)
- JSON (`.json`)
- YAML (`.yaml`, `.yml`)
- Log (`.log`)

# Markdown Live Preview - Vencord Plugin Plan

## Project Overview

A Vencord plugin that adds "Live Preview" capabilities to Markdown (`.md`) file attachments in Discord. Instead of downloading files to view them, users can instantly preview rendered Markdown in a modal, directly within the client.

**Core Innovation**: Seamless integration into the native Discord UI using Discord's internal markdown parser for 100% accurate rendering.

**Design Philosophy**: "Native-feel" integration—no external libraries, no heavy dependencies, just reusing Discord's own rendering engine.

***

## Technical Architecture

### System Components

```
┌────────────────────────────────────────────────────────┐
│                    Discord Client                      │
│  ┌───────────────────────────────────────────────-─┐   │
│  │       Markdown Live Preview (Vencord Plugin)    │   │
│  │                                                 │   │
│  │  1. Attachment Patcher                          │   │
│  │     - Injects "Eye" Icon into MessageAttachment │   │
│  │                                                 │   │
│  │  2. Context Menu Patcher                        │   │
│  │     - Adds "Preview" to Right-Click Menu        │   │
│  │                                                 │   │
│  │  3. Preview Modal System                        │   │
│  │     - Fetches raw content (fetch API)           │   │
│  │     - Parsers content (Discord Internal Parser) │   │
│  │     - Renders result (Discord Modal Components) │   │
│  └─────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```


***

## Technology Stack

### Frontend: Vencord Plugin

- **Language**: TypeScript (TSX)
- **Environment**: Vencord Webpack (Aliucord/Vendicated ecosystem)
- **Dependencies**: None (uses internal Discord modules)
- **Components**:
    - `MessageAttachment` (Target for "Eye" button)
    - `ModalRoot`, `ModalHeader`, `ModalContent` (UI)
    - `Markdown` module (Internal parser)

***

## Implementation Steps (Sprint Plan)

### Phase 1: Environment \& Discovery

**Goal**: Locate the necessary Discord internal modules using Webpack.

* **Action**: Use React DevTools to find the Display Name of the attachment component.
* **Modules to Find**:
    * `findByProps("parse", "parseTopic")` -> The internal Markdown parser.
    * `findByName("MessageAttachment")` -> The component to patch.
    * `openModal` -> The utility to trigger modals.


### Phase 2: The "Eye" Button (Attachment Patch)

**Goal**: Inject the UI indicator.

* **Strategy**: Patch `MessageAttachment.default.prototype.render`.
* **Logic**:

1. Check `this.props.attachment.filename.endsWith('.md')`.
```
2. If true, inject a `<Tooltip><ClickableIcon /></Tooltip>` component.
```

3. Ensure the icon is styled to match existing buttons (Download/Code).


### Phase 3: The Preview Modal

**Goal**: Fetch and render content.

* **Flow**:

1. User clicks "Eye" -> calls `handlePreview(url)`.
2. `fetch(url)` retrieves raw text.
3. `MarkdownParser.parse(text)` converts text to React Nodes.
4. `openModal()` displays the nodes in a `ModalContent` wrapper.
* **Security**: Use Discord's internal parser to automatically handle sanitization and standard formatting.


### Phase 4: Context Menu (Fallback)

**Goal**: Add right-click functionality.

* **Target**: `message-attachment-context`.
* **Logic**: Add a button "Preview Markdown" that triggers the same `handlePreview` function.

***

## 🤖 Prompt for AI Agent

**Role**: Expert Vencord Plugin Developer.

**Task**: Generate the complete source code for a Vencord user plugin named `MarkdownLivePreview`.

**Context**:
I need a plugin that allows me to preview `.md` files attached to Discord messages without downloading them. It must feel native to Discord.

**Requirements**:

1. **File Structure**: Single file `index.tsx` is sufficient.
2. **Imports**: Use standard Vencord/Webpack imports (`@webpack`, `@webpack/common`).
3. **Feature 1 - Visual Indicator**:
    * Patch the `MessageAttachment` component.
    * Add an "Eye" icon button next to the download button for files ending in `.md`.

```
*   Use this SVG path for the eye: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />`.
```

4. **Feature 2 - Context Menu**:
    * Register a context menu item for `message-attachment-context`.
    * Label: "Preview Markdown".
5. **Feature 3 - The Modal**:
    * When triggered, `fetch()` the attachment URL.
    * Parse the response text using **Discord's internal parser** (do not use `marked` or external libs).
    * Render it in a `ModalRoot`.

**Code Constraints**:

* Do not assume `MessageAttachment` is easily found by name; include a fallback or robust search if possible, but start with `findByName("MessageAttachment")`.
* Ensure the modal supports dark mode (use standard components).
* Handle fetch errors gracefully (console log is fine).

**Output**: Provide the full `index.tsx` code block ready to save.
<span style="display:none">[^1][^2]</span>

<div align="center">⁂</div>

[^1]: contextual_ai_gif_picker_discord_plugin_plan.md

[^2]: image.jpg


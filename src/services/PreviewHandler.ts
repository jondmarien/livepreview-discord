import { useGlobalState } from "../store/globalState";
import { ContentCache } from "./ContentCache";
import { detectFileType } from "./FileTypeDetector";
import { RendererFactory } from "../renderers/RendererFactory";

export class PreviewHandler {
  private static instance: PreviewHandler;
  private readonly MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

  private constructor() {}

  public static getInstance(): PreviewHandler {
    if (!PreviewHandler.instance) {
      PreviewHandler.instance = new PreviewHandler();
    }
    return PreviewHandler.instance;
  }

  public async handlePreview(attachment: any) {
    const { url, filename, size } = attachment;

    console.log("[PreviewHandler] Handling preview for:", filename);

    // 1. Validate file size
    if (size > this.MAX_FILE_SIZE) {
      console.warn(
        `[PreviewHandler] File ${filename} is too large (${size} bytes). Preview might be slow.`
      );
      // Future: Show warning modal here
    }

    // 2. Set loading state
    useGlobalState.setState({ isLoading: true, error: null });

    try {
      // 3. Resolve Renderer (Fail fast if not supported, though UI shouldn't trigger this)
      const fileInfo = detectFileType(filename);
      if (!fileInfo.isSupported) {
        throw new Error(`File type ${fileInfo.extension} is not supported.`);
      }

      // 4. Content Fetching (Cache-first)
      const content = await this.fetchContent(url, fileInfo.type);

      // 5. Orchestrate Display (Mocked for now)
      const Renderer = RendererFactory.getRenderer(filename);
      console.log(
        "[PreviewHandler] Ready to render with:",
        Renderer.displayName || Renderer.name
      );
      console.log(
        "[PreviewHandler] Content preview:",
        content.slice(0, 50) + "..."
      );

      // Future: Open Modal with Renderer and content
    } catch (error) {
      console.error("[PreviewHandler] Error during preview:", error);
      useGlobalState.setState({ error: (error as Error).message });
    } finally {
      // 6. Reset loading state
      useGlobalState.setState({ isLoading: false });
    }
  }

  private async fetchContent(url: string, fileType: string): Promise<string> {
    const cache = ContentCache.getInstance();

    // Check Cache
    const cachedEntry = cache.get(url);
    if (cachedEntry) {
      console.log("[PreviewHandler] Cache hit for:", url);
      return cachedEntry.content;
    }

    // Fetch Network
    console.log("[PreviewHandler] Fetching from network:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.statusText}`);
    }

    const content = await response.text();

    // Store in Cache
    cache.set(url, {
      content,
      timestamp: Date.now(),
      size: content.length,
      fileType,
    });

    return content;
  }
}

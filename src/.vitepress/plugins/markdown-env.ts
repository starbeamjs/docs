/**
 * The `env` object to be passed to markdown-it render function
 *
 * Input some meta data for markdown file parsing and rendering
 *
 * Output some resources from the markdown file
 */
export interface MarkdownEnv {
  /**
   * Base / publicPath of current site
   */
  base?: string;
  /**
   * Absolute file path of the markdown file
   */
  filePath?: string | null;
  /**
   * Relative file path of the markdown file
   */
  filePathRelative?: string | null;
  /**
   * Imported file that extracted by importCodePlugin
   */
  importedFiles?: string[];
}

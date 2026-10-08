/**
 * Utility to trigger print-to-PDF workflows for MPSC Aspirant Prep
 * Leverages native browser window.print() combined with optimized print CSS media queries
 */

export interface ExportPdfOptions {
  title?: string;
  onBeforePrint?: () => void;
  onAfterPrint?: () => void;
}

/**
 * Triggers browser print dialog optimized for saving as PDF
 * @param options optional title to set in document during export
 */
export function exportToPdf(options?: ExportPdfOptions): void {
  const originalTitle = document.title;
  
  if (options?.title) {
    document.title = options.title;
  }

  if (options?.onBeforePrint) {
    try {
      options.onBeforePrint();
    } catch (e) {
      console.warn('onBeforePrint handler failed:', e);
    }
  }

  // Small delay to ensure any state updates or UI class toggles have rendered
  setTimeout(() => {
    try {
      window.print();
    } catch (err) {
      console.error('Window print error:', err);
    } finally {
      // Restore title after print dialog closes
      if (options?.title) {
        document.title = originalTitle;
      }
      if (options?.onAfterPrint) {
        options.onAfterPrint();
      }
    }
  }, 100);
}

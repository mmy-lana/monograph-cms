'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Native `<dialog>` gives this notice focus trapping, focus restoration and
 * Escape-to-close from the platform. That is why it is used here instead of a
 * hand-rolled overlay: reimplementing focus management is where accessible
 * modals usually regress.
 *
 * The dialog is rendered only while open. A closed `<dialog>` is not painted,
 * but keeping it mounted would leave its trigger inside a subtree that assistive
 * technology still walks, and any focusable descendant of a non-modal closed
 * dialog remains reachable by keyboard.
 */
export function EditorialAccessDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  /**
   * `showModal()` is called after the element exists in the DOM. The `open`
   * attribute is set as a fallback for engines without modal dialog support, so
   * the notice is still readable rather than silently failing to appear.
   */
  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
      return;
    }

    dialog.setAttribute('open', '');
  }, [isOpen]);

  // Clicking the backdrop lands on the dialog element itself, because the
  // backdrop is a pseudo-element of the dialog. A click that reached the inner
  // panel has the panel as its target and must not dismiss.
  const handleDialogClick = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>) => {
      if (event.target === dialogRef.current) close();
    },
    [close]
  );

  return (
    <>
      <Button
        type="button"
        variant="primary"
        size="sm"
        className="hidden sm:inline-flex"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Write for Monograph: open editorial access information"
        onClick={open}
      >
        Write
      </Button>

      {isOpen && (
        <dialog
          ref={dialogRef}
          aria-labelledby="editorial-access-title"
          onClose={close}
          onClick={handleDialogClick}
          className="fixed inset-0 z-50 m-auto w-[min(30rem,calc(100vw-2rem))] rounded-lg border border-editorial-border bg-paper p-6 text-left shadow-xl backdrop:bg-black/40"
        >
          <h2
            id="editorial-access-title"
            className="font-serif text-xl font-bold tracking-tight text-black mb-2"
          >
            Write for Monograph
          </h2>

          <p className="text-sm text-neutral-600 mb-4">
            Drafts are authored in the Sanity Studio, not on this page. The studio
            is a separate deployment that requires an editor account, so this
            action cannot open a public editor here.
          </p>

          <p className="text-sm text-neutral-600 mb-6">
            Ask the editorial team for an invitation, then sign in to the studio
            with the address you were invited from.
          </p>

          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={close}>
              Close
            </Button>
            <a
              href="mailto:editors@monograph.example?subject=Editor%20access%20request"
              className="inline-flex items-center min-h-[36px] px-3.5 rounded-full bg-editorial-accent text-white text-xs font-medium hover:bg-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              Request an invitation
            </a>
          </div>
        </dialog>
      )}
    </>
  );
}

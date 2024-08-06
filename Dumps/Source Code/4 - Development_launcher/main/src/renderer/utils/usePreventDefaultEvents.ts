import { useEffect } from 'react';

const allowedElements = ['INPUT', 'TEXTAREA'];

const usePreventDefaultEvents = () => {
	useEffect(() => {
		// Function to stop propagation and prevent default for keyboard events
		const disableKeyboardEvents = (e: KeyboardEvent) => {
			if (allowedElements.includes((e.target as HTMLElement).tagName)) return;
			e.preventDefault();
		};

		// Function to prevent focus
		const disableFocus = (e: FocusEvent) => {
			if (allowedElements.includes((e.target as HTMLElement).tagName)) return;
			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}
			e.preventDefault();
		};

		// Add event listeners
		window.addEventListener('keydown', disableKeyboardEvents, true);
		window.addEventListener('keyup', disableKeyboardEvents, true);
		window.addEventListener('focusin', disableFocus, true);

		// Remove event listeners on cleanup
		return () => {
			window.removeEventListener('keydown', disableKeyboardEvents, true);
			window.removeEventListener('keyup', disableKeyboardEvents, true);
			window.removeEventListener('focusin', disableFocus, true);
		};
	}, []);
};

export default usePreventDefaultEvents;

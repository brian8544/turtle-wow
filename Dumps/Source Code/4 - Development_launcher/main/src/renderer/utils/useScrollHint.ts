import { useLayoutEffect, useRef } from 'react';

const setScrollHint = (tar: HTMLElement) => {
	const top = tar.scrollTop > 0 && tar.scrollHeight !== tar.clientHeight;
	const bottom = tar.scrollTop < tar.scrollHeight - tar.offsetHeight;

	if (
		top.toString() === tar.dataset.top &&
		bottom.toString() === tar.dataset.bottom
	)
		return;

	tar.dataset.top = top ? 'true' : 'false';
	tar.dataset.bottom = bottom ? 'true' : 'false';

	if (!top && !bottom) {
		tar.style.webkitMaskImage = '';
		return;
	}

	tar.style.webkitMaskImage = `linear-gradient(${
		top ? 'transparent, black calc(64px)' : ''
	}${top && bottom ? ', ' : ''}${
		bottom ? 'black calc(100% - 64px), transparent' : ''
	})`;
};

const useScrollHint = <T extends HTMLElement>() => {
	const ref = useRef<T>(null);
	useLayoutEffect(() => {
		const current = ref.current;
		if (!current) return;
		setScrollHint(current);
		const listener = () => setScrollHint(current);
		const observer = new MutationObserver(listener);
		observer.observe(current.parentNode ?? current, {
			attributes: true,
			childList: true,
			subtree: true
		});
		current.addEventListener('scroll', listener);
		window.addEventListener('resize', listener);
		return () => {
			observer.disconnect();
			current?.removeEventListener('scroll', listener);
			window.removeEventListener('resize', listener);
		};
	}, [ref]);

	return ref;
};

export default useScrollHint;

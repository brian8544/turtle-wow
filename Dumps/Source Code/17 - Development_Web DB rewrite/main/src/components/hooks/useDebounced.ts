import { debounce, isEqual } from 'lodash-es';
import { useState, useRef, useEffect } from 'react';

const useDebounced = <T>(value: T, wait = 300) => {
	const [state, setState] = useState(value);
	const debounced = useRef(debounce(setState, wait));
	useEffect(() => {
		if (isEqual(value, state)) return;
		debounced.current(value);
	}, [value, state]);
	return state;
};

export default useDebounced;

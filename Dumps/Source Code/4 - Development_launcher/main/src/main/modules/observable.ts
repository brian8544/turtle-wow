import { observable } from '@trpc/server/observable';

type Func<T> = (arg: T) => void;

abstract class Observable<T> {
	private _listeners: Func<T>[] = [];

	protected abstract _value: T;

	protected _notifyObservers(v = this._value) {
		this._listeners.forEach(l => l(v));
	}

	observe() {
		return observable<T>(e => {
			e.next(this._value);
			this._listeners.push(e.next);
			return () => {
				this._listeners.filter(v => v !== e.next);
			};
		});
	}

	clearObservers() {
		this._listeners = [];
	}
}

export default Observable;

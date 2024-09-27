
import { CommonModule } from '@angular/common';
import { Component, Injectable, signal } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StoreService<T> {
    private state$: BehaviorSubject<T> = new BehaviorSubject(null);

    constructor(private initialState: T) {
        this.setState(initialState);
    }

    public setState(newState: T): void {
        this.state$.next(newState);
    }

    public getState(): Observable<T> {
        return this.state$.asObservable();
    }

    public select<K extends keyof T>(key: K): Observable<T[K]> {
        return this.state$.pipe(map(state => state[key]));
    }
}


// Usage in a component
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule],
    template: `<div>{{ state | async | json }}</div>`,
})
export class AppComponent {
    public initialState: { users: string[] } = { users: ['John', 'Doe'] };

    public state: Observable<{ users: string[] }>;

    constructor(private store: StoreService<typeof this.initialState>) {
        const state = this.store.getState();
        this.state = state;
    }

    updateState() {
        this.store.setState({ users: ['Jane', 'Doe'] });
    }

    public getUsersState() {
        return this.store.select('users')
    }
}
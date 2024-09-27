import { Component, Injectable } from "@angular/core";
import { filter, map, Observable, Subject, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EventBusService<T> {
    private eventBus$ = new Subject<{ event: string; payload: T }>();

    emit(event: string, payload: any) {
        this.eventBus$.next({ event, payload });
    }

    on(event: string): Observable<T> {
        return this.eventBus$.asObservable().pipe(
            filter(e => e.event === event),
            map(e => e.payload),
            take(1)
        );
    }
}


// Emitting an event
@Component({
    selector: 'app-emitter',
    standalone: true,
    template: `<button (click)="sendMessage()">Send Message</button>`,
})
export class EmitterComponent {

    private payload = { message: '', to: '' };

    constructor(private eventBus: EventBusService<typeof this.payload>) { }

    sendMessage() {
        this.eventBus.emit('customEvent', { message: 'Hello from Emitter!', to: 'Listener' });
    }
}

// Listening to an event
@Component({
    selector: 'app-listener',
    standalone: true,
    template: `<p>{{ message }}</p>`,
})
export class ListenerComponent {
    message: string = '';

    private payload = { message: '', to: '' };

    constructor(private eventBus: EventBusService<typeof this.payload>) {
        this.eventBus.on('customEvent').subscribe(data => {
            this.message = data.message;
        });
    }
}
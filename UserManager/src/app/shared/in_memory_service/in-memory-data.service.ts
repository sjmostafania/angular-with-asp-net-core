import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Ticket } from '../../models/ticket';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const tickets = [
      { id: 1, title: 'Missing Exception',         assignedTo: 'John Smith', description: 'Method XYZ should throw exception in case ABC',                  percentageComplete: 0 },
      { id: 2, title: 'Log errors',                assignedTo: 'John Smith', description: 'Logs need to be persisted to a local file',                      percentageComplete: 24 },
      { id: 3, title: 'Update AngularJS',          assignedTo: 'John Smith', description: 'Need to update the App to AngularJS version 1.5',                percentageComplete: 0 },
      { id: 4, title: 'Border is missing',         assignedTo: 'Jane Doe',   description: 'The element div.demo has no border defined',                     percentageComplete: 100 },
      { id: 5, title: 'Introduce responsive grid', assignedTo: 'Jane Doe',   description: 'Implement reponsive grid for better displays on mobile devices', percentageComplete: 17 },
    ];
    return { tickets };
  }

  genId(tickets: Ticket[]): number {
    return tickets.length > 0 ? Math.max(...tickets.map(ticket => ticket.id)) + 1 : 11;
  }
}


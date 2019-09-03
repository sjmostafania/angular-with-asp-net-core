import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Ticket } from '../../models/ticket';




// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({ providedIn: 'root' })
export class TicketService {

  private ticketsUrl = 'api/';  // URL to web api
  ticketId: Ticket;
  ticketIds=[];
  constructor(private http: HttpClient) { }

  /** GET tickets from the server */
  loadAllTickets(): Observable<Ticket[]> {
    debugger;
    return this.http.get<Ticket[]>(`${this.ticketsUrl}${'tickets'}`)
      .pipe(
        catchError(this.handleError('getTickets', []))
      );
  }

  /** GET ticket by id. Return `undefined` when id not found */
  getTicketsNo404<Data>(id: number): Observable<Ticket> {
    const url = `${this.ticketsUrl}${'tickets'}?id=${id}`;
    return this.http.get<Ticket[]>(url)
      .pipe(
        map(tickets => tickets[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<Ticket>(`getTickets id=${id}`))
      );
  }

  /** GET ticket by id. Will 404 if id not found */
  getTickets(id: number): Observable<Ticket> {
    debugger;
    const url = `${this.ticketsUrl}${'tickets'}?id=${id}`;
    return this.http.get<Ticket>(url).pipe(
      catchError(this.handleError<Ticket>(`getTickets id=${id}`))
    );
  }

  /* GET tickets whose name contains search term */
  searchTickets(term: string): Observable<Ticket[]> {
    if (!term.trim()) {
      // if not search term, return empty ticket array.
      return of([]);
    }
    return this.http.get<Ticket[]>(`${this.ticketsUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Ticket[]>('searchTickets', []))
    );
  }
 
  //////// Save methods //////////

  /** POST: add a new ticket to the server */
  addTickets(ticket: Ticket): Observable<Ticket> {
    debugger;
    return this.http.post<Ticket>(`${this.ticketsUrl}${'tickets'}`, ticket).pipe(
      catchError(this.handleError<Ticket>('addTickets'))
    );
  }

  /** DELETE: delete the ticket from the server */
  deleteTickets(ticket: Ticket | number): Observable<Ticket> {
    const id = typeof ticket === 'number' ? ticket : ticket.id;
    const url = `${this.ticketsUrl}${'tickets'}/${id}`;

    return this.http.delete<Ticket>(url).pipe(
      catchError(this.handleError<Ticket>('deleteTickets'))
    );
  }

  /** PUT: update the ticket on the server */
  updateTickets(ticket: Ticket): Observable<any> {
    return this.http.put(this.ticketsUrl, ticket).pipe(
      catchError(this.handleError<any>('updateTickets'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    debugger;
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //define table columns
  getTableColummn(){
    

    let columns = [
      { columnDef: 'select', header: 'Action', cell: () => `` },
      { columnDef: 'id', header: 'No.', cell: (ticket: Ticket) => `${ticket.id}` },
      { columnDef: 'title', header: 'Title', cell: (ticket: Ticket) => `${ticket.title}` },
      { columnDef: 'assignedTo', header: 'Assigned To', cell: (ticket: Ticket) => `${ticket.assignedTo}` },
      { columnDef: 'description', header: 'Description', cell: (ticket: Ticket) => `${ticket.description}` },
      { columnDef: 'percentageComplete', header: 'Percentage', cell: (ticket: Ticket) => `${ticket.percentageComplete}` },
      { columnDef: 'details', header: 'Action', cell: () => `` },
      { columnDef: 'update', header: 'Action', cell: () => `` },
      { columnDef: 'delete', header: 'Action', cell: () => `` }
    ];
    return columns
  }
 
}
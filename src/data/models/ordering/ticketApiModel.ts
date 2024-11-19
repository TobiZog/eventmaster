import { ConcertApiModel } from "../acts/concertApiModel";
import { SeatModel } from "../locations/seatModel";
import { TicketModel } from "./ticketModel";

export class TicketApiModel extends TicketModel {
  concert: ConcertApiModel
  seat: SeatModel
}
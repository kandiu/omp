package quickfix_initiator;

import quickfix.field.*;
import quickfix.fix42.*;

public class CancelOrder extends Order {
	private String clOrdID,symbol,origClOrdID;
	private char side;
	
	public Message toMessage() {
		return new OrderCancelRequest(new OrigClOrdID(origClOrdID), new ClOrdID(clOrdID),new Symbol(symbol), new Side(side),new TransactTime());
	}
}

package quickfix_initiator;

import quickfix.fix42.*;
import quickfix.field.*;

public class SingleOrder extends Order {
	private String clOrdID,symbol,tag;
	private char side,ordType;
	
	@Override
	public Message toMessage() {
		System.out.println(tag);
		Message msg = new NewOrderSingle(new ClOrdID(clOrdID),new HandlInst('1'),new Symbol(symbol),new Side(side), new TransactTime(), new OrdType(ordType));
		msg.setField(new Text("test order"));
		
		return msg;
	}
}

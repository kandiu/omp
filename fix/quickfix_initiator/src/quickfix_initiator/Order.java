package quickfix_initiator;

import quickfix.fix42.*;


public class Order {
	private String type;
	public Message toMessage() {
		return new Message();
	};
	
	public String getType() {
		return type;
	}
}

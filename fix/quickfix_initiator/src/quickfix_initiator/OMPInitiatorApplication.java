package quickfix_initiator;
import java.io.*;
import java.net.*;
import java.util.Date;
import com.google.gson.*;

import quickfix.*;
import quickfix.field.*;
import quickfix.fix42.NewOrderSingle;

public class OMPInitiatorApplication implements Application {
	private SessionID sessionId;
	private boolean running = true;
	private int port;
	Socket socket;
	ServerSocket serverSocket;
	BufferedReader in;
	PrintWriter out;
	
	
	public void onCreate(SessionID sessionId) {

	}
	 
	public void onLogon(SessionID sessionId) {
		this.sessionId=sessionId;
	}
	
	public void onLogout(SessionID sessionId) {
		 this.sessionId = null;
	}
	
	public void toAdmin(Message message, SessionID sessionId) {
		 
	}
	
	public void toApp(Message message, SessionID sessionId) 
			 throws DoNotSend{
		 
		 
	}
	 
	public void fromAdmin(Message message, SessionID sessionId)
			 throws FieldNotFound, IncorrectDataFormat, IncorrectTagValue, RejectLogon{
		 
		 
	}
	
	public void fromApp(Message message, SessionID sessionId)
			 throws FieldNotFound, IncorrectDataFormat, IncorrectTagValue, UnsupportedMessageType{
		
			System.out.println("trying to send");
			Gson gson = new GsonBuilder().create();
			String jsonMessage = gson.toJson(message);
			
			if (out!=null) out.println(jsonMessage);
	}
	
	OMPInitiatorApplication(int port){
		this.port = port;
	}
	
	public void run() throws SessionNotFound, IOException {
		//wait for connection first
		while (sessionId == null)
			try {
				Thread.sleep(1000);
			} catch (Exception ex) {}
		
		System.out.println("running");
		
		Session.sendToTarget(new NewOrderSingle(new ClOrdID("123"), new HandlInst(), new Symbol("AMZN"), new Side(), new TransactTime(), new OrdType(OrdType.LIMIT)),sessionId);
		listen();
	}
	

	public void listen() throws SessionNotFound, IOException {
		System.out.println("start listening");
		serverSocket = new ServerSocket(port);
		while (running) {
			try {
				socket = serverSocket.accept();
			
				System.out.println("connected");
				
			
				in =  new BufferedReader(new InputStreamReader(socket.getInputStream()));
				out = new PrintWriter(socket.getOutputStream(),true);
				
				
				
				while (!socket.isClosed()) {
					
					String message = in.readLine();
					if (message == null)
						break;
						
					System.out.println(message);
					sendOrder(message);
					//Session.sendToTarget(new Message(message),sessionId);				
				}
			
			
				socket.close();
			} catch (Exception e) {
				e.printStackTrace();
				socket.close();
			}
		}
		
	}
	
	public void sendOrder(String jsonMessage) throws SessionNotFound {
		Gson gson = new GsonBuilder().create();
		Order order = gson.fromJson(jsonMessage, Order.class);
		
		if (order.getType().equals("SingleOrder")) order = gson.fromJson(jsonMessage, SingleOrder.class);
		else return;
		
		
		Session.sendToTarget(order.toMessage(),this.sessionId);
	}
}

//y?qSR*sh>8Ao

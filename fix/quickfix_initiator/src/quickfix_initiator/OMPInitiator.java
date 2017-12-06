package quickfix_initiator;
import quickfix.*;


import java.io.FileInputStream;

public class OMPInitiator {
	 public static void main(String args[]) throws Exception {
		    String fileName = "./nodeQuickfixInitiatorExample.properties"; //settings file

		    Application application = new OMPInitiatorApplication(4444);
		    
		    FileInputStream stream = new FileInputStream(fileName);
		    
		    SessionSettings settings = new SessionSettings(stream);
		    MessageStoreFactory storeFactory = new FileStoreFactory(settings);
		    
		    
		    DefaultMessageFactory messageFactory = new DefaultMessageFactory();
		    Initiator initiator = new SocketInitiator
		      (application, storeFactory, settings, messageFactory);
		    
		    initiator.start();
		    ((OMPInitiatorApplication)application).run();
	}
}

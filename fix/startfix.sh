#!/bin/sh

trap 'kill -HUP 0' EXIT
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#start fiximulator
(cd $DIR/FIXimulator_0.41 && ./fiximulator.sh) &

sleep 3
#start quickfix_inititiator
(cd $DIR/quickfix_initiator/bin && java -cp quickfixj.jar:gson-2.8.2.jar:mina-core-2.0.16.jar:gso2.8.2.jar:slf4j-api-1.7.25.jar:slf4j-jdk14-1.7.25.jar:. quickfix_initiator/OMPInitiator) &

sleep 3
#start server
(cd $DIR/../ && DEBUG='*' nodemon ./bin/www) & 

while true; do
	sleep 1
done

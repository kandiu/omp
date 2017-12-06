#!/bin/sh

trap 'kill -HUP 0' EXIT

(cd FIXimulator_0.41 && ./fiximulator.sh) &

(cd quickfix_initiator/bin && java -cp quickfixj.jar:mina-core-2.0.16.jar:gso2.8.2.jar:slf4j-api-1.7.25.jar:slf4j-jdk14-1.7.25.jar:. quickfix_initiator/OMPInitiator) &

(cd .. && DEBUG='*' nodemon ./bin/www) & 

while true; do
	sleep 1
done

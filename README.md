# p2ptnjs
A very simple NodeJS P2P Tracker

# P2P Tracker
## Commands
### Register Peer
```
{
	command: "P2PTNJS_PEER",
	payload: {
		name: string,
		ip: string(IPv4)
	}
}
```

### Request Peer List
```
{
	command: "P2PTNJS_PEERS"
}
```

### Register Lobby
```
{
	command: "P2PTNJS_LOBBY",
	payload: {
		name: string,
		participants?: string | string[]
	}
}
```

### Request Lobby List
```
{
	command: "P2PTNJS_LOBBIES",
	payload: {
		participants?:  string | string[]
	}
}
```

## Diagrams
### Register Peer
```
Tracker						New Peer
-----------					-----------
Listening				
					<-		Register Peer
Request Peer Info	->	
Add Peer			<-		Send Peer Info	
ACK					->		
					<-		ACK
Start Heartbeat		->		
					<-		Start Heartbeat
```

### Request Peer List
```
Tracker						Registered Peer
-----------					-----------
Listening
					<-		Request Peer List
Send Peer List		->		
					<-		ACK
```

### Register Lobby
```
Tracker						Registered Peer
-----------					-----------
Listening
					<-		Register Lobby
Request Lobby Info	->
Add Lobby 			<-		Send Lobby Info
CREATED				->		
					<-		ACK
```

### Request Lobby List
```
Tracker						Registered Peer
-----------					-----------
Listening
					<-		Request Lobby List
Send Lobby List		->		
					<-		ACK
```
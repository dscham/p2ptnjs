# p2ptnjs
A very simple NodeJS P2P Tracker

# P2P Tracker
## Objects
### Peer (#peer-anchor)
```
{
    id : UUID,
    location : string, 
    online: boolean,
    displayName? : string
}
```
Registered `Peer`s will be automatically removed after 24h of `Peer.online=false`; Checked once per hour

### Resource (#resource-anchor)
```
{
    id : UUID,
    topic : string,
    peers : [] | UUID[1+]
}
```
Registered `Resource`s will be automatically removed after 24h of `Resource.peers.length == 0`; Checked once per hour

## Commands
### Register Peer
Create a [`Peer`](#peer-anchor)
```
{
	command : "P2PTNJS_PEER",
	payload : {
        location : string,
        displayName? :  string
	}
}
```

### Request Peer List
List all online [`Peer`](#peer-anchor)s; Filterable by [`Peer.location`](#peer-anchor), [`Peer.displayName`](#peer-anchor), [`Resource.topic`](#resource-anchor)
```
{
	command : "P2PTNJS_PEERS",
	payload? : {
        location? : string,
        displayName? :  string,
        topic? : string
	}
}
```

### Register Resource
Create a [`Resource`](#resource-anchor); Sending `Peer[1+]` for `peers?` will try to create the [`Peer`](#peer-anchor)s and fail if one already exists
```
{
	command : "P2PTNJS_RESOURCE",
	payload : {
		topic : string,
		peers? : UUID[1+] | Peer[1+]
	}
}
```

### Request Resource List
List all registerd [`Resource`](#resource-anchor)s; Filterable by [`Resource.topic`](#resource-anchor), [`Peer.id`](#peer-anchor)
```
{
	command : "P2PTNJS_RESOURCES",
	payload? : {
		topic? :  string,
        peers? : UUID[1+]
	}
}
```

### Add Peer/s to Resource
Add [`Peer`](#peer-anchor)s to a [`Resource`](#resource-anchor)
```
{
	command : "P2PTNJS_PEER_RESOURCE",
	payload : {
		resource :  Resource,
        peers : UUID[1+]
	}
}
```
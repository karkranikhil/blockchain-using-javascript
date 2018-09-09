# Blockchain using Javascript

## What is a Blockchain?
An immutable , Distributed ledger

## Ledger 
Ledger - A collection of financial account or transaction
Eg- Nik paid 30$ to Sid
John paid 80$ to Julia

## Immutable 
The ledger cannot be changed. Ever!

## Industries Blockchain can improve
<div>Financial services industries</div>
<div>Health care industries</div>
<div>Credit industries</div>
<div>Governments</div>
<div>Energy industries</div>

## What is proof-of-work?
Every blockchain is list of blocks and every single block has to be created and added to the chain. But before adding each block has to be legitimate (follow some rule and law) and correct txn and data should be inside it.
Every time we create a block we ensure it’s a legitimate block by mining it through proof of work

## Consensus algorithm 
<p>It is a way for all of the nodes inside of our network to agree upon what the corrected data inside of the blockchain is</p>
<p>So for example in the real world when a blockhain is totally built out it is running across hundreds or thousands of nodes and every transaction and every block that's being created it's all broadcast to the entire black chain network.And there's a possibility that during these broadcasts a hiccup could occur and maybe a certain node doesn't receive a piece of information or a transaction that took place or even maybe there is a bad actor inside of the blockchain network who is sending out false information or creating fraudulent transactions on their copy of a blockchain and trying to broadcast them to the whole network and convince everybody that they are legitimate transactions.</p>

<p>So how do we solve for this problem.?</p>

<p>Our consensus algorithm will provide us with a way to compare one node to all the other nodes inside of the network to confirm that we have the correct data and the specific node.</p>

## Longest chain rule
<p>what the longest chain rule does is it takes a look at a single node and it looks at the copy of the block chain on that node it then compares the length of our chain and this node with the length of the chains and all the other nodes.</p>

<p>During this comparison if there is a chain found that has a longer length than the chain that's present on this node we are going to replace the chain that's on this node with the longest chain in the network
and that's it.</p>

## Reason for using Longest chain rule 

<p>The theory behind using this longest chain rule is that we should be able to trust the longest chain to have the correct data because the most the work was put into creating that chain the longest chain has the most blocks in it and each of those blocks was mined by using a proof of work.Therefore we can assume that the whole network contributed to the longest chain because of how much work went into that chain.So that's why we're going to use a consensus algorithm that implements the longest chain rule.</p>

## step 1
### To start node 1
        npm run node_1
 Then go to the <a href="http://localhost:3001/blockchain">http://localhost:3001/blockchain</a>
so you can see our blockchain right now only has our Genesys black in it.

## step 2
### To add a block  
 go to the <a href="http://localhost:3001/mine">http://localhost:3001/mine</a>
so it will mine a block and add a block to the node 3001 chain along with the rewards in the pending transactions.

## step 3
### To add a transaction
Go to postman and using POST Method hit an API

go to the <a href="http://localhost:3001/transaction/broadcast">http://localhost:3001/transaction/broadcast</a>
<code>
send json request
{
    "amount":10,
    "sender":"NIKHILKARKRA6876786",
    "recipient":"SIDKARKRA6876786",
}
</code>
This will create a transation and broadcast successfully

<h3>Different End points that we have build</h3>

| SNO | METHOD        | Endpoint      | Description  |
| --- | ------------- |:-------------:| ------------:|
|  1  | GET           | /blockchain   | to start the block chain |
|  2  | POST          | /transaction      |    |
|  3  | POST          | /transaction/broadcast      |     |
|  4  | GET            | /mine      |     |
|  5  | POST          | /receive-new-block      |     |
|  6  | POST          | /register-and-broadcast-node     |     |
|  7  | POST          | /register-node     |     |
|  8  | POST          | /register-nodes-bulk     |     |

### Request for /register-nodes-bulk
    {
        "allNetworkNodes":[
            "http://localhost:3002",
            "http://localhost:3003",
            "http://localhost:3004"
            ]
    }

 
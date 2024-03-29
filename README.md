# Observations & Comments: 

**UI Fixes** 
 * In case a wrong email code is provided by the user during sign up, the exact nature of the error could be displayed to the user to notify them of this. Incorrect passwords should also be flagged to the user at the 
 login 
  page 
 * On periodic token refresh in the user wallet, the wallets assets displayed are that of the BSC mainnet even when a different chain has been selected by the user. This shouldn't be the case.
   

**Performance improvements:**
 * The token balances for various assets can be cached in the database or an actual cache in the backend to reduce the wait times when checking profile balances, especially when the user first launches the profile page
 * When sending the email activation code, it should be checked whether the user's email is already registered or activated to reduce overhead and save on emailing costs for reused emails.
 * The token prices should have a separate websocket-based api to enable streaming of the prices in real time, rather than having the client application poll for updates. This will improve both price accuracy for users 
   looking to perform trades, and will also improve the server's performance. The REST api server would be free to serve only requests generated from REST endpoints, while the websocket server would be optimized for 
   streaming the data.
 * A microservice-based architecture could be implemented to scale out endpoints with high demand in production. Webhook endpoints can also be configured to be on their own servers/instances for high performance of 
   requests to webhooks. The microservices can then be coupled using solutions such as queues, and workers to consume messages from the queues.    
 
 **Security Optimizations:**
 * The key phrase should also be stored encrypted in the database to protect the user's assets in case of a hack or breach.
 * Two-factor authorization could be implemented for certain wallet actions such as sending tokens to further improve wallet security.
 
 **Code Optimization**
 The following pattern could be used to store information on different tokens in different chains:
~~~
export const chainConfigs: {
  [index: string]: {
    JSON_RPC_URL: string;
    WSS_RPC_URL: string;
    TOKENS: { [index: string]: {[index:string]: string} };
    
  };
} = {
  MUMBAI: {
    JSON_RPC_URL: process.env.MUMBAI_JSON_RPC_PROVIDER,
    WSS_RPC_URL: process.env.MUMBAI_JSON_WSS_PROVIDER,
    TOKENS: {
      TOKEN1: {
      address:"0x33c510E05C37DD2DAa05504A69FCd45e63343F61",
	    logo:"https://logo.url"
    },
  },
}};
~~~ 
 This would improve the scalability of the code to handle various tokens in different networks as one can index the information required from the object using the network name and the token name. This can be as in the example below:
 ~~~
const getTokenBalance = async (token, chain, wallet_address)=>{
	const chainInfo = chainConfigs[chain]
	const provider = new JsonRpcProvider(chainInfo.JSON_RPC_URL);
	const tokenContract = new Contract(
    		chainInfo.TOKENS[token].address,
    		abiERC20,
    		provider
  		);
 	const balance = await tokenContract.balanceOf(wallet_address)
	return balance
}	
 ~~~
Using this pattern, the code can easily accommodate any new tokens which would only have to be added to the config file/object. This is more scalable than using if statements to check the chain the user wants to interact with.

# Challenges:
**WalletConnectv2 Integration**

WalletConnectv2 packages require wagmi and viem v2 as dependencies, which in turn require react 18 as the minimal version of react used. This brings about inconsistencies in the code operation, as babel can also not transpile these packages correctly. I was thus limited to using v1 of walletConnect but its support has since ceased. Even though the walletConnect modal shows upon invocation, the app does not connect to the walletConnect cloud service, hence not connecting to the user's preferred wallet.  This could be solved with a lot of workarounds especially focusing on babel and craco, but I suspect this would introduce other breaking changes to the rest of the app. Time is however a little limited on this so I settled for v1. Trying to work around this is also what has consumed the biggest portion of the time spent on the fixes.

**Possible fixes**

The application could be ported over to vite, which would offer a better development and build experience than craco and the associated webpack build. Vite's more modern native build tool would also supposedly compile the code babel fails to compile of the more recent packages. This would also future-proof the project in the event of so many changes. 

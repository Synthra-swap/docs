# Integration

This guide explains how to integrate Synthra into your application, whether you're building a DApp, protocol, or other service that needs decentralized exchange functionality.

## Integration Options

There are several ways to integrate with Synthra, depending on your needs:

### 1. Smart Contract Integration

Directly interact with Synthra smart contracts for on-chain operations:

* **Core Contracts**: For advanced integrations requiring custom logic
* **Periphery Contracts**: For standard operations with safety checks
* **Custom Contracts**: For specialized integrations with your protocol

### 2. SDK Integration

Use the Synthra SDK for simplified interaction:

* **JavaScript/TypeScript SDK**: For web applications and Node.js services
* **Python SDK**: For data analysis and backend services
* **Java SDK**: For Android applications and JVM-based services

### 3. Subgraph Integration

Query the Synthra subgraph for historical data and analytics:

* **GraphQL API**: For flexible data querying
* **REST Endpoints**: For simplified data access
* **WebSocket Subscriptions**: For real-time updates

### 4. Frontend Integration

Embed Synthra functionality in your user interface:

* **Widget Integration**: Embed swap or pool widgets in your application
* **API Integration**: Use our API to build custom interfaces
* **iframe Integration**: Embed the full Synthra interface in your application

## Smart Contract Integration

### Prerequisites

* Familiarity with Solidity and Ethereum development
* Understanding of Synthra's core concepts
* Development environment with Hardhat, Foundry, or Truffle

### Key Contracts for Integration

| Contract                          | Purpose                                   | Common Use Cases             |
| --------------------------------- | ----------------------------------------- | ---------------------------- |
| SynthraRouter                     | Routing trades, adding/removing liquidity | Swaps, liquidity management  |
| SynthraQuoter                     | Getting price quotes without execution    | Price discovery, UI display  |
| SynthraNonfungiblePositionManager | Managing liquidity positions              | Creating/modifying positions |
| SynthraFactory                    | Finding pools, creating new pools         | Protocol integrations        |
| SynthraPool                       | Direct pool interaction                   | Advanced custom logic        |

### Example: Swap Integration

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@synthra-swap/periphery/contracts/interfaces/ISynthraRouter.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract SynthraSwapExample {
    ISynthraRouter public immutable router;
    
    constructor(address _router) {
        router = ISynthraRouter(_router);
    }
    
    function swapExactInputSingle(
        address tokenIn,
        address tokenOut,
        uint24 fee,
        uint256 amountIn,
        uint256 amountOutMinimum
    ) external returns (uint256 amountOut) {
        // Transfer tokens to this contract
        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        
        // Approve router to spend tokens
        IERC20(tokenIn).approve(address(router), amountIn);
        
        // Create the params for the swap
        ISynthraRouter.ExactInputSingleParams memory params = ISynthraRouter.ExactInputSingleParams({
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: fee,
            recipient: msg.sender,
            deadline: block.timestamp + 1800,
            amountIn: amountIn,
            amountOutMinimum: amountOutMinimum,
            sqrtPriceLimitX96: 0
        });
        
        // Execute the swap
        amountOut = router.exactInputSingle(params);
        return amountOut;
    }
}
```

### Example: Liquidity Provision Integration

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@synthra-swap/periphery/contracts/interfaces/ISynthraNonfungiblePositionManager.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract SynthraLiquidityExample {
    ISynthraNonfungiblePositionManager public immutable positionManager;
    
    constructor(address _positionManager) {
        positionManager = ISynthraNonfungiblePositionManager(_positionManager);
    }
    
    function mintNewPosition(
        address token0,
        address token1,
        uint24 fee,
        int24 tickLower,
        int24 tickUpper,
        uint256 amount0Desired,
        uint256 amount1Desired
    ) external returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1) {
        // Transfer tokens to this contract
        IERC20(token0).transferFrom(msg.sender, address(this), amount0Desired);
        IERC20(token1).transferFrom(msg.sender, address(this), amount1Desired);
        
        // Approve position manager to spend tokens
        IERC20(token0).approve(address(positionManager), amount0Desired);
        IERC20(token1).approve(address(positionManager), amount1Desired);
        
        // Create the params for minting a position
        ISynthraNonfungiblePositionManager.MintParams memory params = ISynthraNonfungiblePositionManager.MintParams({
            token0: token0,
            token1: token1,
            fee: fee,
            tickLower: tickLower,
            tickUpper: tickUpper,
            amount0Desired: amount0Desired,
            amount1Desired: amount1Desired,
            amount0Min: 0,
            amount1Min: 0,
            recipient: msg.sender,
            deadline: block.timestamp + 1800
        });
        
        // Mint the position
        (tokenId, liquidity, amount0, amount1) = positionManager.mint(params);
        
        // Refund any unused tokens
        if (amount0 < amount0Desired) {
            IERC20(token0).transfer(msg.sender, amount0Desired - amount0);
        }
        if (amount1 < amount1Desired) {
            IERC20(token1).transfer(msg.sender, amount1Desired - amount1);
        }
        
        return (tokenId, liquidity, amount0, amount1);
    }
}
```

## SDK Integration

### Installation

```bash
# npm
npm install @synthra-swap/sdk

# yarn
yarn add @synthra-swap/sdk

# pnpm
pnpm add @synthra-swap/sdk
```

### Basic Usage

```typescript
import { ChainId, Token, CurrencyAmount, TradeType, Percent } from '@synthra-swap/sdk'
import { SynthraSwapRouter } from '@synthra-swap/swap-router-sdk'

// Define tokens
const WETH = new Token(ChainId.MAINNET, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH')
const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC')

// Create a swap route
async function createSwapRoute() {
  // Initialize provider
  const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_KEY')
  
  // Get pools
  const poolProvider = new SynthraPoolProvider(provider)
  const pool = await poolProvider.getPool(WETH, USDC, FeeAmount.MEDIUM)
  
  // Create a trade
  const amountIn = CurrencyAmount.fromRawAmount(WETH, '1000000000000000000') // 1 WETH
  const trade = await Trade.createUncheckedTrade({
    route: new Route([pool], WETH, USDC),
    inputAmount: amountIn,
    outputAmount: CurrencyAmount.fromRawAmount(USDC, '0'), // Will be calculated
    tradeType: TradeType.EXACT_INPUT
  })
  
  // Generate swap calldata
  const options = {
    slippageTolerance: new Percent(50, 10000), // 0.5%
    deadline: Math.floor(Date.now() / 1000) + 1800, // 30 minutes
    recipient: 'YOUR_ADDRESS'
  }
  
  const { calldata, value } = SynthraSwapRouter.swapCallParameters(trade, options)
  
  // Execute the swap with your web3 provider
  const transaction = {
    data: calldata,
    value: value,
    from: 'YOUR_ADDRESS',
    to: SynthraSwapRouter.ROUTER_ADDRESS,
    gasLimit: ethers.utils.hexlify(1000000)
  }
  
  const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider)
  const receipt = await wallet.sendTransaction(transaction)
  console.log(`Transaction hash: ${receipt.hash}`)
}
```

### Advanced SDK Features

The SDK provides additional functionality for:

* **Position Management**: Creating, modifying, and closing liquidity positions
* **Price Calculation**: Computing prices, quotes, and price impact
* **Pool Data**: Accessing pool statistics and liquidity distribution
* **TWAP Oracles**: Retrieving time-weighted average prices

## Subgraph Integration

### Subgraph Endpoints

* **Mainnet**: `https://api.thegraph.com/subgraphs/name/synthra-swap/synthra-mainnet`
* **Testnet**: `https://api.thegraph.com/subgraphs/name/synthra-swap/synthra-goerli`

### Example Queries

#### Get Pool Data

```graphql
{
  pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8") {
    id
    token0 {
      symbol
    }
    token1 {
      symbol
    }
    feeTier
    liquidity
    volumeUSD
    txCount
  }
}
```

#### Get User Positions

```graphql
{
  positions(where: { owner: "0xYOUR_ADDRESS" }) {
    id
    owner
    pool {
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      feeTier
    }
    tickLower
    tickUpper
    liquidity
    depositedToken0
    depositedToken1
    collectedFeesToken0
    collectedFeesToken1
  }
}
```

## Frontend Integration

### Widget Integration

Embed the Synthra swap widget in your application:

```html
<iframe
  src="https://app.synthra.org/swap?embed=true&theme=dark"
  height="660"
  width="100%"
  style="border: none; border-radius: 16px;"
  title="Synthra Swap Widget"
></iframe>
```

Customize the widget with URL parameters:

* `embed=true`: Enables embed mode
* `theme=dark|light`: Sets the color theme
* `inputCurrency=ETH`: Pre-selects the input currency
* `outputCurrency=0x...`: Pre-selects the output currency
* `exactAmount=1.0`: Pre-fills the input amount

### API Integration

Use our REST API for data integration:

```javascript
// Get token price
async function getTokenPrice(tokenAddress) {
  const response = await fetch(`https://api.synthra.org/v1/tokens/${tokenAddress}/price`)
  const data = await response.json()
  return data.price
}

// Get pool data
async function getPoolData(poolAddress) {
  const response = await fetch(`https://api.synthra.org/v1/pools/${poolAddress}`)
  const data = await response.json()
  return data
}
```

## Best Practices

### Security Considerations

1. **Slippage Protection**: Always include slippage tolerance in swaps
2. **Input Validation**: Validate all user inputs before sending transactions
3. **Gas Estimation**: Estimate gas costs to prevent transaction failures
4. **Error Handling**: Implement robust error handling for failed transactions
5. **Contract Verification**: Verify contract addresses before interaction

### Performance Optimization

1. **Batch Requests**: Combine multiple read operations into a single multicall
2. **Caching**: Cache frequently accessed data like pool addresses and token details
3. **Gas Optimization**: Use the router for complex operations to minimize gas costs
4. **Pagination**: Implement pagination when fetching large datasets from the subgraph

### User Experience

1. **Loading States**: Show clear loading indicators during blockchain operations
2. **Transaction Feedback**: Provide real-time feedback on transaction status
3. **Error Messages**: Display user-friendly error messages with suggested actions
4. **Price Impact Warnings**: Alert users about high price impact trades
5. **Gas Estimates**: Show estimated gas costs before transaction confirmation

## Treasury Fee Considerations

When integrating with Synthra, be aware that all swaps incur a 0.1% treasury fee in addition to the pool fee. This fee:

1. Funds protocol development and token buybacks
2. Is automatically deducted from swap amounts
3. Does not require any special handling in your integration
4. Should be communicated to users in fee breakdowns

## Support and Resources

* **Documentation**: [synthra.org/docs](https://synthra.org/docs)
* **GitHub**: [github.com/synthra-swap](https://github.com/synthra-swap)
* **Discord**: [discord.gg/synthra](https://discord.gg/synthra) - Developer channel available
* **Email**: [developers@synthra.org](mailto:developers@synthra.org)

For bug reports and feature requests, please use our [GitHub Issues](https://github.com/synthra-swap/issues) page.

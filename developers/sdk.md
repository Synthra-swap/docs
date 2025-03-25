# SDK

This page provides comprehensive documentation for the Synthra SDK, which enables developers to programmatically interact with the Synthra protocol.

## Overview

The Synthra SDK is a TypeScript/JavaScript library that simplifies interaction with Synthra smart contracts. It provides abstractions for common operations like swapping tokens, managing liquidity positions, and accessing pool data.

## Installation

Install the SDK using your preferred package manager:

```bash
# npm
npm install @synthra-protocol/sdk

# yarn
yarn add @synthra-protocol/sdk

# pnpm
pnpm add @synthra-protocol/sdk
```

## Core Concepts

### Entities

The SDK provides several core entities:

* **Token**: Represents an ERC-20 token with chain ID, address, decimals, and symbol
* **Pool**: Represents a Synthra liquidity pool with two tokens and a fee tier
* **Position**: Represents a liquidity position with a specific price range
* **Route**: Represents a path through one or more pools for a swap
* **Trade**: Represents a trade with input/output amounts and execution parameters

### Configuration

Initialize the SDK with your preferred configuration:

```typescript
import { SynthraSDK } from '@synthra-protocol/sdk'

// Initialize with default settings
const sdk = new SynthraSDK()

// Initialize with custom settings
const sdk = new SynthraSDK({
  chainId: 1, // Ethereum Mainnet
  rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
  subgraphUrl: 'https://api.thegraph.com/subgraphs/name/synthra-protocol/synthra-mainnet'
})
```

## Token Operations

### Creating Token Instances

```typescript
import { Token, ChainId } from '@synthra-protocol/sdk'

// Create token instances
const WETH = new Token(
  ChainId.MAINNET,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
)

const USDC = new Token(
  ChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD Coin'
)
```

### Working with Token Amounts

```typescript
import { CurrencyAmount } from '@synthra-protocol/sdk'

// Create amount from raw value (considering decimals)
const wethAmount = CurrencyAmount.fromRawAmount(WETH, '1000000000000000000') // 1 WETH

// Create amount from human-readable value
const usdcAmount = CurrencyAmount.fromFractionalAmount(USDC, '100', '1') // 100 USDC

// Perform operations on amounts
const sum = wethAmount.add(wethAmount)
const doubled = wethAmount.multiply(2)
```

## Pool Operations

### Fetching Pools

```typescript
import { FeeAmount, Pool } from '@synthra-protocol/sdk'

// Fetch a pool using the provider
async function getPool() {
  const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_KEY')
  
  // Get pool address
  const poolAddress = Pool.getAddress(WETH, USDC, FeeAmount.MEDIUM)
  
  // Fetch pool data
  const [token0, token1, fee, tickSpacing, liquidity, slot0] = await Promise.all([
    WETH.address.toLowerCase() < USDC.address.toLowerCase() ? WETH : USDC,
    WETH.address.toLowerCase() < USDC.address.toLowerCase() ? USDC : WETH,
    FeeAmount.MEDIUM,
    Pool.getTickSpacing(FeeAmount.MEDIUM),
    poolContract.liquidity(),
    poolContract.slot0()
  ])
  
  // Create pool instance
  const pool = new Pool(
    token0,
    token1,
    fee,
    slot0.sqrtPriceX96.toString(),
    liquidity.toString(),
    slot0.tick
  )
  
  return pool
}
```

### Pool Calculations

```typescript
// Get the current price
const price = pool.token0Price

// Calculate price at a specific tick
const tickPrice = pool.getTokenPriceAtTick(tickLower)

// Calculate liquidity for a position
const liquidity = pool.getLiquidityForAmounts(
  pool.sqrtRatioX96,
  TickMath.getSqrtRatioAtTick(tickLower),
  TickMath.getSqrtRatioAtTick(tickUpper),
  amount0.quotient,
  amount1.quotient
)
```

## Swap Operations

### Creating and Executing Swaps

```typescript
import { Trade, TradeType, Percent, SwapRouter } from '@synthra-protocol/sdk'

async function executeSwap() {
  // Create a provider and signer
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  
  // Get the pool
  const pool = await getPool()
  
  // Create a trade
  const amountIn = CurrencyAmount.fromRawAmount(WETH, '1000000000000000000') // 1 WETH
  const trade = await Trade.createUncheckedTrade({
    route: new Route([pool], WETH, USDC),
    inputAmount: amountIn,
    outputAmount: CurrencyAmount.fromRawAmount(USDC, '0'), // Will be calculated
    tradeType: TradeType.EXACT_INPUT
  })
  
  // Set swap options
  const options = {
    slippageTolerance: new Percent(50, 10000), // 0.5%
    deadline: Math.floor(Date.now() / 1000) + 1800, // 30 minutes
    recipient: await signer.getAddress()
  }
  
  // Generate swap parameters
  const { calldata, value } = SwapRouter.swapCallParameters(trade, options)
  
  // Execute the swap
  const transaction = {
    data: calldata,
    value: value,
    from: await signer.getAddress(),
    to: SwapRouter.ROUTER_ADDRESS,
    gasLimit: ethers.utils.hexlify(1000000)
  }
  
  const tx = await signer.sendTransaction(transaction)
  const receipt = await tx.wait()
  console.log(`Transaction confirmed: ${receipt.transactionHash}`)
  
  return receipt
}
```

### Calculating Price Impact

```typescript
// Get the price impact of a trade
const priceImpact = trade.priceImpact

// Format as percentage
const formattedPriceImpact = `${priceImpact.toFixed(2)}%`

// Check if price impact is high
const isHighImpact = priceImpact.greaterThan(new Percent(5, 100)) // > 5%
```

## Liquidity Management

### Creating Positions

```typescript
import { NonfungiblePositionManager, Position } from '@synthra-protocol/sdk'

async function createPosition() {
  // Create a provider and signer
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  
  // Get the pool
  const pool = await getPool()
  
  // Define position parameters
  const tickLower = nearestUsableTick(pool.tickCurrent - 1000, pool.tickSpacing)
  const tickUpper = nearestUsableTick(pool.tickCurrent + 1000, pool.tickSpacing)
  
  // Create position instance
  const position = new Position({
    pool: pool,
    tickLower: tickLower,
    tickUpper: tickUpper,
    liquidity: ethers.utils.parseEther('1') // 1 unit of liquidity
  })
  
  // Calculate token amounts
  const { amount0: amount0Desired, amount1: amount1Desired } = position.mintAmounts
  
  // Create mint parameters
  const mintParams = {
    token0: pool.token0.address,
    token1: pool.token1.address,
    fee: pool.fee,
    tickLower: tickLower,
    tickUpper: tickUpper,
    amount0Desired: amount0Desired.toString(),
    amount1Desired: amount1Desired.toString(),
    amount0Min: '0', // Set appropriate slippage tolerance
    amount1Min: '0', // Set appropriate slippage tolerance
    recipient: await signer.getAddress(),
    deadline: Math.floor(Date.now() / 1000) + 1800 // 30 minutes
  }
  
  // Generate mint calldata
  const { calldata, value } = NonfungiblePositionManager.addCallParameters(mintParams)
  
  // Execute the transaction
  const transaction = {
    data: calldata,
    value: value,
    from: await signer.getAddress(),
    to: NonfungiblePositionManager.POSITION_MANAGER_ADDRESS,
    gasLimit: ethers.utils.hexlify(1000000)
  }
  
  const tx = await signer.sendTransaction(transaction)
  const receipt = await tx.wait()
  console.log(`Position created: ${receipt.transactionHash}`)
  
  return receipt
}
```

### Managing Existing Positions

```typescript
// Increase liquidity
const increaseParams = {
  tokenId: positionId,
  amount0Desired: amount0Desired.toString(),
  amount1Desired: amount1Desired.toString(),
  amount0Min: '0',
  amount1Min: '0',
  deadline: Math.floor(Date.now() / 1000) + 1800
}

const increaseLiquidityData = NonfungiblePositionManager.addCallParameters(increaseParams)

// Decrease liquidity
const decreaseParams = {
  tokenId: positionId,
  liquidity: liquidity.toString(),
  amount0Min: '0',
  amount1Min: '0',
  deadline: Math.floor(Date.now() / 1000) + 1800
}

const decreaseLiquidityData = NonfungiblePositionManager.removeCallParameters(decreaseParams)

// Collect fees
const collectParams = {
  tokenId: positionId,
  recipient: await signer.getAddress(),
  amount0Max: MaxUint128,
  amount1Max: MaxUint128
}

const collectFeesData = NonfungiblePositionManager.collectCallParameters(collectParams)
```

## Price Oracles

### Accessing TWAP Data

```typescript
import { TickMath, SqrtPriceMath } from '@synthra-protocol/sdk'

async function getTimeWeightedAveragePrice(poolAddress, period) {
  const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_KEY')
  const poolContract = new ethers.Contract(poolAddress, POOL_ABI, provider)
  
  // Get current block timestamp
  const currentBlock = await provider.getBlock('latest')
  const currentTimestamp = currentBlock.timestamp
  
  // Calculate start timestamp
  const startTimestamp = currentTimestamp - period
  
  // Get observations
  const [observation0, observation1] = await Promise.all([
    poolContract.observe([period]),
    poolContract.observe([0])
  ])
  
  // Calculate time-weighted average tick
  const tickCumulativesDelta = observation1.tickCumulatives[0].sub(observation0.tickCumulatives[0])
  const timeElapsed = period
  
  // Calculate average tick
  const avgTick = tickCumulativesDelta.div(timeElapsed)
  
  // Convert tick to price
  const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(avgTick)
  const price = SqrtPriceMath.priceFromSqrtPrice(sqrtRatioX96)
  
  return price
}
```

## Utility Functions

### Tick Calculations

```typescript
import { TickMath } from '@synthra-protocol/sdk'

// Convert price to tick
const priceToTick = (price) => {
  const sqrtRatioX96 = SqrtPriceMath.priceToSqrtPrice(price)
  return TickMath.getTickAtSqrtRatio(sqrtRatioX96)
}

// Convert tick to price
const tickToPrice = (tick) => {
  const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(tick)
  return SqrtPriceMath.priceFromSqrtPrice(sqrtRatioX96)
}

// Find nearest usable tick
const nearestUsableTick = (tick, tickSpacing) => {
  const rounded = Math.round(tick / tickSpacing) * tickSpacing
  if (rounded < TickMath.MIN_TICK) return rounded + tickSpacing
  if (rounded > TickMath.MAX_TICK) return rounded - tickSpacing
  return rounded
}
```

### Fee Calculations

```typescript
// Calculate fee amount including treasury fee
const calculateTotalFee = (amount, poolFee, treasuryFee = 0.001) => {
  const poolFeeAmount = amount.multiply(poolFee)
  const treasuryFeeAmount = amount.multiply(treasuryFee)
  return {
    poolFeeAmount,
    treasuryFeeAmount,
    totalFeeAmount: poolFeeAmount.add(treasuryFeeAmount)
  }
}
```

## Advanced Topics

### Multicall

```typescript
import { Multicall } from '@synthra-protocol/sdk'

// Batch multiple calls into a single transaction
const calls = [
  {
    target: SwapRouter.ROUTER_ADDRESS,
    callData: calldata1
  },
  {
    target: SwapRouter.ROUTER_ADDRESS,
    callData: calldata2
  }
]

const multicallData = Multicall.encodeMulticall(calls)

// Execute multicall
const transaction = {
  data: multicallData,
  value: totalValue,
  from: await signer.getAddress(),
  to: Multicall.MULTICALL_ADDRESS,
  gasLimit: ethers.utils.hexlify(2000000)
}

const tx = await signer.sendTransaction(transaction)
```

### Flash Swaps

```typescript
// Implement a flash swap
const flashParams = {
  recipient: contractAddress,
  amount0: amount0.toString(),
  amount1: amount1.toString(),
  data: ethers.utils.defaultAbiCoder.encode(
    ['address', 'uint256'],
    [recipient, deadline]
  )
}

const flashData = Pool.encodeFlash(flashParams)

// Execute flash swap
const transaction = {
  data: flashData,
  from: await signer.getAddress(),
  to: poolAddress,
  gasLimit: ethers.utils.hexlify(1000000)
}
```

## Error Handling

```typescript
try {
  const result = await executeSwap()
  console.log('Swap successful:', result)
} catch (error) {
  if (error.code === 4001) {
    console.error('User rejected transaction')
  } else if (error.message.includes('INSUFFICIENT_OUTPUT_AMOUNT')) {
    console.error('Slippage tolerance exceeded')
  } else if (error.message.includes('EXPIRED')) {
    console.error('Transaction deadline expired')
  } else {
    console.error('Swap failed:', error)
  }
}
```

## Treasury Fee Considerations

When using the SDK for swaps, be aware that all transactions include the 0.1% treasury fee in addition to the pool fee:

```typescript
// Calculate expected output considering both pool fee and treasury fee
const poolFee = 0.003 // 0.3%
const treasuryFee = 0.001 // 0.1%
const totalFee = poolFee + treasuryFee // 0.4%

const expectedOutput = inputAmount.multiply(1 - totalFee)
```

## Browser Usage

For browser environments, you can use the SDK via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@synthra-protocol/sdk@latest/dist/index.min.js"></script>
<script>
  const { Token, ChainId, CurrencyAmount } = SynthraSDK
  
  // Use SDK components
  const token = new Token(ChainId.MAINNET, '0x...', 18, 'TOKEN')
</script>
```

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions:

```typescript
import { Token, ChainId, FeeAmount, Pool, Position } from '@synthra-protocol/sdk'

// Types are available for all SDK components
const token: Token = new Token(ChainId.MAINNET, '0x...', 18, 'TOKEN')
const fee: FeeAmount = FeeAmount.MEDIUM
```

## Examples

For complete examples of common use cases, see the [Examples](examples.md) page.

## Support and Resources

* **GitHub Repository**: [github.com/synthra-protocol/sdk](https://github.com/synthra-protocol/sdk)
* **NPM Package**: [@synthra-protocol/sdk](https://www.npmjs.com/package/@synthra-protocol/sdk)
* **Issues and Feature Requests**: [GitHub Issues](https://github.com/synthra-protocol/sdk/issues)
* **Discord**: [discord.synthra.io](https://discord.synthra.io) (Developer channel)

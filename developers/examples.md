# Examples

This page provides practical code examples for common Synthra integration scenarios, helping developers quickly implement key functionality.

## Overview

These examples cover a range of use cases from basic swaps to complex liquidity management. Each example includes:

* Complete, working code snippets
* Explanations of key concepts
* Best practices and optimization tips

## Basic Swap Example

This example demonstrates how to execute a simple token swap using the Synthra SDK.

### JavaScript/TypeScript

```javascript
import { ethers } from 'ethers'
import { Token, CurrencyAmount, TradeType, Percent } from '@synthra-swap/sdk'
import { SynthraSwapRouter } from '@synthra-swap/swap-router-sdk'

// Initialize provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

// Define tokens (Ethereum Mainnet examples)
const WETH = new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH')
const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC')

async function executeSwap() {
  try {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    
    // Initialize the router contract
    const routerAddress = '0x2046bAA610FFCF4FBfaCE6bB5c3178f51773db82' // Synthra SwapRouter02
    const router = new ethers.Contract(
      routerAddress,
      ['function exactInputSingle(tuple(address,address,uint24,address,uint256,uint256,uint256,uint160)) external payable returns (uint256)'],
      signer
    )
    
    // Get pool information
    const poolProvider = new SynthraPoolProvider(provider)
    const pool = await poolProvider.getPool(WETH, USDC, 3000) // 0.3% fee tier
    
    // Create a trade
    const amountIn = CurrencyAmount.fromRawAmount(WETH, ethers.utils.parseEther('0.1').toString()) // 0.1 WETH
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
    const { calldata, value } = SynthraSwapRouter.swapCallParameters(trade, options)
    
    // Execute the swap
    const tx = await signer.sendTransaction({
      data: calldata,
      value: value,
      from: await signer.getAddress(),
      to: SynthraSwapRouter.ROUTER_ADDRESS,
      gasLimit: ethers.utils.hexlify(1000000)
    })
    
    console.log(`Transaction submitted: ${tx.hash}`)
    const receipt = await tx.wait()
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`)
    console.log(`Gas used: ${receipt.gasUsed.toString()}`)
    
    return receipt
  } catch (error) {
    console.error('Error executing swap:', error)
    throw error
  }
}
```

### React Component

```jsx
import React, { useState } from 'react'
import { ethers } from 'ethers'
import { Token, CurrencyAmount, TradeType, Percent } from '@synthra-swap/sdk'
import { SynthraSwapRouter } from '@synthra-swap/swap-router-sdk'

const SwapComponent = () => {
  const [inputAmount, setInputAmount] = useState('')
  const [outputAmount, setOutputAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [error, setError] = useState('')
  
  const handleSwap = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // Initialize provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      
      // Define tokens (Ethereum Mainnet)
      const WETH = new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH')
      const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC')
      
      // Get pool information
      const poolProvider = new SynthraPoolProvider(provider)
      const pool = await poolProvider.getPool(WETH, USDC, 3000) // 0.3% fee tier
      
      // Create a trade
      const amountIn = CurrencyAmount.fromRawAmount(
        WETH, 
        ethers.utils.parseEther(inputAmount).toString()
      )
      
      const trade = await Trade.createUncheckedTrade({
        route: new Route([pool], WETH, USDC),
        inputAmount: amountIn,
        outputAmount: CurrencyAmount.fromRawAmount(USDC, '0'),
        tradeType: TradeType.EXACT_INPUT
      })
      
      // Set swap options
      const options = {
        slippageTolerance: new Percent(50, 10000), // 0.5%
        deadline: Math.floor(Date.now() / 1000) + 1800, // 30 minutes
        recipient: await signer.getAddress()
      }
      
      // Generate swap parameters
      const { calldata, value } = SynthraSwapRouter.swapCallParameters(trade, options)
      
      // Execute the swap
      const tx = await signer.sendTransaction({
        data: calldata,
        value: value,
        from: await signer.getAddress(),
        to: SynthraSwapRouter.ROUTER_ADDRESS,
        gasLimit: ethers.utils.hexlify(1000000)
      })
      
      setTxHash(tx.hash)
      
      // Wait for confirmation
      const receipt = await tx.wait()
      console.log(`Transaction confirmed in block ${receipt.blockNumber}`)
      
    } catch (err) {
      console.error('Error executing swap:', err)
      setError(err.message || 'Failed to execute swap')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="swap-container">
      <h2>Swap ETH to USDC</h2>
      
      <div className="input-group">
        <label>ETH Amount:</label>
        <input
          type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          placeholder="0.0"
          disabled={isLoading}
        />
      </div>
      
      <button 
        onClick={handleSwap} 
        disabled={isLoading || !inputAmount}
      >
        {isLoading ? 'Processing...' : 'Swap'}
      </button>
      
      {txHash && (
        <div className="success">
          <p>Transaction submitted!</p>
          <a 
            href={`https://etherscan.io/tx/${txHash}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View on Etherscan
          </a>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  )
}

export default SwapComponent
```

## Adding Liquidity Example

This example demonstrates how to add liquidity to a Synthra pool.

### JavaScript/TypeScript

```javascript
import { ethers } from 'ethers'
import { Token, CurrencyAmount, Position, nearestUsableTick } from '@synthra-swap/sdk'
import { NonfungiblePositionManager } from '@synthra-swap/periphery-sdk'

// Initialize provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

// Define tokens (Ethereum Mainnet examples)
const WETH = new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH')
const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC')

async function addLiquidity() {
  try {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    
    // Get pool information
    const poolProvider = new SynthraPoolProvider(provider)
    const pool = await poolProvider.getPool(WETH, USDC, 3000) // 0.3% fee tier
    
    // Define position parameters
    const currentTick = pool.tickCurrent
    const tickLower = nearestUsableTick(currentTick - 1000, pool.tickSpacing) // Price range lower bound
    const tickUpper = nearestUsableTick(currentTick + 1000, pool.tickSpacing) // Price range upper bound
    
    // Create position instance
    const position = new Position({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      liquidity: ethers.utils.parseEther('0.1') // Liquidity amount
    })
    
    // Calculate token amounts
    const { amount0: amount0Desired, amount1: amount1Desired } = position.mintAmounts
    
    // Approve tokens if needed
    const token0Contract = new ethers.Contract(
      pool.token0.address,
      ['function approve(address spender, uint256 amount) external returns (bool)'],
      signer
    )
    
    const token1Contract = new ethers.Contract(
      pool.token1.address,
      ['function approve(address spender, uint256 amount) external returns (bool)'],
      signer
    )
    
    await token0Contract.approve(
      NonfungiblePositionManager.POSITION_MANAGER_ADDRESS,
      amount0Desired.toString()
    )
    
    await token1Contract.approve(
      NonfungiblePositionManager.POSITION_MANAGER_ADDRESS,
      amount1Desired.toString()
    )
    
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
    const tx = await signer.sendTransaction({
      data: calldata,
      value: value,
      from: await signer.getAddress(),
      to: NonfungiblePositionManager.POSITION_MANAGER_ADDRESS,
      gasLimit: ethers.utils.hexlify(2000000)
    })
    
    console.log(`Transaction submitted: ${tx.hash}`)
    const receipt = await tx.wait()
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`)
    
    // Parse events to get the token ID
    const positionManagerInterface = new ethers.utils.Interface([
      'event IncreaseLiquidity(uint256 indexed tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)'
    ])
    
    const events = receipt.logs.map(log => {
      try {
        return positionManagerInterface.parseLog(log)
      } catch (e) {
        return null
      }
    }).filter(Boolean)
    
    const increaseLiquidityEvent = events.find(event => event.name === 'IncreaseLiquidity')
    const tokenId = increaseLiquidityEvent.args.tokenId.toString()
    
    console.log(`Position created with token ID: ${tokenId}`)
    
    return {
      transactionHash: receipt.transactionHash,
      tokenId: tokenId
    }
  } catch (error) {
    console.error('Error adding liquidity:', error)
    throw error
  }
}
```

## Removing Liquidity Example

This example demonstrates how to remove liquidity from a Synthra position.

```javascript
import { ethers } from 'ethers'
import { NonfungiblePositionManager } from '@synthra-swap/periphery-sdk'

// Initialize provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

async function removeLiquidity(tokenId, liquidity) {
  try {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    
    // Create decrease liquidity parameters
    const decreaseParams = {
      tokenId: tokenId,
      liquidity: liquidity,
      amount0Min: 0, // Set appropriate slippage tolerance
      amount1Min: 0, // Set appropriate slippage tolerance
      deadline: Math.floor(Date.now() / 1000) + 1800 // 30 minutes
    }
    
    // Generate decrease liquidity calldata
    const { calldata, value } = NonfungiblePositionManager.removeCallParameters(decreaseParams)
    
    // Execute the transaction
    const tx = await signer.sendTransaction({
      data: calldata,
      value: value,
      from: await signer.getAddress(),
      to: NonfungiblePositionManager.POSITION_MANAGER_ADDRESS,
      gasLimit: ethers.utils.hexlify(1000000)
    })
    
    console.log(`Transaction submitted: ${tx.hash}`)
    const receipt = await tx.wait()
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`)
    
    return receipt
  } catch (error) {
    console.error('Error removing liquidity:', error)
    throw error
  }
}
```

## Collecting Fees Example

This example demonstrates how to collect fees from a Synthra position.

```javascript
import { ethers } from 'ethers'
import { NonfungiblePositionManager } from '@synthra-swap/periphery-sdk'

// Initialize provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

async function collectFees(tokenId) {
  try {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    
    // Create collect parameters
    const collectParams = {
      tokenId: tokenId,
      recipient: await signer.getAddress(),
      amount0Max: ethers.constants.MaxUint256,
      amount1Max: ethers.constants.MaxUint256
    }
    
    // Generate collect calldata
    const { calldata, value } = NonfungiblePositionManager.collectCallParameters(collectParams)
    
    // Execute the transaction
    const tx = await signer.sendTransaction({
      data: calldata,
      value: value,
      from: await signer.getAddress(),
      to: NonfungiblePositionManager.POSITION_MANAGER_ADDRESS,
      gasLimit: ethers.utils.hexlify(1000000)
    })
    
    console.log(`Transaction submitted: ${tx.hash}`)
    const receipt = await tx.wait()
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`)
    
    return receipt
  } catch (error) {
    console.error('Error collecting fees:', error)
    throw error
  }
}
```

## Fetching Pool Data Example

This example demonstrates how to fetch and display data for a Synthra pool.

```javascript
import { ethers } from 'ethers'
import { Token, Pool } from '@synthra-swap/sdk'

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_KEY')

// Define tokens (Ethereum Mainnet examples)
const WETH = new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH')
const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC')

async function getPoolData() {
  try {
    // Get pool address
    const poolAddress = Pool.getAddress(WETH, USDC, 3000) // 0.3% fee tier
    
    // Create pool contract instance
    const poolAbi = [
      'function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)',
      'function liquidity() external view returns (uint128)',
      'function fee() external view returns (uint24)',
      'function token0() external view returns (address)',
      'function token1() external view returns (address)',
      'function treasuryFee() external view returns (uint24)'
    ]
    
    const poolContract = new ethers.Contract(poolAddress, poolAbi, provider)
    
    // Fetch pool data
    const [slot0, liquidity, fee, token0, token1, treasuryFee] = await Promise.all([
      poolContract.slot0(),
      poolContract.liquidity(),
      poolContract.fee(),
      poolContract.token0(),
      poolContract.token1(),
      poolContract.treasuryFee()
    ])
    
    // Create pool instance
    const pool = new Pool(
      WETH,
      USDC,
      fee,
      slot0.sqrtPriceX96.toString(),
      liquidity.toString(),
      slot0.tick
    )
    
    // Calculate current prices
    const token0Price = pool.token0Price
    const token1Price = pool.token1Price
    
    // Format data for display
    const poolData = {
      address: poolAddress,
      token0: {
        address: token0,
        symbol: WETH.symbol,
        decimals: WETH.decimals
      },
      token1: {
        address: token1,
        symbol: USDC.symbol,
        decimals: USDC.decimals
      },
      fee: `${fee / 10000}%`,
      treasuryFee: `${treasuryFee / 10000}%`,
      totalFee: `${(parseInt(fee) + parseInt(treasuryFee)) / 10000}%`,
      liquidity: liquidity.toString(),
      sqrtPrice: slot0.sqrtPriceX96.toString(),
      tick: slot0.tick,
      token0Price: token0Price.toSignificant(6),
      token1Price: token1Price.toSignificant(6)
    }
    
    console.log('Pool Data:', poolData)
    return poolData
  } catch (error) {
    console.error('Error fetching pool data:', error)
    throw error
  }
}
```

## Fetching User Positions Example

This example demonstrates how to fetch a user's Synthra positions.

```javascript
import { ethers } from 'ethers'
import { Token, Pool, Position } from '@synthra-swap/sdk'

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_KEY')

// Define tokens (Ethereum Mainnet examples)
const WETH = new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH')
const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC')

async function getUserPositions(userAddress) {
  try {
    // Create position manager contract instance
    const positionManagerAddress = '0x906515Dc7c32ab887C8B8Dce6463ac3a7816Af38' // Synthra Position Manager
    const positionManagerAbi = [
      'function balanceOf(address owner) external view returns (uint256)',
      'function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)',
      'function positions(uint256 tokenId) external view returns (uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)'
    ]
    
    const positionManager = new ethers.Contract(positionManagerAddress, positionManagerAbi, provider)
    
    // Get number of positions owned by user
    const balance = await positionManager.balanceOf(userAddress)
    
    // Fetch all position token IDs
    const tokenIdPromises = []
    for (let i = 0; i < balance; i++) {
      tokenIdPromises.push(positionManager.tokenOfOwnerByIndex(userAddress, i))
    }
    const tokenIds = await Promise.all(tokenIdPromises)
    
    // Fetch position details for each token ID
    const positionPromises = tokenIds.map(tokenId => positionManager.positions(tokenId))
    const positionData = await Promise.all(positionPromises)
    
    // Format position data
    const positions = positionData.map((position, index) => {
      return {
        tokenId: tokenIds[index].toString(),
        token0: position.token0,
        token1: position.token1,
        fee: position.fee,
        tickLower: position.tickLower,
        tickUpper: position.tickUpper,
        liquidity: position.liquidity.toString(),
        tokensOwed0: position.tokensOwed0.toString(),
        tokensOwed1: position.tokensOwed1.toString()
      }
    })
    
    console.log(`Found ${positions.length} positions for user ${userAddress}`)
    return positions
  } catch (error) {
    console.error('Error fetching user positions:', error)
    throw error
  }
}
```

## Using the GraphQL API Example

This example demonstrates how to use the Synthra GraphQL API to fetch data.

```javascript
import { request, gql } from 'graphql-request'

const SYNTHRA_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/synthra-swap/synthra-mainnet'

// Fetch top pools by volume
async function getTopPools(limit = 10) {
  const query = gql`
    {
      pools(
        first: ${limit}
        orderBy: volumeUSD
        orderDirection: desc
      ) {
        id
        token0 {
          id
          symbol
          name
        }
        token1 {
          id
          symbol
          name
        }
        feeTier
        volumeUSD
        volumeToken0
        volumeToken1
        liquidity
        sqrtPrice
        token0Price
        token1Price
        treasuryFeesUSD
      }
    }
  `
  
  try {
    const data = await request(SYNTHRA_SUBGRAPH_URL, query)
    return data.pools
  } catch (error) {
    console.error('Error fetching top pools:', error)
    throw error
  }
}

// Fetch user positions
async function getUserPositionsFromGraph(userAddress) {
  const query = gql`
    {
      positions(
        where: { owner: "${userAddress.toLowerCase()}" }
      ) {
        id
        owner
        pool {
          id
          token0 {
            id
            symbol
          }
          token1 {
            id
            symbol
          }
          feeTier
        }
        tickLower
        tickUpper
        liquidity
        depositedToken0
        depositedToken1
        withdrawnToken0
        withdrawnToken1
        collectedFeesToken0
        collectedFeesToken1
      }
    }
  `
  
  try {
    const data = await request(SYNTHRA_SUBGRAPH_URL, query)
    return data.positions
  } catch (error) {
    console.error('Error fetching user positions:', error)
    throw error
  }
}

// Fetch historical data for a pool
async function getPoolDayData(poolAddress, days = 30) {
  const query = gql`
    {
      poolDayDatas(
        first: ${days}
        orderBy: date
        orderDirection: desc
        where: { pool: "${poolAddress.toLowerCase()}" }
      ) {
        date
        volumeUSD
        volumeToken0
        volumeToken1
        tvlUSD
        feesUSD
        treasuryFeesUSD
        token0Price
        token1Price
      }
    }
  `
  
  try {
    const data = await request(SYNTHRA_SUBGRAPH_URL, query)
    return data.poolDayDatas
  } catch (error) {
    console.error('Error fetching pool day data:', error)
    throw error
  }
}
```

## Using the REST API Example

This example demonstrates how to use the Synthra REST API.

```javascript
// Initialize API client
class SynthraAPI {
  constructor(apiKey = null) {
    this.baseUrl = 'https://api.synthra.org/v1'
    this.apiKey = apiKey
  }
  
  async request(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    
    // Add query parameters
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        url.searchParams.append(key, params[key])
      }
    })
    
    // Set up headers
    const headers = {
      'Content-Type': 'application/json'
    }
    
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`
    }
    
    // Make request
    const response = await fetch(url.toString(), { headers })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error?.message || `API request failed: ${response.status}`)
    }
    
    return response.json()
  }
  
  // API methods
  async getTopPools(limit = 10) {
    return this.request('/pools', { limit, orderBy: 'volumeUSD' })
  }
  
  async getPool(poolAddress) {
    return this.request(`/pools/${poolAddress}`)
  }
  
  async getPoolTicks(poolAddress, limit = 1000) {
    return this.request(`/pools/${poolAddress}/ticks`, { limit })
  }
  
  async getUserPositions(userAddress) {
    return this.request('/positions', { owner: userAddress })
  }
  
  async getPoolHistory(poolAddress, resolution = 'day', limit = 30) {
    return this.request(`/pools/${poolAddress}/history`, { resolution, limit })
  }
  
  async getProtocolStats() {
    return this.request('/protocol/stats')
  }
  
  async getTreasuryData() {
    return this.request('/protocol/treasury')
  }
}

// Usage examples
async function apiExamples() {
  const api = new SynthraAPI('YOUR_API_KEY') // Optional API key
  
  try {
    // Get top pools
    const topPools = await api.getTopPools(5)
    console.log('Top 5 pools by volume:', topPools.pools)
    
    // Get specific pool
    const poolAddress = '0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8'
    const pool = await api.getPool(poolAddress)
    console.log('Pool details:', pool)
    
    // Get user positions
    const userAddress = '0xabcdef1234567890abcdef1234567890abcdef12'
    const positions = await api.getUserPositions(userAddress)
    console.log('User positions:', positions.positions)
    
    // Get protocol stats
    const stats = await api.getProtocolStats()
    console.log('Protocol stats:', stats)
    
    // Get treasury data
    const treasury = await api.getTreasuryData()
    console.log('Treasury data:', treasury)
    
  } catch (error) {
    console.error('API error:', error)
  }
}
```

## Treasury Fee Calculation Example

This example demonstrates how to calculate and display the treasury fee for swaps.

```javascript
import { ethers } from 'ethers'
import { Token, CurrencyAmount, Percent } from '@synthra-swap/sdk'

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_KEY')

// Define tokens (Ethereum Mainnet examples)
const WETH = new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH')
const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC')

// Calculate fees for a swap
function calculateFees(inputAmount, poolFeePercent) {
  // Convert input to CurrencyAmount
  const amount = CurrencyAmount.fromRawAmount(
    WETH,
    ethers.utils.parseEther(inputAmount).toString()
  )
  
  // Define fee percentages
  const poolFee = new Percent(poolFeePercent * 100, 10000) // e.g., 0.3% = 30 / 10000
  const treasuryFee = new Percent(10, 10000) // 0.1% = 10 / 10000
  const totalFee = new Percent(poolFeePercent * 100 + 10, 10000) // Pool fee + Treasury fee
  
  // Calculate fee amounts
  const poolFeeAmount = amount.multiply(poolFee)
  const treasuryFeeAmount = amount.multiply(treasuryFee)
  const totalFeeAmount = amount.multiply(totalFee)
  
  // Calculate output amount after fees
  const outputAmount = amount.subtract(totalFeeAmount)
  
  return {
    inputAmount: amount.toSignificant(6),
    poolFeePercent: poolFee.toFixed(2) + '%',
    treasuryFeePercent: treasuryFee.toFixed(2) + '%',
    totalFeePercent: totalFee.toFixed(2) + '%',
    poolFeeAmount: poolFeeAmount.toSignificant(6),
    treasuryFeeAmount: treasuryFeeAmount.toSignificant(6),
    totalFeeAmount: totalFeeAmount.toSignificant(6),
    outputAmount: outputAmount.toSignificant(6)
  }
}

// Example usage
const feeBreakdown = calculateFees('1.0', 0.3) // 1 ETH with 0.3% pool fee
console.log('Fee Breakdown:', feeBreakdown)
/*
Output:
Fee Breakdown: {
  inputAmount: '1.0',
  poolFeePercent: '0.30%',
  treasuryFeePercent: '0.10%',
  totalFeePercent: '0.40%',
  poolFeeAmount: '0.003',
  treasuryFeeAmount: '0.001',
  totalFeeAmount: '0.004',
  outputAmount: '0.996'
}
*/
```

## React Hook for Synthra Integration

This example provides a custom React hook for Synthra integration.

```jsx
import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import { Token, Pool, CurrencyAmount, TradeType } from '@synthra-swap/sdk'
import { SynthraSwapRouter } from '@synthra-swap/swap-router-sdk'

// Custom hook for Synthra integration
function useSynthra() {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Initialize connection
  const connect = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed')
      }
      
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = accounts[0]
      
      // Initialize provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const network = await provider.getNetwork()
      
      setAccount(account)
      setProvider(provider)
      setSigner(signer)
      setChainId(network.chainId)
      
      // Set up event listeners
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null)
      })
      
      window.ethereum.on('chainChanged', (chainId) => {
        setChainId(parseInt(chainId, 16))
        // Reload the page to avoid any state inconsistency
        window.location.reload()
      })
      
    } catch (err) {
      console.error('Connection error:', err)
      setError(err.message || 'Failed to connect')
    } finally {
      setLoading(false)
    }
  }, [])
  
  // Execute a swap
  const executeSwap = useCallback(async (params) => {
    const { tokenIn, tokenOut, amountIn, slippageTolerance = 0.5, deadline = 30 } = params
    
    if (!signer || !provider || !account) {
      throw new Error('Wallet not connected')
    }
    
    setLoading(true)
    setError(null)
    
    try {
      // Create token instances
      const tokenInInstance = new Token(
        chainId,
        tokenIn.address,
        tokenIn.decimals,
        tokenIn.symbol
      )
      
      const tokenOutInstance = new Token(
        chainId,
        tokenOut.address,
        tokenOut.decimals,
        tokenOut.symbol
      )
      
      // Get pool
      const poolProvider = new SynthraPoolProvider(provider)
      const pool = await poolProvider.getPool(tokenInInstance, tokenOutInstance, tokenIn.fee || 3000)
      
      // Create trade
      const amountInRaw = ethers.utils.parseUnits(amountIn.toString(), tokenIn.decimals).toString()
      const currencyAmountIn = CurrencyAmount.fromRawAmount(tokenInInstance, amountInRaw)
      
      const trade = await Trade.createUncheckedTrade({
        route: new Route([pool], tokenInInstance, tokenOutInstance),
        inputAmount: currencyAmountIn,
        outputAmount: CurrencyAmount.fromRawAmount(tokenOutInstance, '0'),
        tradeType: TradeType.EXACT_INPUT
      })
      
      // Set swap options
      const options = {
        slippageTolerance: new Percent(Math.floor(slippageTolerance * 100), 10000),
        deadline: Math.floor(Date.now() / 1000) + (deadline * 60),
        recipient: account
      }
      
      // Generate swap parameters
      const { calldata, value } = SynthraSwapRouter.swapCallParameters(trade, options)
      
      // Execute the swap
      const tx = await signer.sendTransaction({
        data: calldata,
        value: value,
        from: account,
        to: SynthraSwapRouter.ROUTER_ADDRESS,
        gasLimit: ethers.utils.hexlify(1000000)
      })
      
      const receipt = await tx.wait()
      
      return {
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString()
      }
      
    } catch (err) {
      console.error('Swap error:', err)
      setError(err.message || 'Failed to execute swap')
      throw err
    } finally {
      setLoading(false)
    }
  }, [signer, provider, account, chainId])
  
  // Get quote for a swap
  const getSwapQuote = useCallback(async (params) => {
    const { tokenIn, tokenOut, amountIn } = params
    
    if (!provider) {
      throw new Error('Provider not initialized')
    }
    
    try {
      // Create token instances
      const tokenInInstance = new Token(
        chainId,
        tokenIn.address,
        tokenIn.decimals,
        tokenIn.symbol
      )
      
      const tokenOutInstance = new Token(
        chainId,
        tokenOut.address,
        tokenOut.decimals,
        tokenOut.symbol
      )
      
      // Get pool
      const poolProvider = new SynthraPoolProvider(provider)
      const pool = await poolProvider.getPool(tokenInInstance, tokenOutInstance, tokenIn.fee || 3000)
      
      // Create trade
      const amountInRaw = ethers.utils.parseUnits(amountIn.toString(), tokenIn.decimals).toString()
      const currencyAmountIn = CurrencyAmount.fromRawAmount(tokenInInstance, amountInRaw)
      
      const trade = await Trade.createUncheckedTrade({
        route: new Route([pool], tokenInInstance, tokenOutInstance),
        inputAmount: currencyAmountIn,
        outputAmount: CurrencyAmount.fromRawAmount(tokenOutInstance, '0'),
        tradeType: TradeType.EXACT_INPUT
      })
      
      // Calculate output amount
      const outputAmount = trade.outputAmount
      const outputAmountFormatted = ethers.utils.formatUnits(
        outputAmount.quotient.toString(),
        tokenOut.decimals
      )
      
      // Calculate price impact
      const priceImpact = trade.priceImpact.toFixed(2)
      
      // Calculate fees
      const poolFeePercent = (pool.fee / 10000).toFixed(3)
      const treasuryFeePercent = '0.100' // Fixed 0.1%
      const totalFeePercent = (pool.fee / 10000 + 0.1).toFixed(3)
      
      const poolFeeAmount = currencyAmountIn.multiply(pool.fee).divide(1000000)
      const treasuryFeeAmount = currencyAmountIn.multiply(1000).divide(1000000)
      
      return {
        inputAmount: amountIn,
        outputAmount: outputAmountFormatted,
        executionPrice: trade.executionPrice.toSignificant(6),
        priceImpact: priceImpact,
        route: trade.route.path.map(token => token.symbol).join(' → '),
        fees: {
          poolFeePercent: poolFeePercent + '%',
          treasuryFeePercent: treasuryFeePercent + '%',
          totalFeePercent: totalFeePercent + '%',
          poolFeeAmount: poolFeeAmount.toSignificant(6),
          treasuryFeeAmount: treasuryFeeAmount.toSignificant(6)
        }
      }
      
    } catch (err) {
      console.error('Quote error:', err)
      throw err
    }
  }, [provider, chainId])
  
  return {
    account,
    provider,
    signer,
    chainId,
    loading,
    error,
    connect,
    executeSwap,
    getSwapQuote
  }
}

// Example usage in a component
function SwapComponent() {
  const { 
    account, 
    loading, 
    error, 
    connect, 
    executeSwap, 
    getSwapQuote 
  } = useSynthra()
  
  const [inputAmount, setInputAmount] = useState('1.0')
  const [quote, setQuote] = useState(null)
  const [swapResult, setSwapResult] = useState(null)
  
  // Define tokens
  const tokens = {
    WETH: {
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      decimals: 18,
      symbol: 'WETH',
      fee: 3000 // 0.3%
    },
    USDC: {
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 6,
      symbol: 'USDC',
      fee: 3000 // 0.3%
    }
  }
  
  // Get quote when input amount changes
  useEffect(() => {
    if (!account || !inputAmount) return
    
    const fetchQuote = async () => {
      try {
        const quoteResult = await getSwapQuote({
          tokenIn: tokens.WETH,
          tokenOut: tokens.USDC,
          amountIn: inputAmount
        })
        setQuote(quoteResult)
      } catch (err) {
        console.error('Failed to get quote:', err)
      }
    }
    
    fetchQuote()
  }, [account, inputAmount, getSwapQuote])
  
  // Handle swap
  const handleSwap = async () => {
    try {
      const result = await executeSwap({
        tokenIn: tokens.WETH,
        tokenOut: tokens.USDC,
        amountIn: inputAmount,
        slippageTolerance: 0.5 // 0.5%
      })
      setSwapResult(result)
    } catch (err) {
      console.error('Swap failed:', err)
    }
  }
  
  return (
    <div>
      <h2>Synthra Swap</h2>
      
      {!account ? (
        <button onClick={connect} disabled={loading}>
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div>
          <p>Connected: {account}</p>
          
          <div>
            <label>WETH Amount:</label>
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              disabled={loading}
            />
          </div>
          
          {quote && (
            <div>
              <h3>Quote</h3>
              <p>Output: {quote.outputAmount} USDC</p>
              <p>Price: 1 WETH = {quote.executionPrice} USDC</p>
              <p>Price Impact: {quote.priceImpact}%</p>
              <p>Route: {quote.route}</p>
              <h4>Fees</h4>
              <p>Pool Fee: {quote.fees.poolFeePercent} ({quote.fees.poolFeeAmount} WETH)</p>
              <p>Treasury Fee: {quote.fees.treasuryFeePercent} ({quote.fees.treasuryFeeAmount} WETH)</p>
              <p>Total Fee: {quote.fees.totalFeePercent}</p>
            </div>
          )}
          
          <button onClick={handleSwap} disabled={loading || !quote}>
            {loading ? 'Processing...' : 'Swap'}
          </button>
          
          {error && <p className="error">Error: {error}</p>}
          
          {swapResult && (
            <div>
              <h3>Swap Successful!</h3>
              <p>Transaction: {swapResult.transactionHash}</p>
              <p>Block: {swapResult.blockNumber}</p>
              <p>Gas Used: {swapResult.gasUsed}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

## Conclusion

These examples demonstrate the core functionality of the Synthra protocol and provide a starting point for your integration. For more advanced use cases or specific requirements, refer to the [SDK Documentation](sdk.md) and [API Documentation](api.md).

Remember that all swaps on Synthra include the 0.1% treasury fee in addition to the pool fee, which funds protocol development and token buybacks. This should be accounted for in your integration to provide accurate fee information to users.

For additional support, join our [Discord community](https://discord.synthra.org) or reach out to our developer support team at [developers@synthra.org](mailto:developers@synthra.org).

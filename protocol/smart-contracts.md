# Smart Contracts

This page provides an overview of the key smart contracts that power the Synthra protocol. Understanding these contracts is essential for developers who want to integrate with Synthra or build on top of it.

## Contract Architecture

Synthra's smart contracts are organized into two main layers:

1. **Core Contracts**: The foundational contracts that implement the core protocol logic
2. **Periphery Contracts**: Helper contracts that facilitate interaction with the core contracts

This separation enhances security by keeping the core logic minimal and immutable while allowing the periphery to evolve.

## Core Contracts

### SynthraFactory

The factory contract is responsible for creating and managing pools.

**Key Functions:**

* `createPool(address tokenA, address tokenB, uint24 fee)`: Creates a new pool for the given token pair and fee tier
* `getPool(address tokenA, address tokenB, uint24 fee)`: Returns the address of the pool for the given tokens and fee tier
* `setOwner(address _owner)`: Transfers ownership of the factory
* `enableFeeAmount(uint24 fee, int24 tickSpacing)`: Enables a new fee amount with the associated tick spacing

**Events:**

* `PoolCreated`: Emitted when a new pool is created
* `OwnerChanged`: Emitted when the factory owner changes
* `FeeAmountEnabled`: Emitted when a new fee amount is enabled

### SynthraPool

Each pool is an instance of the SynthraPool contract, managing a specific token pair with a specific fee tier.

**Key Functions:**

* `swap(address recipient, bool zeroForOne, int256 amountSpecified, uint160 sqrtPriceLimitX96, bytes calldata data)`: Executes a swap
* `mint(address recipient, int24 tickLower, int24 tickUpper, uint128 amount, bytes calldata data)`: Adds liquidity to a position
* `burn(int24 tickLower, int24 tickUpper, uint128 amount)`: Removes liquidity from a position
* `collect(address recipient, int24 tickLower, int24 tickUpper, uint128 amount0Requested, uint128 amount1Requested)`: Collects fees earned by a position
* `observe(uint32[] secondsAgos)`: Returns TWAP observations for the specified seconds ago

**Events:**

* `Mint`: Emitted when liquidity is added
* `Burn`: Emitted when liquidity is removed
* `Swap`: Emitted when a swap occurs
* `Collect`: Emitted when fees are collected
* `Flash`: Emitted when a flash loan occurs

### SynthraTreasuryFeeCollector

This contract collects the 0.1% treasury fee from all pools and manages its distribution.

**Key Functions:**

* `collectFees(address pool)`: Collects accumulated treasury fees from a specific pool
* `withdrawFees(address token, address recipient, uint256 amount)`: Withdraws collected fees to the treasury
* `setTreasuryAddress(address newTreasury)`: Updates the treasury address
* `setFeePercentage(uint24 newFeePercentage)`: Updates the treasury fee percentage (governance controlled)

**Events:**

* `FeesCollected`: Emitted when fees are collected from a pool
* `FeesWithdrawn`: Emitted when fees are withdrawn to the treasury
* `TreasuryAddressChanged`: Emitted when the treasury address is updated
* `FeePercentageChanged`: Emitted when the fee percentage is updated

## Periphery Contracts

### SynthraRouter

The router contract provides a user-friendly interface for interacting with pools.

**Key Functions:**

* `exactInputSingle(ExactInputSingleParams params)`: Swaps an exact amount of one token for as much as possible of another
* `exactInput(ExactInputParams params)`: Swaps an exact amount of tokens through multiple pools (path)
* `exactOutputSingle(ExactOutputSingleParams params)`: Swaps as little as possible of one token for an exact amount of another
* `exactOutput(ExactOutputParams params)`: Swaps as little as possible of one token for an exact amount of another through multiple pools
* `addLiquidity(AddLiquidityParams params)`: Adds liquidity to a position
* `removeLiquidity(RemoveLiquidityParams params)`: Removes liquidity from a position

**Events:**

* None (relies on underlying pool events)

### SynthraNonfungiblePositionManager

This contract manages liquidity positions as NFTs, making them transferable and composable.

**Key Functions:**

* `mint(MintParams params)`: Creates a new position and mints an NFT
* `increaseLiquidity(IncreaseLiquidityParams params)`: Adds liquidity to an existing position
* `decreaseLiquidity(DecreaseLiquidityParams params)`: Removes liquidity from a position
* `collect(CollectParams params)`: Collects fees earned by a position
* `burn(uint256 tokenId)`: Burns a position NFT (must have 0 liquidity)

**Events:**

* `IncreaseLiquidity`: Emitted when liquidity is added to a position
* `DecreaseLiquidity`: Emitted when liquidity is removed from a position
* `Collect`: Emitted when fees are collected
* `Transfer`: Standard ERC-721 transfer event

### SynthraQuoter

The quoter contract simulates swaps to provide price quotes without executing the actual swap.

**Key Functions:**

* `quoteExactInputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96)`: Quotes an exact input swap
* `quoteExactInput(bytes path, uint256 amountIn)`: Quotes an exact input swap through multiple pools
* `quoteExactOutputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountOut, uint160 sqrtPriceLimitX96)`: Quotes an exact output swap
* `quoteExactOutput(bytes path, uint256 amountOut)`: Quotes an exact output swap through multiple pools

**Events:**

* None (read-only contract)

## Governance Contracts

### SynthraToken

The SYNTH governance token contract.

**Key Functions:**

* Standard ERC-20 functions
* `delegate(address delegatee)`: Delegates voting power to another address
* `transfer(address to, uint256 amount)`: Transfers tokens with automatic delegation
* `mint(address to, uint256 amount)`: Mints new tokens (restricted to authorized minters)

**Events:**

* Standard ERC-20 events
* `DelegateChanged`: Emitted when delegation changes
* `DelegateVotesChanged`: Emitted when delegated votes change

### SynthraGovernor

The governance contract that manages proposals and voting.

**Key Functions:**

* `propose(address[] targets, uint256[] values, bytes[] calldatas, string description)`: Creates a new proposal
* `castVote(uint256 proposalId, uint8 support)`: Casts a vote on a proposal
* `execute(address[] targets, uint256[] values, bytes[] calldatas, bytes32 descriptionHash)`: Executes a successful proposal
* `queue(address[] targets, uint256[] values, bytes[] calldatas, bytes32 descriptionHash)`: Queues a successful proposal for execution

**Events:**

* `ProposalCreated`: Emitted when a proposal is created
* `VoteCast`: Emitted when a vote is cast
* `ProposalExecuted`: Emitted when a proposal is executed
* `ProposalQueued`: Emitted when a proposal is queued

### SynthraBuyback

The contract that executes token buybacks using treasury funds.

**Key Functions:**

* `executeBuyback(address token, uint256 amount, uint256 minSynthReceived)`: Executes a buyback of SYNTH tokens
* `setBuybackStrategy(BuybackStrategy strategy)`: Sets the buyback strategy parameters
* `emergencyWithdraw(address token, uint256 amount)`: Emergency function to withdraw funds (governance controlled)

**Events:**

* `BuybackExecuted`: Emitted when a buyback is executed
* `StrategyUpdated`: Emitted when the buyback strategy is updated
* `EmergencyWithdrawal`: Emitted during an emergency withdrawal

## Contract Addresses

## TO DO

## Contract Interactions

The following diagram illustrates the typical interactions between contracts:

```
User -> SynthraRouter -> SynthraPool -> SynthraTreasuryFeeCollecto
                      -> SynthraNonfungiblePositionManager
                      
Governance -> SynthraGovernor -> SynthraTreasuryFeeCollector
                              -> SynthraBuyback
```



## Contract Upgradability

The core contracts (Factory, Pool) are immutable for security reasons. Protocol upgrades are handled through:

1. Deploying new periphery contracts that maintain compatibility with existing core contracts
2. Phased deployments of new features

This approach balances security with the need for protocol evolution.

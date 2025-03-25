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
- `createPool(address tokenA, address tokenB, uint24 fee)`: Creates a new pool for the given token pair and fee tier
- `getPool(address tokenA, address tokenB, uint24 fee)`: Returns the address of the pool for the given tokens and fee tier
- `setOwner(address _owner)`: Transfers ownership of the factory
- `enableFeeAmount(uint24 fee, int24 tickSpacing)`: Enables a new fee amount with the associated tick spacing

**Events:**
- `PoolCreated`: Emitted when a new pool is created
- `OwnerChanged`: Emitted when the factory owner changes
- `FeeAmountEnabled`: Emitted when a new fee amount is enabled

### SynthraPool

Each pool is an instance of the SynthraPool contract, managing a specific token pair with a specific fee tier.

**Key Functions:**
- `swap(address recipient, bool zeroForOne, int256 amountSpecified, uint160 sqrtPriceLimitX96, bytes calldata data)`: Executes a swap
- `mint(address recipient, int24 tickLower, int24 tickUpper, uint128 amount, bytes calldata data)`: Adds liquidity to a position
- `burn(int24 tickLower, int24 tickUpper, uint128 amount)`: Removes liquidity from a position
- `collect(address recipient, int24 tickLower, int24 tickUpper, uint128 amount0Requested, uint128 amount1Requested)`: Collects fees earned by a position
- `observe(uint32[] secondsAgos)`: Returns TWAP observations for the specified seconds ago

**Events:**
- `Mint`: Emitted when liquidity is added
- `Burn`: Emitted when liquidity is removed
- `Swap`: Emitted when a swap occurs
- `Collect`: Emitted when fees are collected
- `Flash`: Emitted when a flash loan occurs

### SynthraTreasuryFeeCollector

This contract collects the 0.1% treasury fee from all pools and manages its distribution.

**Key Functions:**
- `collectFees(address pool)`: Collects accumulated treasury fees from a specific pool
- `withdrawFees(address token, address recipient, uint256 amount)`: Withdraws collected fees to the treasury
- `setTreasuryAddress(address newTreasury)`: Updates the treasury address
- `setFeePercentage(uint24 newFeePercentage)`: Updates the treasury fee percentage (governance controlled)

**Events:**
- `FeesCollected`: Emitted when fees are collected from a pool
- `FeesWithdrawn`: Emitted when fees are withdrawn to the treasury
- `TreasuryAddressChanged`: Emitted when the treasury address is updated
- `FeePercentageChanged`: Emitted when the fee percentage is updated

## Periphery Contracts

### SynthraRouter

The router contract provides a user-friendly interface for interacting with pools.

**Key Functions:**
- `exactInputSingle(ExactInputSingleParams params)`: Swaps an exact amount of one token for as much as possible of another
- `exactInput(ExactInputParams params)`: Swaps an exact amount of tokens through multiple pools (path)
- `exactOutputSingle(ExactOutputSingleParams params)`: Swaps as little as possible of one token for an exact amount of another
- `exactOutput(ExactOutputParams params)`: Swaps as little as possible of one token for an exact amount of another through multiple pools
- `addLiquidity(AddLiquidityParams params)`: Adds liquidity to a position
- `removeLiquidity(RemoveLiquidityParams params)`: Removes liquidity from a position

**Events:**
- None (relies on underlying pool events)

### SynthraNonfungiblePositionManager

This contract manages liquidity positions as NFTs, making them transferable and composable.

**Key Functions:**
- `mint(MintParams params)`: Creates a new position and mints an NFT
- `increaseLiquidity(IncreaseLiquidityParams params)`: Adds liquidity to an existing position
- `decreaseLiquidity(DecreaseLiquidityParams params)`: Removes liquidity from a position
- `collect(CollectParams params)`: Collects fees earned by a position
- `burn(uint256 tokenId)`: Burns a position NFT (must have 0 liquidity)

**Events:**
- `IncreaseLiquidity`: Emitted when liquidity is added to a position
- `DecreaseLiquidity`: Emitted when liquidity is removed from a position
- `Collect`: Emitted when fees are collected
- `Transfer`: Standard ERC-721 transfer event

### SynthraQuoter

The quoter contract simulates swaps to provide price quotes without executing the actual swap.

**Key Functions:**
- `quoteExactInputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96)`: Quotes an exact input swap
- `quoteExactInput(bytes path, uint256 amountIn)`: Quotes an exact input swap through multiple pools
- `quoteExactOutputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountOut, uint160 sqrtPriceLimitX96)`: Quotes an exact output swap
- `quoteExactOutput(bytes path, uint256 amountOut)`: Quotes an exact output swap through multiple pools

**Events:**
- None (read-only contract)

## Governance Contracts

### SynthraToken

The SYNTH governance token contract.

**Key Functions:**
- Standard ERC-20 functions
- `delegate(address delegatee)`: Delegates voting power to another address
- `transfer(address to, uint256 amount)`: Transfers tokens with automatic delegation
- `mint(address to, uint256 amount)`: Mints new tokens (restricted to authorized minters)

**Events:**
- Standard ERC-20 events
- `DelegateChanged`: Emitted when delegation changes
- `DelegateVotesChanged`: Emitted when delegated votes change

### SynthraGovernor

The governance contract that manages proposals and voting.

**Key Functions:**
- `propose(address[] targets, uint256[] values, bytes[] calldatas, string description)`: Creates a new proposal
- `castVote(uint256 proposalId, uint8 support)`: Casts a vote on a proposal
- `execute(address[] targets, uint256[] values, bytes[] calldatas, bytes32 descriptionHash)`: Executes a successful proposal
- `queue(address[] targets, uint256[] values, bytes[] calldatas, bytes32 descriptionHash)`: Queues a successful proposal for execution

**Events:**
- `ProposalCreated`: Emitted when a proposal is created
- `VoteCast`: Emitted when a vote is cast
- `ProposalExecuted`: Emitted when a proposal is executed
- `ProposalQueued`: Emitted when a proposal is queued

### SynthraBuyback

The contract that executes token buybacks using treasury funds.

**Key Functions:**
- `executeBuyback(address token, uint256 amount, uint256 minSynthReceived)`: Executes a buyback of SYNTH tokens
- `setBuybackStrategy(BuybackStrategy strategy)`: Sets the buyback strategy parameters
- `emergencyWithdraw(address token, uint256 amount)`: Emergency function to withdraw funds (governance controlled)

**Events:**
- `BuybackExecuted`: Emitted when a buyback is executed
- `StrategyUpdated`: Emitted when the buyback strategy is updated
- `EmergencyWithdrawal`: Emitted during an emergency withdrawal

## Contract Addresses

| Contract | Address | Network |
|----------|---------|---------|
| SynthraFactory | 0x1F98431c8aD98523631AE4a59f267346ea31F984 | Ethereum Mainnet |
| SynthraTreasuryFeeCollector | 0x8F97B2E6eD45D31CFB9A51144e17F6F5e2F5E44F | Ethereum Mainnet |
| SynthraRouter | 0xE592427A0AEce92De3Edee1F18E0157C05861564 | Ethereum Mainnet |
| SynthraNonfungiblePositionManager | 0xC36442b4a4522E871399CD717aBDD847Ab11FE88 | Ethereum Mainnet |
| SynthraToken | 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 | Ethereum Mainnet |
| SynthraGovernor | 0x408ED6354d4973f66138C91495F2f2FCbd8724C3 | Ethereum Mainnet |
| SynthraBuyback | 0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B | Ethereum Mainnet |

## Contract Interactions

The following diagram illustrates the typical interactions between contracts:

```
User -> SynthraRouter -> SynthraPool -> SynthraTreasuryFeeCollector
                      -> SynthraNonfungiblePositionManager
                      
Governance -> SynthraGovernor -> SynthraTreasuryFeeCollector
                              -> SynthraBuyback
```

## Contract Security

All Synthra contracts have undergone rigorous security audits and implement best practices:

- Formal verification of critical components
- Comprehensive test coverage
- Access control restrictions
- Reentrancy protection
- Integer overflow/underflow protection
- Gas optimization

For more details on security measures, see the [Security](security.md) and [Audits](audits.md) pages.

## For Developers

Developers looking to integrate with Synthra should:

1. Use the periphery contracts (Router, NonfungiblePositionManager) rather than interacting directly with core contracts
2. Refer to the [SDK](../developers/sdk.md) documentation for simplified integration
3. Review the [Examples](../developers/examples.md) for common integration patterns

## Contract Upgradability

The core contracts (Factory, Pool) are immutable for security reasons. Protocol upgrades are handled through:

1. Deploying new periphery contracts that maintain compatibility with existing core contracts
2. Governance-approved migrations to new versions when necessary
3. Phased deployments of new features

This approach balances security with the need for protocol evolution.

# Pools

Liquidity pools are the foundation of Synthra's decentralized exchange functionality. This page explains how pools work in Synthra and how they differ from traditional automated market makers.

## What is a Liquidity Pool?

A liquidity pool in Synthra is a collection of tokens locked in a smart contract that facilitates trading between the two tokens. Each pool:

* Contains exactly two tokens
* Operates according to a specific fee tier
* Aggregates liquidity from multiple providers
* Enables price discovery through trading activity

## Pool Creation

Anyone can create a new pool in Synthra by:

1. Selecting two ERC-20 tokens
2. Choosing a fee tier (0.01%, 0.05%, 0.3%, or 1%)
3. Providing the initial liquidity

Once created, other liquidity providers can add liquidity to the pool, and traders can begin swapping between the two tokens.

## Fee Tiers

Synthra offers multiple fee tiers to accommodate different token pairs and trading characteristics:

* **0.01%**: Designed for stable pairs (e.g., stablecoin to stablecoin)
* **0.05%**: For pairs with low volatility
* **0.3%**: For most standard pairs
* **1%**: For exotic pairs with high volatility

Each fee tier for the same token pair creates a separate pool with its own liquidity and price. This allows liquidity providers to choose the risk-reward profile that best suits their strategy.

## Pool Architecture

### Ticks and Tick Spacing

The price range in a Synthra pool is divided into "ticks," which represent discrete price points. The spacing between ticks varies by fee tier:

* Lower fee tiers have tighter tick spacing (more granular price points)
* Higher fee tiers have wider tick spacing (fewer price points)

This design balances gas efficiency with price precision based on the expected volatility of the pairs in each fee tier.

### Active Liquidity

At any given moment, only a portion of the total liquidity in a pool is "active" - specifically, the liquidity that covers the current price. This active liquidity is what determines the price impact of trades.

The formula for calculating the amount of tokens received in a swap is based on the constant product formula `x * y = k`, but applied only to the active liquidity within the current price range.

## Price Oracle

Each Synthra pool includes a built-in price oracle that tracks the time-weighted average price (TWAP) of the assets. This oracle:

* Provides reliable price data for external applications
* Is resistant to manipulation through time-weighting
* Can be queried for various time periods (e.g., 30-minute TWAP, 24-hour TWAP)

## Pool Metrics

When evaluating a pool, several key metrics are important:

* **Total Value Locked (TVL)**: The total value of assets in the pool
* **Volume**: The trading volume over a specific period
* **Fees Generated**: The total fees earned by liquidity providers
* **Liquidity Depth**: The amount of liquidity available at or near the current price
* **Price Range Coverage**: How well the liquidity is distributed across different price ranges

## Interacting with Pools

### For Liquidity Providers

Liquidity providers can:

1. Create new positions by specifying a price range and depositing tokens
2. Add liquidity to existing positions
3. Remove liquidity from positions
4. Collect fees earned by their positions

### For Traders

Traders interact with pools by:

1. Swapping one token for another
2. The swap is executed against the pool with the best price (considering fees)

## Pool Risks

Providing liquidity to Synthra pools involves several risks:

* **Impermanent Loss**: The potential loss compared to holding when prices change
* **Smart Contract Risk**: The risk of bugs or vulnerabilities in the protocol
* **Market Risk**: General exposure to the assets in the pool

## Treasury Fee

In addition to the standard fee tiers that go to liquidity providers, Synthra implements a 0.1% treasury fee on all swaps. This fee:

* Is deducted from the base fee tier (e.g., a 0.3% pool effectively goes 0.2% to liquidity providers and 0.1% to treasury)
* Is directed to the protocol treasury
* Funds the buyback mechanism and protocol development

For more details on the treasury fee, see the [Treasury Fee](treasury-fee.md) page.

## Pool Visualization

The Synthra interface provides visualizations of pools, showing:

* The current price
* Liquidity distribution across price ranges
* Your positions relative to the current price
* Historical price and volume data

These visualizations help liquidity providers make informed decisions about where to place their liquidity.

## Advanced Pool Concepts

### Tick Liquidity

Liquidity in Synthra is not stored uniformly but is aggregated at specific ticks. When a position is created spanning multiple ticks, the liquidity is recorded at each tick boundary. When the price crosses a tick, liquidity is either added to or removed from the active set.

### Virtual Reserves

Unlike traditional AMMs that maintain actual reserves of both tokens at all times, Synthra uses the concept of "virtual reserves" - the theoretical amount of both tokens that would be available if all the active liquidity were distributed according to the constant product formula at the current price.

### Concentrated Liquidity Aggregation

The total liquidity at any price point is the sum of all individual positions that include that price in their range. This creates a dynamic liquidity profile that can adapt to market conditions as liquidity providers adjust their positions.

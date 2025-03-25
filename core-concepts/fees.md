# Fees

Fees are a critical component of the Synthra protocol, incentivizing liquidity provision and supporting protocol sustainability. This page explains the fee structure in Synthra and how fees are collected, distributed, and utilized.

## Fee Structure Overview

Synthra implements a dual fee structure:

1. **Pool Fees**: Variable fees that go to liquidity providers
2. **Treasury Fee**: A fixed 0.1% fee that goes to the protocol treasury

## Pool Fees

### Multiple Fee Tiers

Synthra offers four fee tiers for liquidity pools:

* **0.01%**: Designed for stable pairs (e.g., stablecoin to stablecoin)
* **0.05%**: For pairs with low volatility
* **0.3%**: For most standard pairs
* **1%**: For exotic pairs with high volatility

Each fee tier for the same token pair creates a separate pool with its own liquidity and price curve. This allows:

* Liquidity providers to choose the risk-reward profile that best suits their strategy
* Traders to select the pool that offers the best price considering fees
* Market forces to determine the optimal fee for each token pair

### Fee Collection

When a swap occurs, the pool fee is calculated as a percentage of the input amount and deducted from the tokens being swapped. These fees are not immediately distributed to liquidity providers but are accumulated within the pool.

### Fee Distribution

Fees are distributed proportionally to liquidity providers based on:

1. The amount of liquidity they've provided
2. Whether their liquidity is active (within range) at the time of the swap

Only liquidity that is active at the current price earns fees. This incentivizes liquidity providers to position their liquidity where it's most useful for traders.

### Collecting Earned Fees

Liquidity providers can collect their earned fees at any time by:

1. Navigating to the Pool section of the interface
2. Selecting their position
3. Clicking "Collect Fees"

Fees are collected in both tokens of the pool, proportional to the swaps that have occurred while the position was active.

## Treasury Fee

In addition to the pool fees, Synthra implements a fixed 0.1% treasury fee on all swaps. This fee:

* Is added to the base fee tier (e.g., a 0.3% pool effectively charges 0.4% total)
* Is directed to the protocol treasury
* Funds the buyback mechanism and protocol development

The treasury fee is a unique feature of Synthra that creates a sustainable funding model for the protocol. For more details, see the [Treasury Fee](treasury-fee.md) page.

## Total Fee Calculation

The total fee for a swap is calculated as:

```
Total Fee = Pool Fee + Treasury Fee
```

For example:

* Swap in a 0.01% pool: 0.01% + 0.1% = 0.11% total fee
* Swap in a 0.05% pool: 0.05% + 0.1% = 0.15% total fee
* Swap in a 0.3% pool: 0.3% + 0.1% = 0.4% total fee
* Swap in a 1% pool: 1% + 0.1% = 1.1% total fee

## Fee Economics

### For Liquidity Providers

The economics of providing liquidity in Synthra are determined by:

1. **Fee Tier**: Higher fee tiers generally generate more revenue per swap but may see less volume
2. **Price Range**: Narrower ranges concentrate liquidity and can earn more fees when prices stay within range
3. **Capital Efficiency**: Concentrated liquidity allows earning more fees with the same amount of capital
4. **Impermanent Loss**: Potential losses if token prices change significantly

### For Traders

When trading on Synthra, consider:

1. **Fee Impact**: Higher fee tiers may have better liquidity for some pairs, potentially offsetting the higher fee
2. **Price Impact**: Pools with more liquidity will have lower price impact for large trades
3. **Multi-hop Routes**: Sometimes trading through multiple pools can result in better overall execution

## Fee Comparison

Compared to traditional exchanges:

* **Centralized Exchanges**: Typically charge 0.1% to 0.5% per trade
* **Traditional AMMs**: Usually charge a fixed fee (e.g., 0.3%) for all pairs
* **Synthra**: Offers variable fees based on pair characteristics plus the treasury fee

The variable fee structure of Synthra allows the market to find the optimal balance between liquidity provider incentives and trader costs for each specific token pair.

## Fee Visualization

The Synthra interface provides visualizations to help understand fees:

* Fee breakdown during swap preview
* Historical fee earnings for liquidity positions
* Projected fee earnings based on volume and position size

## Advanced Fee Concepts

### Fee Growth Accumulators

Synthra tracks fees using "fee growth accumulators" that record the amount of fees earned per unit of liquidity over time. When a liquidity provider adds or removes liquidity, these accumulators are used to calculate their precise share of the fees.

### Fee Protocol Switch

The Synthra governance has the ability to activate a "fee protocol switch" that would direct a portion of the pool fees to the protocol treasury in addition to the treasury fee. This feature is currently not active but could be enabled through governance in the future.

### Fee-on-Transfer Tokens

Some tokens implement a fee on transfer (e.g., "tax tokens"). Synthra supports these tokens, but the fee calculation becomes more complex as the actual amount received by the pool may be less than the amount sent by the user.

# Pool

This guide explains how to use the Pool interface in Synthra to view, analyze, and interact with liquidity pools.

## Overview

The Pool interface allows you to explore existing liquidity pools, analyze their performance, and manage your liquidity positions. Understanding pool metrics is essential for making informed decisions as a liquidity provider or trader.

## Step-by-Step Guide

### 1. Accessing the Pool Interface

1. Navigate to [app.synthra.io](https://app.synthra.io)
2. Connect your wallet using the "Connect Wallet" button in the top right corner
3. Select "Pool" from the main navigation menu

### 2. Viewing Pool Overview

The Pool overview page displays:

1. **Your Positions**: A list of your active liquidity positions
2. **Create Position**: Button to add new liquidity
3. **Pool Search**: Tool to find specific pools

![Pool Overview Interface](../assets/images/pool-overview.png)

### 3. Exploring Specific Pools

To view details about a specific pool:

1. Click on a pool from your positions, or
2. Use the search function to find a pool by token pair
3. Select the fee tier if multiple pools exist for the same token pair

### 4. Understanding Pool Details

The pool details page provides comprehensive information:

#### Price Information
- Current price of the token pair
- Price range visualization
- Historical price chart with time frame options

#### Liquidity Information
- Total value locked (TVL) in the pool
- Liquidity distribution across price ranges
- Your positions relative to the current price (if applicable)

#### Fee Information
- Pool fee tier (0.01%, 0.05%, 0.3%, or 1%)
- Treasury fee (0.1%)
- 24-hour fee generation
- 7-day fee generation

#### Volume Information
- 24-hour trading volume
- 7-day trading volume
- Volume trend chart

### 5. Analyzing Liquidity Distribution

The liquidity distribution chart shows:

1. **Price Range**: The x-axis represents the price range
2. **Liquidity Depth**: The y-axis shows the amount of liquidity at each price point
3. **Current Price**: Marked with a vertical line
4. **Your Positions**: Highlighted if you have active liquidity in the pool

This visualization helps you understand:
- Where liquidity is concentrated
- How well the pool can handle large trades
- Strategic price ranges for providing liquidity

### 6. Viewing Your Positions

If you have positions in the selected pool, you'll see:

1. **Position Range**: The price range of your position
2. **Liquidity Amount**: How much liquidity you've provided
3. **Fees Earned**: The fees you've accumulated
4. **Position Value**: The current value of your position
5. **Status**: Whether your position is in-range (active) or out-of-range (inactive)

### 7. Position Management Options

For each position, you can:

1. **Increase Liquidity**: Add more tokens to your position
2. **Decrease Liquidity**: Remove some tokens from your position
3. **Collect Fees**: Claim accumulated trading fees
4. **Close Position**: Remove all liquidity and close the position

## Advanced Pool Features

### Pool Analytics

The Analytics tab provides deeper insights:

1. **Fee Growth**: Historical fee generation trends
2. **Liquidity Changes**: How pool liquidity has evolved over time
3. **Price Range Coverage**: Analysis of liquidity distribution efficiency
4. **Top Positions**: Largest liquidity positions in the pool (anonymized)

### Price Oracle Data

Synthra pools function as price oracles, providing:

1. **TWAP (Time-Weighted Average Price)**: Manipulation-resistant price data
2. **Historical Price Points**: Price observations over various time periods
3. **Oracle Reliability Metrics**: Data on oracle usage and reliability

### Fee Projections

For active positions, Synthra provides:

1. **Projected Fees**: Estimated future earnings based on current volume
2. **APR Estimation**: Annualized percentage return on your liquidity
3. **Comparison Tool**: Compare potential returns across different fee tiers

## Understanding Pool Economics

### Concentrated Liquidity Efficiency

Synthra's concentrated liquidity model means:

1. Liquidity is only active when the price is within its specified range
2. Active liquidity earns higher fees per token compared to traditional AMMs
3. Narrower ranges can earn more fees but risk becoming inactive if price moves out of range

### Fee Tier Selection

Different fee tiers serve different purposes:

1. **0.01%**: For stable pairs with minimal price movement (e.g., USDC-USDT)
2. **0.05%**: For low-volatility pairs (e.g., ETH-stETH)
3. **0.3%**: For standard pairs with moderate volatility (e.g., ETH-USDC)
4. **1%**: For exotic pairs with high volatility (e.g., new tokens)

Higher fee tiers compensate liquidity providers for increased impermanent loss risk.

### Treasury Fee Impact

In addition to the pool fee, Synthra implements a 0.1% treasury fee that:

1. Creates a sustainable funding source for protocol development
2. Enables token buybacks that benefit the ecosystem
3. Adds a small additional cost to trades (e.g., 0.3% pool + 0.1% treasury = 0.4% total)

## Best Practices for Pool Analysis

1. **Compare Fee Generation**: Look at fees relative to TVL to assess pool efficiency
2. **Analyze Liquidity Distribution**: Well-distributed liquidity indicates a healthy pool
3. **Monitor Price Trends**: Understanding price movement helps in positioning liquidity
4. **Check Volume Consistency**: Consistent volume suggests reliable fee generation
5. **Consider Price Impact**: Pools with deep liquidity offer better trading conditions

## Troubleshooting Common Issues

### Pool Not Appearing

If you can't find a specific pool:

1. Verify the token addresses are correct
2. Check if the pool exists in the selected fee tier
3. Try searching for the reverse token pair (e.g., USDC-ETH instead of ETH-USDC)

### Position Data Discrepancy

If position data seems incorrect:

1. Refresh the page
2. Verify transaction history on the blockchain explorer
3. Check if you're connected with the correct wallet

### Price Range Visualization Issues

If the price range visualization is unclear:

1. Adjust the zoom level using the controls
2. Switch between linear and logarithmic scale
3. Try different time frames for historical data

## Next Steps

After exploring pools, you might want to:

- [Add Liquidity](add-liquidity.md) to start earning fees
- [Remove Liquidity](remove-liquidity.md) from existing positions
- Learn more about [Concentrated Liquidity](../core-concepts/concentrated-liquidity.md) to optimize your positions

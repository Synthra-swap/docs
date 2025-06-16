# Remove Liquidity

This guide explains how to remove liquidity from Synthra pools, collect earned fees, and manage your positions effectively.

## Overview

Removing liquidity from Synthra allows you to withdraw your tokens from a pool when you want to exit a position, rebalance your portfolio, or realize your earnings. You can remove all or part of your liquidity, and collect any accumulated fees in the process.

## Step-by-Step Guide

### 1. Accessing Your Positions

1. Navigate to [app.synthra.org](https://app.synthra.org)
2. Connect your wallet using the "Connect Wallet" button in the top right corner
3. Select "Pool" from the main navigation menu
4. You'll see a list of your active liquidity positions

### 2. Selecting a Position

1. Find the position you want to remove liquidity from
2. Click on the position to view its details
3. The position details page will show:
   * Price range of your position
   * Current composition (amounts of each token)
   * Fees earned
   * Whether the position is in-range (active) or out-of-range (inactive)

<!-- ![Position Details](../assets/images/remove-liquidity-position.png) -->

### 3. Choosing Removal Amount

1. Click the "Remove Liquidity" button
2. Use the slider to select how much liquidity to remove:
   * 25%
   * 50%
   * 75%
   * 100% (Max)
   * Or enter a custom percentage
3. The interface will display the estimated amounts of each token you'll receive

<!-- ![Remove Liquidity Interface](../assets/images/remove-liquidity-slider.png) -->

### 4. Collecting Fees

When removing liquidity, you have the option to collect accumulated fees:

1. The "Collect as WETH" checkbox allows you to receive ETH fees as wrapped ETH (WETH)
2. By default, fees are collected along with your liquidity removal
3. You can see the estimated fee amounts for each token

### 5. Confirming Removal

1. Click "Remove" to proceed
2. Review the transaction details in the confirmation modal
3. Click "Confirm" to proceed
4. Approve the transaction in your wallet
5. Wait for the transaction to be confirmed on the blockchain

### 6. Transaction Completion

After the transaction is confirmed:

1. You'll receive the tokens in your wallet
2. If you removed 100% of your liquidity, the position will be closed
3. If you removed a partial amount, the position will remain with reduced liquidity
4. Any collected fees will also be transferred to your wallet

## Partial vs. Full Removal

### Partial Liquidity Removal

When removing part of your liquidity:

1. Your position remains active with the remaining liquidity
2. The price range stays the same
3. You continue to earn fees proportional to your remaining liquidity
4. The position NFT remains in your wallet

### Full Liquidity Removal

When removing 100% of your liquidity:

1. Your position is closed completely
2. You stop earning fees from this position
3. The position NFT can be burned (optional)
4. All tokens and accumulated fees are returned to your wallet

## Collecting Fees Without Removing Liquidity

If you want to collect earned fees without removing liquidity:

1. Navigate to your position details
2. Click the "Collect Fees" button
3. Review the fee amounts to be collected
4. Confirm the transaction
5. Fees will be transferred to your wallet while your liquidity remains in the pool

This allows you to realize your earnings while keeping your position active.

## Understanding Token Returns

When removing liquidity, the tokens you receive depend on:

1. **Current Price**: Where the current price is relative to your position's range
2. **Price Range**: The minimum and maximum prices of your position
3. **Removal Percentage**: How much of your liquidity you're removing

If the current price is:

* Within your range: You'll receive a mix of both tokens
* Below your range: You'll receive only the base token (typically the second token in the pair)
* Above your range: You'll receive only the quote token (typically the first token in the pair)

## Fee Collection Considerations

When collecting fees:

1. Fees are accumulated in both tokens of the pair
2. Gas costs should be considered, especially for smaller fee amounts
3. Regular fee collection can compound your returns if reinvested

## Position Management Strategies

### When to Remove Liquidity

Consider removing liquidity when:

1. The price has moved significantly outside your range with no expectation of returning
2. You want to adjust your price range to better align with current market conditions
3. You need access to your capital for other opportunities
4. You want to take profits after significant fee accumulation

### Rebalancing Strategies

For optimal liquidity management:

1. Monitor when positions move out of range
2. Remove liquidity from out-of-range positions
3. Create new positions around the current price
4. Consider maintaining multiple positions with different ranges

## Troubleshooting Common Issues

### Transaction Failing

If your liquidity removal transaction fails:

1. Ensure you have enough ETH/native tokens for gas
2. Try using a higher gas price during network congestion
3. If removing 100% of liquidity, try a slightly lower percentage (e.g., 99%) to account for rounding

### Receiving Different Token Amounts Than Expected

If you receive different token amounts than the estimate:

1. Price movement between transaction submission and confirmation can affect the composition
2. Small differences are normal due to price impact and slippage
3. Significant differences may indicate high volatility during transaction processing

### Position Still Visible After Removal

If your position still appears after removing 100% of liquidity:

1. Refresh the page
2. Check if the transaction was actually confirmed on the blockchain
3. The position may still be visible but should show zero liquidity

## Next Steps

After removing liquidity, you might want to:

* [Add liquidity](add-liquidity.md) in a different price range
* [Swap tokens](swap.md) to rebalance your portfolio
* Learn more about [concentrated liquidity](concentrated-liquidity.md) to optimize your future positions
* Explore the [treasury fee mechanism](treasury-fee.md) to understand how the 0.1% fee contributes to protocol sustainability

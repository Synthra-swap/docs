# Swap

This guide explains how to use the Swap feature in the Synthra interface to exchange one token for another.

## Overview

Swapping tokens is the most basic operation in Synthra. The swap interface allows you to exchange one token for another at the current market rate, with fees applied based on the pool's fee tier plus the 0.1% treasury fee.

## Step-by-Step Guide

### 1. Accessing the Swap Interface

1. Navigate to [app.synthra.org](https://app.synthra.org)
2. Connect your wallet using the "Connect Wallet" button in the top right corner
3. Select "Swap" from the main navigation menu (it should be selected by default)

### 2. Selecting Tokens

1. Click on the top dropdown to select the token you want to swap from (input token)
2. Click on the bottom dropdown to select the token you want to receive (output token)
3. If you don't see your desired token, you can paste the token contract address in the search bar

<!-- ![Token Selection Interface](../assets/images/swap-token-selection.png) -->

### 3. Entering Amount

1. Enter the amount of the input token you want to swap in the top field
2. The estimated amount of output tokens you'll receive will automatically be calculated and displayed in the bottom field
3. Alternatively, you can enter the amount of output tokens you want to receive, and the required input amount will be calculated

### 4. Reviewing Swap Details

Before confirming your swap, review the transaction details displayed below the input fields:

* **Exchange Rate**: The current exchange rate between the two tokens
* **Price Impact**: How your trade will affect the market price (higher values indicate larger market impact)
* **Minimum Received**: The minimum amount you'll receive after accounting for slippage
* **Fee Breakdown**:
  * Pool Fee: The fee paid to liquidity providers (varies by pool: 0.01%, 0.05%, 0.3%, or 1%)
  * Treasury Fee: The 0.1% fee that goes to the protocol treasury for buybacks
* **Route**: If your swap is routed through multiple pools, the path will be displayed

### 5. Adjusting Settings (Optional)

Click the gear icon in the top right of the swap interface to adjust:

1. **Slippage Tolerance**: The maximum acceptable difference between the expected and executed price
   * Default: 0.5%
   * Lower values provide better price protection but may cause transactions to fail
   * Higher values ensure transactions complete but may result in worse prices
2. **Transaction Deadline**: How long your transaction remains valid before expiring
   * Default: 30 minutes
   * Shorter deadlines provide better price protection
   * Longer deadlines reduce the chance of transaction failure

### 6. Confirming the Swap

1. Click the "Swap" button
2. Review the transaction details in the confirmation modal
3. Click "Confirm Swap"
4. Approve the transaction in your wallet
5. Wait for the transaction to be confirmed on the blockchain

### 7. Viewing Transaction Status

After confirming the swap:

1. A notification will appear showing the transaction status
2. Once confirmed, you'll see a success message with a link to view the transaction on the blockchain explorer
3. Your updated token balances will be reflected in the interface

## Advanced Swap Features

### Multi-Hop Swaps

If there's no direct liquidity pool between your input and output tokens, Synthra will automatically route your trade through intermediate tokens to find the best price. For example, if you're swapping Token A for Token C, the route might be:

Token A → Token B → Token C

The routing algorithm considers all possible paths and selects the one with the lowest price impact and fees.

### Exact Input vs. Exact Output

Synthra supports two swap modes:

1. **Exact Input**: You specify exactly how many tokens to send, and receive a variable amount based on the price (default mode)
2. **Exact Output**: You specify exactly how many tokens to receive, and send a variable amount based on the price (toggle by clicking the "Switch to Exact Output" button)

### Maximum Slippage Protection

If the price moves unfavorably beyond your slippage tolerance during transaction execution, the transaction will automatically revert, protecting you from receiving significantly less than expected.

## Understanding Swap Economics

### Price Impact

Price impact occurs because Synthra uses an automated market maker model where prices are determined by the ratio of tokens in each pool. Larger trades relative to pool size will have higher price impact.

To minimize price impact:

* Consider breaking large trades into smaller transactions
* Use pools with higher liquidity
* Monitor price impact indicators in the interface

### Fee Structure

Every swap on Synthra incurs two types of fees:

1. **Pool Fee**: Varies by pool (0.01%, 0.05%, 0.3%, or 1%) and goes to liquidity providers
2. **Treasury Fee**: A fixed 0.1% that goes to the protocol treasury

The total fee for a swap is the pool fee plus the treasury fee. For example, a swap in a 0.3% pool would have a total fee of 0.4% (0.3% to liquidity providers + 0.1% to treasury).

The treasury fee funds protocol development and token buybacks, creating a sustainable economic model for the protocol.

## Troubleshooting Common Issues

### Transaction Failing

If your transaction fails, it could be due to:

1. **Slippage Tolerance Too Low**: Try increasing your slippage tolerance in settings
2. **Price Movement**: The price may have moved significantly since you initiated the transaction
3. **Insufficient Funds**: Ensure you have enough tokens plus ETH/native tokens for gas fees
4. **Network Congestion**: During high network activity, transactions may fail; try again with higher gas settings

### High Price Impact Warning

If you see a warning about high price impact:

1. Consider reducing your trade size
2. Look for pools with more liquidity
3. Try splitting your trade into multiple smaller trades
4. Consider using limit orders through integrated protocols

### Token Not Appearing After Swap

If you don't see your tokens after a successful swap:

1. Check that the token is added to your wallet (click "Import Token" in your wallet)
2. Verify the transaction was successful on the blockchain explorer
3. Refresh the page or reconnect your wallet

## Best Practices

1. **Start Small**: If you're new to Synthra, start with smaller trades to get familiar with the interface
2. **Check Prices**: Compare the price on Synthra with other exchanges to ensure you're getting a good rate
3. **Monitor Gas Costs**: Be aware of network gas costs, especially for smaller trades
4. **Set Reasonable Slippage**: Use appropriate slippage tolerance based on token volatility
5. **Review Before Confirming**: Always double-check all details before confirming a transaction

## Next Steps

After mastering swaps, you might want to explore:

* [Providing Liquidity](add-liquidity.md) to earn fees
* [Pool Analytics](pool.md) to analyze liquidity and trading activity
* [Treasury Fee Mechanism](treasury-fee.md) to learn more about how the 0.1% treasury fee is used

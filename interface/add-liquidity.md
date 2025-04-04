# Add Liquidity

This guide explains how to add liquidity to Synthra pools to earn trading fees and participate in the protocol as a liquidity provider.

## Overview

Adding liquidity to Synthra allows you to earn fees from trades that occur through the pool. Unlike traditional AMMs, Synthra uses concentrated liquidity, which means you can specify a price range for your liquidity position, potentially earning higher returns on your capital.

## Step-by-Step Guide

### 1. Accessing the Liquidity Interface

1. Navigate to[ app.synthra.org](https://app.synthra.org)
2. Connect your wallet using the "Connect Wallet" button in the top right corner
3. Select "Pool" from the main navigation menu
4. Click the "New Position" button

### 2. Selecting Token Pair

1. Choose the first token from the dropdown menu
2. Choose the second token from the dropdown menu
3. If you don't see your desired token, you can paste the token contract address in the search bar

![Token Pair Selection](../assets/images/add-liquidity-token-selection.png)

### 3. Selecting Fee Tier

Choose the appropriate fee tier for your liquidity position:

* **0.01%**: For stable pairs with minimal price movement (e.g., USDC-USDT)
* **0.05%**: For low-volatility pairs (e.g., ETH-stETH)
* **0.3%**: For standard pairs with moderate volatility (e.g., ETH-USDC)
* **1%**: For exotic pairs with high volatility (e.g., new tokens)

Higher fee tiers generally generate more fees per trade but may see less trading volume.

### 4. Setting Price Range

1. The current price will be displayed in the center of the price range selector
2. Set your minimum price by dragging the left slider or entering a value
3. Set your maximum price by dragging the right slider or entering a value
4. The price range determines when your liquidity is active and earning fees

![Price Range Selection](../assets/images/add-liquidity-price-range.png)

#### Price Range Strategies

* **Wide Range**: Setting a wide price range (e.g., ±50% from current price) provides more consistent fee earnings but with lower capital efficiency
* **Narrow Range**: Setting a narrow price range (e.g., ±5% from current price) offers higher capital efficiency but risks becoming inactive if price moves outside the range
* **Directional**: Setting an asymmetric range based on your price expectations (e.g., current price to +20%) if you expect the price to move in a specific direction

### 5. Depositing Tokens

1. Enter the amount of one token you wish to deposit
2. The required amount of the other token will be calculated automatically based on the current price and your selected range
3. Alternatively, you can click "Max" to use your entire balance of a token
4. For balanced exposure, you can use the "Balanced" button to calculate equal values of both tokens

### 6. Reviewing Position Details

Before confirming, review the position details:

* **Liquidity Preview**: Visual representation of your position relative to the current price
* **Estimated Fee Earnings**: Projected fee earnings based on recent trading volume
* **Price Range**: Confirmation of your selected price range
* **Deposit Amounts**: The exact amounts of each token you'll deposit

### 7. Approving Token Spending

If this is your first time providing liquidity with these tokens:

1. Click "Approve \[Token]" for each token
2. Confirm the approval transaction in your wallet
3. Wait for the approval transactions to be confirmed

### 8. Confirming Position Creation

1. Click "Add" to create your position
2. Review the transaction details in the confirmation modal
3. Click "Confirm" to proceed
4. Approve the transaction in your wallet
5. Wait for the transaction to be confirmed on the blockchain

### 9. Receiving Position NFT

After your position is created:

1. You'll receive an NFT representing your liquidity position
2. This NFT will appear in your positions list on the Pool page
3. The NFT can be transferred to other wallets if needed

## Understanding Liquidity Provision

### Concentrated Liquidity Mechanics

In Synthra's concentrated liquidity model:

1. Your liquidity is only active when the current price is within your specified range
2. When active, your liquidity earns a share of trading fees proportional to your contribution to the pool
3. As the price moves, the composition of your position shifts from one token to the other
4. If the price moves outside your range, your position becomes 100% composed of one token and stops earning fees

### Fee Earnings

As a liquidity provider, you earn fees when:

1. Trades occur through the pool
2. The current price is within your position's range
3. Your liquidity is contributing to the trade execution

Fees accumulate in your position and can be collected at any time without removing your liquidity.

### Impermanent Loss

Providing liquidity exposes you to impermanent loss:

1. If token prices change relative to when you added liquidity, your position value may be less than if you had simply held the tokens
2. The narrower your price range, the more pronounced the impermanent loss can be within that range
3. Fees earned can offset impermanent loss over time

## Advanced Liquidity Strategies

### Multiple Positions

Consider creating multiple positions with different price ranges:

1. Core position with a wider range for consistent fee generation
2. Satellite positions with narrower ranges for higher capital efficiency
3. Directional positions based on market outlook

### Rebalancing Strategies

To optimize your liquidity over time:

1. Monitor when your positions move out of range
2. Consider closing out-of-range positions and creating new ones around the current price
3. Regularly collect accumulated fees to compound your returns

### Fee Tier Selection

Choose fee tiers based on:

1. Historical trading volume in each tier
2. Price volatility of the token pair
3. Your risk tolerance and fee earning expectations

## Treasury Fee Consideration

Remember that while you earn the pool fee (0.01%, 0.05%, 0.3%, or 1%), traders also pay a 0.1% treasury fee that:

1. Does not directly go to liquidity providers
2. Funds protocol development and token buybacks
3. Contributes to the long-term sustainability of Synthra

This treasury fee is separate from and in addition to the pool fee you earn.

## Troubleshooting Common Issues

### Price Impact Warning

If you see a warning about price impact when creating a position:

1. Your deposit may be large relative to the pool's liquidity
2. Consider reducing your deposit size or widening your price range
3. Split your deposit into multiple smaller positions

### Insufficient Liquidity Error

If you encounter an "insufficient liquidity" error:

1. The pool may not have enough liquidity at the current price
2. Try adjusting your price range to include more liquidity
3. Consider creating a new pool if one doesn't exist

### Transaction Failing

If your transaction fails:

1. Ensure you have enough ETH/native tokens for gas
2. Check that you've approved sufficient token amounts
3. Verify that the price hasn't moved significantly since you started the transaction

## Next Steps

After adding liquidity, you might want to:

* [Manage your positions](pool.md) to monitor performance
* [Remove liquidity](remove-liquidity.md) when needed
* Learn more about [concentrated liquidity](../core-concepts/concentrated-liquidity.md) to optimize your strategy

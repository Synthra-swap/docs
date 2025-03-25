# Getting Started with Synthra

This guide will walk you through the basics of using Synthra, from connecting your wallet to making your first swap and providing liquidity.

## Connecting Your Wallet

To start using Synthra, you'll need to connect a compatible Web3 wallet:

1. Visit the [Synthra app](https://app.synthra.io)
2. Click the "Connect Wallet" button in the top right corner
3. Select your preferred wallet (MetaMask, WalletConnect, Coinbase Wallet, etc.)
4. Approve the connection request in your wallet

Once connected, you'll be able to see your wallet address and token balances in the Synthra interface.

## Network Selection

Synthra is available on multiple blockchain networks. To switch networks:

1. Click on the network selector in the top right corner
2. Choose your preferred network from the dropdown menu
3. Approve the network switch in your wallet if prompted

Make sure you have the native token of the selected network for transaction fees.

## Making Your First Swap

Swapping tokens on Synthra is straightforward:

1. Navigate to the "Swap" tab in the main interface
2. Select the token you want to swap from in the top input field
3. Select the token you want to receive in the bottom input field
4. Enter the amount you want to swap
5. Review the transaction details, including:
   - Exchange rate
   - Price impact
   - Minimum received amount
   - Liquidity provider fee
   - Treasury fee (0.1%)
6. Click "Swap" and confirm the transaction in your wallet

The interface will display a confirmation once your swap is complete, showing the exact amount of tokens received.

## Understanding Slippage

Slippage refers to the difference between the expected price of a trade and the actual executed price. To adjust your slippage tolerance:

1. Click the settings icon in the swap interface
2. Set your preferred slippage tolerance (default is 0.5%)
3. A higher tolerance increases the likelihood of transaction success but may result in less favorable rates
4. A lower tolerance may provide better rates but increases the risk of transaction failure

## Providing Liquidity

Providing liquidity on Synthra allows you to earn fees from trades. Here's how to add liquidity:

1. Navigate to the "Pool" tab in the main interface
2. Click "New Position"
3. Select the token pair you want to provide liquidity for
4. Choose a fee tier based on expected pair volatility:
   - 0.01%: For stable pairs (e.g., stablecoin to stablecoin)
   - 0.05%: For pairs with low volatility
   - 0.3%: For most standard pairs
   - 1%: For exotic pairs with high volatility
5. Set your price range by defining the minimum and maximum prices
6. Enter the amounts of each token you want to deposit
7. Review your position details and click "Add"
8. Confirm the transaction in your wallet

Remember that the narrower your price range, the more concentrated your liquidity will be, potentially earning higher fees when the price stays within that range.

## Managing Your Positions

To view and manage your liquidity positions:

1. Navigate to the "Pool" tab
2. You'll see a list of your active positions
3. Click on any position to view details or perform actions:
   - Increase liquidity: Add more tokens to your position
   - Decrease liquidity: Remove some tokens from your position
   - Collect fees: Claim earned trading fees
   - Adjust range: Modify your price range (requires creating a new position)

## Next Steps

Now that you're familiar with the basics of Synthra, you might want to explore:

- [Core Concepts](core-concepts/README.md) to understand the protocol in depth
- [Treasury Fee Mechanism](features/treasury-fee.md) to learn about Synthra's unique fee structure
- [Buyback Mechanism](features/buyback-mechanism.md) to understand how treasury funds are utilized

If you have any questions, check out our [FAQ](faq.md) or join our community channels for support.

# Swaps

Swaps are the primary function of Synthra, allowing users to exchange one token for another. This page explains how swaps work in Synthra and the unique features that make trading efficient and cost-effective.

## How Swaps Work

When you perform a swap on Synthra, you're trading with a liquidity pool rather than directly with another user. The process works as follows:

1. You specify the input token and amount you want to swap
2. You specify the output token you want to receive
3. Synthra calculates the expected output amount based on:
   - The current price in the pool
   - The amount of liquidity available at that price
   - The applicable fees
4. You confirm the transaction
5. The smart contract executes the swap, sending your input tokens to the pool and returning the output tokens to your wallet

## Price Impact

Price impact refers to how your trade affects the price of the tokens in the pool. Larger trades relative to the pool's liquidity will have a higher price impact. Synthra's interface shows you the expected price impact before you confirm your transaction.

The concentrated liquidity model of Synthra helps reduce price impact for most trades by focusing liquidity around the current price, providing better execution compared to traditional AMMs.

## Slippage

Slippage is the difference between the expected price of a trade and the actual executed price. It occurs due to:

- Other transactions being processed before yours
- Price movements in the time between submitting and confirming your transaction

Synthra allows you to set a slippage tolerance to protect against unfavorable price movements. If the price moves beyond your tolerance, the transaction will revert instead of executing at the worse price.

## Multi-hop Swaps

For token pairs that don't have a direct pool or have limited liquidity, Synthra can route your trade through multiple pools to find the best price. For example, if you want to swap Token A for Token C, but there's no direct A-C pool, Synthra might route:

Token A → Token B → Token C

The routing algorithm automatically finds the path with the lowest price impact and fees.

## Fee Structure

Every swap on Synthra incurs two types of fees:

1. **Pool Fee**: Varies by pool (0.01%, 0.05%, 0.3%, or 1%) and goes to liquidity providers
2. **Treasury Fee**: A fixed 0.1% that goes to the protocol treasury

The total fee for a swap is the pool fee plus the treasury fee. For example, a swap in a 0.3% pool would have a total fee of 0.4% (0.3% to liquidity providers + 0.1% to treasury).

## Minimum Received Amount

To protect users from excessive slippage, Synthra calculates a "minimum received amount" based on your slippage tolerance. This is the minimum amount of output tokens you're willing to accept from the swap. If the actual output would be less than this amount, the transaction reverts.

## Gas Optimization

Synthra implements several gas optimizations to make swapping as cost-effective as possible:

- Efficient storage layout
- Optimized tick crossing logic
- Batch processing of multiple swaps when possible

## Swap Execution

### Single-tick Swaps

When a swap doesn't cause the price to cross any tick boundaries, it's executed using a simplified formula that reduces gas costs.

### Multi-tick Swaps

For larger swaps that cross tick boundaries, Synthra calculates the execution in segments:

1. Execute the swap until the first tick boundary
2. Update the active liquidity based on positions that start or end at that tick
3. Continue the swap with the new liquidity amount
4. Repeat until the swap is complete or all input tokens are consumed

## Price Oracle Integration

Every swap updates the time-weighted average price (TWAP) oracle, which provides reliable price data for external applications. This makes Synthra not just a trading venue but also a source of on-chain price information.

## Swap Limits and Protections

Synthra includes several protections to ensure fair and secure trading:

- **Maximum Input/Output Limits**: Prevents extremely large trades that could manipulate prices
- **Deadline Parameter**: Allows users to specify a time limit for their transaction to be valid
- **Reentrancy Protection**: Prevents malicious contracts from exploiting the swap function

## Advanced Swap Features

### Exact Input vs. Exact Output

Synthra supports two types of swaps:

- **Exact Input**: You specify exactly how many tokens to send, and receive a variable amount based on the price
- **Exact Output**: You specify exactly how many tokens to receive, and send a variable amount based on the price

### Flash Swaps

Advanced users can utilize flash swaps, which allow you to receive tokens before paying for them, as long as you either return the tokens or pay for them by the end of the transaction. This enables complex trading strategies and arbitrage opportunities.

## Swap Analytics

The Synthra interface provides analytics for your swaps, including:

- Historical price data
- Your trading history
- Fee breakdown
- Gas costs

These analytics help you make informed decisions about when and how to trade.

## Best Practices for Swapping

1. **Check Price Impact**: For large trades, consider breaking them into smaller transactions to reduce price impact
2. **Set Appropriate Slippage**: Higher during volatile markets, lower during stable periods
3. **Consider Gas Costs**: During network congestion, gas costs may make small trades uneconomical
4. **Use Limit Orders**: For large trades or specific price targets, consider using limit order protocols that integrate with Synthra

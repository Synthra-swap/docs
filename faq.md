# FAQ

This FAQ addresses common questions about Synthra Protocol, its features, and how to use the platform.

## General Questions

### What is Synthra?

Synthra is a decentralized exchange protocol that uses concentrated liquidity to enable efficient trading of digital assets. It allows liquidity providers to allocate capital within specific price ranges, significantly improving capital efficiency compared to traditional automated market makers.

### How does Synthra differ from other DEXs?

Synthra introduces several key innovations:

* Concentrated liquidity for superior capital efficiency
* Multiple fee tiers optimized for different asset pairs
* A unique treasury fee mechanism (0.1%) that funds protocol buybacks
* Advanced position management for liquidity providers

### Which networks does Synthra support?

Synthra is currently available on \[list of supported networks]. We're continuously working to expand to additional networks based on community demand.

### Is Synthra safe to use?

Synthra's smart contracts have undergone rigorous security audits by leading firms in the blockchain security space. You can review our audit reports in the [Security](protocol/protocol/security.md) section. However, as with any DeFi protocol, users should exercise caution and only invest what they can afford to lose.

## Trading on Synthra

### How do I swap tokens on Synthra?

To swap tokens, connect your wallet, select the tokens you want to exchange, enter the amount, and click "Swap." For detailed instructions, see our [Getting Started](getting-started.md) guide.

### What are the fees for swapping tokens?

Synthra has different fee tiers depending on the pool:

* 0.01% for stable pairs
* 0.05% for low volatility pairs
* 0.3% for standard pairs
* 1% for exotic pairs with high volatility

Additionally, there's a 0.1% treasury fee on all swaps that goes to the protocol treasury for buybacks.

### What is slippage and how do I set it?

Slippage is the difference between the expected price of a trade and the executed price. You can adjust your slippage tolerance in the settings menu of the swap interface. A higher tolerance increases the likelihood of transaction success but may result in less favorable rates.

### Why did my transaction fail?

Transactions can fail for several reasons:

* Insufficient funds for gas fees
* High price volatility exceeding slippage tolerance
* Network congestion
* Smart contract safety checks

If your transaction fails, try increasing your slippage tolerance or waiting for more stable market conditions.

## Providing Liquidity

### How do I provide liquidity on Synthra?

To provide liquidity, navigate to the Pool tab, click "New Position," select a token pair and fee tier, set your price range, and deposit your tokens. For detailed instructions, see our [Getting Started](getting-started.md) guide.

### What is concentrated liquidity?

Concentrated liquidity allows you to provide liquidity within a specific price range, rather than across the entire price spectrum. This means your capital is used more efficiently, potentially generating higher returns. Learn more in our [Concentrated Liquidity](core-concepts/core-concepts/concentrated-liquidity.md) guide.

### How do I earn fees as a liquidity provider?

You earn fees when trades occur through the pool you've provided liquidity to, and when the price is within your specified range. Fees are automatically accumulated and can be collected at any time.

### What is impermanent loss?

Impermanent loss occurs when the price of your deposited assets changes compared to when you deposited them. The greater the change, the more significant the impermanent loss. With Synthra's concentrated liquidity, you can potentially reduce impermanent loss by setting strategic price ranges.

### How do I collect my earned fees?

To collect fees, go to the Pool tab, select your position, and click "Collect Fees." The fees will be transferred to your wallet.

## Treasury Fee and Buybacks

### What is the treasury fee?

The treasury fee is an additional 0.1% fee applied to all swaps on Synthra. This fee is directed to the protocol treasury and is separate from the liquidity provider fees.

### How are treasury funds used?

Treasury funds are primarily used for token buybacks, which help support the value of the Synthra token. Additionally, a portion may be allocated to protocol development, security audits, and ecosystem growth initiatives.

### How does the buyback mechanism work?

The buyback mechanism uses accumulated treasury funds to purchase Synthra tokens from the open market at regular intervals or based on specific triggers. These purchased tokens may be burned (permanently removed from circulation) or used for other ecosystem incentives. For more details, see our [Buyback Mechanism](synthra-features/features/buyback-mechanism.md) page.

## Technical Questions

### Is Synthra open source?

Yes, Synthra's core smart contracts are open source and available on GitHub. This promotes transparency and allows the community to review and contribute to the protocol.

### How can developers integrate with Synthra?

Developers can integrate with Synthra using our SDK and API. Check out our [Developer Resources](developer-resources/developers/) section for comprehensive guides and documentation.

### Where can I report bugs or suggest features?

You can report bugs or suggest features through our GitHub repository or by joining our Discord community. We value community feedback and actively incorporate it into our development roadmap.

## Support and Community

### How can I get help if I have issues?

For technical support, you can:

* Join our Discord community
* Reach out on Telegram
* Follow us on Twitter for updates
* Check our GitHub for technical documentation

### How can I contribute to Synthra?

We welcome community contributions! You can contribute by:

* Participating in governance proposals
* Contributing code through GitHub
* Creating educational content
* Providing liquidity on the platform
* Spreading awareness about Synthra

### Where can I stay updated on Synthra news?

Follow our official channels:

* Discord: [discord.synthra.io](https://discord.synthra.io)
* Twitter: [@SynthraProtocol](https://twitter.com/SynthraProtocol)
* Telegram: [t.me/SynthraProtocol](https://t.me/SynthraProtocol)
* Blog: [blog.synthra.io](https://blog.synthra.io)

# Fee Structure

Synthra's innovative fee structure balances competitive returns for liquidity providers with sustainable protocol development funding. This page explains how fees work, their distribution, and the benefits for all participants.

## Fee Structure Overview

Synthra implements a **dual-benefit fee system** where every trade generates value for both:

1. **Liquidity Providers (67%)**: Competitive returns for capital providers
2. **Protocol Treasury (33%)**: Sustainable funding for ecosystem growth

This structure creates a win-win scenario: LPs earn substantial returns while the protocol builds resources for long-term development and token value appreciation.

## Pool Fee Tiers

Synthra offers four carefully designed fee tiers optimized for different trading pair characteristics:

### 0.01% Fee Tier
- **Target Pairs**: Stablecoin pairs (USDC/USDT, DAI/USDC)
- **LP Share**: 0.0067% per trade
- **Treasury Share**: 0.0033% per trade
- **Use Case**: High-frequency, low-risk arbitrage trading

### 0.05% Fee Tier  
- **Target Pairs**: Low volatility pairs (ETH/stETH, WBTC/BTCB)
- **LP Share**: 0.0335% per trade
- **Treasury Share**: 0.0165% per trade
- **Use Case**: Pegged assets and highly correlated tokens

### 0.30% Fee Tier
- **Target Pairs**: Standard pairs (ETH/USDC, WBTC/ETH)
- **LP Share**: 0.201% per trade
- **Treasury Share**: 0.099% per trade
- **Use Case**: Most common trading pairs with moderate volatility

### 1.00% Fee Tier
- **Target Pairs**: Exotic pairs (new tokens, high volatility assets)
- **LP Share**: 0.67% per trade  
- **Treasury Share**: 0.33% per trade
- **Use Case**: High-risk, high-reward trading pairs

## Fee Distribution Mechanics

### Automatic Split Process

Every trade automatically triggers the fee distribution:

1. **User initiates swap** with total fee based on pool tier
2. **Smart contract calculates** 67/33 split instantly
3. **LP portion (67%)** accumulates in the pool for active liquidity
4. **Treasury portion (33%)** transfers to protocol multi-sig
5. **Transaction completes** with full transparency on-chain

### Liquidity Provider Rewards

#### Active Liquidity Earns Fees
Only liquidity positioned within the current trading range earns fees:
- **In-range positions** collect 67% of trading fees continuously
- **Out-of-range positions** earn zero fees until price returns to range
- **Concentrated positions** earn higher fee density per dollar deployed

#### Fee Accumulation
- Fees accumulate automatically within each position
- No minimum collection amount or time requirement
- Compound growth as fees can be reinvested into positions
- Both tokens of the pair are earned proportionally to swap volume

#### Collecting Your Fees

**Step-by-Step Process:**
1. Navigate to the **"Pool"** section in the Synthra interface
2. Select your active liquidity position
3. Review accumulated fees in both tokens
4. Click **"Collect Fees"** to claim earnings
5. Confirm transaction and receive tokens to your wallet

**Pro Tips:**
- Collect fees regularly to compound your returns
- Consider gas costs vs. fee amounts for optimal timing
- Reinvest fees to increase your position size over time

## Economic Benefits

### For Liquidity Providers

#### Competitive Returns
- **67% fee share** maintains strong LP profitability
- **Multiple fee tiers** allow risk-adjusted strategies  
- **Concentrated liquidity** amplifies returns per dollar
- **Treasury buybacks** support overall token value

#### Risk Mitigation
- **Reduced impermanent loss** risk from token value stability
- **Diversified income** from multiple trading pairs
- **Protocol longevity** through sustainable funding model

### For the Ecosystem

#### Treasury Growth Engine
- **33% of all fees** create substantial protocol revenue
- **Diversified assets** provide stability and optionality
- **Reinvestment capability** for continuous improvement
- **Token buybacks** create deflationary pressure

#### Network Effects
- **Deeper liquidity** as treasury funds ecosystem growth
- **Better execution** for all users over time
- **Developer incentives** fund innovation and features
- **Community growth** through strategic initiatives

## Fee Optimization Strategies

### For Liquidity Providers

#### Range Management
- **Narrow ranges** in stable pairs for maximum fee density
- **Wider ranges** in volatile pairs for reduced management
- **Multiple positions** across different fee tiers
- **Rebalancing strategies** based on market conditions

#### Fee Tier Selection
- **0.01% tier**: For frequent traders seeking tight spreads
- **0.05% tier**: For moderate volatility with good volume
- **0.30% tier**: Best balance of fees and trading activity
- **1.00% tier**: High risk/reward for volatile assets

### For Traders

#### Cost Optimization
- **Compare effective rates** across different fee tiers
- **Consider slippage** alongside fee costs
- **Route optimization** through multiple pools if beneficial
- **Timing strategies** during high-liquidity periods

## Transparency & Analytics

### Real-Time Data
- **Live fee rates** for all pools and tiers
- **Historical volume** and fee generation
- **LP performance** metrics and comparisons
- **Treasury accumulation** tracking

### Fee Distribution Dashboard
- **Total fees generated** (all-time and periodic)
- **LP vs Treasury allocation** breakdowns  
- **Fee tier performance** comparisons
- **Individual position** tracking and analytics

---

Synthra's fee structure creates sustainable value for all participants while maintaining the competitive edge that attracts both liquidity providers and traders to the platform.

## Treasury Fee

In addition to the pool fees, Synthra implements a fixed 0.1% treasury fee on all swaps. This fee:

* Is directed to the protocol treasury
* Funds the buyback mechanism and protocol development

The treasury fee is a unique feature of Synthra that creates a sustainable funding model for the protocol. For more details, see the [Treasury Fee](treasury-fee.md) page.

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

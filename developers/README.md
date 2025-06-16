---
hidden: true
---

# Overview

This section provides comprehensive resources for developers who want to build on top of Synthra, integrate with the protocol, or utilize its liquidity for their applications.

## What You'll Learn

* **Integration**: How to integrate Synthra into your application
* **SDK**: How to use the Synthra SDK for programmatic interaction
* **API**: How to access Synthra data through the GraphQL API
* **Examples**: Sample code and common integration patterns
* **Best Practices**: Recommendations for secure and efficient integration

## Who This Section Is For

These developer resources are designed for:

* **DApp Developers**: Building applications that need swap or liquidity functionality
* **Protocol Developers**: Integrating with Synthra for liquidity or price oracles
* **Frontend Developers**: Creating custom interfaces for Synthra
* **Smart Contract Developers**: Building contracts that interact with Synthra pools
* **Data Analysts**: Accessing and analyzing Synthra data

## Getting Started

If you're new to developing with Synthra, we recommend starting with the [Integration](integration.md) guide for a high-level overview of integration options, then exploring the [SDK](sdk.md) documentation for detailed implementation guidance.

For those looking to build more complex integrations, the [Examples](examples.md) page provides sample code for common use cases and integration patterns.

## Support and Community

Join our developer community for support and collaboration:

* **Discord**: [discord.gg/synthra](https://discord.gg/synthra) - Developer channel available
* **GitHub**: [github.com/synthra-swap](https://github.com/synthra-swap)
* **Documentation**: [synthra.org/docs](https://synthra.org/docs) - Developer guides
* **Bug Reports**: [github.com/synthra-swap/issues](https://github.com/synthra-swap/issues)

## Contract Addresses

### Ethereum Mainnet

These are the official Synthra Protocol smart contract addresses on Ethereum Mainnet:

#### Core Contracts

| Contract | Address | Description |
|----------|---------|-------------|
| **V3 Core Factory** | `0x490d9C4bFEC3CeE8DFF45C90f9a6F550337c9517` | Creates and manages liquidity pools |
| **SwapRouter02** | `0x2046bAA610FFCF4FBfaCE6bB5c3178f51773db82` | Main router for token swaps |
| **Universal Router** | `0x197EEAd5Fe3DB82c4Cd55C5752Bc87AEdE11f230` | Universal router for advanced routing |
| **Position Manager** | `0x906515Dc7c32ab887C8B8Dce6463ac3a7816Af38` | NFT position manager for liquidity |
| **Quoter V2** | `0xCcB2B2F8395e4462d28703469F84c95293845332` | Price quoter for off-chain calculations |

#### Periphery Contracts

| Contract | Address | Description |
|----------|---------|-------------|
| **Multicall2** | `0xaDD90b7787B22106e10E4530dfc9d58D4c508791` | Batches multiple contract calls |
| **Tick Lens** | `0xD36cA9255dea7837cE1D5B816B3b8d89c3D41152` | Reads tick data from pools |
| **V3 Migrator** | `0xde4d72aB8f4E5B2b3eA80FBe7FcFFE7687e929e2` | Migrates liquidity from V2 to V3 |
| **V3 Staker** | `0xC40889eEa4a0471748ea0faa217A7d77D920dD75` | Staking rewards contract |

#### Administrative Contracts

| Contract | Address | Description |
|----------|---------|-------------|
| **Proxy Admin** | `0x0d067e1b2367886c54977Fa1E086408895DE5a8C` | Manages proxy contract upgrades |
| **NFT Descriptor Library** | `0xd12Ff889A90BFA5c00618086BAcE6455d695870e` | Library for NFT metadata generation |
| **NFT Position Descriptor** | `0xa90d0f120D31F1d934c85744a02C74b08927Ed79` | Generates NFT position descriptions |
| **Descriptor Proxy** | `0xcc8235ea582984B6ed04EFB279A39B8c7102980c` | Proxy for position descriptor |

### Contract Addresses Summary

All Synthra Protocol contract addresses have been updated throughout the documentation to reflect the official deployment on Ethereum Mainnet. Here's a quick reference for developers:

#### Quick Reference

```javascript
// Official Synthra Protocol Addresses - Ethereum Mainnet
const SYNTHRA_ADDRESSES = {
  // Core Protocol
  FACTORY: '0x490d9C4bFEC3CeE8DFF45C90f9a6F550337c9517',
  SWAP_ROUTER_02: '0x2046bAA610FFCF4FBfaCE6bB5c3178f51773db82',
  UNIVERSAL_ROUTER: '0x197EEAd5Fe3DB82c4Cd55C5752Bc87AEdE11f230',
  POSITION_MANAGER: '0x906515Dc7c32ab887C8B8Dce6463ac3a7816Af38',
  QUOTER_V2: '0xCcB2B2F8395e4462d28703469F84c95293845332',
  
  // Periphery
  MULTICALL2: '0xaDD90b7787B22106e10E4530dfc9d58D4c508791',
  TICK_LENS: '0xD36cA9255dea7837cE1D5B816B3b8d89c3D41152',
  V3_MIGRATOR: '0xde4d72aB8f4E5B2b3eA80FBe7FcFFE7687e929e2',
  V3_STAKER: '0xC40889eEa4a0471748ea0faa217A7d77D920dD75'
}
```

### Verification

All addresses have been verified and are:
- ✅ Checksummed for accuracy
- ✅ Updated across all documentation files
- ✅ Consistent with official deployments
- ✅ Ready for production use

For the complete contract reference, see [Smart Contracts](../protocol/smart-contracts.md).

### Usage Examples

#### JavaScript/TypeScript

```javascript
// Synthra contract addresses
const SYNTHRA_ADDRESSES = {
  // Core contracts
  V3_CORE_FACTORY: '0x490d9C4bFEC3CeE8DFF45C90f9a6F550337c9517',
  SWAP_ROUTER_02: '0x2046bAA610FFCF4FBfaCE6bB5c3178f51773db82',
  UNIVERSAL_ROUTER: '0x197EEAd5Fe3DB82c4Cd55C5752Bc87AEdE11f230',
  POSITION_MANAGER: '0x906515Dc7c32ab887C8B8Dce6463ac3a7816Af38',
  QUOTER_V2: '0xCcB2B2F8395e4462d28703469F84c95293845332',
  
  // Periphery contracts
  MULTICALL2: '0xaDD90b7787B22106e10E4530dfc9d58D4c508791',
  TICK_LENS: '0xD36cA9255dea7837cE1D5B816B3b8d89c3D41152',
  V3_MIGRATOR: '0xde4d72aB8f4E5B2b3eA80FBe7FcFFE7687e929e2',
  V3_STAKER: '0xC40889eEa4a0471748ea0faa217A7d77D920dD75'
}

// Example: Initialize router contract
const swapRouter = new ethers.Contract(
  SYNTHRA_ADDRESSES.SWAP_ROUTER_02,
  swapRouterABI,
  provider
)
```

#### Solidity

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

import '@synthra-swap/v3-core/contracts/interfaces/IUniswapV3Factory.sol';
import '@synthra-swap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract SynthraIntegration {
    // Synthra contract addresses
    IUniswapV3Factory public constant factory = 
        IUniswapV3Factory(0x490d9C4bFEC3CeE8DFF45C90f9a6F550337c9517);
    
    ISwapRouter public constant swapRouter = 
        ISwapRouter(0x2046bAA610FFCF4FBfaCE6bB5c3178f51773db82);
    
    // Your contract logic here
}
```

### Important Notes

1. **Always verify addresses**: Double-check contract addresses before deploying to production
2. **Use checksummed addresses**: All addresses above are checksummed for accuracy
3. **Version compatibility**: These addresses are for the current protocol version
4. **Security**: Never hardcode private keys or sensitive data in your contracts

For testnet addresses and deployment information on other networks, see the [Smart Contracts](../protocol/smart-contracts.md) documentation.

We're committed to supporting developers building on Synthra and welcome contributions to our open-source repositories.

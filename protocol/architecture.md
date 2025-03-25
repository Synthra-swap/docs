# Architecture

This page describes the architectural design of the Synthra protocol, explaining how different components interact to create a robust, efficient, and secure decentralized exchange.

## High-Level Architecture

Synthra's architecture consists of several layers:

1. **Core Protocol Layer**: The foundational smart contracts that handle swaps, liquidity management, and fee collection
2. **Periphery Layer**: Helper contracts that facilitate interaction with the core protocol
3. **Interface Layer**: The web application that provides a user-friendly way to interact with the protocol
4. **SDK Layer**: Libraries that enable developers to build on top of Synthra

This layered approach provides security, flexibility, and composability.

## Core Protocol Layer

The core protocol layer contains the essential contracts that manage pools, positions, and swaps. These contracts are designed to be minimal, efficient, and secure.

### Pool Contract

The Pool contract is the central component of Synthra. Each pool:

* Manages a pair of ERC-20 tokens
* Implements the concentrated liquidity logic
* Tracks liquidity positions and fee accumulation
* Executes swaps according to the constant product formula
* Collects the treasury fee for the protocol

### Factory Contract

The Factory contract:

* Creates new pool instances
* Enforces pool creation parameters
* Maintains a registry of all deployed pools
* Ensures each token pair and fee tier combination has only one pool

### Position Manager

The Position Manager:

* Represents liquidity positions as NFTs
* Tracks position boundaries and liquidity amounts
* Manages fee collection for positions
* Handles position transfers and modifications

## Periphery Layer

The periphery layer provides helper contracts that make it easier and safer to interact with the core protocol.

### Router Contract

The Router contract:

* Optimizes swap routing across multiple pools
* Handles complex operations like adding/removing liquidity
* Provides safety checks and slippage protection
* Manages multi-hop swaps through different token pairs

### Quoter Contract

The Quoter contract:

* Simulates swaps to provide price quotes
* Calculates expected output amounts
* Estimates price impact and fees
* Helps users make informed trading decisions

### Staker Contract

The Staker contract:

* Allows staking of liquidity positions
* Distributes incentives to stakers
* Manages liquidity mining programs
* Enhances capital efficiency by allowing staked positions to continue earning fees

## Treasury System

The Treasury system is a unique component of Synthra that manages the 0.1% treasury fee:

* **Fee Collector**: Accumulates the treasury fee from all pools
* **Treasury Wallet**: Multi-signature wallet that holds collected fees
* **Buyback Mechanism**: Smart contracts that execute token buybacks according to governance parameters

## Oracle System

Synthra includes a time-weighted average price (TWAP) oracle system:

* Each pool tracks price observations over time
* External contracts can query these observations to calculate TWAPs
* The oracle is resistant to manipulation through time-weighting
* Multiple time periods can be queried (e.g., 30-minute TWAP, 24-hour TWAP)

## Governance Architecture

The governance system consists of:

* **Token Contract**: The SYNTH governance token
* **Governor Contract**: Manages proposal creation, voting, and execution
* **Timelock Contract**: Enforces delays between approval and execution of proposals
* **Delegation System**: Allows token holders to delegate voting power

## Interface Layer

The web interface is built with:

* React.js frontend framework
* Ethers.js for blockchain interaction
* The Graph for data indexing and querying
* Responsive design for mobile and desktop use

## SDK Layer

The Synthra SDK provides:

* TypeScript/JavaScript libraries for developers
* Simplified interfaces to core protocol functions
* Utilities for price calculation and position management
* Examples and templates for common integrations

## Data Flow

The typical data flow for a swap operation:

1. User initiates a swap through the interface
2. Interface calls the Router contract with swap parameters
3. Router determines the optimal path and calls the appropriate Pool contract(s)
4. Pool contract executes the swap, updates state, and collects fees
5. Treasury fee is sent to the Fee Collector
6. Tokens are transferred to the user

## Gas Optimization

Synthra's architecture incorporates several gas optimization techniques:

* Efficient storage packing
* Bitmap usage for tick management
* Just-in-time liquidity activation
* Batch processing where possible

## Upgrade Path

While the core contracts are immutable for security, Synthra's architecture allows for protocol evolution through:

* New periphery contracts that maintain compatibility with core contracts
* Governance-approved migrations to new versions when necessary
* Phased deployments of new features

## Cross-Chain Architecture

Synthra is designed with cross-chain compatibility in mind:

* Core contracts can be deployed on any EVM-compatible chain
* Bridges can connect liquidity across different chains
* Unified interface can aggregate liquidity from multiple chains

## Security Considerations

The architecture incorporates multiple security layers:

* Separation of concerns between core and periphery
* Immutable core contracts
* Comprehensive access controls
* Emergency pause functionality
* Formal verification of critical components

For more details on security measures, see the [Security](security.md) page.

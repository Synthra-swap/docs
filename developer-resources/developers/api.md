# API Documentation

This page provides comprehensive documentation for the Synthra API, which allows developers to access Synthra data and analytics programmatically.

## Overview

Synthra offers two primary API interfaces:

1. **GraphQL API**: A flexible query interface for accessing detailed protocol data
2. **REST API**: A simplified interface for common data requests

These APIs enable developers to access pool data, user positions, historical metrics, and more without directly interacting with the blockchain.

## GraphQL API

The GraphQL API is powered by The Graph protocol and provides the most comprehensive access to Synthra data.

### Endpoints

| Network | Endpoint URL |
|---------|-------------|
| Ethereum Mainnet | `https://api.thegraph.com/subgraphs/name/synthra-protocol/synthra-mainnet` |
| Arbitrum | `https://api.thegraph.com/subgraphs/name/synthra-protocol/synthra-arbitrum` |
| Optimism | `https://api.thegraph.com/subgraphs/name/synthra-protocol/synthra-optimism` |
| Polygon | `https://api.thegraph.com/subgraphs/name/synthra-protocol/synthra-polygon` |
| Goerli (Testnet) | `https://api.thegraph.com/subgraphs/name/synthra-protocol/synthra-goerli` |

### Authentication

The GraphQL API is currently open and does not require authentication.

### Rate Limits

- **Public Access**: 25 requests per 5 seconds
- **Authenticated Access**: 50 requests per 5 seconds (coming soon)

### Example Queries

#### Query Pools

```graphql
{
  pools(
    first: 10
    orderBy: volumeUSD
    orderDirection: desc
    where: { volumeUSD_gt: "1000000" }
  ) {
    id
    token0 {
      id
      symbol
      name
      decimals
    }
    token1 {
      id
      symbol
      name
      decimals
    }
    feeTier
    liquidity
    sqrtPrice
    tick
    volumeUSD
    txCount
    totalValueLockedUSD
    treasuryFeesUSD
  }
}
```

#### Query Specific Pool

```graphql
{
  pool(id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8") {
    id
    token0 {
      symbol
    }
    token1 {
      symbol
    }
    feeTier
    liquidity
    sqrtPrice
    tick
    volumeUSD
    volumeToken0
    volumeToken1
    txCount
    totalValueLockedUSD
    totalValueLockedToken0
    totalValueLockedToken1
    treasuryFeesUSD
    createdAtTimestamp
    createdAtBlockNumber
    observationIndex
    collectedFeesToken0
    collectedFeesToken1
    collectedFeesUSD
    ticks {
      tickIdx
      liquidityGross
      liquidityNet
    }
  }
}
```

#### Query User Positions

```graphql
{
  positions(
    where: { owner: "0xabcdef1234567890abcdef1234567890abcdef12" }
  ) {
    id
    owner
    pool {
      id
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      feeTier
    }
    tickLower
    tickUpper
    liquidity
    depositedToken0
    depositedToken1
    withdrawnToken0
    withdrawnToken1
    collectedFeesToken0
    collectedFeesToken1
    transaction {
      id
      blockNumber
      timestamp
    }
  }
}
```

#### Query Historical Data

```graphql
{
  poolDayDatas(
    first: 30
    orderBy: date
    orderDirection: desc
    where: { pool: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8" }
  ) {
    date
    volumeUSD
    volumeToken0
    volumeToken1
    liquidity
    sqrtPrice
    token0Price
    token1Price
    tvlUSD
    txCount
    open
    high
    low
    close
  }
}
```

#### Query Protocol Metrics

```graphql
{
  synthraDayDatas(
    first: 30
    orderBy: date
    orderDirection: desc
  ) {
    date
    volumeUSD
    tvlUSD
    feesUSD
    treasuryFeesUSD
    txCount
    poolCount
  }
}
```

### Schema

The complete GraphQL schema is available through introspection. You can explore it using tools like [GraphQL Playground](https://github.com/graphql/graphql-playground) or [GraphiQL](https://github.com/graphql/graphiql).

Key entities in the schema include:

- **Factory**: Protocol factory information
- **Bundle**: ETH price used for USD calculations
- **Token**: Token information
- **Pool**: Liquidity pool data
- **Tick**: Tick-level data for pools
- **Position**: Liquidity position information
- **Transaction**: Transaction data
- **Mint**: Liquidity addition events
- **Burn**: Liquidity removal events
- **Swap**: Swap events
- **Collect**: Fee collection events
- **Flash**: Flash loan events
- **SynthraProtocol**: Protocol-wide metrics
- **PoolDayData**: Daily pool metrics
- **PoolHourData**: Hourly pool metrics
- **TickHourData**: Hourly tick metrics
- **TokenDayData**: Daily token metrics
- **TokenHourData**: Hourly token metrics
- **SynthraDayData**: Daily protocol metrics

### JavaScript/TypeScript Client

You can use the GraphQL API with any GraphQL client. Here's an example using Apollo Client:

```typescript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

// Initialize client
const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/synthra-protocol/synthra-mainnet',
  cache: new InMemoryCache()
})

// Query pools
async function getTopPools() {
  const { data } = await client.query({
    query: gql`
      {
        pools(
          first: 10
          orderBy: volumeUSD
          orderDirection: desc
        ) {
          id
          token0 {
            symbol
          }
          token1 {
            symbol
          }
          volumeUSD
          feeTier
        }
      }
    `
  })
  
  return data.pools
}

// Query user positions
async function getUserPositions(address) {
  const { data } = await client.query({
    query: gql`
      {
        positions(where: { owner: "${address}" }) {
          id
          pool {
            token0 {
              symbol
            }
            token1 {
              symbol
            }
          }
          tickLower
          tickUpper
          liquidity
        }
      }
    `
  })
  
  return data.positions
}
```

## REST API

The REST API provides simplified access to common Synthra data through standard HTTP endpoints.

### Base URL

```
https://api.synthra.io/v1
```

### Authentication

Some endpoints require API keys for access:

```
Authorization: Bearer YOUR_API_KEY
```

To obtain an API key, visit the [Synthra Developer Portal](https://developers.synthra.io).

### Endpoints

#### Get Pools

```
GET /pools
```

Query Parameters:
- `limit`: Maximum number of results (default: 10, max: 100)
- `offset`: Pagination offset (default: 0)
- `orderBy`: Field to order by (default: "volumeUSD")
- `orderDirection`: "asc" or "desc" (default: "desc")
- `minVolume`: Minimum volume in USD

Example Response:
```json
{
  "pools": [
    {
      "id": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
      "token0": {
        "id": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "symbol": "USDC",
        "name": "USD Coin"
      },
      "token1": {
        "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "symbol": "WETH",
        "name": "Wrapped Ether"
      },
      "feeTier": "3000",
      "volumeUSD": "1234567890.12",
      "tvlUSD": "98765432.10",
      "treasuryFeesUSD": "1234567.89"
    },
    // More pools...
  ],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 543
  }
}
```

#### Get Specific Pool

```
GET /pools/:poolAddress
```

Example Response:
```json
{
  "id": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
  "token0": {
    "id": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "symbol": "USDC",
    "name": "USD Coin",
    "decimals": 6
  },
  "token1": {
    "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "symbol": "WETH",
    "name": "Wrapped Ether",
    "decimals": 18
  },
  "feeTier": "3000",
  "liquidity": "123456789012345678",
  "sqrtPrice": "1234567890123456789012345678",
  "tick": "123456",
  "volumeUSD": "1234567890.12",
  "volumeToken0": "1234567.89",
  "volumeToken1": "123.45",
  "tvlUSD": "98765432.10",
  "treasuryFeesUSD": "1234567.89",
  "token0Price": "0.00123",
  "token1Price": "812.34"
}
```

#### Get Pool Ticks

```
GET /pools/:poolAddress/ticks
```

Query Parameters:
- `limit`: Maximum number of results (default: 1000, max: 5000)
- `offset`: Pagination offset (default: 0)

Example Response:
```json
{
  "ticks": [
    {
      "tickIdx": "-123456",
      "liquidityGross": "1234567890123456789",
      "liquidityNet": "-1234567890123456789",
      "price0": "123.45",
      "price1": "0.00812"
    },
    // More ticks...
  ],
  "pagination": {
    "limit": 1000,
    "offset": 0,
    "total": 4321
  }
}
```

#### Get User Positions

```
GET /positions
```

Query Parameters:
- `owner`: Ethereum address of the position owner (required)
- `limit`: Maximum number of results (default: 10, max: 100)
- `offset`: Pagination offset (default: 0)

Example Response:
```json
{
  "positions": [
    {
      "id": "123",
      "owner": "0xabcdef1234567890abcdef1234567890abcdef12",
      "pool": {
        "id": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
        "token0": {
          "symbol": "USDC"
        },
        "token1": {
          "symbol": "WETH"
        },
        "feeTier": "3000"
      },
      "tickLower": "-123456",
      "tickUpper": "123456",
      "liquidity": "1234567890123456789",
      "depositedToken0": "1000.00",
      "depositedToken1": "0.5",
      "collectedFeesToken0": "10.00",
      "collectedFeesToken1": "0.005"
    },
    // More positions...
  ],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 5
  }
}
```

#### Get Token Information

```
GET /tokens/:tokenAddress
```

Example Response:
```json
{
  "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "symbol": "WETH",
  "name": "Wrapped Ether",
  "decimals": 18,
  "volume": "1234567.89",
  "volumeUSD": "1234567890.12",
  "tvl": "123456.78",
  "tvlUSD": "123456789.01",
  "priceUSD": "1234.56",
  "pools": [
    {
      "id": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
      "token0": {
        "symbol": "USDC"
      },
      "token1": {
        "symbol": "WETH"
      },
      "feeTier": "3000"
    },
    // More pools...
  ]
}
```

#### Get Protocol Metrics

```
GET /protocol/stats
```

Example Response:
```json
{
  "tvlUSD": "1234567890.12",
  "volumeUSD24h": "123456789.01",
  "feesUSD24h": "1234567.89",
  "treasuryFeesUSD24h": "123456.78",
  "treasuryFeesUSDTotal": "12345678.90",
  "poolCount": 543,
  "txCount24h": 12345,
  "txCountTotal": 1234567
}
```

#### Get Historical Data

```
GET /pools/:poolAddress/history
```

Query Parameters:
- `resolution`: "day" or "hour" (default: "day")
- `limit`: Maximum number of results (default: 30, max: 1000)
- `startTime`: Unix timestamp for start of range
- `endTime`: Unix timestamp for end of range

Example Response:
```json
{
  "history": [
    {
      "timestamp": 1625097600,
      "date": "2021-07-01T00:00:00Z",
      "volumeUSD": "12345678.90",
      "tvlUSD": "123456789.01",
      "feesUSD": "123456.78",
      "treasuryFeesUSD": "12345.67",
      "token0Price": "0.00123",
      "token1Price": "812.34",
      "open": "0.00123",
      "high": "0.00125",
      "low": "0.00120",
      "close": "0.00122"
    },
    // More data points...
  ]
}
```

### JavaScript Client

A simple JavaScript client for the REST API:

```javascript
class SynthraAPI {
  constructor(apiKey = null, baseUrl = 'https://api.synthra.io/v1') {
    this.apiKey = apiKey
    this.baseUrl = baseUrl
  }
  
  async request(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        url.searchParams.append(key, params[key])
      }
    })
    
    const headers = {}
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`
    }
    
    const response = await fetch(url, { headers })
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }
    
    return response.json()
  }
  
  // Pools
  getPools(params = {}) {
    return this.request('/pools', params)
  }
  
  getPool(address) {
    return this.request(`/pools/${address}`)
  }
  
  getPoolTicks(address, params = {}) {
    return this.request(`/pools/${address}/ticks`, params)
  }
  
  getPoolHistory(address, params = {}) {
    return this.request(`/pools/${address}/history`, params)
  }
  
  // Positions
  getPositions(owner, params = {}) {
    return this.request('/positions', { owner, ...params })
  }
  
  // Tokens
  getToken(address) {
    return this.request(`/tokens/${address}`)
  }
  
  // Protocol
  getProtocolStats() {
    return this.request('/protocol/stats')
  }
}

// Usage
const api = new SynthraAPI('YOUR_API_KEY')

async function getTopPools() {
  const { pools } = await api.getPools({ limit: 5, orderBy: 'volumeUSD' })
  return pools
}

async function getUserPositions(address) {
  const { positions } = await api.getPositions(address)
  return positions
}
```

## WebSocket API

Synthra also offers a WebSocket API for real-time updates:

```
wss://ws.synthra.io/v1
```

### Authentication

```
{
  "type": "auth",
  "payload": {
    "apiKey": "YOUR_API_KEY"
  }
}
```

### Subscriptions

#### Subscribe to Pool Updates

```json
{
  "type": "subscribe",
  "channel": "pool",
  "payload": {
    "address": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"
  }
}
```

#### Subscribe to Swaps

```json
{
  "type": "subscribe",
  "channel": "swaps",
  "payload": {
    "address": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"
  }
}
```

#### Subscribe to Protocol Metrics

```json
{
  "type": "subscribe",
  "channel": "protocol"
}
```

### Example Messages

#### Pool Update

```json
{
  "type": "update",
  "channel": "pool",
  "payload": {
    "address": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
    "sqrtPrice": "1234567890123456789012345678",
    "tick": "123456",
    "liquidity": "123456789012345678",
    "token0Price": "0.00123",
    "token1Price": "812.34",
    "timestamp": 1625097600
  }
}
```

#### Swap Event

```json
{
  "type": "swap",
  "channel": "swaps",
  "payload": {
    "pool": "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
    "timestamp": 1625097600,
    "transaction": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    "sender": "0xabcdef1234567890abcdef1234567890abcdef12",
    "recipient": "0x1234567890abcdef1234567890abcdef12345678",
    "amount0": "-1000.00",
    "amount1": "0.5",
    "amountUSD": "1000.00",
    "sqrtPriceX96Before": "1234567890123456789012345678",
    "sqrtPriceX96After": "1234567890123456789012345679",
    "tickBefore": "123456",
    "tickAfter": "123457",
    "poolFee": "0.003",
    "treasuryFee": "0.001"
  }
}
```

## Treasury Fee Data

The API provides specific endpoints for accessing treasury fee data:

```
GET /protocol/treasury
```

Example Response:
```json
{
  "treasuryFeesUSDTotal": "12345678.90",
  "treasuryFeesUSD24h": "123456.78",
  "treasuryFeesUSD7d": "1234567.89",
  "treasuryFeesUSD30d": "12345678.90",
  "buybacksUSDTotal": "1234567.89",
  "buybacksUSD30d": "123456.78",
  "treasuryBalance": [
    {
      "token": "USDC",
      "amount": "1000000.00",
      "valueUSD": "1000000.00"
    },
    {
      "token": "WETH",
      "amount": "500.00",
      "valueUSD": "750000.00"
    },
    // More tokens...
  ],
  "nextScheduledBuyback": 1625097600
}
```

## Error Handling

The API uses standard HTTP status codes:

- `200 OK`: Successful request
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid API key
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

Error responses include a JSON body with details:

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later or upgrade your plan.",
    "details": {
      "limit": 25,
      "period": "5s",
      "reset": 1625097605
    }
  }
}
```

## CORS Support

The API supports Cross-Origin Resource Sharing (CORS) for browser-based applications.

## Rate Limiting

Rate limits are applied based on your API key tier:

- **Free Tier**: 100 requests per minute
- **Developer Tier**: 1,000 requests per minute
- **Enterprise Tier**: Custom limits

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1625097605
```

## Pagination

List endpoints support pagination through `limit` and `offset` parameters:

```
GET /pools?limit=10&offset=20
```

Pagination metadata is included in the response:

```json
{
  "pools": [...],
  "pagination": {
    "limit": 10,
    "offset": 20,
    "total": 543
  }
}
```

## Support and Resources

- **API Status**: [status.synthra.io](https://status.synthra.io)
- **Developer Portal**: [developers.synthra.io](https://developers.synthra.io)
- **API Explorer**: [api.synthra.io/explorer](https://api.synthra.io/explorer)
- **Support**: [developers@synthra.io](mailto:developers@synthra.io)

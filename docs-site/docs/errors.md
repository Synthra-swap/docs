# Smart Contract Error Codes

Synthra Protocol implements comprehensive error handling based on proven Uniswap V3 patterns to provide clear feedback during transactions. Below are the most common error codes and their meanings.

## UniswapV3Pool.sol Errors

### LOK - Locked
**Error Code:** `LOK`
**Description:** The reentrancy guard. A transaction cannot re-enter the pool mid-swap.
**Common Causes:**
- Attempting to call pool functions during an ongoing transaction
- Reentrancy attempts during swaps or liquidity operations

```solidity
// Example: Safe operation check
require(!pool.locked(), "LOK");
```

### TLU - Tick Lower Upper
**Error Code:** `TLU`
**Description:** The lower tick must be below the upper tick.
**Common Causes:**
- Reversed tick positions in liquidity provision
- Invalid price range specification

```javascript
// Correct tick ordering
const tickLower = -887220; // Lower price
const tickUpper = 887220;  // Higher price
```

### TLM - Tick Lower Minimum
**Error Code:** `TLM`
**Description:** The lower tick must be greater than, or equal to, the minimum tick.
**Common Causes:**
- Setting tick positions outside valid range
- Price calculations resulting in invalid ticks

### TUM - Tick Upper Maximum
**Error Code:** `TUM`
**Description:** The upper tick must be less than, or equal to, the maximum tick.
**Common Causes:**
- Setting upper tick beyond maximum allowed value
- Price range calculations exceeding limits

### AI - Already Initialized
**Error Code:** `AI`
**Description:** The pool is already initialized.
**Common Causes:**
- Calling initialize() on an existing pool
- Duplicate pool creation attempts

### M0 - Mint Token 0 Balance
**Error Code:** `M0`
**Description:** The balance of token0 in the given pool before minting must be less than, or equal to, the balance after minting.
**Common Causes:**
- Inadequate token0 allowance
- Token transfer failures during minting

### M1 - Mint Token 1 Balance
**Error Code:** `M1`
**Description:** The balance of token1 in the given pool before minting must be less than, or equal to, the balance after minting.
**Common Causes:**
- Inadequate token1 allowance
- Token transfer failures during minting

```javascript
// Example: Check token balances before minting
const token0Balance = await token0.balanceOf(account);
const token1Balance = await token1.balanceOf(account);
require(token0Balance >= amount0, "M0");
require(token1Balance >= amount1, "M1");
```

### AS - Amount Specified
**Error Code:** `AS`
**Description:** amountSpecified cannot be zero.
**Common Causes:**
- Passing zero as swap amount
- Calculation errors resulting in zero amounts

### SPL - Square Root Price Limit
**Error Code:** `SPL`
**Description:** Square root price limit reached.
**Common Causes:**
- Slippage protection triggering
- Price movement beyond acceptable limits

### IIA - Insufficient Input Amount
**Error Code:** `IIA`
**Description:** An insufficient amount of input token was sent during the callback.
**Common Causes:**
- Slippage calculations
- Market price changes between transaction submission and execution

```javascript
// Example: Handle insufficient input amount
try {
  await router.exactInputSingle({
    tokenIn: tokenA,
    tokenOut: tokenB,
    fee: 3000,
    recipient: account,
    deadline: deadline,
    amountIn: amountIn,
    amountOutMinimum: minAmountOut,
    sqrtPriceLimitX96: 0
  });
} catch (error) {
  if (error.message.includes("IIA")) {
    // Handle insufficient input amount
    console.log("Please increase input amount or adjust slippage");
  }
}
```

### L - Liquidity Zero
**Error Code:** `L`
**Description:** Liquidity in the pool must be greater than zero for a flash to be executed.
**Common Causes:**
- Attempting flash loans on empty pools
- Pool initialization issues

### F0 - Flash Token 0
**Error Code:** `F0`
**Description:** The balance of token0 in the given pool before the flash transaction must be less than, or equal to, the balance of token0 after the flash plus the fee.
**Common Causes:**
- Insufficient token0 returned to pool
- Flash loan fee not paid

### F1 - Flash Token 1
**Error Code:** `F1`
**Description:** The balance of token1 in the given pool before the flash transaction must be less than, or equal to, the balance of token1 after the flash plus the fee.
**Common Causes:**
- Insufficient token1 returned to pool
- Flash loan fee not paid

```solidity
// Example: Proper flash loan implementation
function flashCallback(
    uint256 fee0,
    uint256 fee1,
    bytes calldata data
) external {
    // Your flash loan logic here
    
    // Must return borrowed amount + fees
    IERC20(token0).transfer(pool, amount0 + fee0);
    IERC20(token1).transfer(pool, amount1 + fee1);
}
```

## LiquidityMath.sol Errors

### LS - Liquidity Sub
**Error Code:** `LS`
**Description:** Liquidity Sub - Error during liquidity subtraction operation.
**Common Causes:**
- Removing more liquidity than available
- Position calculation errors

### LA - Liquidity Add
**Error Code:** `LA`
**Description:** Liquidity Add - Error during liquidity addition operation.
**Common Causes:**
- Token balance issues
- Price range conflicts

## Position.sol Errors

### NP - No Position
**Error Code:** `NP`
**Description:** Burn cannot be called for a position with 0 liquidity.
**Common Causes:**
- Attempting to close empty positions
- Position calculation errors

## Oracle.sol Errors

### OLD - Oracle Too Old
**Error Code:** `OLD`
**Description:** The target must be chronologically after the oldest observation.
**Common Causes:**
- Requesting historical data beyond available range
- Oracle initialization issues

### I - Not Initialized
**Error Code:** `I`
**Description:** The pool has not been initialized.
**Common Causes:**
- Calling pool functions before initialization
- Pool deployment issues

## TickMath.sol Errors

### T - Tick Out of Range
**Error Code:** `T`
**Description:** The given tick must be less than, or equal to, the maximum tick.
**Common Causes:**
- Invalid price calculations
- Tick overflow conditions

### R - Ratio Out of Range
**Error Code:** `R`
**Description:** Second inequality must be < because the price can never reach the price at the max tick.
**Common Causes:**
- Extreme price movements
- Calculation overflow

## Tick.sol Errors

### LO - Liquidity Overflow
**Error Code:** `LO`
**Description:** LiquidityGrossAfter must be less than MaxLiquidity.
**Common Causes:**
- Large liquidity positions exceeding maximum
- Calculation errors

## TransferHelper.sol Errors

### TF - Transfer Failed
**Error Code:** `TF`
**Description:** Transfer Failed - errors with TF if transfer fails.
**Common Causes:**
- Insufficient token balance
- Missing token approvals
- Token contract issues

```javascript
// Example: Handle transfer failures
try {
  await token.transfer(recipient, amount);
} catch (error) {
  if (error.message.includes("TF")) {
    // Check allowances and balances
    const balance = await token.balanceOf(sender);
    const allowance = await token.allowance(sender, spender);
    console.log(`Balance: ${balance}, Allowance: ${allowance}`);
  }
}
```

## Error Handling Best Practices

### 1. Comprehensive Error Checking

```javascript
import { ethers } from 'ethers'

class SynthraErrorHandler {
  static handleError(error) {
    // Extract error code from contract revert
    const errorCode = this.extractErrorCode(error);
    
    switch (errorCode) {
      case 'LOK':
        return {
          type: 'REENTRANCY',
          message: 'Transaction blocked by reentrancy guard. Please try again.',
          retry: true
        };
        
      case 'TLU':
        return {
          type: 'INVALID_RANGE',
          message: 'Invalid price range: lower tick must be below upper tick.',
          retry: false
        };
        
      case 'IIA':
        return {
          type: 'SLIPPAGE',
          message: 'Insufficient input amount. Try increasing slippage tolerance.',
          retry: true
        };
        
      case 'SPL':
        return {
          type: 'PRICE_LIMIT',
          message: 'Price moved beyond acceptable limits.',
          retry: true
        };
        
      case 'TF':
        return {
          type: 'TRANSFER_FAILED',
          message: 'Token transfer failed. Check balances and approvals.',
          retry: false
        };
        
      default:
        return {
          type: 'UNKNOWN',
          message: 'An unexpected error occurred.',
          retry: false
        };
    }
  }
  
  static extractErrorCode(error) {
    if (error.data) {
      // Extract from contract revert data
      const decoded = ethers.utils.defaultAbiCoder.decode(['string'], error.data);
      return decoded[0];
    }
    
    if (error.message) {
      // Extract from error message
      const match = error.message.match(/execution reverted: (.+)/);
      return match ? match[1] : null;
    }
    
    return null;
  }
}
```

### 2. Retry Logic with Exponential Backoff

```javascript
async function executeWithRetry(operation, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const errorInfo = SynthraErrorHandler.handleError(error);
      
      if (!errorInfo.retry || attempt === maxRetries - 1) {
        throw new Error(errorInfo.message);
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

### 3. User-Friendly Error Messages

```javascript
const ERROR_MESSAGES = {
  LOK: "The pool is currently processing another transaction. Please wait and try again.",
  TLU: "Invalid price range selected. The minimum price must be lower than the maximum price.",
  TLM: "The minimum price is too low. Please select a higher minimum price.",
  TUM: "The maximum price is too high. Please select a lower maximum price.",
  AI: "This pool has already been created.",
  M0: "Insufficient Token A balance or allowance for this transaction.",
  M1: "Insufficient Token B balance or allowance for this transaction.",
  AS: "The swap amount cannot be zero. Please enter a valid amount.",
  SPL: "The price moved too much during your transaction. Please try again with higher slippage tolerance.",
  IIA: "The input amount is too low for this swap. Please increase the amount or adjust slippage settings.",
  L: "This pool doesn't have enough liquidity for flash loans.",
  F0: "Flash loan repayment failed for Token A. Please ensure sufficient balance and fees.",
  F1: "Flash loan repayment failed for Token B. Please ensure sufficient balance and fees.",
  LS: "Error removing liquidity from your position. Please check position status.",
  LA: "Error adding liquidity to your position. Please check token balances.",
  NP: "Cannot close a position with zero liquidity.",
  OLD: "The requested price data is too old. Please refresh and try again.",
  I: "This pool has not been initialized yet.",
  T: "The selected price is outside the valid range.",
  R: "Price calculation resulted in an invalid ratio.",
  LO: "The liquidity amount is too large for this operation.",
  TF: "Token transfer failed. Please check your token balance and approvals."
};

function getUserFriendlyMessage(errorCode) {
  return ERROR_MESSAGES[errorCode] || "An unexpected error occurred. Please try again or contact support.";
}
```

### 4. Error Monitoring and Analytics

```javascript
class ErrorAnalytics {
  static track(errorCode, context = {}) {
    const errorData = {
      code: errorCode,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      context: context
    };
    
    // Send to analytics service
    fetch('/api/analytics/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    }).catch(console.error);
  }
}

// Usage in error handler
try {
  await executeSwap(params);
} catch (error) {
  const errorCode = SynthraErrorHandler.extractErrorCode(error);
  ErrorAnalytics.track(errorCode, { operation: 'swap', params });
  throw error;
}
```

## Common Error Scenarios

### Swap Transaction Failures

**Scenario 1: High Slippage**
- **Error Codes:** `IIA`, `SPL`
- **Solution:** Increase slippage tolerance or split large trades
- **Prevention:** Use dynamic slippage based on trade size

**Scenario 2: Insufficient Allowance**
- **Error Codes:** `TF`, `M0`, `M1`
- **Solution:** Approve token spending before transaction
- **Prevention:** Check and set adequate allowances

**Scenario 3: Price Movement**
- **Error Codes:** `SPL`, `IIA`
- **Solution:** Update price limits and retry
- **Prevention:** Use recent price data and reasonable limits

### Liquidity Provision Failures

**Scenario 1: Invalid Price Range**
- **Error Codes:** `TLU`, `TLM`, `TUM`
- **Solution:** Correct tick ordering and ranges
- **Prevention:** Validate ranges before submission

**Scenario 2: Insufficient Balance**
- **Error Codes:** `M0`, `M1`
- **Solution:** Ensure sufficient token balances
- **Prevention:** Balance checks before minting

### Position Management Failures

**Scenario 1: Unauthorized Access**
- **Error Codes:** `NP`
- **Solution:** Verify position ownership
- **Prevention:** Proper authentication checks

**Scenario 2: Empty Position Operations**
- **Error Codes:** `NP`, `LS`
- **Solution:** Check position liquidity before operations
- **Prevention:** Position status validation

## Emergency Procedures

### Circuit Breaker Patterns

```javascript
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failures = 0;
    this.lastFailure = 0;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }
  
  async execute(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailure > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failures++;
    this.lastFailure = Date.now();
    
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}
```

### Graceful Degradation

```javascript
class SynthraClient {
  constructor() {
    this.circuitBreaker = new CircuitBreaker();
    this.fallbackMode = false;
  }
  
  async swap(params) {
    try {
      return await this.circuitBreaker.execute(() => this.executeSwap(params));
    } catch (error) {
      if (this.shouldFallback(error)) {
        return this.fallbackSwap(params);
      }
      throw error;
    }
  }
  
  shouldFallback(error) {
    const fallbackErrors = ['LOK', 'SPL', 'L'];
    const errorCode = SynthraErrorHandler.extractErrorCode(error);
    return fallbackErrors.includes(errorCode);
  }
  
  async fallbackSwap(params) {
    // Implement fallback logic (e.g., route through different pools)
    console.warn('Using fallback swap mechanism');
    // ... fallback implementation
  }
}
```

## Additional Resources

- [Smart Contract Architecture](architecture.md)
- [Security Documentation](security.md)
- [SDK Error Handling](sdk.md#error-handling)
- [Integration Best Practices](integration.md)

For questions about specific errors or error handling patterns, join our [Discord community](https://discord.gg/eesEKPRDtd) or contact our technical team at [developers@synthra.org](mailto:developers@synthra.org).
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * Counter contract – assessment Part 1
 *
 * Implement:
 * - increment(): increase count by 1
 * - decrement(): decrease count by 1 (prevent underflow when count is 0)
 * - getCount(): return current count
 *
 * A reference implementation is provided below. You may replace it with your own.
 */
contract Counter {
    uint256 private _count;

    function increment() public {
        _count += 1;
    }

    function decrement() public {
        require(_count > 0, "Counter: underflow");
        _count -= 1;
    }

    function getCount() public view returns (uint256) {
        return _count;
    }
}

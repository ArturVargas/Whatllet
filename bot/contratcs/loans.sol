// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoanContract is Ownable {
    IERC20 public token;

    struct Position {
        address depositor;
        uint256 amount;
    }

    struct LoanRecord {
        address recipient;
        uint256 principalAmount; // Original loaned amount
        uint256 owedAmount;      // Principal + Interest
    }

    Position[] public positions;
    LoanRecord[] public loanRecords;
    mapping(address => uint256) public positionIndex;
    mapping(address => uint256) public owedAmounts;

    uint256 public totalDeposited;  // Tracks total deposited in the contract.

    constructor(address _token) {
        token = IERC20(_token);
    }

    function deposit(uint256 amount) external {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        if (positionIndex[msg.sender] == 0) {
            positions.push(Position({
                depositor: msg.sender,
                amount: amount
            }));
            positionIndex[msg.sender] = positions.length;
        } else {
            uint256 index = positionIndex[msg.sender] - 1;
            positions[index].amount += amount;
        }

        totalDeposited += amount;
    }

    function loan(address recipient, uint256 amount) external onlyOwner {
        require(token.transferFrom(msg.sender, recipient, amount), "Transfer failed");
        _recordLoan(recipient, amount);
    }

    function loanFromContract(address recipient, uint256 amount) external onlyOwner {
        require(token.transfer(recipient, amount), "Transfer failed");
        _recordLoan(recipient, amount);
    }

    function repay(uint256 amount) external {
        require(owedAmounts[msg.sender] >= amount, "Repaying more than owed or no loan exists.");

        uint256 interest = amount / 11; // Assuming the repayment includes the 10% interest
        distributeInterest(interest);

        owedAmounts[msg.sender] -= amount;

        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }

    function distributeInterest(uint256 interestAmount) private {
        for (uint i = 0; i < positions.length; i++) {
            uint256 holderShare = (positions[i].amount * interestAmount) / totalDeposited;
            require(token.transfer(positions[i].depositor, holderShare), "Interest distribution failed.");
        }
    }

    function _recordLoan(address recipient, uint256 amount) private {
        uint256 interest = amount / 10;
        uint256 totalOwed = amount + interest;

        loanRecords.push(LoanRecord({
            recipient: recipient,
            principalAmount: amount,
            owedAmount: totalOwed
        }));

        owedAmounts[recipient] += totalOwed;
    }

    function totalPositions() external view returns (uint256) {
        return positions.length;
    }

    function totalLoans() external view returns (uint256) {
        return loanRecords.length;
    }
}


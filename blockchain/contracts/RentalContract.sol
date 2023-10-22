// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// This contract facilitates a rental marketplace for ERC721 tokens (like BAYC) using an ERC20 token (like apeCoin) for payment.

// Importing interfaces for ERC721 and ERC20 standards from the OpenZeppelin library.
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RentalContract {
    IERC721 public bayc; // ERC721 token contract address (e.g., Bored Ape Yacht Club)
    IERC20 public apeCoin; // ERC20 token contract address used for payments
    address public vaultAddress; // Vault address where half of the rental payment is sent

    // Struct to hold rental information.
    struct Rental {
        address owner; // Owner of the ERC721 token
        address renter; // Renter of the ERC721 token
        uint256 price; // Price for the rental
        uint256 endTime; // Expiry timestamp of the rental
    }

    // Mapping to hold rental information against each tokenId.
    mapping(uint256 => Rental) public rentals;
    // Mapping to find tokenId from an address.
    mapping(address => uint256) public addressToTokenId;

    // Event emitted when a new rental is listed.
    event RentalListed(
        uint256 indexed tokenId,
        address indexed owner,
        uint256 price,
        uint256 endTime
    );
    // Event emitted when a rental starts.
    event RentalStarted(uint256 indexed tokenId, address indexed renter);

    // Event emitted when all rentals have ended.
    event AllRentalsEnded();

    // Constructor initializes the contract with the addresses of ERC721, ERC20 contracts, and the vault.
    constructor(address _bayc, address _apeCoin, address _vaultAddress) {
        bayc = IERC721(_bayc);
        apeCoin = IERC20(_apeCoin);
        vaultAddress = _vaultAddress;
    }

    // Function to list an ERC721 token for rent with price and duration.
    // Function to list an ERC721 token for rent with price and duration.
    function listForRent(
        uint256 tokenId,
        uint256 price,
        uint256 duration
    ) external {
        if(bayc.ownerOf(tokenId) != msg.sender) {
            revert("ErrorListForRent__NotOwner");
        }
        rentals[tokenId] = Rental({
            owner: msg.sender,
            renter: address(0),
            price: price,
            endTime: block.timestamp + duration
        });
        emit RentalListed(
            tokenId,
            msg.sender,
            price,
            block.timestamp + duration
        ); // Emit event
    }

    // Function to rent an ERC721 token listed for rent.
    // Function to rent an ERC721 token listed for rent.
    function rent(uint256 tokenId) external {
        Rental storage rental = rentals[tokenId]; // Get rental info
        // if(rental.owner == address(0)) {
        //     revert("ErrorRent__NotListed");
        // }
        // if(rental.renter != address(0)) {
        //     revert("ErrorRent__AlreadyRented");
        // }

        // Transfer half of the rental price to the owner and the other half to the vault.
        bool paymentToOwner = apeCoin.transferFrom(msg.sender, rental.owner, rental.price / 2);
        bool paymentToVault = apeCoin.transferFrom(msg.sender, vaultAddress, rental.price / 2);
        if(!paymentToOwner) {
            revert("ErrorRent__PaymentFailed");
        }
        if(!paymentToVault) {
            revert("ErrorRent__PaymentToVaultFailed");
        }
        rental.renter = msg.sender; // Update renter
        emit RentalStarted(tokenId, msg.sender); // Emit event
    }

    // Function to end all rentals and make all NFTs available for rent again.
    function endAllRentals() external {
        for (uint256 tokenId = 1; tokenId <= 20; tokenId++) {
            // Check if a rental exists for the current tokenId
            if (rentals[tokenId].owner != address(0)) {
                // Reset the renter field to address(0) to make the NFT available for rent again
                rentals[tokenId].renter = address(0);
            }
        }
        // Emit an event to notify that all rentals have ended
        emit AllRentalsEnded();
    }

    // Function to check if a token is rented.
    function isRented(uint256 tokenId) public view returns (bool) {
        return rentals[tokenId].renter != address(0);
    }

    // Function to get the details of a rental.
    function getRentalDetails(
        uint256 tokenId
    ) public view returns (Rental memory) {
        return rentals[tokenId];
    }
}

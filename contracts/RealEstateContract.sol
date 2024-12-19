// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RealEstateContract {
    // Structure for Property details
    struct Property {
        uint256 id;
        address owner;
        string name;
        string location;
        string imageUrl;
        uint256 price;
        bool isAvailable;
        uint256 tokenPrice;      // Price per token
        uint256 totalTokens;     // Total number of tokens for the property
        uint256 availableTokens; // Remaining tokens available for purchase
    }

    // State variables
    mapping(uint256 => Property) public properties;
    uint256 public propertyCount = 0;
    mapping(address => mapping(uint256 => uint256)) public userTokens; // Track tokens owned by users

    // Events
    event PropertyListed(uint256 indexed id, string name, uint256 price);
    event TokensPurchased(uint256 indexed propertyId, address buyer, uint256 tokens);

    // List a new property
    function listProperty(
        string memory _name,
        string memory _location,
        string memory _imageUrl,
        uint256 _price,
        uint256 _totalTokens
    ) public {
        require(_price > 0, "Price must be greater than 0");
        require(_totalTokens > 0, "Total tokens must be greater than 0");

        propertyCount++;
        uint256 tokenPrice = _price / _totalTokens;

        properties[propertyCount] = Property(
            propertyCount,
            msg.sender,
            _name,
            _location,
            _imageUrl,
            _price,
            true,
            tokenPrice,
            _totalTokens,
            _totalTokens
        );

        emit PropertyListed(propertyCount, _name, _price);
    }

    // Purchase tokens for a property
    function purchaseTokens(uint256 _propertyId, uint256 _numberOfTokens) public payable {
        Property storage property = properties[_propertyId];
        
        require(property.isAvailable, "Property is not available");
        require(_numberOfTokens > 0, "Must purchase at least one token");
        require(_numberOfTokens <= property.availableTokens, "Not enough tokens available");
        require(msg.value >= property.tokenPrice * _numberOfTokens, "Insufficient payment");

        property.availableTokens -= _numberOfTokens;
        userTokens[msg.sender][_propertyId] += _numberOfTokens;

        // If all tokens are sold, mark property as unavailable
        if (property.availableTokens == 0) {
            property.isAvailable = false;
        }

        emit TokensPurchased(_propertyId, msg.sender, _numberOfTokens);
    }

    // Get all properties
    function getAllProperties() public view returns (Property[] memory) {
        Property[] memory allProperties = new Property[](propertyCount);
        
        for(uint i = 1; i <= propertyCount; i++) {
            allProperties[i-1] = properties[i];
        }
        
        return allProperties;
    }

    // Get user's tokens for a property
    function getMyTokens(uint256 _propertyId) public view returns (uint256) {
        return userTokens[msg.sender][_propertyId];
    }
} 
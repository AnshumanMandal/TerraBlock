// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract RealEstateContract {
    struct Property {
        uint256 id;
        address owner;
        string location;
        uint256 price;
        uint256 totalTokens;
        uint256 availableTokens;
        bool isActive;
    }

    mapping(uint256 => Property) public properties;
    uint256 public propertyCount;
    mapping(address => mapping(uint256 => uint256)) public userTokens;

    event PropertyListed(uint256 indexed id, address owner, uint256 price);
    event TokensPurchased(uint256 indexed propertyId, address buyer, uint256 tokens);

    function listProperty(string memory _location, uint256 _price, uint256 _totalTokens) public {
        propertyCount++;
        properties[propertyCount] = Property(
            propertyCount,
            msg.sender,
            _location,
            _price,
            _totalTokens,
            _totalTokens,
            true
        );
        
        emit PropertyListed(propertyCount, msg.sender, _price);
    }

    function purchaseTokens(uint256 _propertyId, uint256 _tokens) public payable {
        Property storage property = properties[_propertyId];
        require(property.isActive, "Property not active");
        require(property.availableTokens >= _tokens, "Not enough tokens available");
        require(msg.value >= property.price * _tokens, "Insufficient payment");

        property.availableTokens -= _tokens;
        userTokens[msg.sender][_propertyId] += _tokens;

        emit TokensPurchased(_propertyId, msg.sender, _tokens);
    }
} 
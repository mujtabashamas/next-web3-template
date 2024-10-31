import { useContractWrite, usePrepareContractWrite } from 'wagmi'

import { ethers } from 'ethers'

export default function Test() {
  let abi = [
    {
      inputs: [
        {
          internalType: 'address payable',
          name: 'treasury',
          type: 'address',
        },
        { internalType: 'address', name: 'feth', type: 'address' },
        { internalType: 'uint256', name: 'duration', type: 'uint256' },
        { internalType: 'address', name: 'router', type: 'address' },
        { internalType: 'address', name: 'marketUtils', type: 'address' },
        { internalType: 'address', name: 'worldsNft', type: 'address' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'FETHNode_FETH_Address_Is_Not_A_Contract',
      type: 'error',
    },
    {
      inputs: [],
      name: 'FETHNode_Only_FETH_Can_Transfer_ETH',
      type: 'error',
    },
    {
      inputs: [],
      name: 'FoundationTreasuryNode_Address_Is_Not_A_Contract',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'buyPrice', type: 'uint256' }],
      name: 'NFTMarketBuyPrice_Cannot_Buy_At_Lower_Price',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketBuyPrice_Cannot_Buy_Unset_Price',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketBuyPrice_Cannot_Cancel_Unset_Price',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'NFTMarketBuyPrice_Only_Owner_Can_Cancel_Price',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'NFTMarketBuyPrice_Only_Owner_Can_Set_Price',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'NFTMarketBuyPrice_Only_Owner_Can_Update_Nft',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketBuyPrice_Price_Already_Set',
      type: 'error',
    },
    { inputs: [], name: 'NFTMarketBuyPrice_Price_Too_High', type: 'error' },
    {
      inputs: [{ internalType: 'address', name: 'seller', type: 'address' }],
      name: 'NFTMarketBuyPrice_Seller_Mismatch',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketCore_Can_Not_Update_Unlisted_Nft',
      type: 'error',
    },
    { inputs: [], name: 'NFTMarketCore_Seller_Not_Found', type: 'error' },
    {
      inputs: [{ internalType: 'address', name: 'curator', type: 'address' }],
      name: 'NFTMarketExhibition_Caller_Is_Not_Curator',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'address', name: 'worlds', type: 'address' }],
      name: 'NFTMarketExhibition_Caller_Is_Not_Worlds_Contract',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketExhibition_Can_Not_Add_Dupe_Seller',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketExhibition_Can_Not_Remove_Not_Associated_With_Exhibition',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketExhibition_Curator_Automatically_Allowed',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'address', name: 'curator', type: 'address' }],
      name: 'NFTMarketExhibition_Curator_Does_Not_Match',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketExhibition_Exhibition_Does_Not_Exist',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketExhibition_Exhibition_NFT_Already_Set',
      type: 'error',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'nftTokenId', type: 'uint256' },
        {
          internalType: 'uint256',
          name: 'currentExhibitionId',
          type: 'uint256',
        },
      ],
      name: 'NFTMarketExhibition_NFT_Not_Associated_With_Exhibition',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketExhibition_Seller_Not_Allowed_In_Exhibition',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketExhibition_Sellers_Required',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketExhibition_Take_Rate_Too_High',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketExhibition_World_Migration_Already_Completed',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketFees_Invalid_Protocol_Fee',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketFees_Market_Utils_Is_Not_A_Contract',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketOffer_Cannot_Be_Made_While_In_Auction',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'currentOfferAmount',
          type: 'uint256',
        },
      ],
      name: 'NFTMarketOffer_Offer_Below_Min_Amount',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'expiry', type: 'uint256' }],
      name: 'NFTMarketOffer_Offer_Expired',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'currentOfferFrom',
          type: 'address',
        },
      ],
      name: 'NFTMarketOffer_Offer_From_Does_Not_Match',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'minOfferAmount', type: 'uint256' }],
      name: 'NFTMarketOffer_Offer_Must_Be_At_Least_Min_Amount',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'auctionId', type: 'uint256' }],
      name: 'NFTMarketReserveAuction_Already_Listed',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'minAmount', type: 'uint256' }],
      name: 'NFTMarketReserveAuction_Bid_Must_Be_At_Least_Min_Amount',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'reservePrice', type: 'uint256' }],
      name: 'NFTMarketReserveAuction_Cannot_Bid_Lower_Than_Reserve_Price',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'endTime', type: 'uint256' }],
      name: 'NFTMarketReserveAuction_Cannot_Bid_On_Ended_Auction',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketReserveAuction_Cannot_Bid_On_Nonexistent_Auction',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketReserveAuction_Cannot_Finalize_Already_Settled_Auction',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'endTime', type: 'uint256' }],
      name: 'NFTMarketReserveAuction_Cannot_Finalize_Auction_In_Progress',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketReserveAuction_Cannot_Rebid_Over_Outstanding_Bid',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketReserveAuction_Cannot_Update_Auction_In_Progress',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketReserveAuction_Cannot_Update_Nft_While_Auction_In_Progress',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'maxDuration', type: 'uint256' }],
      name: 'NFTMarketReserveAuction_Exceeds_Max_Duration',
      type: 'error',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'extensionDuration',
          type: 'uint256',
        },
      ],
      name: 'NFTMarketReserveAuction_Less_Than_Extension_Duration',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketReserveAuction_Must_Set_Non_Zero_Reserve_Price',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'address', name: 'seller', type: 'address' }],
      name: 'NFTMarketReserveAuction_Not_Matching_Seller',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'NFTMarketReserveAuction_Only_Owner_Can_Update_Auction',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'NFTMarketReserveAuction_Only_Owner_Can_Update_Nft',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketReserveAuction_Price_Already_Set',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketReserveAuction_Too_Much_Value_Provided',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketScheduling_Sale_Starts_At_Already_Set',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketScheduling_Sale_Starts_At_Is_In_Future',
      type: 'error',
    },
    {
      inputs: [],
      name: 'NFTMarketScheduling_Sale_Starts_At_Is_In_Past',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'maxStartsAt', type: 'uint256' }],
      name: 'NFTMarketScheduling_Sale_Starts_At_Too_Far_In_The_Future',
      type: 'error',
    },
    {
      inputs: [],
      name: 'RouteCallLibrary_Call_Failed_Without_Revert_Reason',
      type: 'error',
    },
    {
      inputs: [],
      name: 'RouterContextSingle_Address_Is_Not_A_Contract',
      type: 'error',
    },
    {
      inputs: [],
      name: 'WorldsNftNode_Worlds_NFT_Is_Not_A_Contract',
      type: 'error',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'seller',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'buyer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalFees',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'creatorRev',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'sellerRev',
          type: 'uint256',
        },
      ],
      name: 'BuyPriceAccepted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'BuyPriceCanceled',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'BuyPriceInvalidated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'seller',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'price',
          type: 'uint256',
        },
      ],
      name: 'BuyPriceSet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'buyReferrer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'buyReferrerFee',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'buyReferrerSellerFee',
          type: 'uint256',
        },
      ],
      name: 'BuyReferralPaid',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'curator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint16',
          name: 'takeRateInBasisPoints',
          type: 'uint16',
        },
      ],
      name: 'ExhibitionCreated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
      ],
      name: 'ExhibitionDeleted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'exhibitionId',
          type: 'uint256',
        },
      ],
      name: 'ExhibitionMigratedToWorlds',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint8',
          name: 'version',
          type: 'uint8',
        },
      ],
      name: 'Initialized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
      ],
      name: 'NftAddedToExhibition',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
      ],
      name: 'NftRemovedFromExhibition',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'buyer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'seller',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalFees',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'creatorRev',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'sellerRev',
          type: 'uint256',
        },
      ],
      name: 'OfferAccepted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'OfferInvalidated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'buyer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'expiration',
          type: 'uint256',
        },
      ],
      name: 'OfferMade',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'auctionId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'bidder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'endTime',
          type: 'uint256',
        },
      ],
      name: 'ReserveAuctionBidPlaced',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'auctionId',
          type: 'uint256',
        },
      ],
      name: 'ReserveAuctionCanceled',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'seller',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'duration',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'extensionDuration',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'reservePrice',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'auctionId',
          type: 'uint256',
        },
      ],
      name: 'ReserveAuctionCreated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'auctionId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'seller',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'bidder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalFees',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'creatorRev',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'sellerRev',
          type: 'uint256',
        },
      ],
      name: 'ReserveAuctionFinalized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'auctionId',
          type: 'uint256',
        },
      ],
      name: 'ReserveAuctionInvalidated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'auctionId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'reservePrice',
          type: 'uint256',
        },
      ],
      name: 'ReserveAuctionUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'sellerReferrer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'sellerReferrerFee',
          type: 'uint256',
        },
      ],
      name: 'SellerReferralPaid',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address[]',
          name: 'sellers',
          type: 'address[]',
        },
      ],
      name: 'SellersAddedToExhibition',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'nftContract',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'saleStartsAt',
          type: 'uint256',
        },
      ],
      name: 'SetSaleStartsAt',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'WithdrawalToFETH',
      type: 'event',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'address', name: 'offerFrom', type: 'address' },
        { internalType: 'uint256', name: 'minAmount', type: 'uint256' },
      ],
      name: 'acceptOffer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
        { internalType: 'address[]', name: 'sellers', type: 'address[]' },
      ],
      name: 'addSellersToExhibition',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: 'maxPrice', type: 'uint256' },
        {
          internalType: 'address payable',
          name: 'referrer',
          type: 'address',
        },
      ],
      name: 'buyV2',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'cancelBuyPrice',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'auctionId', type: 'uint256' }],
      name: 'cancelReserveAuction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'string', name: 'name', type: 'string' },
        {
          internalType: 'uint16',
          name: 'takeRateInBasisPoints',
          type: 'uint16',
        },
        { internalType: 'address[]', name: 'sellers', type: 'address[]' },
      ],
      name: 'createExhibition',
      outputs: [
        {
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        {
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
        { internalType: 'uint256', name: 'reservePrice', type: 'uint256' },
        { internalType: 'uint256', name: 'duration', type: 'uint256' },
      ],
      name: 'createReserveAuctionV3',
      outputs: [{ internalType: 'uint256', name: 'auctionId', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
      ],
      name: 'deleteExhibition',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'auctionId', type: 'uint256' }],
      name: 'finalizeReserveAuction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getApprovedRouterAddress',
      outputs: [{ internalType: 'address', name: 'router', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'getBuyPrice',
      outputs: [
        { internalType: 'address', name: 'seller', type: 'address' },
        { internalType: 'uint256', name: 'price', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
      ],
      name: 'getExhibition',
      outputs: [
        { internalType: 'string', name: 'name', type: 'string' },
        {
          internalType: 'address payable',
          name: 'paymentAddress',
          type: 'address',
        },
        {
          internalType: 'uint16',
          name: 'takeRateInBasisPoints',
          type: 'uint16',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'getExhibitionIdForNft',
      outputs: [
        {
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        {
          internalType: 'address payable',
          name: 'seller',
          type: 'address',
        },
        { internalType: 'uint256', name: 'price', type: 'uint256' },
        {
          internalType: 'address payable',
          name: 'buyReferrer',
          type: 'address',
        },
        {
          internalType: 'uint16',
          name: 'sellerReferrerTakeRateInBasisPoints',
          type: 'uint16',
        },
      ],
      name: 'getFees',
      outputs: [
        {
          internalType: 'uint256',
          name: 'protocolFeeAmount',
          type: 'uint256',
        },
        {
          internalType: 'address payable[]',
          name: 'creatorRecipients',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'creatorShares',
          type: 'uint256[]',
        },
        { internalType: 'uint256', name: 'sellerRev', type: 'uint256' },
        {
          internalType: 'uint256',
          name: 'buyReferrerFee',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'sellerReferrerFee',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: 'price', type: 'uint256' },
      ],
      name: 'getFeesAndRecipients',
      outputs: [
        { internalType: 'uint256', name: 'totalFees', type: 'uint256' },
        { internalType: 'uint256', name: 'creatorRev', type: 'uint256' },
        {
          internalType: 'address payable[]',
          name: 'creatorRecipients',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'creatorShares',
          type: 'uint256[]',
        },
        { internalType: 'uint256', name: 'sellerRev', type: 'uint256' },
        { internalType: 'address payable', name: 'seller', type: 'address' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getFethAddress',
      outputs: [{ internalType: 'address', name: 'fethAddress', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getFoundationTreasury',
      outputs: [
        {
          internalType: 'address payable',
          name: 'treasuryAddress',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getMarketUtilsAddress',
      outputs: [
        {
          internalType: 'address',
          name: 'marketUtilsAddress',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'auctionId', type: 'uint256' }],
      name: 'getMinBidAmount',
      outputs: [{ internalType: 'uint256', name: 'minimum', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'getMinOfferAmount',
      outputs: [{ internalType: 'uint256', name: 'minimum', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'getOffer',
      outputs: [
        { internalType: 'address', name: 'buyer', type: 'address' },
        { internalType: 'uint256', name: 'expiration', type: 'uint256' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'getOfferReferrer',
      outputs: [
        {
          internalType: 'address payable',
          name: 'referrer',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'auctionId', type: 'uint256' }],
      name: 'getReserveAuction',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'nftContract',
              type: 'address',
            },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            {
              internalType: 'address payable',
              name: 'seller',
              type: 'address',
            },
            { internalType: 'uint256', name: 'duration', type: 'uint256' },
            {
              internalType: 'uint256',
              name: 'extensionDuration',
              type: 'uint256',
            },
            { internalType: 'uint256', name: 'endTime', type: 'uint256' },
            {
              internalType: 'address payable',
              name: 'bidder',
              type: 'address',
            },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
          ],
          internalType: 'struct ReserveAuction',
          name: 'auction',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'auctionId', type: 'uint256' }],
      name: 'getReserveAuctionBidReferrer',
      outputs: [
        {
          internalType: 'address payable',
          name: 'referrer',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'getReserveAuctionIdFor',
      outputs: [{ internalType: 'uint256', name: 'auctionId', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'getSaleStartsAt',
      outputs: [{ internalType: 'uint256', name: 'saleStartsAt', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'getSellerOf',
      outputs: [{ internalType: 'address payable', name: 'seller', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getWorldsNftAddress',
      outputs: [{ internalType: 'address', name: 'worldsNft', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
        { internalType: 'address', name: 'seller', type: 'address' },
      ],
      name: 'isAllowedSellerForExhibition',
      outputs: [{ internalType: 'bool', name: 'allowedSeller', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        {
          internalType: 'address payable',
          name: 'referrer',
          type: 'address',
        },
      ],
      name: 'makeOfferV2',
      outputs: [{ internalType: 'uint256', name: 'expiration', type: 'uint256' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'auctionId', type: 'uint256' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' },
        {
          internalType: 'address payable',
          name: 'referrer',
          type: 'address',
        },
      ],
      name: 'placeBidV2',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: 'price', type: 'uint256' },
      ],
      name: 'setBuyPrice',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        {
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
        { internalType: 'uint256', name: 'price', type: 'uint256' },
      ],
      name: 'setBuyPriceV2',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { internalType: 'uint256', name: 'saleStartsAt', type: 'uint256' },
      ],
      name: 'setSaleStartsAt',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'nftContract', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        {
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
      ],
      name: 'updateExhibitionNft',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'auctionId', type: 'uint256' },
        { internalType: 'uint256', name: 'reservePrice', type: 'uint256' },
      ],
      name: 'updateReserveAuction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'auctionId', type: 'uint256' },
        {
          internalType: 'uint256',
          name: 'worldOrExhibitionId',
          type: 'uint256',
        },
        { internalType: 'uint256', name: 'reservePrice', type: 'uint256' },
      ],
      name: 'updateReserveAuctionV2',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'worldsInitializeMigration',
      outputs: [
        {
          internalType: 'uint256',
          name: 'lastExhibitionIdCreated',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'exhibitionId', type: 'uint256' },
        { internalType: 'address', name: 'curator', type: 'address' },
      ],
      name: 'worldsMigrateExhibition',
      outputs: [
        { internalType: 'string', name: 'name', type: 'string' },
        {
          internalType: 'uint16',
          name: 'takeRateInBasisPoints',
          type: 'uint16',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'exhibitionId', type: 'uint256' },
        {
          components: [
            {
              internalType: 'address',
              name: 'nftContract',
              type: 'address',
            },
            { internalType: 'uint256', name: 'nftTokenId', type: 'uint256' },
          ],
          internalType: 'struct INFTMarketExhibitionMigration.NFTListing[]',
          name: 'nftListings',
          type: 'tuple[]',
        },
      ],
      name: 'worldsMigrateExhibitionListings',
      outputs: [{ internalType: 'address[]', name: 'nftSellers', type: 'address[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { stateMutability: 'payable', type: 'receive' },
  ]

  let price = 0.2
  price = ethers.utils.parseEther(price.toString())

  const { config } = usePrepareContractWrite({
    abi: abi,
    functionName: 'placeBidV2',
    address: '0xcDA72070E455bb31C7690a170224Ce43623d0B6f',
    args: ['361652', '100000000000000000', '0x4a5aa07a21e5eF6305Ff5948829CeB053aB224d1'],
    value: '100000000000000000',
  })

  console.log(config)

  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  if (isLoading) return <div>Loading...</div>

  if (isSuccess) console.log(data)
  console.log(data)

  return (
    <>
      {/* <Head />
       */}

      <main>
        <button onClick={write}>Test</button>
      </main>
    </>
  )
}

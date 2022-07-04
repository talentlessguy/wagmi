import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "Context",
      "WagmiProvider",
      "WagmiConfig",
      "createClient",
      "useClient",
      "paginatedIndexesConfig",
      "useAccount",
      "useBalance",
      "useBlockNumber",
      "useConnect",
      "useContract",
      "useContractEvent",
      "useContractInfiniteReads",
      "useContractRead",
      "useContractReads",
      "useContractWrite",
      "useDisconnect",
      "useEnsAddress",
      "useEnsAvatar",
      "useEnsName",
      "useEnsResolver",
      "useFeeData",
      "useInfiniteQuery",
      "useNetwork",
      "useProvider",
      "useQuery",
      "useSendTransaction",
      "useSendTransactionEager",
      "useSignMessage",
      "useSignTypedData",
      "useSigner",
      "useSwitchNetwork",
      "useToken",
      "useWaitForTransaction",
      "useWebSocketProvider",
      "deserialize",
      "serialize",
      "AddChainError",
      "ChainDoesNotSupportMulticallError",
      "ChainMismatchError",
      "ChainNotConfiguredError",
      "Client",
      "Connector",
      "ConnectorAlreadyConnectedError",
      "ConnectorNotFoundError",
      "ProviderChainsNotFound",
      "ProviderRpcError",
      "ResourceUnavailableError",
      "RpcError",
      "SwitchChainError",
      "SwitchChainNotSupportedError",
      "UserRejectedRequestError",
      "alchemyRpcUrls",
      "allChains",
      "chain",
      "chainId",
      "configureChains",
      "createStorage",
      "defaultChains",
      "defaultL2Chains",
      "erc20ABI",
      "erc721ABI",
      "etherscanBlockExplorers",
      "infuraRpcUrls",
      "publicRpcUrls",
      "readContracts",
    ]
  `)
})

it('should alias "WagmiConfig" as "WagmiProvider"', () => {
  expect(Exports.WagmiConfig).toBe(Exports.WagmiProvider)
})

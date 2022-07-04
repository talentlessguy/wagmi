import { BigNumber } from 'ethers'

import { setupClient } from '../../../test'
import * as fetchEnsAddress from '../ens/fetchEnsAddress'
import { getProvider } from '../providers'
import { buildTransactionRequest } from './buildTransactionRequest'

describe('buildTransactionRequest', () => {
  beforeEach(() => setupClient())

  afterEach(() => jest.clearAllMocks())

  it('derives the gas limit & ens address', async () => {
    const provider = getProvider()
    const fetchEnsAddressSpy = jest.spyOn(fetchEnsAddress, 'fetchEnsAddress')
    const estimateGasSpy = jest.spyOn(provider, 'estimateGas')

    const request = {
      to: 'moxey.eth',
      value: BigNumber.from('10000000000000000'), // 0.01 ETH
    }
    const eagerRequest = await buildTransactionRequest({
      request,
    })

    expect(fetchEnsAddressSpy).toBeCalledWith({ name: 'moxey.eth' })
    expect(estimateGasSpy).toBeCalledWith(request)
    expect(eagerRequest).toMatchInlineSnapshot(`
      {
        "gasLimit": {
          "hex": "0x5209",
          "type": "BigNumber",
        },
        "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        "value": {
          "hex": "0x2386f26fc10000",
          "type": "BigNumber",
        },
      }
    `)
  })

  it('derives the gas limit only if address is passed', async () => {
    const provider = getProvider()
    const fetchEnsAddressSpy = jest.spyOn(fetchEnsAddress, 'fetchEnsAddress')
    const estimateGasSpy = jest.spyOn(provider, 'estimateGas')

    const request = {
      to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      value: BigNumber.from('10000000000000000'), // 0.01 ETH
    }
    const eagerRequest = await buildTransactionRequest({
      request,
    })

    expect(fetchEnsAddressSpy).toBeCalledTimes(0)
    expect(estimateGasSpy).toBeCalledWith(request)
    expect(eagerRequest).toMatchInlineSnapshot(`
      {
        "gasLimit": {
          "hex": "0x5209",
          "type": "BigNumber",
        },
        "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        "value": {
          "hex": "0x2386f26fc10000",
          "type": "BigNumber",
        },
      }
    `)
  })

  it('derives the address only if gas limit is passed', async () => {
    const provider = getProvider()
    const fetchEnsAddressSpy = jest.spyOn(fetchEnsAddress, 'fetchEnsAddress')
    const estimateGasSpy = jest.spyOn(provider, 'estimateGas')

    const request = {
      gasLimit: BigNumber.from('1000000'),
      to: 'moxey.eth',
      value: BigNumber.from('10000000000000000'), // 0.01 ETH
    }
    const eagerRequest = await buildTransactionRequest({
      request,
    })

    expect(fetchEnsAddressSpy).toBeCalledWith({ name: 'moxey.eth' })
    expect(estimateGasSpy).toBeCalledTimes(0)
    expect(eagerRequest).toMatchInlineSnapshot(`
      {
        "gasLimit": {
          "hex": "0x0f4240",
          "type": "BigNumber",
        },
        "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        "value": {
          "hex": "0x2386f26fc10000",
          "type": "BigNumber",
        },
      }
    `)
  })

  it('returns the request if both gas limit & address is passed', async () => {
    const provider = getProvider()
    const fetchEnsAddressSpy = jest.spyOn(fetchEnsAddress, 'fetchEnsAddress')
    const estimateGasSpy = jest.spyOn(provider, 'estimateGas')

    const request = {
      gasLimit: BigNumber.from('1000000'),
      to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      value: BigNumber.from('10000000000000000'), // 0.01 ETH
    }
    const eagerRequest = await buildTransactionRequest({
      request,
    })

    expect(fetchEnsAddressSpy).toBeCalledTimes(0)
    expect(estimateGasSpy).toBeCalledTimes(0)
    expect(eagerRequest).toMatchInlineSnapshot(`
      {
        "gasLimit": {
          "hex": "0x0f4240",
          "type": "BigNumber",
        },
        "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        "value": {
          "hex": "0x2386f26fc10000",
          "type": "BigNumber",
        },
      }
    `)
  })

  describe('errors', () => {
    it('undefined `to` if fetchEnsAddress throws', async () => {
      jest.spyOn(fetchEnsAddress, 'fetchEnsAddress').mockRejectedValue('error')

      const request = {
        to: 'moxey.eth',
        value: BigNumber.from('10000000000000000'), // 0.01 ETH
      }
      const eagerRequest = await buildTransactionRequest({
        request,
      })

      expect(eagerRequest).toMatchInlineSnapshot(`
        {
          "gasLimit": {
            "hex": "0x5209",
            "type": "BigNumber",
          },
          "to": undefined,
          "value": {
            "hex": "0x2386f26fc10000",
            "type": "BigNumber",
          },
        }
      `)
    })

    it('undefined `gasLimit` if estimateGas throws', async () => {
      const provider = getProvider()
      jest.spyOn(provider, 'estimateGas').mockRejectedValue('error')

      const request = {
        to: 'moxey.eth',
        value: BigNumber.from('10000000000000000'), // 0.01 ETH
      }
      const eagerRequest = await buildTransactionRequest({
        request,
      })

      expect(eagerRequest).toMatchInlineSnapshot(`
        {
          "gasLimit": undefined,
          "to": undefined,
          "value": {
            "hex": "0x2386f26fc10000",
            "type": "BigNumber",
          },
        }
      `)
    })
  })
})

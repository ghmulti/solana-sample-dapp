// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolanasampledappIDL from '../target/idl/solanasampledapp.json'
import type { Solanasampledapp } from '../target/types/solanasampledapp'

// Re-export the generated IDL and type
export { Solanasampledapp, SolanasampledappIDL }

// The programId is imported from the program IDL.
export const SOLANASAMPLEDAPP_PROGRAM_ID = new PublicKey(SolanasampledappIDL.address)

// This is a helper function to get the Solanasampledapp Anchor program.
export function getSolanasampledappProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...SolanasampledappIDL, address: address ? address.toBase58() : SolanasampledappIDL.address } as Solanasampledapp, provider)
}

// This is a helper function to get the program ID for the Solanasampledapp program depending on the cluster.
export function getSolanasampledappProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Solanasampledapp program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return SOLANASAMPLEDAPP_PROGRAM_ID
  }
}

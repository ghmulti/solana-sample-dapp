import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Solanasampledapp} from '../target/types/solanasampledapp'

describe('solanasampledapp', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Solanasampledapp as Program<Solanasampledapp>

  const solanasampledappKeypair = Keypair.generate()

  it('Initialize Solanasampledapp', async () => {
    await program.methods
      .initialize()
      .accounts({
        solanasampledapp: solanasampledappKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([solanasampledappKeypair])
      .rpc()

    const currentCount = await program.account.solanasampledapp.fetch(solanasampledappKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Solanasampledapp', async () => {
    await program.methods.increment().accounts({ solanasampledapp: solanasampledappKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanasampledapp.fetch(solanasampledappKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Solanasampledapp Again', async () => {
    await program.methods.increment().accounts({ solanasampledapp: solanasampledappKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanasampledapp.fetch(solanasampledappKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Solanasampledapp', async () => {
    await program.methods.decrement().accounts({ solanasampledapp: solanasampledappKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanasampledapp.fetch(solanasampledappKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set solanasampledapp value', async () => {
    await program.methods.set(42).accounts({ solanasampledapp: solanasampledappKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanasampledapp.fetch(solanasampledappKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the solanasampledapp account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        solanasampledapp: solanasampledappKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.solanasampledapp.fetchNullable(solanasampledappKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})

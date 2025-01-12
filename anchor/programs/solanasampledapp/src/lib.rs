#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod solanasampledapp {
    use super::*;

  pub fn close(_ctx: Context<CloseSolanasampledapp>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanasampledapp.count = ctx.accounts.solanasampledapp.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanasampledapp.count = ctx.accounts.solanasampledapp.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolanasampledapp>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.solanasampledapp.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolanasampledapp<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Solanasampledapp::INIT_SPACE,
  payer = payer
  )]
  pub solanasampledapp: Account<'info, Solanasampledapp>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolanasampledapp<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub solanasampledapp: Account<'info, Solanasampledapp>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub solanasampledapp: Account<'info, Solanasampledapp>,
}

#[account]
#[derive(InitSpace)]
pub struct Solanasampledapp {
  count: u8,
}

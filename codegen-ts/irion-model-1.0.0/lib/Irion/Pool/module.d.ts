// Generated from ../../Irion/Pool/module.daml

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';

import * as pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4 from '@@irion/daml-prim-DA-Types-1.0.0';
import * as pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69 from '@@irion/ghc-stdlib-DA-Internal-Template-1.0.0';

import * as Irion_Token from '../../Irion/Token/module';

export declare type LendingPool = {
  operator: damlTypes.Party,
  usdcIssuer: damlTypes.Party,
  totalShares: damlTypes.Numeric,
  available: damlTypes.Numeric,
  totalBorrowed: damlTypes.Numeric,
  minimumLiquidity: damlTypes.Numeric,
}

export declare interface LendingPoolInterface {
  Archive: 
    damlTypes.Choice<LendingPool, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<LendingPool, undefined>>;
  Pool_InjectYield: 
    damlTypes.Choice<LendingPool, Pool_InjectYield, damlTypes.ContractId<LendingPool>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<LendingPool, undefined>>;
}
export declare const LendingPool:
  damlTypes.Template<LendingPool, undefined, '#irion-model:Irion.Pool:LendingPool'> &
  damlTypes.ToInterface<LendingPool, never> &
  LendingPoolInterface

export declare type PoolShare = {
  operator: damlTypes.Party,
  supplier: damlTypes.Party,
  shares: damlTypes.Numeric,
}

export declare interface PoolShareInterface {
  Archive: 
    damlTypes.Choice<PoolShare, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<PoolShare, undefined>>;
}
export declare const PoolShare:
  damlTypes.Template<PoolShare, undefined, '#irion-model:Irion.Pool:PoolShare'> &
  damlTypes.ToInterface<PoolShare, never> &
  PoolShareInterface

export declare type Pool_InjectYield = {
  amount: damlTypes.Numeric,
  tokenCid: damlTypes.ContractId<Irion_Token.Token>,
}

export declare const Pool_InjectYield:
  damlTypes.Serializable<Pool_InjectYield>

export declare type SupplyRequest = {
  operator: damlTypes.Party,
  supplier: damlTypes.Party,
  usdcIssuer: damlTypes.Party,
  amount: damlTypes.Numeric,
  escrowCid: damlTypes.ContractId<Irion_Token.Token>,
}

export declare interface SupplyRequestInterface {
  Archive: 
    damlTypes.Choice<SupplyRequest, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<SupplyRequest, undefined>>;
  SupplyRequest_Accept: 
    damlTypes.Choice<SupplyRequest, SupplyRequest_Accept, pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple2<damlTypes.ContractId<LendingPool>, damlTypes.ContractId<PoolShare>>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<SupplyRequest, undefined>>;
  SupplyRequest_Reject: 
    damlTypes.Choice<SupplyRequest, SupplyRequest_Reject, damlTypes.ContractId<Irion_Token.Token>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<SupplyRequest, undefined>>;
}
export declare const SupplyRequest:
  damlTypes.Template<SupplyRequest, undefined, '#irion-model:Irion.Pool:SupplyRequest'> &
  damlTypes.ToInterface<SupplyRequest, never> &
  SupplyRequestInterface

export declare type SupplyRequest_Accept = {
  poolCid: damlTypes.ContractId<LendingPool>,
}

export declare const SupplyRequest_Accept:
  damlTypes.Serializable<SupplyRequest_Accept>

export declare type SupplyRequest_Reject = {
}

export declare const SupplyRequest_Reject:
  damlTypes.Serializable<SupplyRequest_Reject>

export declare type WithdrawRequest = {
  operator: damlTypes.Party,
  supplier: damlTypes.Party,
  shareCid: damlTypes.ContractId<PoolShare>,
}

export declare interface WithdrawRequestInterface {
  Archive: 
    damlTypes.Choice<WithdrawRequest, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<WithdrawRequest, undefined>>;
  WithdrawRequest_Accept: 
    damlTypes.Choice<WithdrawRequest, WithdrawRequest_Accept, pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple2<damlTypes.ContractId<LendingPool>, damlTypes.ContractId<Irion_Token.Token>>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<WithdrawRequest, undefined>>;
}
export declare const WithdrawRequest:
  damlTypes.Template<WithdrawRequest, undefined, '#irion-model:Irion.Pool:WithdrawRequest'> &
  damlTypes.ToInterface<WithdrawRequest, never> &
  WithdrawRequestInterface

export declare type WithdrawRequest_Accept = {
  poolCid: damlTypes.ContractId<LendingPool>,
  payTokenCid: damlTypes.ContractId<Irion_Token.Token>,
}

export declare const WithdrawRequest_Accept:
  damlTypes.Serializable<WithdrawRequest_Accept>

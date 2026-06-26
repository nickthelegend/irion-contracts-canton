// Generated from ../../Irion/Bnpl/module.daml

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';

import * as pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4 from '@@irion/daml-prim-DA-Types-1.0.0';
import * as pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69 from '@@irion/ghc-stdlib-DA-Internal-Template-1.0.0';

import * as Irion_Config from '../../Irion/Config/module';
import * as Irion_Credit from '../../Irion/Credit/module';
import * as Irion_Pool from '../../Irion/Pool/module';
import * as Irion_Token from '../../Irion/Token/module';
import * as Irion_Types from '../../Irion/Types/module';

export declare type BnplRequest = {
  operator: damlTypes.Party,
  borrower: damlTypes.Party,
  merchant: damlTypes.Party,
  amount: damlTypes.Numeric,
  collateral: damlTypes.Numeric,
  collateralEscrowCid: damlTypes.ContractId<Irion_Token.Token>,
  termSeconds: damlTypes.Int,
}

export declare interface BnplRequestInterface {
  Archive: 
    damlTypes.Choice<BnplRequest, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<BnplRequest, undefined>>;
  BnplRequest_Accept: 
    damlTypes.Choice<BnplRequest, BnplRequest_Accept, pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple4<damlTypes.ContractId<Loan>, damlTypes.ContractId<Irion_Pool.LendingPool>, damlTypes.ContractId<Irion_Credit.CreditProfile>, damlTypes.ContractId<MerchantPayment>>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<BnplRequest, undefined>>;
  BnplRequest_Reject: 
    damlTypes.Choice<BnplRequest, BnplRequest_Reject, damlTypes.ContractId<Irion_Token.Token>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<BnplRequest, undefined>>;
}
export declare const BnplRequest:
  damlTypes.Template<BnplRequest, undefined, '#irion-model:Irion.Bnpl:BnplRequest'> &
  damlTypes.ToInterface<BnplRequest, never> &
  BnplRequestInterface

export declare type BnplRequest_Accept = {
  poolCid: damlTypes.ContractId<Irion_Pool.LendingPool>,
  profileCid: damlTypes.ContractId<Irion_Credit.CreditProfile>,
  configCid: damlTypes.ContractId<Irion_Config.ProtocolConfig>,
  merchantFundTokenCid: damlTypes.ContractId<Irion_Token.Token>,
}

export declare const BnplRequest_Accept:
  damlTypes.Serializable<BnplRequest_Accept>

export declare type BnplRequest_Reject = {
}

export declare const BnplRequest_Reject:
  damlTypes.Serializable<BnplRequest_Reject>

export declare type Loan = {
  operator: damlTypes.Party,
  borrower: damlTypes.Party,
  merchant: damlTypes.Party,
  principal: damlTypes.Numeric,
  principalRepaid: damlTypes.Numeric,
  outstanding: damlTypes.Numeric,
  collateral: damlTypes.Numeric,
  collateralTokenCid: damlTypes.Optional<damlTypes.ContractId<Irion_Token.Token>>,
  dueTime: damlTypes.Time,
  status: Irion_Types.LoanStatus,
}

export declare interface LoanInterface {
  Archive: 
    damlTypes.Choice<Loan, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<Loan, undefined>>;
  Loan_Default: 
    damlTypes.Choice<Loan, Loan_Default, pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple3<damlTypes.ContractId<Loan>, damlTypes.ContractId<Irion_Pool.LendingPool>, damlTypes.ContractId<Irion_Credit.CreditProfile>>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<Loan, undefined>>;
  Loan_Pay: 
    damlTypes.Choice<Loan, Loan_Pay, pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple3<damlTypes.ContractId<Loan>, damlTypes.ContractId<Irion_Pool.LendingPool>, damlTypes.ContractId<Irion_Credit.CreditProfile>>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<Loan, undefined>>;
  Loan_ReleaseCollateral: 
    damlTypes.Choice<Loan, Loan_ReleaseCollateral, damlTypes.ContractId<Irion_Token.Token>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<Loan, undefined>>;
}
export declare const Loan:
  damlTypes.Template<Loan, undefined, '#irion-model:Irion.Bnpl:Loan'> &
  damlTypes.ToInterface<Loan, never> &
  LoanInterface

export declare type Loan_Default = {
  poolCid: damlTypes.ContractId<Irion_Pool.LendingPool>,
  profileCid: damlTypes.ContractId<Irion_Credit.CreditProfile>,
}

export declare const Loan_Default:
  damlTypes.Serializable<Loan_Default>

export declare type Loan_Pay = {
  payer: damlTypes.Party,
  payTokenCid: damlTypes.ContractId<Irion_Token.Token>,
  amount: damlTypes.Numeric,
  poolCid: damlTypes.ContractId<Irion_Pool.LendingPool>,
  profileCid: damlTypes.ContractId<Irion_Credit.CreditProfile>,
  configCid: damlTypes.ContractId<Irion_Config.ProtocolConfig>,
}

export declare const Loan_Pay:
  damlTypes.Serializable<Loan_Pay>

export declare type Loan_ReleaseCollateral = {
}

export declare const Loan_ReleaseCollateral:
  damlTypes.Serializable<Loan_ReleaseCollateral>

export declare type MerchantPayment = {
  operator: damlTypes.Party,
  merchant: damlTypes.Party,
  borrower: damlTypes.Party,
  amount: damlTypes.Numeric,
}

export declare interface MerchantPaymentInterface {
  Archive: 
    damlTypes.Choice<MerchantPayment, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<MerchantPayment, undefined>>;
}
export declare const MerchantPayment:
  damlTypes.Template<MerchantPayment, undefined, '#irion-model:Irion.Bnpl:MerchantPayment'> &
  damlTypes.ToInterface<MerchantPayment, never> &
  MerchantPaymentInterface

export declare type UnsecuredRequest = {
  operator: damlTypes.Party,
  borrower: damlTypes.Party,
  amount: damlTypes.Numeric,
  termSeconds: damlTypes.Int,
}

export declare interface UnsecuredRequestInterface {
  Archive: 
    damlTypes.Choice<UnsecuredRequest, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<UnsecuredRequest, undefined>>;
  UnsecuredRequest_Accept: 
    damlTypes.Choice<UnsecuredRequest, UnsecuredRequest_Accept, pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple3<damlTypes.ContractId<Loan>, damlTypes.ContractId<Irion_Pool.LendingPool>, damlTypes.ContractId<Irion_Credit.CreditProfile>>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<UnsecuredRequest, undefined>>;
}
export declare const UnsecuredRequest:
  damlTypes.Template<UnsecuredRequest, undefined, '#irion-model:Irion.Bnpl:UnsecuredRequest'> &
  damlTypes.ToInterface<UnsecuredRequest, never> &
  UnsecuredRequestInterface

export declare type UnsecuredRequest_Accept = {
  poolCid: damlTypes.ContractId<Irion_Pool.LendingPool>,
  profileCid: damlTypes.ContractId<Irion_Credit.CreditProfile>,
  configCid: damlTypes.ContractId<Irion_Config.ProtocolConfig>,
  disburseTokenCid: damlTypes.ContractId<Irion_Token.Token>,
}

export declare const UnsecuredRequest_Accept:
  damlTypes.Serializable<UnsecuredRequest_Accept>

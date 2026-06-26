// Generated from ../../Irion/Credit/module.daml

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';

import * as pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69 from '@@irion/ghc-stdlib-DA-Internal-Template-1.0.0';

import * as Irion_Config from '../../Irion/Config/module';

export declare type Attestation_Apply = {
  configCid: damlTypes.ContractId<Irion_Config.ProtocolConfig>,
  profileCid: damlTypes.ContractId<CreditProfile>,
}

export declare const Attestation_Apply:
  damlTypes.Serializable<Attestation_Apply>

export declare type CreditAttestation = {
  creditIssuer: damlTypes.Party,
  operator: damlTypes.Party,
  borrower: damlTypes.Party,
  approvedLimit: damlTypes.Numeric,
  score: damlTypes.Int,
}

export declare interface CreditAttestationInterface {
  Archive: 
    damlTypes.Choice<CreditAttestation, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<CreditAttestation, undefined>>;
  Attestation_Apply: 
    damlTypes.Choice<CreditAttestation, Attestation_Apply, damlTypes.ContractId<CreditProfile>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<CreditAttestation, undefined>>;
}
export declare const CreditAttestation:
  damlTypes.Template<CreditAttestation, undefined, '#irion-model:Irion.Credit:CreditAttestation'> &
  damlTypes.ToInterface<CreditAttestation, never> &
  CreditAttestationInterface

export declare type CreditProfile = {
  operator: damlTypes.Party,
  borrower: damlTypes.Party,
  creditLimit: damlTypes.Numeric,
  outstanding: damlTypes.Numeric,
  repaidTotal: damlTypes.Numeric,
  repayments: damlTypes.Int,
  score: damlTypes.Int,
}

export declare interface CreditProfileInterface {
  Archive: 
    damlTypes.Choice<CreditProfile, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<CreditProfile, undefined>>;
}
export declare const CreditProfile:
  damlTypes.Template<CreditProfile, undefined, '#irion-model:Irion.Credit:CreditProfile'> &
  damlTypes.ToInterface<CreditProfile, never> &
  CreditProfileInterface

// Generated from ../../Irion/Config/module.daml

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';

import * as pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69 from '@@irion/ghc-stdlib-DA-Internal-Template-1.0.0';

export declare type Config = {
  usdcIssuer: damlTypes.Party,
  creditIssuer: damlTypes.Party,
  borrowInterestRate: damlTypes.Numeric,
  uncollatPremiumRate: damlTypes.Numeric,
  starterLimit: damlTypes.Numeric,
  maxCreditLimit: damlTypes.Numeric,
  repayRewardRate: damlTypes.Numeric,
  minScoreUncollat: damlTypes.Int,
  minimumLiquidity: damlTypes.Numeric,
}

export declare const Config:
  damlTypes.Serializable<Config>

export declare type Config_Update = {
  newConfig: Config,
}

export declare const Config_Update:
  damlTypes.Serializable<Config_Update>

export declare type ProtocolConfig = {
  operator: damlTypes.Party,
  config: Config,
}

export declare interface ProtocolConfigInterface {
  Archive: 
    damlTypes.Choice<ProtocolConfig, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<ProtocolConfig, undefined>>;
  Config_Update: 
    damlTypes.Choice<ProtocolConfig, Config_Update, damlTypes.ContractId<ProtocolConfig>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<ProtocolConfig, undefined>>;
}
export declare const ProtocolConfig:
  damlTypes.Template<ProtocolConfig, undefined, '#irion-model:Irion.Config:ProtocolConfig'> &
  damlTypes.ToInterface<ProtocolConfig, never> &
  ProtocolConfigInterface

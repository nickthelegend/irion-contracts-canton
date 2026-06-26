// Generated from ../../Irion/Token/module.daml

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';

import * as pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4 from '@@irion/daml-prim-DA-Types-1.0.0';
import * as pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69 from '@@irion/ghc-stdlib-DA-Internal-Template-1.0.0';

export declare type Token = {
  issuer: damlTypes.Party,
  owner: damlTypes.Party,
  amount: damlTypes.Numeric,
}

export declare interface TokenInterface {
  Archive: 
    damlTypes.Choice<Token, pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive, {}, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<Token, undefined>>;
  Token_Merge: 
    damlTypes.Choice<Token, Token_Merge, damlTypes.ContractId<Token>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<Token, undefined>>;
  Token_Split: 
    damlTypes.Choice<Token, Token_Split, pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple2<damlTypes.ContractId<Token>, damlTypes.ContractId<Token>>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<Token, undefined>>;
  Token_Transfer: 
    damlTypes.Choice<Token, Token_Transfer, damlTypes.ContractId<Token>, undefined> &
    damlTypes.ChoiceFrom<damlTypes.Template<Token, undefined>>;
}
export declare const Token:
  damlTypes.Template<Token, undefined, '#irion-model:Irion.Token:Token'> &
  damlTypes.ToInterface<Token, never> &
  TokenInterface

export declare type Token_Merge = {
  otherCid: damlTypes.ContractId<Token>,
}

export declare const Token_Merge:
  damlTypes.Serializable<Token_Merge>

export declare type Token_Split = {
  splitAmount: damlTypes.Numeric,
}

export declare const Token_Split:
  damlTypes.Serializable<Token_Split>

export declare type Token_Transfer = {
  newOwner: damlTypes.Party,
}

export declare const Token_Transfer:
  damlTypes.Serializable<Token_Transfer>

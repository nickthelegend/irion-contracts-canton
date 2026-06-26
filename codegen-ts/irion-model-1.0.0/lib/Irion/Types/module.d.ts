// Generated from ../../Irion/Types/module.daml

/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';

export declare type LoanStatus =
  | 'Active'
  | 'Repaid'
  | 'Defaulted'


export declare const LoanStatus:
  damlTypes.Serializable<LoanStatus> & { readonly keys: LoanStatus[] } & { readonly [e in LoanStatus]: e }

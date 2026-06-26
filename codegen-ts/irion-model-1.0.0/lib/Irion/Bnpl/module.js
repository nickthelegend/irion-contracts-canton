"use strict";
/* eslint-disable-next-line no-unused-vars */
function __export(m) {
/* eslint-disable-next-line no-prototype-builtins */
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });

/* eslint-disable-next-line no-unused-vars */
var jtv = require('@mojotech/json-type-validation');
/* eslint-disable-next-line no-unused-vars */
var damlTypes = require('@daml/types');

var pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4 = require('@@irion/daml-prim-DA-Types-1.0.0');
var pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69 = require('@@irion/ghc-stdlib-DA-Internal-Template-1.0.0');

var Irion_Config = require('../../Irion/Config/module');
var Irion_Credit = require('../../Irion/Credit/module');
var Irion_Pool = require('../../Irion/Pool/module');
var Irion_Token = require('../../Irion/Token/module');
var Irion_Types = require('../../Irion/Types/module');

exports.BnplRequest = damlTypes.assembleTemplate(
  {
    templateId: '#irion-model:Irion.Bnpl:BnplRequest',
    templateIdWithPackageId: '#eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a:Irion.Bnpl:BnplRequest',
    keyDecoder: jtv.constant(undefined),
    keyEncode: function () { throw 'EncodeError'; },
    decoder: damlTypes.lazyMemo(function () {
      return jtv.object({
        operator: damlTypes.Party.decoder,
        borrower: damlTypes.Party.decoder,
        merchant: damlTypes.Party.decoder,
        amount: damlTypes.Numeric(10).decoder,
        collateral: damlTypes.Numeric(10).decoder,
        collateralEscrowCid: damlTypes.ContractId(Irion_Token.Token).decoder,
        termSeconds: damlTypes.Int.decoder,
      });
    }),
    encode: function (__typed__) {
      return {
        operator: damlTypes.Party.encode(__typed__.operator),
        borrower: damlTypes.Party.encode(__typed__.borrower),
        merchant: damlTypes.Party.encode(__typed__.merchant),
        amount: damlTypes.Numeric(10).encode(__typed__.amount),
        collateral: damlTypes.Numeric(10).encode(__typed__.collateral),
        collateralEscrowCid: damlTypes.ContractId(Irion_Token.Token).encode(__typed__.collateralEscrowCid),
        termSeconds: damlTypes.Int.encode(__typed__.termSeconds),
      };
    },
    Archive: {
      template: function () { return exports.BnplRequest; },
      choiceName: 'Archive',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.decoder;
      }),
      argumentEncode: function (__typed__) { return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.Unit.decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
    },
    BnplRequest_Accept: {
      template: function () { return exports.BnplRequest; },
      choiceName: 'BnplRequest_Accept',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.BnplRequest_Accept.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.BnplRequest_Accept.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple4(damlTypes.ContractId(exports.Loan), damlTypes.ContractId(Irion_Pool.LendingPool), damlTypes.ContractId(Irion_Credit.CreditProfile), damlTypes.ContractId(exports.MerchantPayment)).decoder;
      }),
      resultEncode: function (__typed__) { return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple4(damlTypes.ContractId(exports.Loan), damlTypes.ContractId(Irion_Pool.LendingPool), damlTypes.ContractId(Irion_Credit.CreditProfile), damlTypes.ContractId(exports.MerchantPayment)).encode(__typed__); },
    },
    BnplRequest_Reject: {
      template: function () { return exports.BnplRequest; },
      choiceName: 'BnplRequest_Reject',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.BnplRequest_Reject.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.BnplRequest_Reject.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.ContractId(Irion_Token.Token).decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.ContractId(Irion_Token.Token).encode(__typed__); },
    },
  },
);

damlTypes.registerTemplate(exports.BnplRequest, ['eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a', '#irion-model']);

exports.BnplRequest_Accept = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      poolCid: damlTypes.ContractId(Irion_Pool.LendingPool).decoder,
      profileCid: damlTypes.ContractId(Irion_Credit.CreditProfile).decoder,
      configCid: damlTypes.ContractId(Irion_Config.ProtocolConfig).decoder,
      merchantFundTokenCid: damlTypes.ContractId(Irion_Token.Token).decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      poolCid: damlTypes.ContractId(Irion_Pool.LendingPool).encode(__typed__.poolCid),
      profileCid: damlTypes.ContractId(Irion_Credit.CreditProfile).encode(__typed__.profileCid),
      configCid: damlTypes.ContractId(Irion_Config.ProtocolConfig).encode(__typed__.configCid),
      merchantFundTokenCid: damlTypes.ContractId(Irion_Token.Token).encode(__typed__.merchantFundTokenCid),
    };
  },
};

exports.BnplRequest_Reject = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
    });
  }),
  encode: function (__typed__) {
    return {};
  },
};

exports.Loan = damlTypes.assembleTemplate(
  {
    templateId: '#irion-model:Irion.Bnpl:Loan',
    templateIdWithPackageId: '#eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a:Irion.Bnpl:Loan',
    keyDecoder: jtv.constant(undefined),
    keyEncode: function () { throw 'EncodeError'; },
    decoder: damlTypes.lazyMemo(function () {
      return jtv.object({
        operator: damlTypes.Party.decoder,
        borrower: damlTypes.Party.decoder,
        merchant: damlTypes.Party.decoder,
        principal: damlTypes.Numeric(10).decoder,
        principalRepaid: damlTypes.Numeric(10).decoder,
        outstanding: damlTypes.Numeric(10).decoder,
        collateral: damlTypes.Numeric(10).decoder,
        collateralTokenCid: jtv.Decoder.withDefault(null, damlTypes.Optional(damlTypes.ContractId(Irion_Token.Token)).decoder),
        dueTime: damlTypes.Time.decoder,
        status: Irion_Types.LoanStatus.decoder,
      });
    }),
    encode: function (__typed__) {
      return {
        operator: damlTypes.Party.encode(__typed__.operator),
        borrower: damlTypes.Party.encode(__typed__.borrower),
        merchant: damlTypes.Party.encode(__typed__.merchant),
        principal: damlTypes.Numeric(10).encode(__typed__.principal),
        principalRepaid: damlTypes.Numeric(10).encode(__typed__.principalRepaid),
        outstanding: damlTypes.Numeric(10).encode(__typed__.outstanding),
        collateral: damlTypes.Numeric(10).encode(__typed__.collateral),
        collateralTokenCid: damlTypes.Optional(damlTypes.ContractId(Irion_Token.Token)).encode(__typed__.collateralTokenCid),
        dueTime: damlTypes.Time.encode(__typed__.dueTime),
        status: Irion_Types.LoanStatus.encode(__typed__.status),
      };
    },
    Archive: {
      template: function () { return exports.Loan; },
      choiceName: 'Archive',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.decoder;
      }),
      argumentEncode: function (__typed__) { return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.Unit.decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
    },
    Loan_Default: {
      template: function () { return exports.Loan; },
      choiceName: 'Loan_Default',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.Loan_Default.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.Loan_Default.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple3(damlTypes.ContractId(exports.Loan), damlTypes.ContractId(Irion_Pool.LendingPool), damlTypes.ContractId(Irion_Credit.CreditProfile)).decoder;
      }),
      resultEncode: function (__typed__) { return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple3(damlTypes.ContractId(exports.Loan), damlTypes.ContractId(Irion_Pool.LendingPool), damlTypes.ContractId(Irion_Credit.CreditProfile)).encode(__typed__); },
    },
    Loan_Pay: {
      template: function () { return exports.Loan; },
      choiceName: 'Loan_Pay',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.Loan_Pay.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.Loan_Pay.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple3(damlTypes.ContractId(exports.Loan), damlTypes.ContractId(Irion_Pool.LendingPool), damlTypes.ContractId(Irion_Credit.CreditProfile)).decoder;
      }),
      resultEncode: function (__typed__) { return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple3(damlTypes.ContractId(exports.Loan), damlTypes.ContractId(Irion_Pool.LendingPool), damlTypes.ContractId(Irion_Credit.CreditProfile)).encode(__typed__); },
    },
    Loan_ReleaseCollateral: {
      template: function () { return exports.Loan; },
      choiceName: 'Loan_ReleaseCollateral',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.Loan_ReleaseCollateral.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.Loan_ReleaseCollateral.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.ContractId(Irion_Token.Token).decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.ContractId(Irion_Token.Token).encode(__typed__); },
    },
  },
);

damlTypes.registerTemplate(exports.Loan, ['eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a', '#irion-model']);

exports.Loan_Default = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      poolCid: damlTypes.ContractId(Irion_Pool.LendingPool).decoder,
      profileCid: damlTypes.ContractId(Irion_Credit.CreditProfile).decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      poolCid: damlTypes.ContractId(Irion_Pool.LendingPool).encode(__typed__.poolCid),
      profileCid: damlTypes.ContractId(Irion_Credit.CreditProfile).encode(__typed__.profileCid),
    };
  },
};

exports.Loan_Pay = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      payer: damlTypes.Party.decoder,
      payTokenCid: damlTypes.ContractId(Irion_Token.Token).decoder,
      amount: damlTypes.Numeric(10).decoder,
      poolCid: damlTypes.ContractId(Irion_Pool.LendingPool).decoder,
      profileCid: damlTypes.ContractId(Irion_Credit.CreditProfile).decoder,
      configCid: damlTypes.ContractId(Irion_Config.ProtocolConfig).decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      payer: damlTypes.Party.encode(__typed__.payer),
      payTokenCid: damlTypes.ContractId(Irion_Token.Token).encode(__typed__.payTokenCid),
      amount: damlTypes.Numeric(10).encode(__typed__.amount),
      poolCid: damlTypes.ContractId(Irion_Pool.LendingPool).encode(__typed__.poolCid),
      profileCid: damlTypes.ContractId(Irion_Credit.CreditProfile).encode(__typed__.profileCid),
      configCid: damlTypes.ContractId(Irion_Config.ProtocolConfig).encode(__typed__.configCid),
    };
  },
};

exports.Loan_ReleaseCollateral = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
    });
  }),
  encode: function (__typed__) {
    return {};
  },
};

exports.MerchantPayment = damlTypes.assembleTemplate(
  {
    templateId: '#irion-model:Irion.Bnpl:MerchantPayment',
    templateIdWithPackageId: '#eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a:Irion.Bnpl:MerchantPayment',
    keyDecoder: jtv.constant(undefined),
    keyEncode: function () { throw 'EncodeError'; },
    decoder: damlTypes.lazyMemo(function () {
      return jtv.object({
        operator: damlTypes.Party.decoder,
        merchant: damlTypes.Party.decoder,
        borrower: damlTypes.Party.decoder,
        amount: damlTypes.Numeric(10).decoder,
      });
    }),
    encode: function (__typed__) {
      return {
        operator: damlTypes.Party.encode(__typed__.operator),
        merchant: damlTypes.Party.encode(__typed__.merchant),
        borrower: damlTypes.Party.encode(__typed__.borrower),
        amount: damlTypes.Numeric(10).encode(__typed__.amount),
      };
    },
    Archive: {
      template: function () { return exports.MerchantPayment; },
      choiceName: 'Archive',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.decoder;
      }),
      argumentEncode: function (__typed__) { return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.Unit.decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
    },
  },
);

damlTypes.registerTemplate(exports.MerchantPayment, ['eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a', '#irion-model']);

exports.UnsecuredRequest = damlTypes.assembleTemplate(
  {
    templateId: '#irion-model:Irion.Bnpl:UnsecuredRequest',
    templateIdWithPackageId: '#eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a:Irion.Bnpl:UnsecuredRequest',
    keyDecoder: jtv.constant(undefined),
    keyEncode: function () { throw 'EncodeError'; },
    decoder: damlTypes.lazyMemo(function () {
      return jtv.object({
        operator: damlTypes.Party.decoder,
        borrower: damlTypes.Party.decoder,
        amount: damlTypes.Numeric(10).decoder,
        termSeconds: damlTypes.Int.decoder,
      });
    }),
    encode: function (__typed__) {
      return {
        operator: damlTypes.Party.encode(__typed__.operator),
        borrower: damlTypes.Party.encode(__typed__.borrower),
        amount: damlTypes.Numeric(10).encode(__typed__.amount),
        termSeconds: damlTypes.Int.encode(__typed__.termSeconds),
      };
    },
    Archive: {
      template: function () { return exports.UnsecuredRequest; },
      choiceName: 'Archive',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.decoder;
      }),
      argumentEncode: function (__typed__) { return pkg9e70a8b3510d617f8a136213f33d6a903a10ca0eeec76bb06ba55d1ed9680f69.DA.Internal.Template.Archive.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.Unit.decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
    },
    UnsecuredRequest_Accept: {
      template: function () { return exports.UnsecuredRequest; },
      choiceName: 'UnsecuredRequest_Accept',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.UnsecuredRequest_Accept.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.UnsecuredRequest_Accept.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple3(damlTypes.ContractId(exports.Loan), damlTypes.ContractId(Irion_Pool.LendingPool), damlTypes.ContractId(Irion_Credit.CreditProfile)).decoder;
      }),
      resultEncode: function (__typed__) { return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple3(damlTypes.ContractId(exports.Loan), damlTypes.ContractId(Irion_Pool.LendingPool), damlTypes.ContractId(Irion_Credit.CreditProfile)).encode(__typed__); },
    },
  },
);

damlTypes.registerTemplate(exports.UnsecuredRequest, ['eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a', '#irion-model']);

exports.UnsecuredRequest_Accept = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      poolCid: damlTypes.ContractId(Irion_Pool.LendingPool).decoder,
      profileCid: damlTypes.ContractId(Irion_Credit.CreditProfile).decoder,
      configCid: damlTypes.ContractId(Irion_Config.ProtocolConfig).decoder,
      disburseTokenCid: damlTypes.ContractId(Irion_Token.Token).decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      poolCid: damlTypes.ContractId(Irion_Pool.LendingPool).encode(__typed__.poolCid),
      profileCid: damlTypes.ContractId(Irion_Credit.CreditProfile).encode(__typed__.profileCid),
      configCid: damlTypes.ContractId(Irion_Config.ProtocolConfig).encode(__typed__.configCid),
      disburseTokenCid: damlTypes.ContractId(Irion_Token.Token).encode(__typed__.disburseTokenCid),
    };
  },
};

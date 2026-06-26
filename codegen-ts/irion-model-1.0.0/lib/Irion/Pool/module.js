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

var Irion_Token = require('../../Irion/Token/module');

exports.LendingPool = damlTypes.assembleTemplate(
  {
    templateId: '#irion-model:Irion.Pool:LendingPool',
    templateIdWithPackageId: '#eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a:Irion.Pool:LendingPool',
    keyDecoder: jtv.constant(undefined),
    keyEncode: function () { throw 'EncodeError'; },
    decoder: damlTypes.lazyMemo(function () {
      return jtv.object({
        operator: damlTypes.Party.decoder,
        usdcIssuer: damlTypes.Party.decoder,
        totalShares: damlTypes.Numeric(10).decoder,
        available: damlTypes.Numeric(10).decoder,
        totalBorrowed: damlTypes.Numeric(10).decoder,
        minimumLiquidity: damlTypes.Numeric(10).decoder,
      });
    }),
    encode: function (__typed__) {
      return {
        operator: damlTypes.Party.encode(__typed__.operator),
        usdcIssuer: damlTypes.Party.encode(__typed__.usdcIssuer),
        totalShares: damlTypes.Numeric(10).encode(__typed__.totalShares),
        available: damlTypes.Numeric(10).encode(__typed__.available),
        totalBorrowed: damlTypes.Numeric(10).encode(__typed__.totalBorrowed),
        minimumLiquidity: damlTypes.Numeric(10).encode(__typed__.minimumLiquidity),
      };
    },
    Archive: {
      template: function () { return exports.LendingPool; },
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
    Pool_InjectYield: {
      template: function () { return exports.LendingPool; },
      choiceName: 'Pool_InjectYield',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.Pool_InjectYield.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.Pool_InjectYield.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.ContractId(exports.LendingPool).decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.ContractId(exports.LendingPool).encode(__typed__); },
    },
  },
);

damlTypes.registerTemplate(exports.LendingPool, ['eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a', '#irion-model']);

exports.PoolShare = damlTypes.assembleTemplate(
  {
    templateId: '#irion-model:Irion.Pool:PoolShare',
    templateIdWithPackageId: '#eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a:Irion.Pool:PoolShare',
    keyDecoder: jtv.constant(undefined),
    keyEncode: function () { throw 'EncodeError'; },
    decoder: damlTypes.lazyMemo(function () {
      return jtv.object({
        operator: damlTypes.Party.decoder,
        supplier: damlTypes.Party.decoder,
        shares: damlTypes.Numeric(10).decoder,
      });
    }),
    encode: function (__typed__) {
      return {
        operator: damlTypes.Party.encode(__typed__.operator),
        supplier: damlTypes.Party.encode(__typed__.supplier),
        shares: damlTypes.Numeric(10).encode(__typed__.shares),
      };
    },
    Archive: {
      template: function () { return exports.PoolShare; },
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

damlTypes.registerTemplate(exports.PoolShare, ['eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a', '#irion-model']);

exports.Pool_InjectYield = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      amount: damlTypes.Numeric(10).decoder,
      tokenCid: damlTypes.ContractId(Irion_Token.Token).decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      amount: damlTypes.Numeric(10).encode(__typed__.amount),
      tokenCid: damlTypes.ContractId(Irion_Token.Token).encode(__typed__.tokenCid),
    };
  },
};

exports.SupplyRequest = damlTypes.assembleTemplate(
  {
    templateId: '#irion-model:Irion.Pool:SupplyRequest',
    templateIdWithPackageId: '#eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a:Irion.Pool:SupplyRequest',
    keyDecoder: jtv.constant(undefined),
    keyEncode: function () { throw 'EncodeError'; },
    decoder: damlTypes.lazyMemo(function () {
      return jtv.object({
        operator: damlTypes.Party.decoder,
        supplier: damlTypes.Party.decoder,
        usdcIssuer: damlTypes.Party.decoder,
        amount: damlTypes.Numeric(10).decoder,
        escrowCid: damlTypes.ContractId(Irion_Token.Token).decoder,
      });
    }),
    encode: function (__typed__) {
      return {
        operator: damlTypes.Party.encode(__typed__.operator),
        supplier: damlTypes.Party.encode(__typed__.supplier),
        usdcIssuer: damlTypes.Party.encode(__typed__.usdcIssuer),
        amount: damlTypes.Numeric(10).encode(__typed__.amount),
        escrowCid: damlTypes.ContractId(Irion_Token.Token).encode(__typed__.escrowCid),
      };
    },
    Archive: {
      template: function () { return exports.SupplyRequest; },
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
    SupplyRequest_Accept: {
      template: function () { return exports.SupplyRequest; },
      choiceName: 'SupplyRequest_Accept',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.SupplyRequest_Accept.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.SupplyRequest_Accept.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple2(damlTypes.ContractId(exports.LendingPool), damlTypes.ContractId(exports.PoolShare)).decoder;
      }),
      resultEncode: function (__typed__) { return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple2(damlTypes.ContractId(exports.LendingPool), damlTypes.ContractId(exports.PoolShare)).encode(__typed__); },
    },
    SupplyRequest_Reject: {
      template: function () { return exports.SupplyRequest; },
      choiceName: 'SupplyRequest_Reject',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.SupplyRequest_Reject.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.SupplyRequest_Reject.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return damlTypes.ContractId(Irion_Token.Token).decoder;
      }),
      resultEncode: function (__typed__) { return damlTypes.ContractId(Irion_Token.Token).encode(__typed__); },
    },
  },
);

damlTypes.registerTemplate(exports.SupplyRequest, ['eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a', '#irion-model']);

exports.SupplyRequest_Accept = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      poolCid: damlTypes.ContractId(exports.LendingPool).decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      poolCid: damlTypes.ContractId(exports.LendingPool).encode(__typed__.poolCid),
    };
  },
};

exports.SupplyRequest_Reject = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
    });
  }),
  encode: function (__typed__) {
    return {};
  },
};

exports.WithdrawRequest = damlTypes.assembleTemplate(
  {
    templateId: '#irion-model:Irion.Pool:WithdrawRequest',
    templateIdWithPackageId: '#eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a:Irion.Pool:WithdrawRequest',
    keyDecoder: jtv.constant(undefined),
    keyEncode: function () { throw 'EncodeError'; },
    decoder: damlTypes.lazyMemo(function () {
      return jtv.object({
        operator: damlTypes.Party.decoder,
        supplier: damlTypes.Party.decoder,
        shareCid: damlTypes.ContractId(exports.PoolShare).decoder,
      });
    }),
    encode: function (__typed__) {
      return {
        operator: damlTypes.Party.encode(__typed__.operator),
        supplier: damlTypes.Party.encode(__typed__.supplier),
        shareCid: damlTypes.ContractId(exports.PoolShare).encode(__typed__.shareCid),
      };
    },
    Archive: {
      template: function () { return exports.WithdrawRequest; },
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
    WithdrawRequest_Accept: {
      template: function () { return exports.WithdrawRequest; },
      choiceName: 'WithdrawRequest_Accept',
      argumentDecoder: damlTypes.lazyMemo(function () {
        return exports.WithdrawRequest_Accept.decoder;
      }),
      argumentEncode: function (__typed__) { return exports.WithdrawRequest_Accept.encode(__typed__); },
      resultDecoder: damlTypes.lazyMemo(function () {
        return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple2(damlTypes.ContractId(exports.LendingPool), damlTypes.ContractId(Irion_Token.Token)).decoder;
      }),
      resultEncode: function (__typed__) { return pkg5aee9b21b8e9a4c4975b5f4c4198e6e6e8469df49e2010820e792f393db870f4.DA.Types.Tuple2(damlTypes.ContractId(exports.LendingPool), damlTypes.ContractId(Irion_Token.Token)).encode(__typed__); },
    },
  },
);

damlTypes.registerTemplate(exports.WithdrawRequest, ['eb770b180537a95920749eaaab957c6ab02dadb6fb166a2a34c6f25a48eb643a', '#irion-model']);

exports.WithdrawRequest_Accept = {
  decoder: damlTypes.lazyMemo(function () {
    return jtv.object({
      poolCid: damlTypes.ContractId(exports.LendingPool).decoder,
      payTokenCid: damlTypes.ContractId(Irion_Token.Token).decoder,
    });
  }),
  encode: function (__typed__) {
    return {
      poolCid: damlTypes.ContractId(exports.LendingPool).encode(__typed__.poolCid),
      payTokenCid: damlTypes.ContractId(Irion_Token.Token).encode(__typed__.payTokenCid),
    };
  },
};
